import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../service/Api";

const EditCategory = () => {
  const [category, setCategory] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();
  const { data } = useGetSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation(id);

  useEffect(() => {
    if (data) {
      setCategory(data);
    }
  }, [data]);

  const editHandle = async (e) => {
    e.preventDefault();

    if (category.name !== "") {
      try {
        await updateCategory(category)
          .then((res) => console.log(res))
          .catch((err) => window.alert(err.message));

        navigate("/category");
        window.location.reload();

      } catch (e) {
        console.log(e.message);
      }
    }
  };
  return (
    <div className="container w-full h-screen mx-auto p-7 bg-bg_two">
      <h1 className="text-black text-xl font-medium mb-3">
        Product Edit Category
      </h1>
      <form onSubmit={editHandle} className="w-full bg-bg_two p-7">
        <div className="mb-3 flex flex-col">
          <label htmlFor="name" className="mb-3">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={category.name}
            className="border border-primary shadow-md rounded-md p-2 outline-none "
            placeholder=" "
            onChange={(e) => setCategory({ ...category, name: e.target.value })}
          />
        </div>
        <div className="float-right mt-3">
          <Link to="/category">
            <button
              className=" border rounded-md shadow-md px-4 py-2"
              type="button"
            >
              Cancel
            </button>
          </Link>

          <button
            className="bg-primary rounded-md shadow-md px-4 py-2 ml-3"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
