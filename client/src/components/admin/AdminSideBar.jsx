import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";

// icons
import { BsFillCaretLeftFill } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { BsController } from "react-icons/bs";
import { FiShoppingBag } from "react-icons/fi";
// import { TbBrandLoom } from 'react-icons/tb';
import { BiCategory } from "react-icons/bi";
import { GiBasketballBall } from "react-icons/gi";
import { FaMailchimp } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

import logo from "../../assets/logo.png";
import { NavLink } from "react-router-dom";

const AdminDashboardSideBar = () => {
  // const menus = [
  //   { title: 'Dashboard', icon: MdOutlineCategory },
  //   { title: 'Products', icon: BsController },
  //   { title: 'Orders', icon: FiShoppingBag },
  // ];

  // const products = [
  //   { title: 'Category', icon: BiCategory },
  //   { title: 'Sub-Category', icon: GiBasketballBall },
  //   { title: 'Products', icon: FaMailchimp },
  // ]

  const [open, setOpen] = useState(false);

  const [openProduct, setOpenProduct] = useState(false);

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      className="flex flex-col h-screen"
    >
      <div
        className={`${
          open ? "w-72" : "w-20"
        } flex flex-col h-[70rem] p-5 pt-8 bg-[#1F2A40] relative transition-all duration-700 ease-in-out`}
      >
        <div className="flex-1">
          <BsFillCaretLeftFill
            onClick={() => setOpen(!open)}
            className={`absolute cursor-pointer -right-3 top-9 border-2 border-black bg-white  rounded-full hover:scale-110 ${
              !open
                ? "rotate-180 transition-all duration-500 ease-out"
                : "transition-all duration-700 ease-out"
            }`}
            size={25}
          />
          <div className="flex items-center">
            <NavLink to="/">
              <img
                src={logo}
                alt=""
                className={`cursor-pointer duration-1000 animate-bounce w-[100px]`}
              />
            </NavLink>
            <h1
              className={`font-pop text-white origin-left font-medium text-xl duration-300 tracking-widest ${
                !open && "scale-0"
              }`}
            >
              <TypeAnimation
                sequence={["ADMIN", 1000, "CYCLECORE", 1000]}
                repeat={Infinity}
              />
            </h1>
          </div>

          <div className="pt-6 text-slate-100 ">
            <div
              className={`hover:scale-110 group text-slate-100 font-semibold flex items-center hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out mb-4 p-[7.5px] active:bg-light-white`}
            >
              <div>
                <MdOutlineCategory size={25} />
              </div>
              <span
                style={{ transitionDelay: "300ms" }}
                className={`${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                } tracking-wider whitespace-pre origin-left duration-300 m-2.5`}
              >
                DASHBOARD
                <div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
              </span>
            </div>

            <div
              onClick={() => setOpenProduct(!openProduct)}
              className={`hover:scale-110 group text-slate-100 font-semibold flex items-center hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-[7.5px]`}
            >
              <div>
                <BsController size={25} />
              </div>
              <span
                style={{ transitionDelay: "400ms" }}
                className={`${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                } tracking-wider whitespace-pre origin-left duration-300 m-2.5`}
              >
                PRODUCTS
                <div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
              </span>
            </div>

            <div
              className={`${
                open
                  ? `${
                      !openProduct
                        ? " transition-all duration-500 ease-in-out delay-200 rounded-md pl-7"
                        : "hidden"
                    }`
                  : "hidden"
              }`}
            >
              <ul className="">
                <NavLink
                  to="/dashboard/admin/category"
                  className={`group hover:scale-110 flex items-center font-semibold gap-x-2 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-2`}
                >
                  <BiCategory fontSize={20} />
                  <span>
                    CATEGORY
                    <div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
                  </span>
                </NavLink>
                <NavLink
                  to="dashboard/admin/subcategory"
                  className={`group hover:scale-110 flex items-center font-semibold gap-x-2 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-2`}
                >
                  <GiBasketballBall fontSize={20} />
                  <span>
                    SUB-CATEGORY
                    <div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
                  </span>
                </NavLink>
                <NavLink
                  to="dashboard/admin/brand"
                  className={`group hover:scale-110 flex items-center font-semibold gap-x-2 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-2`}
                >
                  <GiBasketballBall fontSize={20} />
                  <span>
                    BRANDS
                    <div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
                  </span>
                </NavLink>
                <NavLink
                  to="dashboard/admin/products"
                  className={`group hover:scale-110 flex items-center font-semibold gap-x-2 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-2`}
                >
                  <FaMailchimp fontSize={20} />
                  <span>
                    PRODUCT LISTS
                    <div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
                  </span>
                </NavLink>
                {/* <NavLink to="/category" className={`hover:scale-110 flex items-center font-semibold gap-x-2 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-2`}><BiCategory fontSize={20}/><span>CATEGORY<div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div></span></NavLink>
                <NavLink to="/subcategory" className={`hover:scale-110 flex items-center font-semibold gap-x-2 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-2`}><GiBasketballBall fontSize={20}/><span>SUB-CATEGORY<div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div></span></NavLink>
                <NavLink to="/products"className={`hover:scale-110 flex items-center font-semibold gap-x-2 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-2`}><FaMailchimp fontSize={20}/><span>PRODUCTS<div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div></span></NavLink> */}
              </ul>
            </div>

            <div className="hover:scale-110 group text-slate-100 font-semibold flex items-center hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out mt-4 p-[7.5px]">
              <div>
                <FiShoppingBag size={25} />
              </div>
              <span
                style={{ transitionDelay: "500ms" }}
                className={`${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                } tracking-wider whitespace-pre origin-left duration-300 m-2.5`}
              >
                ORDERS
                <div className="h-0.5 bg-white scale-x-0 group-hover:scale-100 transition-transform origin-center rounded-full duration-500 ease-out"></div>
              </span>
            </div>
          </div>
          <ul className="">
            {/* {menus.map((menu,index) => (
            <li key={index} className="hover:scale-110 group text-slate-100 font-semibold flex items-center p-2.5 hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out">

            <div className='hover:rotate-[360deg] transition-all duration-700 ease-in-out'><menu.icon className={`hover:rotate-[360deg] transition-all duration-700 ease-in-out ${!open && 'rotate-[360deg]'}`} size={20}/>
            </div>

            <span className={`${!open && 'opacity-0 translate-x-28 overflow-hidden'} tracking-wider whitespace-pre origin-left duration-300 m-2.5`}>
              {menu.title}
            </span>

            <h2 className={`${open && 'hidden'} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900  rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:duration-700 group-hover:left-10 group-hover:w-fit`}>
              {menu.title}
            </h2>
          </li>
          ))} */}
          </ul>
        </div>

        <div className="text-slate-100 flex border-t">
          <div className="hover:scale-110 group text-slate-100 font-semibold flex items-center hover:bg-light-white rounded-md uppercase cursor-pointer transition-all duration-300 ease-in-out p-[7.5px] w-full">
            <div>
              <FaPowerOff size={25} />
            </div>
            <span
              style={{ transitionDelay: "600ms" }}
              className={`${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              } tracking-wider whitespace-pre origin-left duration-300 m-2.5`}
            >
              LOGOUT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSideBar;
