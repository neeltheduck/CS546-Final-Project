import {Router} from 'express';
const router = Router();

import {addTool} from '../data/tools.js';
router.route('/tools')
    .get(async (req, res) => {
        try{
            res.render('tools', {themePreference: 'dark', title: 'Tools'});
        }
        catch (error) {
            console.log("tools route error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    })
    .post(async (req, res) => {
        try {
            // const toolData = req.body;
            console.log("Tool Data:");
            console.log(req.body);
            //toolName, description, condition, userID, availability, location, images
            // take images and put them in mongodb

            const toolData={
                toolName: req.body.toolName,
                description: req.body.description,
                condition: req.body.condition,
                userID: req.body.userID,
                availability: req.body.availability,
                location: req.body.location,
                images: req.body.images
            };
            console.log("ToolData:");
            console.log(toolData);
            let tool = await addTool(toolData); 
            console.log("Tool: output");
            console.log(tool);
            // res.status().json(tool);
            if (tool.acknowledged) {
                return res.redirect('/login');
            }
        } catch (error) {
            console.log("tools route error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    });

export default router;