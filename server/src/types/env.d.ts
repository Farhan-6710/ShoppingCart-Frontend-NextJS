declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: 'development' | 'production' | 'test';
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
      CREATOR_ID: string;
      // Add other vars like JWT_EXPIRES_IN: string;
    }
  }
}
