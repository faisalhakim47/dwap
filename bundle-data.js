const fs = require('node:fs/promises');
const path = require('node:path');

const MAX_NAME_LENGTH = 37;

(async function () {
  const buffers = [];

  const provinces = await getProvinces();
  for (const province of provinces) {
    buffers.push(row(BigInt(`${province.code}`), province.name));
    const regencies = await getRegencies(province.code);
    for (const regency of regencies) {
      buffers.push(row(BigInt(`${province.code}${regency.code}`), regency.name));
      const districts = await getDistricts(province.code, regency.code);
      for (const district of districts) {
        buffers.push(row(BigInt(`${province.code}${regency.code}${district.code}`), district.name));
        const villages = await getVillages(province.code, regency.code, district.code);
        for (const village of villages) {
          buffers.push(row(BigInt(`${province.code}${regency.code}${district.code}${village.code}`), village.name));
        }
      }
    }
  }

  const buffer = Buffer.concat(buffers);

  await fs.writeFile(path.join(__dirname, './data/data.bin'), buffer);

  console.log(buffer.length);
})();

const chars = " '(),-./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\\".split('');

/**
 * 
 * @param {bigint} code
 * @param {string} name
 */
function row(code, name) {
  const nameChars = name
    .toUpperCase()
    .padStart(MAX_NAME_LENGTH, ' ')
    .split('')
    .map((char) => chars.findIndex((c) => c === char));

  const codeHex = code.toString(16).padStart(16, '0');
  const codeBuff = Buffer.from(codeHex, 'hex');
  const nameBuff = Buffer.from(nameChars);

  const rowBuff = Buffer.concat([codeBuff, nameBuff]);

  if (rowBuff.length !== 45) {
    console.log({
      code,
      name,
      nameChars,
      codeHex,
      codeBuff,
      nameBuff,
      rowBuff,
    });
    throw new Error(`rowBuff.length !== 45`);
  }

  return rowBuff;
}

/**
 * @returns {Promise<Array<Province>>}
 */
async function getProvinces() {
  const json = await fs.readFile('./data/provinces.json', { encoding: 'utf-8' });
  const data = JSON.parse(json);
  return data;
}

/**
 * @param {string} provinceCode
 * @returns {Promise<Array<Regency>>}
 */
async function getRegencies(provinceCode) {
  const json = await fs.readFile(`./data/provinces/${provinceCode}/regencies.json`, { encoding: 'utf-8' });
  const data = JSON.parse(json);
  return data;
}

/**
 * @param {string} provinceCode
 * @param {string} regencyCode
 * @returns {Promise<Array<District>>}
 */
async function getDistricts(provinceCode, regencyCode) {
  const json = await fs.readFile(`./data/provinces/${provinceCode}/regencies/${regencyCode}/districts.json`, { encoding: 'utf-8' });
  const data = JSON.parse(json);
  return data;
}

/**
 * @param {string} provinceCode
 * @param {string} regencyCode
 * @param {string} districtCode
 * @returns {Promise<Array<Village>>}
 */
async function getVillages(provinceCode, regencyCode, districtCode) {
  const json = await fs.readFile(`./data/provinces/${provinceCode}/regencies/${regencyCode}/districts/${districtCode}/villages.json`, { encoding: 'utf-8' });
  const data = JSON.parse(json);
  return data;
}


/**
 * @typedef {Object} Area
 * @property {string} code
 * @property {string} name
 */

/**
 * @typedef {Area} Province
 */

/**
 * @typedef {Area} Regency
 * @property {string} provinceCode
 */

/**
 * @typedef {Area} District
 * @property {string} provinceCode
 * @property {string} regencyCode
 */

/**
 * @typedef {Area} Village
 * @property {string} provinceCode
 * @property {string} regencyCode
 * @property {string} districtCode
 */
