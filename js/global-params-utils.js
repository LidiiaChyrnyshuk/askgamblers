export const DOMAIN_NOT_DEFINED = "DOMAIN_NOT_DEFINED";
export const UNDEFINED_ERROR = "UNDEFINED_ERROR";

export const getGlobalParams = () => {
	return (
		window.globalParams ||
		(typeof globalParams !== "undefined" && globalParams) ||
		null
	);
};

export const getApiConfiguration = async () => {
	const gp = getGlobalParams();
	const domain = gp?.DOMAIN;
	if (!domain) throw [DOMAIN_NOT_DEFINED];

	const response = await fetch(
    new URL("/api/v1/configuration", domain).toString(),
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
	const config = await response.json();

	
	return config;
};

export const sendRegistration = ({ email, password, captcha }) => {
	const gp = getGlobalParams();
	const domain = gp?.DOMAIN;
	if (!domain) return Promise.reject([DOMAIN_NOT_DEFINED]);

	const data = {
		email,
		password,
		language: gp?.LANG ?? "en",
		partnerId: gp?.PID ?? null,
		trackId: gp?.TRACK ?? null,
		param1: gp?.PARAM1 ?? null,
		param2: gp?.PARAM2 ?? null,
		param3: gp?.PARAM3 ?? null,
		param4: gp?.PARAM4 ?? null,
	};

	return new Promise((resolve, reject) => {
		fetch(
			new URL(
				`/api/v3/auth/register/partners?captcha-response=${captcha}`,
				domain
			).toString(),
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.playerToken) {
					resolve(data.playerToken);
				} else if (data.errors) {
					reject(data.errors);
				} else {
					reject([UNDEFINED_ERROR]);
				}
			})
			.catch(() => reject([UNDEFINED_ERROR]));
	});
};

export const redirectToAuth = (token) => {
	const gp = getGlobalParams();
	const domain = gp?.DOMAIN;
	if (!domain) throw [DOMAIN_NOT_DEFINED];

	const deeplink = encodeURIComponent(
		"/" + (gp?.DL ?? "/").replace(/^\/+/, "")
	);
	const url = new URL(
		`/api/v3/auth/partners-player-entry?playerToken=${token}&deeplink=${deeplink}`,
		domain
	).toString();

	window.location.href = url;
};
