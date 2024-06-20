import React from "react";

const InvoiceForm = ({
  customerName,
  setCustomerName,
  customerMobile,
  setCustomerMobile,
  customerAddress,
  setCustomerAddress,
  products,
  handleInputChange,
  handleAddProduct,
  handleSubmit,
}) => {
  return (
    <div className="invoice-form no-print">
      <h3>Invoice</h3>
      <p>Billed to:</p>
      <label>
        Customer Name:
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </label>
      <label>
        Customer Mobile No:
        <input
          type="text"
          value={customerMobile}
          onChange={(e) => setCustomerMobile(e.target.value)}
        />
      </label>
      <label>
        Customer Address:
        <textarea
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
        ></textarea>
      </label>

      <table>
        <thead>
          <tr>
            <th>Product_id</th>
            <th>Product_name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="productId"
                  value={product.productId}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="productName"
                  value={product.productName}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  value={product.quantity}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddProduct}>Add Product</button>
      <button onClick={handleSubmit}>Print Invoice</button>
    </div>
  );
};

export default InvoiceForm;
