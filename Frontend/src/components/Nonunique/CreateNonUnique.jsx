import React, { useContext, useEffect, useState } from "react";
import {
  useAddCategoryMutation,
  useAddNonUniqueItemMutation,
  useGetCategoryQuery,
} from "../../service/Api";
import { icons } from "../../constant";
import { useNavigate } from "react-router-dom";
import { checkNonUniqueInputHandle } from "../../util/item";
import NavContext from "../../context/NavContext";

const CreateNonUnique = () => {
  const navigate = useNavigate();
  const [addNonUnique] = useAddNonUniqueItemMutation();

  // useState
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [image, setImage] = useState(null);
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [minQty, setMinQty] = useState("");
  const [lost, setLost] = useState(0);
  const [expiredDate, setExpiredDate] = useState("");

  const [profit, setProfit] = useState(null);
  const [show, setShow] = useState(false);

  const [selectedCategoryId, setCategoryId] = useState("");
  const [discount, setDiscount] = useState(0);
  const [catName, setCatName] = useState("");
  const [postCat] = useAddCategoryMutation();
  const { data } = useGetCategoryQuery();

  const { nav, setNav } = useContext(NavContext);
  useEffect(() => {
    setNav("nonunique");
  }, [nav]);

  // Start Function
  // const calculateProfitMargin = () => {
  //   const profitMargin = ((salePrice - purchasePrice) / salePrice) * 100 + '%';
  //   return profitMargin; // Round to 2 decimal places
  // };
  useEffect(() => {
    const profitMargin = ((salePrice - purchasePrice) / purchasePrice) * 100;
    setProfit(profitMargin);
  }, [salePrice, purchasePrice]);
  const createHandler = async (e) => {
    e.preventDefault();
    const data = {
      name,
      salePrice,
      purchasePrice,
      image,
      qty,
      note,
      discount,
      selectedCategoryId,
      minQty,
      lost,
      expiredDate,
    };
    const { exitError, errorDetail } = checkNonUniqueInputHandle(data, error);
    setError(errorDetail);
    // console.log( errorDetail);
    console.log(data);

    if (!exitError) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sale_price", salePrice);
      formData.append("purchase_price", purchasePrice);
      formData.append("categoryId", selectedCategoryId);
      formData.append("note", note);
      formData.append("image", image);
      formData.append("quantity", qty);
      formData.append("discount", discount);
      formData.append("minQty", minQty);
      formData.append("lost", lost);
      formData.append("expiredDate", expiredDate);
      console.log(formData);
      try {
        addNonUnique(formData);
        navigate("/nonunique");
      } catch (e) {
        console.log("error");
      }
    }
  };

  const inputHandle = (e, input) => {
    switch (input) {
      case "name":
        setName(e);
        delete error["name"];
        break;
      case "price":
        if (!isNaN(Number(e))) {
          setPurchasePrice(e);
          delete error["price"];
        } else {
          setError({ ...error, price: "Enter Number  Only" });
        }
        break;
      case "selectedCategoryId":
        setCategoryId(e);
        delete error["selectedCategoryId"];
        break;
      case "note":
        setNote(e);
        delete error["note"];
        break;
      case "qty":
        if (!isNaN(Number(e))) {
          setQty(e);
          delete error["qty"];
        } else {
          setError({ ...error, qty: "Enter Number  Only" });
        }
        break;
      case "image":
        setImage(e);
        delete error["image"];
        break;
      case "min qty":
        setMinQty(e);
        delete error["min qty"];
        break;

      default:
        break;
    }
  };

  const catHandler = (e) => {
    e.preventDefault();
    const data = { name: catName };
    // console.log(data.name);
    if (data.name !== "") {
      setError("");
      try {
        postCat(data);
        setShow(false);
        window.location.reload();
      } catch (e) {
        window.alert(e.message);
        console.log("error", e);
      }
    } else {
      setError({ msg: "Enter Category Name" });
    }
    // console.log(error);
  };

  // End Function
  return (
    <div className="w-full bg-bg_two p-7 ">
      <h1 className="text-xl text-black font-medium mb-3 font-poppins">
        Product Add
      </h1>
      <h2 className="text-black font-normal font-poppins mb-3">
        Create Non Unique Items
      </h2>
      <form
        onSubmit={createHandler}
        method="post"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col mb-6 w-full">
            <label
              htmlFor=""
              className="text-black font-normal mb-5 font-poppins"
            >
              Product name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => inputHandle(e.target.value, "name")}
                className={`w-full border ${error.name ? "border-skin-red" : "border-skin-fill"
                  } focus:outline-none shadow-md rounded-md bg-transparent p-2`}
              />
              {error.name && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.name}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal mb-5">
              Image
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => inputHandle(e.target.files[0], "image")}
              />
              {error.image && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.image}
                </p>
              )}
            </div>
          </div>
          <div className="">
            <label htmlFor="" className="text-black font-normal">
              Category
            </label>
            <div className="flex items-center mt-3 relative ">
              <select
                value={selectedCategoryId}
                onChange={(e) =>
                  inputHandle(e.target.value, "selectedCategoryId")
                }
                className={`w-full border ${error.selectedCategoryId
                  ? "border-error"
                  : "border--skin-fill"
                  } shadow-md focus:outline-none rounded-md bg-transparent p-2 `}
              >
                <option disabled>Select Category</option>

                {data?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {error.selectedCategoryId && (
                <p className="text-skin-red text-sm absolute top-10 right-0">
                  {error.selectedCategoryId}
                </p>
              )}
              <div className="">
                <img
                  src={icons.addIcon}
                  alt=""
                  className="border rounded shadow-md p-2 ml-1"
                  onClick={() => setShow(true)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mb-5">
          <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal">
              Purchase Price
            </label>
            <div className="relative">
              <input
                type="text"
                value={purchasePrice}
                onChange={(e) => inputHandle(e.target.value, "price")}
                className={`w-full border ${error.price ? "border-error" : "border-skin-border"
                  } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
              />
              {error.price && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.price}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal">
              Sale Price
            </label>
            <div className="relative">
              <input
                type="text"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="shadow-md focus:outline-none border w-full p-2 mt-3 rounded-md"
              />
              {/* {error.price && (
                <p className="text-error text-sm absolute bottom-100 right-0">
                  {error.price}
                </p>
              )} */}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal">
              Profit Margin
            </label>
            <div className="relative">
              <input
                type="text"
                value={profit ? profit.toFixed(2) + "%" : "0%"}
                className="shadow-md border w-full p-2 mt-3 rounded-md focus:outline-none"
              />
              {error.price && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.price}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-10 mb-5">
          <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal">
              Minimum Qunatity
            </label>
            <div className="relative">
              <input
                type="text"
                value={minQty}
                onChange={(e) => inputHandle(e.target.value, "min qty")}
                className={`w-full border ${error.minQty ? "border-error" : "border-skin-border"
                  } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
              />
              {error.minQty && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.minQty}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal">
              Lost Stock
            </label>
            <div className="relative">
              <input
                type="text"
                value={lost}
                onChange={(e) => setLost(e.target.value)}
                className="shadow-md focus:outline-none border w-full p-2 mt-3 rounded-md"
              />
              {/* {error.price && (
                <p className="text-error text-sm absolute bottom-100 right-0">
                  {error.price}
                </p>
              )} */}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal">
              Expired Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={expiredDate}
                onChange={(e) => setExpiredDate(e.target.value)}
                className="shadow-md border w-full p-2 mt-3 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 mb-10 gap-10 ">
          <div className="flex flex-col">
            <label htmlFor="" className="text-black font-normal">
              Discount
            </label>
            <div className="">
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full border border-skin-fill focus:outline-none
                 shadow-md rounded-md bg-transparent p-2 mt-3"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-black font-normal">
              Quantity
            </label>
            <div className="relative">
              <input
                type="text"
                value={qty}
                onChange={(e) => inputHandle(e.target.value, "qty")}
                className={`w-full border ${error.qty ? "border-skin-red" : "border--skin-fill"
                  } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
              />

              {error.qty && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.qty}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-black font-normal mb-3">
              Note
            </label>
            <div className="relative">
              <input
                type="text"
                value={note}
                onChange={(e) => inputHandle(e.target.value, "note")}
                className={`w-full border ${error.note ? "border-error" : "border--skin-fill"
                  } shadow-md focus:outline-none rounded-md bg-transparent p-2 `}
              />

              {error.note && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.note}
                </p>
              )}
            </div>
          </div>

        </div>
        <div className="absolute right-7">
          <button
            className="border border-black rounded-md shadow-md hover:bg-secondary hover:bg-opacity-10 px-5 py-2 mr-5"
            onClick={() => navigate("/nonunique")}
          >
            Cancel
          </button>

          <button className="border-none rounded-md bg-skin-fill hover:bg-opacity-70 shadow-md px-5 py-2 ">
            Save
          </button>
        </div>
      </form>
      {show && (
        <div className="absolute bg-white top-20 right-[40%] transition-all duration-500  shadow-md rounded w-72 h-auto">
          <h1 className="bg-skin-fill text-xl font-poppins font-bold capitalize text-center py-2">
            Add Category
          </h1>
          <div className="p-2">
            <label htmlFor="" className="text-md font-medium font-poppins">
              Category Name*
            </label>
            <div className="relative">
              <input
                value={catName}
                type="text"
                className="w-full outline-none p-2 shadow-md rounded mt-2 border "
                onChange={(e) => setCatName(e.target.value)}
              />
              {error.msg && (
                <div className="text-red-400 absolute right-1 ">
                  {error.msg}
                </div>
              )}
            </div>
            <div className="mt-7 ml-24">
              <button
                className="text-md font-medium font-poppins border rounded px-4 py-2 shadow-md"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <button
                className="text-md font-medium font-poppins bg-green-400 rounded px-4 py-2 shadow-md ml-2"
                onClick={catHandler}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNonUnique;
