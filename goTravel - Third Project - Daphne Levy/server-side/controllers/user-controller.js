const express = require("express");
const usersLogic = require("../bll/users-logic");
const router = express.Router();


router.get("/", async (request, response) => {
    const users = await usersLogic.getAllUsers();
    response.json(users);
});

router.get("/:id", async (request, response) => {
    const id = +request.params.id;
    const users = await usersLogic.getOneUser(id);
    response.json(users)
});


router.post("/", async (request, response) => {
    const user = request.body;
    const addedUser = await usersLogic.addUser(user);
    response.status(201).json(addedUser);
});


module.exports = router;