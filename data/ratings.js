import { ratings } from "../config/mongoCollections.js";

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

}

export const getRatingsForUser = async (userID) => {
    // to do
}

// error checking