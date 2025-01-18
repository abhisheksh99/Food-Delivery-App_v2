export const generateVerificationCode = (length = 6): string => {
    // Character set for the code
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    // Initialize the verification code
    let verificationCode = ''; 
    // Get the length of the character set
    const charactersLength = characters.length; 
  
    for (let i = 0; i < length; i++) { 
      const randomIndex = Math.floor(Math.random() * charactersLength);
      // Append the character to the code
      verificationCode += characters.charAt(randomIndex); 
    }
  
    return verificationCode; 
  };