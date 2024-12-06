export class Response {
  static success(response: any, message = "Success", statusCode = 200) {
    return {
      statusCode,
      message,
      response,
    };
  }

  static error(
    response: any = null,
    message = "An error occurred",
    statusCode = 500
  ) {
    return {
      statusCode,
      message,
      response,
    };
  }
}
