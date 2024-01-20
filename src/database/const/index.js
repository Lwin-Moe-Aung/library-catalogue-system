const DataBaseTableNames = Object.freeze({
    ADMIN: 'admins',
    AUTHOR: 'authors',
    CATEGORY: 'categories',
    STUDENT: 'students',
    BOOK: 'books',
    BORROW_RECORD: 'borrow_records',
    FINES: 'fines',
    RESERVATION: 'reservations',
    REVIEW: 'reviews',
  });
  
  const DataBaseModelNames = Object.freeze({
    ADMIN: 'Admin',
    AUTHOR: 'Author',
    CATEGORY: 'Category',
    STUDENT: 'Student',
    BOOK: 'Book',
    BORROW_RECORD: 'BorrowRecord',
    FINES: 'Fines',
    RESERVATION: 'Reservation',
    REVIEW: 'Review',
  });
  
  module.exports = {
    DataBaseTableNames,
    DataBaseModelNames,
  };
  