const authorSchema = {
    create: {
        firstName: {
            notEmpty: { errorMessage: 'First name field is required.' },
        },
        lastName: {
            notEmpty: { errorMessage: 'Last name field is required.' },
        },
        fullName: {
            notEmpty: { errorMessage: 'Full name field is required.' },
        },
        gender: {
            notEmpty: { errorMessage: 'Gender field is required.' },
        },
        email: {
            notEmpty: { errorMessage: 'email name field is required.' },
        },
        dateOfBirth: {
            notEmpty: { errorMessage: 'dateOfBirth field is required.' },
        },
    },
    update: {
        id: {
            notEmpty: { errorMessage: 'Id field is required.' },
        },
        firstName: {
            notEmpty: { errorMessage: 'First name field is required.' },
        },
        lastName: {
            notEmpty: { errorMessage: 'Last name field is required.' },
        },
        fullName: {
            notEmpty: { errorMessage: 'Full name field is required.' },
        },
        email: {
            notEmpty: { errorMessage: 'email name field is required.' },
        },
        gender: {
            notEmpty: { errorMessage: 'Gender field is required.' },
        },
        dateOfBirth: {
            notEmpty: { errorMessage: 'dateOfBirth field is required.' },
        },
    },
};
  
module.exports = authorSchema;
  