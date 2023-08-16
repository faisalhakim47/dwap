var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;pe
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ViewBinder = /** @class */ (function () {
    function ViewBinder(el, repo, defaultAddressCode, disabled, readonly, placeholder) {
        var _this = this;
        if (defaultAddressCode === void 0) { defaultAddressCode = ''; }
        if (disabled === void 0) { disabled = false; }
        if (readonly === void 0) { readonly = false; }
        if (placeholder === void 0) { placeholder = '-- pilih --'; }
        this.el = el;
        this.repo = repo;
        this.disabled = disabled;
        this.readonly = readonly;
        this.placeholder = placeholder;
        this.destroy = function () { };
        this.eventListeners = {};
        this.setValueQueue = Promise.resolve();
        var handleProvinceChange = function () {
            _this.setValue(_this.provinceCode);
        };
        var handleRegencyChange = function () {
            _this.setValue(_this.provinceCode, _this.regencyCode);
        };
        var handleDistrictChange = function () {
            _this.setValue(_this.provinceCode, _this.regencyCode, _this.districtCode);
        };
        var handleVillageChange = function () {
            _this.emit('change', _this.addressCode);
        };
        this.provinceSelect.addEventListener('change', handleProvinceChange);
        this.regencySelect.addEventListener('change', handleRegencyChange);
        this.districtSelect.addEventListener('change', handleDistrictChange);
        this.villageSelect.addEventListener('change', handleVillageChange);
        this.destroy = function () {
            _this.provinceSelect.removeEventListener('change', handleProvinceChange);
            _this.regencySelect.removeEventListener('change', handleRegencyChange);
            _this.districtSelect.removeEventListener('change', handleDistrictChange);
            _this.villageSelect.removeEventListener('change', handleVillageChange);
            _this.el = null;
            _this.repo = null;
            _this.eventListeners = null;
        };
        this.setAddressCode(defaultAddressCode);
    }
    ViewBinder.prototype.addEventListener = function (type, listener) {
        var listeners = this.eventListeners[type] || (this.eventListeners[type] = []);
        if (listeners.indexOf(listener) === -1) {
            listeners.push(listener);
        }
    };
    ViewBinder.prototype.removeEventListener = function (type, listener) {
        this.eventListeners[type] = (this.eventListeners[type] || [])
            .filter(function (_listener) {
            return _listener !== listener;
        });
    };
    Object.defineProperty(ViewBinder.prototype, "provinceCode", {
        get: function () {
            return this.getValueFromSelect(this.provinceSelect);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBinder.prototype, "regencyCode", {
        get: function () {
            return this.getValueFromSelect(this.regencySelect);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBinder.prototype, "districtCode", {
        get: function () {
            return this.getValueFromSelect(this.districtSelect);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBinder.prototype, "villageCode", {
        get: function () {
            return this.getValueFromSelect(this.villageSelect);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBinder.prototype, "addressCode", {
        get: function () {
            return this.provinceCode + this.regencyCode + this.districtCode + this.villageCode;
        },
        enumerable: false,
        configurable: true
    });
    ViewBinder.prototype.setDisabled = function (disabled) {
        if (typeof disabled !== 'boolean')
            return;
        this.disabled = disabled;
        this.applySelectDisabled(this.provinceSelect);
        this.applySelectDisabled(this.regencySelect);
        this.applySelectDisabled(this.districtSelect);
        this.applySelectDisabled(this.villageSelect);
    };
    ViewBinder.prototype.setReadonly = function (readonly) {
        if (typeof readonly !== 'boolean')
            return;
        this.readonly = readonly;
        this.applySelectReadonly(this.provinceSelect);
        this.applySelectReadonly(this.regencySelect);
        this.applySelectReadonly(this.districtSelect);
        this.applySelectReadonly(this.villageSelect);
    };
    ViewBinder.prototype.applySelectReadonly = function (select) {
        var _this = this;
        Array.from(select.options)
            .forEach(function (option) {
            option.disabled = (!option.selected && _this.readonly) || option.textContent === _this.placeholder;
        });
    };
    ViewBinder.prototype.applySelectDisabled = function (select) {
        if (this.disabled || this.readonly) {
            select.attributes.setNamedItem(document.createAttribute('disabled'));
        }
        else {
            select.removeAttribute('disabled');
        }
    };
    ViewBinder.prototype.setValue = function (provinceId, regencyId, districtId, villageId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.regencySelect.disabled = true;
                this.districtSelect.disabled = true;
                this.villageSelect.disabled = true;
                return [2 /*return*/, this.setValueQueue = this.setValueQueue
                        .then(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, _, emptyRegency, emptyDistrict, emptyVillage;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, Promise.all([
                                        this.renderProvinces(provinceId).then(function () { return false; }),
                                        provinceId
                                            ? this.renderRegencies(provinceId, regencyId).then(function () { return false; })
                                            : Promise.resolve(true),
                                        provinceId && regencyId
                                            ? this.renderDistricts(provinceId, regencyId, districtId).then(function () { return false; })
                                            : Promise.resolve(true),
                                        provinceId && regencyId && districtId
                                            ? this.renderVillages(provinceId, regencyId, districtId, villageId).then(function () { return false; })
                                            : Promise.resolve(true),
                                    ])];
                                case 1:
                                    _a = _b.sent(), _ = _a[0], emptyRegency = _a[1], emptyDistrict = _a[2], emptyVillage = _a[3];
                                    [
                                        { isEmpty: emptyRegency, select: this.regencySelect },
                                        { isEmpty: emptyDistrict, select: this.districtSelect },
                                        { isEmpty: emptyVillage, select: this.villageSelect },
                                    ].forEach(function (_a) {
                                        var isEmpty = _a.isEmpty, select = _a.select;
                                        if (isEmpty) {
                                            _this.emptyOptions(select);
                                            select.disabled = true;
                                        }
                                    });
                                    return [2 /*return*/, this.setValueQueue = Promise.resolve()];
                            }
                        });
                    }); })
                        .catch(function () {
                        return _this.setValueQueue = Promise.resolve();
                    })];
            });
        });
    };
    ViewBinder.prototype.setAddressCode = function (addressCode) {
        if (addressCode === void 0) { addressCode = ''; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.setValue(addressCode.slice(0, 2), addressCode.slice(2, 4), addressCode.slice(4, 6), addressCode.slice(6))];
            });
        });
    };
    ViewBinder.prototype.emit = function (type, payload) {
        (this.eventListeners[type] = this.eventListeners[type] || [])
            .forEach(function (listener) {
            return listener(payload);
        });
    };
    Object.defineProperty(ViewBinder.prototype, "provinceSelect", {
        get: function () {
            return this.el.querySelector(ViewBinder.PROVINCE_SELECT_QUERY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBinder.prototype, "regencySelect", {
        get: function () {
            return this.el.querySelector(ViewBinder.REGENCY_SELECT_QUERY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBinder.prototype, "districtSelect", {
        get: function () {
            return this.el.querySelector(ViewBinder.DISTRICT_SELECT_QUERY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ViewBinder.prototype, "villageSelect", {
        get: function () {
            return this.el.querySelector(ViewBinder.VILLAGE_SELECT_QUERY);
        },
        enumerable: false,
        configurable: true
    });
    ViewBinder.prototype.getValueFromSelect = function (select) {
        if (!select)
            return null;
        var option = select.options.item(select.selectedIndex);
        return option ? option.value : null;
    };
    ViewBinder.prototype.emptyOptions = function (select) {
        while (select.options.length !== 0) {
            select.options.remove(0);
        }
    };
    ViewBinder.prototype.renderOptions = function (select, options) {
        this.emptyOptions(select);
        options.forEach(function (data) {
            var option = document.createElement('option');
            option.value = data.id;
            option.textContent = data.name;
            select.appendChild(option);
        });
    };
    ViewBinder.prototype.setSelected = function (select, value) {
        if (value) {
            var optionIndex = Array.from(select.options)
                .findIndex(function (option) {
                return option.value === value;
            });
            if (optionIndex === -1) {
                this.renderPlaceholderOption(select);
                select.selectedIndex = 0;
            }
            else {
                select.selectedIndex = optionIndex;
            }
        }
        else {
            this.renderPlaceholderOption(select);
            select.selectedIndex = 0;
        }
    };
    ViewBinder.prototype.renderPlaceholderOption = function (select) {
        var firstOption = select.options.item(0);
        var isPlaceholderExist = firstOption
            ? firstOption.dataset.placeholder === 'placeholder'
            : false;
        if (!isPlaceholderExist) {
            var option = document.createElement('option');
            option.dataset.placeholder = 'placeholder';
            option.disabled = true;
            option.textContent = this.placeholder;
            select.insertAdjacentElement('afterbegin', option);
        }
    };
    ViewBinder.prototype.renderProvinces = function (provinceId) {
        return __awaiter(this, void 0, void 0, function () {
            var select, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.provinceSelect;
                        select.attributes.setNamedItem(document.createAttribute('disabled'));
                        if (!(select.dataset.rendered !== 'rendered')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getProvinces()];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.rendered = 'rendered';
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, provinceId);
                        this.applySelectDisabled(select);
                        this.applySelectReadonly(select);
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewBinder.prototype.renderRegencies = function (provinceId, regencyId) {
        return __awaiter(this, void 0, void 0, function () {
            var select, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.regencySelect;
                        select.attributes.setNamedItem(document.createAttribute('disabled'));
                        if (!(select.dataset.provinceId !== provinceId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getRegencies(provinceId)];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.provinceId = provinceId;
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, regencyId);
                        this.applySelectDisabled(select);
                        this.applySelectReadonly(select);
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewBinder.prototype.renderDistricts = function (provinceId, regencyId, districtId) {
        return __awaiter(this, void 0, void 0, function () {
            var select, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.districtSelect;
                        select.attributes.setNamedItem(document.createAttribute('disabled'));
                        if (!(select.dataset.regencyId !== regencyId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getDistricts(provinceId, regencyId)];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.regencyId = regencyId;
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, districtId);
                        this.applySelectDisabled(select);
                        this.applySelectReadonly(select);
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewBinder.prototype.renderVillages = function (provinceId, regencyId, districtId, villageId) {
        return __awaiter(this, void 0, void 0, function () {
            var select, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = this.villageSelect;
                        select.attributes.setNamedItem(document.createAttribute('disabled'));
                        if (!(select.dataset.districtId !== districtId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getVillages(provinceId, regencyId, districtId)];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.districtId = districtId;
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, villageId);
                        this.applySelectDisabled(select);
                        this.applySelectReadonly(select);
                        return [2 /*return*/];
                }
            });
        });
    };
    ViewBinder.PROVINCE_SELECT_QUERY = '.dwap-province';
    ViewBinder.REGENCY_SELECT_QUERY = '.dwap-regency';
    ViewBinder.DISTRICT_SELECT_QUERY = '.dwap-district';
    ViewBinder.VILLAGE_SELECT_QUERY = '.dwap-village';
    return ViewBinder;
}());
export { ViewBinder };
//# sourceMappingURL=view-binder.js.map