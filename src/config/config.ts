const ENV = process.env.ENV || 'development'
const PORT = process.env.PORT || 3000
const LOG_DB = process.env.LOG_DB == 'TRUE' || process.env.LOG_DB == 'true'
const E2E = process.env.E2E == 'TRUE' || process.env.E2E == 'true'
const DATABASE_URL =
  process.env.DATABASE_URL ||
  'sqlserver://localhost:1433;database=statemachine_001;user=sa;password=Rootroot123;trustServerCertificate=true'
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'somerandomaccesstoken'
const REFRESH_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'somerandomstringforrefreshtoken'
const isProduction = ENV == 'production'

export {
  ENV,
  PORT,
  DATABASE_URL,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  LOG_DB,
  isProduction,
  E2E
}
