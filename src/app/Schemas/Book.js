const bookSchema = {
    create: {
        title: {
            notEmpty: { errorMessage: 'Title field is required.' },
        },
        totalCopies: {
            notEmpty: { errorMessage: 'Totle Copies field is required.' },
        },
        availableCopies: {
            notEmpty: { errorMessage: 'Available Copies field is required.' },
        },
        categoryId: {
            notEmpty: { errorMessage: 'Category Id is required.' },
        },
        authorId: {
            notEmpty: { errorMessage: 'Author Id field is required.' },
        }
    },
    update: {
        id: {
            notEmpty: { errorMessage: 'Id field is required.' },
        },
        title: {
            notEmpty: { errorMessage: 'Title field is required.' },
        },
        totalCopies: {
            notEmpty: { errorMessage: 'Totle Copies field is required.' },
        },
        availableCopies: {
            notEmpty: { errorMessage: 'Available Copies field is required.' },
        },
        categoryId: {
            notEmpty: { errorMessage: 'Category Id is required.' },
        },
        authorId: {
            notEmpty: { errorMessage: 'Author Id field is required.' },
        }
    },
};
  
module.exports = bookSchema;
  