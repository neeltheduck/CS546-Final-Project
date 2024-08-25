import express from 'express';
import {Router} from 'express';
const router = Router();
import {getUser} from '../data/users.js';
//import {authCheck} from app.js;


// getUser
router
.get('/:username', async (req, res) => {
    try {
        let currentUsername = req.params.username;
        let user = await getUser(currentUsername);

        if (!user){
            return res.status(404).send('Sorry! User not found.');
        }

        res.render('users', {
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            pronouns: user.pronouns,
            bio: user.bio,
            userLocation: user.userLocation,
            themePreference: user.themePreference,
            listedTools: user.listedTools,
            borrowedTools: user.borrowedTools,
            reservationHistory: user.reservationHistory,
            tradeStatuses: user.tradeStatuses,
            wishList: user.wishList,
        });
    } catch (error) {
        res.status(500).send('Error: Internal Server Error.');
    }
})

// updateUser, i think its post

// deleteUser

router.
delete('/delete/:username', async (req, res) => {
    try {
        let currentUsername = req.params.username;
        await deleteUser(currentUsername);

        req.logout();

        res.redirect("/login");
    } catch (error) {
        res.status(500).json({error: "Well, we failed to delete your account. Look's like you're stuck with us!"});
    }
});

export default router;

// create middleware for /users so that it redirects to /:username