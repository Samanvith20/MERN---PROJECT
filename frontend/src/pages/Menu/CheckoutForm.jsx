import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";

const CheckoutForm = ({ cart, price }) => {
    const [errormessage,setErrormessage]= useState()
    const stripe= useStripe()
    const element=useElements()
    const handleSubmit= async(event)=>{
        event.preventDefault();
        if (!stripe || !element) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
      
          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.

          // create a card element
          const card = element.getElement(CardElement);
      
          if (card == null) {
            return;
          }
          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            console.log('[error]', error);
            setErrormessage(error?.
                message
                )
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setErrormessage("Success")
          }
    }
  return (
    <div className="flex flex-col md:flex-row justify-start items-start gap-7 ">
      {/*left side */}
      <div className="md:w-1/2 w-full space-y-3 ">
        <h4 className="text-lg font-semibold">order Summary</h4>
        <p>Total Price:${price}</p>
        <p>Number of items:{cart?.data?.length}</p>
      </div>
      {/*Right side */}
      <div className="md:w-1/3 w-full space-y-3 card shrink-0  max-w-sm shadow-2xl bg-base-100 px-4 py-8 ">
      <h4 className="text-lg font-semibold">Process Your Payment</h4>
      <h5 className="font-medium">Credit/Debit card</h5>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" className="btn btn-sm mt-5 text-white w-full bg-orange-600" disabled={!stripe}>
          Pay
        </button>
      </form>
      {errormessage? <p> {errormessage} </p>:""}
      </div>
    </div>
  );
};

export default CheckoutForm;
