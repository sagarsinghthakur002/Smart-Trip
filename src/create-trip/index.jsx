// import React, { useEffect, useState } from "react";
// // import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { selectBudgetOptions, selectTravelsList, AI_PROMPT, countries, cities } from "../constants/options.jsx";
// import { toast } from "sonner";
// import { chatSession } from "../service/AIModal.jsx";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { FcGoogle } from "react-icons/fc";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "../service/firebaseConfig.jsx";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import Footer from "@/view-trip/components/Footer.jsx";

// const CreateTrip = () => {

//   // const [place, setPlace] = useState();                                 // State to store selected place
//   const [selectedCountry, setSelectedCountry] = useState("");           // State to store selected country
//   const [selectedCity, setSelectedCity] = useState("");                // State to store selected city

//   const [formData, setFormData] = useState({});                        // State to store form data

//   const [openDialog, setOpenDialog] = useState(false); 
  
//   const[loading,setLoading]=useState(false);

//   const navigate=useNavigate();                                       // Hook to navigate to different routes

//   // Update form data
//   const handleInputChange = (name, value) => {
    
//     if (name === "noOfDays" && (value < 1 || value > 7)) {
//       toast("Please enter a trip duration between 1 and 7 days.");
//       return;
//     }

//     setFormData((prevData) => ({                                     // Update form data state
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle country selection
//   const handleCountryChange = (country) => {
//     setSelectedCountry(country);
//     setSelectedCity(""); // Reset city when country changes
//     // Update location with country only, city will be added when selected
//     if (country) {
//       handleInputChange("location", country);
//     }
//   };

//   // Handle city selection
//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//     // Update location with city, country format
//     if (city && selectedCountry) {
//       handleInputChange("location", `${city}, ${selectedCountry}`);
//     }
//   };

//   useEffect(() => {                                                   // Log form data changes
//     console.log(formData);
//   }, [formData]);

//   const login = useGoogleLogin({                                      // Function to handle Google login
//     onSuccess: (tokenResponse) => {
//       GetUserProfile(tokenResponse);
//     },
//     onError: (error) => console.error("Login Failed:", error),
//   });

//   const GetUserProfile = async (tokenInfo) => {                       // Function to fetch user profile from Google API
//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenInfo?.access_token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       console.log("User Info:", response.data);                         // Log user info
//       localStorage.setItem("user", JSON.stringify(response.data));      // Store user info in localStorage
//       setOpenDialog(false);
//       OnGenerateTrip();
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//     }
//   };

//   const OnGenerateTrip = async () => {                                    // Function to generate trip itinerary
//     const user = localStorage.getItem("user");

//     if (!user) {// Check if user is logged in
//       setOpenDialog(true);
//       return;
//     }

//     if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {     // Check if all form fields are filleds
//       toast("Please fill all details.");
//       return;
//     }

//     setLoading(true);

//     console.log("Form Data:", formData);

//     const FINAL_PROMPT = AI_PROMPT                                  // Prompt for AI model
//       .replace("{location}", formData?.location)
//       .replace("{totalDays}", formData?.noOfDays)
//       .replace("{traveler}", formData?.traveler)
//       .replace("{budget}", formData?.budget);

    

//       try {
//         const result = await chatSession.sendMessage(FINAL_PROMPT);
//         const tripData = result?.response?.text();                          // Ensure result is defined
    
//         console.log("AI Response:", tripData);
    
//         if (tripData) {
//           await SaveAiTrip(tripData);
//         } else {
//           throw new Error("AI response is empty.");
//         }
//       } catch (error) {
//         console.error("Error generating trip:", error);
//       } finally {
//         setLoading(false);                                               
//       }
//     };

//     const SaveAiTrip = async (tripData) => {                            // Function to save generated trip data to Firestore
//       setLoading(true);
    
//       const user = JSON.parse(localStorage.getItem("user"));                 // Get user data from localStorage
//       const docId = Date.now().toString();
    
//       let parsedTripData;
    
//       try {
//         console.log("Raw tripData before parsing:", tripData); 
    
//         parsedTripData = typeof tripData === "string" ? JSON.parse(tripData) : tripData;
    
//         console.log("Parsed tripData successfully:", parsedTripData);
//     } catch (error) {
//         console.error("Error parsing tripData:", error.message);
//         console.error("Problematic tripData:", tripData);
        
//         parsedTripData = {};
//       }
    
//       await setDoc(doc(db, "AITrips", docId), {                                   // Save trip data to Firestore
//         userSelection: formData,
//         tripData: parsedTripData, 
//         userEmail: user?.email,
//         id: docId,
//       });
    
//       setLoading(false);
//       navigate(`/View-trip/` + docId);                                         // Navigate to the trip view page with the document ID
//     };
    
    

//   return (
//     <div className="sm:px-10 md:px-32 lg:px-56 px-10 ">
//       <h2 data-aos="fade-right" className="font-bold text-3xl pt-28">Tell us your preferences 🏖️🏝️</h2>
//       <p data-aos="fade-right" className="mt-3 text-gray-500 text-xl">
//         Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
//       </p>

//       <div data-aos="fade-right" className="mt-10 flex flex-col gap-10">



//         {/* Destination Selection - Country and City */}
//         <div>                                                 
//           <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          
//           {/* Country Selection */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Select Country</label>
//             <select
//               value={selectedCountry}
//               onChange={(e) => handleCountryChange(e.target.value)}
//               className="border p-2 rounded-md w-full"
//             >
//               <option value="">-- Select Country --</option>
//               {countries.map((country, index) => (
//                 <option key={index} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* City Selection */}
//           {selectedCountry && cities[selectedCountry] && (
//             <div>
//               <label className="block text-sm font-medium mb-2">Select City</label>
//               <select
//                 value={selectedCity}
//                 onChange={(e) => handleCityChange(e.target.value)}
//                 className="border p-2 rounded-md w-full"
//               >
//                 <option value="">-- Select City --</option>
//                 {cities[selectedCountry].map((city, index) => (
//                   <option key={index} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           )}

//           {/* Commented out Google Places API code */}
//           {/* <GooglePlacesAutocomplete
//             apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
//             selectProps={{
//               place,
//               onChange: (v) => {
//                 setPlace(v);
//                 handleInputChange("location", v.label);
//               },
//               styles: {
//                 input: (provided) => ({ ...provided, color: "black" }),
//                 singleValue: (provided) => ({ ...provided, color: "black" }),
//                 option: (provided) => ({ ...provided, color: "black" }),
//               },
//             }}
//           /> */}
//         </div>



//         {/* Trip Duration */}
//         <div data-aos="fade-right" className="hover:shadow-lg p-4 rounded-md border">
//           <h2 className="text-xl my-3 font-medium">How many days are you planning for your trip?</h2>
//           <input
//             type="number"
//             placeholder={"Ex. 3"}
//             className="border p-2 rounded-md w-full"
//             min="1"
//             max="7"
//             onChange={(e) => handleInputChange("noOfDays", Number(e.target.value))}
//             value={formData?.noOfDays || ""}
//           />
//         </div>



//         {/* Budget Selection */}
//         <div data-aos="zoom-in">
//           <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {selectBudgetOptions.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange("budget", item.title)}
//                 className={` p-4  hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden ${formData?.budget === item.title ? "shadow-lg border-blue-700" : ""
//                   }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>



//         {/* Travel Companion Selection */}
//         <div data-aos="fade-up">
//           <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with?</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {selectTravelsList.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleInputChange("traveler", item.people)}
//                 className={` p-4  hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden ${formData?.traveler === item.people ? "shadow-lg border-blue-700" : ""
//                   }`}
//               >
//                 <h2 className="text-4xl">{item.icon}</h2>
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <p className="text-gray-600">{item.desc}</p>
//                 <p className="text-gray-600">{item.people}</p>
//               </div>
//             ))}
//           </div>
//         </div>



//         {/* Generate Trip Button */}
//         <div  className="flex justify-end mt-10 ">
//           <button
//           disabled={loading}
//             onClick={OnGenerateTrip}
//             className="bg-[#2945a1ad] text-white px-6 py-2 rounded-md hover:bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] disabled:bg-gray-400"
//           >
//             {loading ? <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" /> : "Generate Trip ✨"}
//           </button>
//         </div>



//         <div>
//               <Footer />
//         </div>

        



//         {/* Sign-In Dialog */}
//         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//                 <DialogContent className="bg-gray-900">
//                   <DialogHeader>
//                     <DialogTitle>Sign In Required</DialogTitle>
//                     <div className="p-5 rounded-lg">
//                       <h2 className="font-bold text-lg mt-7 text-white">Sign In With Google</h2>
//                       <p className="text-gray-300">Sign in securely with Google authentication.</p>
        
                      
//                       <button
//                         onClick={login}
//                         className="w-full mt-5 flex items-center justify-center py-2 border border-white rounded-lg gap-5 text-white hover:bg-gray-800"
//                       >
//                         <FcGoogle className="w-6 h-6" />
//                         Sign In With Google
//                       </button>
//                     </div>
//                   </DialogHeader>
//                 </DialogContent>
//               </Dialog>
//       </div>
//     </div>
//   );
// };

// export default CreateTrip;


import React, { useEffect, useState } from "react";
import { selectBudgetOptions, selectTravelsList, AI_PROMPT, countries, cities } from "../constants/options.jsx";
import { toast } from "sonner";
import { sendPrompt } from "../service/AIModal.jsx"; // Updated AI call
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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Update form data
  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && (value < 1 || value > 7)) {
      toast("Please enter a trip duration between 1 and 7 days.");
      return;
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle country selection
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedCity("");
    if (country) {
      handleInputChange("location", country);
    }
  };

  // Handle city selection
  const handleCityChange = (city) => {
    setSelectedCity(city);
    if (city && selectedCountry) {
      handleInputChange("location", `${city}, ${selectedCountry}`);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Google login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => GetUserProfile(tokenResponse),
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

  // Generate trip
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
    const location = selectedCity ? `${selectedCity}, ${selectedCountry}` : selectedCountry;
    handleInputChange("location", location);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", location)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    try {
      const tripData = await sendPrompt(FINAL_PROMPT);
      console.log("AI Response:", tripData);
      if (tripData) await SaveAiTrip(tripData);
      else throw new Error("AI response is empty.");
    } catch (error) {
      console.error("Error generating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save AI trip to Firestore
  const SaveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    let parsedTripData;
    
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanedData = tripData;
      if (typeof tripData === "string") {
        // Remove markdown code blocks (```json ... ```)
        cleanedData = tripData.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        // Try to parse JSON
        parsedTripData = JSON.parse(cleanedData);
      } else {
        parsedTripData = tripData;
      }
      
      console.log("Parsed tripData successfully:", parsedTripData);
      
      // Validate structure - ensure hotels and itinerary exist
      if (!parsedTripData.hotels || !Array.isArray(parsedTripData.hotels)) {
        console.warn("Hotels array missing or invalid, initializing empty array");
        parsedTripData.hotels = [];
      }
      
      if (!parsedTripData.itinerary || typeof parsedTripData.itinerary !== "object") {
        console.warn("Itinerary missing or invalid, initializing empty object");
        parsedTripData.itinerary = {};
      }
      
    } catch (error) {
      console.error("Error parsing tripData:", error.message);
      console.error("Raw tripData:", tripData);
      toast.error("Failed to parse AI response. Please try again.");
      parsedTripData = {
        hotels: [],
        itinerary: {}
      };
    }

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: parsedTripData,
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
    navigate(`/View-trip/${docId}`);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-10">
      <h2 data-aos="fade-right" className="font-bold text-3xl pt-28">Tell us your preferences 🏖️🏝️</h2>
      <p data-aos="fade-right" className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div data-aos="fade-right" className="mt-10 flex flex-col gap-10">

        {/* Destination Selection */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          {/* Country */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Select Country</label>
            <select value={selectedCountry} onChange={(e) => handleCountryChange(e.target.value)} className="border p-2 rounded-md w-full">
              <option value="">-- Select Country --</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* City */}
          {selectedCountry && cities[selectedCountry] && (
            <div>
              <label className="block text-sm font-medium mb-2">Select City</label>
              <select value={selectedCity} onChange={(e) => handleCityChange(e.target.value)} className="border p-2 rounded-md w-full">
                <option value="">-- Select City --</option>
                {cities[selectedCountry].map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Trip Duration */}
        <div data-aos="fade-right" className="hover:shadow-lg p-4 rounded-md border">
          <h2 className="text-xl my-3 font-medium">How many days are you planning for your trip?</h2>
          <input type="number" placeholder="Ex. 3" className="border p-2 rounded-md w-full" min="1" max="7" onChange={(e) => handleInputChange("noOfDays", Number(e.target.value))} value={formData?.noOfDays || ""} />
        </div>

        {/* Budget */}
        <div data-aos="zoom-in">
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectBudgetOptions.map((item, index) => (
              <div key={index} onClick={() => handleInputChange("budget", item.title)} className={`p-4 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden ${formData?.budget === item.title ? "shadow-lg border-blue-700" : ""}`}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Traveler */}
        <div data-aos="fade-up">
          <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectTravelsList.map((item, index) => (
              <div key={index} onClick={() => handleInputChange("traveler", item.people)} className={`p-4 hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer shadow-md border rounded-xl overflow-hidden ${formData?.traveler === item.people ? "shadow-lg border-blue-700" : ""}`}>
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
                <p className="text-gray-600">{item.people}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className="flex justify-end mt-10">
          <button disabled={loading} onClick={OnGenerateTrip} className="bg-[#2945a1ad] text-white px-6 py-2 rounded-md hover:bg-[linear-gradient(90deg,#ff5ca0,#7959d1)] disabled:bg-gray-400">
            {loading ? <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" /> : "Generate Trip ✨"}
          </button>
        </div>

        <Footer />

        {/* Sign-In Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-gray-900">
            <DialogHeader>
              <DialogTitle>Sign In Required</DialogTitle>
              <div className="p-5 rounded-lg">
                <h2 className="font-bold text-lg mt-7 text-white">Sign In With Google</h2>
                <p className="text-gray-300">Sign in securely with Google authentication.</p>
                <button onClick={login} className="w-full mt-5 flex items-center justify-center py-2 border border-white rounded-lg gap-5 text-white hover:bg-gray-800">
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

