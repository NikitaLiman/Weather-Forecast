import axios from "axios";

const API_KEY = "e88316fc79bc9c699d36c9b44ae0a0f4";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function weatherCall(city: string) {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
        lang: "en",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error("Error fetch:", e);
    throw new Error("City not found");
  }
}
