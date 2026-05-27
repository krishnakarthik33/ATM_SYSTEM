import { useState } from "react";

const TransferForm = ({ onTransfer }) => {
  const [receiverAccountNumber, setReceiver] =
    useState("");

  const [amount, setAmount] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    onTransfer(receiverAccountNumber, amount);

    setReceiver("");

    setAmount("");
  };

  return (
    <form className="action-form" onSubmit={submitHandler}>
      <h3>Transfer</h3>

      <input
        type="text"
        placeholder="Receiver Account Number"
        value={receiverAccountNumber}
        onChange={(e) => setReceiver(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />

      <button type="submit">Transfer</button>
    </form>
  );
};

export default TransferForm;