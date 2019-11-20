const dal = require("../dal/dal");

async function getAllUsers() {
    const sql = `select userID, firstName, lastName, username, password from users`
    const users = await dal.execute(sql);
    return users;
}

async function getOneUser(id) {
    const sql = `select userID, firstName, lastName, username, 
    password from users where userID = ${id}`;
    const users = await dal.execute(sql);
    return users[0];
}

async function addUser(user) {
    const sql = `insert into users(firstName, lastName, username, password)
     values('${user.firstName}', '${user.lastName}', '${user.username}','${user.password}') `;
    const info = await dal.execute(sql);
    user.userID = info.insertId;
    return user;
}

module.exports = {
    getAllUsers,
    addUser,
    getOneUser
}
