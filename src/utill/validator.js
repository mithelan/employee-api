
exports.validateData= (validation)=>{
  let errors=[];
  if (validation.error) {
    validation.error.details.forEach((error) => {
      errors.push({
        title: 'Bad Parameter',
        details: error.message,
      });
    });
  }
  return errors;
}