// import React, {useState} from 'react'
// import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai'
// import { TextField } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../../context/Auth';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//     //open
//     const [open,setOpen] = useState(false);
//     const [opening,setOpening] = useState (false);
    
//     //hooks
//     const [ auth, setAuth ] = useAuth();
//     const navigate = useNavigate();

//     //register user state
//     const [firstname, setfirstName] = useState("");
//     const [lastname, setlastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [address, setAddress] = useState("");
//     const [contactnum, setContactnum] = useState("");
//     const [birthdate, setBirthdate] = useState("2017-05-24");
//     const [password, setPassword] = useState("");
//     const [confirmpassowrd, setConfirmpassword] = useState("");
//     const [error, setError] = useState("");

    
//     // connecting port
//     // console.log(import.meta.env.VITE_APP_REACT_APP_API)

//     //handle submit form register
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post(`/register`,{
//                 firstname, 
//                 lastname, 
//                 email,
//                 birthdate,
//                 contactnum,
//                 password,
//             });
//             console.log(data);
//             if (data?.error) {
//                 toast.error(data.error, {
//                     position: "top-center",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     });
//             } else {
//                 localStorage.setItem('auth', JSON.stringify(data));
//                 setAuth({...auth, token: data.token, user: data.user });
//                 console.log(data)
//                 toast.success('Registration Successful', {
//                     position: "top-center",
//                     autoClose: 2000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: false,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "light",
//                     });
//                 navigate("/dashboard");
//             }  
//         } catch (err) {
//             console.log(err);
//             toast.error('Registration Failed. Try Again.', {
//                 position: "top-center",
//                 autoClose: 2000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: false,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
//                 })
//         }
//     };


//     // handle toggle
//     const toggle = () => {
//         setOpen(!open);
//     };

//     const toggle2 = () => {
//         setOpening(!opening);
//     };

//     return (
//         <div>
            
//             <section className="bg-gray-50 min-h-screen flex items-center justify-center">
//                 {/* login container */}
//                 <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-7xl p-5 ">
                   
//                     {/* form */}
//                     <div className="md:w-1/2 p-5">
                        
//                         <div>
//                             <NavLink to="/">
//                                 <img className="w-[200px] items-center p-0" src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/321421696_988840015430714_1756898395352918694_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFqiQB2gn6RBunaj9ahDT12t2Rk1xQTRUe3ZGTXFBNFRzYuqjmxGbLqx-JD-cnn0QuX6xcVH3ZYzHye8iOZEqt6&_nc_ohc=df1vqQ2w6s0AX_9DzAd&_nc_ht=scontent.fmnl17-5.fna&oh=03_AdQUcHvA0bAkfp6Uf4vht22FGaaZ8OPTNqi-9JWdjnE9aQ&oe=640C5F61" alt="" />
//                             </NavLink>
//                         </div>
                        
//                         <h2 className="text-[#002D74] font-bold text-2xl">Register</h2>
//                         <p className="text-[#002D74] text-sm my-4">If you are already a member, easily login <NavLink to="/login" className='underline font-se'>Here</NavLink></p>

//                         <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
                            
//                             <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 ">
//                                 {/* <input className="p-2 mt-8 rounded-xl border" type="text" name="firstname" placeholder="Firstname" /> */}
//                                 <TextField value={firstname} onChange={(e) => setfirstName(e.target.value)} type="text" placeholder='Firstname' label="Firstname" size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth />
                                

                            
//                                 <TextField value={lastname} onChange={(e) => setlastName(e.target.value)} type="text" placeholder='Lastname' label="Lastname" size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth/>
//                                 {/* <input className="p-2 mt-8 rounded-xl border" type="text" name="firstname" placeholder="Lastname" /> */}
//                             </div>
                            
//                             <div className='mb-5'>                           
//                                 {/* <input type="email" name="" id="" placeholder='Email' className='p-2 rounded-xl border w-full'/> */}

//                                 <TextField value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='Email' label="Email" size='small' fullWidth sx={{backgroundColor:'white', mb: 3}}/>
//                             </div>

//                             <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 '>                               
                                
//                                 <TextField value={birthdate} onChange={(e) => setBirthdate(e.target.value)} type="date" label="Birthdate"
//                                 sx={{backgroundColor:'white', mb: 3}}
//                                 InputLabelProps={{
//                                 shrink: true,
//                                 }}
//                                 size='small'/>
                                
//                                 <TextField value={contactnum} onChange={(e) => setContactnum(e.target.value)} type='number' label='Contact' size='small' sx={{backgroundColor:'white', mb: 3}} />
//                             </div>
                            
//                             {/* 
//                             <div>
//                                     <input type="number" placeholder='Age' className='p-2 rounded-xl border w-[80px]'/>
//                             </div> */}

//                             <div className='mb-5'>
//                                 <h3 className='mb-4 text-[#002D74] text-sm mt-4"'>Address</h3>
                                
//                                 <div className='grid gap-4 mb-7 sm:grid-cols-1 md:grid-cols-2'>
//                                     {/* <input type="text" name="street" id="" placeholder="Street" className='p-2 rounded-xl border w-full mb-2' /> */}
                                    
//                                     <TextField  type='text' label='Street' size='small' sx={{backgroundColor:'white', mb: 3}}/>
                                    
//                                     <TextField  type='text' label='Barangay' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     {/* <input type="text" name="street" id="" placeholder="Barangay" className='p-2 rounded-xl border w-full mb-2' /> */}
//                                 </div>

//                                 <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-3 '>
//                                     {/* <input type="text" name="street" id="" placeholder="City" className='p-2 rounded-xl border ' /> */}

//                                     <TextField type='text' label='City' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     <TextField type='text' label='Region' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     <TextField type='number' label='Postal Code' size='small' sx={{backgroundColor:'white', mb: 3}}/>

//                                     {/* <input type="text" name="street" id="" placeholder="Region" className='p-2 rounded-xl border ' />

//                                     <input type="Number" name="street" id="" placeholder="Postal Code" className='p-2 rounded-xl border ' /> */}
//                                 </div>
                                
//                             </div>

//                             <div className="relative">
                                
//                                 {/* <input className="w-full p-2 rounded-xl border" type={(open === false ? "password" : "text")} 
//                                 name="password" placeholder="*******" /> */}

//                                 <TextField value={password} onChange={(e) => setPassword(e.target.value)} type={(open === false ? "password" : "text")} label='Password' size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth/>
                                
//                                 <div className="text-2xl absolute top-2.5 right-2">
//                                 {
//                                     (open === false) ? <AiOutlineEye onClick={toggle} className="cursor-pointer"/> : <AiOutlineEyeInvisible onClick={toggle} className="cursor-pointer"/>
//                                 }


//                                 </div>
//                             </div>
                               
//                             <div className="relative">
                                
//                                 {/* <input className="w-full p-2 rounded-xl border" type={(opening === false ? "password" : "text")} 
//                                 name="password" placeholder="Confirm Password" /> */}

//                                 <TextField type={(open === false ? "password" : "text")} label='Confirm Password' size='small' sx={{backgroundColor:'white', mb: 3}} fullWidth/>
                                
//                                 <div className="text-2xl absolute top-2.5 right-2">
//                                 {
//                                     (opening === false) ? <AiOutlineEye onClick={toggle2} className="cursor-pointer"/> : <AiOutlineEyeInvisible onClick={toggle2} className="cursor-pointer"/>
//                                 }

//                                 </div>
//                             </div>

//                             <div className=''>
//                                 <input type="checkbox" name="" id="" className='border-gray-400 mr-2'/>

//                                 <span>
//                                     I accept the <a href="" className='font-semibold underline'>Terms of Use</a> & <a href="" className='font-semibold underline'>Privacy Policy</a>
//                                 </span>
//                             </div>

//                             <button type="submit" className="hover:bg-[#6dec9e] duration-300 rounded-xl bg-[#c8f5d9] text-[#242424] py-2">Register</button>

                            
//                         </form>

                        
//                     </div>
//                     {/* image */}
//                     <div className="rounded-xl w-1/2 md:block hidden bg-[url('https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.15752-9/330314779_1631701457280641_130997889362160226_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeEkQpjH2BgyqCmYGlAfIq6fTgWED4WGWbpOBYQPhYZZugL5cGpzkwFMiPXDtBU_PViYO1O3uPJ-CdyQ-AlhTvZc&_nc_ohc=OtAfy81VKXUAX8HpjDZ&tn=MhX7EIYTgp3cA82U&_nc_ht=scontent.fmnl17-1.fna&oh=03_AdRBzmPddv3eOHyqlpBpbWShQ9MI9dweeZ_OdbyK-0wZ0Q&oe=640D7382')] bg-no-repeat bg-cover text-white p-12"> 
//                     <h1 className='text-6xl mb-5 mt-[200px] text-center tracking-[1.5rem] font-bold font-lobster text-zinc-50'>Welcome</h1>
//                     <div>
//                         <p className='font-semibold text-center'>A bicycle is a useful vehicle that helps us reach a destination without polluting the environment. It is composed of steel and has two wheels. In addition, it has got a seat and handle with two pedals and also a bell. Some bicycles have a carrier while some don’t. It is a popular choice amongst poor people and students. Essay on bicycle will help us understand its importance.</p>
//                     </div>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     )
// };


// export default Register;

import React, {useState} from 'react';
import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';
import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { isBefore, subYears,isAfter } from 'date-fns';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



// validations
const fnameValidations = Yup.string()
.required('Firstname is required!')

const lnameValidations = Yup.string()
.required('Lastname is required!')

const emailValidation = Yup.string()
  .email('Invalid email address')
  .required('Email is required');

const phoneNumberValidation = Yup.string()
.required('This field is required!')
// .matches(/^(63|0)\d{11,12}$/,'Invalid phone number format')
// .matches(/^63\d{10,11}$/,'Invalid phone number format')
// .matches(/^0\d{10}$/,'Invalid phone number format')
// .min(10,11,'Invalid phone number format must be 10 to 11 digits long')
.matches(/^(63|9)\d{9,10}$/,'Invalid phone number format.')

// address section

const streetValidations = Yup.string()
.required('This field is required!')

const brgyValidations = Yup.string()
.required('This field is required!')

const cityValidations = Yup.string()
.required('This field is required!')

const regionValidations = Yup.string()
.required('This field is required!')

const postalValidations = Yup.string()
.required('This field is required!')
.matches(/^\d{4}$/,'Invalid format - must be 4 digits');

const passwordValidation = Yup.string()
.required('Password is required')
.min(8, 'Password must be at least 8 characters long')
.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
.matches(/\d/, 'Password must contain at least one number')
.matches(/[@$!%*#?&.^-_=+]/, 'Password must contain at least one special character');

const confirmPassValidation = Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('This field is required!')

const chkbxValidation = Yup.bool().required('Please agree to the terms and conditions')

const today = new Date();
const earliestDate = subYears(today, 150);
const latestDate = subYears(today, 18);

const dateOfBirthValidationSchema = Yup.date()
.required('Please select date of birth!')
.max(today, 'Invalid birth of date! must not be a date in the future!')
.test('user-is-18-years-old-today', 'You must be 18 years of age', (value) => {
    return isAfter(subYears(today, 18), value);
})
.test('date-is-too-early', `Invalid birth of date! date is too early!`, (value) => {
   return isBefore(earliestDate, value);
});

const validationSchema = Yup.object({
    firstname: fnameValidations,
    lastname: lnameValidations,
    email: emailValidation,
    contactnum: phoneNumberValidation,
    street: streetValidations,
    barangay: brgyValidations,
    city: cityValidations,
    region: regionValidations,
    postal: postalValidations,
    password: passwordValidation,
    cnfrmpass: confirmPassValidation,
    checkbox: chkbxValidation,
    birthdate: dateOfBirthValidationSchema,
})

//form submit



// console.log('Form Errors', formik.errors)

const Register = () => {

    //hooks
    const [ auth, setAuth ] = useAuth();
    const navigate = useNavigate();

    const [open,setOpen] = useState(false);
    const [opening,setOpening] = useState (false);




    //handle on submit
    const onSubmit = async (values) => {
        try {
            const { data } = await axios.post(`/register`, values);   
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
                console.log(data)
                toast.success('Registration Successful', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
                navigate("/dashboard/user");
            }    
        } catch (err) {
            console.log(err);
        }
    };


    //form submit
    const {values, handleBlur, handleChange, handleSubmit, errors, touched} = useFormik ({
        initialValues : {
            firstname: '',
            lastname: '',
            email: '',
            birthdate: '',
            contactnum: '',
            street: '',
            barangay: '',
            region: '',
            postal: '',
            city: '',
            password: '',
            cnfrmpass: '',
        },
        validationSchema,
        onSubmit,
    });

    // handle toggle
    const toggle = () => {
        setOpen(!open);
    };

    const toggle2 = () => {
        setOpening(!opening);
    };

    return (
        <div>
            <section className="bg-gray-50 min-h-screen flex items-center justify-center">
                {/* login container */}
                <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-6xl p-5">
                   
                    {/* form */}
                    <div className="md:w-1/2 p-5">
                        
                        <div>
                            <NavLink to="/">
                                <img className="w-[200px] items-center p-0" src="https://scontent.fmnl17-5.fna.fbcdn.net/v/t1.15752-9/321421696_988840015430714_1756898395352918694_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFqiQB2gn6RBunaj9ahDT12t2Rk1xQTRUe3ZGTXFBNFRzYuqjmxGbLqx-JD-cnn0QuX6xcVH3ZYzHye8iOZEqt6&_nc_ohc=df1vqQ2w6s0AX_9DzAd&_nc_ht=scontent.fmnl17-5.fna&oh=03_AdQUcHvA0bAkfp6Uf4vht22FGaaZ8OPTNqi-9JWdjnE9aQ&oe=640C5F61" alt="" />
                            </NavLink>
                        </div>
                        
                        <h2 className="text-[#002D74] font-bold text-2xl">Register</h2>
                        <p className="text-[#002D74] text-sm my-4">If you are already a member, easily login <a href="#" className='underline font-se'>Here</a></p>

                        <form onSubmit={handleSubmit} className="gap-2 flex flex-col">
                            
                            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                    <TextField type="text" name='firstname' placeholder='Firstname' label="Firstname" size='small' fullWidth onChange={handleChange} value={values.firstname} onBlur={handleBlur}/>

                                    {touched.firstname && errors.firstname ? <div className='text-red-600 font-semibold text-sm
                                    capitalize'>{errors.firstname}</div> : null } 
                                </div>

                                <div>
                                    <TextField type="text" name='lastname' placeholder='Lastname' label="Lastname" size='small'  fullWidth onChange={handleChange} value={values.lastname} onBlur={handleBlur}/>
                                    
                                    {touched.lastname && errors.lastname ? <div className='text-red-600 font-semibold text-sm
                                    capitalize'>{errors.lastname}</div> : null }
                                </div>
                                                                                                                   
                            </div>
                            
                            <div className=''>                                                  
                                
                                <TextField type="text" name='email' placeholder='Email' label="Email" size='small' fullWidth onChange={handleChange} value={values.email} onBlur={handleBlur}/>

                                {touched.email && errors.email ? <div className='text-red-600 font-semibold text-sm'>{errors.email}</div> : null}
                            
                            </div>

                            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-2'>                               
                               
                                <div className='grid sm:grid-cols-1'>
                                    <TextField type="date" 
                                    label="Birthdate"                                                                       
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    size='small'
                                    name='birthdate'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    />
                                    

                                    {
                                        errors.birthdate && errors.birthdate ? <div className='text-red-600 font-semibold text-sm transition-all ease-in duration-700'>{errors.birthdate}</div> : null
                                    }
                                </div>

                                <div className='grid sm:grid-cols-1'>
                                    <TextField type='number' name='contactnum' label='Contact' size='small' onChange={handleChange} value={values.contactnum} onBlur={handleBlur}/>

                                    {touched.contactnum && errors.contactnum ? <div className='text-red-600 font-semibold text-sm'>{errors.contactnum}</div> : null}
                                </div>

                            </div>
                            

                            <div>
                                <h3 className='mb-2 text-[#002D74] text-sm mt-4"'>Address</h3>
                                
                                <div className='grid gap-2 mb-2 sm:grid-cols-1 md:grid-cols-2'>                                    
                                    
                                    <div className='grid sm:grid-cols-1'>
                                        <TextField type='text' name='street' label='Street' size='small' onChange={handleChange} value={values.street} onBlur={handleBlur}/>

                                        {touched.street && errors.street ? <div className='text-red-600 font-semibold text-sm'>{errors.street}</div> : null}
                                    </div>

                                    <div className='grid sm:grid-cols-1'>
                                        <TextField type='text' name='barangay' label='Barangay' size='small' onChange={handleChange} value={values.barangay} onBlur={handleBlur}/>

                                        {touched.barangay && errors.barangay ? <div className='text-red-600 font-semibold text-sm'>{errors.barangay}</div> : null}
                                    </div>
                                             
                                </div>

                                <div className='grid gap-2 sm:grid-cols-1 md:grid-cols-3'>

                                    <div className='grid sm:grid-cols-1'>
                                        <TextField type='text' name='city' label='City' size='small' onChange={handleChange} value={values.city} onBlur={handleBlur}/>

                                        {touched.city && errors.city ? <div className='text-red-600 font-semibold text-sm'>{errors.city}</div> : null}
                                    </div>
                                    <div className='grid sm:grid-cols-1'>
                                        <TextField type='text' name='region' label='Region' size='small' onChange={handleChange} value={values.region} onBlur={handleBlur}/>

                                        {touched.region && errors.region ? <div className='text-red-600 font-semibold text-sm'>{errors.region}</div> : null}
                                    </div>
                                    <div className='grid sm:grid-cols-1'>
                                        <TextField type='numregionber' name='postal' label='Postal Code' size='small' onChange={handleChange} value={values.postal} onBlur={handleBlur}/>

                                        {touched.postal && errors.postal ? <div className='text-red-600 font-semibold text-sm'>{errors.postal}</div> : null}
                                    </div>   

                                </div>
                                
                            </div>

                            <div className="relative">

                                <TextField type={(open === false ? "password" : "text")} name='password' label='Password' size='small' fullWidth onChange={handleChange} value={values.password} onBlur={handleBlur}/>

                                {touched.password && errors.password ? <div className='text-red-600 font-semibold text-sm'>{errors.password}</div> : null}
                                
                                <div className="text-2xl absolute top-2.5 right-2">
                                {
                                    (open === false) ? <AiOutlineEye onClick={toggle} className="cursor-pointer"/> : <AiOutlineEyeInvisible onClick={toggle} className="cursor-pointer"/>
                                }

                                </div>
                            </div>
                               
                            <div className="relative">

                                <TextField type={(opening === false ? "password" : "text")} name='cnfrmpass' label='Confirm Password' size='small' fullWidth onChange={handleChange} value={values.cnfrmpass} onBlur={handleBlur}/>

                                {touched.cnfrmpass && errors.cnfrmpass ? <div className='text-red-600 font-semibold text-sm'>{errors.cnfrmpass}</div> : null}
                                
                                <div className="text-2xl absolute top-2.5 right-2">
                                {
                                    (opening === false) ? <AiOutlineEye onClick={toggle2} className="cursor-pointer"/> : <AiOutlineEyeInvisible onClick={toggle2} className="cursor-pointer"/>
                                }

                                </div>
                            </div>

                            <div className=''>
                                <input type="checkbox" name="checkbox" id="" className='border-gray-400 mr-2' onChange={handleChange} value={values.terms} onBlur={handleBlur}/>                     

                                <span>
                                    I accept the <a href="" className='font-semibold underline'>Terms of Use</a> & <a href="" className='font-semibold underline'>Privacy Policy</a>
                                </span>

                                {errors.checkbox ? <div className='text-red-600 font-semibold text-sm'>{errors.checkbox}</div> : null}
                            </div>

                            <button type='submit' className="hover:scale-105 duration-300 rounded-xl bg-[#002D74] text-white py-2">Register</button>

                            
                        </form>


                        
                    </div>
                    {/* image */}
                    <div className="rounded-xl w-9/12 md:block hidden bg-[url('https://scontent.fmnl17-1.fna.fbcdn.net/v/t1.15752-9/330314779_1631701457280641_130997889362160226_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeEkQpjH2BgyqCmYGlAfIq6fTgWED4WGWbpOBYQPhYZZugL5cGpzkwFMiPXDtBU_PViYO1O3uPJ-CdyQ-AlhTvZc&_nc_ohc=OtAfy81VKXUAX8HpjDZ&tn=MhX7EIYTgp3cA82U&_nc_ht=scontent.fmnl17-1.fna&oh=03_AdRBzmPddv3eOHyqlpBpbWShQ9MI9dweeZ_OdbyK-0wZ0Q&oe=640D7382')] bg-no-repeat bg-cover text-white p-12"> 
                    <h1 className='text-6xl mb-5 mt-[200px] text-center tracking-[1.5rem] font-bold font-lobster text-zinc-50'>Welcome</h1>
                    <div>
                        <p className='font-semibold text-center'>A bicycle is a useful vehicle that helps us reach a destination without polluting the environment. It is composed of steel and has two wheels. In addition, it has got a seat and handle with two pedals and also a bell. Some bicycles have a carrier while some don’t. It is a popular choice amongst poor people and students. Essay on bicycle will help us understand its importance.</p>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
};


export default Register;


