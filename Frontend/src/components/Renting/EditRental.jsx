import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleRentalQuery,
  useUpdateRentalMutation,
} from "../../service/Api";

const EditRental = () => {
  const { id } = useParams();
  const { data } = useGetSingleRentalQuery(id);
  console.log(data);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [totalAmount, setTotalPrice] = useState("");
  const [paymentType, setPaymentType] = useState();
  const navigate = useNavigate();
  const [updateRental] = useUpdateRentalMutation();

  useEffect(() => {
    setName(data?.name);
    setPhone(data?.phone);
    setStartDate(data?.startDate);
    setEndDate(data?.endDate);
    setPaidAmount(data?.paidAmount);
    setTotalPrice(data?.totalAmount);
    setPaymentType(data?.paymentType);
  }, [data]);

  const inputFormHandler = (e) => {
    e.preventDefault();
    const data = {
      id,
      name,
      phone,
      startDate,
      endDate,
      totalAmount,
      paidAmount,
      paymentType,
    };
    // console.log(data);
    try {
      updateRental(data);
      navigate("/rental");
      window.location.reload()

    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="w-full p-5">
      <h2 className="text-xl font-medium font-poppins capitalize">
        Edit a renting list
      </h2>

      <form action="" onSubmit={inputFormHandler}>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Name
            </label>
            <div className="mt-3 ">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="">Phone Number</label>
            <div className="mt-3 ">
              <input
                value={phone}
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 my-5">
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Start Date
            </label>
            <div className="mt-3 ">
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border focus:outline-none shadow-md rounded uppercase p-2 w-full"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              End Date
            </label>
            <div className="mt-3 ">
              <input
                type="text"
                min={startDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value, "end date")}
                className="border focus:outline-none shadow-md rounded uppercase p-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Paid Amount
            </label>
            <div className="mt-3 ">
              <input
                type="text"
                value={paidAmount}
                onChange={(e) => setPaidAmount(e.target.value, "paid amount")}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Total Price
            </label>
            <div className="mt-3 ">
              <input
                type="text"
                value={totalAmount}
                onChange={(e) => setTotalPrice(e.target.value)}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
            </div>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-md font-medium font-poppins mb-3">
            Choose Payment
          </h1>
          <input
            className="w-full border focus:outline-none rounded shadow-md p-2"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          />
        </div>
        <div className="absolute right-5">
          <button className="border rounded shadow-md text-md p-2 mr-5 font-poppins">
            Cancel
          </button>
          <button className="bg-skin-fill text-md py-2 px-4 font-medium font-poppins rounded shadow-md">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRental;
