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
var Repository = /** @class */ (function () {
    function Repository(CDN, http) {
        if (http === void 0) { http = Repository.HTTP_CLIENT; }
        this.CDN = CDN;
        this.http = http;
    }
    Repository.prototype.getMany = function (type, provinceId, regencyId, districtId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!provinceId) {
                    return [2 /*return*/, this.http.get(this.CDN
                            + '/data/' + type + '.json')];
                }
                if (!regencyId) {
                    return [2 /*return*/, this.http.get(this.CDN
                            + '/data/provinces/' + provinceId
                            + '/' + type + '.json')];
                }
                if (!districtId) {
                    return [2 /*return*/, this.http.get(this.CDN
                            + '/data/provinces/' + provinceId
                            + '/regencies/' + regencyId
                            + '/' + type + '.json')];
                }
                return [2 /*return*/, this.http.get(this.CDN
                        + '/data/provinces/' + provinceId
                        + '/regencies/' + regencyId
                        + '/districts/' + districtId
                        + '/' + type + '.json')];
            });
        });
    };
    Repository.prototype.getProvinces = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getMany('provinces')];
            });
        });
    };
    Repository.prototype.getRegencies = function (provinceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getMany('regencies', provinceId)];
            });
        });
    };
    Repository.prototype.getDistricts = function (provinceId, regencyId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getMany('districts', provinceId, regencyId)];
            });
        });
    };
    Repository.prototype.getVillages = function (provinceId, regencyId, districtId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getMany('villages', provinceId, regencyId, districtId)];
            });
        });
    };
    Repository.prototype.getProvince = function (provinceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get(this.CDN
                        + '/data/provinces/' + provinceId
                        + '.json')];
            });
        });
    };
    Repository.prototype.getRegency = function (provinceId, regencyId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get(this.CDN
                        + '/data/provinces/' + provinceId
                        + '/regencies/' + regencyId
                        + '.json')];
            });
        });
    };
    Repository.prototype.getDistrict = function (provinceId, regencyId, districtId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get(this.CDN
                        + '/data/provinces/' + provinceId
                        + '/regencies/' + regencyId
                        + '/districts/' + districtId
                        + '.json')];
            });
        });
    };
    Repository.prototype.getVillage = function (provinceId, regencyId, districtId, villageId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.http.get(this.CDN
                        + '/data/provinces/' + provinceId
                        + '/regencies/' + regencyId
                        + '/districts/' + districtId
                        + '/villages/' + villageId
                        + '.json')];
            });
        });
    };
    Repository.prototype.decodeAddressCode = function (addressCode) {
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
                                ? this.getProvince(provinceId)
                                : Promise.resolve(null),
                            isValidProvinceId && isValidRegencyId
                                ? this.getRegency(provinceId, regencyId)
                                : Promise.resolve(null),
                            isValidProvinceId && isValidRegencyId && isValidDistrictId
                                ? this.getDistrict(provinceId, regencyId, districtId)
                                : Promise.resolve(null),
                            isValidProvinceId && isValidRegencyId && isValidDistrictId && isValidVillageId
                                ? this.getVillage(provinceId, regencyId, districtId, villageId)
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
    return Repository;
}());
export { Repository };
//# sourceMappingURL=repository.js.map