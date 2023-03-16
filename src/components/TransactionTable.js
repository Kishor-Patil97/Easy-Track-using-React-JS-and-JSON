import React, { useState, useEffect } from "react";
import "./TransactionTable.css";
import data from "../data/data.json";

const TransactionTable = () => {
  const [transactionData, setTransactionData] = useState(data);

  useEffect(() => {
    const jsonData = JSON.stringify(transactionData);
    localStorage.setItem("data", jsonData);
  }, [transactionData]);

  const handleDelete = (index) => {
    const newData = transactionData.filter((_, i) => i !== index);
    setTransactionData(newData);
  };

  const handleUpdate = (index) => {
    const newData = transactionData.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          amount: parseInt(prompt("Enter new amount:", item.amount)),
          category: prompt("Enter new category:", item.category),
          note: prompt("Enter new note:", item.note),
          date: prompt("Enter new date (yyyy-mm-dd):", item.date),
        };
      }
      return item;
    });
    setTransactionData(newData);
  };

  return (
    <div>
      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Note</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.note}</td>
                <td>{transaction.date}</td>
                <td>
                  <button onClick={() => handleUpdate(index)}>Update</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable;
