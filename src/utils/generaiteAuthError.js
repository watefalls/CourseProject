export function generateAuthError(error) {
  switch (error) {
    case "EMAIL_NOT_FOUND":
      return "Не правильный Email";
    case "INVALID_PASSWORD":
      return "Не правильный пароль";
    case "EMAIL_EXISTS":
      return "Пользователь с таким Email уже существует";
    default:
      return "Слишком много попыток входа, попробуйте позже";
  }
}
