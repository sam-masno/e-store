exports.sendError = ( status = 500, message = 'Server Error', next) => {
    const error = new Error();
    error.message = message;
    error.status = status;
    return next(error)
}	



