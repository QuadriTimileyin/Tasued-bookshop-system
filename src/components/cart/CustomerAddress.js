import { PaystackButton } from "react-paystack";
import Address from "./Address";
import Form from "react-bootstrap/Form";

function CustomerAddress({
  placeOrder,
  handleChangeAddress,
  billingAddress,
  totalCartValue,
  deliveryAddress,
  validated
}) {
  let loggedIn = false;
  let email;
  if (localStorage.getItem("user_id")) {
    loggedIn = true;
    email = localStorage.getItem("user_email");
}

  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: parseInt(totalCartValue) * 100, //convert to kobo for paystack... //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_0bd3ad1618bfe6c98e765b1bfadbb89a42c8ae70',
  };

  const handlePaystackSuccessAction = async (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    if (reference?.status == "success") {
await placeOrder();
    }
    console.log(reference);
  };

    // you can call this function anything
    const handlePaystackCloseAction = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const componentProps = {
      ...config,
      text: 'Pay Now',
      onSuccess: (reference) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
  };
  return (
    <>
      {" "}
      <div className="section-title mt-5">
        <span className="section-number">2</span>
        <h3>Select Address</h3>
      </div>
      <Form
        onSubmit={(e) => placeOrder(e)}
        className="p-2 address-form"
        noValidate
        validated={validated}
      >
        <Address
          title="Delivery Address"
          handleChangeAddress={(e) => handleChangeAddress(e, "delivery")}
          address={deliveryAddress}
        />
        <Address
          title="Billing Address"
          handleChangeAddress={(e) => handleChangeAddress(e, "billing")}
          address={billingAddress}
        />
        <div className="d-flex justify-content-end mt-3">
        <PaystackButton className="order-btn btn btn-outline-dark" {...componentProps} />
        </div>
      </Form>{" "}
    </>
  );
}

export default CustomerAddress;
