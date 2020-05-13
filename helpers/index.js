exports.sendError = ( status = 500, message = 'Server Error') => {
    const error = new Error();
    error.message = message;
    error.status = status;
    return error
}	

exports.asyncHandler = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
}



