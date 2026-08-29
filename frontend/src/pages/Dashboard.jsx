import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaSearch, FaSyncAlt } from "react-icons/fa";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import BankChart from "../components/BankChart";
import TransactionModal from "../components/TransactionModal";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const [t, d] = await Promise.all([
      api.get("/transactions"),
      api.get("/dashboard"),
    ]);
    setTransactions(t.data.transactions || []);
    setSummary(d.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const remove = async (id) => {
    if (!confirm("Delete transaction?")) return;
    await api.delete(`/transactions/${id}`);
    loadData();
  };

  const filtered = transactions.filter((t) =>
    t.bankName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 text-white">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welcome, Super Admin</h1>
            <p className="text-slate-400">Admin</p>
          </div>

          <div className="flex gap-3">
            <button onClick={loadData} className="bg-slate-800 px-4 py-3 rounded-xl flex gap-2 items-center">
              <FaSyncAlt /> Refresh
            </button>

            <button
              onClick={() => {
                setEditData(null);
                setShowModal(true);
              }}
              className="bg-blue-600 px-5 py-3 rounded-xl flex gap-2 items-center"
            >
              <FaPlus /> New Transaction
            </button>
          </div>
        </div>

        {summary && (
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="bg-slate-900 rounded-2xl p-6">
              <p className="text-slate-400">Today's Deposit</p>
              <h2 className="text-3xl font-bold text-green-400">
                ₹{summary.today.deposit.toLocaleString()}
              </h2>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6">
              <p className="text-slate-400">Running Balance</p>
              <h2 className="text-3xl font-bold text-blue-400">
                ₹{summary.overall.runningBalance.toLocaleString()}
              </h2>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6">
              <p className="text-slate-400">Cash Flow</p>
              <h2 className="text-3xl font-bold text-yellow-400">
                ₹{summary.today.netCashFlow.toLocaleString()}
              </h2>
            </div>
          </div>
        )}

        <div className="bg-slate-900 rounded-xl p-3 flex items-center gap-3 mb-6">
          <FaSearch className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Bank..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        <div className="bg-slate-900 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">Bank</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Remarks</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t._id} className="border-t border-slate-800">
                  <td className="p-4">{t.bankName}</td>
                  <td className="p-4 capitalize">{t.type}</td>
                  <td className="p-4">₹{Number(t.amount).toLocaleString()}</td>
                  <td className="p-4">{t.remarks}</td>
                  <td className="p-4">
                    {new Date(t.transactionDate).toLocaleDateString("en-IN")}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setEditData(t);
                          setShowModal(true);
                        }}
                        className="text-blue-400"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => remove(t._id)}
                        className="text-red-400"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <BankChart transactions={transactions} />

        {showModal && (
          <TransactionModal
            editData={editData}
            onClose={() => setShowModal(false)}
            onSuccess={loadData}
          />
        )}
      </main>
    </div>
  );
}