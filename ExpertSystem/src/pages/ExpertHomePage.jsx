import React, { useEffect, useState } from 'react';
import RuleForm from '../components/RuleForm';
import symptomsServices from '../services/symptoms';


const Symptom = ({ symptom, id, onDelete, onEdit }) => {
  const [editedSymptom, setEditedSymptom] = useState(symptom);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id, { symptom: editedSymptom });
  };

  return (
    <div className="border text-black p-4 my-2 flex items-center justify-between rounded-lg shadow-md bg-white">
      <input
        type="text"
        value={editedSymptom}
        onChange={(e) => setEditedSymptom(e.target.value)}
        className="border rounded py-1 px-2 w-2/3 focus:outline-none"
      />
      <button onClick={handleEdit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-4 rounded ml-2 focus:outline-none">
        Edit
      </button>
      <button onClick={handleDelete} className="bg-gray-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded ml-2 focus:outline-none">
        Delete
      </button>
    </div>
  );
};

const ExpertHomePage = ({ setIsAdmin }) => {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    symptomsServices.getSymptoms().then((symptoms) => {
      setSymptoms(symptoms);
    });
  }, []);

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedAdmin');
    setIsAdmin(false);
  };

  const handleDeleteSymptom = (id) => {
    symptomsServices.deleteSymptom(id).then(() => {
      setSymptoms(symptoms.filter((symptom) => symptom.id !== id));
    });
  };

  const handleEditSymptom = (id, updatedSymptom) => {
    symptomsServices.updateSymptom(id, updatedSymptom).then(() => {
      setSymptoms(
        symptoms.map((symptom) =>
          symptom.id === id ? { ...symptom, ...updatedSymptom } : symptom
        )
      );
    });
  };

  const handleAddSymptom = (newSymptom) => {
    symptomsServices.postSymptom(newSymptom).then((addedSymptom) => {
      setSymptoms([...symptoms, addedSymptom]);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-200  text-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Expert Home Page</h1>
          <button
            type="button"
            onClick={handleLogOut}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            Log out
          </button>
        </div>
        <RuleForm onAddSymptom={handleAddSymptom} />
        <div className="mt-8">
          {symptoms.map((symptom) => (
            <Symptom
              key={symptom.id}
              symptom={symptom.symptom}
              id={symptom.id}
              onDelete={handleDeleteSymptom}
              onEdit={handleEditSymptom}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertHomePage;