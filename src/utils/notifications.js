import toast from 'react-hot-toast';

export const sendTransactionNotification = (transaction) => {
  const { status, amount, fromCurrency, toCurrency } = transaction;
  const message = `Transaction ${status}: ${amount} ${fromCurrency} to ${toCurrency}`;
  
  if (status === 'success') {
    toast.success(message);
  } else {
    toast.error(message);
  }

  // Here you would typically also send an email or push notification
  // This is just a placeholder for that functionality
  console.log(`Email sent: ${message}`);
};
