import P from "@prismicio/client";

export function getPrismicClient(req?: unknown) {
  const Prismic = P.client(
    process.env.PRISMIC_ENDPOINT,
    {
      req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN
    }
  );

  return Prismic;
};