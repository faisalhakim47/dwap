const fs = require('node:fs/promises');
const { createReadStream, createWriteStream } = require('node:fs');
const zlib = require('node:zlib');

// (async function () {

//   const provinces = JSON.parse(await fs.readFile('./data/provinces.json', 'utf-8'));
//   const regencies = JSON.parse(await fs.readFile('./data/regencies.json', 'utf-8'));
//   const districts = JSON.parse(await fs.readFile('./data/districts.json', 'utf-8'));
//   const villages = JSON.parse(await fs.readFile('./data/villages.json', 'utf-8'));

//   let maxProvinceId = 0;
//   let maxRegencyId = 0;
//   let maxDistrictId = 0;
//   let maxVillageId = 0;
//   let maxNameLength = 0;
//   let charSet = new Set();

//   for (const village of villages) {
//     const provinceId = parseInt(village.provinceId, 10);
//     const regencyId = parseInt(village.regencyId, 10);
//     const districtId = parseInt(village.districtId, 10);
//     const villageId = parseInt(village.id, 10);

//     const province = provinces.find((province) => parseInt(province.id, 10) === provinceId);
//     const regency = regencies.find((regency) => parseInt(regency.id, 10) === regencyId);
//     const district = districts.find((district) => parseInt(district.id, 10) === districtId);

//     const provinceName = province.name.toUpperCase();
//     const regencyName = regency.name.toUpperCase();
//     const districtName = district.name.toUpperCase();
//     const villageName = village.name.toUpperCase();

//     const provinceNameChars = provinceName.split('');
//     const regencyNameChars = regencyName.split('');
//     const districtNameChars = districtName.split('');
//     const villageNameChars = villageName.split('');

//     if (provinceId > maxProvinceId) {
//       maxProvinceId = provinceId;
//     }

//     if (regencyId > maxRegencyId) {
//       maxRegencyId = regencyId;
//     }

//     if (districtId > maxDistrictId) {
//       maxDistrictId = districtId;
//     }

//     if (villageId > maxVillageId) {
//       maxVillageId = villageId;
//     }

//     if (provinceName.length > maxNameLength) {
//       maxNameLength = provinceName.length;
//     }

//     if (regencyName.length > maxNameLength) {
//       maxNameLength = regencyName.length;
//     }

//     if (districtName.length > maxNameLength) {
//       maxNameLength = districtName.length;
//     }

//     if (villageName.length > maxNameLength) {
//       maxNameLength = villageName.length;
//     }

//     for (const char of provinceNameChars) {
//       charSet.add(char);
//     }

//     for (const char of regencyNameChars) {
//       charSet.add(char);
//     }

//     for (const char of districtNameChars) {
//       charSet.add(char);
//     }

//     for (const char of villageNameChars) {
//       charSet.add(char);
//     }
//   }

// })();

const rowLength = 250n;

(async function () {

  const provinces = JSON.parse(await fs.readFile('./data/provinces.json', 'utf-8'));
  const regencies = JSON.parse(await fs.readFile('./data/regencies.json', 'utf-8'));
  const districts = JSON.parse(await fs.readFile('./data/districts.json', 'utf-8'));
  const villages = JSON.parse(await fs.readFile('./data/villages.json', 'utf-8'));

  let binStr = '';

  for (const province of provinces) {
    const provinceId = parseInt(province.id, 10);
    const provinceName = province.name.toUpperCase();
    const provinceBinStr = dataToBinStr(provinceId, 0, 0, 0, provinceName);
    binStr += provinceBinStr;
  }

  for (const regency of regencies) {
    const provinceId = parseInt(regency.provinceId, 10);
    const regencyId = parseInt(regency.id, 10);
    const regencyName = regency.name.toUpperCase();
    const regencyBinStr = dataToBinStr(provinceId, regencyId, 0, 0, regencyName);
    binStr += regencyBinStr;
  }

  for (const district of districts) {
    const provinceId = parseInt(district.provinceId, 10);
    const regencyId = parseInt(district.regencyId, 10);
    const districtId = parseInt(district.id, 10);
    const districtName = district.name.toUpperCase();
    const districtBinStr = dataToBinStr(provinceId, regencyId, districtId, 0, districtName);
    binStr += districtBinStr;
  }

  for (const village of villages) {
    const provinceId = parseInt(village.provinceId, 10);
    const regencyId = parseInt(village.regencyId, 10);
    const districtId = parseInt(village.districtId, 10);
    const villageId = parseInt(village.id, 10);
    const villageName = village.name.toUpperCase();
    const villageBinStr = dataToBinStr(provinceId, regencyId, districtId, villageId, villageName);
    binStr += villageBinStr;
  }

  const binStrLength = binStr.length;
  const binStrLengthModulo = binStrLength % 8;
  const binStr8BitLength = (binStrLength + binStrLengthModulo) / 8;

  const u8a = new Uint8Array(binStr8BitLength);
  for (let index = 0; index < binStr8BitLength; index++) {
    const binStr8Bit = binStr.substr(index * 8, 8);
    const binInt8Bit = parseInt(binStr8Bit, 2);
    u8a[index] = binInt8Bit;
  }

  fs.writeFile('./data/data.bin', u8a , 'utf-8');

  const input = createReadStream('./data/data.bin');
  const output = createWriteStream('./data/data.bin.gz');

  input.pipe(zlib.createGzip({ level: 5 })).pipe(output);
})();


/**
 * @param {number} provinceId max 92
 * @param {number} regencyId max 79
 * @param {number} districtId max 68
 * @param {number} villageId max 2116
 * @param {string} name charset: " -,.'()/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; max length 37
 * @returns length 250
 */
function dataToBinStr(
  provinceId,
  regencyId,
  districtId,
  villageId,
  name,
) {
  const charset = " -,.'()/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return BigInt(provinceId).toString(2).padStart(7, '0') // provinceId
    + BigInt(regencyId).toString(2).padStart(7, '0') // provinceId
    + BigInt(districtId).toString(2).padStart(7, '0') // provinceId
    + BigInt(villageId).toString(2).padStart(7, '0') // provinceId
    + name
      .padStart(37, ' ')
      .split('')
      .map((char) => {
        return charset.indexOf(char).toString(2).padStart(6, '0')
      })
      .join('')
}
