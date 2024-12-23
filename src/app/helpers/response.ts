export class Response {
  static success(
    set: any,
    response: any,
    message = "Success",
    statusCode = 200
  ) {
    return {
      statusCode,
      message,
      response,
    };
  }

  static error(
    set: any,
    response: any = null,
    message = "An error occurred",
    statusCode = 500
  ) {
    set.status = statusCode;
    return {
      statusCode,
      message,
      response,
    };
  }
}
