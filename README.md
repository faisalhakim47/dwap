# DWAP

Data Wilayah Administrasi Pemerintahan dapat diakses melalui browser atau server. Dapat digunakan untuk mempermudah input alamat wilayah Indonesia.

# Sumber Data

Sumber data berasal dari https://raw.githubusercontent.com/cahyadsn/wilayah/master/wilayah_2020.sql

# Dokumentasi

## Pasang melalui Script

```html
<script src="https://cdn.jsdelivr.net/gh/faisalhakim47/dwap@1.0.1/index.min.js"></script>
```

## Ambil dalam bentuk list

### dwap.getProvinces(): Promise<Array<{ id, name }>>
### dwap.getRegencies(provinceId): Promise<Array<{ id, name }>>
### dwap.getDistricts(provinceId, regencyId): Promise<Array<{ id, name }>>
### dwap.getVillages(provinceId, regencyId, districtId): Promise<Array<{ id, name }>>

## Ambil dalam bentuk individu

### dwap.getProvinces(provinceId): Promise<{ id, name }>
### dwap.getRegencies(provinceId): Promise<{ id, name }>
### dwap.getDistricts(provinceId, regencyId, districtId): Promise<{ id, name }>
### dwap.getVillages(provinceId, regencyId, districtId, villageId): Promise<{ id, name }>
