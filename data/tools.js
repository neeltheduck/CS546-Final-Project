import { tools } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';

// addTool
// getTools
// getToolWithID
// updateTool
// deleteTool

// + error handling

export const addTool = async ({toolName, description, condition, userID, availability, location, images}) => {
    try {
        const toolCollection = await tools();
        const dateAdded = new Date().toLocaleDateString();
        const newTool = {toolName, description, condition, userID, dateAdded, availability, location, images};
        console.log("Tool object created.");
        console.log(newTool);
        const toolfound = await toolCollection.findOne({toolName: toolName});
        if (toolfound) {
            throw `Error: Tool with name ${toolName} already exists, find a new name.`;
        }
        const result = await toolCollection.insertOne(newTool);
        console.log("Tool added successfully.");
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
        throw `Error: Tool was not successfully added.`;
    }
}