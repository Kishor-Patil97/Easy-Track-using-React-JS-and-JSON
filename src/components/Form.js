import React, { useState } from "react";
import "./Form.css";

const Form = ({ handleAddTransaction }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      amount: parseInt(amount),
      category,
      note,
      date,
    };

    handleAddTransaction(newTransaction);

    resetForm();
  };

  const resetForm = () => {
    setAmount("");
    setCategory("");
    setNote("");
    setDate("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          <option value="income">Income</option>
          <option value="rent">Rent</option>
          <option value="utilities">Utilities</option>
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="miscellaneous">Miscellaneous</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="note">Note:</label>
        <input
          type="text"
          id="note"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default Form;
