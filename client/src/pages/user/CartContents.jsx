import React, { useState } from "react";
import { Box, Typography, Drawer, Button, Grid } from "@mui/material";

import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/Auth";
import { NavLink, useNavigate } from "react-router-dom";

const CartContents = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.quantity;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };

  const totalQuantity = () => {
    let total = 0;
    cart.map((item) => {
      total += item.quantity;
    });
    return total;
  };

  return (
    <>
      <div className="mx-auto">
        <Box className="flex justify-between mx-2 mb-4 border-b-2 border-gray-100">
          <h5 className=" font-varela pt-3">
            {totalQuantity() === 0 ? <h1 className="font-varela font-bold">Your Cart Is Empty</h1> : <h1>Cart total Items: <span className="font-bold">{totalQuantity()}</span></h1>}
            
          </h5>
        </Box>

        {cart?.map((p, index) => (
          <Grid container alignItems="center" key={index} gap={7} justifyContent="space-between" className="mb-8">
            <Grid item>
              <img
                src={`${import.meta.env.VITE_APP_REACT_APP_API}/product/photo/${
                  p._id
                }`}
                className="w-28 rounded-md"
              />
            </Grid>

            <Grid item>
              <div className="font-varela justify-center flex mx-auto text-sm text-gray-300 text-center w-20">
                Name
              </div>
              <div className="font-varela text-lg text-center">{p.name}</div>
            </Grid>

            <Grid item>
              <div className="font-varela justify-center flex mx-auto text-sm text-gray-300">
                Price
              </div>
              <div className="font-varela">
                <span className="font-bold">
                  {p?.price?.toLocaleString("en-Us", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </span>
              </div>
            </Grid>

            <Grid item>
              <div className="font-varela justify-center flex mx-auto text-sm text-gray-300">
                Quantity
              </div>
              <div className="font-varela mx-auto text-center">
                <span className="font-bold">{p.quantity}</span>
              </div>
            </Grid>
          </Grid>
        ))}

        <div className="space-y-3">
          <Box className="border-b-2 border-gray-100">
            <span className="font-varela flex justify-center">
              <marquee behavior="" direction="right" className="font-bold">YOUR CART SUMMARY</marquee>
            </span>
          </Box>
          <Box>
            <span className="font-varela flex justify-center">
              Total:<span className="font-bold ml-2">{cartTotal()}</span>
            </span>
          </Box>
          <Box>
            <Button variant="contained" color="inherit" fullWidth>
              <NavLink to="/cart" className="font-varela">View Cart Page</NavLink>
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default CartContents;