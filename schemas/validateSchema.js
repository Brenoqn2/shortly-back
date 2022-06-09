export default function validateSchema(input, schema) {
  const validation = schema.validate(input);

  if (validation.error) {
    console.log(validation.error.details);
    return validation.error.details[0].message;
  } else {
    return true;
  }
}
