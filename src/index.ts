import { Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { app } from './app'
import { PORT } from './config/config'
import prisma from './models/client';

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
  return res.send(swaggerUi.generateHTML(await import('./generated/swagger.json')))
})

prisma.$connect().catch((err) => {
  console.log(`Fail to create connection Error:${err}`)
})

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}/docs`))
