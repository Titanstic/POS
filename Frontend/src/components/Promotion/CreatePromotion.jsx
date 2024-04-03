import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetCategoryQuery,
  usePostPromotionMutation,
} from "../../service/Api";
import { checkPromotionInptHandler } from "../../util/item";
import NavContext from "../../context/NavContext";
const CreatePromotion = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [promotionValue, setPromotionValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState({});
  const { data } = useGetCategoryQuery();
  const [postPromo] = usePostPromotionMutation();


  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("promotion");
  }, [nav, setNav]);

  const inputHandler = (e, input) => {
    switch (input) {
      case "name":
        setName(e.target.value);
        delete error["name"];
        break;
      case "selected category":
        setSelectedCategory(e.target.value);
        delete error["selected category"];
        break;
      case "promotion value":
        setPromotionValue(e.target.value);
        delete error["promotion value"];
        break;
      case "start date":
        setStartDate(e.target.value);
        delete error["start date"];
        break;
      case "end date":
        setEndDate(e.target.value);
        delete error["end date"];
        break;
      default:
        break;
    }
  };
  const createPromotion = (e) => {
    e.preventDefault();
    const data = { name, selectedCategory, promotionValue, startDate, endDate };
    const { exitError, errorDetail } = checkPromotionInptHandler({
      data,
      error,
    });
    setError(errorDetail);
    if (!exitError) {
      try {
        postPromo(data);
        navigate('/promotion')
        window.location.reload()
      } catch (e) {
        window.alert(e.message);
      }
    }
  };
  return (
    <div className="w-full p-5">
      <h1 className="text-xl font-bold font-poppins capitalize">
        Promotion Add
      </h1>
      <h2 className="text-md font-medium font-poppins capitalize my-2">
        Create a promotion List
      </h2>
      <form action="" onSubmit={createPromotion}>
        <div className="">
          <label className="text-md font-medium font-poppins" htmlFor="">
            Name
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
              Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                name=""
                id=""
                className="w-full outline-none p-2 border shadow-md rounded mt-2"
                onChange={(e) => inputHandler(e, "selected category")}
              >
                <option value="" disabled>Choose Category</option>

                {data?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {error.selectedCategory && (
                <div className="text-md font-poppins font-medium capitalize text-red-400 absolute right-0">
                  {error.selectedCategory}
                </div>
              )}
            </div>
          </div>
          <div className="">
            <label className="text-md font-medium font-poppins" htmlFor="">
              Promotion Value
            </label>
            <div className="relative">
              <input
                value={promotionValue}
                type="text"
                className="w-full p-2 rounded shadow-md border mt-2 outline-none"
                placeholder="Eg.10"
                onChange={(e) => inputHandler(e, "promotion value")}
              />
              {error.promotionValue && (
                <div className="text-md font-poppins font-medium capitalize text-red-400 absolute right-0">
                  {error.promotionValue}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="" className="text-md font-medium font-poppins">
              Start Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={startDate}
                className="p-2 outline-none rounded border shadow-md mt-2 w-full uppercase"
                onChange={(e) => inputHandler(e, "start date")}
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
              End Date
            </label>
            <div className="relative">
              <input
                value={endDate}
                min={startDate}
                type="date"
                className="p-2 outline-none rounded border shadow-md mt-2 w-full uppercase"
                onChange={(e) => inputHandler(e, "end date")}
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
          <Link to="/promotion">
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

export default CreatePromotion;
