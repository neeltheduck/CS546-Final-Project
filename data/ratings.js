import { ratings } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import { dbConnection } from "../config/mongoConnection.js";

export const addRating = async ({userID, toolID, rating, comment}) => {
    try {
        // apparently js has Rating stuff built in. nice
        // just used my code, need to change it to usebuild in one --Kp
        const ratingCollection = await ratings();
        // console.log(newRating);
        const date = new Date().toLocaleDateString();;
        const newRating = {userID, toolID, rating, comment, date};
        // let newRating = new Rating({ratingID, userID, toolID, rating, comment});
        // await newRating.save();
        console.log("Rating object created.");
        console.log(newRating);
        const result = await ratingCollection.insertOne(newRating);
        // await newRating.save();
        console.log("Rating added successfully.");
        console.log(result);
        return result;
    } catch (e) {
        console.log(e);
        throw `Error: Rating was not successfully added.`;
    }
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