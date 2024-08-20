import { tools } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import helper from '../helpers.js';

// addTool
export const addTool = async (toolName, description, condition, userID, dateAdded, availability, location, images) => {
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

    const toolCollection = await tools();
    const userCheck = toolCollection.findOne({_id: new ObjectId(userID)});
    if (!userCheck) throw 'Error: User not found';

    const newTool = {
        toolName: toolName,
        description: description,
        condition: condition,
        userID: userID,
        dateAdded: dateAdded,
        availability: availability,
        location: location,
        images: images
    };

    const insert = await toolCollection.insertOne(newTool);
    if (!insert.acknowledged || !insert.insertedId) throw 'Error: Tool could not be inserted into database';

    return {toolInserted: true};
};

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

// updateTool
export const updateTool = async (toolID, toolName, description, condition, userID, dateAdded, availability, location, images) => {
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
