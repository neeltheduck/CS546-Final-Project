import {Router} from 'express';
const router = Router();

import {addTool,getTools,getToolWithID,getToolWithName} from '../data/tools.js';
router.route('/toolsregister')
    .get(async (req, res) => {
        try{
            res.render('toolsregister', {themePreference: 'dark', title: 'Tools'});
        }
        catch (error) {
            console.log("toolsregister route get error");
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
            console.log("toolsregister route post error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    });

    router.route('/tools')
    .get(async (req, res) => {
        try {
            const toolslists = await getTools();
            console.log("Toolslists:");
            console.log(toolslists);
            res.render('tools', {themePreference: 'dark', tool_name: 'Tools searched', tools: toolslists});
        } catch (error) {
            console.log("tools route get error");
            console.log(error);
            res.status(500).json({error: error.message});
        }
    });

    router.route('/tools/:id')
    .get(async (req, res) => {
        try {
            console.log("req");
            console.log(req);
            const tool = await getToolWithID(req.params.id);
            console.log("Tool:");
            console.log(tool);
            res.render('toolbyid', {themePreference: 'dark', tool: tool});
        } catch (error) {
            console.log("tool route get error");
            console.log(error);
            res.status(500).json({error: error.message});
        }
    });
    
export default router;