declare namespace Dwap {
    interface Province {
        id: string;
        name: string;
    }
    interface Regency {
        id: string;
        provinceId: string;
        name: string;
    }
    interface District {
        id: string;
        provinceId: string;
        regencyId: string;
        name: string;
    }
    interface Village {
        id: string;
        provinceId: string;
        regencyId: string;
        districtId: string;
        name: string;
    }
    export class Repository {
        private CDN;
        constructor(CDN?: string);
        private request;
        private getMany;
        getProvinces(): Promise<Province[]>;
        getRegencies(provinceId: string): Promise<Regency[]>;
        getDistricts(provinceId: string, regencyId: string): Promise<District[]>;
        getVillages(provinceId: string, regencyId: string, districtId: string): Promise<Village[]>;
        getProvince(provinceId: string): Promise<Province>;
        getRegency(provinceId: string, regencyId: string): Promise<Regency>;
        getDistrict(provinceId: string, regencyId: string, districtId: string): Promise<District>;
        getVillage(provinceId: string, regencyId: string, districtId: string, villageId: string): Promise<Village>;
    }
    type EventListener = (addressCode: string) => void;
    export class ViewBinder {
        private el;
        private repo;
        static PROVINCE_SELECT_QUERY: string;
        static REGENCY_SELECT_QUERY: string;
        static DISTRICT_SELECT_QUERY: string;
        static VILLAGE_SELECT_QUERY: string;
        destroy: () => void;
        private eventListeners;
        constructor(el: HTMLElement, repo?: Repository);
        addEventListener(type: string, listener: EventListener): void;
        removeEventListener(type: string, listener: EventListener): void;
        get provinceCode(): string;
        get regencyCode(): string;
        get districtCode(): string;
        get villageCode(): string;
        get addressCode(): string;
        setValue(provinceId?: string, regencyId?: string, districtId?: string, villageId?: string): Promise<void>;
        setAddressCode(addressCode: string): Promise<void>;
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
}
//# sourceMappingURL=index.d.ts.map