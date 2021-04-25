module.exports = (sequelize, Sequelize) => {
    const Peep = sequelize.define("peep", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Peep;
};
