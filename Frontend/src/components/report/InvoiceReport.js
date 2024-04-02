import { icons } from "../../constant";
import SaleReport from "../Excel/SaleReport";

const InvoiceReport = ({ fromDate, toDate, orderItems, detailInvoiceBtn }) => {
  console.log(orderItems);
  return (
    <>
      <SaleReport data={orderItems} fileName="Sale_Report" fromDate={fromDate} toDate={toDate} />
      <table className="w-full max-h-[550px] mt-3 bg-white p-3 shadow flex flex-col items-center justify-between  overflow-y-auto text-left">
        <thead className="w-full">
          <tr className="flex w-full bg-skin-fill bg-opacity-10 px-2">
            <th className="w-1/12  py-1 px-2 border border-white">#</th>
            <th className="w-2/12  py-1 px-2 border border-white">
              Invoice No.
            </th>
            <th className="w-1/12 py-1 px-2 border border-white">Total</th>
            <th className="w-1/12 py-1 px-2 border border-white">Discount</th>
            <th className="w-2/12 py-1 px-2 border border-white">
              Grand Total
            </th>
            <th className="w-2/12 py-1 px-2 border border-white">
              Payment Amount
            </th>
            <th className="w-1/12 py-1 px-2 border border-white">Change</th>
            <th className="w-2/12 py-1 px-2 border border-white">Date</th>
            <th className="w-1/12 py-1 px-2 border border-white">Action</th>
          </tr>
        </thead>

        <tbody className="w-full">
          {orderItems ? (
            orderItems.length > 0 ? (
              orderItems.map((o) => (
                <tr className="flex w-full items-center border-b-2" key={o.id}>
                  <td className="w-1/12 px-2 pl-3 py-1">{o.id}</td>
                  <td className="w-2/12 px-2 pl-3 py-1">{o.invoice_no}</td>
                  <td className="w-1/12 px-2 py-1">
                    {(o.grandtotal + o.discount).toLocaleString("en-US")} Ks
                  </td>
                  <td className="w-1/12 px-2 py-1">
                    {o.discount.toLocaleString("en-US")} Ks
                  </td>
                  <td className="w-2/12 px-2 py-1">
                    {(o.grandtotal ).toLocaleString("en-US")} Ks
                  </td>
                  <td className="w-2/12 px-2 pl-3 py-1 ">
                    {o.payamount.toLocaleString("en-US")} Ks
                  </td>
                  <td className="w-1/12 px-2 py-1">
                    {o.payback.toLocaleString("en-US")} Ks
                  </td>
                  <td className="w-2/12 px-2 py-1">
                    {new Date(o.createdAt).toLocaleString("en-US", {
                      timeZone: "Asia/Yangon",
                    })}
                  </td>
                  <td
                    className="w-1/12 px-2 py-1"
                    onClick={() => detailInvoiceBtn(o)}
                  >
                    <button className="w-7">
                      <img src={icons.visibility} alt="eye" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="w-full flex border-b-2">
                <td className="w-full text-center py-3" colSpan="9">
                  No Data
                </td>
              </tr>
            )
          ) : (
            <tr className="w-full flex border-b-2">
              <td className="w-full text-center text-error py-1" colSpan="9">
                Loading ....
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default InvoiceReport;
