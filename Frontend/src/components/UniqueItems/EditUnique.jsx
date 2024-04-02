import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleUniqueItemQuery,
  useUpdateUniqueItemMutation,
} from "../../service/Api";
import { checkUniqueInputHandle } from "../../util/item";

const EditUnique = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog } = useGetSingleUniqueItemQuery(id);
  const [error, setError] = useState({});
  const [name, setName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [owner, setOwner] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState();

  const [updateUniqueItem] = useUpdateUniqueItemMutation(id);

  const updateHandler = async (e) => {
    e.preventDefault();

    const data = {
      name,
      salePrice,
      purchasePrice,
      category,
      note,
      image,
      owner,
      discount,
    };
    console.log(data, "unique");
    const { exitError, errorDetail } = checkUniqueInputHandle(data, error);
    setError(errorDetail);

    if (!exitError) {
      const newData = new FormData();
      newData.append("id", id);
      newData.append("name", name);
      newData.append("sale_price", salePrice);
      newData.append("purchase_price", purchasePrice);
      newData.append("category", category);
      newData.append("note", note);
      newData.append("image", image);
      newData.append("owner", owner);
      newData.append("discount", discount);

      try {
        updateUniqueItem(newData)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            window.alert(err.message);
          });

        navigate("/unique");
      } catch (e) {
        window.alert(e.message);
      }
    }
  };

  useEffect(() => {
    setName(blog?.name);
    setSalePrice(blog?.sale_price);
    setPurchasePrice(blog?.purchase_price);
    setCategory(blog?.category);
    setNote(blog?.note);
    setOwner(blog?.owner);
    setImage(blog?.image);
    setDiscount(blog?.discount);
  }, [blog]);
  //   console.log(id);

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
      case "category":
        setCategory(e);
        delete error["category"];
        break;
      case "note":
        setNote(e);
        delete error["note"];
        break;
      case "owner":
        setOwner(e);
        delete error["owner"];
        break;
      case "image":
        setImage(e);
        delete error["image"];
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-bg_two w-full h-screen p-7 relative">
      <h1 className="text-black text-xl font-medium mb-3">Product Edit</h1>
      <h2 className="text-black font-normal mb-3">Update Your Product</h2>

      <form
        onSubmit={updateHandler}
        method="post"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col mb-6">
            <label htmlFor="" className="text-black font-normal mb-3">
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
            <label htmlFor="" className="text-black font-normal">
              Category
            </label>
            <div className="relative">
              <input
                type="text"
                value={category}
                onChange={(e) => inputHandle(e.target.value, "category")}
                className={`w-full border ${
                  error.category ? "border-skin-red" : "border-skin-border"
                } shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3`}
              />
              {error.category && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.category}
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
              Discount
            </label>
            <div className="relative">
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="w-full border border-skin-border
                 shadow-md focus:outline-none rounded-md bg-transparent p-2 mt-3"
              />
              {error.category && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.category}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 mb-10 gap-10 ">
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

          <div className="flex flex-col">
            <label htmlFor="" className="text-black font-normal">
              Owner
            </label>
            <div className="relative">
              <input
                type="text"
                value={owner}
                onChange={(e) => inputHandle(e.target.value, "owner")}
                className={`w-full border ${
                  error.owner ? "border-skin-red" : "border-skin-border"
                } shadow-md outline-none rounded-md bg-transparent p-2 mt-3`}
              />
              {error.owner && (
                <p className="text-skin-red text-sm absolute bottom-100 right-0">
                  {error.owner}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-black font-normal">
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
        </div>
        <div className="absolute right-7">
          <Link to={"/unique"}>
            <button className="border border-black rounded-md px-5 py-2 mr-5">
              Cancel
            </button>
          </Link>

          <button
            type="submit"
            className="border-none rounded-md bg-skin-fill px-5 py-2 "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUnique;
