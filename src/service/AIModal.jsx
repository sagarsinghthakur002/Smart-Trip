import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY; 
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",  //data json format ma lina lai 
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display real-time information, including hotel prices, images, availability, and real-time ratings.  Hotel prices are also incredibly dynamic and change constantly.  Therefore, I can't provide URLs or images. My response will give you a framework, and you'll need to use online travel agencies (like Booking.com, Expedia, Kayak, etc.) to find current pricing and details.\n\nHere's a JSON-formatted travel plan framework for a cheap 3-day Las Vegas trip for a couple:\n\n```json\n{\n  \"tripName\": \"Las Vegas Budget Getaway for Couples\",\n  \"duration\": \"3 Days\",\n  \"budget\": \"Cheap\",\n  \"hotels\": [\n    {\n      \"hotelName\": \"Example Budget Hotel 1\",\n      \"hotelAddress\": \"123 Example St, Las Vegas, NV 89101\",  \n      \"priceRange\": \"$50-$80/night (approximate)\", \n      \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\", \n      \"geoCoordinates\": { \"lat\": 36.1699, \"lng\": -115.1398 }, \n      \"rating\": \"REPLACE_WITH_RATING (e.g., 3.5 stars)\",\n      \"description\": \"REPLACE_WITH_HOTEL_DESCRIPTION (e.g., Basic but clean hotel, good location, free parking)\"\n    },\n    {\n      \"hotelName\": \"Example Budget Hotel 2\",\n      \"hotelAddress\": \"456 Another Ave, Las Vegas, NV 89109\",\n      \"priceRange\": \"$60-$90/night (approximate)\",\n      \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\",\n      \"geoCoordinates\": { \"lat\": 36.1000, \"lng\": -115.2000 },\n      \"rating\": \"REPLACE_WITH_RATING\",\n      \"description\": \"REPLACE_WITH_HOTEL_DESCRIPTION\"\n    }\n    //Add more budget hotels as needed.  Search on hotel booking sites!\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"theme\": \"Exploring the Strip (Free Activities)\",\n      \"places\": [\n        {\n          \"placeName\": \"Bellagio Fountains\",\n          \"placeDetails\": \"Free spectacular water show.\",\n          \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\",\n          \"geoCoordinates\": { \"lat\": 36.1133, \"lng\": -115.1727 },\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"REPLACE_WITH_RATING\",\n          \"timeToVisit\": \"Evenings for best light show. Check showtimes online.\"\n        },\n        {\n          \"placeName\": \"Fremont Street Experience (Downtown)\",\n          \"placeDetails\": \"Free light show and street performers.\",\n          \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\",\n          \"geoCoordinates\": { \"lat\": 36.1658, \"lng\": -115.1406 },\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"REPLACE_WITH_RATING\",\n          \"timeToVisit\": \"Evening\"\n        },\n        {\n          \"placeName\": \"Walk the Las Vegas Strip\",\n          \"placeDetails\": \"Window shop, admire the hotels, take photos.\",\n          \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\",\n          \"geoCoordinates\": \"REPLACE_WITH_STRIP_COORDINATES\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"REPLACE_WITH_RATING\",\n          \"timeToVisit\": \"Anytime, but evenings offer the best atmosphere\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"theme\": \"Affordable Entertainment & Nature\",\n      \"places\": [\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"Scenic drives and hiking trails (small entry fee).\",\n          \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\",\n          \"geoCoordinates\": { \"lat\": 36.1869, \"lng\": -115.6187 },\n          \"ticketPricing\": \"Small entry fee per vehicle\",\n          \"rating\": \"REPLACE_WITH_RATING\",\n          \"timeToVisit\": \"Morning or afternoon to avoid heat\"\n        },\n          {\n          \"placeName\": \"Free Show at a Casino\",\n          \"placeDetails\": \"Many casinos offer free shows (check schedules).\",\n          \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\",\n          \"geoCoordinates\": \"REPLACE_WITH_CASINO_COORDINATES\",\n          \"ticketPricing\": \"Free\",\n          \"rating\": \"REPLACE_WITH_RATING\",\n          \"timeToVisit\": \"Evening\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"theme\": \"Pool Day & Departure\",\n      \"places\": [\n        {\n          \"placeName\": \"Hotel Pool (if included)\",\n          \"placeDetails\": \"Relax and enjoy the hotel pool (check if there is a fee).\",\n          \"imageUrl\": \"REPLACE_WITH_IMAGE_URL\",\n          \"geoCoordinates\": \"REPLACE_WITH_HOTEL_POOL_COORDINATES\",\n          \"ticketPricing\": \"May be free or a small fee depending on hotel\",\n          \"rating\": \"REPLACE_WITH_RATING\",\n          \"timeToVisit\": \"Afternoon\"\n        }\n      ]\n    }\n  }\n}\n```\n\nRemember to replace all the `REPLACE_WITH_...` placeholders with actual data using online travel agencies and search engines.  Also, note that this is a *very* budget-focused plan.  Eating cheaply (e.g., grocery store snacks and some inexpensive meals) will be crucial to sticking to a low budget.  You'll likely need to use public transport or ride-sharing services to get around, or consider walking if distances aren't too far.\n"},
          ],
        },
      ],
    });
  