import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { selectBudgetOptions, selectTravelsList, AI_PROMPT } from "../constants/options.jsx";
import { toast } from "sonner";
import { chatSession } from "../service/AIModal.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Footer from "@/view-trip/components/Footer.jsx";

const CreateTrip = () => {

  const [place, setPlace] = useState();                                 // State to store selected place

  const [formData, setFormData] = useState({});                        // State to store form data

  const [openDialog, setOpenDialog] = useState(false); 
  
  const[loading,setLoading]=useState(false);

  const navigate=useNavigate();                                       // Hook to navigate to different routes

  // Update form data
  const handleInputChange = (name, value) => {
    
    if (name === "noOfDays" && (value < 1 || value > 7)) {
      toast("Please enter a trip duration between 1 and 7 days.");
      return;
    }

    setFormData((prevData) => ({                                     // Update form data state
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {                                                   // Log form data changes
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({                                      // Function to handle Google login
    onSuccess: (tokenResponse) => {
      GetUserProfile(tokenResponse);
    },
    onError: (error) => console.error("Login Failed:", error),
  });

  const GetUserProfile = async (tokenInfo) => {                       // Function to fetch user profile from Google API
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

      console.log("User Info:", response.data);                         // Log user info
      localStorage.setItem("user", JSON.stringify(response.data));      // Store user info in localStorage
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const OnGenerateTrip = async () => {                                    // Function to generate trip itinerary
    const user = localStorage.getItem("user");

    if (!user) {// Check if user is logged in
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {     // Check if all form fields are filleds
      toast("Please fill all details.");
      return;
    }

    setLoading(true);

    console.log("Form Data:", formData);

    const FINAL_PROMPT = AI_PROMPT                                  // Prompt for AI model
      .replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    

      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const tripData = result?.response?.text();                          // Ensure result is defined
    
        console.log("AI Response:", tripData);
    
        if (tripData) {
          await SaveAiTrip(tripData);
        } else {
          throw new Error("AI response is empty.");
        }
      } catch (error) {
        console.error("Error generating trip:", error);
      } finally {
        setLoading(false);                                               
      }
    };

    const SaveAiTrip = async (tripData) => {                            // Function to save generated trip data to Firestore
      setLoading(true);
    
      const user = JSON.parse(localStorage.getItem("user"));                 // Get user data from localStorage
      const docId = Date.now().toString();
    
      let parsedTripData;
    
      try {
        console.log("Raw tripData before parsing:", tripData); 
    
        parsedTripData = typeof tripData === "string" ? JSON.parse(tripData) : tripData;
    
        console.log("Parsed tripData successfully:", parsedTripData);
    } catch (error) {
        console.error("Error parsing tripData:", error.message);
        console.error("Problematic tripData:", tripData);
        
        parsedTripData = {};
      }
    
      await setDoc(doc(db, "AITrips", docId), {                                   // Save trip data to Firestore
        userSelection: formData,
        tripData: parsedTripData, 
        userEmail: user?.email,
        id: docId,
      });
    
      setLoading(false);
      navigate(`/View-trip/` + docId);                                         // Navigate to the trip view page with the document ID
    };
    
    

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-10 ">
      <h2 data-aos="fade-right" className="font-bold text-3xl pt-28">Tell us your preferences 🏖️🏝️</h2>
      <p data-aos="fade-right" className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div data-aos="fade-right" className="mt-10 flex flex-col gap-10">



        {/* Google Place API */}     
        <div>                                                 
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete                                               //from react-ggogle-place-autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
              styles: {
                input: (provided) => ({ ...provided, color: "black" }),
                singleValue: (provided) => ({ ...provided, color: "black" }),
                option: (provided) => ({ ...provided, color: "black" }),
              },
            }}
          />
        </div>



        {/* Trip Duration */}
        <div data-aos="fade-right" className="hover:shadow-lg p-4 rounded-md border">
          <h2 className="text-xl my-3 font-medium">How many days are you planning for your trip?</h2>
          <input
            type="number"
            placeholder={"Ex. 3"}
            className="border p-2 rounded-md w-full"
            min="1"
            max="7"
            onChange={(e) => handleInputChange("noOfDays", Number(e.target.value))}
            value={formData?.noOfDays || ""}
          />
        </div>



        {/* Budget Selection */}
        <div data-aos="zoom-in">
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={` p-4  hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden ${formData?.budget === item.title ? "shadow-lg border-blue-700" : ""
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Travel Companion Selection */}
        <div data-aos="fade-up">
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={` p-4  hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden ${formData?.traveler === item.people ? "shadow-lg border-blue-700" : ""
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
                <p className="text-gray-600">{item.people}</p>
              </div>
            ))}
          </div>
        </div>



        {/* Generate Trip Button */}
        <div  className="flex justify-end mt-10 ">
          <button
          disabled={loading}
            onClick={OnGenerateTrip}
            className="bg-[#2945a1ad] text-white px-6 py-2 rounded-md hover:bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] disabled:bg-gray-400"
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" /> : "Generate Trip ✨"}
          </button>
        </div>



        <div>
              <Footer />
        </div>

        



        {/* Sign-In Dialog */}
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
    </div>
  );
};

export default CreateTrip;
