
const Transaction = require("../models/Transaction");

// Dashboard Summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transactions = await Transaction.find();

    const todayTransactions = transactions.filter(
      (t) => new Date(t.transactionDate) >= today
    );

    const calculate = (list, type) =>
      list.filter((t) => t.type === type)
          .reduce((sum, t) => sum + t.amount, 0);

    const todayDeposit = calculate(todayTransactions, "deposit");
    const todayWithdrawal = calculate(todayTransactions, "withdrawal");
    const todayATM = calculate(todayTransactions, "atm");
    const todayInternet = calculate(todayTransactions, "internet_transfer");

    const totalDeposit = calculate(transactions, "deposit");
    const totalWithdrawal = calculate(transactions, "withdrawal");
    const totalATM = calculate(transactions, "atm");
    const totalInternet = calculate(transactions, "internet_transfer");

    res.json({
      success: true,
      today: {
        deposit: todayDeposit,
        withdrawal: todayWithdrawal,
        atm: todayATM,
        internetTransfer: todayInternet,
        netCashFlow:
          todayDeposit - todayWithdrawal - todayATM - todayInternet,
      },
      overall: {
        deposit: totalDeposit,
        withdrawal: totalWithdrawal,
        atm: totalATM,
        internetTransfer: totalInternet,
        runningBalance:
          totalDeposit - totalWithdrawal - totalATM - totalInternet,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Bank-wise Summary
exports.getBankSummary = async (req, res) => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: "$bankName",
          deposit: {
            $sum: {
              $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0],
            },
          },
          withdrawal: {
            $sum: {
              $cond: [{ $eq: ["$type", "withdrawal"] }, "$amount", 0],
            },
          },
          atm: {
            $sum: {
              $cond: [{ $eq: ["$type", "atm"] }, "$amount", 0],
            },
          },
          internetTransfer: {
            $sum: {
              $cond: [
                { $eq: ["$type", "internet_transfer"] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          bankName: "$_id",
          deposit: 1,
          withdrawal: 1,
          atm: 1,
          internetTransfer: 1,
          balance: {
            $subtract: [
              "$deposit",
              {
                $add: [
                  "$withdrawal",
                  "$atm",
                  "$internetTransfer",
                ],
              },
            ],
          },
        },
      },
    ]);

    res.json({
      success: true,
      banks: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Date Range Summary
exports.getDateSummary = async (req, res) => {
  try {
    const { from, to } = req.query;

    const start = new Date(from);
    const end = new Date(to);
    end.setHours(23, 59, 59, 999);

    const transactions = await Transaction.find({
      transactionDate: {
        $gte: start,
        $lte: end,
      },
    });

    const calculate = (type) =>
      transactions
        .filter((t) => t.type === type)
        .reduce((sum, t) => sum + t.amount, 0);

    const deposit = calculate("deposit");
    const withdrawal = calculate("withdrawal");
    const atm = calculate("atm");
    const internetTransfer = calculate("internet_transfer");

    res.json({
      success: true,
      from,
      to,
      summary: {
        deposit,
        withdrawal,
        atm,
        internetTransfer,
        balance:
          deposit - withdrawal - atm - internetTransfer,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};