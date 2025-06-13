const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const JSON_SOURCE_URL = "https://weiss.bet/api/v1/configuration";

app.get("/get-captcha", async (req, res) => {
	try {
		const response = await axios.get(JSON_SOURCE_URL, {
			headers: {
				"User-Agent": "Mozilla/5.0",
				Accept: "application/json",
			},
		});
		const data = response.data;

		const siteKey =
			data?.captchaSiteKey || data?.captchaSettings?.siteKey || null;

		if (!siteKey) {
			throw new Error("SiteKey not found in JSON response");
		}

		console.log("✅ SiteKey:", siteKey);
		res.json({ siteKey });
	} catch (error) {
		console.error("❌ Error fetching siteKey:", error.message);
		res.status(500).json({ error: "Failed to fetch CAPTCHA key" });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
