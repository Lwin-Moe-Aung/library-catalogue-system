
exports.tryCatch = (controller) => async (req, res, next) => {
    try {
      // Execute the controller function
      await controller(req, res);
    } catch (error) {
      // If an error occurs, pass it to the next middleware
      return next(error);
    }
  };