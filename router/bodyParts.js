const express = require("express");
const PartController = require("../controllers/bodyParts");

const api = express.Router();

api.post("/body/", PartController.createParts);
api.put("/body/:id",PartController.updateParts);
api.get("/body/",PartController.getParts);
api.get("/body/:id",PartController.getPartById);
api.delete("/body/:id",PartController.deleteParts);

module.exports = api;