const db = require("../models");
const {
  employeeDataValidation,
} = require("../routes/validation/employeeValidation");
const Employee = db.employees;
const validator = require("../utill/validator");
const { Op } = require("sequelize");
const _ = require("lodash");
const { getImage } = require("../utill/imagesGen");

exports.getAllEmployees = (req, response) => {
  const { query } = req;
  let sortByGender = query.gender;
  let keyword = query.keyword;

  let whereClause = {};

  if (!_.isEmpty(sortByGender)) {
    whereClause.gender = sortByGender;
  }

  if (!_.isEmpty(keyword)) {
    whereClause.firstName = { [Op.like]: `%${keyword}%` };
  }

  Employee.findAll({
    where: whereClause,
  })
    .then((data) => {
      response.send(data);
    })
    .catch((err) => {
      response.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.addEmployee = (req, res) => {
  const { body } = req;

  const validation = employeeDataValidation.validate(body);
  let errors = validator.validateData(validation);

  if (errors.length) {
    return res.status(400).send({ errors });
  }

  let imageArrayLength=[1,2,3];
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    photo: getImage[_.sample(imageArrayLength)],
  };

  Employee.create(employee)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Employee.",
      });
    });
};

exports.updateEmployee = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Employee with id=${id}. Maybe Employee was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id,
      });
    });
};

exports.deleteEmployee = (req, res) => {
  const id = req.params.id;
  Employee.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete employee with id=${id}. Maybe employee was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete employee with id=" + id,
      });
    });
};
