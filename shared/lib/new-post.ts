import axios from "axios";

export async function fetchNovaPoshtaAddress(searchString: string) {
  const { data } = await axios.post("https://api.novaposhta.ua/v2.0/json/", {
    apiKey: process.env.NOVA_POSHTA_API_KEY || '4c8f4324cd4a27f4e2226ab11e0a946f',
    modelName: "Address",
    calledMethod: "searchSettlements",
    methodProperties: { FindByString: searchString, Limit: 5 },
  });
  console.log(data);
  return data.data || []; // Повертаємо масив адрес
}
