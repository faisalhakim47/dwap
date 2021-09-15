import { District, Province, Regency, RegionData, Village } from './domain.js';

export class Repository {
    constructor(
        private CDN: string,
    ) {}

    private async request<T>(url: string) {
        const response = await fetch(url);
        return (await response.json()) as T;
    }

    private async getMany<T extends RegionData>(
        type: string,
        provinceId?: string,
        regencyId?: string,
        districtId?: string,
    ) {
        if (!provinceId) {
            return this.request<Array<T>>(
                this.CDN
                + '/data/' + type + '.json'
            );
        }
        if (!regencyId) {
            return this.request<Array<T>>(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/' + type + '.json'
            );
        }
        if (!districtId) {
            return this.request<Array<T>>(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '/' + type + '.json'
            );
        }
        return this.request<Array<T>>(
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
        return this.request<Province>(
            this.CDN
            + '/data/provinces/' + provinceId
            + '.json'
        );
    }

    public async getRegency(provinceId: string, regencyId: string) {
        return this.request<Regency>(
            this.CDN
            + '/data/provinces/' + provinceId
            + '/regencies/' + regencyId
            + '.json'
        );
    }

    public async getDistrict(provinceId: string, regencyId: string, districtId: string) {
        return this.request<District>(
            this.CDN
            + '/data/provinces/' + provinceId
            + '/regencies/' + regencyId
            + '/districts/' + districtId
            + '.json'
        );
    }

    public async getVillage(provinceId: string, regencyId: string, districtId: string, villageId: string) {
        return this.request<Village>(
                this.CDN
                + '/data/provinces/' + provinceId
                + '/regencies/' + regencyId
                + '/districts/' + districtId
                + '/villages/' + villageId
                + '.json'
            );
    }
}
