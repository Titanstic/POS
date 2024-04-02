import React, { useEffect, useState } from "react";
import { useGetPurchaseQuery } from "../../service/Api";
import { Link } from "react-router-dom";
import { icons } from "../../constant";

const Purchase = () => {
  const [purchase, setPurchase] = useState();
  const { data } = useGetPurchaseQuery();


  // console.log(data);
  useEffect(() => {
    setPurchase(data);
  }, [data]);

  return (
    <div className="w-full p-7">
      <div className="flex justify-between items-center mb-5">
        <div className="">
          <h1 className="text-xl font-poppins font-semibold mb-3 ">
            Purchase Items List
          </h1>
          <h2 className="font-poppins font-medium">
            Manage Your Purchase Items
          </h2>
        </div>
        <Link to={"/purchase/add"}>
          <button className="bg-skin-fill p-4 font-poppins rounded text-xl">
            Add Purchase
          </button>
        </Link>
      </div>
      <table className="flex flex-col w-full table-auto text-left justify-between items-center">
        <thead className="w-full">
          <tr className="w-full bg-skin-fill flex px-2">
            <th className="w-3/12 border border-white px-2 py-1">Date</th>
            <th className="w-3/12 border border-white px-2 py-1">Invoice No</th>
            <th className="w-3/12 border border-white px-2 py-1">
              Total Amount
            </th>
            <th className="w-3/12 border border-white px-2 py-1">
              Payment Type
            </th>
            <th className="w-3/12 border border-white px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody
          className={`w-full max-h-[450px] ${
            purchase?.length > 0 ? "overflow-y-scroll" : ""
          }`}
        >
          {purchase?.map((item) => (
            <tr className="w-full flex px-2" key={item.id}>
              <td className="w-3/12 border border-white px-2 py-1">
                {item.purchaseDate}
              </td>
              <td className="w-3/12 border border-white px-2 py-1">
                {item.invoice_no}
              </td>
              <td className="w-3/12 border border-white px-2 py-1">
                {item.totalAmount}
              </td>
              <td className="w-3/12 border border-white px-2 py-1">Cash</td>
              <td className="w-3/12 border border-white px-2 py-1">
                <Link to={`/purchase/${item.id}`}>
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

export default Purchase;
