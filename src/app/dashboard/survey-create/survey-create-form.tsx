'use client'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FormEvent, useState } from 'react';

export default function CreateSurveyForm({ session }: { session: Session | null }) {  
  // State variables to store form input values
  const [rockProbability, setRockProbability] = useState('');
  const [paperProbability, setPaperProbability] = useState('');
  const [scissorsProbability, setScissorsProbability] = useState('');
  const [trialNumber, setTrialNumber] = useState('');

  // Function to handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // You can perform further validation and submit the form data as needed
    console.log('Rock Probability:', rockProbability);
    console.log('Paper Probability:', paperProbability);
    console.log('Scissors Probability:', scissorsProbability);
    console.log('Trial Number:', trialNumber);

    const rockProb = parseFloat(rockProbability);
    const paperProb = parseFloat(paperProbability);
    const scissorsProb = parseFloat(scissorsProbability);

    // Check if the sum exceeds 1
    const sum = rockProb + paperProb + scissorsProb;
    if (sum > 1) {
      alert('The sum of probabilities cannot exceed 1.');
      return; // Prevent form submission
    }
  };

  return (
    <div className="form-widget">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rockProbability" className="block font-medium mb-1">
            Probability of Rock (0.00 - 1.00)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1.00"
            id="rockProbability"
            className="w-full p-2 border rounded"
            value={rockProbability}
            onChange={(e) => setRockProbability(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="paperProbability" className="block font-medium mb-1">
            Probability of Paper (0.00 - 1.00)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1.00"
            id="paperProbability"
            className="w-full p-2 border rounded"
            value={paperProbability}
            onChange={(e) => setPaperProbability(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="scissorsProbability" className="block font-medium mb-1">
            Probability of Scissors (0.00 - 1.00)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="1.00"
            id="scissorsProbability"
            className="w-full p-2 border rounded"
            value={scissorsProbability}
            onChange={(e) => setScissorsProbability(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="trialNumber" className="block font-medium mb-1">
            Trial Number (1 - 100)
          </label>
          <input
            type="number"
            step="1"
            min="1"
            max="100"
            id="trialNumber"
            className="w-full p-2 border rounded"
            value={trialNumber}
            onChange={(e) => setTrialNumber(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
}
