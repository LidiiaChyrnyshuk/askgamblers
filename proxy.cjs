const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());
app.use((req, res, next) => {
	if (req.url.startsWith("/undefined")) {
		console.warn("⛔ Блокую неправильний запит:", req.url);
		return res.status(400).send("Bad Request");
	}
	next();
});



app.use(
	"/api",
	createProxyMiddleware({
		target: "https://weiss.bet",
		changeOrigin: true,

		onProxyRes: (proxyRes, req, res) => {
			// Логування URL та статусу
			console.log(`📦 [${proxyRes.statusCode}] ${req.method} ${req.url}`);
		},
		onError: (err, req, res) => {
			console.error("❌ Proxy error:", err.message);
			res.status(500).json({ error: "Proxy error" });
		},
	})
);

app.listen(3000, () => {
	console.log("✅ Proxy server running at http://localhost:3000");
});
