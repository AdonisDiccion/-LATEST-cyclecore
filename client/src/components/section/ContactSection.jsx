import React, { useState } from "react";
import { IoIosContact } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { AiTwotonePhone } from "react-icons/ai";
import { MdStore } from "react-icons/md";
import { HiOutlineChevronDoubleRight } from "react-icons/hi";
import { FiSend } from "react-icons/fi";

import bg from "../../assets/bg.png"

// styles
const containerStyles = "mt-6 flex flex-row font-varela";
const iconStyles = "h-8 w-8 text-slate-200 mr-2 ";
const h2Styles = "text-slate-200 text-xs";
const pStyles = "text-white text-xs";

const ContactSection = () => {
  const [showContactInfo, setShowContactInfo] = useState(true);

  const handleSwitch = () => {
    setShowContactInfo(!showContactInfo);
  };

  return (
    <div>
      <div
        data-aos="slide-left"
        data-aos-duration="1000"
        data-aos-delay="300"
      >
        <img
          src={bg}
          alt=""
          className="w-full h-60 rotate-180"
        />
      </div>
      <div className=" my-6 justify-between px-20 py-20 max-w-screen-2xl mx-auto md:flex md:space-y-0 space-y-6 drop-shadow-xl">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="max-w-lg text-center md:text-left transition duration-500 ease-in-out"
        >
          <h1 className="pt-4 pb-1 md:text-6xl sm:text-5xl text-3xl text-gray-500 font-bold font-varela tracking-tighter leading-tight duration-700">
            Hello Please Feel Free To send Your Concerns To{" "}
            <span className="text-[#d4e253]">Us!</span>
          </h1>
          <p className="pt-4 md:text-lg sm:text-md text-sm font-lg font-sans text-[#606060] leading-relaxed">
            This will help us on improving our service to you!
          </p>
        </div>

        <div
          data-aos="fade-up-left"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="grid grid-cols-1 place-items-center max-w-2xl transition duration-500 ease-in-out"
        >
          <div className="bg-white rounded-md shadow-md flex ">
            {/* store info info */}
            <div
              id="contact_info"
              className={`h-[350px] w-[350px] bg-blue-800 p-8 md:hover:scale-y-125 md:hover:scale-x-125 rounded-md md:rounded-r-none hover:rounded-md transition duration-500 ease-in-out ${
                !showContactInfo
                  ? "hidden transition duration-500 md:block"
                  : ""
              }  `}
            >
              <div className="flex justify-between">
                {/* Page Title */}
                <h2 className="text-white font-varela text-xl">Contact Information</h2>
                <h2
                  onClick={handleSwitch}
                  id="switch_to_contact_us"
                  className="text-red-800 font-varela text-xs flex flex-row md:hidden cursor-pointer"
                >
                  Contact Us <HiOutlineChevronDoubleRight />
                </h2>
              </div>

              <div className={containerStyles}>
                {/* NAME */}
                <div>
                  {/* contact icon */}
                  <IoIosContact className={iconStyles} />
                </div>
                <div className="">
                  <h2 className={h2Styles}>Name:</h2>
                  <p className={pStyles}>Cyclecore</p>
                </div>
              </div>

              <div className={containerStyles}>
                {/* EMAIL */}
                <div>
                  {/* email icon */}
                  <MdEmail className={iconStyles} />
                </div>
                <div>
                  <h2 className={h2Styles}>Email:</h2>
                  <p className={pStyles}>cyclecorebikeshop@gmail.com</p>
                </div>
              </div>

              <div className={containerStyles}>
                {/* PHONE */}
                <div>
                  {/* phone icon */}
                  <AiTwotonePhone className={iconStyles} />
                </div>
                <div>
                  <h2 className={h2Styles}>Phone:</h2>
                  <p className={pStyles}>+639-964-9382</p>
                </div>
              </div>

              <div className={containerStyles}>
                {/* ADDRESS */}
                <div>
                  {/* address icon */}
                  <MdStore className={iconStyles} />
                </div>
                <div>
                  <h2 className={h2Styles}>Address:</h2>
                  <p className={pStyles}>
                    390 Col. Bonny Serrano Ave Libis 1110 Quezon City,
                    Philippines
                  </p>
                </div>
              </div>
            </div>
            {/* contact us from */}
            <div
              id="contact_us"
              className={`h-[350px] w-[350px] bg-white px-6 py-8 md:rounded-r-md duration-700 rounded-md transition opacity-100 delay-500 ${
                showContactInfo ? "hidden md:block" : ""
              }`}
            >
              <div className="flex justify-between ">
                {/* Page Title */}
                <h2 className="text-blue-500 text-xl font-varela font-semibold leading-relaxed">
                  Get In Touch
                </h2>
                <h2
                  onClick={handleSwitch}
                  id="switch_to_contact_info"
                  className="text-red-800 text-xs flex flex-row items-center font-semibold md:hidden cursor-pointer"
                >
                  Contact Info
                  <HiOutlineChevronDoubleRight />
                </h2>
              </div>

              <form action="" className="font-varela">
                <input
                  type="text"
                  name="name"
                  id=""
                  placeholder="Enter Your Name"
                  className="w-full text-xs px-3 h-8 my-2 outline-none rounded-md border focus:shadow-sm focus-within:scale-110"
                />

                <input
                  type="text"
                  name="email"
                  id=""
                  placeholder="Enter Your Email"
                  className="w-full text-xs px-3 h-8 my-2 outline-none rounded-md border focus:shadow-sm focus-within:scale-110"
                />

                <input
                  type="text"
                  name="subject"
                  id=""
                  placeholder="Subject"
                  className="w-full text-xs px-3 h-8 my-2 outline-none rounded-md border focus:shadow-sm focus-within:scale-110"
                />

                <textarea
                  type="text"
                  name="subject"
                  id=""
                  placeholder="Enter Your Concerns"
                  className="w-full text-xs px-3 h-20 my-2 outline-none rounded-md border focus:shadow-sm resize-none focus-within:scale-110"
                />

                <button
                  type="submit"
                  className="flex items-center bg-cyan-400 hover:bg-cyan-500 hover:scale-105 font-pop font-semibold duration-500 px-4 py-2 rounded-md text-white text-xs cursor-pointer hover:shadow-md max-w-md uppercase "
                >
                  <FiSend /> send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
