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
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

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
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 px-5 cursor-auto bg-black" data-aos="fade-down">
      <a href="/" data-aos="fade-right"><img className="w-24 sm:w-44" src={logo} alt="Planner Logo" /></a>

      <div data-aos="zoom-in">
        {user ? (
          <div className="flex items-center gap-2">
            <a href="/create-trip">
              <button className="border border-gray-300 rounded-full px-2 py-2 text-white-200">+ Create Trip</button>
            </a>

            <a href="/my-trips">
              <button className="border border-gray-300 rounded-full px-4 py-2">My Trip</button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[35px] w-[35px] rounded-full border object-cover bg-black"
                  alt="User Profile"
                  referrerPolicy="no-referrer"
                  data-aos="flip-left"
                />
              </PopoverTrigger>
              <PopoverContent>
                <div className="p-2">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <h2
                    className="font-bold cursor-pointer text-blue-700 hover:text-[#8340cf]"
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
          <button onClick={() => setOpenDialog(true)} data-aos="zoom-in">Sign In</button>
        )}
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                      <DialogContent className="bg-gray-900">
                        <DialogHeader>
                          <DialogTitle>Sign In Required</DialogTitle>
                          <div className="p-5 rounded-lg">
                            <h2 className="font-bold text-lg mt-7 text-white">Sign In With Google</h2>
                            <p className="text-gray-300">Sign in securely with Google authentication.</p>
              
                            
                            <button
                              onClick={login}
                              className="w-full mt-5 flex items-center justify-center py-2 border border-white rounded-lg gap-5 text-white hover:bg-gray-800"
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
