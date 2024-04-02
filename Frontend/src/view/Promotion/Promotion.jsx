import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { icons } from "../../constant";
import { useGetPromotionQuery } from "../../service/Api";
import AlertContext from "../../context/AlertContext";
import NavContext from "../../context/NavContext";

const Promotion = () => {
  const { data } = useGetPromotionQuery();
  const [promotion, setPromotion] = useState();
  const navigate = useNavigate();
  const { showDelete, setShowDelete, setItemId, setUnique } =
    useContext(AlertContext);

  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("promotion");
  }, [nav, setNav]);

  // const [search,setSearch] = useState()
  useEffect(() => {
    setPromotion(data);
  }, [data]);

  // console.log(promotion);
  // const searchPromotion = promotion?.filter(p => p.name.includes(search))
  // console.log(searchPromotion)

  const editCategory = (id) => {
    console.log(id);
    navigate(`edit/${id}`)
  }

  const deletePromotion = (id) => {
    setShowDelete(!showDelete);
    setItemId(id);
    setUnique("promotion");
  }

  return (
    <div className="w-full p-7">
      <div className="flex items-center justify-between">
        <div className="">
          <h1 className="text-xl font-bold capitalize font-poppins">
            Promotion List
          </h1>
          <h2 className="text-md font-medium capitalize font-poppins">
            Manage Your Promotion List
          </h2>
        </div>
        <Link to="/promotion/add">
          <button className="p-4 text-xl font-poppins rounded shadow-md bg-skin-fill ">
            Add New Promo
          </button>
        </Link>
      </div>
      <div className="flex items-center my-3">
        <img
          src={icons.filter}
          alt=""
          className="w-7 h-7 mr-2  bg-skin-fill rounded "
        />
        <input
          type="text"
          placeholder="Search Promotion Items"
          className="p-1 outline-none rounded shadow-md border "
        // value={search
        // }
        // onChange={(e)=> setSearch(e.target.value)}
        />
      </div>
      <table className="w-full table-auto text-left flex flex-col ">
        <thead className="w-full ">
          <tr className="w-full flex bg-skin-fill px-2">
            <th className="w-3/12 border border-white px-2 py-1">Start Date</th>
            <th className="w-3/12 border border-white px-2 py-1">End Date</th>
            <th className="w-3/12 border border-white px-2 py-1">Name </th>
            <th className="w-3/12 border border-white px-2 py-1">Category</th>
            <th className="w-3/12 border border-white px-2 py-1">
              Promotion Value
            </th>
            <th className="w-3/12 border border-white px-2 py-1">Action</th>
            {/* <th className="w-3/12 border border-white px-2 py-1">Action</th> */}
          </tr>
        </thead>
        <tbody className="w-full h-[500px] overflow-y-auto">
          {promotion?.map((d) => (
            <tr className="w-full flex px-2 border-b-2 font-poppins" key={d.id}>
              <td className="w-3/12 px-2">{d.startDate}</td>
              <td className="w-3/12 px-2">{d.endDate}</td>
              <td className="w-3/12 px-2">{d.name}</td>
              <td className="w-3/12 px-2">{d.category?.name}</td>
              <td className="w-3/12 px-2">{d.promotionValue} %</td>
              <td className="w-3/12 px-2">
                <button onClick={() => editCategory(d.id)}>
                  <img src={icons.edit} alt="" className="w-6 h-6" />
                </button>

                <button className="w-6 h-6 ml-3" onClick={() => deletePromotion(d.id)}>
                  <img src={icons.del} alt="" />
                </button>
              </td>
              {/* <td className="w-3/12 px-2">
                <Link to={`/promotion/edit/${d.id}`}>
                  <button className="w-6 h-6">
                    <img src={icons.edit} alt="" />
                  </button>
                </Link>
              </td> */}
              {/* <td className="w-3/12 px-2">
                <button>
                  <img src={icons.edit} alt="" className="w-6 h-6" />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Promotion;
