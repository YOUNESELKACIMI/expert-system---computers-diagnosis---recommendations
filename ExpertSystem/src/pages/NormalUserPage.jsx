import React from 'react';
import SymptomsForm from '../components/SymptomsForm';
import '../styles.css';

const NormalUserPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-200 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Normal User Page</h1>
      <SymptomsForm />
    </div>
  );
};

export default NormalUserPage;
