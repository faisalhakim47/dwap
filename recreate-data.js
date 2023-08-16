// @ts-check

const fs = require('fs/promises');
const path = require('path');


(async function () {
  const SOURCE = "https://raw.githubusercontent.com/cahyadsn/wilayah/v2202.06/db/wilayah_2022.sql";

  const request = await fetch(SOURCE);
  const raw = await request.text();
  /** @type {Array<Row>} */
  const data = raw
    .slice(raw.indexOf("('11','ACEH')"), raw.indexOf("COMMIT;"))
    .split("\n")
    .map((row) => row.trim())
    .filter((row) => row.length !== 0)
    .filter((row) => !row.startsWith("--"))
    .filter((row) => !row.startsWith("INSERT INTO"))
    .filter((row) => !row.startsWith("VALUES"))
    .map((row) => {
      const key = row.slice(2, row.indexOf("','"));
      const keyParts = key.split(".");
      const type = keyParts.length;
      return {
        type,
        provinceCode: keyParts[0],
        regencyCode: keyParts[1],
        districtCode: keyParts[2],
        villageCode: keyParts[3],
        name: row.slice(row.indexOf("','") + 3, row.indexOf("')")),
      };
    });

  for (const row of data) {
    if (
      (row.type === 1 && (typeof row.provinceCode !== 'string' || row.provinceCode.length !== 2))
      || (row.type === 2 && (typeof row.provinceCode !== 'string' || row.provinceCode.length !== 2) && (typeof row.regencyCode !== 'string' || row.regencyCode.length !== 2))
      || (row.type === 3 && (typeof row.provinceCode !== 'string' || row.provinceCode.length !== 2) && (typeof row.regencyCode !== 'string' || row.regencyCode.length !== 2) && (typeof row.districtCode !== 'string' || row.districtCode.length !== 2))
      || (row.type === 4 && (typeof row.provinceCode !== 'string' || row.provinceCode.length !== 2) && (typeof row.regencyCode !== 'string' || row.regencyCode.length !== 2) && (typeof row.districtCode !== 'string' || row.districtCode.length !== 2) && (typeof row.villageCode !== 'string' || row.villageCode.length !== 4))
    ) {
      throw new Error(`SOMETHING WRONG WITH: ${row}`);
    }
  }

  await emptyDir("./data");

  const provinces = data.filter((row) => row.type === 1);
  const regencies = data.filter((row) => row.type === 2);
  const districts = data.filter((row) => row.type === 3);
  const villages = data.filter((row) => row.type === 4);

  await write("./data/provinces.json", provinces.map(formatProvince));
  await write("./data/regencies.json", regencies.map(formatRegency));
  await write("./data/districts.json", districts.map(formatDistrict));
  await write("./data/villages.json", villages.map(formatVillage));

  for (const province of provinces) {
    const provinceDir = "./data/provinces/" + province.provinceCode;

    await ensureDir(provinceDir);

    const regencies = data.filter((row) =>
      row.type === 2 &&
      row.provinceCode === province.provinceCode
    );
    const districts = data.filter((row) =>
      row.type === 3 &&
      row.provinceCode === province.provinceCode
    );
    const villages = data.filter((row) =>
      row.type === 4 &&
      row.provinceCode === province.provinceCode
    );

    await write(provinceDir + ".json", formatProvince(province));
    await write(provinceDir + "/regencies.json", regencies.map(formatRegency));
    await write(provinceDir + "/districts.json", districts.map(formatDistrict));
    await write(provinceDir + "/villages.json", villages.map(formatVillage));

    for (const regency of regencies) {
      const regencyDir = provinceDir + "/regencies/" + regency.regencyCode;

      await ensureDir(regencyDir);

      const districts = data.filter((row) =>
        row.type === 3 &&
        row.provinceCode === province.provinceCode &&
        row.regencyCode === regency.regencyCode
      );
      const villages = data.filter((row) =>
        row.type === 4 &&
        row.provinceCode === province.provinceCode &&
        row.regencyCode === regency.regencyCode
      );

      await write(regencyDir + ".json", formatRegency(regency));
      await write(regencyDir + "/districts.json", districts.map(formatDistrict));
      await write(regencyDir + "/villages.json", villages.map(formatVillage));

      for (const district of districts) {
        const districtDir = regencyDir + "/districts/" + district.districtCode;

        await ensureDir(districtDir);

        const villages = data.filter((row) =>
          row.type === 4 &&
          row.provinceCode === province.provinceCode &&
          row.regencyCode === regency.regencyCode &&
          row.districtCode === district.districtCode
        );

        await write(districtDir + ".json", formatDistrict(district));
        await write(districtDir + "/villages.json", villages.map(formatVillage));

        await ensureDir(districtDir + "/villages");

        for (const village of villages) {
          const villageDir = districtDir + "/villages/" + village.villageCode;
          await write(villageDir + ".json", formatVillage(village));
        }
      }
    }
  }
})();


/**
 * @param {string} filename
 * @param {any} object
 */
async function write(filename, object) {
  await fs.writeFile(
    path.join(__dirname, filename),
    JSON.stringify(object),
    { encoding: 'utf-8' },
  );
}

/**
 * @param {string} dir
 */
async function ensureDir(dir) {
  await fs.mkdir(
    path.join(__dirname, dir),
    { recursive: true },
  );
}

/**
 * @param {string} dir
 */
async function emptyDir(dir) {
  await fs.rmdir(
    path.join(__dirname, dir),
    { recursive: true },
  );
  await ensureDir(dir);
}

/**
 * @typedef {Object} Row
 * @property {number} type
 * @property {string} provinceCode
 * @property {string} regencyCode
 * @property {string} districtCode
 * @property {string} villageCode
 * @property {string} name
 */


/**
 * @param {Row} param0
 */
function formatProvince({ provinceCode, name }) {
  return { code: provinceCode, name };
}

/**
 * @param {Row} param0
 */
function formatRegency({ provinceCode, regencyCode, name }) {
  return { code: regencyCode, provinceCode, name };
}

/**
 * @param {Row} param0
 */
function formatDistrict({ provinceCode, regencyCode, districtCode, name }) {
  return { code: districtCode, provinceCode, regencyCode, name };
}

/**
 * @param {Row} param0
 */
function formatVillage(
  { villageCode, provinceCode, regencyCode, districtCode, name },
) {
  return { code: villageCode, provinceCode, regencyCode, districtCode, name };
}
