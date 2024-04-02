import React, { useState } from "react";
import { useAddCategoryMutation } from "../../service/Api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [addCategory] = useAddCategoryMutation();

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    const data = { name };

    if (name !== "") {
      setError("");
      try {
        addCategory(data);
        navigate("/category");
        window.location.reload();
      } catch (e) {
        window.alert(e.message);
        console.log("error", e);
      }
    } else {
      setError("Enter Category Name");
    }
  };
  return (
    <div className="container w-full h-screen mx-auto p-7 bg-bg_two">
      <h1 className="text-black text-xl font-medium mb-3">
        Product Create Category
      </h1>

      <form
        onSubmit={addCategoryHandler}
        className="w-full bg-bg_two p-7"
        method="post"
      >
        <div className="mb-3 flex flex-col">
          <label htmlFor="name" className="mb-3">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            className="border border-primary rounded-md p-2 outline-none shadow-md  "
            placeholder=" "
            onChange={(e) => setName(e.target.value)}
          />

          {error && (
            <span className="text-error text-sm absoulte bottom-0 right-0">
              {error}
            </span>
          )}
        </div>
        <div className="float-right mt-3">
          <Link to="/category">
            <button className=" border rounded-md px-4 py-2" type="button">
              Cancel
            </button>
          </Link>

          <button className="bg-skin-fill rounded-md px-4 py-2 ml-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
