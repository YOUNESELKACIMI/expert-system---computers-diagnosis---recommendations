import React, { useEffect, useState } from 'react';
import Questions from '../services/questions';
import Answers from '../services/answers';

const Question = ({ question, onAnswerChange }) => {
  const [answer, setAnswer] = useState('');
  console.log('answer is = ', answer);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setAnswer(inputValue);
    onAnswerChange({ a: inputValue });
  };

  return (
    <div >
      <label>
        {question}
        <input
          type="text"
          value={answer}
          onChange={handleInputChange}
        />
      </label>
      <br />
    </div>
  );
};

const QuestionnaireForm = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    answers.forEach((answer)=>{
      Answers.postAnswers(answer)
        .then(response => console.log('returned answer = ', response));
    });
  };

  useEffect(() => {
    Questions.getQuestions().then((result) => {
      console.log('questions : ', result);
      setQuestions(result);
    });
  }, []);

  const handleAnswerChange = (index, newAnswer) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = newAnswer;
      return updatedAnswers;
    });
  };



  console.log('setted questions are = ', questions);
  console.log('answers are = ', answers);

  return (
    <div>
      <h2>Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Question
            key={question.id}
            question={question.q}
            onAnswerChange={(newAnswer) => handleAnswerChange(index, newAnswer)}
          />
        ))}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
