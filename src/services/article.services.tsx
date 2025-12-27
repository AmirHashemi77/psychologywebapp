export const getArticlesServices = async (page: number, limit: number, tags: string) => {
  try {
    const response = await fetch(`/articles?page=${page}&limit=${limit}&tags=${tags}`, { cache: "no-store" });
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
    const response = await fetch(`/articles/${id}`, { cache: "no-store" });
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
