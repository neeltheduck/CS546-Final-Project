import * as users from "./data/users.js";
import {closeConnection} from './config/mongoConnection.js';

async function main() {
    await users.registerUser("Adib","Osmany","adibo","Adib&1234","He/Him","hi","NYC","dark")
    await users.registerUser("Neel","Meyyur","neelm","Neel&1234","They/Them","hi","NYC","dark")
    await users.registerUser("Tara","Giblin","tarag","Tara&1234","She/Her","hi","NYC","dark")
    await users.registerUser("Kashish","Patel","kashishp","Kashish&1234","He/Him","hi","NYC","dark")
    await users.registerUser("Patrick","Hill","patrickh","Patrick&1234","He/Him","hi","NYC","dark")
    await users.registerUser("Jey","Joseph","jeyjo","Jey&1234","He/Him","hi","NYC","dark")

    // await closeConnection();

}

export{
    main
};