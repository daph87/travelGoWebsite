const express = require("express");
const vacationsLogic = require("../bll/vacations-logic");
const followsLogic = require("../bll/follow-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    const vacations = await vacationsLogic.getAllVacations();
    response.json(vacations);
});


router.get("/:id", async (request, response) => {

    try {
        const id = +request.params.id;
        const vacation = await vacationsLogic.getOneVacation(id);
        response.json(vacation);
    }
    catch (err) {
        response.status(500).json(err.message)
    }
});


router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const vacation = request.body;
        vacation.id = id;
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err) {
        response.status(500).json(err.message)
    }
});


router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await followsLogic.deleteFollowByVacation(id);
        await vacationsLogic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).json(err.message)
    }
});



module.exports = router;