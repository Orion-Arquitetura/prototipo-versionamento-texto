export function sanitizeInputKeepUnderscoreAndNumbers(input: string) {
  return input.replace(/[^a-zA-Z0-9]/gi, "");
}

export function sanitizeInputKeepOnlyLettersAndSpaces(input: string) {
  const normalizedString = input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return normalizedString.replace(/[^a-zA-Z\s]/g, "");
}

export function sanitizeEmail(email: string) {
  const sanitizedEmail = email.trim().toLowerCase();
  const emailPattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailPattern.test(sanitizedEmail)) {
    return sanitizedEmail;
  } else {
    return false;
  }
}
