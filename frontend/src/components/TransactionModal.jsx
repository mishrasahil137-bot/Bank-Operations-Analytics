
import { useState, useEffect } from "react";
import api from "../services/api";

function TransactionModal({ onClose, onSuccess, editData = null }) {
  const [form, setForm] = useState({
    bankName: "HDFC Bank",
    type: "deposit",
    amount: "",
    remarks: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        bankName: editData.bankName,
        type: editData.type,
        amount: editData.amount,
        remarks: editData.remarks || "",
      });
    }
  }, [editData]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (editData) {
        await api.put(`/transactions/${editData._id}`, form);
      } else {
        await api.post("/transactions", form);
      }

      onSuccess();
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Save Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-3xl p-8 w-full max-w-md border border-white/10">

        <h2 className="text-2xl font-bold mb-6">
          {editData ? "Edit Transaction" : "New Transaction"}
        </h2>

        <form onSubmit={submit} className="space-y-4">

          <select
            value={form.bankName}
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
            className="w-full bg-slate-800 rounded-xl p-3"
          >
            <option>HDFC Bank</option>
            <option>SBI</option>
            <option>ICICI Bank</option>
            <option>Axis Bank</option>
          </select>

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full bg-slate-800 rounded-xl p-3"
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
            <option value="atm">ATM</option>
            <option value="internetTransfer">Internet Transfer</option>
          </select>

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
            placeholder="Amount"
            className="w-full bg-slate-800 rounded-xl p-3"
            required
          />

          <textarea
            value={form.remarks}
            onChange={(e) =>
              setForm({ ...form, remarks: e.target.value })
            }
            placeholder="Remarks"
            className="w-full bg-slate-800 rounded-xl p-3"
          />

          <div className="flex gap-3">

            <button className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl py-3">
              {editData ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 rounded-xl py-3"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default TransactionModal;