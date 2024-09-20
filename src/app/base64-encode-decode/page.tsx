'use client';

import { useState, ChangeEvent } from 'react';

export default function Base64EncodeDecode() {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [action, setAction] = useState<'encode' | 'decode'>('encode');
  const [copySuccess, setCopySuccess] = useState<string>(''); // To show copy notification

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleActionChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText(); // Directly read from clipboard
      setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard: ', err);
    }
  };
  

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopySuccess('Copied to clipboard!');
      setTimeout(() => setCopySuccess(''), 2000); // Hide notification after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopySuccess('Failed to copy');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Base64 Encoder / Decoder</h1>

      {/* Input Text Section */}
      <div className="form-group mt-4">
        <label htmlFor="inputText">Enter text to {action}:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="inputText"
            value={inputText}
            onChange={handleInputChange}
          />
          <button className="btn btn-secondary" onClick={handlePaste}>
            Paste
          </button>
        </div>
      </div>

      {/* Action Radio Buttons Section */}
      <div className="form-group mt-4">
        <label>Action:</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="action"
            id="encodeOption"
            value="encode"
            checked={action === 'encode'}
            onChange={handleActionChange}
          />
          <label className="form-check-label" htmlFor="encodeOption">
            Encode
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="action"
            id="decodeOption"
            value="decode"
            checked={action === 'decode'}
            onChange={handleActionChange}
          />
          <label className="form-check-label" htmlFor="decodeOption">
            Decode
          </label>
        </div>
      </div>

      {/* Encode/Decode Button */}
      <button className="btn btn-primary mt-4" onClick={handleEncodeDecode}>
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </button>

      {/* Output Text Section */}
      <div className="form-group mt-4">
        <label htmlFor="outputText">Output:</label>
        <div className="input-group">
          <textarea
            className="form-control"
            id="outputText"
            rows={3}
            value={outputText}
            readOnly
          ></textarea>
          <button className="btn btn-secondary" onClick={handleCopy}>
            Copy
          </button>
        </div>
        {copySuccess && <p className="text-success mt-2">{copySuccess}</p>}
      </div>
    </div>
  );
}
