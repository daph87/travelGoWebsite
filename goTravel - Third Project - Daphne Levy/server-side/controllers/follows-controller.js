const express = require("express");
const followsLogic = require("../bll/follow-logic");

const router = express.Router();

router.get("/:id", async (request, response) => {
    const id = +request.params.id;
    const follows = await followsLogic.getAllFollowsOfSpecificUser(id);
    response.json(follows);
});

router.get("/usersfollows/:uid/:vacid", async (request, response) => {
    const userID = +request.params.uid;
    const vacID = +request.params.vacid;
    const follows = await followsLogic.getOneFollow(userID, vacID);
    response.json(follows);
});


router.get("/", async (request, response) => {
    const follows = await followsLogic.getAllFollows();
    response.json(follows);
});

router.post("/", async (request, response) => {
    const follows = request.body;
    const addedFollows = await followsLogic.addFollows(follows);
    response.status(201).json(addedFollows);
});

router.delete("/usersfollows/:uid/:vacid", async (request, response) => {
    const uID = +request.params.uid;
    const vacID = +request.params.vacid;
    await followsLogic.deleteFollows(uID, vacID);
    response.sendStatus(204);
})


module.exports = router;