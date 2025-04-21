import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../config";

export const CheckOutPage = () => {
  //   const user = useSelector((state) => state.auth);

  const cartItems = [
    {
      id: 1,
      name: "Plan- Unlimited 30 days",
      desc: "PracticeCompanions 30 days Pro plan with unlimited module Practice and 10 set Full mock Test",
      price: 13.97,
      quantity:1
    },
  ];
  const handleCheckout = () => {
    axios
      .post(`${BASE_URL}api/v1/stripe/create-checkout-session`, {
        cartItems,
        userId: 1,
      })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};
