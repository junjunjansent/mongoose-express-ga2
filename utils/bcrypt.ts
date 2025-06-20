import bcrypt from "bcrypt";

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const bcryptPassword = (password: string) => {
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
};

const isPasswordBCryptValidated = (
  passwordToCheck: string,
  aHashedPassword: string
) => {
  return bcrypt.compareSync(passwordToCheck, aHashedPassword);
};

export { bcryptPassword, isPasswordBCryptValidated };
