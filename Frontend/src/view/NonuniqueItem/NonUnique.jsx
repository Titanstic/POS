import React, { useContext, useEffect, useState } from "react";
import {
  useGetCategoryQuery,
  useGetNonUniqueItemsQuery,
} from "../../service/Api";
import { Link } from "react-router-dom";
import { icons } from "../../constant";
import AlertContext from "../../context/AlertContext";
import NavContext from "../../context/NavContext";
import SearchContext from "../../context/SearchContext";
import ExportExcelBtn from "../../components/Excel/ExportExcelBtn";

const NonUnique = () => {
  const { data } = useGetNonUniqueItemsQuery();
  const { data: categrory } = useGetCategoryQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const { showDelete, setShowDelete, setItemId, setUnique } =
    useContext(AlertContext);
  const { nav, setNav } = useContext(NavContext);
  const { search, DataSearch } = useContext(SearchContext);
  const [show, setShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setNav("nonunique");
  }, [nav]);
  console.log(data)
  let zeroPad = (num, place) => String(num).padStart(place, 0);
  const itemsPerPage = 5;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const records = data
    ?.filter(
      (d) => d.name.toLowerCase().includes(search) || d.id.toString() === search
    )
    .slice(firstIndex, lastIndex);


  const searchbyCat = data?.filter(d => d.category?.name === selectedCategory).slice(firstIndex, lastIndex)
  console.log(searchbyCat)

  const npage = Math.ceil(data?.length / itemsPerPage);
  const number = Array.from({ length: npage }, (_, index) => index + 1);
  const deleteItemBtn = (id) => {
    setShowDelete(!showDelete);
    setItemId(id);
    setUnique("nonunique");
  };

  const showHandler = () => {
    setShow(false);
  };
  const closeHandler = () => {
    setShow(true);
  };
  return (
    <div className="w-full bg-bg bg-opacity-20 font-poppins  p-7">
      <div className="flex justify-between">
        <div>
          <h1 className="text-black text-xl font-semibold mb-3 ">
            Non Unique Item List
          </h1>
          <h2 className="text-black font-poppins mb-5">Manage Your Products</h2>
        </div>
        <Link to={"/nonunique/add"}>
          <button className="bg-skin-fill p-4 text-xl rounded-md shadow-md">
            Add Product
          </button>
        </Link>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          {show ? (
            <img
              src={icons.search}
              alt=""
              className="w-6 h-6  mr-3"
              onClick={showHandler}
            />
          ) : (
            <img
              src={icons.filter}
              alt=""
              className="w-7 h-7  mr-3"
              onClick={closeHandler}
            />
          )}
          <input
            type="text"
            className="border focus:outline-none rounded shadow-md p-1 w-full  bg-transparent  font-poppins"
            placeholder="Search.."
            value={search}
            onChange={(e) => DataSearch(e.target.value)}
          />
        </div>
        <ExportExcelBtn data={data} fileName="Item List" />
      </div>

      {show ? (
        <div className="transitoin duration-150">
          <select
            className="my-5 p-2 text-md font-normal font-poppins"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>Choose Category</option>
            {categrory?.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        ""
      )}
      <table className="w-full text-left table-auto mt-2 flex flex-col items-center justify-between ">
        <thead className="bg-skin-fill bg-opacity-10 w-full">
          <tr className="w-full flex px-2 ">
            <th className="w-2/12 border border-white py-1 px-2">Code</th>
            <th className="w-3/12 border border-white py-1 px-2">Image</th>
            <th className="w-4/12 border border-white py-1 px-2">
              Product name
            </th>
            <th className="w-3/12 border border-white py-1 px-2">Category</th>
            <th className="w-3/12 border border-white py-1 px-2">
              Purchase Price
            </th>
            <th className="w-3/12 border border-white py-1 px-2">Sale Price</th>
            <th className="w-2/12 border border-white py-1 px-2">Disc</th>
            <th className="w-2/12 border border-white py-1 px-2">Qty</th>
            <th className="w-1/12 border border-white py-1 px-2">Promo</th>
            <th className="w-1/12 border border-white py-1 px-2">Lost</th>

            <th className="w-3/12 border border-white py-1 px-2">Action</th>
          </tr>
        </thead>
        <tbody className="w-full ">
          {show ? data ? (
            data.length > 0 ? (
              searchbyCat?.map((item) => (
                <tr
                  key={item.id}
                  className="border-b-2 border-b-border flex items-center "
                >
                  <td className="w-2/12 border border-white py-1 px-2">
                    {"MULA" + zeroPad(item.id, 4)}
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    <img
                      src={`http://localhost:8080/uploads/${item.image}`}
                      className="w-14 h-10 rounded object-fill"
                      alt="img"
                    />
                  </td>
                  <td className="w-4/12 border border-white py-1 px-2 ">
                    {item.name}
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    {item.category.name}
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    {item.purchase_price.toLocaleString("en-Us")} Ks
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    {item.promotion === null ?
                      item.sale_price.toLocaleString("en-US") :
                      (new Date(item.promotion.startDate + "T00:00:00Z") <= new Date() && new Date() <= new Date(item.promotion.endDate + "T23:59:59Z")) ?
                        (item.sale_price - (item.sale_price * item.promotion.promotionValue / 100)).toLocaleString("en-US") :
                        item.sale_price.toLocaleString("en-US")
                    } Ks

                  </td>

                  <td className="w-1/12 border border-white py-1 px-2">
                    {item.quantity}

                  </td>

                  <td className="w-2/12 border border-white py-1 px-2">
                    {item.discount.toLocaleString("en-Us")} Ks
                  </td>
                  <td className="w-2/12 border border-white py-1 px-2">
                    {item.promotion === null ? 0 :
                      (new Date(item.promotion.startDate + "T00:00:00Z") <= new Date() && new Date() <= new Date(item.promotion.endDate + "T23:59:59Z")) ?
                        item.promotion.promotionValue : 0
                    }
                  </td>
                  <td className="w-1/12 border border-white py-1 px-2">
                    {item.lost}
                  </td>

                  <td className="w-3/12 border border-white py-1 px-2">
                    <Link to={`/nonunique/${item.id}`}>
                      <button>
                        <img
                          src={icons.visibility}
                          alt=""
                          className="w-6 h-6 mr-2 "
                        />
                      </button>
                    </Link>
                    <Link to={`/nonunique/edit/${item.id}`}>
                      <button>
                        <img
                          src={icons.edit}
                          alt=""
                          className="w-6 h-6 mr-2 "
                        />
                      </button>
                    </Link>
                    <button>
                      <img
                        src={icons.del}
                        alt=""
                        className="w-6 h-6 mr-2 "
                        onClick={() => deleteItemBtn(item.id)}
                      />
                    </button>
                  </td>
                  {item.quantity === item.minQty ? (
                    <td className="absolute  border shadow-md rounded top-32 right-48 w-62 text-red-500  p-2">
                      <h1>Check Your Stock Level</h1>
                      <h2>Some products are need to restocking.</h2>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            ) : (
              <tr className="border-b-2 ">
                <td className="text-center p-3" colSpan="8">
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
          ) : data ? (
            data.length > 0 ? (
              records?.map((item) => (
                <tr
                  key={item.id}
                  className="border-b-2 border-b-border flex items-center "
                >
                  <td className="w-2/12 border border-white py-1 px-2">
                    {"MULA" + zeroPad(item.id, 4)}
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    <img
                      src={`http://localhost:8080/uploads/${item.image}`}
                      className="w-14 h-10 rounded object-fill"
                      alt="img"
                    />
                  </td>
                  <td className="w-4/12 border border-white py-1 px-2 ">
                    {item.name}
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    {item.category?.name}
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    {item.purchase_price.toLocaleString("en-Us")} Ks
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2 ">
                    {item.promotion === null ?
                      item.sale_price.toLocaleString("en-Us") :
                      (new Date(item.promotion.startDate + "T00:00:00Z") <= new Date() && new Date() <= new Date(item.promotion.endDate + "T23:59:59Z")) ?
                        (item.sale_price - (item.sale_price * item.promotion.promotionValue / 100)).toLocaleString("en-Us") :
                        item.sale_price.toLocaleString("en-Us")
                    } Ks
                  </td>
                  <td className="w-2/12 border border-white py-1 px-2">
                    {item.discount.toLocaleString("en-Us")} Ks
                  </td>
                  <td className="w-2/12 border border-white py-1 px-2">
                    {item.quantity}
                  </td>
                  <td className="w-1/12 border border-white py-1 px-2">
                    {item.promotion === null ? 0 :
                      (new Date(item.promotion.startDate + "T00:00:00Z") <= new Date() && new Date() <= new Date(item.promotion.endDate + "T23:59:59Z")) ?
                        item.promotion.promotionValue : 0
                    }
                  </td>

                  <td className="w-1/12 border border-white py-1 px-2">
                    {item.lost}
                  </td>
                  <td className="w-3/12 border border-white py-1 px-2">
                    <Link to={`/nonunique/${item.id}`}>
                      <button>
                        <img
                          src={icons.visibility}
                          alt=""
                          className="w-6 h-6 mr-2 "
                        />
                      </button>
                    </Link>
                    <Link to={`/nonunique/edit/${item.id}`}>
                      <button>
                        <img
                          src={icons.edit}
                          alt=""
                          className="w-6 h-6 mr-2 "
                        />
                      </button>
                    </Link>
                    <button>
                      <img
                        src={icons.del}
                        alt=""
                        className="w-6 h-6 mr-2 "
                        onClick={() => deleteItemBtn(item.id)}
                      />
                    </button>
                  </td>
                  {item.quantity === item.minQty ? (
                    <td className="absolute  border shadow-md rounded top-32 right-48 w-62 text-red-500  p-2">
                      <h1>Check Your Stock Level</h1>
                      <h2>Some products are need to restocking.</h2>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))
            ) : (
              <tr className="border-b-2 ">
                <td className="text-center p-3" colSpan="8">
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
                ? "active px-1 bg-skin-fill mx-1 "
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

export default NonUnique;
