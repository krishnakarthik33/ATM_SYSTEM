import { useState } from "react";

const WithdrawForm = ({ onWithdraw }) => {
  const [amount, setAmount] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onWithdraw(amount);

    setAmount("");
  };

  return (
    <form className="action-form" onSubmit={submitHandler}>
      <h3>Withdraw</h3>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Withdraw</button>
    </form>
  );
};

export default WithdrawForm;