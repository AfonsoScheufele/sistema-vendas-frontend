import { FaBell, FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 text-lg cursor-pointer" />
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer" />
      </div>
    </header>
  );
}
