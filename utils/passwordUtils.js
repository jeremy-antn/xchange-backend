function validatePassword(password) {
    // Le mot de passe doit contenir au moins 8 caractères
    if (password.length < 8) {
      return false;
    }
  
    // Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial
    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    
    if (!letterRegex.test(password) || !numberRegex.test(password) || !specialCharRegex.test(password)) {
      return false;
    }
  
    return true;
  }
  
  module.exports = validatePassword;
  