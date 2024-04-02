import React, {useContext, useEffect, useState} from "react";
import { checkRentalInputHandle } from "../../util/item";
import { usePostRentalMutation } from "../../service/Api";
import { useNavigate ,Link} from "react-router-dom";
import NavContext from "../../context/NavContext";

const CreateRental = () => {
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [totalAmount, setTotalPrice] = useState("");
  const [paymentType, setPaymentType] = useState();
  const [postRental] = usePostRentalMutation();
  const navigate = useNavigate();
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("rental");
  }, [nav, setNav]);
  const inputHandle = (e, input) => {
    switch (input) {
      case "name":
        setName(e);
        delete error["name"];
        break;
      case "phone":
        if (!isNaN(Number(e))) {
          setPhone(e);
          delete error["price"];
        } else {
          setError({ ...error, price: "Enter Number Only" });
        }
        break;
      case "start date":
        setStartDate(e);
        delete error["start date"];
        break;
      case "end date":
        setEndDate(e);
        delete error["end date"];
        break;
      case "paid amount":
        if (!isNaN(Number(e))) {
          setPaidAmount(e);
          delete error["paid amount"];
        } else {
          setError({ ...error, paidAmount: "Enter Number Only" });
        }
        break;
      case "total price":
        if (!isNaN(Number(e))) {
          setTotalPrice(e);
          delete error["total price"];
        } else {
          setError({ ...error, price: "Enter Number Only" });
        }
        break;
      default:
        break;
    }
  };
  const inputFormHandler = (e) => {
    e.preventDefault();
    const data = {
      name,
      phone,
      startDate,
      endDate,
      totalAmount,
      paidAmount,
      paymentType,
    };
    // console.log(data);
    const { errorDetail, exitError } = checkRentalInputHandle(data, error);
    setError(errorDetail);
    if (!exitError) {
      try {
        postRental(data);
        navigate("/rental");

        window.location.reload();
      } catch (e) {
        alert(e.message);
      }
    }
  };
  console.log(error);
  return (
    <div className="w-full p-5">
      <h1 className="text-xl font-bold font-poppins mb-3">Renting Add</h1>
      <h2 className="text-mdl font-medium font-poppins capitalize">
        Create a new renting list
      </h2>

      <form action="" onSubmit={inputFormHandler}>
        <div className="grid grid-cols-2 gap-5 mt-5">
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Customer Name
            </label>
            <div className="mt-3 relative">
              <input
                type="text"
                value={name}
                onChange={(e) => inputHandle(e.target.value, "name")}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
              {error.name && (
                <div className="absolute right-0 text-red-400">
                  {error.name}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-md font-poppins font-medium capitalize ">Customer Phone Number</label>
            <div className="mt-3 relative">
              <input
                value={phone}
                type="text"
                onChange={(e) => inputHandle(e.target.value, "phone")}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
              {error.phone && (
                <div className="absolute text-red-400 right-0">
                  {error.phone}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 my-5">
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Start Date
            </label>
            <div className="mt-3 relative">
              <input
                type="date"
                value={startDate}
                onChange={(e) => inputHandle(e.target.value, "start date")}
                className="border focus:outline-none shadow-md rounded uppercase p-2 w-full"
              />
              {error.startDate && (
                <div className="absolute text-red-400 right-0">
                  {error.startDate}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              End Date
            </label>
            <div className="mt-3 relative">
              <input
                type="date"
                min={startDate}
                value={endDate}
                onChange={(e) => inputHandle(e.target.value, "end date")}
                className="border focus:outline-none shadow-md rounded uppercase p-2 w-full"
              />
              {error.endDate && (
                <div className="absolute text-red-400 right-0">
                  {error.endDate}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Paid Amount
            </label>
            <div className="mt-3 relative">
              <input
                type="text"
                value={paidAmount}
                onChange={(e) => inputHandle(e.target.value, "paid amount")}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
              {error.paidAmount && (
                <div className="absolute text-red-400 right-0">
                  {error.paidAmount}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Total Price
            </label>
            <div className="mt-3 relative">
              <input
                type="text"
                value={totalAmount}
                onChange={(e) => inputHandle(e.target.value, "total price")}
                className="border focus:outline-none shadow-md rounded p-2 w-full"
              />
              {error.totalPrice && (
                <div className="absolute text-red-400 right-0">
                  {error.totalPrice}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-md font-medium font-poppins mb-3">
            Choose Payment
          </h1>
          <select
            className="w-full border focus:outline-none rounded shadow-md p-2"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
          >
            <option value="">Choose Payment</option>
            <option value="Cash">Cash</option>
            <option value="Kpay">Kpay</option>
            <option value="Card">Card</option>
          </select>
        </div>
        <div className="absolute right-5">
          <Link to='/rental'>
          <button className="border rounded shadow-md text-md p-2 mr-5 font-poppins">
            Cancel
          </button>
          </Link>
          <button className="bg-skin-fill text-md py-2 px-4 font-medium font-poppins rounded shadow-md">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRental;
