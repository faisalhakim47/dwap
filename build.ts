import { emptyDir, ensureDir } from "https://deno.land/std@0.74.0/fs/mod.ts";

const SOURCE =
  "https://raw.githubusercontent.com/cahyadsn/wilayah/master/wilayah_2020.sql";

const request = await fetch(SOURCE);
const raw = await request.text();
const data: Array<Row> = raw
  .slice(raw.indexOf("('11', 'ACEH')"), raw.indexOf("COMMIT;"))
  .split("\n")
  .map((row) => row.trim())
  .filter((row) =>
    row && row !== "INSERT INTO `wilayah_2020` (`kode`, `nama`) VALUES"
  )
  .map((row) => {
    const key = row.slice(2, row.indexOf("', '"));
    const keyParts = key.split(".");
    const type = keyParts.length;
    return {
      type,
      provinceId: keyParts[0],
      regencyId: keyParts[1],
      districtId: keyParts[2],
      villageId: keyParts[3],
      name: row.slice(row.indexOf("', '") + 4, row.indexOf("')")),
    };
  });

await emptyDir("./data");

const provinces = data.filter((row) => row.type === 1);
// const regencies = data.filter((row) => row.type === 2);
// const districts = data.filter((row) => row.type === 3);
// const villages = data.filter((row) => row.type === 4);

await write("./data/provinces.json", provinces.map(formatProvince));
// await write("./data/regencies.json", regencies.map(formatRegency));
// await write("./data/districts.json", districts.map(formatDistrict));
// await write("./data/villages.json", villages.map(formatVillage));

for (const province of provinces) {
  const provinceDir = "./data/provinces/" + province.provinceId;

  await ensureDir(provinceDir);

  const regencies = data.filter((row) =>
    row.type === 2 &&
    row.provinceId === province.provinceId
  );
  // const districts = data.filter((row) =>
  //   row.type === 3 &&
  //   row.provinceId === province.provinceId
  // );
  // const villages = data.filter((row) =>
  //   row.type === 4 &&
  //   row.provinceId === province.provinceId
  // );

  await write(provinceDir + ".json", formatProvince(province));
  await write(provinceDir + "/regencies.json", regencies.map(formatRegency));
  // await write(provinceDir + "/districts.json", districts.map(formatDistrict));
  // await write(provinceDir + "/villages.json", villages.map(formatVillage));

  for (const regency of regencies) {
    const regencyDir = provinceDir + "/regencies/" + regency.regencyId;

    await ensureDir(regencyDir);

    const districts = data.filter((row) =>
      row.type === 3 &&
      row.provinceId === province.provinceId &&
      row.regencyId === regency.regencyId
    );
    // const villages = data.filter((row) =>
    //   row.type === 4 &&
    //   row.provinceId === province.provinceId &&
    //   row.regencyId === regency.regencyId
    // );

    await write(regencyDir + ".json", formatRegency(regency));
    await write(regencyDir + "/districts.json", districts.map(formatDistrict));
    // await write(regencyDir + "/villages.json", villages.map(formatVillage));

    for (const district of districts) {
      const districtDir = regencyDir + "/districts/" + district.districtId;

      await ensureDir(districtDir);

      const villages = data.filter((row) =>
        row.type === 4 &&
        row.provinceId === province.provinceId &&
        row.regencyId === regency.regencyId &&
        row.districtId === district.districtId
      );

      await write(districtDir + ".json", formatDistrict(district));
      await write(districtDir + "/villages.json", villages.map(formatVillage));

      await ensureDir(districtDir + "/villages");

      for (const village of villages) {
        const villageDir = districtDir + "/villages/" + village.villageId;
        await write(villageDir + ".json", formatVillage(village));
      }
    }
  }
}

async function write(filename: string, object: any) {
  await Deno.writeTextFile(
    filename,
    JSON.stringify(object),
    { create: true },
  );
}

interface Row {
  type: number;
  provinceId: string;
  regencyId: string;
  districtId: string;
  villageId: string;
  name: string;
}

function formatProvince({ provinceId, name }: Row) {
  return { id: provinceId, name };
}

function formatRegency({ provinceId, regencyId, name }: Row) {
  return { id: regencyId, provinceId, name };
}

function formatDistrict({ provinceId, regencyId, districtId, name }: Row) {
  return { id: districtId, provinceId, regencyId, name };
}

function formatVillage(
  { villageId, provinceId, regencyId, districtId, name }: Row,
) {
  return { id: villageId, provinceId, regencyId, districtId, name };
}
