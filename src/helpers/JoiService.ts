import Joi from "joi";

class JoiService {
  private categoryType = ["Task", "Random Thought", "Idea"];

  private dateRegexp: RegExp =
    /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/;

  //* Common validation rules

  private nameValidation = Joi.string().min(2).max(35).required().messages({
    "any.required": "Missing required 'name' field",
    "string.min": "The length of 'name' must be between 2 and 35 characters",
    "string.max": "The length of 'name' must be between 2 and 35 characters",
  });

  private createdValidation = Joi.string()
    .required()
    .pattern(new RegExp(this.dateRegexp))
    .messages({
      "any.required": "Missing required 'created' field",
      "string.pattern.base":
        "The date format is incorrect. Please enter in the format like 'April 25, 2023'",
    });

  private categoryValidation = Joi.string()
    .valid(...this.categoryType)
    .required()
    .messages({ "any.required": "Missing required 'category' field" });

  private contentValidation = Joi.string().min(2).max(100).required().messages({
    "any.required": "Missing required 'content' field",
    "string.min":
      "The length of 'content' must be between 2 and 100 characters",
    "string.max":
      "The length of 'content' must be between 2 and 100 characters",
  });

  //* Class methods

  public addNoteSchema = Joi.object({
    name: this.nameValidation,
    created: this.createdValidation,
    category: this.categoryValidation,
    content: this.contentValidation,
  });

  public updateNoteSchema = Joi.object({
    name: this.nameValidation,
    created: this.createdValidation,
    category: this.categoryValidation,
    content: this.contentValidation,
    archived: Joi.boolean().required(),
  });
}

const joiService = new JoiService();

export default joiService;
