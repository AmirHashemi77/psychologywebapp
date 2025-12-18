export const getSiteUrl = (): string => {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.URL ||
    process.env.DEPLOY_PRIME_URL;

  return (fromEnv ?? "http://localhost:3000").replace(/\/$/, "");
};

export const toAbsoluteUrl = (path: string): string => new URL(path, getSiteUrl()).toString();

