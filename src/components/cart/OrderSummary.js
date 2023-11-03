import CartItem from "./CartItem";
import DeleteItemModal from "./DeleteItemModal";
import { useState } from "react";
import { PaystackButton } from 'react-paystack';
import { BASE_URL } from "../../Constants";
function OrderSummary({
  cartItems,
  totalCartValue,
  changeQuantity,
  deleteCartItem,
}) {
  const orderList = JSON.parse(localStorage.getItem("items"));
  const userId = localStorage.getItem("user_id");
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentUser, setCurrentUser] = useState({
      id: 1,
      name: "N/A",
      username: "N/A",
      email: "N/A",
      password: "N/A",
      role: "N/A",
      address: {
          street: "N/A",
          suite: "N/A",
          city: "N/A",
          zipcode: "000000"
      },
      phone: "000000000"
  });

  const [modalShow, setModalShow] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const showDeleteModal = (id) => {
    setModalShow(true);
    setIdToDelete(id);
  };
  const deleteCartItemAndModalClose = () => {
    deleteCartItem(idToDelete);
    setModalShow(false);
  };

  return (
    <>
      {" "}
      <div className="section-title">
        <span className="section-number">1</span>
        <h3>Order Summary</h3>
      </div>
      <div className="order">
        {cartItems.map((order) => {
          return (
            <CartItem
              key={order.name}
              cartItem={order}
              changeQuantity={changeQuantity}
              showDeleteModal={showDeleteModal}
            />
          );
        })}

        <div
          className="order-total d-flex justify-content-between p-2"
          id="order-total"
        >
          <h4>Total:</h4>
          <h4>{totalCartValue} NGN</h4>
        </div>
        <div className="d-flex justify-content-end mt-3">
          {/* <button className="order-btn btn btn-outline-dark" type="submit">
            Place Order
          </button> */}
          {/* <PaystackButton className="order-btn btn btn-outline-dark" {...componentProps} /> */}
          </div>
      </div>
      <DeleteItemModal
        deleteCartItemAndModalClose={deleteCartItemAndModalClose}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="invalid bg-danger mt-5 d-none text-center">
        <p className="text-white p-3">
          An error occurred! Please check the addresses you entered.
        </p>
      </div>
    </>
  );
}

export default OrderSummary;
