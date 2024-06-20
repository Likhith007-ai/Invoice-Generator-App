import React, { useState } from "react";

const Transactions = ({ transactions, updateTransactions }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedTransaction({ ...transactions[index] });
  };

  const handleDelete = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    updateTransactions(updatedTransactions);
  };

  const handleSave = () => {
    const updatedTransactions = transactions.map((transaction, index) =>
      index === editIndex ? editedTransaction : transaction
    );
    updateTransactions(updatedTransactions);
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      customerName: "",
      customerMobile: "",
      customerAddress: "",
      totalAmount: 0,
    };
    updateTransactions([...transactions, newTransaction]);
    setEditIndex(transactions.length); // Start editing the newly added transaction
    setEditedTransaction(newTransaction);
  };

  return (
    <div>
      <h3>Daily Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Customer Mobile No</th>
            <th>Customer Address</th>
            <th>Total Amount</th>
            <th className="no-print">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="date"
                      value={editedTransaction.date}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="customerName"
                      value={editedTransaction.customerName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="customerMobile"
                      value={editedTransaction.customerMobile}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="customerAddress"
                      value={editedTransaction.customerAddress}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="totalAmount"
                      value={editedTransaction.totalAmount}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td className="no-print">
                    <button onClick={handleSave}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{transaction.date}</td>
                  <td>{transaction.customerName}</td>
                  <td>{transaction.customerMobile}</td>
                  <td>{transaction.customerAddress}</td>
                  <td>{transaction.totalAmount}</td>
                  <td className="no-print">
                    <button onClick={() => handleEdit(index)} title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button onClick={() => handleDelete(index)} title="Delete">
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="no-print" onClick={handleAddTransaction}>
        Add Transaction
      </button>
    </div>
  );
};

export default Transactions;
