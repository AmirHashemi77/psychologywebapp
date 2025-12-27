export const getArticlesServices = async () => {
  try {
    const response = await fetch(`/tags`, { cache: "no-store" });
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
