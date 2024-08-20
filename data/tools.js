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
// getToolWithID
// updateTool
// deleteTool

// + error handling