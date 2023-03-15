import React, { useState } from "react";
import "./App.css";
import TransactionTable from "./components/TransactionTable";
import { Routes, Route } from "react-router";
import Form from "./components/Form";
import { writeToJSON } from "./data/writeToJSON";

function App() {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);
    writeToJSON(transactions);
  };

  return (
    <div className="App">
      <h1>EasyTrack</h1>

      <Routes>
        <Route
          path="/"
          element={<Form handleAddTransaction={handleAddTransaction} />}
        />
        <Route
          path="/TransactionTable"
          element={<TransactionTable transactions={transactions} />}
        />
      </Routes>
    </div>
  );
}

export default App;
