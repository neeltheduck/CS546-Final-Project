import { tools } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import helper from '../helpers.js';
import axios from 'axios';


// addTool
export const addTool = async ({toolName, description, condition, userID, availability, location, images, autocomplete}) => {
    try {
        // toolName = await helper.checkString(toolName, 'Tool Name');
        // description = await helper.checkString(description, 'Description');
        // condition = await helper.checkString(condition, 'Condition');
        // // userID = await helper.checkId(userID, 'User ID');
        // location = await helper.checkString(location, 'Location');

        // if (!availability) throw 'Error: Availability with a Start and End Date for the tool must be provided';
        // availability.start = await helper.checkDate(availability.start, 'Availability Start Date');
        // availability.end = await helper.checkDate(availability.end, 'Availability End Date');

        // if (!images) throw 'Error: Images must be provided';
        // if (!images.isArray()) throw 'Error: Images must be an array of tool images';
        // for (let image in images) {
        //     image = await helper.checkString(image, 'Image');
        // }
        
        const toolCollection = await tools();
        const dateAdded = new Date().toLocaleDateString();
        const newTool = {toolName, description, condition, userID, dateAdded, availability, location, images, autocomplete};
        // console.log("Tool object created.");
        // console.log(newTool);
        // console.log("autocomplete");
        // console.log(autocomplete);
        const apiKey="AIzaSyB4Xt0XFTeyZZXA_2tCA7i1_nH4cL_v82w";
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${autocomplete}&key=${apiKey}`;
        const response = await axios.get(url);
        // console.log("Response from Google API:");
        // console.log(response);
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        // console.log("lat and long",lat,lng);
        const toolfound = await toolCollection.findOne({toolName: toolName});
        if (toolfound) {
            throw `Error: Tool with name ${toolName} already exists, find a new name.`;
        }
        const result = await toolCollection.insertOne(newTool);
        if (!result.acknowledged || !result.insertedId) throw 'Error: Tool could not be inserted into database';
        console.log("Tool added successfully.");
        console.log(result);
        return result;
    } catch (e) {
        console.log("Error in addTool:");
        console.log(e);
        throw `Error: Tool was not successfully added.`;
    }
}

// getTools
export const getTools = async () => {
    const toolCollection = await tools();
    let toolList = await toolCollection.find({}).toArray();
    if (!toolList) throw 'Error: Could not get tool collection';
    return toolList;
};

// getToolWithID
export const getToolWithID = async (id) => {
    id = await helper.checkId(id, 'Tool ID');
    const toolCollection = await tools();
    let tool = await toolCollection.findOne({_id: new ObjectId(id)});
    if (!tool) throw 'Error: Tool not found';
    return tool;
};

// get tool list from name 
export const getToolWithName = async (toolName) => {
    // toolName = await helper.checkString(toolName, 'Tool Name');
    const toolCollection = await tools();
    //find list that include the toolName 
    // let tool = await toolCollection.find({toolName: {$regex: toolName, $options: 'i'}}).toArray();
    if (!tool) throw 'Error: Tool not found';
    return tool;
};
// updateTool
export const updateTool = async ({toolID, toolName, description, condition, userID, dateAdded, availability, location, images}) => {
    toolID = await checkId(toolID, 'Tool ID');
    toolName = await helper.checkString(toolName, 'Tool Name');
    description  = await helper.checkString(description, 'Description');
    condition = await helper.checkString(condition, 'Condition');
    userID = await helper.checkId(userID, 'User ID');
    dateAdded = await helper.checkDate(dateAdded, 'Date Added')
    location = await helper.checkString(location, 'Location');

    if (!availability) throw 'Error: Availability with a Start and End Date for the tool must be provided';
    availability.start = await helper.checkDate(availability.start, 'Availability Start Date');
    availability.end = await helper.checkDate(availability.end, 'Availability End Date');

    if (!images) throw 'Error: Images must be provided';
    if (!images.isArray()) throw 'Error: Images must be an array of tool images';
    for (let image in images) {
        image = await helper.checkString(image, 'Image');
    }

    let updatedTool = {
        toolName: toolName,
        description: description,
        condition: condition,
        userID: userID,
        dateAdded: dateAdded,
        availability: availability,
        location: location,
        images: images
    };

    const toolCollection = await tools();
    const updateInfo = await toolCollection.findOneAndReplace({_id: new ObjectId(toolID)}, updatedTool, {returnDocument: 'after'});
    if (!updateInfo) throw `Error: Information for tool with id ${id} could not be updated`;
    return updateInfo;
};

// deleteTool
export const deleteTool = async (id) => {
    id = await helper.checkId(id, 'Tool ID');
    const toolCollection = await tools();
    const deletionInfo = toolCollection.findOneAndDelete({_id: new ObjectId(id)});
    if (!deletionInfo) throw `Error: Could not delete tool with id ${id}`;
    return {deleted: true};
};

// + error handling
