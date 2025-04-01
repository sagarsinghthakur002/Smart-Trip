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

const CreateTrip = () => {
  const [place, setPlace] = useState();

  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const[loading,setLoading]=useState(false);

  const navigate=useNavigate();

  // Update form data
  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && (value < 1 || value > 7)) {
      toast("Please enter a trip duration between 1 and 7 days.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
      toast("Please fill all details.");
      return;
    }

    setLoading(true);

    console.log("Form Data:", formData);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    

      try {
        const result = await chatSession.sendMessage(FINAL_PROMPT);
        const tripData = result?.response?.text(); // Ensure result is defined
    
        console.log("AI Response:", tripData);
    
        if (tripData) {
          await SaveAiTrip(tripData);
        } else {
          throw new Error("AI response is empty.");
        }
      } catch (error) {
        console.error("Error generating trip:", error);
      } finally {
        setLoading(false); // Ensure loading stops in all cases
      }
    };

    const SaveAiTrip = async (tripData) => {
      setLoading(true);
    
      const user = JSON.parse(localStorage.getItem("user"));
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
    
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: parsedTripData, 
        userEmail: user?.email,
        id: docId,
      });
    
      setLoading(false);
      navigate(`/View-trip/` + docId);
    };
    
    

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-10 mt-10">
      <h2 className="font-bold text-3xl">Tell us your preferences 🏖️🏝️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        {/* Google Place API */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
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
        <div>
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
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg ${formData?.budget === item.title ? "shadow-lg border-blue-700" : ""
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
        <div>
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg ${formData?.traveler === item.people ? "shadow-lg border-blue-700" : ""
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex justify-end mt-10">
          <button
          disabled={loading}
            onClick={OnGenerateTrip}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" /> : "Generate Trip"}
          </button>
        </div>

        {/* Sign-In Dialog */}
        <Dialog open={openDialog}>
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
    </div>
  );
};

export default CreateTrip;
