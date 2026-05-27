import { useState } from "react";

const DepositForm = ({ onDeposit }) => {
  const [amount, setAmount] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onDeposit(amount);

    setAmount("");
  };

  return (
    <form className="action-form" onSubmit={submitHandler}>
      <h3>Deposit</h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Deposit</button>
    </form>
  );
};

export default DepositForm;