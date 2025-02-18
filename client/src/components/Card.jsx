import { useState } from "react";
import CartServices from "../services/cart.service";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import useCart from "../hooks/useCart";
import Swal from "sweetalert2";

const Card = ({ item }) => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { _id, name, description, price, image, category } = item;

  console.log(user);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = async () => {
    if (!user || !user.email) {
      Swal.fire({
        title: "Oops...",
        text: "Please login to add to cart!",
        timer: 1500,
        icon: "error",
        position: "center",
        showConfirmButton: false,
      });
      return;
    }
    try {
      const cartItem = {
        customer: user.email,
        productId: _id,
        quantity: 1,
        productName: name,
        productPrice: price,
        productImage: image,
      };

      const res = await CartServices.createCartItems(cartItem);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Item added to cart.",
          timer: 1500,
          icon: "success",
          position: "center",
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Oops...",
        text: error.message,
        timer: 1500,
        icon: "error",
        position: "center",
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className="rating gap-1 absolute right-2 top-2 p-4 heartStar z-40 bg-red rounded-md"
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="rating-3"
          className={`mask mask-heart ${
            isHeartFilled ? "bg-white" : ""
          } hover:bg-white transition-all delay-100`}
        />
      </div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-60 md:w-60 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-1">{name}</h2>
        <p className="line-clamp-2">{description}</p>
        <div className="card-action flex justify-between items-center mt-2">
          <h5 className="font-semibold">
            {price} <span className="text-sm text-red">฿</span>
          </h5>
          <button
            onClick={handleAddToCart}
            className="btn bg-red rounded-md text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
