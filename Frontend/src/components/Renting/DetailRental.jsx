import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetSingleRentalQuery } from "../../service/Api";

const DetailRental = () => {
  const { id } = useParams();
  const { data } = useGetSingleRentalQuery(id);

  const [rental, setRental] = useState();
  useEffect(() => {
    setRental(data);
  }, [data]);
  console.log(rental);
  return (
    <div className="w-full p-2">
      <h1 className="text-xl font-bold font-poppins capitalize mb-3">
        Rental Details
      </h1>
      <h2 className="text-md font-medium font-poppins capitalize">
        Full detail of products.
      </h2>
      <Link to={"/rental"}>
        <button className="text-md font-medium font-poppins bg-skin-fill rounded shadow-md py-2 px-4 mt-3">
          Back
        </button>
      </Link>
      <div className="table w-full font-poppins  p-5">
        <div className="table-row  ">
          <div className="table-cell font-bold p-2 border w-3/12">Name</div>
          <div className="table-cell p-2 border capitalize">{rental?.name}</div>
        </div>
        <div className="table-row  ">
          <div className="table-cell font-bold p-2 border ">Phone Number</div>
          <div className="table-cell p-2 border capitalize">
            {rental?.phone}
          </div>
        </div>
        <div className="table-row">
          <div className="table-cell w-3/12 font-bold p-2 border ">
            Start Date
          </div>
          <div className="table-cell p-2 border">{rental?.startDate}</div>
        </div>
        <div className="table-row">
          <div className="table-cell font-bold p-2 border">End Date</div>
          <div className="table-cell p-2 border">{rental?.endDate}</div>
        </div>
        <div className="table-row  ">
          <div className="table-cell font-bold p-2 border ">Payment Type</div>
          <div className="table-cell p-2 border">{rental?.paymentType}</div>
        </div>
        <div className="table-row">
          <div className="table-cell w-3/12 font-bold p-2 border ">
            Total Price
          </div>
          <div className="table-cell p-2 border">{rental?.totalAmount}</div>
        </div>
        <div className="table-row">
          <div className="table-cell font-bold p-2 border">Paid Amount</div>
          <div className="table-cell p-2 border">{rental?.paidAmount}</div>
        </div>
        <div className="table-row">
          <div className="table-cell font-bold p-2 border">Due Amount</div>
          <div className="table-cell p-2 border text-red-400">
            {rental?.totalAmount - rental?.paidAmount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRental;
