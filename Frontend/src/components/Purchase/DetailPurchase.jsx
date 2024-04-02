import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetSinglePurchaseQuery } from "../../service/Api";

const DetailPurchase = () => {
  const { id } = useParams();
  const { data } = useGetSinglePurchaseQuery(id);
  const [item, setItem] = useState();
  useEffect(() => {
    setItem(data);
  }, [data]);

  return (
    <div className="w-full p-2">
      <h1 className="text-xl font-bold font-poppins">
        Purchase Item Detail Lists
      </h1>
      <Link to={"/purchase"}>
        <button className="text-md bg-skin-fill font-poppins font-medium px-4 py-2 rounded shadow-md my-3">
          Back
        </button>
      </Link>
      <table className="w-full flex flex-col ">
        <thead className="w-full">
          <tr className="w-full flex px-2 bg-skin-fill">
            <th className="w-3/12 border border-white px-2 py-1">Date</th>
            <th className="w-3/12 border border-white px-2 py-1">Invoice No</th>
            <th className="w-3/12 border border-white px-2 py-1">
              Product Name
            </th>
            <th className="w-3/12 border border-white px-2 py-1">Quantity</th>
            <th className="w-3/12 border border-white px-2 py-1">Price</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {item?.productData ? (
            JSON.parse(item?.productData).map((product) => (
              <tr key={product.id} className="w-full flex px-2 ">
                <td className="w-3/12 px-2 py-1">{item?.purchaseDate}</td>
                <td className="w-3/12 px-2 py-1">{item?.invoice_no}</td>
                <td className="w-3/12 px-2 py-1">{product.name}</td>
                <td className="w-3/12 px-2 py-1">{product.quantity}</td>
                <td className="w-3/12 px-2 py-1">{product.purchase_price}</td>
              </tr>
            ))
          ) : (
            <div>No product</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DetailPurchase;
