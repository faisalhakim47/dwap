export interface RegionData {
    id: string;
    name: string;
}
export interface Province extends RegionData {
}
export interface Regency extends RegionData {
    provinceId: string;
}
export interface District extends RegionData {
    provinceId: string;
    regencyId: string;
}
export interface Village extends RegionData {
    provinceId: string;
    regencyId: string;
    districtId: string;
}
export interface DecodedAddressCode {
    province?: Province;
    regency?: Regency;
    district?: District;
    village?: Village;
}
//# sourceMappingURL=domain.d.ts.map