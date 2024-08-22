import {ObjectId} from 'mongodb';

const checkId = async (id, varName) => {
    if (!id) throw `Error: You must provide a ${varName}`;
    if (typeof id !== 'string') throw `Error: ${varName} must be a string`;
    id = id.trim();
    if (id.length === 0) throw `Error: ${varName} cannot be an empty string or just spaces`;
    if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
    return id;
};

const checkString = async (str, varName) => {
    if (!str) throw `Error: You must provide a ${varName}`;
    if (typeof str !== 'string') throw `Error: ${varName} must be a string`;
    str = str.trim();
    if (str.length === 0) throw `Error: ${varName} cannot be an empty value`;

    // Idk what other constraints to add
    if ((varName === 'toolName' || varName === 'location') && str.search(/[0-9]/) !== -1) throw `Error: ${varName} cannot contain numbers`;
    if ((varName === 'description' || varName === 'condition') && str.length < 20) throw `Error: ${varName} must be at least 20 characters long`;
    if (varName === 'Username' && (str.length < 5 || str.length > 10)) throw `Error: ${varName} must be (inclusive) 5-10 characters long`;

    if (varName === 'Password' || varName === 'Confirm Password') {
        if (str.length < 8) throw `Error: ${varName} must be at least 8 characters long`;
        if (str.search(/[A-Z]/) === -1 || str.search(/[0-9]/) === -1 || str.search(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/>~]/) === -1) throw `Error: ${varName} must containt at least one uppercase letter, one number, and one special character`;
    }

    if (varName == 'Pronouns' && (str.toLowerCase() !== 'he/him' && str.toLowerCase() !== 'she/her' && str.toLowerCase() !== 'they/them')) throw `Error: ${varName} must either be He/Him, She/Her, or They/Them`;
    if (varName === 'Bio' && (str.length < 20 || str.length > 255)) throw `Error: ${varName} must be (inclusive) 25-255 characters long`;
    if (varName === 'Theme Preference' && (str.toLowerCase() !== 'light' && str.toLowerCase() !== 'dark')) throw `Error: ${varName} must be either 'Light' or 'Dark'`;
    
    return str;
};

const checkDate = async (date, varName) => {
    if (!date) `Error: You must provide a ${varName}`;
    if (Object.prototype.toString.call(date) !== '[object Date]') throw `Error: ${varName} must be a Date`;
    return date;
}

export default {checkId, checkString, checkDate};
