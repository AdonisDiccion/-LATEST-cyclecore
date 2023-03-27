import Navbar from "../../global/nav/Navbar";
import { useCart } from "../../context/Cart";
import Footer from "../../global/footer/Footer";
import { Box, Button, Grid, TextField } from "@mui/material";
import { FiTrash2 } from "react-icons/fi";
import { useAuth } from "../../context/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-toastify";
import { BsHouseDoor,BsBag } from 'react-icons/bs'
import { RxColorWheel } from 'react-icons/rx'



export default function Cart() {
  //context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  //state
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromCart = (productId) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Successful", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-2">
        <Box className=" px-20 flex justify-between mx-2 mb-4">
          <h5 className=" font-varela pt-3">
            Cart Total Items: <span className="font-bold bg-orange-300 py-1 px-2.5 rounded-full">{cart.length}</span>
          </h5>
        </Box>

<div>
<Grid container justifyContent='center' rowGap={2}>
  <Grid item md={8} sm={12}>
  <div className="flex-1 border p-2 rounded-md">
            {cart?.map((p, index) => (
              <Grid container key={index} alignItems="center"  mb="5px">
                <Grid item className="flex-1">
                  <h1 className="text-gray-500 font-varela">Product Name</h1>
                  <div className="font-varela text-lg">{p.name}</div>
                </Grid>
                <Grid item className="flex-1">
                  
                  <img
                    src={`${
                      import.meta.env.VITE_APP_REACT_APP_API
                    }/product/photo/${p._id}`}
                    className="w-24 rounded-sm flex-1"
                  />
                </Grid>
                <Grid item>
                  <h1 className="text-gray-500 font-varela">Price</h1>
                  <div className="flex items-center gap-2">
                    <div className="font-varela">
                      <span className="font-bold">
                        {p?.price?.toLocaleString("en-Us", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </span>
                    </div>
                    <button onClick={() => removeFromCart(p._id)}>
                      <FiTrash2 className="text-red-500" />
                    </button>
                  </div>
                </Grid>
              </Grid>
            ))}
          </div>
  </Grid>






  <Grid item md={3} sm={12} justifyContent='center'>
  <div className="border p-2 space-y-10 w-[25rem] rounded-md justify-center mx-auto">
            <div className="space-y-4">
              <span className="font-varela text-gray-500 flex items-center"><RxColorWheel className="mr-1 animate-spin"/>Your Cart Summary</span>
              <div className="bg-orange-600 h-0.5 rounded-full"></div>
              <h1 className="text-lg font-varela font-bold"><span className="bg-orange-300 py-1 px-2.5 rounded-full">{cartTotal()}</span></h1>
            </div>
            <div className="space-y-4">
              <span className="font-varela text-gray-500 flex items-center"> <BsBag className="mr-1 animate-bounce"/> Total Items </span>
              <div className="bg-orange-600 h-0.5 rounded-full"></div>
              <h1 className="text-lg font-varela font-bold"><span className="bg-orange-300 py-1 px-2.5 rounded-full">{cart.length}</span></h1>
            </div>

            <div className="space-y-4">
              <span className="font-varela text-gray-500 flex items-center"><BsHouseDoor className="mr-1 animate-bounce"/> Shipping Address</span>
              <div className="bg-orange-600 h-0.5 rounded-full"></div>
              <div className="grid space-y-2 mt-4">
                {auth?.user?.address ? (
                  <>
                    <div className="flex">
                      <span className="font-bold font-varela">{auth?.user?.address}</span>
                    </div>
                    <Button variant="contained"
                    color="inherit" onClick={() => navigate("/dashboard/user/profile")}>
                      <span className="font-varela">Update Address</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <div>
                      {auth?.token ? (
                        <button className="bg-blue-400 p-2 rounded font-varela font-bold"
                          onClick={() => navigate("/dashboard/user/profile")}
                        >
                          Add delivery address
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate("/login", {
                              state: "/cart",
                            })
                          }
                        >
                          Login to checkout
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="mt-10">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          now: "vault",
                        },
                        currency: "PHP",
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <Button
                      variant="contained"
                      color="inherit"
                      fullWidth
                      disabled={!auth?.user?.address || !instance || loading}
                      onClick={handleCheckout}
                      className="shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded cursor-pointer"
                    >
                      <span className="font-varela">{loading ? "Processing" : "Checkout"}</span>
                    </Button>
                  </>
                )}
              </div>
              
            </div>
          </div>
      
  </Grid>
</Grid>
</div>


        <div className="flex gap-2">
          
          
        </div>
      </div>
      <Footer />
    </>
  );
}
