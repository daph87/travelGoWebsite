const dal = require("../dal/dal");

async function getAllVacations() {
    const sql = `select vacationID, description, destination, startDate, endDate, image,price from vacations`
    const vacations = await dal.execute(sql);
    return vacations;
}

// Get one vacation: 
async function getOneVacation(id) {
    const sql = `select vacationID, description, destination, startDate, endDate, image,price from vacations where vacationID = ${id}`
    const vacations = await dal.execute(sql);
    return vacations[0];
}

async function addVacation(vacation, image) {
    const sql = `insert into vacations(description, destination, startDate, endDate, image, price)
     values('${vacation.description}', '${vacation.destination}', '${vacation.startDate}',
     '${vacation.endDate}', '${image}', ${vacation.price}) `;
    const info = await dal.execute(sql);
    vacation.vacationID = info.insertId;
    return vacation;
}

// Update full vacation: 
async function updateVacation(vacation) {
    const sql = `update vacations set description = '${vacation.description}',
    destination = '${vacation.destination}', startDate = '${vacation.startDate}',
    endDate = '${vacation.endDate}',image = '${vacation.image}', price = ${vacation.price}
        where vacationID = ${vacation.id}`;
    await dal.execute(sql);
    return vacation;
}

// Delete vacation: 
async function deleteVacation(id) {
    const sql = "delete from vacations where vacationID = " + id;
    await dal.execute(sql);
}

module.exports = {
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    getOneVacation
}
