import * as users from "./data/users.js";
import * as tools from "./data/tools.js";
import {closeConnection} from './config/mongoConnection.js';

async function main() {
    await users.registerUser("Adib","Osmany","adibo","Adib&1234","He/Him","hi","NYC","dark")
    let adib = await users.getByUserName("adibo")
    await users.registerUser("Neel","Meyyur","neelm","Neel&1234","They/Them","hi","NYC","dark")
    let neel = await users.getByUserName("neelm")
    await users.registerUser("Tara","Giblin","tarag","Tara&1234","She/Her","hi","NYC","dark")
    let tara = await users.getByUserName("tarag")
    await users.registerUser("Kashish","Patel","kashishp","Kashish&1234","He/Him","hi","NYC","dark")
    let kashish = await users.getByUserName("kashishp")
    await users.registerUser("Patrick","Hill","patrickh","Patrick&1234","He/Him","hi","NYC","dark")
    let patrick = await users.getByUserName("patrickh")
    await users.registerUser("Jey","Joseph","jeyjo","Jey&1234","He/Him","hi","NYC","dark")
    let jey = await users.getByUserName("jeyjo")
    await tools.addTool("Pie","very delicious pie", "Some Damage", adib._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479000.jpeg")
    await tools.addTool("Teddy","very fluffy teady bear", "Ok", neel._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479001.png")
    await tools.addTool("Firetruck","big red firetruck", "Like New", tara._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479002.jpeg")
    await tools.addTool("Ambulance","super safe ambulance", "Very Damaged", kashish._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479003.jpeg")
    await tools.addTool("Police car","fast and furious ride", "Good", patrick._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479004.jpeg")
    await tools.addTool("Paint brushes","long paint brushes (paint not included)", "Very Good", jey._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479005.jpeg")
    await tools.addTool("Computer","Fell HumanWare Computer (might contain virus)", "Very Damaged", adib._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479006.jpeg")
    await tools.addTool("Computer","ESUS MenBook (antivirus firewall included)", "Like New", neel._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479007.jpeg")
    await tools.addTool("Missiles","fast and explosive", "Minor Damage", tara._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479008.jpeg")
    await tools.addTool("Calculator","BI-NoSpire calcultor", "Ok", kashish._id.toString(), {start: new Date('2024-08-28'), end: new Date('2024-09-02')}, "Hoboken, NJ, USA","1724515479009.jpeg")
    // await closeConnection();

}

export{
    main
};