import React, { Component, useState } from "react";

import { QrReader } from "react-qr-reader";

const QrScannerComponent = (props) => {
  const [data, setData] = useState("No result");

  const openScanner = () => {
    if (props.permission === true) {
      console.log("Cam ON");
      return (
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }

            if (!!error) {
              console.info(error);
            }
          }}
          videoStyle={{ width: 400, height: 300 }}
          containerStyle={{ width: 400, height: 300 }}
          constraints={{ facingMode: "user" }}
          scanDelay="100"
        />
      );
    } else {
      console.log("Cam OFF");
      return null;
    }
  };

  return (
    <div className="col  text-center" style={{ display: props.display }}>
      <div className="row justify-content-md-center">{openScanner()}</div>
      <p>{data}</p>
    </div>
  );
};
export default QrScannerComponent;
