import auth_routeRoutes from './auth_routes.js';
import {static as staticDir} from 'express';
import rating_routes from './rating_routes.js';
import tool_routes from './tool_routes.js';

const constructorMethod = (app) => {
  app.use('/login', auth_routeRoutes);
  app.use('/register', auth_routeRoutes);
  app.use('/landing', auth_routeRoutes);
  app.use('/ratings', rating_routes);
  app.use('/tools', tool_routes);
  app.use('/public', staticDir('public'));
  app.use('*', (req, res) => {
    res.redirect('/login');
  });
};

export default constructorMethod;