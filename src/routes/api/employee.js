const employee = require("../../infra/EmployeeRepo");
const express = require("express");


const router = express.Router();

router.get("/all-employees", employee.getAllEmployees);

router.post("/add-employee",  employee.addEmployee);

router.put("/update-employee/:id",  employee.updateEmployee);

router.delete("/delete/:id", employee.deleteEmployee);

module.exports = router;
