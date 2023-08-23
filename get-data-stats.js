const fs = require('node:fs/promises');

(async function () {
  let maxProvinceCodeInt = 0;
  let maxRegencyCodeInt = 0;
  let maxDistrictCodeInt = 0;
  let maxVillageCodeInt = 0;
  let maxNameLength = 0;
  let minProvinceCodeInt = Number.MAX_VALUE;
  let minRegencyCodeInt = Number.MAX_VALUE;
  let minDistrictCodeInt = Number.MAX_VALUE;
  let minVillageCodeInt = Number.MAX_VALUE;
  let minNameLength = Number.MAX_VALUE;
  let charSet = new Set();


  const provinces = await getProvinces();
  for (const province of provinces) {
    const provinceCodeInt = parseInt(province.code, 10);

    if ((provinceCodeInt % 1) !== 0) {
      throw new Error(`provinceCodeInt is not integer ${JSON.stringify(province)}`);
    }

    if (provinceCodeInt > maxProvinceCodeInt) {
      maxProvinceCodeInt = provinceCodeInt;
    }

    if (provinceCodeInt < minProvinceCodeInt) {
      minProvinceCodeInt = provinceCodeInt;
    }

    const name = province.name.toUpperCase();

    if (name.length > maxNameLength) {
      maxNameLength = name.length;
    }

    if (name.length < minNameLength) {
      minNameLength = name.length;
    }

    for (const char of name.split('')) {
      charSet.add(char);
    }

    const regencies = await getRegencies(province.code);
    for (const regency of regencies) {
      const regencyCodeInt = parseInt(regency.code, 10);

      if ((regencyCodeInt % 1) !== 0) {
        throw new Error(`regencyCodeInt is not integer ${JSON.stringify(regency)}`);
      }

      if (regencyCodeInt > maxRegencyCodeInt) {
        maxRegencyCodeInt = regencyCodeInt;
      }

      if (regencyCodeInt < minRegencyCodeInt) {
        minRegencyCodeInt = regencyCodeInt;
      }

      const name = regency.name.toUpperCase();

      if (name.length > maxNameLength) {
        maxNameLength = name.length;
      }

      if (name.length < minNameLength) {
        minNameLength = name.length;
      }

      for (const char of name.split('')) {
        charSet.add(char);
      }

      const districts = await getDistricts(province.code, regency.code);
      for (const district of districts) {
        const districtCodeInt = parseInt(district.code, 10);

        if ((districtCodeInt % 1) !== 0) {
          throw new Error(`districtCodeInt is not integer ${JSON.stringify(district)}`);
        }

        if (districtCodeInt > maxDistrictCodeInt) {
          maxDistrictCodeInt = districtCodeInt;
        }

        if (districtCodeInt < minDistrictCodeInt) {
          minDistrictCodeInt = districtCodeInt;
        }

        const name = district.name.toUpperCase();

        if (name.length > maxNameLength) {
          maxNameLength = name.length;
        }

        if (name.length < minNameLength) {
          minNameLength = name.length;
        }

        for (const char of name.split('')) {
          charSet.add(char);
        }

        const villages = await getVillages(province.code, regency.code, district.code);
        for (const village of villages) {
          const villageCodeInt = parseInt(village.code, 10);

          if ((villageCodeInt % 1) !== 0) {
            throw new Error(`villageCodeInt is not integer ${JSON.stringify(village)}`);
          }

          if (villageCodeInt > maxVillageCodeInt) {
            maxVillageCodeInt = villageCodeInt;
          }

          if (villageCodeInt < minVillageCodeInt) {
            minVillageCodeInt = villageCodeInt;
          }

          const name = village.name.toUpperCase();

          if (name.length > maxNameLength) {
            maxNameLength = name.length;
          }

          if (name.length < minNameLength) {
            minNameLength = name.length;
          }

          for (const char of name.split('')) {
            charSet.add(char);
          }
        }
      }
    }
  }

  /** @type {Array<string>} */
  const chars = Array.from(charSet.values());

  const sortedChars = chars
    .map((char) => {
      return char.charCodeAt(0);
    })
    .sort((a, z) => {
      return a - z;
    })
    .map((charCode) => {
      return String.fromCharCode(charCode);
    })
    .join('');

  console.log({
    maxProvinceCodeInt,
    maxRegencyCodeInt,
    maxDistrictCodeInt,
    maxVillageCodeInt,
    maxNameLength,
    minProvinceCodeInt,
    minRegencyCodeInt,
    minDistrictCodeInt,
    minVillageCodeInt,
    minNameLength,
    charSet: sortedChars,
  });

})();

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
