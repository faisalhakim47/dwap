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
        getProvinces: function () {
            return request(CDN + '/data/provinces.json');
        },
        getRegencies: function (provinceId) {
            return provinceId
                ? request(CDN + '/data/provinces/' + provinceId + '/regencies.json')
                : request(CDN + '/data/regencies.json');
        },
        getDistricts: function (provinceId, regencyId) {
            return provinceId
                ? (
                    regencyId
                        ? request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts.json')
                        : request(CDN + '/data/provinces/' + provinceId + '/districts.json')
                )
                : request(CDN + '/data/districts.json');
        },
        getVillages: function (provinceId, regencyId, districtId) {
            return provinceId
                ? (
                    regencyId
                        ? (
                            districtId
                                ? request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts/' + districtId + '/villages.json')
                                : request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/villages.json')
                        )
                        : request(CDN + '/data/provinces/' + provinceId + '/villages.json')
                )
                : request(CDN + '/data/villages.json');
        },
        getProvince: function (provinceId) {
            return request(CDN + '/data/provinces/' + provinceId + '.json');
        },
        getRegency: function (provinceId, regencyId) {
            return request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '.json');
        },
        getDistrict: function (provinceId, regencyId, districtId) {
            return request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts/' + districtId + '.json');
        },
        getVillage: function (provinceId, regencyId, districtId, villageId) {
            return request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts/' + districtId + '/villages/' + villageId + '.json');
        },
    };
})();