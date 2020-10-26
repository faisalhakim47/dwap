window.dwap = (function () {
    const CDN = 'https://cdn.jsdelivr.net/gh/faisalhakim47/dwap@latest';
    function request(url) {
        return new Promise(function (resolve, reject) {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.addEventListener('readystatechange', () => {
                if (req.readyState !== req.DONE) return;
                if (req.status >= 400) reject(req);
                else resolve(JSON.parse(req.responseText));
            });
            req.addEventListener('error', reject);
            req.send();
        });
    }
    return {
        getProvinces: () => request(CDN + '/data/provinces.json'),
        getRegencies: (provinceId) => request(CDN + '/data/provinces/' + provinceId + '/regencies.json'),
        getDistricts: (provinceId, regencyId) => request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts.json'),
        getVillages: (provinceId, regencyId, districtId) => request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts/' + districtId + '/villages.json'),
        getProvince: (provinceId) => request(CDN + '/data/provinces/' + provinceId + '.json'),
        getRegency: (provinceId, regencyId) => request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '.json'),
        getDistrict: (provinceId, regencyId, districtId) => request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts/' + districtId + '.json'),
        getVillage: (provinceId, regencyId, districtId, villageId) => request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts/' + districtId + '/villages/' + villageId + '.json'),
    };
})();