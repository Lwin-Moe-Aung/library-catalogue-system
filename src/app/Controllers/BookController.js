const { Op } = require('sequelize');

const { DataBaseModelNames } = require('../../database/const');
const Book = require('../Models')[DataBaseModelNames.BOOK];
const Category = require('../Models')[DataBaseModelNames.CATEGORY];
const Author = require('../Models')[DataBaseModelNames.AUTHOR];


//* get all Book lists
const getLists = async (req, res) => {
    const books = await Book.findAll();
    if( books == null ) throw new Error("Book not found!");

    return res.status(200).json(books);
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
        if (!book) throw new Error('Book Not Found');

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

        let book;
      
        book = await Book.create(
          {
            title: req.body.title,
            isbn: req.body.isbn,
            publishDate: req.body.publishDate,
            totalCopies: req.body.totalCopies,
            availableCopies: req.body.availableCopies,
            categoryId: req.body.categoryId,
            authorId: req.body.authorId,
            language: req.body.language,
            genre: req.body.genre,
            coverImageUrl: req.body.coverImageUrl,
            publisher: req.body.publisher,
            edition: req.body.edition,
            pageCount: req.body.pageCount,
            averageRating: req.body.averageRating,
          },
          { transaction: t },
        );
        await t.commit();
        return {
            message: 'Book created successfully.',
            data: book,
        };
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
}

//* update Book by admins 
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

//* delete Book by admins
const destroy = async (req, res) => {
    await Author.destroy({ where: {id: req.body.id}, force: true});

    return res.status(200).json("Author deleted successfully!");

}

module.exports = { getLists, getById, create, update, destroy}