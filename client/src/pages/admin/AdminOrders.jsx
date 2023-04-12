import { useState, useEffect, useRef } from "react";
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
import { Select } from "antd";
import ReactToPrint from "react-to-print";
import { BiPrinter } from "react-icons/bi";

export default function AdminOrders() {

  

  //context
  const [auth, setAuth] = useAuth();
  //state
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changedStatus, setChangedStatus] = useState("");

  const { Option } = Select;

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const componentRef = useRef(null);

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="m-10">
        
        <div >
          <ReactToPrint
            trigger={() => {
              return (
                <button>
                  <BiPrinter
                    fontSize={25}
                    className="hover:text-sky-300 rounded-sm"
                  />
                </button>
              );
            }}
            content={() => componentRef.current}
            documentTitle="Print Order History"
            pageStyle="print"
          />
        </div>
        <strong>ORDER HISTORY</strong>
        <div ref={componentRef}>
          <TableContainer style={{maxHeight: 'unset'}}>
            <Table style={{tableLayout: 'auto'}}>
              <TableHead>
                <TableRow style={{height: '20px'}}>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px', width: '5px'}}>
                    <span>Order#</span>
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  width: '10px'}}>
                    PRODUCT
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  width: '10px'}}>
                    PRODUCT NAME
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px', width: '5px'}}>
                    PRICE
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  width: '10px'}}>
                    STATUS
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  width: '10px'}}>
                    BUYER
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  width: '10px'}}>
                    ORDERED
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  width: '10px'}}>
                    PAYMENT
                  </TableCell>
                  <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px', width: '5px'}}>
                    QUANTITY
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((o, i) => (
                  <TableRow key={o._id} style={{height: '20px'}}>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  width: '10px'}} >
                      {i + 1}
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px', maxWidth: '10px'}} >
                      {o?.products?.map((o,i) => (
                        <div key={i}>
                          <img src={`${import.meta.env.VITE_APP_REACT_APP_API}/product/photo/${o._id}`} 
                          alt="" 
                          className="w-32 mx-auto"
                          />
                        </div>
                      ))}
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px', width: '10px'}} >
                      {o?.products?.map((p,i) => (
                       <div key={i} ><h1 className="w-20 text-center mb-2 mx-auto">{p.name}</h1></div>
                    ))}
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  maxWidth: '5px'}} >
                      {o?.products?.map((o,i) => (
                        <div key={i} className="mb-2">
                          ₱{o.price}
                        </div>
                      ))}
                      
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '2px', maxWidth:'5px'}}  >
                      <Select
                        style={{width: '20%'}}
                        bordered={false}
                        onChange={(value) => handleChange(o._id, value)}
                        defaultValue={o?.status}
                      >
                        {status?.map((s, i) => (
                          <Option key={i} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  maxWidth: '10px'}} >
                      {o?.buyer?.lastname},{o?.buyer?.firstname}
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  maxWidth: '10px'}} >
                      {moment(o.createdAt).format("MMMM Do YYYY, h:mm:ss")}
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  maxWidth: '10px'}} >
                      {o?.payment?.success ? "Success" : "Failed"}
                    </TableCell>
                    <TableCell sx={{border: 1, textAlign: 'center', fontSize: '10px',  maxWidth: '10px'}} >
                      {o?.products?.length}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </TableContainer>
        </div>
      </div>
    </>
  );
}

//  <TableContainer sx={{ borderRadius: 0 }} ref={componentRef}>
// <Table aria-label="simple-table" className="">
//   <TableHead className="border-b-2 border-orange-500">
//     <TableRow>
//       <TableCell>
//         <span className="font-varela font-bold text-lg">
//           #
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-lg">
//           Status
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-lg">
//           Buyer
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-lg">
//           Ordered
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-lg">
//           Payment
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-lg">
//           stocks
//         </span>
//       </TableCell>
//     </TableRow>
//   </TableHead>

//   <TableBody>
//     <TableRow className="border-b-2 border-orange-500">
//       <TableCell>
//         <span className="font-varela font-bold text-md">
//           {i + 1}
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-md">
//           <Select
//             bordered={false}
//             onChange={(value) => handleChange(o._id, value)}
//             defaultValue={o?.status}
//           >
//             {status?.map((s, i) => (
//               <Option key={i} value={s}>
//                 {s}
//               </Option>
//             ))}
//           </Select>
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-md">
//           {o?.buyer?.lastname},{o?.buyer?.firstname}
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-md">
//           {moment(o.createdAt).format(
//             "MMMM Do YYYY, h:mm:ss"
//           )}
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-md">
//           {o?.payment?.success ? "Success" : "Failed"}
//         </span>
//       </TableCell>
//       <TableCell>
//         <span className="font-varela font-bold text-md">
//           {o?.products?.length}
//         </span>
//       </TableCell>
//     </TableRow>
//   </TableBody>
// </Table>
// </TableContainer> 

// {o?.products?.map((p, i) => (
//   <Box key={i} className="mx-auto flex items-center p-5">
//     <Box className=" border-b-2 border-orange-500  w-full p-5 flex items-center space-x-5">
      // <img
      //   src={`${
      //     import.meta.env.VITE_APP_REACT_APP_API
      //   }/product/photo/${p._id}`}
      //   alt=""
      //   className="w-32"
      // />

//       <Box className="flex space-x-10 mx-auto justify-center">
//         <Box>
//           <h1 className="text-gray-500">Product</h1>
//           <span className="text-2xl font-varela font-bold">
//             {p.name}
//           </span>
//         </Box>
//         <Box>
//           <h1 className="text-gray-500 font-varela">Price</h1>
//           <span className="text-2xl font-varela font-bold">
            // {p?.price?.toLocaleString("en-Us", {
            //   style: "currency",
            //   currency: "PHP",
            // })}
//           </span>
//         </Box>
//       </Box>
//     </Box>
//   </Box>
// ))}



// tableeeeeee

// {orders?.map((o, i) => (
//   <Table key={o._id}>
//     <TableHead>
//       <TableRow>
//         <TableCell
//           sx={{
//             border: 1,
//             borderTop: 0,
//             textAlign: "center",
//             verticalAlign: "middle",
//           }}
//         >
//           Product
//         </TableCell>
//         <TableCell
//           sx={{
//             border: 1,
//             borderTop: 0,
//             textAlign: "center",
//             verticalAlign: "middle",
//           }}
//         >
//           Product Name
//         </TableCell>
//         <TableCell
//           sx={{
//             border: 1,
//             borderTop: 0,
//             textAlign: "center",
//             verticalAlign: "middle",
//           }}
//         >
//           Price
//         </TableCell>
//       </TableRow>
//     </TableHead>

//     <TableBody>
//       {o?.products?.map((p, i) => (
//         <TableRow key={p._id}>
//           <TableCell>
//             <img src={p.productImage} alt={p.name} width="50" />
//           </TableCell>
//           <TableCell
//             sx={{
//               border: 1,
//               textAlign: "center",
//               verticalAlign: "middle",
//             }}
//           >
//             {p.name}
//           </TableCell>
//           <TableCell
//             sx={{
//               border: 1,
//               textAlign: "center",
//               verticalAlign: "middle",
//             }}
//           >
//             ${p.price}
//           </TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// ))}