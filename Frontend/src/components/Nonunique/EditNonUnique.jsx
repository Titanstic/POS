import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCategoryQuery,
  useGetSingleNonUniqueItemQuery,
  useUpdateNonUniqueItemMutation,
} from "../../service/Api";
import { checkNonUniqueInputHandle } from "../../util/item";

const EditNonUnique = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog } = useGetSingleNonUniqueItemQuery(id);
  const [error, setError] = useState({});

  const [name, setName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [image, setImage] = useState("");
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [minQty, setMinQty] = useState("");
  const [expiredDate, setExpiredDate] = useState("");
  const [lost, setLost] = useState();
  const [discount, setDiscount] = useState();
  const [selectedCategoryId, setCategoryId] = useState("");
  const [profit, setProfit] = useState(null);
  useEffect(() => {
    const profitMargin = ((salePrice - purchasePrice) / purchasePrice) * 100;
    setProfit(profitMargin);
  }, [salePrice, purchasePrice]);


  const { data } = useGetCategoryQuery();
  const [updateNonUniqueItem] = useUpdateNonUniqueItemMutation(id);

  useEffect(() => {
    if (blog) {
      setName(blog?.name);
      setSalePrice(blog?.sale_price);
      setPurchasePrice(blog?.purchase_price);
      setCategoryId(blog?.categoryId);
      setQty(blog.quantity);
      setNote(blog?.note);
      setImage(blog?.image);
      setDiscount(blog?.discount);
      setMinQty(blog.minQty);
      setExpiredDate(blog.expiredDate);
      setLost(blog.lost);
    }
  }, [blog]);
  const inputHandle = (e, input) => {
    switch (input) {
      case "name":
        setName(e);
        delete error["name"];
        break;
      case "sale price":
        if (!isNaN(Number(e))) {
          setSalePrice(e);
          delete error["price"];
        } else {
          setError({ ...error, price: "Enter Number  Only" });
        }
        break;
      case "purchase price":
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

  const updateHandler = async (e) => {
    e.preventDefault();
    const data = {
      name,
      salePrice,
      purchasePrice,
      image,
      qty,
      note,
      selectedCategoryId,
      discount,
      minQty,
      lost,
      expiredDate,
    };
    const { exitError, errorDetail } = checkNonUniqueInputHandle(data, error);
    setError(errorDetail);

    if (!exitError) {
      const newData = new FormData();
      newData.append("id", id);
      newData.append("name", name);
      newData.append("sale_price", salePrice);
      newData.append("purchase_price", purchasePrice);
      newData.append("category", selectedCategoryId);
      newData.append("note", note);
      newData.append("quantity", qty);
      newData.append("image", image);
      newData.append("discount", discount);
      newData.append("minQty", minQty);
      newData.append("expiredDate", expiredDate);
      newData.append("lost", lost);
      // console.log(FormData);
      try {
        updateNonUniqueItem(newData);
        navigate("/nonunique");
      } catch (e) {
        console.log("error", e);
      }
    }
  };
  return (
    <div className="bg-bg_two w-full h-screen p-7 relative">
      <h1 className="text-black text-xl font-medium mb-3">
        Product Edit Non-Unique
      </h1>

      <form
        onSubmit={updateHandler}
        method="post"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col mb-6">
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
                className={`w-full border ${
                  error.name ? "border-skin-red" : "border-skin-border"
                } shadow-md focus:outline-none rounded-md bg-transparent p-2`}
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
          <div className="flex flex-col">
            <label htmlFor="" className="text-black font-normal">
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategoryId}
                onChange={(e) =>
                  inputHandle(e.target.value, "selectedCategoryId")
                }
                className={`w-full border ${
                  error.selectedCategoryId
                    ? "border-skin-red"
                    : "border-skin-border"
                } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
              >
                <option>Select Category</option>

                {data?.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {error.selectedCategoryId && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.selectedCategoryId}
                </p>
              )}
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
                onChange={(e) => inputHandle(e.target.value, "purchase price")}
                className={`w-full border ${
                  error.purchasePrice ? "border-skin-red" : "border-skin-border"
                } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
              />
              {error.purchasePrice && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.purchasePrice}
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
                onChange={(e) => inputHandle(e.target.value, "sale price")}
                className={`w-full border ${
                  error.salePrice ? "border-skin-red" : "border-skin-border"
                } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
              />
              {error.salePrice && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.salePrice}
                </p>
              )}
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
                className={`w-full border ${
                  error.minQty ? "border-error" : "border-skin-border"
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
                type="text"
                value={expiredDate}
                onChange={(e) => setExpiredDate(e.target.value)}
                className="shadow-md border w-full p-2 mt-3 rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 mb-10 gap-10 ">
        <div className="flex flex-col ">
            <label htmlFor="" className="text-black font-normal">
              Discount
            </label>
            <div className="relative">
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full border border-skin-border
                } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3"
              />
              {error.purchasePrice && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.purchasePrice}
                </p>
              )}
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
                className={`w-full border ${
                  error.qty ? "border-skin-red" : "border-skin-border"
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
            <label htmlFor="" className="text-black font-normal">
              Note
            </label>
            <div className="relative">
              <input
                type="text"
                value={note}
                onChange={(e) => inputHandle(e.target.value, "note")}
                className={`w-full border ${
                  error.note ? "border-skin-red" : "border-skin-border"
                } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
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
    </div>
  );
};

export default EditNonUnique;
