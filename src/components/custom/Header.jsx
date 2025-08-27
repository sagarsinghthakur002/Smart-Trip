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
import { useGoogleLogin } from "@react-oauth/google"; // Hook to login with Google
import { FcGoogle } from "react-icons/fc";
import axios from "axios"; // For API requests
import AOS from "aos"; 
import "aos/dist/aos.css"; 

const Header = () => {
  // States to store logged-in user info and dialog open state
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Initialize AOS animation on component load
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);



  // Check if user is already logged in by checking localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set user data from localStorage
    }
  }, []);



  // Google login function
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      GetUserProfile(tokenResponse); // Fetch user profile after successful login
    },
    onError: (error) => console.error("Login Failed:", error), // Log error if login fails
  });



  // Function to get user profile from Google using token
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
      // Save user info in localStorage and update state
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false); // Close dialog
    } catch (error) {
      console.error("Error fetching user profile:", error); // Handle error
    }
  };


  return (
    // Header container
    <div className="flex justify-between items-center p-4 xl:px-20 cursor-auto bg-black" data-aos="fade-down">
      
      {/* Left: Logo with animation */}
      <a href="/" data-aos="fade-right">
        <img className="w-20 sm:w-36 py-2" src={logo} alt="Planner Logo" />
      </a>

      {/* Right: Conditional rendering based on user login */}
      <div data-aos="zoom-in">
        {user ? (
          // If user is logged in, show buttons and profile picture
          <div className="flex items-center gap-2">

            {/* Link to create a new trip */}
            <a href="/create-trip">
              <button className="border border-gray-300 rounded-full px-2 py-2 text-white-200">+ Create Trip</button>
            </a>

            {/* Link to view user's trips */}
            <a href="/my-trips">
              <button className="border border-gray-300 rounded-full px-4 py-2">My Trip</button>
            </a>




            {/* Popover showing user info and logout option */}
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
                  
                  {/* Logout button */}
                  <h2
                    className="font-bold cursor-pointer text-blue-700 hover:text-[#8340cf]"
                    onClick={() => {
                      googleLogout(); // Log out from Google
                      localStorage.clear(); // Clear localStorage
                      window.location.reload(); // Reload the page
                    }}
                  >
                    Logout
                  </h2>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          
        ) : (
          // If user is not logged in, show Sign In button
          <button onClick={() => setOpenDialog(true)} data-aos="zoom-in">Sign In</button>
        )}
      </div>


      {/* Dialog box to show Sign In with Google */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gray-900">
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>

            <div className="p-5 rounded-lg">
              <h2 className="font-bold text-lg mt-7 text-white">Sign In With Google</h2>
              <p className="text-gray-300">Sign in securely with Google authentication.</p>

              {/* Google Sign In button */}
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
