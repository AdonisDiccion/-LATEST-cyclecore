import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import { Button } from "antd";

//icons
import { FiEdit } from "react-icons/fi";
import { MdEditNote } from "react-icons/md";
import CustomModal from "../../components/Modal/CustomModal";

export default function AdminBrands() {
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateshowModal, updatesetShowModal] = useState(false);
  const [name, setName] = useState();
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [deleteshowModal, deletesetShowModal] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const { data } = await axios.get("/brands");
      setBrands(data);
      setName("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (e) {
        e.preventDefault();
      }
      const { data } = await axios.post("/brand", { name });
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
        loadBrands();
        setName;
        toast.success(`"${data.name}" is created"`, {
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
      toast.error("Create brand failed, Try Again.", {
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

  const handleUpdate = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const { data } = await axios.put(`/brand/${selected._id}`, {
        name: updatingName,
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
        loadBrands();
        setSelected(null);
        setUpdatingName("");
        toast.success(`"${data.name}" is updated"`, {
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
      toast.error("Brand may already exist", {
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

  const handleDelete = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const { data } = await axios.delete(`/brand/${selected._id}`);
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
        loadBrands();
        setSelected(null);
        toast.success(`"${data.name}" is deleted"`, {
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
      toast.error("Error deleting brand, Try Again", {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" text-4xl font-bold font-pop flex place-content-center w-full border border-gray-200 ">
          <h1>Brands</h1>
          <Button type="primary" onClick={showModal}>
            Open Modal with async logic
          </Button>
          
        </div>
        <div className="bg-white px-4 pt-3 pb-4 border border-gray-200 flex-1 items-center m-5 rounded-lg">
          <div className="mt-3">
            <table className="table w-full border-collapse border border-gray-300">
              {/* <thead>
              <tr>
                <td>CategoryID</td>
                <td>Category Name</td>
                <td></td>
                <td>Order Date</td>
                <td>Order Total</td>
                <td>Shippin Address</td>
                <td>Order Status</td>
              </tr>
            </thead> */}
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300 font-pop">
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                    Brand ID
                  </th>
                  <th className="flex items-center text-left py-3 px-4 uppercase font-semibold text-sm">
                    <div className="flex-1">Category Name</div>
                    <div className="">
                      <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className=" mr-1.5 pr-5 px-6 py-2 text-white bg-emerald-500 rounded-lg flex "
                      >
                        Create
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="font-pop">
                {brands?.map((brand) => (
                  <tr key={brand._id} className="border-b border-gray-300">
                    <td className="text-left py-3 px-4">{brand._id}</td>
                    <td className="text-left py-3 px-4 ">
                      <div className="flex items-center  space-x-2 ">
                        <div className="flex-1">
                          <span className="mr-4">{brand.name}</span>
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => {
                              updatesetShowModal(true);
                              setSelected(brand);
                              setUpdatingName(brand.name);
                            }}
                            type="button"
                            className="ml-5 cursor-pointer hover:scale-100 duration-500 ease-out pr-5 px-6 py-2 text-white bg-cyan-300 rounded-lg mr-2"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="flex">
                          <button
                            onClick={() => {
                              deletesetShowModal(true);
                              setSelected(brand);
                              setUpdatingName(brand.name);
                            }}
                            type="button"
                            className="ml-5 cursor-pointer hover:scale-100 duration-500 ease-out pr-5 px-6 py-2 text-white bg-red-400 rounded-lg mr-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="font-pop text-2xl font-semibold">
                      Add Brand
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      name="brand"
                      placeholder="Write Brand"
                      label="Brand"
                      size="small"
                      fullWidth
                      autoFocus={true}
                    />
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={() => {
                        handleSubmit();
                        setShowModal(false);
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </form>
      {updateshowModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="font-pop text-2xl font-semibold">
                    Update Brand
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => updatesetShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div className="flex">
                      <div className="relative p-6 flex-auto">
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="updatebrand"
                          placeholder=""
                          label="Brand"
                          size="small"
                          fullWidth
                          autoFocus={true}
                        />
                        {/* {categories?.map((c) => (
                          <button
                            key={c._id}
                            className="btn btn-outline-primary m-3"
                            onClick={() => {
                              updatesetShowModal(true);
                              setSelected(c);
                              setUpdatingName(c.name);
                            }}
                          >
                            {c.name}
                          </button>
                        ))} */}
                      </div>
                    </div>
                  </div>
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => updatesetShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => {
                      handleUpdate();
                      updatesetShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {deleteshowModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="font-pop text-2xl font-semibold">
                    Delete Brand
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => deletesetShowModal(false)}
                  ></button>
                </div>
                {/*body*/}
                <form>
                  <div>
                    <div className="flex">
                      <div className="relative p-6 flex-auto">
                        <TextField
                          value={updatingName}
                          onChange={(e) => {
                            setUpdatingName(e.target.value);
                          }}
                          type="text"
                          name="deletebrand"
                          placeholder=""
                          label="Brand"
                          size="small"
                          fullWidth
                          disabled
                        />
                        {/* {categories?.map((c) => (
                          <button
                            key={c._id}
                            className="btn btn-outline-primary m-3"
                            onClick={() => {
                              updatesetShowModal(true);
                              setSelected(c);
                              setUpdatingName(c.name);
                            }}
                          >
                            {c.name}
                          </button>
                        ))} */}
                      </div>
                    </div>
                  </div>
                </form>

                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deletesetShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    onClick={() => {
                      handleDelete();
                      deletesetShowModal(false);
                    }}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}