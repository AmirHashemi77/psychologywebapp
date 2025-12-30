const getApiBaseUrl = () => {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not set");
  }
  return baseUrl.replace(/\/$/, "");
};

const buildApiUrl = (path: string) => new URL(`${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`).toString();

export const getTagsServices = async () => {
  try {
    const response = await fetch(buildApiUrl("/tags"), { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("خطایی رخ داده است");
    }
  } catch (err) {
    console.log("===================================================");
    console.log(err);
    console.log("===================================================");
  }
};
