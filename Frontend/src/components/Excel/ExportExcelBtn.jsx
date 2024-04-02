import React from "react";
import * as XLSX from "xlsx-js-style";

const ExportExcelBtn = ({ data, fileName }) => {
  // console.log(data);
  const exportToExcel = () => {
    let zeroPad = (num, place) => String(num).padStart(place, 0);
    const exportInventoryData = [];
    const date = new Date();
    const time = date.toLocaleTimeString();
    let startDate = null;
    let endDate = null;
    data?.forEach((item) => {
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
    exportInventoryData.push(["MULA ART GALLERY"]);
    exportInventoryData.push([
      "E1-12,The Secretariat Yangon,Thein Phyu Road, Botahtaung Township, Yangon,Myanmar",
    ]);
    exportInventoryData.push([
      `${startDate.toISOString().slice(0, 10)} to ${endDate
        .toISOString()
        .slice(0, 10)}`,
    ]);
    exportInventoryData.push([""]);
    exportInventoryData.push([`Date and Time : ${fileName} - ${time}`]);
    const headers = [
      "Id",
      "Code",
      "Product Name",
      "Category",
      "Quantity",
      "Purchase Price",
      "Sale Price",
      "Discount",
    ];
    exportInventoryData.push(headers);
    data.forEach((resultItem, index) => {
      const row = [
        index++,
        "MULA" + zeroPad(resultItem.id, 4),

        resultItem.name,
        resultItem.category.name,
        resultItem.quantity,
        resultItem.purchase_price,
        resultItem.sale_price,
        resultItem.discount,
      ];
      exportInventoryData.push(row);
    });
    const ws = XLSX.utils.aoa_to_sheet(exportInventoryData);

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
    ws["!cols"] = [
      { width: 10 }, // Width for column A
      { width: 20 }, // Width for column B
      { width: 25 }, // Width for column C
      { width: 10 }, // Width for column D
      { width: 10 }, // Width for column E
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
      onClick={exportToExcel}
      className="bg-green-400 text-black font-poppins p-2 rounded"
    >
      Export to Excel
    </button>
  );
};

export default ExportExcelBtn;
