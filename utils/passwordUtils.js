function validatePassword(password) {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return false;
    }
  
    // Password must contain at least one letter, one number, and one special character
    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    
    if (!letterRegex.test(password) || !numberRegex.test(password) || !specialCharRegex.test(password)) {
      return false;
    }
  
    return true;
  }
  
  module.exports = validatePassword;
  