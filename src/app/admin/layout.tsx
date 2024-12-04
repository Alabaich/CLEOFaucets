"use client";

import { AuthProvider } from "../../context/AuthContext";
import SideMenu from "../../components/SideMenu";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Side Menu */}
        <SideMenu />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </AuthProvider>
  );
};

export default AdminLayout;
