import { District, Province, Regency, Village } from './domain.js';
import { Repository } from './repository.js';
declare type EventListener = (addressCode: string) => void;
interface DecodedAddressCode {
    province?: Province;
    regency?: Regency;
    district?: District;
    village?: Village;
}
export declare class ViewBinder {
    private el;
    private repo;
    static PROVINCE_SELECT_QUERY: string;
    static REGENCY_SELECT_QUERY: string;
    static DISTRICT_SELECT_QUERY: string;
    static VILLAGE_SELECT_QUERY: string;
    destroy: () => void;
    private eventListeners;
    private setValueQueue;
    constructor(el: HTMLElement, repo: Repository, defaultAddressCode?: string);
    addEventListener(type: string, listener: EventListener): void;
    removeEventListener(type: string, listener: EventListener): void;
    get provinceCode(): string;
    get regencyCode(): string;
    get districtCode(): string;
    get villageCode(): string;
    get addressCode(): string;
    setValue(provinceId?: string, regencyId?: string, districtId?: string, villageId?: string): Promise<void>;
    setAddressCode(addressCode?: string): Promise<void>;
    decodeAddressCode(addressCode: string): Promise<DecodedAddressCode>;
    private emit;
    private get provinceSelect();
    private get regencySelect();
    private get districtSelect();
    private get villageSelect();
    private getValueFromSelect;
    private emptyOptions;
    private renderOptions;
    private setSelected;
    private renderPlaceholderOption;
    private renderProvinces;
    private renderRegencies;
    private renderDistricts;
    private renderVillages;
}
export {};
//# sourceMappingURL=view-binder.d.ts.map