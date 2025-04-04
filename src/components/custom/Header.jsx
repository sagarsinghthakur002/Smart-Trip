import React, { useEffect, useState } from "react";
import logo from "../../assets/images/Planner.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GetUserProfile(tokenResponse);
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("User Info:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data); // Important: Update state!
      setOpenDialog(false);
      // OnGenerateTrip(); ← remove or define if necessary
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 px-5">
      {/* Logo */}
      <img className="w-44" src={logo} alt="Planner Logo" />

      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <a href="/create-trip">
            <button className="border border-gray-300 rounded-full px-3 py-1">
              + Create Trip
            </button>
            </a>

            <a href="/my-trips">
            <button className="border border-gray-300 rounded-full px-3 py-1">
              My Trip
            </button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture || "https://via.placeholder.com/35"}
                  className="h-[35px] w-[35px] rounded-full"
                  alt="User Profile"
                />
              </PopoverTrigger>

              <PopoverContent>
                <div className="p-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <h2
                    className="font-bold cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button onClick={() => setOpenDialog(true)}>Sign In</button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <div>
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in securely with Google authentication.</p>
              <button
                onClick={login}
                className="w-full mt-5 flex items-center justify-center py-2 border rounded-lg gap-5"
              >
                <FcGoogle className="w-6 h-6" />
                Sign In With Google
              </button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Header;
