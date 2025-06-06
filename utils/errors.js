class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.statusCode = 404;
  }
}
class ValidationError extends Error {
  constructor(message = 'Validation failed') {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = { NotFoundError, ValidationError };
