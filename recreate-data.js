// @ts-check

const fs = require('fs/promises');
const path = require('path');


(async function () {
  const SOURCE = "https://raw.githubusercontent.com/cahyadsn/wilayah/master/db/wilayah.sql";

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
        provinceId: keyParts[0],
        regencyId: keyParts[1],
        districtId: keyParts[2],
        villageId: keyParts[3],
        name: row.slice(row.indexOf("','") + 3, row.indexOf("')")),
      };
    });

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
    const provinceDir = "./data/provinces/" + province.provinceId;

    await ensureDir(provinceDir);

    const regencies = data.filter((row) =>
      row.type === 2 &&
      row.provinceId === province.provinceId
    );
    const districts = data.filter((row) =>
      row.type === 3 &&
      row.provinceId === province.provinceId
    );
    const villages = data.filter((row) =>
      row.type === 4 &&
      row.provinceId === province.provinceId
    );

    await write(provinceDir + ".json", formatProvince(province));
    await write(provinceDir + "/regencies.json", regencies.map(formatRegency));
    await write(provinceDir + "/districts.json", districts.map(formatDistrict));
    await write(provinceDir + "/villages.json", villages.map(formatVillage));

    for (const regency of regencies) {
      const regencyDir = provinceDir + "/regencies/" + regency.regencyId;

      await ensureDir(regencyDir);

      const districts = data.filter((row) =>
        row.type === 3 &&
        row.provinceId === province.provinceId &&
        row.regencyId === regency.regencyId
      );
      const villages = data.filter((row) =>
        row.type === 4 &&
        row.provinceId === province.provinceId &&
        row.regencyId === regency.regencyId
      );

      await write(regencyDir + ".json", formatRegency(regency));
      await write(regencyDir + "/districts.json", districts.map(formatDistrict));
      await write(regencyDir + "/villages.json", villages.map(formatVillage));

      for (const district of districts) {
        const districtDir = regencyDir + "/districts/" + district.districtId;

        await ensureDir(districtDir);

        const villages = data.filter((row) =>
          row.type === 4 &&
          row.provinceId === province.provinceId &&
          row.regencyId === regency.regencyId &&
          row.districtId === district.districtId
        );

        await write(districtDir + ".json", formatDistrict(district));
        await write(districtDir + "/villages.json", villages.map(formatVillage));

        await ensureDir(districtDir + "/villages");

        for (const village of villages) {
          const villageDir = districtDir + "/villages/" + village.villageId;
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
 * @property {string} provinceId
 * @property {string} regencyId
 * @property {string} districtId
 * @property {string} villageId
 * @property {string} name
 */


/**
 * @param {Row} param0
 */
function formatProvince({ provinceId, name }) {
  return { id: provinceId, name };
}

/**
 * @param {Row} param0
 */
function formatRegency({ provinceId, regencyId, name }) {
  return { id: regencyId, provinceId, name };
}

/**
 * @param {Row} param0
 */
function formatDistrict({ provinceId, regencyId, districtId, name }) {
  return { id: districtId, provinceId, regencyId, name };
}

/**
 * @param {Row} param0
 */
function formatVillage(
  { villageId, provinceId, regencyId, districtId, name },
) {
  return { id: villageId, provinceId, regencyId, districtId, name };
}
