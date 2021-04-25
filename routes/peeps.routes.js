module.exports = app => {
    const peeps = require("../controllers/peeps.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", peeps.create);

    // Retrieve all Tutorials
    router.get("/", peeps.findAll);

    // Retrieve all published Tutorials
    router.get("/published", peeps.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", peeps.findOne);

    // Update a Tutorial with id
    router.put("/:id", peeps.update);

    // Delete a Tutorial with id
    router.delete("/:id", peeps.delete);

    // Create a new Tutorial
    router.delete("/", peeps.deleteAll);

    app.use('/api/peeps', router);
};
