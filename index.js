window.dwap = (function () {
    const CDN = 'https://cdn.jsdelivr.net/gh/faisalhakim47/dwap@latest';

    function request(url) {
        return new Promise((resolve, reject) => {
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

    function getProvinces() {
        return request(CDN + '/data/provinces.json');
    }

    function getRegencies({ provinceId }) {
        return request(CDN + '/data/provinces/' + provinceId + '/regencies.json');
    }

    function getDistricts({ provinceId, regencyId }) {
        return request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts.json');
    }

    function getVillages({ provinceId, regencyId, districtId }) {
        return request(CDN + '/data/provinces/' + provinceId + '/regencies/' + regencyId + '/districts/' + districtId + '/villages.json');
    }

    return {
        getProvinces,
        getRegencies,
        getDistricts,
        getVillages,
    };
})();