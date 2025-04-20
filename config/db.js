import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Initialize Neon client
const sql = neon("postgresql://neondb_owner:npg_FYDCZINTL2t4@ep-wild-breeze-a8xi377k-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");

// Wrap it with Drizzle
export const db = drizzle(sql);

