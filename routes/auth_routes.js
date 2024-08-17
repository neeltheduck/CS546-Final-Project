import express from 'express';
import {registerUser} from '../data/users.js';
// import { Router } from 'express';
const router = express.Router();

router.route('/').get(async (req, res) => {
    //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
    return res.json({error: 'YOU SHOULD NOT BE HERE!'});
  });

router.route('/register').get(async (req, res) => {
    //code here for GET
    try{
        return res.render('register', {title: 'Register'});
    } catch (e) {
        return res.status(500).json({registerpagegeterror: e});
    }
    })
    .post(async (req, res) => {
    //code here for POST
    try{
        const userdata = req.body;
        // need to do check for wrong inputs
        userdata.username = userdata.username.trim();
        userdata.password = userdata.password.trim();
        userdata.confirmPassword = userdata.confirmPassword.trim();
        console.log("Userdata:", userdata);
        console.log("Username:", userdata.username);
        console.log("Password:", userdata.password);
        console.log("Confirm Password:", userdata.confirmPassword);
        console.log("Pronouns:", userdata.pronouns);
        console.log("Bio:", userdata.bio);
        console.log("User Location:", userdata.userLocation);
        console.log("Theme Preference:", userdata.themePreference);
        const userinfo={username: userdata.username,
            password: userdata.password,
            pronouns: userdata.pronouns,
            bio: userdata.bio,
            userLocation: userdata.userLocation,
            themePreference: userdata.themePreference
        };

        const insertuser= await registerUser(userinfo);
        console.log("Insert User:");
        console.log(insertuser);
        if(insertuser){
            console.log("User Registered");
            return res.redirect('/login');
        }
        else{
            return res.status(500).json({error: 'User not registered'});
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({registerpageposterror: e});
    }
    });

router.route('/login').get(async (req, res) => {
    //code here for GET
    try{
        return res.render('login', {title: 'Login'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
    });


    export default router;