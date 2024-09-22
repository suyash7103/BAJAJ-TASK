import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import CSS

const App = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleSelectChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(inputData);
      const res = await axios.post('http://localhost:3000/bfhl', jsonData);
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1>Your Roll Number: <span>ABCD123</span></h1>
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-box"
          value={inputData}
          onChange={handleInputChange}
          placeholder='Enter JSON data'
        />
        <button className="submit-button" type='submit'>Submit</button>
      </form>
      {response && (
        <div className="response-section">
          <h2>Response:</h2>
          <select multiple={true} onChange={handleSelectChange} className="dropdown">
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
          </select>
          <div className="response-display">
            {selectedOptions.includes("alphabets") && <div>Alphabets: {JSON.stringify(response.alphabets)}</div>}
            {selectedOptions.includes("numbers") && <div>Numbers: {JSON.stringify(response.numbers)}</div>}
            {selectedOptions.includes("highest_lowercase_alphabet") && <div>Highest Lowercase Alphabet: {JSON.stringify(response.highest_lowercase_alphabet)}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
