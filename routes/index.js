//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.

//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import auth_routeRoutes from './auth_routes.js';
import express from 'express';
import rating_routes from './rating_routes.js';
import tool_routes from './tool_routes.js';

const constructorMethod = (app) => {
  app.use('/landing', (req, res, next) => {  //middleware, dont know if it correct
    console.log("inside landing");
    return res.render('landing', {title: 'Landing Page'});
    next();
  });
  app.use('/', auth_routeRoutes);
  app.use('/', rating_routes);
  app.use('/', tool_routes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;