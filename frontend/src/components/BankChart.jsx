import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function BankChart({ transactions }) {
  const summary = {};

  transactions.forEach((t) => {
    summary[t.bankName] = (summary[t.bankName] || 0) + Number(t.amount);
  });

  const data = Object.keys(summary).map((bank) => ({
    bank,
    amount: summary[bank],
  }));

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8">
      <h2 className="text-xl font-bold text-white mb-4">Bank-wise Deposits</h2>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="bank" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}