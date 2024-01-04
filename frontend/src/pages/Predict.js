import React, { useState } from 'react';
import { useCyclesContext } from '../hooks/useCyclesContext';
import { differenceInDays, addDays } from 'date-fns';
import PadRequestForm from '../components/PadRequestForm';

function Predict() {
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const { cycles} = useCyclesContext();
    const [lastStartDate, setLastStartDate] = useState(null);

    async function handlePrediction() {

        try {
            if (cycles.length < 12) {
                setError("Must have atleast 12 periods added to make prediction");
                throw Error("Must have atleast 12 periods added");
            }
            let ans = [];
            for (let i = 1; i < 12; i++) {
                const date1 = new Date(cycles[i - 1].startDate);
                const date2 = new Date(cycles[i].startDate);
                ans.push(Math.abs(differenceInDays(date1, date2)));
            }
            setLastStartDate(new Date(cycles[0].startDate));
            console.log(ans);
            const response = await fetch('http://127.0.0.1:8000/ml/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // pass any necessary input data as JSON
                    "data": ans
                })
            });
            const data = await response.json();
            console.log(data);
            setPrediction(data.Prediction);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault() }}>
                <button onClick={handlePrediction}>Get Prediction</button>
            </form>
            {prediction && <div>
                Prediction: {addDays(lastStartDate, Math.round(prediction)).toLocaleDateString()} is the next estimated start date.
                <div>
                    <PadRequestForm/>
                </div>
                </div>}
            {error && <div className='error'>{error}</div>}
        </div>
    );
}

export default Predict;