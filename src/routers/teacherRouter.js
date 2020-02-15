const express = require("express");
const teachers = require("../models/teachers");

const teacherRouter = express.Router();

teacherRouter
  .post("/", (req, res) => {
    if (req.body.id && req.body.firstName) {
      teachers.push(req.body);
      res.status(200).json({ message: "teacher created successfully" });
    } else {
      res.status(400).send("Bad Request");
    }
  })
  .get("/:id", (req, res) => {
    const { id = "" } = req.params;
    const requiredteacher = teachers.find(teacher => {
      if (parseInt(id) === teacher.id) return true;
      else return false;
    });
    if (requiredteacher) {
      res.status(200).json({ teacher: requiredteacher });
    } else {
      res.status(404).send("Not Found");
    }
  })
  .patch("/:id", (req, res) => {
    const { id } = req.params;

    let requiredteacherIndex;
    const requiredteacher = teachers.find((teacher, teacherIndex) => {
      if (parseInt(id) === teacher.id) {
        requiredteacherIndex = teacherIndex;
        return true;
      }
      return false;
    });

    if (requiredteacher) {
      const {
        firstName = requiredteacher.firstName,
        lastName = requiredteacher.lastName,
        age = requiredteacher.age,
        gender = requiredteacher.gender
      } = req.body;
      teachers[requiredteacherIndex] = {
        id: requiredteacher.id,
        firstName,
        lastName,
        age,
        gender
      };
      res.status(200).json({ message: "teacher details updated" });
    } else {
      res.status(400).send("Bad Request");
    }
  })
  .delete("/:id", (req, res) => {
    const { id } = req.params;
    let requiredteacherIndex;
    const requiredteacher = teachers.find((teacher, teacherIndex) => {
      if (parseInt(id) === teacher.id) {
        requiredteacherIndex = teacherIndex;
        return true;
      }
      return false;
    });
    if (requiredteacher) {
      teachers.splice(requiredteacherIndex, 1);
      res.status(200).json({ message: "teacher has been deleted" });
    } else {
      res.status(400).send("Bad Request");
    }
  });

module.exports = teacherRouter;
