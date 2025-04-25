// File: loopRunner.js
const axios = require("axios");

const AUTH_TOKEN = process.env.AUTH_TOKEN;
const USER_NETWORK_ID = process.env.USER_NETWORK_ID;
const BASE_URL = "https://api-dev.superboard.xyz/api/v2/loop";

const loopSlugs = [
  "swap-via-kyo-finance",
  "supply-via-sake-finance",
  "swap-via-sonus",
  "swap-via-sonex",
  //   "loop-6",
  //   "loop-7",
  //   "loop-8",
  //   "loop-9",
  //   "loop-10",
];

const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

async function runLoops() {
  for (const slug of loopSlugs) {
    try {
      const payload = { userNetworkId: USER_NETWORK_ID };

      // Step 1: Call main loop endpoint
      const res1 = await axios.post(`${BASE_URL}/${slug}`, payload, {
        headers,
      });
      console.log(`[✔] ${slug} main request successful`, res1.status);

      // Step 2: Call verify endpoint
      const res2 = await axios.post(`${BASE_URL}/${slug}/verify`, payload, {
        headers,
      });
      console.log(`[✔] ${slug} verify request successful`, res2.status);
    } catch (err) {
      console.error(
        `[✘] Error with loop ${slug}:`,
        err.response?.data || err.message
      );
    }
  }
}

runLoops();
