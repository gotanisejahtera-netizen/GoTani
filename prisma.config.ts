// Prisma configuration for Migrate and tooling.
// This file exposes the database URL from environment variables for Prisma v7+.
import 'dotenv/config'

export default {
  datasources: {
    db: {
      // Provide DATABASE_URL via environment variable
      url: process.env.DATABASE_URL,
    },
  },
}
