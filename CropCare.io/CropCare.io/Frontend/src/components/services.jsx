// import React, { useState } from 'react';
// import { Navbar } from './navabr';

// const Services = () => {
//   const [soilType, setSoilType] = useState('');
//   const [season, setSeason] = useState('');
//   const [location, setLocation] = useState('');
//   const [previousCrop, setPreviousCrop] = useState('');
//   const [budget, setBudget] = useState('');
//   const [recommendation, setRecommendation] = useState(null);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     const processedData = { soilType, season, location, previousCrop, budget };
//     const result = getRecommendation(processedData);
//     setRecommendation(result);
//   };

//   const getRecommendation = (data) => {
//     return {
//       cropRotation: 'Wheat -> Rice -> Corn',
//       fertilizers: 'Nitrogen, Phosphorus, Potassium'
//     };
//   };

//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-20">
//         <h2 className="text-2xl font-bold text-center mb-6">Crop Rotation & Fertilizer Recommendation</h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold text-gray-700">Soil Type:</label>
//             <input
//               type="text"
//               value={soilType}
//               onChange={(e) => setSoilType(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., Loamy, Sandy"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold text-gray-700">Season:</label>
//             <input
//               type="text"
//               value={season}
//               onChange={(e) => setSeason(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., Winter, Summer"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold text-gray-700">Location:</label>
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., Texas, Punjab"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold text-gray-700">Previous Crop:</label>
//             <input
//               type="text"
//               value={previousCrop}
//               onChange={(e) => setPreviousCrop(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., Corn, Rice"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 font-semibold text-gray-700">Budget (Allocated):</label>
//             <input
//               type="number"
//               value={budget}
//               onChange={(e) => setBudget(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="e.g., 10000"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             Get Recommendation
//           </button>
//         </form>

//         {recommendation && (
//           <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-500">
//             <h3 className="font-semibold">Recommendation:</h3>
//             <p><strong>Crop Rotation:</strong> {recommendation.cropRotation}</p>
//             <p><strong>Fertilizers:</strong> {recommendation.fertilizers}</p>
//           </div>
//         )}
//       </div>
//       <div className='mt-4'>
//       <section className="cta bg-green-300 py-2 text-center">
//         <div className="container mx-auto">
//           <h2 className="text-2xl font-semibold text-green-800">Join Our Farming Community</h2>
//           <p className="text-lg text-green-700 mt-4">
//             Get the latest updates on crop trends, farming techniques, and expert advice.
//           </p>
//         </div>
//       </section>
//       </div>
//     </div>
//   );
// };

// export default Services;

import React, { useState } from 'react';
import { Navbar } from './navabr';

const Services = () => {
  const [soilType, setSoilType] = useState('');
  const [season, setSeason] = useState('');
  const [location, setLocation] = useState('');
  const [previousCrop, setPreviousCrop] = useState('');
  const [budget, setBudget] = useState('');
  const [crops, setCrops] = useState(null);
  const [fertilizers, setFertilizers] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const processedData = { soil_type: soilType, season, location, previous_crop: previousCrop, budget };

    try {
      const response = await fetch('http://127.0.0.1:5000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recommendation');
      }

      const result = await response.json();
      setCrops(result.crops);
      setFertilizers(result.fertilizers);
      setError(null);
    } catch (err) {
      setError(err.message);
      setCrops(null);
      setFertilizers(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-20">
        <h2 className="text-2xl font-bold text-center mb-6">Crop Rotation & Fertilizer Recommendation</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Form Fields */}
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Soil Type:</label>
            <input
              type="text"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Loamy, Sandy"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Season:</label>
            <input
              type="text"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Winter, Summer"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Texas, Punjab"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Previous Crop:</label>
            <input
              type="text"
              value={previousCrop}
              onChange={(e) => setPreviousCrop(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Corn, Rice"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Budget (Allocated):</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 10000"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Get Recommendation
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 rounded-lg border border-red-500">
            <p className="text-red-700">Error: {error}</p>
          </div>
        )}

        {crops && (
          <div className="mt-6 p-4 bg-green-100 rounded-lg border border-green-500">
            <h3 className="font-semibold">Recommended Crops:</h3>
            {crops.split('\n').map((crop, index) => (
              <p key={index}>{crop}</p>
            ))}
          </div>
        )}

        {fertilizers && (
          <div className="mt-6 p-4 bg-blue-100 rounded-lg border border-blue-500">
            <h3 className="font-semibold">Recommended Fertilizers:</h3>
            {fertilizers.split('\n').map((fertilizer, index) => (
              <p key={index}>{fertilizer}</p>
            ))}
          </div>
        )}
      </div>
      <section className="cta bg-green-300 py-2 text-center mt-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold text-green-800">Join Our Farming Community</h2>
          <p className="text-lg text-green-700 mt-4">
            Get the latest updates on crop trends, farming techniques, and expert advice.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;
