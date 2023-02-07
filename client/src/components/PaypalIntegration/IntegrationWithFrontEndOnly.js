import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "../../utils/axios";
export default function FrontEndIntegration() {
  const baseurl = "http://localhost:5000";
  const createOrder = async () => {
    const order = await axios.post("/api/orders", {
      cart: [
        {
          sku: "123",
          quantity: "123",
        },
      ],
    });
    console.log(order);
  };
  const onApprove = async (data) => {
    axios
      .post(`http://localhost:5000/api/orders/${data.orderID}/capture`)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AdL6zjRId1MYjp8yH7yRYE7n9FTl2CS_x0NgkTrjMj20Jt2BE1p0tDk2UL1oYqE6iNSjNN7p8WhVKK4O",
      }}
    >
      <PayPalButtons
        style={{ layout: "horizontal" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "1.99",
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
