import { Express, Router } from 'express'

interface RouteMap {
  [attr: string]: Router
}

export const generateRoutes = (routesPathMap: RouteMap, app: Express) => {
  Object.entries(routesPathMap).forEach(([routePath, routeView]) => {
    app.use(routePath, routeView)
  })
}