import Joi from "joi";

class JoiService {
  private categoryType = ["Task", "Random Thought", "Idea"];

  private dateRegexp: RegExp =
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/;

  //* Class methods

  public noteSchema = Joi.object({
    name: Joi.string().min(2).max(35).required().messages({
      "any.required": "Missing required 'name' field",
      "string.min": "The length of 'name' must be between 2 and 35 characters",
      "string.max": "The length of 'name' must be between 2 and 35 characters",
    }),

    created: Joi.string()
      .required()
      .pattern(new RegExp(this.dateRegexp))
      .messages({
        "any.required": "Missing required 'created' field",
        "string.pattern.base":
          "The date format is incorrect. Please enter in the format 'April 25, 2023'",
      }),

    category: Joi.string()
      .valid(...this.categoryType)
      .required()
      .messages({ "any.required": "Missing required 'category' field" }),

    content: Joi.string().min(2).max(100).required().messages({
      "any.required": "Missing required 'content' field",
      "string.min": "The length of 'name' must be between 2 and 100 characters",
      "string.max": "The length of 'name' must be between 2 and 100 characters",
    }),
  });
}

const joiService = new JoiService();

export default joiService;
