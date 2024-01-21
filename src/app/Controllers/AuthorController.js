const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');
const Author = require('../Models')[DataBaseModelNames.AUTHOR];


//* get all Author lists
const getLists = async (req, res) => {

    const authors = await Author.findAll();
    if( authors == null ) throw new Error("Author not found!");

    return res.status(200).json(authors);
}

//* get Author by admins through  ID
const getById = async (req, res) => {
    let author = await Author.findOne({ 
        where: { id: req.params.id },
    });
    
    if( author == null ) throw new Error("Author not found!");

    return res.status(200).json(author);
}

//* create Student by admins
const create = async (req, res) => {

    const author = await Author.findOne({ where: { email: req.body.email } });
    if(author != null) return res.status(400).json({message:"Email already exists!"});
    const aut = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        fullName : req.body.fullName,
        gender : req.body.gender !== "" ? req.body.gender : "male",
        dateOfBirth  :  req.body.dateOfBirth == "" ? null: req.body.dateOfBirth,
        nationality : req.body.nationality,
        email : req.body.email,
        website : req.body.website,
        biography : req.body.biography,
    };
    Author.create(aut).then(data => {
        return res.status(200).json(data);
    }).catch(err => {
        return res.status(403).json(err)
    })
}

//* update Student by admins 
const update = async (req, res) => {
    const data = await Author.findOne({ 
        where: { email: req.body.email, id: {[Op.ne]: req.body.id }}
    });
    if(data) throw new Error("Email already exist!");
    
    let author = await Author.findOne({ where: { id: req.body.id } })
    if(author == null ) return res.status(400).json("Bad request:  ID does not match data from Author table!");
    console.log(req.body.gender);

    author.firstName = req.body.firstName,
    author.lastName = req.body.lastName,
    author.fullName = req.body.fullName,
    author.gender = req.body.gender !== "" ? req.body.gender : "male",
    author.dateOfBirth = req.body.dateOfBirth == "" ? null: req.body.dateOfBirth,
    author.nationality = req.body.nationality,
    author.email = req.body.email,
    author.website = req.body.website,
    author.biography = req.body.biography,
    author.save();
    return res.status(201).json(author)
    
}

//* delete Student by admins
const destroy = async (req, res) => {
    await Author.destroy({ where: {id: req.body.id}, force: true});

    return res.status(200).json("Author deleted successfully!");

}

module.exports = { getLists, getById, create, update, destroy}