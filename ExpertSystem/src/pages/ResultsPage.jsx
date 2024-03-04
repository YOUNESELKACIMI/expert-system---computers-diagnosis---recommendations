import React, { useState } from 'react';
import axios from 'axios';
import showResults from '../../expertLogin/app';

const ResultsPage = () => {
  const [result, setResult] = useState('');

  const handleRunScript = () => {
    showResults()
      .then(returnedResult => {
        console.log("returned result = ", returnedResult);
        setResult(returnedResult);
        console.log("setted result = ", result);
      })
      .catch(error => {
        console.error('Error getting results:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-200 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Results Page</h1>
      <button
        onClick={handleRunScript}
        className="bg-gray-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none mb-4"
      >
        Show Results
      </button>
      {result && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-2">Result: {result.result}</h2>
          <p className="text-lg mb-2">Diagnosis: {result.diagnosis}</p>
          <h3 className="text-lg font-bold mb-2">Recommendations:</h3>
          <ul className="list-disc ml-6">
            {result.recommendations &&
              result.recommendations.map((recommendation, index) => (
                <li key={index} className="text-base">{recommendation}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
