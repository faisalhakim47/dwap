import { HttpClient } from './http/http.js';
import { DecodedAddressCode, District, Province, Regency, RegionData, Village } from './domain.js';

export class Repository {
    public static HTTP_CLIENT: HttpClient;

    constructor(
        private CDN: string,
        private http: HttpClient = Repository.HTTP_CLIENT,
    ) {}

    private async getMany<T extends RegionData>(
        type: string,
        provinceId?: string,
        regencyId?: string,
        districtId?: string,
    ) {
        if (!provinceId) {
            return this.http.get<Array<T>>(
                this.CDN
                + '/data/' + type + '.json'
            );
        }
        if (!regencyId) {
            return this.http.get<Array<T>>(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/' + type + '.json'
            );
        }
        if (!districtId) {
            return this.http.get<Array<T>>(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '/' + type + '.json'
            );
        }
        return this.http.get<Array<T>>(
            this.CDN
            + '/data/provinces/' + provinceId
            + '/regencies/' + regencyId
            + '/districts/' + districtId
            + '/' + type + '.json'
        );
    }

    public async getProvinces() {
        return this.getMany<Province>('provinces');
    }

    public async getRegencies(provinceId?: string) {
        return this.getMany<Regency>('regencies', provinceId);
    }

    public async getDistricts(provinceId?: string, regencyId?: string) {
        return this.getMany<District>('districts', provinceId, regencyId);
    }

    public async getVillages(provinceId?: string, regencyId?: string, districtId?: string) {
        return this.getMany<Village>('villages', provinceId, regencyId, districtId);
    }

    public async getProvince(provinceId: string) {
        return this.http.get<Province>(
            this.CDN
            + '/data/provinces/' + provinceId
            + '.json'
        );
    }

    public async getRegency(provinceId: string, regencyId: string) {
        return this.http.get<Regency>(
            this.CDN
            + '/data/provinces/' + provinceId
            + '/regencies/' + regencyId
            + '.json'
        );
    }

    public async getDistrict(provinceId: string, regencyId: string, districtId: string) {
        return this.http.get<District>(
            this.CDN
            + '/data/provinces/' + provinceId
            + '/regencies/' + regencyId
            + '/districts/' + districtId
            + '.json'
        );
    }

    public async getVillage(provinceId: string, regencyId: string, districtId: string, villageId: string) {
        return this.http.get<Village>(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '/districts/' + districtId
                + '/villages/' + villageId
                + '.json'
            );
    }

    public async decodeAddressCode(addressCode: string): Promise<DecodedAddressCode> {
        const provinceId = addressCode.slice(0, 2);
        const regencyId = addressCode.slice(2, 4);
        const districtId = addressCode.slice(4, 6);
        const villageId = addressCode.slice(6);
        const isValidProvinceId = provinceId.length === 2;
        const isValidRegencyId = regencyId.length === 2;
        const isValidDistrictId = districtId.length === 2;
        const isValidVillageId = villageId.length > 1;
        const promises = [
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
        const [province, regency, district, village] = await Promise.all(promises);
        return { province, regency, district, village };
    }
}
