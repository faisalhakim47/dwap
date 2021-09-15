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
                case 0: case 1: t = op; break;
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
    function ViewBinder(el, repo, defaultAddressCode) {
        var _this = this;
        this.el = el;
        this.repo = repo;
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
    ViewBinder.prototype.decodeAddressCode = function (addressCode) {
        return __awaiter(this, void 0, void 0, function () {
            var provinceId, regencyId, districtId, villageId, isValidProvinceId, isValidRegencyId, isValidDistrictId, isValidVillageId, promises, _a, province, regency, district, village;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        provinceId = addressCode.slice(0, 2);
                        regencyId = addressCode.slice(2, 4);
                        districtId = addressCode.slice(4, 6);
                        villageId = addressCode.slice(6);
                        isValidProvinceId = provinceId.length === 2;
                        isValidRegencyId = regencyId.length === 2;
                        isValidDistrictId = districtId.length === 2;
                        isValidVillageId = villageId.length > 1;
                        promises = [
                            isValidProvinceId
                                ? this.repo.getProvince(provinceId)
                                : Promise.resolve(null),
                            isValidProvinceId && isValidRegencyId
                                ? this.repo.getRegency(provinceId, regencyId)
                                : Promise.resolve(null),
                            isValidProvinceId && isValidRegencyId && isValidDistrictId
                                ? this.repo.getDistrict(provinceId, regencyId, districtId)
                                : Promise.resolve(null),
                            isValidProvinceId && isValidRegencyId && isValidDistrictId && isValidVillageId
                                ? this.repo.getVillage(provinceId, regencyId, districtId, villageId)
                                : Promise.resolve(null),
                        ];
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a = _b.sent(), province = _a[0], regency = _a[1], district = _a[2], village = _a[3];
                        return [2 /*return*/, { province: province, regency: regency, district: district, village: village }];
                }
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
            option.textContent = '--- Pilih ---';
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
                        select.disabled = true;
                        if (!(select.dataset.rendered !== 'rendered')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getProvinces()];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.rendered = 'rendered';
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, provinceId);
                        select.disabled = false;
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
                        select.disabled = true;
                        if (!(select.dataset.provinceId !== provinceId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getRegencies(provinceId)];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.provinceId = provinceId;
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, regencyId);
                        select.disabled = false;
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
                        select.disabled = true;
                        if (!(select.dataset.regencyId !== regencyId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getDistricts(provinceId, regencyId)];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.regencyId = regencyId;
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, districtId);
                        select.disabled = false;
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
                        select.disabled = true;
                        if (!(select.dataset.districtId !== districtId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.repo.getVillages(provinceId, regencyId, districtId)];
                    case 1:
                        options = _a.sent();
                        this.renderOptions(select, options);
                        select.dataset.districtId = districtId;
                        _a.label = 2;
                    case 2:
                        this.setSelected(select, villageId);
                        select.disabled = false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1iaW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdmlldy1iaW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0lBVUksb0JBQ1ksRUFBZSxFQUNmLElBQWdCLEVBQ3hCLGtCQUEyQjtRQUgvQixpQkF5Q0M7UUF4Q1csT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLFNBQUksR0FBSixJQUFJLENBQVk7UUFOckIsWUFBTyxHQUFHLGNBQU8sQ0FBQyxDQUFDO1FBQ2xCLG1CQUFjLEdBQW1CLEVBQUUsQ0FBQztRQUNwQyxrQkFBYSxHQUFrQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFPckQsSUFBTSxvQkFBb0IsR0FBRztZQUN6QixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUM7UUFFRixJQUFNLG1CQUFtQixHQUFHO1lBQ3hCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDO1FBRUYsSUFBTSxvQkFBb0IsR0FBRztZQUN6QixLQUFJLENBQUMsUUFBUSxDQUNULEtBQUksQ0FBQyxZQUFZLEVBQ2pCLEtBQUksQ0FBQyxXQUFXLEVBQ2hCLEtBQUksQ0FBQyxZQUFZLENBQ3BCLENBQUM7UUFDTixDQUFDLENBQUM7UUFFRixJQUFNLG1CQUFtQixHQUFHO1lBQ3hCLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFF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