import React, { useState, useEffect } from 'react';
import Symptoms from '../services/symptoms';

const SymptomsForm = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  useEffect(() => {
    Symptoms.getSymptoms().then((returnedSymptoms) => {
      setSymptoms(returnedSymptoms);
    });
  }, []);

  const handleCheckboxChange = (id) => {
    const updatedSymptoms = symptoms.map((symptom) => {
      if (symptom.id === id) {
        return { ...symptom, boolean: !symptom.boolean };
      }
      return symptom;
    });

    setSymptoms(updatedSymptoms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update symptoms in the server
    symptoms.forEach(async (symptom) => {
      await Symptoms.updateSymptom(symptom.id, symptom);
    });

    // Clear selected symptoms
    setSelectedSymptoms([]);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Symptoms Form</h2>
      <form onSubmit={handleSubmit}>
        {symptoms.map((symptom) => (
          <div key={symptom.id} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={symptom.boolean}
                onChange={() => handleCheckboxChange(symptom.id)}
                className="form-checkbox h-5 w-5 text-gray-600"
              />
              <span className="ml-2 text-gray-800">{symptom.symptom}</span>
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SymptomsForm;
