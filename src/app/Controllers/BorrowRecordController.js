
const { Op } = require('sequelize');
const { DataBaseModelNames } = require('../../database/const');
const Book = require('../Models')[DataBaseModelNames.BOOK];
const BorrowRecord = require('../Models')[DataBaseModelNames.BORROW_RECORD];


//* student borrow book by admin 
const borrowRecordByAdmin = async (req, res) => {
    const { studentId, bookId } = req.body;
    const { id } = req;
    // Check if the book is available for borrowing
    const book = await Book.findOne({
        where: {
          id: bookId,
          available_copies: {
            [Op.gt]: 0,
          },
        },
    });
   
    if (!book) {
        return res.status(200).json({
            isSuccess: false,
            message: "Book is not available for borrowing"
        });  
    }
  
    // Create a borrow record
    const borrow = await BorrowRecord.create({
        adminId: id,
        studentId: studentId,
        bookId: bookId,
        borrowDate: new Date(),
        status: 'borrowed',
    });
 
    // Update book details (reduce available_copies)

    if (book && book.availableCopies > 0) {
        // const count = book.availableCopies -1
        // return res.status(200).json(book.availableCopies -1 )
        await book.update({ availableCopies: book.availableCopies -1 });
    } else {
    // Handle the case where the book is not found or available_copies is already 0
        console.error('Book not found or no available copies.');
    }
    res.status(200).json({
        isSuccess: true,
        data: borrow
    });  
}

//* student return book by admin
const borrowReturn = async (req, res) => {

    // Check if the borrow record exists
    const borrowRecord = await BorrowRecord.findByPk(req.body.borrowRecordId);

    if (!borrowRecord) {
        throw new Error('Borrow record not found');
    }

    // Update borrow record status and return date
    borrowRecord.status = 'returned';
    borrowRecord.returnDate = new Date();
    await borrowRecord.save();

    // Update book details (increase available_copies)
    await Book.increment('available_copies', {
        by: 1,
        where: { id: borrowRecord.bookId },
    });
    res.status(200).json({
        isSuccess: true,
        data: borrowRecord
    });  
}

module.exports = { borrowRecordByAdmin, borrowReturn}