/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  out: "./drizzle", 
  dialect: "postgresql", 
  dbCredentials: {
    // connectionString: process.env.NEXT_PUBLIC_DATABASE_URL ,
    url: 'postgresql://neondb_owner:npg_IOjDJZcK81dB@ep-hidden-math-adjl8wyj-pooler.c-2.us-east-1.aws.neon.tech/Expense%20Tracker?sslmode=require&channel_binding=require' ,
  },
};