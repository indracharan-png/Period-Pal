import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const PadRequestForm = () => {
  const [optIn, setOptIn] = useState(false);
  const [numPads, setNumPads] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // submit pad request form data
    if (!optIn) return;

    console.log({ optIn, numPads });
    try {
      const response = await fetch('/api/pads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, numberOfPads: numPads })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log('Pad request submitted successfully:', data);
      setError(null);
      setSuccess("Pad request submitted successfully.");
    } catch (error) {
      console.error('Error submitting pad request:', error.message);
      setSuccess(null);
      setError("You can only submit the request for pads once");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ }}>Opt-in for Pad Delivery</span>
          <input
            className="checkbox-input"
            type="checkbox"
            checked={optIn}
            onChange={() => setOptIn(!optIn)}
          />
        </label>
        <br />
        {optIn && (
          <label>
            Number of Pads Required:
            <input
              type="number"
              value={numPads}
              onChange={(event) => setNumPads(event.target.value)}
            />
          </label>
        )}
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default PadRequestForm;
