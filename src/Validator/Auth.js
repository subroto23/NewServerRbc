const { body } = require("express-validator");

const validateRegistation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("নাম সর্বনিম্ন ৩ অক্ষরের এবং সর্বোচ্চ ৩১ অক্ষরের মধ্যে হবে"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("সঠিক ই-মেইল প্রদান করুন"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  body("phone").trim().notEmpty().withMessage("Phone Number is required"),
];
const validateLogIn = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("সঠিক ই-মেইল প্রদান করুন"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{4,6}$/)
    .withMessage(
      "Password should contain Number,upperCase letter,LowerCase letter,special character combination"
    ),
];

module.exports = { validateRegistation, validateLogIn };
