import sgMail from "./sendGrid";  
import { 
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";  

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }];
  try {
    const msg = {
      to: recipient,
      from: { email: "abhishek.fall2023@gmail.com", name: "Flavour Fiesta - Abhishek Sharma" },
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
    };
    const res = await sgMail.send(msg);  
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const msg = {
      to: recipient,
      from: { email: "abhishek.fall2023@gmail.com", name: "Flavour Fiesta - Abhishek Sharma" },
      subject: "Welcome to Flavor Fiesta",
      html: htmlContent,
    };
    const res = await sgMail.send(msg);  
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
    const msg = {
      to: recipient,
      from: { email: "abhishek.fall2023@gmail.com", name: "Flavour Fiesta - Abhishek Sharma" },
      subject: "Reset your password",
      html: htmlContent,
    };
    const res = await sgMail.send(msg);  
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password");
  }
};

export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const msg = {
      to: recipient,
      from: { email: "abhishek.fall2023@gmail.com", name: "Flavour Fiesta - Abhishek Sharma" },
      subject: "Password Reset Successfully",
      html: htmlContent,
    };
    const res = await sgMail.send(msg);  
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
