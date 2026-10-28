import {Menu} from "lucide-react";
export default function Navbar({setSidebarOpen}) {
  return (
    <div className="h-16 bg-white border-b px-6 flex items-center justify-between">
      <Menu size={30} className="md:hidden" onClick={()=>setSidebarOpen(prev=>!prev) }/>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <h2>Admin</h2>
    </div>
  );
}
