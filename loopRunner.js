// File: loopRunner.js
const axios = require("axios");

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const USER_NETWORK_ID = process.env.USER_NETWORK_ID;
const BASE_URL = "https://api-prod.superboard.xyz/api/v2/loop";

const loopSlugs = [
  "swap-via-kyo-finance",
  "supply-via-sake-finance",
  "swap-via-sonus",
  "swap-via-sonex",
  "swap-via-quickswap",
  "swap-via-wavex",
  "swap-via-sonefi",
  "supply-via-untitled-bank",
  "swap-via-velodrome",
];

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function runLoops() {
  for (const slug of loopSlugs) {
    const payload = { userNetworkId: USER_NETWORK_ID };

    try {
      const res1 = await axios.post(`${BASE_URL}/${slug}`, payload, {
        headers,
      });
      console.log(`[✔] ${slug} main request successful`, res1.status);
    } catch (err) {
      console.error(
        `[✘] Error with loop ${slug} main request:`,
        err.response?.data || err.message
      );
    }

    try {
      const res2 = await axios.post(`${BASE_URL}/${slug}/verify`, payload, {
        headers,
      });
      console.log(`[✔] ${slug} verify request successful`, res2.status);
    } catch (err) {
      console.error(
        `[✘] Error with loop ${slug} verify request:`,
        err.response?.data || err.message
      );
    }
  }
}

export default async function handler(req, res) {
  await runLoops()
  res.status(200).send("LoopRunner completed.")
}
