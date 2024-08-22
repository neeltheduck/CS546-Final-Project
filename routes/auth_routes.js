import express from 'express';
import {registerUser, loginUser} from '../data/users.js';
import helper from '../helpers.js';
// import { Router } from 'express';
const router = express.Router();
//need to add session middleware
router.route('/').get(async (req, res) => {
    //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
    return res.json({error: 'YOU SHOULD NOT BE HERE!'});
  });

router.route('/register').get(async (req, res) => {
    //code here for GET
    try{
        return res.render('register', {themePreference: 'dark', title: 'Register'});
    } catch (e) {
        return res.status(500).json({registerpagegeterror: e});
    }
    })
    .post(async (req, res) => {
    //code here for POST
    try{
        const userdata = req.body;
        // need to do check for wrong inputs
        userdata.username = await helper.checkString(userdata.username, 'Username');
        userdata.password = await helper.checkString(userdata.password, 'Password');
        userdata.confirmPassword = await helper.checkString(userdata.confirmPassword, 'Confirm Password');
        userdata.pronouns = await helper.checkString(userdata.pronouns, 'Pronouns');
        userdata.bio = await helper.checkString(userdata.bio, 'Bio');
        userdata.themePreference = await helper.checkString(userdata.themePreference, 'Theme Preference');
        if (userdata.password !== userdata.confirmPassword) throw 'Error: Password and Confirm Password must be the same';
        
        console.log("Userdata:", userdata);
        console.log("Username:", userdata.username);
        console.log("Password:", userdata.password);
        console.log("Confirm Password:", userdata.confirmPassword);
        console.log("Pronouns:", userdata.pronouns);
        console.log("Bio:", userdata.bio);
        console.log("User Location:", userdata.userLocation);
        console.log("Theme Preference:", userdata.themePreference);
        
        const userinfo = {
            username: userdata.username,
            password: userdata.password,
            pronouns: userdata.pronouns,
            bio: userdata.bio,
            userLocation: userdata.userLocation,
            themePreference: userdata.themePreference
        };

        const insertuser= await registerUser(userinfo);
        console.log("Insert User:");
        console.log(insertuser);
        if (insertuser) {
            console.log("User Registered");
            return res.redirect('/login');
        } else {
            return res.status(500).json({error: 'User not registered'});
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({registerpageposterror: e});
    }
    });

router.route('/login').get(async (req, res) => {
    //code here for GET
    try {
        return res.render('login', {themePreference: 'light', title: 'Login'});
    } catch (e) {
        console.log(e);
        return res.status(500).json({error: e});
    }
    })
    .post(async (req, res) => {
        //code here for POST
    const logindata = req.body;
    try {
        logindata.username = await helper.checkString(loginData.username, 'Username');
        logindata.password = await helper.checkString(loginData.password, 'Password');
        console.log("Username:", logindata.Username);
        console.log("Password:", logindata.Password);
    } catch (e) {
        return res.status(500).render('login', {error: e});
    }

    try {
        const user = await loginUser(logindata.username, logindata.password);
        console.log("User:");
        console.log(user);
        if (user){
            console.log("User Logged In");
            return res.redirect('/user');
        } else {
            return res.status(500).render('login', {error: 'User not logged in'});
        }
    } catch (e) {
        return res.status(500).render('login', {error: e});
    }
    });

    export default router;
