import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";

export default function UserProfile() {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [firstname, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { firstname, lastname, email, address } = auth.user;
      setfirstName(firstname || "");
      setlastName(lastname || "");
      setEmail(email || "");
      setAddress(address || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", {
        firstname,
        lastname,
        password,
        address,
      });

      if (data?.error) {
        toast.error(data.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        // console.log("profile updated =>", data);
        setAuth({ ...auth, user: data });
        //local storage update
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <>
        <div className="p-20 space-y-4">
          <div className="justify-center">
            <span className="justify-center mx-auto flex font-bold font-varela text-3xl">User Profile</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid max-w-lg mx-auto space-y-4">
              <TextField
                label="First Name"
                
                size="small"
                value={firstname}
                onChange={(e) => setfirstName(e.target.value)}
                
              />
              <TextField
                label="Last Name"
                size="small"
                value={lastname}
                onChange={(e) => setlastName(e.target.value)}
                
              />
              <TextField
                label="Email"
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              />
              <TextField
                label="Password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
              <TextField
                label="Shipping Address"
                size="small"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                
              />
              <Button variant='contained'>SUBMIT</Button>
            </div>
          </form>
        </div>
      </>
      <Footer />
    </>
  );
}
