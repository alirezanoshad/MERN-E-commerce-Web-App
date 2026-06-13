import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// OrderConfirmationPage Component
export const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    if (id) {
      console.log(id);
      // Navigation
      setTimeout(() => {
        navigate(`/my-orders/${id}`);
      }, 5000);
    }
  }, [id, navigate]);

  // JSX
  return (
    <div className="p-9 max-w-4xl mx-auto bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8 my-12">
        Thank you for your order!
      </h1>
      <div className="flex justify-center items-center my-5">
        <p className="text-center">
          Thanks You For Your Order! you will ber redirected to order deatails
          page.
        </p>
      </div>
      <div className="flex items-center justify-center animate-pulse">
        <button>
          <span>just a few moment...</span>
        </button>
      </div>
    </div>
  );
};
