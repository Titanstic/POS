import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../service/Api";
import { icons } from "../../constant";
import AlertContext from "../../context/AlertContext";
import NavContext from "../../context/NavContext";

const Category = () => {
  const { showDelete, setShowDelete, setItemId, setUnique } =
    useContext(AlertContext);

  const { data: categories, isLoading } = useGetCategoryQuery();
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("category");
  }, [nav, setNav]);

  const deleteItemBtn = (id) => {
    setShowDelete(!showDelete);
    setItemId(id);
    setUnique("category");
  };
  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <div className="w-full h-screen bg-bg p-7 border border-l-border font-poppins">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-black text-xl  mb-3 font-semibold">
            Product Category List
          </h1>
          <h2>View/Search Your Product Category</h2>
        </div>
        <Link to="/category/add">
          <button className="bg-skin-fill text-xl text-black rounded-md p-4 mb-5">
            Add Category
          </button>
        </Link>
      </div>

      <div className="w-full flex justify-center mt-5">
        <table className="w-8/12 max-h-[440px] bg-white text-left table-auto flex flex-col items-center justify-between shadow overflow-y-auto p-3">
          <thead className="bg-skin-fill bg-opacity-10 flex w-full">
            <tr className="flex w-full px-2">
              <th className="w-6/12 border border-white px-2 py-1">
                Category Name
              </th>
              <th className="w-6/12 border border-white px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {categories ? (
              categories.length > 0 ? (
                categories &&
                categories?.map((item) => (
                  <tr
                    key={item.id}
                    className="flex w-full border-b-2 border-b-border items-center"
                  >
                    <td className="w-6/12 py-1 px-2">{item.name}</td>
                    <td className="w-6/12 py-1 px-2">
                      <Link to={`/category/edit/${item.id}`}>
                        <button>
                          <img
                            src={icons.edit}
                            alt=""
                            className="w-6 h-6 mr-2 "
                          />
                        </button>
                      </Link>
                      <button className="ml-6">
                        <img
                          src={icons.del}
                          alt=""
                          className="w-6 h-6 mr-2 "
                          onClick={() => deleteItemBtn(item.id)}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="flex w-full border-b-2 border-b-secondary ">
                  <td className="text-center w-full p-3">No Data</td>
                </tr>
              )
            ) : (
              <tr className="flex w-full border-b-2 border-b-secondary ">
                <td className="w-full text-center p-3">Loading ...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
