// app/base64-encode-decode/page.tsx
'use client';

import { useState, ChangeEvent } from 'react';

export default function Base64EncodeDecode() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [action, setAction] = useState<'encode' | 'decode'>('encode');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleActionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value as 'encode' | 'decode');
  };

  const handleEncodeDecode = () => {
    try {
      let result: string;
      if (action === 'encode') {
        result = btoa(inputText); // Base64 encoding
      } else {
        result = atob(inputText); // Base64 decoding
      }
      setOutputText(result);
    } catch (error) {
      setOutputText('Error: Invalid input for decoding.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Base64 Encoder / Decoder</h1>
      <div className="form-group mt-4">
        <label htmlFor="inputText">Enter text to {action}:</label>
        <input
          type="text"
          className="form-control"
          id="inputText"
          value={inputText}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group mt-4">
        <label htmlFor="actionSelect">Action:</label>
        <select
          className="form-control"
          id="actionSelect"
          value={action}
          onChange={handleActionChange}
        >
          <option value="encode">Encode</option>
          <option value="decode">Decode</option>
        </select>
      </div>

      <button className="btn btn-primary mt-4" onClick={handleEncodeDecode}>
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </button>

      <div className="form-group mt-4">
        <label htmlFor="outputText">Output:</label>
        <textarea
          className="form-control"
          id="outputText"
          rows={3}
          value={outputText}
          readOnly
        ></textarea>
      </div>
    </div>
  );
}
