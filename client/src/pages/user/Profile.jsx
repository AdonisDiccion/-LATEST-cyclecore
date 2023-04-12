import Footer from "../../global/footer/Footer";
import Navbar from "../../global/nav/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Accordion, AccordionSummary, Typography, AccordionDetails } from "@mui/material";
import { toast } from "react-toastify";
import { HiOutlineSquaresPlus } from 'react-icons/hi2'
import { TbEdit } from 'react-icons/tb'
import { AiOutlineClose } from 'react-icons/ai'

export default function UserProfile() {

  // oppen accordion
  const [expanded, setExpanded] = useState(false)

  const [expanded2, setExpanded2] = useState(false)

  //open dialog
  const [ dialog , openDialog ] = useState(false) 

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
        console.log(email);
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
      <div className="m-5">
        <Grid container gap={2}>
          {/* left side */}
          <Grid item className="flex-1 p-5 border">
            <div>
              <div className="justify-center">
                <span className="justify-center mx-auto flex font-bold font-varela text-3xl">
                  Personal Information
                </span>
              </div>
              <form onSubmit={handleSubmit}>
                {/* First Name & Last Name */}
              <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
                <AccordionSummary
                  expandIcon={expanded ? <AiOutlineClose fontSize={25}/> : <TbEdit fontSize={25}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                 
                >
                    <div>
                      <Typography><span className="font-varela text-xl">Full Name</span></Typography>
                      <div className={expanded ? "hidden" : `flex items-center space-x-1`}>
                        <Typography>{firstname}</Typography>
                        <Typography>{lastname}</Typography>
                      </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                  
                  <div className="space-y-4">
                    <div><TextField
                      label="First Name"
                      size="small"
                      value={firstname}
                      onChange={(e) => setfirstName(e.target.value)}
                      
                    />
                    </div>
                    <div>
                      <TextField
                      label="Last Name"
                      size="small"
                      value={lastname}
                      onChange={(e) => setlastName(e.target.value)}
                      />
                    </div>
                    
                    
                  </div>
                  
                </AccordionDetails>
                
              </Accordion>

                {/* Email */}
              <Accordion expanded={expanded2} onChange={() => setExpanded2(!expanded2)}>
                <AccordionSummary
                  expandIcon={expanded2 ? <AiOutlineClose fontSize={25}/> : <TbEdit fontSize={25}/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <div>
                      <Typography><span className="font-varela text-xl">Email</span></Typography>
                      <div className={expanded2 ? "hidden" : `flex items-center space-x-1`}>
                        <Typography>{email}</Typography>
                      </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails className="space-y-3">
                  <TextField
                      label="Email"
                      size="small"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      fullWidth
                  />
                  <Button variant="contained" color="inherit"><span className="font-varela font-bold">Verify</span></Button>
                </AccordionDetails>
              </Accordion>

              <div className="mt-4">
                <Button type="submit"  variant="contained" color="inherit" fullWidth><span className="font-varela font-bold">Submit</span></Button>
              </div>

              </form>
            </div>
          </Grid>

          {/* right side */}
          <Grid item className="flex-1 border p-5">
            <div>
              
              <div className="border-2 border-dotted py-10 px-20 hover:cursor-pointer hover:border-black hover:text-black text-gray-300" onClick={() => openDialog(true)}>
                <div> <HiOutlineSquaresPlus fontSize={50} className="mx-auto "/> </div>
                <div><h1 className="text-center  font-varela">Add New Address</h1></div>
              </div>
              
            </div>
            
            <div className="mt-5">
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <div className="p-3 border border-[#00ac6a] bg-[#e9f9ee] rounded-sm">
                      <div className="font-varela font-bold">Home Address</div>
                      <div className="font-varela font-bold">Lebron James</div>
                      <div className="font-varela">Complete Address: <span className="font-bold">#30 pluto st. brgy. nemek qc</span></div>
                      <div className="font-varela">Phone Number: <span className="font-bold">09324783921</span>--</div>
                      <div>
                        
                        <Button variant="outlined" color="error">Delete</Button>
                        
                      </div>
                    </div>
                  </Grid>
                  <Grid item md={6}>
                    <div className="p-3 border border-[#00ac6a] bg-[#e9f9ee] rounded-sm">
                      <div className="font-varela font-bold">Work Address</div>
                      <div className="font-varela font-bold">Michael Jordan</div>
                      <div className="font-varela">Complete Address: <span className="font-bold">#30 pluto st. brgy. nemek qc</span></div>
                      <div className="font-varela">Phone Number: <span className="font-bold">09324783921</span>--</div>
                      <div>
                        
                        <Button variant="outlined" color="error">Delete</Button>
                        
                      </div>
                    </div>
                  </Grid>
                </Grid>
            </div>
            

          </Grid>
        </Grid>
      </div>
      {/* Dialog Box */}
              <Dialog open={dialog} onClose={() => openDialog(false)}>
                <DialogTitle>Update Your Information</DialogTitle>
                <DialogContent className="my-2">
                  {/* content */}
                  <div className="mx-auto">
                    <form action="handleSubmit" className="mx-auto justify-center">
                    <Grid container>
                      {/* left side */}
                      <Grid item md={6} className="">
                        <div className="pr-1 space-y-2">
                          <TextField type="text" label="Address Name" required fullWidth/>
                          <TextField type="text" label="First Name" required fullWidth/>
                          <TextField type="text" label="Last Name" required fullWidth/>
                          <TextField type="number" label="Phone" required fullWidth/>
                        </div>
                        
                      </Grid>
                      {/* right side */}
                      <Grid item md={6} className="">
                        <div className="pl-1 space-y-2">
                          <TextField type="text" fullWidth  label="House# & Street Name" required />
                          <TextField type="text" select fullWidth label="Select Region" required/>
                          <TextField type="text" select fullWidth label="Select City" required/>
                          <TextField type="text" select fullWidth label="Select Barangay" required/>
                        </div>
                        
                      </Grid>
                    </Grid>
                    <div className="py-2 space-y-2">
                      {/* bottom side */}
                      <TextField type="text" label="Address Landmark (optional)" required fullWidth></TextField>
                      <TextField type="text" label="Company (optional)" required fullWidth></TextField>
                      {/* submit button */}
                      <Button variant="outlined" color="inherit" type="submit" fullWidth>Save Information</Button>
                    </div>
                      
                    </form>
                  </div>
                </DialogContent>
                <DialogActions></DialogActions>
              </Dialog>
      <Footer />
    </>
  );
}

// html: `Hello! Just one more step to continue cycling Click <a href="${verificationLink}"><button>here</button></a> to verify your email address.`