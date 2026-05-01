import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Link, Outlet, useLocation } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminLayout = () => {

const {navigate, setAdmin, axios, BACKEND_URL} = useContext(AppContext);
const location = useLocation();

    const sidebarLinks = [
        { name: "Categories", path: "/admin"},
        { name: "Add Category", path: "/admin/add-category" },
        { name: "Companies", path:"/admin/all-companies"  },
        { name: "Applications", path:"/admin/all-applications"  },
        { name: "All Users", path:"/admin/all-users"  },
        { name: "Jobs", path:"/admin/jobs"  },
    ];


    const logout = async () => {
        try {
            const {data} = await axios.get(`${BACKEND_URL}/auth/logout`);
            if(data.success) {
                setAdmin(false);
                navigate("/");
                toast.success("Logged out successfully");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed")
        } 
    }
    return (
        <>
            <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
                <Link to = {"/admin"}>
                <img src={assets.logo} alt="" />
                </Link>
                <div className="flex items-center gap-5 text-gray-500">
                    <p>Hi! Admin</p>
                    <button
                     onClick={logout} 
                    className='border rounded-full text-sm px-4 py-1 cursor-pointer hover:bg-gray-50'>Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[550px] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
                {sidebarLinks.map((item, index) => (
                    <Link to={item.path} key={index}
                        className={`flex items-center py-3 px-4 gap-3 
                            ${location.pathname === item.path
                                ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                                : "hover:bg-gray-100/90 border-white text-gray-700"
                            }`
                        }
                    >
                        <p className="hidden md:block text-center">{item.name}</p>
                    </Link>
                ))}
            </div>
            <div className="flex-1">
              <Outlet />
            </div>
            </div>   
        </>
    );
};
export default AdminLayout;