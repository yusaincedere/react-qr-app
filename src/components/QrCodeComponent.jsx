import React, { Component } from "react";

const QrCodeComponent = ({ text, qrCode }) => {
  return (
    <div className="container">
      <div className="h-100 d-flex align-items-center justify-content-center">
        <img src={qrCode}></img>
      </div>
      <div className="h-100 d-flex align-items-center justify-content-center">
        <span className="text-muted">{text}</span>
      </div>
    </div>
  );
};

export default QrCodeComponent;
