const slugify = require('slugify')
const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');
const Category = require('../Models')[DataBaseModelNames.CATEGORY];


//* get all published categories by admins
const getLists = async (req, res) => {
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);

    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
        page = pageAsNumber;
    }

    let size = 10;
    if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 50) && !(sizeAsNumber < 1)){
        size = sizeAsNumber;
    }

    try {
        const results = await Category.findAndCountAll({
                                limit: size,
                                offset: page * size,
                                order: [['createdAt', 'DESC']]
                                });

        const totalPages = Math.ceil(results.count / size);

        res.status(200).json({
            isSuccess: true,
            totalPages: totalPages,
            currentPage: page,
            count: results.rows.length,
            data: results.rows  
        });
    } catch (e) {
      res.status(500).json({ message: e.message })
    }
}

//* get categoy by admins through category ID
const getById = async (req, res) => {
    let category = await Category.findOne({ 
        where: { id: req.params.id },
        attributes: ['id', 'name', 'slug', 'published']
    });
    if( category == null ) throw new Error("Category not found!");

    return res.status(200).json(category);
}

//* create category by admins
const create = async (req, res) => {
    const slug = slugify(req.body.name, { lower: true, strict: true })
    const data = await Category.findOne({ where: { slug: slug}});
    if(data) throw new Error("Category already exist!");

    await Category.create({
        name: req.body.name,
        published: req.body.published,
        slug
    });

    return res.status(200).json('Category successfully created!');
}

//* update category by admins 
const update = async (req, res) => {

    const slug = slugify(req.body.name, { lower: true, strict: true })
    const data = await Category.findOne({ 
        where: { slug: slug, 
        id: {
            [Op.ne]: req.body.id 
            }
        }
    });
    if(data) throw new Error("Category already exist!");

    const category = await Category.findOne({ where: { id: req.body.id}});
    if(!category) throw new Error("Category doesn't exist!");

    category.name = req.body.name;
    category.published = req.body.published;
    category.slug = slug;
    category.save();

    return res.status(200).json(category);
}

//* delete category by admins
const destroy = async (req, res) => {
    await Category.destroy({ where: {id: req.body.id}, force: true});

    return res.status(200).json("Category deleted successfully!");

}

module.exports = { getLists, getById, create, update, destroy}