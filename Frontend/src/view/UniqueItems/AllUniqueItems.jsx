import React, { useContext, useEffect, useState } from "react";
import { useGetUniqueItemsQuery } from "../../service/Api";
import { Link, useNavigate } from "react-router-dom";
import { icons } from "../../constant";
import AlertContext from "../../context/AlertContext";
import NavContext from "../../context/NavContext";
const AllUniqueItems = () => {
  // sequailze
  const { data } = useGetUniqueItemsQuery();
  const { showDelete, setShowDelete, setItemId, setUnique } =
    useContext(AlertContext);
  const { nav, setNav } = useContext(NavContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, DataSearch] = useState("");
  // console.log(search);
  const itemsPerPage = 7;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const records = data
    ?.filter((d) => d.name.toLowerCase().includes(search))
    .slice(firstIndex, lastIndex);
  const npage = Math.ceil(data?.length / itemsPerPage);
  const number = Array.from({ length: npage }, (_, index) => index + 1);

  // useState
  const navigate = useNavigate();
  useEffect(() => {
    setNav("unique");
  }, [nav]);

  // Start Function
  const deleteItemBtn = (id) => {
    setShowDelete(!showDelete);
    setItemId(id);
    setUnique("unique");
  };

  return (
    <div className="w-full bg-bg bg-opacity-20 h-auto p-7 font-poppins">
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-xl text-black font-semibold font-poppins mb-3">
            Unique Item List
          </h1>
          <p className="text-black font-poppins font-medium capitalize">
            Manage your products
          </p>
        </div>
        <button
          className="p-4 rounded-md bg-skin-fill text-black text-xl"
          onClick={() => navigate("/unique/add")}
        >
          Add Product
        </button>
      </div>

      <div className="mt-5 bg-white p-3">
        <div className="flex justify-between mb-3">
          <div className="flex ">
            <img
              src={icons.filter}
              alt=""
              className="w-7 h-7 mr-2 bg-primary"
            />
            <div className="flex">
              <input
                className="border pl-1 font-poppins  focus:outline-none  shadow-md p-1 rounded   "
                placeholder="Search..."
                value={search}
                onChange={(e) => DataSearch(e.target.value)}
              />
            </div>
          </div>
          {/* <img src={icons.pdf} alt="" className="w-6 h-6" /> */}
        </div>
        <table className="w-full text-left table-auto flex flex-col justify-between items-center">
          <thead className="bg-skin-fill w-full">
            <tr className="w-full flex px-2">
              <th className="w-3/12 border border-white py-1 px-2">Image</th>
              <th className="w-4/12 border border-white py-1 px-2">
                Product name
              </th>
              <th className="w-3/12 border border-white py-1 px-2">Category</th>
              <th className="w-4/12 border border-white py-1 px-2">
                Purchase Price
              </th>
              <th className="w-3/12 border border-white py-1 px-2">
                Sale Price
              </th>
              <th className="w-3/12 border border-white py-1 px-2">Discount</th>
              <th className="w-3/12 border border-white py-1 px-2">Quantity</th>

              <th className="w-3/12 border border-white py-1 px-2">Owner</th>
              <th className="w-3/12 border border-white py-1 px-2">Action</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {data ? (
              data.length > 0 ? (
                records?.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b-2 border-b-border flex w-full items-center"
                  >
                    <td className="w-3/12 border border-white py-1 px-2">
                      <img
                        src={`http://localhost:8080/uploads/${item.image}`}
                        className="w-14 h-10 rounded object-fill"
                        alt="img"
                      />
                    </td>
                    <td className="w-4/12 border border-white py-1 px-2">
                      {item.name}
                    </td>
                    <td className="w-3/12 border border-white py-1 px-2">
                      {item.category ? item.category : "-"}
                    </td>
                    <td className="w-4/12 border border-white py-1 px-2">
                      {item.purchase_price.toLocaleString("en-US")} Ks
                    </td>
                    <td className="w-3/12 border border-white py-1 px-2">
                      {item.sale_price.toLocaleString("en-US")} Ks
                    </td>
                    <td className="w-3/12 border border-white py-1 px-2">
                      {item.discount.toLocaleString("en-US")} Ks
                    </td>
                    <td className="w-3/12 border border-white py-1 px-2">
                      {item.quantity}
                    </td>

                    <td className="w-3/12 border border-white py-1 px-2">
                      {item.owner ? item.owner : "-"}
                    </td>
                    <td className="w-3/12 border border-white py-1 ">
                      <Link to={`/uniqueitem/${item.id}`}>
                        <button>
                          <img
                            src={icons.visibility}
                            alt=""
                            className="w-6 h-6 mr-2 "
                          />
                        </button>
                      </Link>
                      <Link to={`/unique/edit/${item.id}`}>
                        <button className="mx-2">
                          <img
                            src={icons.edit}
                            alt=""
                            className="w-6 h-6 mr-2 "
                          />
                        </button>
                      </Link>
                      <button onClick={() => deleteItemBtn(item.id)}>
                        <img src={icons.del} alt="" className="w-6 h-6 mr-2 " />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="w-full flex border-b-2 ">
                  <td className="w-full text-center p-3" colSpan="8">
                    No Data
                  </td>
                </tr>
              )
            ) : (
              <tr className="border-b-2 ">
                <td className="text-center p-3" colSpan="8">
                  Loading ...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ul className="flex mt-10 absolute right-7 bg-bg_two">
        <li>
          <a href="#" onClick={prevPage}>
            Previous
          </a>
        </li>
        {number.map((n) => (
          <li
            key={n}
            className={
              currentPage === n
                ? "active bg-skin-fill mx-1 px-1"
                : "bg-bg_three mx-1 px-1"
            }
          >
            <a href="#" onClick={() => goToPage(n)}>
              {n}
            </a>
          </li>
        ))}
        <li className="ml-2">
          <a href="#" onClick={nextPage}>
            Next
          </a>
        </li>
      </ul>
    </div>
  );
  function goToPage(page) {
    setCurrentPage(page);
  }

  function prevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  }
};

export default AllUniqueItems;
