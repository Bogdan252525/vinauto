interface Config {
  NEW_POST_KEY: string;
  NEW_POST_URL: string;
}

export const config: Config = {
  NEW_POST_KEY: process.env.NEW_POST_KEY ?? '',
  NEW_POST_URL: process.env.NEW_POST_URL ?? '',
}