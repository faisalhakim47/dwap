// @ts-check

/**
 * @typedef {Object} Province
 * @property {string} id
 * @property {string} name
 */

/**
 * @typedef {Object} Regency
 * @property {string} id
 * @property {string} provinceId
 * @property {string} name
 */

/**
 * @typedef {Object} District
 * @property {string} id
 * @property {string} provinceId
 * @property {string} regencyId
 * @property {string} name
 */

/**
 * @typedef {Object} Village
 * @property {string} id
 * @property {string} provinceId
 * @property {string} regencyId
 * @property {string} districtId
 * @property {string} name
 */

// @ts-ignore
window.dwap = (function () {
    class Repository {
        /**
         * @param {string} CDN
         */
        constructor(CDN = 'https://cdn.statically.io/gh/faisalhakim47/dwap/1.1.1') {
            this.CDN = CDN;
        }

        /**
         * @template T
         * @param {string} url
         * @returns {Promise<T>}
         */
        _request(url) {
            return fetch(url)
                .then(function (response) {
                    return response.json();
                });
        }

        _getMany(type, provinceId, regencyId, districtId) {
            if (!provinceId) {
                return this._request(
                    this.CDN
                    + '/data/' + type + '.json'
                );
            }
            if (!regencyId) {
                return this._request(
                    this.CDN
                    + '/data/provinces/' + provinceId
                    + '/data/' + type + '.json'
                );
            }
            if (!districtId) {
                return this._request(
                    this.CDN
                    + '/data/provinces/' + provinceId
                    + '/regencies/' + regencyId
                    + '/data/' + type + '.json'
                );
            }
            return this._request(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '/districts/' + districtId
                + '/data/' + type + '.json'
            );
        }

        /**
         * @returns {Promise<Array<Province>>}
         */
        getProvinces() {
            return this._getMany('provinces');
        }

        /**
         * @param {string} [provinceId]
         * @returns {Promise<Array<Regency>>}
         */
        getRegencies(provinceId) {
            return this._getMany('regencies', provinceId);
        }

        /**
         * @param {string} [provinceId]
         * @param {string} [regencyId]
         * @returns {Promise<Array<District>>}
         */
        getDistricts(provinceId, regencyId) {
            return this._getMany('districts', provinceId, regencyId);
        }

        /**
         * @param {string} [provinceId]
         * @param {string} [regencyId]
         * @param {string} [districtId]
         * @returns {Promise<Array<Village>>}
         */
        getVillages(provinceId, regencyId, districtId) {
            return this._getMany('villages', provinceId, regencyId, districtId);
        }

        /**
         * @param {string} provinceId
         * @returns {Promise<Province>}
         */
        getProvince(provinceId) {
            return this._request(
                this.CDN
                + '/data/provinces/' + provinceId
                + '.json'
            );
        }

        /**
         * @param {string} provinceId
         * @param {string} regencyId
         * @returns {Promise<Regency>}
         */
        getRegency(provinceId, regencyId) {
            return this._request(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '.json'
            );
        }

        /**
         * @param {string} provinceId
         * @param {string} regencyId
         * @param {string} districtId
         * @returns {Promise<District>}
         */
        getDistrict(provinceId, regencyId, districtId) {
            return this._request(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '/districts/' + districtId
                + '.json'
            );
        }

        /**
         * @param {string} provinceId
         * @param {string} regencyId
         * @param {string} districtId
         * @param {string} villageId
         * @returns {Promise<Village>}
         */
        getVillage(provinceId, regencyId, districtId, villageId) {
            return this._request(
                    this.CDN
                    + '/data/provinces/' + provinceId
                    + '/regencies/' + regencyId
                    + '/districts/' + districtId
                    + '/villages/' + villageId
                    + '.json'
                );
        }
    }

    class ViewBinder {
        /**
         * @param {HTMLElement} el
         * @param {Object} [options]
         * @param {Repository} [options.repo]
         */
        constructor(el, { repo = new Repository() } = {}) {
            this.el = el;
            this.repo = repo;
        }

        /**
         * @returns {HTMLSelectElement}
         */
        get _provinceSelect() {
            return this.el.querySelector('select.dwap-province');
        }

        /**
         * @returns {HTMLSelectElement}
         */
        get _regencySelect() {
            return this.el.querySelector('select.dwap-regency');
        }

        /**
         * @returns {HTMLSelectElement}
         */
        get _districtSelect() {
            return this.el.querySelector('select.dwap-district');
        }

        /**
         * @returns {HTMLSelectElement}
         */
        get _villageSelect() {
            return this.el.querySelector('select.dwap-village');
        }

        /**
         * @param {HTMLSelectElement} select
         */
        _getValueFromSelect(select) {
            if (!select) return null;
            const option = select.options.item(select.selectedIndex);
            return option ? option.value : null;
        }

        get provinceCode() {
            return this._getValueFromSelect(this._provinceSelect);
        }

        get regencyCode() {
            return this._getValueFromSelect(this._regencySelect);
        }

        get districtCode() {
            return this._getValueFromSelect(this._districtSelect);
        }

        get villageCode() {
            return this._getValueFromSelect(this._villageSelect);
        }

        /**
         * @param {HTMLSelectElement} select
         * @param {boolean} showPlaceholder
         */
        _emptyOptions(select, showPlaceholder) {
            while (select.options.length !== 0) {
                select.options.remove(0);
            }
            if (showPlaceholder) {
                const option = document.createElement('option');
                option.disabled = true;
                option.selected = true;
                option.textContent = '--- Pilih ---';
                select.appendChild(option);
            }
            select.disabled = true;
        }

        /**
         * @param {HTMLSelectElement} select
         * @param {Array<{ id: string, name: string}>} options
         */
        _renderOptions(select, options, preselectValue = null) {
            this._emptyOptions(select, preselectValue === null);
            options.forEach((data) => {
                const option = document.createElement('option');
                option.value = data.id;
                option.textContent = data.name;
                option.selected = data.id === preselectValue;
                select.appendChild(option);
            });
            select.disabled = false;
        }

        /**
         * @param {string} [provinceId]
         * @returns {Promise<void>}
         */
        _renderProvinces(provinceId) {
            return this.repo.getProvinces()
                .then((options) => {
                    this._renderOptions(
                        this._provinceSelect,
                        options,
                        provinceId
                    );
                });
        }

        /**
         * @param {string} provinceId
         * @param {string} [regencyId]
         * @returns {Promise<void>}
         */
        _renderRegencies(provinceId, regencyId) {
            return this.repo.getRegencies(provinceId)
                .then((options) => {
                    this._renderOptions(
                        this._regencySelect,
                        options,
                        regencyId
                    );
                });
        }

        /**
         * @param {string} provinceId
         * @param {string} regencyId
         * @param {string} [districtId]
         * @returns {Promise<void>}
         */
        _renderDistricts(provinceId, regencyId, districtId) {
            return this.repo.getDistricts(provinceId, regencyId)
                .then((options) => {
                    this._renderOptions(
                        this._districtSelect,
                        options,
                        districtId
                    );
                });
        }

        /**
         * @param {string} provinceId
         * @param {string} regencyId
         * @param {string} districtId
         * @param {string} [villageId]
         * @returns {Promise<void>}
         */
        _renderVillages(provinceId, regencyId, districtId, villageId) {
            return this.repo.getVillages(provinceId, regencyId, districtId)
                .then((options) => {
                    this._renderOptions(
                        this._villageSelect,
                        options,
                        villageId
                    );
                });
        }

        /**
         * @param {string} [provinceId]
         * @param {string} [regencyId]
         * @param {string} [districtId]
         * @param {string} [villageId]
         * @returns {Promise<void>}
         */
        setValue(provinceId, regencyId, districtId, villageId) {
            /** @type {Array<Promise<void|boolean>>} */
            const promises = [
                this._renderProvinces(provinceId),
                provinceId
                    ? this._renderRegencies(provinceId, regencyId)
                    : Promise.resolve(true),
                provinceId && regencyId
                    ? this._renderDistricts(provinceId, regencyId, districtId)
                    : Promise.resolve(true),
                provinceId && regencyId && districtId
                    ? this._renderVillages(provinceId, regencyId, districtId, villageId)
                    : Promise.resolve(true),
            ];
            return Promise.all(promises).then(([_, emptyRegency, emptyDistrict, emptyVillage]) => {
                if (emptyRegency) this._emptyOptions(this._regencySelect, true);
                if (emptyDistrict) this._emptyOptions(this._districtSelect, true);
                if (emptyVillage) this._emptyOptions(this._villageSelect, true);
            });
        }

        /**
         * @param {string} [addressCode]
         * @returns {Promise<void>}
         */
        setAddressCode(addressCode) {
            return this.setValue(
                addressCode.slice(0, 2),
                addressCode.slice(2, 4),
                addressCode.slice(4, 6),
                addressCode.slice(6),
            );
        }
    }

    return {
        Repository,
        ViewBinder,
    };
})();
