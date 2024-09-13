const createPaymentIntent = async (amount, firstName, lastName, email) => {
  const baseURL = import.meta.env.VITE_HEROKU_BASE_URL || "";

  const response = await fetch(`${baseURL}/api/payment-intents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: amount,
      firstName: firstName,
      lastName: lastName,
      email: email,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch payment intent client secret");
  }
  const data = await response.json();

  return data.paymentIntent;
};

export default createPaymentIntent;
