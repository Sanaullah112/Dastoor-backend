const validator = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body)
    req.body = parseBody;
    next();

  } catch (err) {

    const status = 401
    const message = err.errors[0].message;
    const extraDetails = "Fill The input Value Properly";
    
    const error = {
      status,
      extraDetails,
      message,
    }
    // console.log(error);
    next(error);
  }
};

export default validator;

