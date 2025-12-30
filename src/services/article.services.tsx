const getApiBaseUrl = () => {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not set");
  }
  return baseUrl.replace(/\/$/, "");
};

const buildApiUrl = (path: string, params?: Record<string, string | undefined>) => {
  const url = new URL(`${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }
  return url.toString();
};

export const getArticlesServices = async (page: number, limit: number, tags?: string) => {
  try {
    const response = await fetch(buildApiUrl("/articles", { page: String(page), limit: String(limit), tags }), { cache: "no-store" });
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

export const getArticleItemServices = async (id: string) => {
  try {
    const response = await fetch(buildApiUrl(`/articles/${id}`), { cache: "no-store" });
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
