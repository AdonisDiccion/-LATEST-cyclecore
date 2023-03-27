import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import RB from "../../assets/ROADBIKE.png";
import HeroLogo from "../../assets/HeroLogo.jpg";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="text-white">
      <div className="md:flex justify-between px-20 py-20 max-w-screen-2xl mx-auto">
        <div
          data-aos="fade-right"
          data-aos-duration="1000"
          data-aos-delay="100"
          className="max-w-2xl"
        >
          <span className="flex items-center px-1 text-xl text-[#cddd35] font-varela font-bold">
            <span className="md:text-lg sm:text-md text-sm duration-700">
              100% Quality Made Products
            </span>
            <img
              className="md:w-16 w-14 duration-700 mx-4 rounded-full"
              src={HeroLogo}
              alt="/"
            />
          </span>

          <h1 className="pt-4 pb-1 md:text-6xl sm:text-5xl text-3xl font-bold tracking-tighter leading-tight duration-700 font-varela text-gray-500">
            Healthy Lifestyle With Biking Will
          </h1>

          <TypeAnimation
            className="md:text-6xl sm:text-5xl text-3xl font-bold tracking-tight leading-tight text-[#cddd35] duration-700 font-varela"
            sequence={[
              "Build Muscles",
              1000,
              "Burn Calories",
              1000,
              "Help You Sleep",
              1000,
              "Relieve Stress",
              1000,
              "Be Fun!",
              1000,
            ]}
            repeat={Infinity}
          />
          <p
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            data-aos-anchor-placement="bottom-bottom"
            className=" pt-4 md:text-lg sm:text-md text-sm font-lg font-pop text-gray-500 leading-relaxed"
          >
            Cycling is easy to fit into your daily routine by riding to the
            shops, park, school or work.
          </p>
        </div>

        <div className="max-w-2xl ease-in-out duration-700">
          <img
            src={RB}
            alt="/"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="100"
          />

          <div
            className="flex items-center justify-center "
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <h1 className="md:text-5xl sm:text-4xl text-3xl font-varela text-center text-gray-500 font-bold">
              START{" "}
              <span className="text-[#b0bf2d] animate-pulse">CUSTOMIZING</span>{" "}
              YOUR BIKES WITH US!
            </h1>
          </div>
          <div
            className="flex items-center justify-center mt-4"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="300"
          >
            <p className="font-pop text-gray-500">
              To get started click the button below
            </p>
          </div>

          <div
            className="flex items-center justify-center"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <button
              type="button"
              className="bg-cyan-400 hover:bg-cyan-500 hover:scale-105 text-white font-pop font-semibold duration-500 rounded my-5 py-2 w-full cursor-pointer active:scale-90"
            >
              <NavLink to="/customize">CUSTOMIZE NOW </NavLink>
              <i className="fa-solid fa-wrench"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
