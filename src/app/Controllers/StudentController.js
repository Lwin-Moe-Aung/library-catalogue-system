const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');
const Student = require('../Models')[DataBaseModelNames.STUDENT];


//* get all student lists
const getLists = async (req, res) => {

    const students = await Student.findAll();
    if( students == null ) throw new Error("Students not found!");

    return res.status(200).json(students);
}

//* get categoy by admins through Student ID
const getById = async (req, res) => {
    // return res.status(200).json(req.params.id);
    let student = await Student.findOne({ 
        where: { id: req.params.id },
    });
    
    if( student == null ) throw new Error("Student not found!");

    return res.status(200).json(student);
}

//* create Student by admins
const create = async (req, res) => {

    const student = await Student.findOne({ where: { email: req.body.email } });
    if(student != null) return res.status(400).json({message:"Email already exists!"});

    const stu = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        contactNumber : req.body.contactNumber,
        gender : req.body.gender == "" ? "male": req.body.gender,
        dateOfBirth  :  req.body.dateOfBirth == "" ? null : req.body.dateOfBirth,
        address  :  req.body.address,

    };

    Student.create(stu).then(data => {
        return res.status(200).json(data);
    }).catch(err => {
        return res.status(403).json(err)
    })
}

//* update Student by admins 
const update = async (req, res) => {
    const data = await Student.findOne({ 
        where: { email: req.body.email, id: {[Op.ne]: req.body.id }}
    });
    if(data) throw new Error("Email already exist!");
    
    let student = await Student.findOne({ where: { id: req.body.id } })
    if(student == null ) return res.status(400).json("Bad request:  ID does not match data from Student table!");

    student.firstName = req.body.firstName,
    student.lastName = req.body.lastName,
    student.email = req.body.email,
    student.contactNumber = req.body.contactNumber,
    student.gender  =  req.body.gender == "" ? "male": req.body.gender,
    student.dateOfBirth = req.body.dateOfBirth == "" ? null: req.body.dateOfBirth,
    student.address = req.body.address,
    student.save();

    return res.status(201).json(student)
   
    
}

//* delete Student by admins
const destroy = async (req, res) => {

    await Student.destroy({ where: {id: req.body.id}, force: true});

    return res.status(200).json("Student deleted successfully!");

}

module.exports = { getLists, getById, create, update, destroy}