import React from "react";
import * as XLSX from "xlsx-js-style";

const PurchaseReportBtn = ({ purchaseData, filename, fromDate, toDate }) => {
  const ExcelExport = () => {
    const data = [];
    const date = new Date();
    const time = date.toLocaleTimeString(); // Use toLocaleTimeString to format time
    //
    // let firstDate = null;
    // let lastDate = null;

    // purchaseData.forEach((item) => {
    //   if (item) {
    //     const createdAt = new Date(item.createdAt);
    //
    //     if (!firstDate || firstDate < createdAt) {
    //       firstDate = createdAt;
    //     }
    //
    //     if (!lastDate || createdAt > lastDate) {
    //       lastDate = createdAt;
    //     }
    //   }
    // });

    data.push(["MULA ART GALLERY"]);
    data.push([
      "E1-12,The Secretariat Yangon,Thein Phyu Road, Botahtaung Township, Yangon,Myanmar",
    ]);
    data.push([
      `${fromDate} 
      to 
      ${toDate}`,
    ]);
    data.push([""]);
    data.push([`Date and Time : ${filename} - ${time}`]);
    const headers = ["ID", "Date", "Invoice No", "Total Amount"];
    data.push(headers);

    purchaseData.forEach((resultItem) => {
      const row = [
        resultItem.id,
        resultItem.purchaseDate,
        resultItem.invoice_no,
        resultItem.totalAmount,
      ];

      data.push(row);
    });
    data.push([""]);
    // Calculate total price
    const totalPrice = data.reduce(
      (sum, row) => sum + (parseFloat(row[3]) || 0),
      0
    );
    const totalRow = ["", "", "Total Price", totalPrice];
    data.push(totalRow);

    const ws = XLSX.utils.aoa_to_sheet(data);

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
    ];

    // Apply bold and center styles for the specific rows
    for (let i = 0; i < 5; i++) {
      styleCell(
        ws,
        { r: i, c: 0 },
        { font: { bold: true }, alignment: { horizontal: "center" } }
      );
    }

    for (let i = 4; i < 6; i++) {
      styleCell(ws, { r: i, c: 0 }, { font: { bold: true } });
    }

    for (let col = 0; col < headers.length; col++) {
      styleCell(ws, { r: 7, c: col }, { font: { bold: true } }); // Style for header row
    }

    for (let col = 1; col < 3; col++) {
      for (let i = data.length - 4; i < data.length; i++) {
        styleCell(
          ws,
          { r: i, c: col },
          { font: { bold: true }, alignment: { horizontal: "center" } }
        ); // Style for header row
      }
    }

    styleCell(
      ws,
      { r: data.length - 8, c: headers.length - 1 },
      { font: { bold: true } }
    );
    styleCell(
      ws,
      { r: data.length - 8, c: headers.length - 3 },
      { font: { bold: true } }
    );

    // Resize column width
    ws["!cols"] = [
      { width: 10 }, // Width for column A
      { width: 20 }, // Width for column B
      { width: 25 }, // Width for column C
      { width: 10 }, // Width for column D
      // { width: 15 }, // Width for column F
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, `${filename} ${time}.xlsx`);
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
      onClick={ExcelExport}
      className="bg-green-400 font-poppins p-2 rounded font-medium mb-2"
    >
      Export To Excel
    </button>
  );
};

export default PurchaseReportBtn;
