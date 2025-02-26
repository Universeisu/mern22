import { Outlet, Link } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaShoppingCart,
  FaUsers,
  FaPlus,
  FaCog,
  FaHeadset,
} from "react-icons/fa";

const DashboardLayout = () => {
  const isAdmin = true;

  return (
    <div className="flex h-auto bg-gray-100 ">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col h-auto">
        {/* Admin Profile */}
        <div className="flex flex-col items-center border-b pb-4">
          <img
            src="/Logo.jpg"
            alt="Admin Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <span className="badge badge-primary bg-purple-600 text-white px-2 py-1 text-sm rounded">
            Admin
          </span>
        </div>

        {/* Admin Menu */}
        <nav className="mt-5 space-y-2">
          <p className="text-gray-400 font-semibold text-sm">Admin Panel</p>
          <Link
            to="/dashboard"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaClipboardList className="mr-2" /> Dashboard
          </Link>
          <Link
            to="/manage-orders"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaShoppingCart className="mr-2" /> Manage Orders
          </Link>
          <Link
            to="/dashboard/add-product"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaPlus className="mr-2" /> Add Product
          </Link>
          <Link
            to="/dashboard/manage-items"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaCog className="mr-2" /> Manage Items
          </Link>
          <Link
            to="/dashboard/manage-User"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaUsers className="mr-2" /> All Users
          </Link>
        </nav>

        {/* General Menu */}
        <nav className="mt-5 space-y-2">
          <p className="text-gray-400 font-semibold text-sm">General</p>
          <Link
            to="/home"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <Link
            to="/product"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaBox className="mr-2" /> Product
          </Link>
          <Link
            to="/order-tracking"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaClipboardList className="mr-2" /> Order Tracking
          </Link>
          <Link
            to="/customer-support"
            className="flex items-center p-2 rounded hover:bg-gray-200"
          >
            <FaHeadset className="mr-2" /> Customer Support
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {isAdmin ? (
          <div>
            <h1 className="text-2xl font-bold"></h1>
            <Outlet />
          </div>
        ) : (
          <div className="text-red-500 text-lg">You are not an Admin</div>
        )}
      </main>
    </div>
  );
};

export default DashboardLayout;
