import {v4 as uuidv4} from 'uuid';

let currentDate = new Date();
let dateTime = `${currentDate.getDate()}/${(currentDate.getMonth()+1)}/${currentDate.getFullYear()} @ ${currentDate.getHours()}:${currentDate.getMinutes()}`

// ADD_ACCOUNT
export const addAccount = (
    { username = '', 
      email = '', 
      password = '', 
    } = {}
    ) => ({
    type: 'ADD_ACCOUNT',
    account: {
        id: uuidv4(),
        username,
        email,
        password,
        createdAt: dateTime
    }
});