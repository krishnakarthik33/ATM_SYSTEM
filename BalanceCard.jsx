const BalanceCard = ({ balance, accountNumber }) => {
  return (
    <div className="balance-card">
      <h2>Current Balance</h2>

      <h1>₹ {balance}</h1>

      <p>Account No: {accountNumber}</p>
    </div>
  );
};

export default BalanceCard;