//import useCart from "../../hooks/useCart";

import { ImBin2 } from "react-icons/im";
import CartServices from "../../services/cart.service";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const Cart = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  console.log(cart);

  const totalPrice = (cart) => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].productPrice * cart[i].quantity;
    }
    return total;
  };

  // Format currency build-in function
  const formatPrice = (price) => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: "THB",
    }).format(price);
  };

  const handleRemoveItem = async (id) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#8d99ae",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await CartServices.removeCartItem(id);
          if (res.status === 200) {
            Swal.fire({
              title: "Success",
              text: res.data.message,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
            window.location.reload();
          }
        } catch (error) {
          Swal.fire({
            title: "Oops...",
            text: error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleClearAllItems = async (email) => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#8d99ae",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await CartServices.clearCartItems(email);
          if (res.status === 200) {
            Swal.fire({
              title: "Success",
              text: res.data.message,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
            window.location.reload();
          }
        } catch (error) {
          Swal.fire({
            title: "Oops...",
            text: error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      }
    });
  };

  const handleIncrease = async (cartItem) => {
    try {
      if (cartItem.quantity < 99) {
        const res = await CartServices.updateCartItem(cartItem._id, {
          quantity: (cartItem.quantity += 1),
        });
        if (res.status === 200) {
          console.log(res);
          refetch();
        }
      } else {
        Swal.fire({
          title: "Oops...",
          text: "You have reach limit!",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error.message,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const handleDecrease = async (cartItem) => {
    try {
      if (cartItem.quantity > 1) {
        const res = await CartServices.updateCartItem(cartItem._id, {
          quantity: (cartItem.quantity -= 1),
        });
        if (res.status === 200) {
          console.log(res);
          refetch();
        }
      } else {
        handleRemoveItem(cartItem._id);
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error.message,
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100% h-[80.5vh]">
        <div className="justify-end items-end flex p-2">
          <button
            className="btn btn-ghost text-red"
            onClick={() => handleClearAllItems(user?.email)}
          >
            Clear List
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-red text-white text-center">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th className="w-12">Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cart.length > 0 ? (
                cart.map((item, index) => (
                  <tr key={index}>
                    <td className="font-bold">{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14">
                          <img src={item.productImage} alt="Product image" />
                        </div>
                      </div>
                    </td>
                    <td>{item.productName}</td>
                    <td>
                      <div className="space-x-2 flex justify-center items-center">
                        <button
                          className="btn btn-xs"
                          onClick={() => handleDecrease(item)}
                        >
                          <FiMinus />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          className="btn btn-xs"
                          onClick={() => handleIncrease(item)}
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td>{formatPrice(item.productPrice)}</td>
                    <td className="w-12">
                      {formatPrice(item.quantity * item.productPrice)}
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red hover:scale-110 transition-transform duration-200"
                      >
                        <ImBin2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No item in cart
                  </td>
                </tr>
              )}
            </tbody>
            {/* foot */}
            <tfoot className="text-center">
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th className="w-12">Price</th>
                <th>Action</th>
              </tr>
            </tfoot>
          </table>
        </div>
        {cart.length > 0 ? (
          <div className="overflow-x-auto">
            <hr />
            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <p>Name: {user?.displayName}</p>
                <p>Email: {user?.email}</p>
                <p>User_Id: {user?.uid}</p>
              </div>
              <div className="md:w-1/2 space-y-3">
                <h3 className="text-lg font-semibold">Shopping Details</h3>
                <p>Total Items: {cart.length} items</p>
                <p>Email: {formatPrice(totalPrice(cart))}</p>
                <button className="btn bg-red text-white">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-2xl font-bold text-center text-red mb-4"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
