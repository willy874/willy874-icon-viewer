import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handlerControllers(
  req: NextApiRequest,
  res: NextApiResponse,
  controllers: {
    get?: (req: NextApiRequest, res: NextApiResponse) => any,
    post?: (req: NextApiRequest, res: NextApiResponse) => any,
    put?: (req: NextApiRequest, res: NextApiResponse) => any,
    patch?: (req: NextApiRequest, res: NextApiResponse) => any,
    delete?: (req: NextApiRequest, res: NextApiResponse) => any,
  }
) {
  for (const method in controllers) {
    if (Object.prototype.hasOwnProperty.call(controllers, method) && method.toLocaleUpperCase() === req.method) {
      const key = method as keyof typeof controllers
      const controller = controllers[key]
      if (controller) return controller(req, res)
    }
  }
  try {
    return res.status(404).json({
      message: 'is not method',
      data: null
    })
  } catch (error) {
    return res.status(500).json({
      message: 'is server error',
      data: null
    })
  }
}
