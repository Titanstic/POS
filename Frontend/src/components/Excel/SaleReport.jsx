import React from "react";
import * as XLSX from "xlsx-js-style";

const SaleReport = ({ data, fileName, fromDate, toDate }) => {
  const exportToExcel = () => {
    const exportData = [];
    // let zeroPad = (num, place) => String(num).padStart(place, 0);
    const date = new Date();
    const time = date.toLocaleString();
    let startDate = null;
    let endDate = null;
    data.forEach((item) => {
      if (item) {
        const createdAt = new Date(item.createdAt);
        if (!startDate || startDate < createdAt) {
          startDate = createdAt;
        }
        if (!endDate || createdAt > endDate) {
          endDate = createdAt;
        }
      }
    });
    exportData.push(["MULA ART GALLERY"]);
    exportData.push([
      "E1-12,The Secretariat Yangon,Thein Phyu Road, Botahtaung Township, Yangon,Myanmar",
    ]);
    exportData.push([
      `${fromDate} to ${toDate}`,
    ]);
    exportData.push([""]);
    exportData.push([`Date and Time : ${fileName} - ${time}`]);
    const headers = [
      "Id",
      "Date",
      "Invoice No",
      "Total",
      "PayAmount",
      "Discount",
      "Cashback",
      "GrandTotal",
    ];
    exportData.push(headers);
    data.forEach((resultItem) => {
      const row = [
        resultItem.id,
        resultItem.createdAt.slice(0, 10),
        // "MULA" + zeroPad(resultItem.id, 4),
        resultItem.invoice_no,
        resultItem.grandtotal,
        resultItem.payamount,
        resultItem.discount,
        resultItem.payback,
        resultItem.grandtotal,
      ];

      exportData.push(row);
    });
    exportData.push([""]);
    const totalPrice = exportData.reduce(
      (sum, row) => sum + (parseFloat(row[7]) || 0),
      0
    );
    const totalRow = ["", "", "", "", "", "", "Total Price", totalPrice];
    exportData.push(totalRow);
    const ws = XLSX.utils.aoa_to_sheet(exportData);

    // Merging and centering cells for the specific rows
    ws["!merges"] = [
      // Merge cells for the "Welcome" row
      { s: { r: 0, c: 0 }, e: { r: 0, c: headers.length - 1 } },
      // Merge cells for the second row
      { s: { r: 1, c: 0 }, e: { r: 1, c: headers.length - 1 } },
      // Merge cells for the third row
      { s: { r: 2, c: 0 }, e: { r: 2, c: headers.length - 1 } },
      // Merge cells for the fourth row
      { s: { r: 3, c: 0 }, e: { r: 3, c: headers.length - 1 } },
      // Merge cells for the fourth row
      { s: { r: 4, c: 0 }, e: { r: 4, c: headers.length - 1 } },
    ];

    // Apply bold and center styles for the specific rows
    for (let i = 0; i < 3; i++) {
      styleCell(
        ws,
        { r: i, c: 0 },
        { font: { bold: true }, alignment: { horizontal: "center" } }
      );
    }

    for (let i = 4; i < 6; i++) {
      styleCell(ws, { r: i, c: 0 }, { font: { bold: true } });
    }

    // for (let col = 0; col < headers.length; col++) {
    //   styleCell(ws, { r: 7, c: col }, { font: { bold: true } }); // Style for header row
    // }

    // for (let col = 1; col < 3; col++) {
    //   for (let i = data.length - 6; i < data.length; i++) {
    //     styleCell(
    //       ws,
    //       { r: i, c: col },
    //       { font: { bold: true }, alignment: { horizontal: "center" } }
    //     ); // Style for header row
    //   }
    // }

    // styleCell(
    //   ws,
    //   { r: data.length - 8, c: headers.length - 1 },
    //   { font: { bold: true } }
    // );
    // styleCell(
    //   ws,
    //   { r: data.length - 8, c: headers.length - 3 },
    //   { font: { bold: true } }
    // );

    // Resize column width
    ws["!cols"] = [
      { width: 10 }, // Width for column A
      { width: 20 }, // Width for column B
      { width: 25 }, // Width for column C
      { width: 10 }, // Width for column D
      { width: 10 }, // Width for column E
      { width: 15 }, // Width for column F
      { width: 15 }, // Width for column F
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, `${fileName}${time}.xlsx`);
  };

  // Helper function to style a cell
  // Helper function to style a cell
  const styleCell = (ws, cell, style) => {
    const cellAddress = XLSX.utils.encode_cell(cell);

    // Ensure the cell exists in the worksheet
    if (!ws[cellAddress]) {
      ws[cellAddress] = { s: {} };
    }

    // Ensure the style object is defined
    if (!ws[cellAddress].s) {
      ws[cellAddress].s = {};
    }

    // Apply the specified style properties
    Object.assign(ws[cellAddress].s, style);
  };
  return (
    <button
      className="bg-green-400 font-poppins capitalize font-medium p-2 rounded"
      onClick={exportToExcel}
    >
      Export To Excel
    </button>
  );
};

export default SaleReport;
