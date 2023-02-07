import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../utils/axios";
export default function BackEndIntegration() {
  const baseurl = "http://localhost:5000";

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AdL6zjRId1MYjp8yH7yRYE7n9FTl2CS_x0NgkTrjMj20Jt2BE1p0tDk2UL1oYqE6iNSjNN7p8WhVKK4O",
      }}
    >
      <PayPalButtons
        style={{ layout: "horizontal" }}
        // createOrder={(data, actions) => {
        //   return actions.order.create({
        //     purchase_units: [
        //       {
        //         amount: {
        //           value: "1.99",
        //         },
        //       },
        //     ],
        //   });
        // }}
        // onApprove={(data, actions) => {
        //   return actions.order.capture().then((details) => {
        //     const name = details.payer.name.given_name;
        //     alert(`Transaction completed by ${name}`);
        //   });
        // }}
        createOrder={() => {
          // Here define the call to create and order
          return fetch("http://localhost:5000/api/orders", {
            method: "POST",
            body: JSON.stringify({
              cart: [
                {
                  sku: "<YOUR_PRODUCT_STOCK_KEEPING_UNIT>",
                  quantity: "<YOUR_PRODUCT_QUANTITY>",
                },
              ],
            }),
          })
            .then((response) => response.json())
            .then((order) => {
              console.log(order);
              return order.id;
            })
            .catch((err) => {
              // Handle any error
            });
        }}
        onApprove={(data) => {
          return fetch(
            `http://localhost:5000/api/orders/${data.orderID}/capture`,
            {
              method: "post",
            }
          )
            .then((response) => response.json())
            .then((orderData) => {
              // Successful capture! For dev/demo purposes:
              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );
              var transaction =
                orderData.purchase_units[0].payments.captures[0];
              alert(
                "Transaction " +
                  transaction.status +
                  ": " +
                  transaction.id +
                  "\n\nSee console for all available details"
              );
              // When ready to go live, remove the alert and show a success message within this page. For example:
              // var element = document.getElementById('paypal-button-container');
              // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              // Or go to another URL:  actions.redirect('thank_you.html');
            });
        }}
      />
    </PayPalScriptProvider>
  );
}
