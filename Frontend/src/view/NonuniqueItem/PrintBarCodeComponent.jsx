import React from "react";
import Barcode from "react-barcode";

class PrintComponent extends React.Component {
  render() {
    const { qty } = this.props;
    const { blog } = this.props;
    const BarcodeW = 200;
    const BarcodeH = 50;
    const leading = (num, totalLength) => {
      return String(num).padStart(totalLength, "0");
    };

    const sampleBarCodeName = `MULA${leading(blog?.id, 3)}`;

    const barcodeData = Array.from(
      { length: qty },
      () => `${sampleBarCodeName}`
    );

    return (
      <div>
        {barcodeData.map((data, index) => (
          <div key={index} className="">
            <Barcode value={data} format="CODE128" width={1} height={40} />
          </div>
        ))}
        {/* <div onClick={window.print()}>Print</div> */}
      </div>
    );
  }
}

export default PrintComponent;
