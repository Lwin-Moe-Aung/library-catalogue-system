const { Op } = require('sequelize');
const db = require('../Models');

const { DataBaseModelNames } = require('../../database/const');
const Book = require('../Models')[DataBaseModelNames.BOOK];
const Category = require('../Models')[DataBaseModelNames.CATEGORY];
const Author = require('../Models')[DataBaseModelNames.AUTHOR];


//* get all Book lists
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
        const results = await Book.findAndCountAll({
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

//* get Book by admins through  ID
const getById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            where: { deletedAt: null },
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['id', 'name'],
                },
                {
                    model: Author,
                    as: 'authors',
                    attributes: ['id', 'fullName'],
                },
            ],
        });
        if (!book) return res.status(200).json('Book Not Found');

        return res.status(200).json(book);
        
    } catch (error) {
        throw new Error(error);
    }
}

//* create Book by admins
const create = async (req, res) => {

    const t = await db.sequelize.transaction();
    try {
        const category = await Category.findByPk(req.body.categoryId, {
            where: { deletedAt: null, published: 1 },
        });
        if (!category) throw new Error('Invalid CategoryId');

        const author = await Author.findByPk(req.body.authorId, {
                where: { deletedAt: null },
        });
        if (!author) throw new Error('Invalid AuthorId');

        const bo = await Book.findOne({ 
            where: {
                [Op.or]: [
                    { isbn: req.body.isbn },
                    { catalogId: req.body.catalogId }
                ]
            }
        });
        // return res.status(200).json(bo);
        if (bo) return res.status(200).json('Duplicate isbn or categoryId');

        const book = await Book.create(
          {
            title: req.body.title,
            isbn: req.body.isbn,
            catalogId: req.body.catalogId,
            publishDate: req.body.publishDate,
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies,
            categoryId: req.body.categoryId,
            authorId: req.body.authorId,
            language: req.body.language,
            genre: req.body.genre,
            summary: req.body.summary,
            coverImageUrl: req.body.coverImageUrl,
            publisher: req.body.publisher,
            edition: req.body.edition,
            pageCount: req.body.pageCount,
            averageRating: req.body.averageRating,
          },
          { transaction: t },
        );
        await t.commit();
        return res.status(200).json(book);
        
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
}

//* update Book by admins 
const update = async (req, res) => {

    const t = await db.sequelize.transaction();
    try {
        const book = await Book.findByPk(req.body.id);
        if (!book) return res.status(200).json('No Book Data');
        // check isbn
        const bo = await Book.findOne({ 
            where: {
                [Op.or]: [
                    { isbn: req.body.isbn },
                    { catalogId: req.body.catalogId }
                ],
                id: {
                    [Op.ne]: req.body.id
                }
            }
        });
        if (bo) return res.status(200).json('Duplicate isbn or categoryId');
        //check category
        const category = await Category.findByPk(req.body.categoryId, {
            where: { deletedAt: null, published: 1 },
        });
        if (!category) throw new Error('Invalid CategoryId');
        //check author
        const author = await Author.findByPk(req.body.authorId, {
                where: { deletedAt: null },
        });
        if (!author) throw new Error('Invalid AuthorId');
        

        await book.update(
          {
            title: req.body.title,
            isbn: req.body.isbn,
            catalogId: req.body.catalogId,
            publishDate: req.body.publishDate,
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies,
            categoryId: req.body.categoryId,
            authorId: req.body.authorId,
            language: req.body.language,
            genre: req.body.genre,
            summary: req.body.summary,
            coverImageUrl: req.body.coverImageUrl,
            publisher: req.body.publisher,
            edition: req.body.edition,
            pageCount: req.body.pageCount,
            averageRating: req.body.averageRating,
          },
          { transaction: t },
        );
        await t.commit();
        return res.status(200).json(book);
        
    } catch (error) {
        await t.rollback();
        throw new Error(error);
    }
    
}

//* delete Book by admins
const destroy = async (req, res) => {
    await Book.destroy({ where: {id: req.body.id}, force: true});

    return res.status(200).json("Book deleted successfully!");

}


//* Search book by filtering with title, category name, author name or catalogId
const searchBooks = async (req, res) => {
    const { bookTitle, categoryId, authorId, catalogId } = req.query;

    try {
        const books = await Book.findAll({
            where: {
                title: {
                    [Op.like]: `%${bookTitle || ''}%`,
                },
                categoryId: categoryId || { [Op.not]: null },
                authorId: authorId || { [Op.not]: null },
                catalogId: catalogId || { [Op.not]: null },
            },
            include: [
                { 
                    model: Category, 
                    as: 'categories', // Use the correct alias
                    attributes: ['id', 'name', 'slug'], 
                    where: { deletedAt: null, published: 1 }, 
                    required: false 
                },
                { 
                    model: Author, 
                    as: 'authors',
                    attributes: ['id', 'fullName', 'gender', 'email', 'biography', 'website'], 
                    where: { deletedAt: null }, 
                    required: false 
                },
            ],
        });

        res.status(200).json({
            isSuccess: true,
            count: books.length,
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            isSuccess: false,
            message: error.message,
        });
    }
};
module.exports = { getLists, getById, create, update, destroy, searchBooks}