const TransactionCard = ({ transaction }) => {
  return (
    <div className="transaction-card">
      <h4>{transaction.type.toUpperCase()}</h4>

      <p>Amount: ₹ {transaction.amount}</p>

      {transaction.receiverAccount && (
        <p>
          Receiver: {transaction.receiverAccount}
        </p>
      )}

      <small>
        {new Date(
          transaction.createdAt
        ).toLocaleString()}
      </small>
    </div>
  );
};

export default TransactionCard;