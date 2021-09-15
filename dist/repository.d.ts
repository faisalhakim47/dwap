import { District, Province, Regency, Village } from './domain.js';
export declare class Repository {
    private CDN;
    constructor(CDN: string);
    private request;
    private getMany;
    getProvinces(): Promise<Province[]>;
    getRegencies(provinceId?: string): Promise<Regency[]>;
    getDistricts(provinceId?: string, regencyId?: string): Promise<District[]>;
    getVillages(provinceId?: string, regencyId?: string, districtId?: string): Promise<Village[]>;
    getProvince(provinceId: string): Promise<Province>;
    getRegency(provinceId: string, regencyId: string): Promise<Regency>;
    getDistrict(provinceId: string, regencyId: string, districtId: string): Promise<District>;
    getVillage(provinceId: string, regencyId: string, districtId: string, villageId: string): Promise<Village>;
}
//# sourceMappingURL=repository.d.ts.map