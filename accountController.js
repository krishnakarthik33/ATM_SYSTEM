import Account from "../models/Account.js";

import Transaction from "../models/Transaction.js";

export const getBalance = async (req, res) => {
  try {
    const account = await Account.findOne({
      user: req.user._id,
    });

    res.json(account);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const depositMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const account = await Account.findOne({
      user: req.user._id,
    });

    account.balance += Number(amount);

    await account.save();

    await Transaction.create({
      user: req.user._id,
      type: "deposit",
      amount,
    });

    res.json({
      message: "Money deposited",
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const withdrawMoney = async (req, res) => {
  try {
    const { amount } = req.body;

    const account = await Account.findOne({
      user: req.user._id,
    });

    if (account.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    account.balance -= Number(amount);

    await account.save();

    await Transaction.create({
      user: req.user._id,
      type: "withdraw",
      amount,
    });

    res.json({
      message: "Money withdrawn",
      balance: account.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const transferMoney = async (req, res) => {
  try {
    const { receiverAccountNumber, amount } = req.body;

    const senderAccount = await Account.findOne({
      user: req.user._id,
    });

    const receiverAccount = await Account.findOne({
      accountNumber: receiverAccountNumber,
    });

    if (!receiverAccount) {
      return res.status(404).json({
        message: "Receiver account not found",
      });
    }

    if (senderAccount.balance < amount) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    senderAccount.balance -= Number(amount);

    receiverAccount.balance += Number(amount);

    await senderAccount.save();

    await receiverAccount.save();

    await Transaction.create({
      user: req.user._id,
      type: "transfer",
      amount,
      receiverAccount: receiverAccountNumber,
    });

    res.json({
      message: "Transfer successful",
      balance: senderAccount.balance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};