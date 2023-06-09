import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
  ButtonGroup,
} from "@mui/material";
import { TiPlusOutline, TiMinusOutline } from "react-icons/ti";
import ReactImageMagnify from "react-image-magnify";
import TechSpecs from "../../components/section/TechSpecs";
import { useCart } from "../../context/Cart";
import { toast } from "react-toastify";
import { IoWarning } from "react-icons/io5";
import { GiShoppingCart } from 'react-icons/gi'

const SingleProductView = () => {
  // quantity
  const [quantity, setQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(0);

  //context
  const [cart, setCart] = useCart();
  //state
  const [product, setProduct] = useState({});
  const [added, setAdded] = useState(1);
  const [related, setRelated] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //hooks
  const params = useParams();

  const handleMinus = () => {
    added === 0 ? "" : setAdded(added - 1);
  };
  

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      setAvailableStock(data.quantity); // set the available stock value
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      quantity: quantity,
    };
  
    // Check if item already exists in cart
    const existingCartItem = cart.find((item) => item._id === product._id);
  
    if (existingCartItem) {
      // If item exists, update quantity
      const updatedCart = cart.map((item) => {
        if (item._id === product._id) {
          return { ...item, quantity: item.quantity + quantity };
        } else {
          return item;
        }
      });
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If item does not exist, add to cart
      setCart([...cart, cartItem]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, cartItem])
      );
    }
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
  };

  const handleQuantityChange = (event) => {
    const { value } = event.target;
    if (value > availableStock) { // check if entered quantity is greater than available stock
      setQuantity(availableStock); // if yes, set the quantity to available stock
    } else if (value < 1) {
      setQuantity(1); // check if entered quantity is less than 1, if yes, set the quantity to 1
    } else {
      setQuantity(parseInt(value)); // otherwise set the entered quantity
    }
  };
    
  
  return (
    <>
      <Navbar />
      <div className="font-signika mt-12">
        <Grid container gap={10} justifyContent="center">
          <Grid item>
            <div className="container max-w-4xl mx-auto">
              <div className="left flex space-x-6">
                <div className="left-1 flex flex-col mt-24 gap-3">
                  <div>
                    <img
                      src={
                        product.photo
                          ? `${
                              import.meta.env.VITE_APP_REACT_APP_API
                            }/product/photo/${product._id}`
                          : ""
                      }
                      alt=""
                      className="w-[70px] h-[70px] object-contain"
                    />
                  </div>
                </div>
                <div className="left-2 max-w-4xl">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Product photo",
                        isFluidWidth: true,
                        src: `${
                          import.meta.env.VITE_APP_REACT_APP_API
                        }/product/photo/${product._id}`,
                      },
                      largeImage: {
                        src: `${
                          import.meta.env.VITE_APP_REACT_APP_API
                        }/product/photo/${product._id}`,
                        width: 1200,
                        height: 1800,
                      },
                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                    }}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item my="auto">
            <div className="max-w-lg grid space-y-6">
              <span className="text-4xl">
                <b>{product?.name}</b>
              </span>
              <span className="text-4xl text-red-500">
                <b>
                  {product?.price?.toLocaleString("en-Us", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </b>
              </span>
              <div className="">
                <span className="flex items-center gap-1 font-signika pt-3">
                  <b>Size :</b>
                  <p>IM820BJLFPNA100</p>
                </span>
                <span className="flex items-center gap-1 font-signika pt-3">
                  <b>Est. Weight :</b>
                  <p>312 grams (0.69 lbs)</p>
                </span>
                <span className="flex items-center gap-1 font-signika pt-3">
                  <b>Available :</b>
                  <p>{product?.stocks - product?.sold}</p>
                </span>
                <span className="flex items-center gap-1 font-signika pt-3">
                  <b>Sold :</b>
                  <p>{product?.sold}</p>
                </span>
              </div>

              <div>
              <TextField
                label="Quantity"
                size="medium"
                type="number"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                InputProps={{
                  inputProps: {
                    min: 1,
                    max: product?.stocks - product?.sold,
                  },
                  endAdornment: (
                    <ButtonGroup variant="outlined" size="small">
                      <Button color="inherit" onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
                        <TiMinusOutline />
                      </Button>
                      <Button color="inherit" onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product?.stocks - product?.sold}>
                        <TiPlusOutline />
                      </Button>
                    </ButtonGroup>
                  ),
                  disabled: quantity >= product?.stocks - product?.sold,
                }}
              />

              </div>


              <Button
                onClick={() => setIsDialogOpen(true)}
                className="bg-[#656565] text-white rounded-md h-[48px] text-[1.25rem] w-full"
                disabled={quantity >= product?.stocks - product?.sold}
                variant="contained"
                color="inherit"
                startIcon={<GiShoppingCart/>}
              >
                <span className="font-varela font-bold">Add To Cart</span>
              </Button>

              {/* dialog */}
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
                  <Button onClick={() => setIsDialogOpen(false)}>No</Button>
                  <Button
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Grid>
      </div>
      <>
        <div className="grid justify-center mt-12 font-signika">
          <div className="mx-auto mb-10">
            <b>Related Products:</b>
          </div>
          <div className="flex space-x-4 items-center">
            {related?.length < 1 && <p>Nothing Found</p>}
            {related?.map((p) => (
              <div key={p._id} className="max-w-xs grid text-center">
                <img
                  src={`${
                    import.meta.env.VITE_APP_REACT_APP_API
                  }/product/photo/${p._id}`}
                  alt=""
                  className="w-40 mx-auto"
                />
                <span className="text-gray-400">{p.category.name}</span>
                <b>{p.name}</b>
                <b>
                  {p?.price?.toLocaleString("en-Us", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </b>
              </div>
            ))}
          </div>
        </div>
        {/* {related?.length < 1 && <p>Nothing Found</p>}
        {related?.map((p) => (
          <RelatedProducts p={p} key={p._id} />
        ))} */}
        {/* <pre>{JSON.stringify(related, null, 4)}</pre> */}
      </>
      <div className="max-w-7xl mx-auto mt-20 font-signika space-y-5">
        <b className="text-3xl">{product.name}</b>
        <p>{product.description} </p>
      </div>
      <>
        <TechSpecs />
      </>
      <Footer />
    </>
  );
};

export default SingleProductView;
