import React from "react";
import { Link } from "react-router-dom";
import { icons } from "../../constant";
import { useGetSupplierQuery } from "../../service/Api";

const Supplier = () => {
  const { data } = useGetSupplierQuery();
  return (
    <div className="w-full p-7">
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-xl font-bold font-poppins">Supplier</h1>
          <h2 className="text-md font-medium my-3 font-poppins">
            Manage Your Supplier
          </h2>
        </div>
        <Link to="/supplier/add">
          <button className="bg-skin-fill p-4 text-xl font-poppins rounded shadow-md">
            Add New Supplier
          </button>
        </Link>
      </div>
      <table className="w-full flex flex-col mt-3">
        <thead className="w-full">
          <tr className="w-full flex bg-skin-fill px-2">
            <th className="w-3/12 border border-white px-2 py-1">
              Supplier ID
            </th>
            <th className="w-3/12 border border-white px-2 py-1">Name </th>
            <th className="w-3/12 border border-white px-2 py-1">
              Phone Number
            </th>
            <th className="w-3/12 border border-white px-2 py-1">Address</th>
            <th className="w-3/12 border border-white px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {data?.map((d) => (
            <tr className="w-full flex px-2 border-b " key={d.id}>
              <td className="w-3/12 px-2">{d.id}</td>
              <td className="w-3/12 px-2">{d.name}</td>
              <td className="w-3/12 px-2">{d.phone}</td>
              <td className="w-3/12 px-2">{d.address}</td>
              <td className="w-3/12 px-2">
                <button>
                  <img src={icons.edit} alt="" className="w-6 h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Supplier;
