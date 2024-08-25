import {Router} from 'express';
const router = Router();
import helper from '../helpers.js';
import{      
    checkIsProperString,
    checkIsProperPassword,
    containsNumbers, 
} from './../helpers.js'
import {addTool,getAllTools,getToolWithID,deleteTool,updateTool, getToolWithUserID,searchTools} from '../data/tools.js';

router.route('/lenderportalpage')
    .get(async (req, res) => {
        try{
            const toolslists = await getToolWithUserID(req.session.user._id);
            res.render('lenderportalpage', {themePreference: req.session.user.themePreference, title: 'Lender Portal', tools:toolslists});
        }
        catch (error) {
            console.log("lenderportalpage route error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    });

// router.route('/toolsdelete')
//     .get(async (req, res) => {
//         try{
//             const toolslists = await getTools();
//             res.render('toolsdelete', {themePreference: 'dark', tools:toolslists});
//         }
//         catch (error) {
//             console.log("toolsdelete route error");
//             console.log(error);
//             res.status(500).json({error: error.message})
//         }
//     });

router.route('/toolsdelete/:id')
    .get(async (req, res) => {
        try{
            const tool = await getToolWithID(req.params.id);
            console.log("Tool:");
            console.log(tool);
            res.render('toolsdelete', {themePreference: 'dark', tool: tool});
        }
        catch (error) {
            console.log("toolsdelete route error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    })
    .post(async (req, res) => {
        try {
            let tool = await deleteTool(req.params.id, req.session.user._id);
            console.log("Tool: output");
            console.log(tool);
            return res.redirect('/lenderportalpage');
            // res.status().json(tool);
            if (true) {
                return res.redirect('/lenderportalpage');
            }
            else{
                console.log("Tool not deleted");
                return res.redirect('/toolsdelete');
            }
            
        } catch (error) {
            console.log("toolsdelete route post error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    });

router.route('/toolsedit/:id')
    .get(async (req, res) => {
        console.log("inside tooledit route");
        try{
            const tool = await getToolWithID(req.params.id);
            console.log("Tool:");
            console.log(tool);
            let today = new Date();
            today = today.toISOString().split('T')[0];
            res.render('toolsedit', {themePreference: 'dark', tool: tool});
            
        }
        catch (error) {
            console.log("tooledit route error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    })
    .post(async (req, res) => {
        try {
            console.log("inside tooledit route post");
            console.log(req.body);
            const toolData = {
                _id: req.body._id,
                toolName: req.body.toolName,
                description: req.body.description,
                condition: req.body.condition,
                userID: req.session.user._id,
                dateAdded: req.body.dateAdded,
                availability: req.body.availability,
                location: req.body.autocomplete,
                image: req.body.image
            }
            console.log(toolData);
            const updatetools = await updateTool(toolData);
            console.log("Tool edit : output");
            console.log(updatetools);
            // res.status().json(updatetools);
            if (updatetools.acknowledged) {
                return res.redirect('/lenderportalpage');
            }

        } catch (error) {
            console.log("tooledit route post error");
            console.log(error);
            res.status(500).json({error: error.message})
        }
    });
    
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
            req.body.toolName = await helper.checkString(req.body.toolName, 'Tool Name');
            req.body.description = await helper.checkString(req.body.description, 'Description');
            req.body.condition = await helper.checkString(req.body.condition, 'Condition');
            req.session.user._id = await helper.checkId(req.session.user._id, 'User ID');
            let toolName= req.body.toolName
            let description= req.body.description
            let condition= req.body.condition
            let userID= req.session.user._id
            let availability= available
            let location= req.body.autocomplete
            let image= req.body.image
            let tool = await addTool(toolName, description, condition, userID, availability, location, image); 
            console.log("Tool: output");
            // console.log(tool);
            // res.status().json(tool);
            if (tool.acknowledged) {
                return res.redirect('/landing');
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
            res.render('tools', {theme: req.session.user.themePreference});
        } catch (error) {
            console.log("tools route get error");
            console.log(error);
            res.status(500).json({error: error.message});
        }
    })
    .post(async (req, res) => {
        try{
            let search=req.body.search
            search= checkIsProperString(search,"Search")

        let tools=await searchTools(search)
        res.json({success: true, tools: tools, search: search});
        }catch(e){
            res.json({success: false, error: e});
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
