import { ratings } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import { dbConnection } from "../config/mongoConnection.js";

export const addRating = async (userID, ratingID, rating, comment) => {
    try {
        const ratingCollection = await ratings();
        const dateAdded = new Date().toLocaleDateString();
        const newRating = {userID, ratingID, rating, comment, dateAdded};
        const result = await ratingCollection.insertOne(newRating);

        if (!result.acknowledged || !result.insertedId) throw 'Error: Rating could not be inserted into database';
        return result.insertedId.toString();

    } catch (e) {
        console.log("Error in addRating:");
        console.log(e);
        throw `Error: Rating was not successfully added.`;
    }
}

export const getRatingsById = async (ratingID) => {
    const ratingCollection = await ratings();
    let ratingList = await ratingCollection.find({ratingID: ratingID}).toArray();
    if (!ratingList) throw 'Error: Could not get tool collection';
    return ratingList;
}

export const getRatingsByTool = async (toolID) => {
    // to do
    // add validation condition for toolID
    const ratingCollection = await ratings();
    const toolratings = await ratingCollection.find({_id : new ObjectId(toolID)}).toArray();
    return toolratings;
}

export const getRatingsByUser = async (userID) => {
    // to do
    // add validation condition for userID
    const ratingCollection = await ratings();
    const userratings = await ratingCollection.find({_id : new ObjectId(userID)}).toArray();
    return userratings;
}

// error checking