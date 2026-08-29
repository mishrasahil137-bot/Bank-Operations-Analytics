import { FaChartLine, FaExchangeAlt, FaUsers, FaFileAlt, FaSignOutAlt, FaUniversity } from "react-icons/fa";

export default function Sidebar() {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
      <div className="flex items-center gap-3 mb-10">
        <FaUniversity className="text-3xl text-blue-400" />
        <div>
          <h2 className="font-bold text-xl text-white">Bank Analytics</h2>
          <p className="text-slate-400 text-sm">Enterprise Suite</p>
        </div>
      </div>

      <nav className="space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white">
          <FaChartLine /> Dashboard
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
          <FaExchangeAlt /> Transactions
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
          <FaUsers /> Managers
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800">
          <FaFileAlt /> Reports
        </button>
      </nav>

      <button
        onClick={logout}
        className="mt-12 w-full bg-red-600 hover:bg-red-700 rounded-xl py-3 flex items-center justify-center gap-2 text-white"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}