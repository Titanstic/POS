import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useGetRentalQuery } from "../../service/Api";
import { icons } from "../../constant";
import NavContext from "../../context/NavContext";

const Rent = () => {
  const { data } = useGetRentalQuery();
  const [rent, setRent] = useState();
  const [searchRent,setSearchRent] = useState()
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("rental");
  }, [nav, setNav]);

  useEffect(() => {
    setRent(data);
  }, [data]);
  // console.log(rent);

  // const filterRent = data?.filter( r => r.name.toLowerCase().includes(searchRent))
  // console.log(filterRent)
  
  return (
    <div className="w-full p-5">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-xl font-bold font-poppins">Renting List</h1>
          <h2 className="font-medium font-popins text-md">
            Manage Your Renting List
          </h2>
        </div>
        <Link to={"/rental/add"}>
          <button className="bg-skin-fill text-xl font-poppins p-4 rounded shadow-md">
            Add Rent
          </button>
        </Link>
      </div>
      <div className="flex justify-between my-5">
        <div className="">
          <input
            type="text"
            placeholder="Search.."
            className="border focus:outline-none p-2 rounded shadow-sm" value={searchRent} onChange={(e)=> setSearchRent(e.target.value)}
          />
        </div>
        <button className="bg-green-400 p-2 font-poppins shadow-md rounded">
          Export To Excel
        </button>
      </div>
      <table className="table-auto flex flex-col w-full justify-between items-center text-left">
        <thead className="w-full">
          <tr className="bg-skin-fill flex px-2">
            <th className="border border-white px-2 py-1 w-3/12">Start Date</th>
            <th className="border border-white px-2 py-1 w-3/12">End Date</th>
            <th className="border border-white px-2 py-1 w-3/12">Name</th>
            <th className="border border-white px-2 py-1 w-3/12">
              Paid Amount
            </th>
            <th className="border border-white px-2 py-1 w-3/12">
              Total Price
            </th>
            <th className="border border-white px-2 py-1 w-3/12">Due Amount</th>
            <th className="border border-white px-2 py-1 w-3/12">Action</th>
          </tr>
        </thead>
        <tbody className="w-full max-h-[450px] overflow-y-scroll">
          {rent?.map((r) => (
            <tr className="w-full flex  " key={r.id}>
              <td className="border border-white px-2 py-1 w-3/12">
                {r.startDate}
              </td>
              <td className="border border-white px-2 py-1 w-3/12">
                {r.endDate}{" "}
              </td>
              <td className="border border-white px-2 py-1 w-3/12">{r.name}</td>
              <td className="border border-white px-2 py-1 w-3/12">
                {r.paidAmount}
              </td>
              <td className="border border-white px-2 py-1 w-3/12">
                {r.totalAmount}
              </td>
              <td className="border border-white px-2 py-1 w-3/12 text-red-400">
                {r.totalAmount - r.paidAmount}
              </td>
              <td className="w-3/12 p-1 border border-white">
                <Link to={`/rental/edit/${r.id}`}>
                  <button>
                    <img src={icons.edit} alt="" className="w-6 h-6" />
                  </button>
                </Link>
                <Link to={`/rental/${r.id}`}>
                  <button>
                    <img src={icons.visibility} alt="" className="w-6 h-6" />
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rent;
