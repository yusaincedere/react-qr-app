import React from "react";

function RowComponent(props) {
  const { product, onClick } = props;

  function handleClick() {
    onClick(product);
  }

  return (
    <tr onClick={handleClick}>
      <td data-title="Name">{product.name}</td>
      <td data-title="Category">{product.cetagoryId}</td>
      <td data-title="Price">{product.price}</td>
      <td data-title="Details">{product.details}</td>
    </tr>
  );
}

export default RowComponent;
