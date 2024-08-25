import auth_routeRoutes from './auth_routes.js';
import {static as staticDir} from 'express';
import review_routes from './review_routes.js';
import tool_routes from './tool_routes.js';
import user_routes from "./user_routes.js";

const constructorMethod = (app) => {
  app.use('/', auth_routeRoutes);
  app.use('/', review_routes);
  app.use('/', tool_routes);
  app.use('/', user_routes);
  app.use('/public', staticDir('public'));
  app.use('*', (req, res) => {
    res.redirect('/login');
  });
};

export default constructorMethod;