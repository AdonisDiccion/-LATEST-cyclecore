import { useState } from "react";
import { useCart } from "../../context/Cart";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { IoWarning } from "react-icons/io5";

import { Badge } from "antd";
import {
  Grid,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

function CustomShopCard({ p }) {
  //hooks
  const [cart, setCart] = useCart();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const navigate = useNavigate();

  const handleMinus = () => {
    quantity === 0 ? "" : setQuantity(quantity - 1);
  };

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="md:ml-32 font-varela">
      <Grid
        container
        display="flex"
        spacing={3}
        rowGap={5}
        className="mb-14 mx-auto"
      >
        <Grid item md={4}>
          <Box>
            <Badge.Ribbon text={`${p?.sold} sold`} color="red">
              <Badge.Ribbon
                text={`${
                  p?.quantity >= 1
                    ? `${p?.quantity - p?.sold} in stock`
                    : "Out of Stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  src={`${
                    import.meta.env.VITE_APP_REACT_APP_API
                  }/product/photo/${p._id}`}
                  alt=""
                  className="border border-"
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
          </Box>
        </Grid>

        <Grid item md={8} alignContent="center" justifyItems="center">
          <Box className="text-left space-y-5">
            <Box>
              <h1 className="text-3xl font-semibold ">{p.name}</h1>
            </Box>
            <Box>
              <Typography>{p.description}</Typography>
            </Box>

            <Box>
              <span className="font-bold">Price: </span>
              {p?.price?.toLocaleString("en-Us", {
                style: "currency",
                currency: "PHP",
              })}
            </Box>
            <Box gap={2} className="md:flex block ">
              <Box gap={2} className="flex flex-col mb-3 ">
                <Button
                  variant="contained"
                  color="info"
                  className="w-[10rem]"
                  size="small"
                  fullWidth
                  onClick={() => setIsDialogOpen(true)}
                >
                  Add to cart <FiShoppingCart size={13} className="ml-1" />
                </Button>
              </Box>
              <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
              >
                <DialogTitle>
                  <span className="flex items-center justify-between">
                    Add To Cart?
                    <IoWarning className="text-yellow-300 mr-1" fontSize={32} />
                  </span>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to add this item to your cart?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      setIsDialogOpen(false);
                      toast.success("Added to Cart", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }}
                  >
                    Add to cart
                  </Button>
                </DialogActions>
              </Dialog>

              <Box>
                <Button
                  variant="contained"
                  color="info"
                  className="w-[10rem]"
                  size="small"
                  fullWidth
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  View Product
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomShopCard;
