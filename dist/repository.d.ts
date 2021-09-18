import { HttpClient } from './http/http.js';
import { DecodedAddressCode, District, Province, Regency, Village } from './domain.js';
export declare class Repository {
    private CDN;
    private http;
    static HTTP_CLIENT: HttpClient;
    constructor(CDN: string, http?: HttpClient);
    private getMany;
    getProvinces(): Promise<Province[]>;
    getRegencies(provinceId?: string): Promise<Regency[]>;
    getDistricts(provinceId?: string, regencyId?: string): Promise<District[]>;
    getVillages(provinceId?: string, regencyId?: string, districtId?: string): Promise<Village[]>;
    getProvince(provinceId: string): Promise<Province>;
    getRegency(provinceId: string, regencyId: string): Promise<Regency>;
    getDistrict(provinceId: string, regencyId: string, districtId: string): Promise<District>;
    getVillage(provinceId: string, regencyId: string, districtId: string, villageId: string): Promise<Village>;
    decodeAddressCode(addressCode: string): Promise<DecodedAddressCode>;
}
//# sourceMappingURL=repository.d.ts.map