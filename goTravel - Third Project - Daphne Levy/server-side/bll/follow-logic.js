const dal = require("../dal/dal");

async function getAllFollowsOfSpecificUser(id) {
   const sql = `select follows.userID, follows.vacationID, description, destination, startDate, endDate,
     image,price from follows join vacations on vacations.vacationID = follows.vacationID
      join users on users.userID = follows.userID where follows.userID = ${id}`
   const follows = await dal.execute(sql);
   return follows;
}

async function getAllFollows() {
   const sql = `select userID, vacationID from follows`
   const follows = await dal.execute(sql);
   return follows;
}

async function getOneFollow(userID, vacID) {
   const sql = `select userID, vacationID from follows where userID =${userID} and vacationID = ${vacID}`
   const follows = await dal.execute(sql);
   return follows;
}

async function addFollows(follows) {
   const sql = `insert into follows(userID, vacationID)
    values('${follows.userID}', '${follows.vacationID}')`;
   await dal.execute(sql);
   return follows;
}
async function deleteFollows(uID, vacID) {
   const sql = `DELETE FROM follows WHERE follows.userID = ${uID} AND follows.vacationID = ${vacID}`;
   await dal.execute(sql);

}

async function deleteFollowByVacation(vacID) {
   const sql = `DELETE FROM follows WHERE follows.vacationID = ${vacID}`;
   await dal.execute(sql);

}

module.exports = {
   getAllFollowsOfSpecificUser,
   getAllFollows,
   addFollows,
   deleteFollows,
   getOneFollow,
   deleteFollowByVacation
}