import {Router} from 'express';
const router = Router();
import {getUser} from "../data/users.js";
//import {authCheck} from '../app.js';
import helper from '../helpers.js';

// getUser
router
.get('/:username', async (req, res) => {
    try {
        let currentUsername = req.params.username;
        console.log(currentUsername)
        currentUsername = await helper.checkString(currentUsername, 'Username');
        let user = await getUser(currentUsername);

        if (!user){
            return res.status(404).send('Sorry! User not found.');
        }
        console.log(user);
        return res.render('users');
    } catch (error) {
        res.status(500).send(error);
    }
})

// updateUser, i think its post

// deleteUser

/*router.
delete('/delete/:username', async (req, res) => {
    try {
        let currentUsername = req.params.username;
        await deleteUser(currentUsername);

        req.logout();

        res.redirect("/login");
    } catch (error) {
        res.status(500).json({error: "Well, we failed to delete your account. Look's like you're stuck with us!"});
    }
});*/

export default router;