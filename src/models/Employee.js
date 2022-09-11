module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("Employee", {
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(200),
      },
      gender: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING(255),
        allowNull: true,
      }
    });
    return Employee;
  };
