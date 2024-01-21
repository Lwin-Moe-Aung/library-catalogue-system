const studentSchema = {
    create: {
        firstName: {
            notEmpty: { errorMessage: 'First name field is required.' },
        },
        lastName: {
            notEmpty: { errorMessage: 'Last name field is required.' },
        },
        email: {
            notEmpty: { errorMessage: 'Email field is required.' },
        },
        contactNumber: {
            notEmpty: { errorMessage: 'Contact number field is required.' },
        },
        dateOfBirth: {
            notEmpty: { errorMessage: 'Date of birth  field is required.' },
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
        email: {
          notEmpty: { errorMessage: 'Email field is required.' },
        },
        contactNumber: {
          notEmpty: { errorMessage: 'Contact number field is required.' },
        },
        dateOfBirth: {
            notEmpty: { errorMessage: 'Date of birth  field is required.' },
        },
    },
};
  
module.exports = studentSchema;
  