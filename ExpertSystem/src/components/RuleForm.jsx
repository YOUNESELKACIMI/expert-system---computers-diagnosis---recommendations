import React, { useState } from 'react';

const RuleForm = ({ onAddSymptom, onUpdateSymptom }) => {
  const [symptom, setSymptom] = useState('');

  const handleChange = (e) => {
    setSymptom(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptom) return;

    onAddSymptom({ symptom });
    setSymptom('');
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <form onSubmit={handleSubmit} className="flex w-full max-w-xxl bg-white shadow-md rounded px-8 py-6 mb-4">
        <label className="block text-gray-700 text-lg font-bold mr-4 flex-shrink-0" htmlFor="symptom">
          Symptom Description:
        </label>
        <input
          id="symptom"
          type="text"
          value={symptom}
          onChange={handleChange}
          className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RuleForm;
