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

    return str;
};

const checkDate = async (date, varName) => {
    if (!date) `Error: You must provide a ${varName}`;
    if (Object.prototype.toString.call(date) !== '[object Date]') throw `Error: ${varName} must be a Date`;
    return date;
}

export default {checkId, checkString, checkDate};