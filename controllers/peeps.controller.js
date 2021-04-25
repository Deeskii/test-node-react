const db = require("../models");
const Peep = db.peeps;
const Op = db.Sequelize.Op;

// Create and Save a new Peep
    exports.create = (req, res) => {
        // Validate request
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        // Create a Peep
        const peep = {
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false
        };

        // Save Peep in the database
        Peep.create(peep)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Peep."
                });
            });
    };


// Retrieve all Peeps from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

    Peep.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving peeps."
            });
        });
};

// Find a single Peep with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Peep.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Peep with id=" + id
            });
        });
};

// Update a Peep by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Peep.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Peep was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Peep with id=${id}. Maybe Peep was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Peep with id=" + id
            });
        });
};

// Delete a Peep with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Peep.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Peep was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Peep with id=${id}. Maybe Peep was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Peep with id=" + id
            });
        });
};

// Delete all Peeps from the database.
exports.deleteAll = (req, res) => {
    Peep.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Peeps were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all peeps."
            });
        });
};

// Find all published Peeps
exports.findAllPublished = (req, res) => {
    Peep.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving peeps."
            });
        });
};
