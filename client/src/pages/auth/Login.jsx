import axios from "axios";
import React, {useState} from "react";
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/Auth";
import { useNavigate, useLocation } from "react-router-dom";

export const Login = () => {
    
    //login state

    const [ email, setEmail ] = useState("");
    const [ password, setPassword] = useState("");

    //hook
    const [ auth, setAuth ] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    //handlesubmit login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           const { data } = await axios.post(`/login`,{
            email,
            password
           });
           console.log(data);
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
                localStorage.setItem('auth', JSON.stringify(data));
                setAuth({...auth, token: data.token, user: data.user });
                toast.success('Welcome to Cyclecore', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate(location.state || `/dashboard/${data?.user?.role === 1 ? 'admin' : 'user'}`);
           }
        } catch (err) {
            console.log(err);
            toast.error('Login Failed, Try Again.', {
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
    };
    


    // open state
    const [open,setOpen] = useState(false);

    // handle toggle
    const toggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                {/* login container */}
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
                   
                    {/* form */}
                    <div className="md:w-1/2 px-16">
                        
                        <div>
                            <a href="">
                                <img className="w-[200px] items-center p-0" src="https://o.remove.bg/downloads/a762562f-7151-4524-b69c-5797abb4b8c6/295513367_417116773770605_4039671274580630735_n-removebg-preview.png" alt="" />
                            </a>
                        </div>
                        
                        <h2 className="text-[#002D74] font-bold text-2xl">LOGIN</h2>
                        <p className="text-[#002D74] text-sm mt-4">If you are already a member, easily login</p>

                        <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 mt-8 rounded-xl border" type="text" name="email" placeholder="email@email.com" />

                            <div className="relative">
                                
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 rounded-xl border" type={(open === false ? "password" : "text")} 
                                name="password" placeholder="*******" />
                                
                                <div className="text-2xl absolute top-2.5 right-2">
                                {
                                    (open === false) ? <AiOutlineEye onClick={toggle} className="cursor-pointer"/> : <AiOutlineEyeInvisible onClick={toggle} className="cursor-pointer"/>
                                }

                                </div>
                            </div>
                               
                            

                            <button className="hover:bg-[#6dec9e] duration-300 rounded-xl bg-[#c8f5d9] text-[#242424] py-2">Login</button>

                            <a className="pt-0 border-b py-6 text-left text-gray-400 text-[10px] hover:text-[#242424]" href="http://">forgot password? click here</a>
                        </form>

                        <div className="mt-3 text-xs flex justify-between items-center">
                            <p>If you don't have an account..</p>
                            <NavLink to="/register" className="py-2 px-4 border rounded-xl bg-[#c8f5d9] border-emerald-900  hover:scale-110 duration-300">Register</NavLink>
                        </div>


                        {/* <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
                            <hr className="border-gray-400"/>
                            <p className="text-[11px] text-center">or</p>
                            <hr className="border-gray-400"/>
                        </div> */}

                        

                    </div>
                    {/* image */}
                    <div className="w-1/2 md:block hidden"> 
                        <img className="rounded-2xl"src="https://i.pinimg.com/736x/82/fa/98/82fa98adf7c26a2085fa3337aa5cb441.jpg" alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
};