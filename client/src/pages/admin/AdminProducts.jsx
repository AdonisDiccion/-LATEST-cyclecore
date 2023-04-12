import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import moment from "moment";

//components
import { Card, Space } from "antd";

//icons
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdFindInPage } from "react-icons/md";
import { MdAdd } from "react-icons/md";

export default function AdminProducts() {
  const { Meta } = Card;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {}
  };

  return (
    <div>
      <div className="flex font-pop ml-5 mt-5 items-center">
        <div>
          <NavLink to="/dashboard/admin">
            <MdSubdirectoryArrowLeft className="h-5 w-5" />
          </NavLink>
        </div>
        <div className="ml-2">Exit to Menu</div>
      </div>
      <div className=" bg-[#1F2A40] px-4 pt-3 pb-4 border border-gray-200 items-center mt-5 mr-5 ml-5 rounded-t-lg font-pop shadow-lg">
        <div className="w-24">
          <NavLink to="/dashboard/admin">
            <button className=" mb-3 items-center flex uppercase shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-xs py-2 px-4 rounded">
              <IoArrowBackCircleOutline className="h-5 w-5" />
              Back
            </button>
          </NavLink>
        </div>
      </div>
      <div className=" bg-zinc-200 justify-between border-2 rounded-l- border-gray-400 mr-5 ml-5  px-4 pt-3 pb-4">
        <div className="flex items-center mt-5 justify-between">
          <h1 className="flex text-3xl pl-2 text-black font-pop">
            Product List
            <MdFindInPage className="pl-2" />
          </h1>
          <div>
            <NavLink
              className="flex shadow bg-gray-700 hover:bg-blue-900 focus:shadow-outline focus:outline-none text-white text-lg py-2 px-4 rounded"
              to="/dashboard/admin/products/create"
            >
              <MdAdd className="" /> Create Product
            </NavLink>
          </div>
        </div>
        <div className="mt-3 items-center ">
          {products?.map((p) => (
            <div key={p._id} to={`/dashboard/admin/product/update/${p.slug}`}>
              <div className="flex justify-start pl-3 pt-11 ">
                <Card
                  hoverable
                  style={{
                    width: 250,
                  }}
                  cover={
                    <img
                      alt={p.name}
                      src={`${
                        import.meta.env.VITE_APP_REACT_APP_API
                      }/product/photo/${p._id}`}
                      style={{
                        height: 240,
                        width: 250,
                      }}
                    />
                  }
                >
                  <Meta title={p.name} />
                </Card>
                <div className="ml-14">
                  <div className="">
                    <Space direction="vertical" size={16}>
                      <Card
                        title={
                          <div className="text-2xl flex justify-between ">
                            {p.name}
                          </div>
                        }
                        extra={
                          <NavLink
                            className="text-lg"
                            to={`/dashboard/admin/product/update/${p.slug}`}
                          >
                            Edit
                          </NavLink>
                        }
                        style={{
                          width: 900,
                          height: 305,
                        }}
                        className="bg-zinc-200  text-xl border-[#1F2A40] cursor-default"
                      >
                        <div className="mt-3 flex items-center justify-between ">
                          <p className="text-lg leading-relaxed pt-1 flex ">
                            <label className="font-bold">Price:</label>
                            <label className="pl-4">{p.price}</label>
                          </p>
                          <div className="mr-28">
                            <label className="font-bold ">Category:</label>
                            <label className="pl-4">{p.category.name}</label>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="text-lg leading-relaxed pt-1 flex">
                            <label className="font-bold">stocks:</label>
                            <label className="pl-4">{p.stocks}</label>
                          </p>
                          <div className="mr-28">
                            <label className="font-bold">Sub-Category:</label>
                            <label className="pl-4">{p.subcategory.name}</label>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <p className="text-lg leading-relaxed pt-1 flex">
                            <label className="font-bold">Brand:</label>
                            <label className="pl-4">{p.brand.name}</label>
                          </p>
                        </div>
                        <div className="mt-3 text-pop">
                          <p className="text-lg leading-relaxed pt-1">
                            <label className="font-bold">Created:</label>
                            <label className="pl-4">
                              {moment(p.createdAt).format(
                                "MMMM Do YYYY, h:mm:ss"
                              )}
                            </label>
                          </p>
                        </div>
                      </Card>
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
