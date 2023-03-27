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
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "PHP",
    });
  };
  return (
    <>
      <div className="mx-auto">
        <Box className="flex justify-between mx-2 mb-4">
          <h5 className=" font-varela pt-3">
            Cart total Items: {`${cart.length}`}
          </h5>
        </Box>

        {cart?.map((p, index) => (
          <Grid container alignItems="center" key={index} gap={2}>
            <Grid item>
              <img
                src={`${import.meta.env.VITE_APP_REACT_APP_API}/product/photo/${
                  p._id
                }`}
                className="w-24"
              />
            </Grid>

            <Grid item>
              <div className="font-varela justify-center flex mx-auto text-sm text-gray-300">
                Name
              </div>
              <div className="font-varela text-lg">{p.name}</div>
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
          </Grid>
        ))}

        <div className="space-y-3">
          <Box>
            <span className="font-varela flex justify-center">
              Your Cart Summary
            </span>
          </Box>
          <Box>
            <span className="font-varela flex justify-center">
              Total: <span className="font-bold">{cartTotal()}</span>
            </span>
          </Box>
          <Box>
            <Button variant="contained" color="primary" fullWidth>
              <NavLink to="/cart">View Cart Page</NavLink>
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default CartContents;
