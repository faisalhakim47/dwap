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
 * @property {Array<string>} vilages
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
      wilayah[provinceCode].regencies[regencyCode].districts[districtCode] = wilayah[provinceCode].regencies[regencyCode].districts[districtCode] || { vilages: [] };
      wilayah[provinceCode].regencies[regencyCode].districts[districtCode].vilages.push(name);
    }
    else if (provinceCode && regencyCode && districtCode && !villageCode) {
      wilayah[provinceCode] = wilayah[provinceCode] || { regencies: {} };
      wilayah[provinceCode].regencies[regencyCode] = wilayah[provinceCode].regencies[regencyCode] || { districts: {} };
      wilayah[provinceCode].regencies[regencyCode].districts[districtCode] = {
        name,
        vilages: wilayah[provinceCode].regencies[regencyCode].districts[districtCode]?.vilages || [],
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

const textEncoder = new TextEncoder();

/**
 * @param {string} string
 */
function encodeWilayahName(string) {
  const encodedString = textEncoder.encode(string.toLowerCase());
  return Buffer.from(encodedString).toString('base64url');
}

/**
 * @param {{ [code: string]: { name: string } }} wilayah
 */
function extractWilayahNames(wilayah) {
  return Object
    .keys(wilayah)
    .map(function (code) {
      return wilayah[code].name;
    })
    .join('\n');
}

const wilayahNamesDir = join(__dirname, '../data/wilayah-names');
await rm(wilayahNamesDir, { recursive: true, force: true });
await mkdir(wilayahNamesDir, { recursive: true });

await writeFile(join(wilayahNamesDir, 'provinces.txt'), extractWilayahNames(wilayah), { encoding: 'utf-8' });

for (const [_, { name: provinceName, regencies }] of Object.entries(wilayah)) {
  const provincBase64Url = encodeWilayahName(provinceName);
  const provinceDir = join(wilayahNamesDir, provincBase64Url);
  await mkdir(provinceDir, { recursive: true });
  await writeFile(join(provinceDir, 'regencies.txt'), extractWilayahNames(regencies), { encoding: 'utf-8' });

  for (const [_, { name: regencyName, districts }] of Object.entries(regencies)) {
    const regencyBase64Url = encodeWilayahName(regencyName);
    const regencyDir = join(provinceDir, regencyBase64Url);
    await mkdir(regencyDir, { recursive: true });
    await writeFile(join(regencyDir, 'districts.txt'), extractWilayahNames(districts), { encoding: 'utf-8' });

    for (const [_, { name: districtName, vilages }] of Object.entries(districts)) {
      const districtBase64Url = encodeWilayahName(districtName);
      const districtDir = join(regencyDir, districtBase64Url);
      await mkdir(districtDir, { recursive: true });
      await writeFile(join(districtDir, 'vilages.txt'), vilages.join('\n'), { encoding: 'utf-8' });
    }
  }
}
