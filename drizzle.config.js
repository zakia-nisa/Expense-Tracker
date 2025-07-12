/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.jsx",
  out: "./drizzle", 
  dialect: "postgresql", 
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DATABASE_URL ,
  },
};