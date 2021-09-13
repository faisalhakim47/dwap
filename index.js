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
        constructor(CDN = 'https://cdn.statically.io/gh/faisalhakim47/dwap/1.1.4') {
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
                    + '/' + type + '.json'
                );
            }
            if (!districtId) {
                return this._request(
                    this.CDN
                    + '/data/provinces/' + provinceId
                    + '/regencies/' + regencyId
                    + '/' + type + '.json'
                );
            }
            return this._request(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '/districts/' + districtId
                + '/' + type + '.json'
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
            this.eventListeners = {};

            this._handleProvinceChange = () => {
                this.setValue(this.provinceCode);
            };

            this._handleRegencyChange = () => {
                this.setValue(this.provinceCode, this.regencyCode);
            };

            this._handleDistrictChange = () => {
                this.setValue(
                    this.provinceCode,
                    this.regencyCode,
                    this.districtCode
                );
            };

            this._handleVillageChange = () => {
                this.emit('change', this.addressCode);
            };

            this._provinceSelect.addEventListener('change', this._handleProvinceChange);
            this._regencySelect.addEventListener('change', this._handleRegencyChange);
            this._districtSelect.addEventListener('change', this._handleDistrictChange);

            this.destroy = () => {
                this._provinceSelect.removeEventListener('change', this._handleProvinceChange);
                this._regencySelect.removeEventListener('change', this._handleRegencyChange);
                this._districtSelect.removeEventListener('change', this._handleDistrictChange);
                this.el = null;
                this.repo = null;
                this.eventListeners = null;
            };
        }

        /**
         * @param {string} type
         * @param {(payload: any) => void} listener
         * @returns {void}
         */
        addEventListener(type, listener) {
            const listeners = this.eventListeners[type] || (this.eventListeners[type] = []);
            if (listeners.indexOf(listener) === -1) {
                listeners.push(listener);
            }
        }

        /**
         * @param {string} type
         * @param {(payload: any) => void} listener
         * @returns {void}
         */
        removeEventListener(type, listener) {
            this.eventListeners[type] = (this.eventListeners[type] = [])
                .filter((_listener) => {
                    return _listener !== listener;
                });
        }

        /**
         * @param {string} type
         * @param {any} payload
         */
        emit(type, payload) {
            (this.eventListeners[type] = [])
                .forEach((listener) => {
                    return listener(payload);
                });
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
         * @returns {string}
         */
         get addressCode() {
            return this.provinceCode + this.regencyCode + this.districtCode + this.villageCode;
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
         * @param {HTMLSelectElement} select
         * @param {string} value
         */
        _setSelected(select, value) {
            if (!value) {
                const isPlaceholderExist = select.options.item(0).disabled;
                if (!isPlaceholderExist) {
                    const option = document.createElement('option');
                    option.disabled = true;
                    option.selected = true;
                    option.textContent = '--- Pilih ---';
                    select.insertAdjacentElement('afterbegin', option);
                }
                select.selectedIndex = 0;
                return;
            }
            const optionIndex = Array.prototype.slice.call(select.options)
                .findIndex(select.options, (option) => {
                    return option.value === value;
                });
            select.selectedIndex = optionIndex === -1 ? 0 : optionIndex;
        }

        /**
         * @param {string} [provinceId]
         * @returns {Promise<void>}
         */
        _renderProvinces(provinceId) {
            const select = this._provinceSelect;
            let promise = Promise.resolve();
            if (select.dataset.rendered !== 'rendered') {
                promise = this.repo.getProvinces()
                    .then((options) => {
                        this._renderOptions(
                            select,
                            options,
                            provinceId
                        );
                        select.dataset.rendered = 'rendered'
                    });
            }
            return promise.then(() => {
                this._setSelected(select, provinceId);
            });
        }

        /**
         * @param {string} provinceId
         * @param {string} [regencyId]
         * @returns {Promise<void>}
         */
        _renderRegencies(provinceId, regencyId) {
            const select = this._regencySelect;
            let promise = Promise.resolve();
            if (select.dataset.provinceId !== provinceId) {
                promise = this.repo.getRegencies(provinceId)
                    .then((options) => {
                        this._renderOptions(
                            select,
                            options,
                            regencyId
                        );
                        select.dataset.provinceId = provinceId;
                    });
            }
            return promise.then(() => {
                this._setSelected(select, regencyId);
            });
        }

        /**
         * @param {string} provinceId
         * @param {string} regencyId
         * @param {string} [districtId]
         * @returns {Promise<void>}
         */
        _renderDistricts(provinceId, regencyId, districtId) {
            const select = this._districtSelect;
            let promise = Promise.resolve();
            if (select.dataset.regencyId !== regencyId) {
                promise = this.repo.getDistricts(provinceId, regencyId)
                    .then((options) => {
                        this._renderOptions(
                            select,
                            options,
                            districtId
                        );
                        select.dataset.regencyId = regencyId;
                    });
            }
            return promise.then(() => {
                this._setSelected(select, districtId);
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
            const select = this._villageSelect;
            let promise = Promise.resolve();
            if (select.dataset.districtId !== districtId) {
                promise = this.repo.getVillages(provinceId, regencyId, districtId)
                    .then((options) => {
                        this._renderOptions(
                            select,
                            options,
                            villageId
                        );
                        select.dataset.districtId = districtId;
                    });
            }
            return promise.then(() => {
                this._setSelected(select, villageId);
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
            this._provinceSelect.disabled = true;
            this._regencySelect.disabled = true;
            this._districtSelect.disabled = true;
            this._villageSelect.disabled = true;
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
