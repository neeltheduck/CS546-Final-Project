import { ratings } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import { dbConnection } from "../config/mongoConnection.js";

export const addRating = async ({ratingID, userID, toolID, rating, comment}) => {
    try {
        // apparently js has Rating stuff built in. nice
        let newRating = new Rating({ratingID, userID, toolID, rating, comment});
        await newRating.save();

        return newRating;
    } catch (e) {
        throw `Error: Rating was not successfully added.`;
    }
}

export const getRatingsForTool = async (toolID) => {
    // to do
    // add validation condition for toolID
    const ratingCollection = await ratings();
    const toolratings = await ratingCollection.find({_id : new ObjectId(toolID)}).toArray();
    return toolratings;
}

export const getRatingsForUser = async (userID) => {
    // to do
    // add validation condition for userID
    const ratingCollection = await ratings();
    const userratings = await ratingCollection.find({_id : new ObjectId(userID)}).toArray();
    return userratings;
}

// error checking