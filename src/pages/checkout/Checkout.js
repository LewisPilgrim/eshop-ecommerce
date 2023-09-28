import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, selectCartItems, selectCartTotalAmount } from "../../redux/features/cartSlice";
import { selectEmail } from "../../redux/features/authSlice";
import { selectBillingAddress, selectShippingAddress } from "../../redux/features/checkoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);


const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing checkout...")

  const dispatch = useDispatch()

  const cartItems = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotalAmount)
  const customerEmail = useSelector(selectEmail)
  const shippingAddress = useSelector(selectShippingAddress)
  const billingAddress = useSelector(selectBillingAddress)

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY())
    dispatch(CALCULATE_SUBTOTAL())
  }, [dispatch, cartItems])

  const description = `eShop payment: email: ${customerEmail}, amount: ${totalAmount}.`

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout.")
        toast.error("Something went wrong.")
      })
  }, [billingAddress, cartItems, customerEmail, description, shippingAddress]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">
          {!clientSecret && <h3>{message}</h3>}
        </div>
        
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default Checkout
