import React, { useState, useEffect } from "react";
import "./TransactionTable.css";
import axios from "axios";

const TransactionTable = (props) => {
  const [transactionData, setTransactionData] = useState(props.data);

  useEffect(() => {
    axios.get("http://localhost:5000/transactions").then((res) => {
      const jsonData = res.data;
      setTransactionData(jsonData);
    });
  }, []);

  const handleDelete = (index, id) => {
    axios.delete(`http://localhost:5000/transactions/${id}`).then(() => {
      const newData = transactionData.filter((_, i) => i !== index);
      setTransactionData(newData);
    });
  };

  const handleUpdate = (index, id) => {
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
    axios
      .put(`http://localhost:5000/transactions/${id}`, newData[index])
      .then(() => {
        setTransactionData(newData);
      });
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
                  <button onClick={() => handleUpdate(index, transaction.id)}>
                    Update
                  </button>
                  <button onClick={() => handleDelete(index, transaction.id)}>
                    Delete
                  </button>
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
