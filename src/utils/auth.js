export const sendEmailVerification = async (email) => {
  // Simulated email verification logic
  console.log(`Sending verification email to ${email}`);
  // In a real application, you would integrate with your email service here
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
};
