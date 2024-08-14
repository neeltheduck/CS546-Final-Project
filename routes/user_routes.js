import express from express;
import {Router} from express;

import {getUser, updateUser, deleteUser } from "../data/users.js";
import {authCheck} from app.js;


// getUser
router
.get('/:username', authCheck, async (req, res) => {
    try {
        let currentUsername = req.params.username;
        let user = await getUser(currentUsername);

        if (!user){
            return res.status(404).send('Sorry! User not found.');
        }

        res.json(user);
    } catch (error) {
        res.status(500).send('Error: Internal Server Error.');
    }
})

// updateUser, i think its post

// deleteUser

router.
delete('/delete/:username', authCheck, async (req, res) => {
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