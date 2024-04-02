import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { checkSupplierInputHandle } from "../../util/item";
import { usePostSupplierMutation } from "../../service/Api";
const CreateSupplier = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error,setError] = useState({})
  const [postSupplier] = usePostSupplierMutation()
  const inputHandler = (e, input) => {
    switch (input) {
      case "name":
        setName(e.target.value);
        delete error["name"];
        break;
      case "phone":
        setPhone(e.target.value);
        delete error[" phone"];
        break;
      case "email":
        setEmail(e.target.value);
        delete error["email"];
        break;
      
      default:
        break;
    }
  };
  const CreateSupplier = (e) => {
    e.preventDefault();
    const data = { name, email, phone, address, note };
    const { exitError, errorDetail } = checkSupplierInputHandle(
      data,
      error,
    );
    setError(errorDetail);
    if (!exitError) {
      try {
        postSupplier(data);
        navigate('/supplier')
        window.location.reload();
      } catch (e) {
        window.alert(e.message);
      }
    }
  };
  return (
    <div className="w-full p-5">
      <h1 className="text-xl font-bold font-poppins capitalize">
        Supplier Add
      </h1>
      <h2 className="text-md font-medium font-poppins capitalize my-2">
        Create a supplier List
      </h2>
      <form action="" onSubmit={CreateSupplier}>
        <div className="">
          <label className="text-md font-medium font-poppins" htmlFor="">
           Supplier Name
          </label>
          <div className="relative">
            <input
              value={name}
              type="text"
              className="w-full p-2 rounded shadow-md border mt-2 outline-none"
              placeholder="Name"
              onChange={(e) => inputHandler(e, "name")}
            />
            {error.name && (
              <div className="absolute text-red-400 text-md font-medium font-poppins right-0 ">
                {error.name}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 my-3">
          <div className="">
            <label className="text-md font-medium font-poppins" htmlFor="">
              Supplier Phone
            </label>
            <div className="relative">
              <input
                value={phone}
                name=""
                id=""
                className="w-full outline-none p-2 border shadow-md rounded mt-2"
                onChange={(e) => inputHandler(e, "phone")}
              />
               
              {error.phone && (
                <div className="text-md font-poppins font-medium capitalize text-red-400 absolute right-0">
                  {error.phone}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <label className="text-md font-medium font-poppins" htmlFor="">
              Email 
            </label>
            <div className="relative">
              <input
                value={email}
                type="text"
                className="w-full p-2 rounded shadow-md border mt-2 outline-none"
                placeholder=""
                onChange={(e) => inputHandler(e, "email")}
              />
              {error.email && (
                <div className="text-md font-poppins font-medium capitalize text-red-400 absolute right-0">
                  {error.email}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="" className="text-md font-medium font-poppins">
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={address}
                className="p-2 outline-none rounded border shadow-md mt-2 w-full "
                onChange={(e) => setAddress(e.target.value)}
              />
              {error.startDate && (
                <div className="text-md font-poppins font-medium capitalize text-red-400 absolute right-0">
                  {error.startDate}
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-md font-medium font-poppins">
              Note
            </label>
            <div className="relative">
              <input
                value={note}
                type="text"
                className="p-2 outline-none rounded border shadow-md mt-2 w-full"
                onChange={(e) => setNote(e.target.value)}
              />
              {error.endDate && (
                <div className="text-md font-poppins font-medium capitalize text-red-400 absolute right-0">
                  {error.endDate}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="absolute mt-5 right-5">
          <Link to="/supplier">
            <button className="border rounded shadow-md px-4 py-2 font-poppins text-md">
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className="ml-3 rounded shadow-md px-4 py-2 font-poppins text-md bg-green-400"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSupplier;
