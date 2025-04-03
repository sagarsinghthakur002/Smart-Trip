import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Planner.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  // State to hold user data from local storage
  const [user, setUser] = useState(null);

  // Retrieve user data when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex justify-between items-center p-4 px-5">
      {/* Logo */}
      <img className="w-44" src={logo} alt="Planner Logo" />

      <div>
        {user ? (
          <div className="flex items-center gap-2">
            {/* My Trip Button */}
            <button className="border border-gray-300 rounded-full px-3 py-1">
              My Trip
            </button>

            {/* Profile Popover */}
            <Popover>
            <PopoverTrigger>
  <img
    src={user?.picture || "https://via.placeholder.com/35"} // Fallback image
    className='h-[35px] w-[35px] rounded-full'
    alt="User Profile"
  />
</PopoverTrigger>

              <PopoverContent>
                <div className="p-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <h2 className="font-bold">Logout</h2>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          // Sign In Button (if no user)
          <button >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
