import React, { useState } from 'react'
import Axios from "axios";

export default function ShowFeeRoom() {
    const [date, setDate] = useState("");

    const showValue = () => {
        console.log("date ", date);
        Axios.get(`http://localhost:3001/result/?day=${date}`
        ).then((response) => {
            console.log("response.data ", response.data);
        });
    };

    return (
        <div>
            <input type="date"
                onChange={(e) => setDate(e.target.value)}
            />
            <button
                onClick={() => showValue()}
            >
                show
            </button>
        </div>
    )
}
