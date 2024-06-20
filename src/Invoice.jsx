import React from "react";

const Invoice = ({
  companyName,
  companyAddress,
  companyMobile,
  customerName,
  customerMobile,
  customerAddress,
  products,
  totalAmount,
}) => {
  return (
    <div>
      <h2>{companyName}</h2>
      <p>{companyAddress}</p>
      <p>Mobile no: {companyMobile}</p>
      <p>Billed to:</p>
      <p>Customer Name: {customerName}</p>
      <p>Customer Mobile No: {customerMobile}</p>
      <p>Customer Address: {customerAddress}</p>
      <table>
        <thead>
          <tr>
            <th>Product_id</th>
            <th>Product_name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{product.price * product.quantity}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <strong>Total Amount:</strong>
            </td>
            <td>
              <strong>{totalAmount}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
