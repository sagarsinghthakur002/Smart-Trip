export const selectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solo traveler in exploration',
        icon: '✈️',
        people: '1 person '
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two travelers in Tandem',
        icon: '🥂',
        people: '2 people '
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A  people group  of fun-loving adventurers',
        icon: '🏡',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekers',
        icon: '⛵',
        people: '5 to 10 people'
    },
];



export const selectBudgetOptions = [
  {
    id: 1,
    title: 'Cheap',
    desc: '$5 – $100 : Stay conscious of costs',
    icon: '💵'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: '$100 – $300 : Keep costs on the average side',
    icon: '💰'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: '$300 and above : Don\'t worry about costs',
    icon: '💴'
  },
];



export const countries = [
  'United States', 'United Kingdom', 'France', 'Italy', 'Spain', 'Germany', 
  'Japan', 'Thailand', 'India', 'Australia', 'Canada', 'Mexico', 'Brazil',
  'Greece', 'Portugal', 'Netherlands', 'Switzerland', 'Austria', 'Belgium',
  'Singapore', 'Malaysia', 'Indonesia', 'Philippines', 'Vietnam', 'South Korea',
  'China', 'New Zealand', 'South Africa', 'Egypt', 'Turkey', 'Morocco', 'Dubai (UAE)'
];

export const cities = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Las Vegas', 'Miami', 'Boston', 'Seattle', 'Washington DC', 'Orlando'],
  'United Kingdom': ['London', 'Edinburgh', 'Manchester', 'Birmingham', 'Liverpool', 'Bath', 'Oxford', 'Cambridge', 'York', 'Brighton'],
  'France': ['Paris', 'Nice', 'Lyon', 'Marseille', 'Bordeaux', 'Strasbourg', 'Toulouse', 'Cannes', 'Monaco', 'Avignon'],
  'Italy': ['Rome', 'Venice', 'Florence', 'Milan', 'Naples', 'Amalfi Coast', 'Cinque Terre', 'Sicily', 'Tuscany', 'Pompeii'],
  'Spain': ['Madrid', 'Barcelona', 'Seville', 'Valencia', 'Granada', 'Ibiza', 'Mallorca', 'Bilbao', 'Cordoba', 'Santiago'],
  'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Dresden', 'Heidelberg', 'Nuremberg', 'Stuttgart', 'Düsseldorf'],
  'Japan': ['Tokyo', 'Kyoto', 'Osaka', 'Hiroshima', 'Nara', 'Sapporo', 'Yokohama', 'Fukuoka', 'Nagoya', 'Kobe'],
  'Thailand': ['Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi', 'Ayutthaya', 'Sukhothai', 'Hua Hin', 'Koh Samui', 'Phi Phi Islands'],
  'India': ['Mumbai', 'Delhi', 'Goa', 'Jaipur', 'Agra', 'Varanasi', 'Kerala', 'Rajasthan', 'Udaipur', 'Rishikesh'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Cairns', 'Darwin', 'Hobart', 'Canberra'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Quebec City', 'Calgary', 'Ottawa', 'Victoria', 'Banff', 'Whistler', 'Niagara Falls'],
  'Mexico': ['Mexico City', 'Cancun', 'Playa del Carmen', 'Tulum', 'Guadalajara', 'Puerto Vallarta', 'Oaxaca', 'Merida', 'Cozumel', 'Chichen Itza'],
  'Brazil': ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília', 'Manaus', 'Recife', 'Fortaleza', 'Florianópolis', 'Paraty', 'Iguazu Falls'],
  'Greece': ['Athens', 'Santorini', 'Mykonos', 'Crete', 'Rhodes', 'Corfu', 'Thessaloniki', 'Delphi', 'Meteora', 'Zakynthos'],
  'Portugal': ['Lisbon', 'Porto', 'Sintra', 'Algarve', 'Coimbra', 'Évora', 'Braga', 'Cascais', 'Madeira', 'Azores'],
  'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Maastricht', 'Haarlem', 'Delft', 'Groningen', 'Leiden', 'Eindhoven'],
  'Switzerland': ['Zurich', 'Geneva', 'Bern', 'Lucerne', 'Interlaken', 'Zermatt', 'Lausanne', 'Basel', 'Jungfrau', 'St. Moritz'],
  'Austria': ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Hallstatt', 'Linz', 'Klagenfurt', 'Zell am See', 'Wachau', 'Bad Gastein'],
  'Belgium': ['Brussels', 'Bruges', 'Antwerp', 'Ghent', 'Leuven', 'Mechelen', 'Ostend', 'Liège', 'Namur', 'Ypres'],
  'Singapore': ['Singapore'],
  'Malaysia': ['Kuala Lumpur', 'Penang', 'Langkawi', 'Malacca', 'Cameron Highlands', 'Borneo', 'Ipoh', 'Johor Bahru', 'Kota Kinabalu', 'Kuching'],
  'Indonesia': ['Bali', 'Jakarta', 'Yogyakarta', 'Bandung', 'Lombok', 'Surabaya', 'Medan', 'Ubud', 'Seminyak', 'Gili Islands'],
  'Philippines': ['Manila', 'Cebu', 'Boracay', 'Palawan', 'Bohol', 'Siargao', 'Baguio', 'Davao', 'El Nido', 'Coron'],
  'Vietnam': ['Ho Chi Minh City', 'Hanoi', 'Halong Bay', 'Hoi An', 'Da Nang', 'Hue', 'Nha Trang', 'Sapa', 'Mekong Delta', 'Phu Quoc'],
  'South Korea': ['Seoul', 'Busan', 'Jeju Island', 'Gyeongju', 'Incheon', 'Daegu', 'Jeonju', 'Andong', 'Suwon', 'Gangneung'],
  'China': ['Beijing', 'Shanghai', 'Hong Kong', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Xi\'an', 'Hangzhou', 'Suzhou', 'Macau'],
  'New Zealand': ['Auckland', 'Wellington', 'Queenstown', 'Christchurch', 'Rotorua', 'Dunedin', 'Taupo', 'Milford Sound', 'Bay of Islands', 'Franz Josef'],
  'South Africa': ['Cape Town', 'Johannesburg', 'Durban', 'Kruger National Park', 'Stellenbosch', 'Garden Route', 'Pretoria', 'Port Elizabeth', 'Knysna', 'Soweto'],
  'Egypt': ['Cairo', 'Luxor', 'Aswan', 'Alexandria', 'Giza', 'Sharm El Sheikh', 'Hurghada', 'Dahab', 'Abu Simbel', 'Valley of the Kings'],
  'Turkey': ['Istanbul', 'Cappadocia', 'Antalya', 'Bodrum', 'Pamukkale', 'Ephesus', 'Ankara', 'Izmir', 'Fethiye', 'Kusadasi'],
  'Morocco': ['Marrakech', 'Casablanca', 'Fes', 'Rabat', 'Tangier', 'Chefchaouen', 'Essaouira', 'Agadir', 'Atlas Mountains', 'Sahara Desert'],
  'Dubai (UAE)': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Al Ain', 'Ras Al Khaimah']
};

export const AI_PROMPT=`Generate a detailed travel plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget. 

IMPORTANT: Return ONLY valid JSON without any markdown code blocks, explanations, or additional text. The JSON must follow this exact structure:

{
  "hotels": [
    {
      "hotelName": "Hotel Name",
      "hotelAddress": "Full address",
      "priceRange": "Price per night",
      "rating": "Rating (e.g., 4.5 stars)",
      "description": "Hotel description"
    }
  ],
  "itinerary": {
    "day1": {
      "theme": "Day theme",
      "places": [
        {
          "placeName": "Place name",
          "placeDetails": "Description of the place",
          "ticketPricing": "Ticket price or Free",
          "rating": "Rating",
          "timeToVisit": "Best time to visit"
        }
      ]
    },
    "day2": {
      "theme": "Day theme",
      "places": [...]
    }
  }
}

Generate at least 3-5 hotel recommendations and create a detailed itinerary for all {totalDays} days with multiple places to visit each day.` //prompt that will run in gemini