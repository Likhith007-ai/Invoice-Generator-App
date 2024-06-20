import React, { useState, useEffect } from "react";
import InvoiceForm from "./InvoiceForm";
import Invoice from "./Invoice";
import Transactions from "./Transactions";
import "./App.css";
// import Logo from "./pickleLogo.jpg";

function App() {
  const [companyName] = useState("Spicy & Tasty Pickles");
  const [companyAddress] = useState("Sathyavedu, 517588");
  const [companyMobile] = useState("+91-xxxxxxxxxx");
  const [customerName, setCustomerName] = useState("");
  const [customerMobile, setCustomerMobile] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [products, setProducts] = useState([
    { productId: "", productName: "", quantity: "", price: "" },
  ]);
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [printInvoice, setPrintInvoice] = useState(false);
  const [printTransactions, setPrintTransactions] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleInputChange = (index, event) => {
    const values = [...products];
    values[index][event.target.name] = event.target.value;
    setProducts(values);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { productId: "", productName: "", quantity: "", price: "" },
    ]);
  };

  const handleInvoicePrint = () => {
    const totalAmount = products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const newTransaction = {
      customerName,
      customerMobile,
      customerAddress,
      products,
      totalAmount,
      date: new Date().toLocaleDateString(),
    };
    setTransactions([...transactions, newTransaction]);
    setPrintInvoice(true);
    setTimeout(() => {
      window.print();
      setPrintInvoice(false);
    }, 500);
  };

  const handleTransactionsPrint = () => {
    setPrintTransactions(true);
    setTimeout(() => {
      window.print();
      setPrintTransactions(false);
    }, 500);
  };

  const updateTransactions = (updatedTransactions) => {
    setTransactions(updatedTransactions);
  };

  const totalAmount = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return (
    <div className="App">
      <div className="container">
        <InvoiceForm
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerMobile={customerMobile}
          setCustomerMobile={setCustomerMobile}
          customerAddress={customerAddress}
          setCustomerAddress={setCustomerAddress}
          products={products}
          handleInputChange={handleInputChange}
          handleAddProduct={handleAddProduct}
          handleSubmit={handleInvoicePrint}
        />

        <div className="print-only">
          {printInvoice && (
            <Invoice
              companyName={companyName}
              companyAddress={companyAddress}
              companyMobile={companyMobile}
              customerName={customerName}
              customerMobile={customerMobile}
              customerAddress={customerAddress}
              products={products}
              totalAmount={totalAmount}
            >
              {/* <img src={Logo} alt="Company Logo" className="invoice-logo" /> */}
            </Invoice>
          )}
        </div>

        <div className="transactions no-print">
          <Transactions
            transactions={transactions}
            updateTransactions={updateTransactions}
          />
          <button className="no-print" onClick={handleTransactionsPrint}>
            Print Transactions
          </button>
        </div>

        <div className="print-only">
          {printTransactions && <Transactions transactions={transactions} />}
        </div>
      </div>
    </div>
  );
}

export default App;
