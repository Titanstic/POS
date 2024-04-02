import React, { useState } from "react";
import { useAddUniqueItemMutation } from "../../service/Api";
import { Link, useNavigate } from "react-router-dom";
import { checkUniqueInputHandle } from "../../util/item";

const CreateUnique = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [addUniqueItem] = useAddUniqueItemMutation();
  const [name, setName] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [owner, setOwner] = useState("");

  // Start Function
  const createHandler = async (e) => {
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
    const { exitError, errorDetail } = checkUniqueInputHandle(data, error);
    setError(errorDetail);
    console.log(errorDetail);

    if (!exitError) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("sale_price", salePrice);
      formData.append("purchase_price", purchasePrice);
      formData.append("category", category);
      formData.append("note", note);
      formData.append("image", image);
      formData.append("owner", owner);
      formData.append("discount", discount);
      // console.log(formData);

      try {
        addUniqueItem(formData);
        navigate("/unique");
      } catch (e) {
        console.log(e, "skin-red");
      }
    }
  };

  const inputHandle = (e, input) => {
    switch (input) {
      case "name":
        setName(e);
        delete error["name"];
        break;
      case "sale price":
        if (!isNaN(Number(e))) {
          setSalePrice(e);
          delete error["sale price"];
        } else {
          setError({ ...error, price: "Enter Number  Only" });
        }
        break;
      case "purchase price":
        if (!isNaN(Number(e))) {
          setPurchasePrice(e);
          delete error["purchase price"];
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
  // End Function

  return (
    <div className=" w-full h-screen mx-auto p-7 bg-bg_two font-poppins">
      <h1 className="text-black text-xl font-medium mb-3">
        Add Unique Product
      </h1>
      <h2 className="text-black font-normal mb-5 capitalize">
        Create new unique products
      </h2>

      <form
        onSubmit={createHandler}
        method="post"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-2 gap-10 mb-5">
          <div className="flex flex-col mb-6">
            <label htmlFor="" className="text-black font-normal mb-3">
              Product Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => inputHandle(e.target.value, "name")}
                className={`w-full border ${
                  error.name ? "border-skin-red" : "border-skin-border"
                } shadow-md rounded-md bg-transparent p-2 focus:outline-none focus:shadow-outline `}
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
                } shadow-md rounded-md bg-transparent p-2 mt-3 focus:outline-none focus:shadow-outline `}
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
                } shadow-md rounded-md bg-transparent p-2 mt-3 focus:outline-none focus:shadow-outline `}
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
                } shadow-md rounded-md bg-transparent p-2 mt-3 focus:outline-none focus:shadow-outline `}
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
                className="w-full border  border-skin-border
                 shadow-md rounded-md bg-transparent p-2 mt-3 focus:outline-none focus:shadow-outline "
              />
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
                } shadow-md rounded-md bg-transparent p-2 mt-3 focus:outline-none focus:shadow-outline `}
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
                }  rounded-md bg-transparent p-2 mt-3 focus:outline-none focus:shadow-outline shadow-md`}
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

          <button className="border-none rounded-md bg-skin-fill px-5 py-2 ">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUnique;
