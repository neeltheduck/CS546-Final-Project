import { users } from "../config/mongoCollections.js";
import {ObjectId} from 'mongodb';
import bcrypt from "bcryptjs";
import{      
    checkIsProperString,
    checkIsProperPassword,
    containsNumbers, 
} from './../helpers.js'

function validateCredentials(username, password) {
    const numbers = '1234567890';
    for (let char of username) {
        if (numbers.includes(char)) {
            throw `Error: ${username} is not allowed to contain numbers.`;
        }
    }

    if (username.length < 5 || username.length > 10) {
        throw `Error: ${username} must be at least 5 characters long with a max of 10 characters.`;
    }

    username = username.toLowerCase();

    let caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let special = '-=_+[]\\{}|;\':" ,./<>?~!@#$%^&*()`\'';

    if (password.length < 8) {
        throw `Error: password must be at least 8 characters long.`;
    }

    let numCheck = false, capsCheck = false, specialCheck = false;

    for (let i = 0; i < password.length; i++) {
        let char = password[i];
        if (numbers.includes(char)) {
            numCheck = true;
        }
        if (caps.includes(char)) {
            capsCheck = true;
        }
        if (special.includes(char)) {
            specialCheck = true;
        }
    }
    if (numCheck != true || capsCheck != true || specialCheck != true) {
        throw 'Error: password must contain at least one number, capital letter, AND special character.';
    }
}
function validatePronouns(pronouns) {

    const segments = pronouns.split("/");
    if (segments.length > 5) {
        throw `Error: Our system only allows up to 4 pronoun segments.`;
    }

    for (let i = 0; i < segments.length; i++) {
        if (segments[i].length > 7) {
            throw `Error: Pronoun Segment '${segments[i]}' exceeds the 7 character limit.`;
        }
    }

    return pronouns;

}
function validateBio(bio) {
    if (bio.length > 250) {
        throw `Error: Bio must be up to 200 characters long.`
    }
}
// function validateUserLocation(userLocation) {
//     if (!location.town || !location.state || !location.country) {
//         throw `Error: Location fields must be provided. Example: Hoboken, New Jersey, United States of America`;
//     }
// }
function validateThemePreference(themePreference) {
    themePreference = themePreference.toLowerCase();

    if (themePreference != "light" && themePreference != "dark") {
        throw `Error: themePreference must be either 'light' or 'dark'.`;
    }
}

export const registerUser = async (firstName,lastName,username, password, pronouns, bio, userLocation, themePreference) => {

    // neel's lab 10 stuff
    // for (let i = 0; i < parameter.length; i++) {
    //     if (!parameter[i] || parameter[i] === undefined || parameter[i].trim() == '') {
    //         throw `Error: ${parameterName[i]} must be supplied.`;
    //     }
    //     if (typeof parameter[i] != "string") {
    //         throw `Error: ${parameterName[i]} must be a string.`;
    //     }
    // }

    // throw `Error: ${parameterName[0]} must be supplied.`;
    validateCredentials(username, password);
    validatePronouns(pronouns);
    validateBio(bio);
    // validateUserLocation(userLocation);
    validateThemePreference(themePreference);
    firstName= checkIsProperString(firstName,"First Name", 2, 25);
    containsNumbers(firstName)
          
    lastName=checkIsProperString(lastName,"Last Name", 2, 25);
    containsNumbers(lastName)
    userLocation=checkIsProperString(userLocation,"User Location");
    pronouns=pronouns.toLowerCase()
    pronouns=checkIsProperString(pronouns,"Pronouns", null,null, ["he/him","they/them","she/her"]);

    // roles?

    const saltRounds = 3;
    const hash = await bcrypt.hash(password, saltRounds);
    const collectionUser = await users();

    const userCheck = await collectionUser.findOne({ username: username });
    if (userCheck) {
        throw 'Error: this username has already been taken.'
    }

    const updatedFields = {
        firstName: firstName,
        lastName: lastName,
        username: username.toLowerCase(),
        password: hash,
        pronouns: pronouns.toLowerCase(),
        bio: bio,
        userLocation: userLocation,
        themePreference: themePreference.toLowerCase(),
        listedTools: [],
        borrowedTools: [],
        reservationHistory: [],
        tradeStatuses: [],
        wishList: []
        // role: role.toLowerCase()
    };
    // console.log("updatedFields");
    // console.log(updatedFields);
    const update = await collectionUser.insertOne(updatedFields);
    // console.log("update");
    // console.log(update);
    if (!update) {
        throw 'Error: New user insertion was not successful.';
    }
    else {
        return { signupCompleted: true };
    }

};

export const loginUser = async (username, password) => {


    if (username === undefined || !username || password === undefined || !password || username.trim() == '' || password.trim() == '') {
        throw `Error: Both username and password must be supplied.`;
    }

    if (username.length < 5 || username.length > 10) {
        throw `Error: Username must be at least 5 characters long with a max of 10 characters`;
    }

    let numbers = '1234567890';
    let caps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let special = '-=_+[]\\{}|;\':" ,./<>?~!@#$%^&*()`\'';


    if (password.length < 8) {
        throw `Error: password must be at least 8 characters long.`;
    }


    let numCheck = false, capsCheck = false, specialCheck = false;

    for (let i = 0; i < password.length; i++) {
        let char = password[i];
        if (numbers.includes(char)) {
            numCheck = true;
        }
        if (caps.includes(char)) {
            capsCheck = true;
        }
        if (special.includes(char)) {
            specialCheck = true;
        }
    }
    if (!numCheck || !capsCheck || !specialCheck) {
        throw 'Error: password must contain at least one number, capital letter, AND special character.';
    }
    const collectionUser = await users();
    const userCheck = await collectionUser.findOne({ username: username });

    if (!userCheck) {
        throw 'Either the username or password is invalid';
    }

    const passwordCrypt = await bcrypt.compare(password, userCheck.password);
    if (!passwordCrypt) {
        throw 'Either the username or password is invalid';
    }
    else {
        delete userCheck.password;
        return userCheck;
    }
};

export const updateTool = async (userId, tool) => {
    
    const userCollection = await users();
    const updatedInfo = await userCollection.updateOne(
      {_id: new ObjectId(userId)},
      {$push: {listedTools: tool}}
    );
    if (!updatedInfo) {
      throw 'could not add tool successfully';
    }

    
  };

  export const getUser = async (id) => {
    checkIsProperString(id)
    id = id.trim();
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    const userCollection = await users();
    const user = await userCollection.findOne({_id: new ObjectId(id)});
    if (user === null){
      throw 'No user with that id'
    };
    user._id = user._id.toString();
    return user;
  };