import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import product from "../../../../server/models/product";

export default function UserOrders() {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <>
        <div className="m-20">
          {orders.map((o, i) => (
            <div key={o._id} className=" mb-20 p-5">
              <TableContainer sx={{ borderRadius: 0 }}>
                <Table aria-label="simple-table" className="">
                  <TableHead className="border-2 border-orange-500">
                    <TableRow>
                      <TableCell>
                        <span className="font-varela font-bold text-lg">#</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-lg">
                          Status
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-lg">
                          Buyer
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-lg">
                          Ordered
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-lg">
                          Payment
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-lg">
                          Quantity
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow className="border-2 border-orange-500">
                      <TableCell>
                        <span className="font-varela font-bold text-md">
                          {i + 1}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-md">
                          {o?.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-md">
                          {o?.buyer?.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-md">
                          {moment(o.createdAt).format("MMMM Do YYYY, h:mm:ss")}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-md">
                          {o?.payment?.success ? "Success" : "Failed"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-varela font-bold text-md">
                          {o?.products?.length}
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {o?.products?.map((p, i) => (
                <Box
                  key={i}
                  className="mx-auto flex items-center p-5 border-2 border-orange-500"
                >
                  <Box className="border-2 border-orange-500 w-full p-5 flex items-center space-x-5">
                    <img
                      src={`${
                        import.meta.env.VITE_APP_REACT_APP_API
                      }/product/photo/${p._id}`}
                      alt=""
                      className="w-32"
                    />
                    <Box className="flex space-x-10 mx-auto justify-center">
                      <Box>
                        <h1 className="text-gray-500 font-varela">Product</h1>
                        <span className="text-2xl font-varela font-bold">
                          {p.name}
                        </span>
                      </Box>
                      <Box>
                        <h1 className="text-gray-500 font-varela">Quantity</h1>
                        <span className="text-2xl font-varela font-bold">
                          {o.totalQuantity}
                        </span>
                      </Box>
                      <Box>
                        <h1 className="text-gray-500 font-varela">Price</h1>
                        <span className="text-2xl font-varela font-bold">
                          {p?.price?.toLocaleString("en-US", {
                            style: "currency",
                            currency: "PHP",
                          })}
                        </span>
                        <span>Php {o.totalPrice}</span>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </div>
          ))}
        </div>
      </>
      <Footer />
    </>
  );
}
