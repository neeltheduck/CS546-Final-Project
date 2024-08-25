import {Router} from 'express';
import helper from '../helpers.js';
import {checkIsProperString} from '../helpers.js';
const router = Router();

import {addTool,getTools,getToolWithID} from '../data/tools.js';
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
            let today = new Date();
            today = today.toISOString().split('T')[0];
            let available=[req.body.d1,req.body.d2,req.body.d3,req.body.d4,req.body.d5,req.body.d6,req.body.d7];
            console.log(available);
            req.body.toolName = await helper.checkString(req.body.toolName, 'Tool Name');
            req.body.description = await helper.checkString(req.body.description, 'Description');
            req.body.condition = checkIsProperString(req.body.condition,"condition",null,null, ["Like New","Very Good","Good","Ok","Minor Damage","Some Damage", "Very Damaged"]);
            req.session.user._id = await helper.checkId(req.session.user._id, 'User ID');
            const toolData={
                toolName: req.body.toolName,
                description: req.body.description,
                condition: req.body.condition,
                userID: req.session.user._id,
                dateListed: today,
                availability: available,
                location: req.body.autocomplete,
                image: req.body.image,
            };
            console.log(toolData)
            let tool = await addTool(toolData); 
            console.log("Tool: output");
            // console.log(tool);
            // res.status().json(tool);
            if (tool.acknowledged) {
                return res.redirect('/landing');
            }
        } catch (error) {
            console.log("toolsregister route post error");
            console.log(error);
            res.status(500).render('toolsregister',{hasErrors: true, error})
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
            req.params.id = await helper.checkId(req.params.id, 'Tool ID');
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