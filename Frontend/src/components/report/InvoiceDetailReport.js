const InvoiceDetailReports = ({ orderDetailItems, detailInvoiceBtn }) => {
  console.log(orderDetailItems);
  return (
    <>
      <button
        className="text-lg bg-skin-fill text-white rounded shadow px-5 py-2 mb-4"
        onClick={() => detailInvoiceBtn()}
      >
        Back
      </button>
      <table className="w-full text-left flex flex-col justify-between items-center">
        <thead className="w-full">
          <tr className="bg-skin-fill px-2 bg-opacity-10 rounded w-full flex">
            <th className="w-4/12 border border-white px-2 py-1 ">#</th>
            <th className="w-4/12 border border-white px-2 py-1 ">
              Product Name
            </th>
            <th className="w-4/12 border border-white px-2 py-1">Price</th>
            <th className="w-4/12 border border-white px-2 py-1">Quantity</th>
            <th className="w-4/12 border border-white px-2 py-1">Date</th>
          </tr>
        </thead>

        <tbody className="w-full">
          {orderDetailItems.map((o) => (
            <tr className="flex px-2 w-full border-b-2" key={o.id}>
              <td className="w-4/12 border border-white px-2 py-1">{o.id}</td>
              <td className="w-4/12 border border-white px-2 py-1">
                {o.product_name}
              </td>
              <td className="w-4/12 border border-white px-2 py-1">
                {o.price.toLocaleString("en-US")} Ks
              </td>
              <td className="w-4/12 border border-white px-2 py-1">
                {o.quantity}
              </td>
              <td className="w-4/12 border border-white px-2 py-1">
                {new Date(o.createdAt).toLocaleString("en-US", {
                  timeZone: "Asia/Yangon",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default InvoiceDetailReports;
