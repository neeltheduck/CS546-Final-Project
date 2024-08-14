import express from 'express';
const app = express();
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import session from 'express-session';

app.use(session({
  name: 'AuthenticationState',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false
}))

// //middlewars
// // 1. 
// app.use(async (req, res, next) => {
//     if (req.session.user){
//         console.log('['+new Date().toUTCString()+'] '+req.method+' '+req.originalUrl + ' (Authenticated User)');
//     }
//     else {
//         console.log('['+new Date().toUTCString()+'] '+req.method+' '+req.originalUrl + ' (Non-Authenticated User)');
//     }
//     if (req.originalUrl === '/') {
//         if (req.session.user) {
//             if (req.session.user.role === 'admin') {
//                 return res.redirect('/admin');
//             } else if (req.session.user.role === 'user') {
//                 return res.redirect('/user');
//             }
//         } else {
//             return res.redirect('/login');
//         }
//     }
//     next();
// });
  
// //2.
// app.use('/login', async (req, res, next) => {
//     if (req.method == 'GET') {
//             if (req.session.user) {
//                 if (req.session.user.role === 'user') {
//                     return res.redirect('/user');
//                 } else if (req.session.user.role === 'admin') {
//                     return res.redirect('/admin');
//                 }
//             }
//     }
//     next();
//   });

// //3.
// app.use('/register', async (req, res, next) => {
//     if (req.method == 'GET') {
//             if (req.session.user) {
//                 if (req.session.user.role === 'user') {
//                     return res.redirect('/user');
//                 } else if (req.session.user.role === 'admin') {
//                     return res.redirect('/admin');
//                 }
//             }
//     }
//     next();
//   });

// //4.
// app.use('/user', async (req, res, next) => {
//     if (req.method == 'GET') {
//             if (!req.session.user) {
//                 return res.redirect('/login');
//             }
//     }
//     next();
//   });

// //5.
// app.use('/admin', async (req, res, next) => {
//     if (req.method == 'GET') {
//             if (!req.session.user) {
//                 return res.redirect('/login');
//             }
//             else{
//                 if (req.session.user.role === 'user') {
//                     return res.status(403).render('error', {page: "/user", pageMSG: "Back to Users Page",error: "Admin permission not granted", theme: req.session.user.themePreference});
//             }
//         }
//     }
//     next();
//   });

// //6
// app.use('/logout', async (req, res, next) => {

//     if (req.method == 'GET') {
//             if (!req.session.user) {
//                 return res.redirect('/login');
//             }
//     }
//     next();
//   });


//---------------------------------------------------------------------
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});