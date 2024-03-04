import React from 'react';

const RuleList = ({ symptoms, onDeleteSymptom }) => {
  return (
    <div>
      <h2>Existing Symptoms:</h2>
      <ul>
        {symptoms.map((symptom) => (
          <li key={symptom.id}>
            <div>{symptom.symptom}</div>
            <div>
              <button onClick={() => onDeleteSymptom(symptom.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;
