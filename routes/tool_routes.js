
import {Router} from 'express';
const router = Router();
import helper from '../helpers.js';
import{      
    checkIsProperString,
    checkIsProperPassword,
    containsNumbers, 
} from './../helpers.js'
import {addTool,getAllTools,getToolWithID,deleteTool,updateTool, getToolWithUserID,searchTools, addWishlist} from '../data/tools.js';
import {toolRequested} from '../data/users.js';
import xss from 'xss';

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
                _id: xss(req.body._id),
                toolName: xss(req.body.toolName),
                description: xss(req.body.description),
                condition: xss(req.body.condition),
                userID: req.session.user._id,
                dateAdded: xss(req.body.dateAdded),
                availability: xss(req.body.availability),
                location: xss(req.body.autocomplete),
                image: xss(req.body.image)
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
            let toolName = xss(req.body.toolName);
            let description = xss(req.body.description);
            let condition = xss(req.body.condition);
            let userID = req.session.user._id;
            let availability = {start: new Date(xss(req.body.start_date)), end: new Date(xss(req.body.end_date))};
            let location = xss(req.body.autocomplete);
            let image = xss(req.body.image);
            console.log(availability);
            toolName = await helper.checkString(toolName, 'Tool Name');
            description = await helper.checkString(description, 'Description');
            condition = await helper.checkString(condition, 'Condition');
            userID = await helper.checkId(userID, 'User ID');
            availability.start = await helper.checkDate(availability.start, 'Start Date');
            availability.end = await helper.checkDate(availability.end, 'End Date');
            if (availability.start.getTime() > availability.end.getTime()) throw 'Error: Start Date must come before End Date';
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
            res.status(500).render('toolsregister',{hasErrors: true, error})
        }
    });

router.route('/tools')
    .get(async (req, res) => {
        try {
            res.render('searchTools', {theme: req.session.user.themePreference});
        } catch (error) {
            console.log("tools route get error");
            console.log(error);
            res.status(500).json({error: error.message});
        }
    })
    .post(async (req, res) => {
        try{
            let search = xss(req.body.search);
            let condition = xss(req.body.condition);

            search= checkIsProperString(search,"Search")
        let tools=await searchTools(search,condition)
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
            let start = tool.availability.start.toISOString().split('T');
            let end = tool.availability.end.toISOString().split('T');
            console.log("Date Added:");
            console.log(tool.dateAdded);
            console.log("typeof Date Added:");
            console.log(typeof tool.dateAdded);
            //let day=tool.dateAdded.getDay();
            //console.log("Day:");
            //console.log(day);
            let available= new Array(14).fill(null);
            console.log("available:");
            console.log(available);
            console.log("Availability:");
            console.log(tool.availability);
            for(let i=0;i<tool.availability.length;i++){
                if(tool.availability[i]){
                    available[i+day]="A";
                }
                else{
                    available[i+day]="X";
                }
            }
            console.log("Available:");
            console.log(available);
            tool.availability=available;
            res.render('toolbyid', {themePreference: 'req.session.user.themePreference', tool: tool, start: start[0], end: end[0]});
        } catch (error) {
            console.log("Error getting tool details: ");
            console.log(error);
            res.status(500).json({error: error.message});
        }
    })
    .post(async (req, res) => {
        try {
            const userId = req.session.user._id;
            const toolId = req.params.id;

            if (req.body.action === 'wishlist') {
                const result = await addWishlist(userId, toolId);
                const tool = await getToolWithID(req.params.id);
                let start = tool.availability.start.toISOString().split('T');
                let end = tool.availability.end.toISOString().split('T');
                return res.render('toolbyid', { themePreference: req.session.user.themePreference, tool: tool, start: start[0], end: end[0], wishlistSuccess: true, message: "Tool added to wishlist successfully!"});
            } 

            else if (req.body.action === 'request') {
                let req_username = xss(req.body.req_username);
                let lender_id = xss(req.body.lender_id);
                let tool_id = xss(req.body.tool_id);
                let start_date = new Date(xss(req.body.start_date));
                let end_date = new Date(xss(req.body.end_date));

                req_username = await helper.checkString(req_username, 'Username');
                lender_id = await helper.checkId(lender_id, 'User ID');
                tool_id = await helper.checkId(tool_id, 'Tool ID');
                start_date = await helper.checkDate(start_date, 'Start Date');
                end_date = await helper.checkDate(end_date, 'End Date');

                let result = await toolRequested(lender_id, req_username, tool_id, start_date, end_date, 'pending');
                if (!result) {
                    const tool = await getToolWithID(req.params.id);
                    let start = tool.availability.start.toISOString().split('T');
                    let end = tool.availability.end.toISOString().split('T');
                    return res.render('toolbyid', {themePreference: req.session.user.themePreference, tool: tool, start: start[0], end: end[0], hasErrors: true, error: 'Error: Could not request tool'});
                }

                const tool = await getToolWithID(req.params.id);
                let start = tool.availability.start.toISOString().split('T');
                let end = tool.availability.end.toISOString().split('T');
                return res.render('toolbyid', {themePreference: req.session.user.themePreference, tool: tool, start: start[0], end: end[0], reqSuccess: true, message: "Request successfully sent!"});
            }

        } catch (error) {
            console.error("Error processing request:", error);
            const tool = await getToolWithID(req.params.id);
            let start = tool.availability.start.toISOString().split('T');
            let end = tool.availability.end.toISOString().split('T');
            return res.render('toolbyid', {themePreference: req.session.user.themePreference, tool: tool, start: start[0], end: end[0], hasErrors: true, error: error.message});
        }
    });


export default router;
