const categorySchema = {
    create: {
      name: {
        notEmpty: { errorMessage: 'Category name field is required.' },
      },
    },
  };
  
module.exports = categorySchema;
  