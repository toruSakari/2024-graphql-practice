import { POSTGRES_URL } from './src/config'
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql", // "postgresql" | "mysql"
    // driver: "turso" // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    dbCredentials: {
        url: POSTGRES_URL
    }
})
