import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import AuthContext from "../context/AuthContext";

import BalanceCard from "../components/BalanceCard";

import DepositForm from "../components/DepositForm";

import WithdrawForm from "../components/WithdrawForm";

import TransferForm from "../components/TransferForm";

import TransactionCard from "../components/TransactionCard";

const Dashboard = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext);

  const [account, setAccount] = useState(null);

  const [transactions, setTransactions] = useState([]);

  const [message, setMessage] = useState("");

  const getBalance = async () => {
    try {
      const { data } = await API.get(
        "/account/balance"
      );

      setAccount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactions = async () => {
    try {
      const { data } = await API.get(
        "/transactions"
      );

      setTransactions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBalance();

    getTransactions();
  }, []);

  const depositHandler = async (amount) => {
    try {
      const { data } = await API.post(
        "/account/deposit",
        {
          amount,
        }
      );

      setMessage(data.message);

      getBalance();

      getTransactions();
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawHandler = async (amount) => {
    try {
      const { data } = await API.post(
        "/account/withdraw",
        {
          amount,
        }
      );

      setMessage(data.message);

      getBalance();

      getTransactions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Withdraw failed"
      );
    }
  };

  const transferHandler = async (
    receiverAccountNumber,
    amount
  ) => {
    try {
      const { data } = await API.post(
        "/account/transfer",
        {
          receiverAccountNumber,
          amount,
        }
      );

      setMessage(data.message);

      getBalance();

      getTransactions();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Transfer failed"
      );
    }
  };

  const logoutHandler = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="top-bar">
        <h1>ATM Dashboard</h1>

        <button onClick={logoutHandler}>
          Logout
        </button>
      </div>

      {message && (
        <div className="message-box">{message}</div>
      )}

      {account && (
        <BalanceCard
          balance={account.balance}
          accountNumber={account.accountNumber}
        />
      )}

      <div className="actions-grid">
        <DepositForm onDeposit={depositHandler} />

        <WithdrawForm onWithdraw={withdrawHandler} />

        <TransferForm onTransfer={transferHandler} />
      </div>

      <div className="transactions-section">
        <h2>Transaction History</h2>

        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction._id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;