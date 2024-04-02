import React, { useState, useEffect } from "react";
import JsBarcode from "jsbarcode";

const BarcodeGenerator = ({ value }) => {
  const [barcodeDataUrl, setBarcodeDataUrl] = useState("");

  useEffect(() => {
    generateBarcode();
  }, [value]);

  const generateBarcode = () => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, value);

    // Convert the barcode to a data URL
    const dataUrl = canvas.toDataURL("image/png");
    setBarcodeDataUrl(dataUrl);
  };

  return (
    <div>{barcodeDataUrl && <img src={barcodeDataUrl} alt="Barcode" />}</div>
  );
};

export default BarcodeGenerator;
