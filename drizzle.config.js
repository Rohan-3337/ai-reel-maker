import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/Schema.js",
  out: "./drizzle",
  dbCredentials:{
    url:"postgresql://neondb_owner:npg_FYDCZINTL2t4@ep-wild-breeze-a8xi377k-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
  }
});
