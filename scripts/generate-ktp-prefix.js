#!/usr/bin/env node

import { readFile, rm, stat, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { env } from 'node:process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const existingWilayahSqlPath = join(__dirname, '../.local/wilayah.sql');
const existingWilayahSqlStat = await stat(existingWilayahSqlPath).catch(_ => null);

const wilayahSql = (existingWilayahSqlStat?.isFile() && env.FETCH_WILAYAH_SQL !== '1')
  ? await readFile(existingWilayahSqlPath, { encoding: 'utf-8' })
  : await (async function fetchWilayahSql() {
    const wilayahSqlResponse = await fetch('https://raw.githubusercontent.com/cahyadsn/wilayah/264229c3944b1d55fb2e1b94891fb4b86ded6627/db/wilayah.sql');
    const wilayahSqlText = await wilayahSqlResponse.text();
    await writeFile(existingWilayahSqlPath, wilayahSqlText, { encoding: 'utf-8' });
    return wilayahSqlText;
  })();

/**
 * @typedef {object} District
 * @property {string} name
 * @property {Array<string>} villages
 */

/**
 * @typedef {object} Regency
 * @property {string} name
 * @property {{ [code: string]: District }} districts
 */

/**
 * @typedef {object} Province
 * @property {string} name
 * @property {{ [code: string]: Regency }} regencies
 */

/** @type {{ [code: string]: Province }} */
const wilayah = wilayahSql
  .replaceAll('\r', '')
  .split('\n')
  .filter(function (line) {
    return line.startsWith("('") && (line.endsWith(',') || line.endsWith(';'));
  })
  .map(function (line) {
    return line.slice(1, -2).split(',');
  })
  .map(function (values) {
    const [code, ...nameParts] = values;
    const name = nameParts.join(',').replaceAll('\n', '').replaceAll('\r', '').trim();
    return {
      code: code.slice(1, -1),
      name: name.slice(1, -1),
    };
  })
  .reduce(function (wilayah, { code, name }) {
    const [provinceCode, regencyCode, districtCode, villageCode] = code.split('.');
    if (provinceCode && regencyCode && districtCode && villageCode) {
      wilayah[provinceCode] = wilayah[provinceCode] || { regencies: {} };
      wilayah[provinceCode].regencies[regencyCode] = wilayah[provinceCode].regencies[regencyCode] || { districts: {} };
      wilayah[provinceCode].regencies[regencyCode].districts[districtCode] = wilayah[provinceCode].regencies[regencyCode].districts[districtCode] || { villages: [] };
      wilayah[provinceCode].regencies[regencyCode].districts[districtCode].villages.push(name);
    }
    else if (provinceCode && regencyCode && districtCode && !villageCode) {
      wilayah[provinceCode] = wilayah[provinceCode] || { regencies: {} };
      wilayah[provinceCode].regencies[regencyCode] = wilayah[provinceCode].regencies[regencyCode] || { districts: {} };
      wilayah[provinceCode].regencies[regencyCode].districts[districtCode] = {
        name,
        villages: wilayah[provinceCode].regencies[regencyCode].districts[districtCode]?.villages || [],
      };
    }
    else if (provinceCode && regencyCode && !districtCode && !villageCode) {
      wilayah[provinceCode] = wilayah[provinceCode] || { regencies: {} };
      wilayah[provinceCode].regencies[regencyCode] = {
        name,
        districts: wilayah[provinceCode].regencies[regencyCode]?.districts || [],
      };
    }
    else if (provinceCode && !regencyCode && !districtCode && !villageCode) {
      wilayah[provinceCode] = {
        name,
        regencies: wilayah[provinceCode]?.regencies || [],
      };
    }
    else {
      throw new Error(`Invalid wilayah: ${JSON.stringify({ code, name })}`);
    }
    return wilayah;
  }, /** @type {{ [code: string]: Province }} */({}));

const dataPlainDir = join(__dirname, '../data/ktp-prefix');
await rm(dataPlainDir, { recursive: true, force: true });
await mkdir(dataPlainDir, { recursive: true });

for (const [provinceCode, { name: provinceName, regencies }] of Object.entries(wilayah)) {
  for (const [regencyCode, { name: regencyName, districts }] of Object.entries(regencies)) {
    const districtTsv = `${provinceName}\t${regencyName}\n` + Object
      .keys(districts)
      .map(function (districtCode) {
        return `${districtCode}\t${districts[districtCode].name}`;
      })
      .join('\n');
    await writeFile(join(dataPlainDir, `${provinceCode}${regencyCode}.tsv`), districtTsv, { encoding: 'utf-8' });
  }
}
