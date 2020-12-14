import Axios from "axios";
import { useState } from "react";

function RoomFee() {
    const [roomFee, setRoomFee] = useState([]);
    const [date, setDate] = useState("");

    const getroomFee = () => {
        Axios.get(`http://localhost:3001/roomFee/?day=${date}`
        ).then((response) => {
            setRoomFee(response.data);
        });
    };

    return (
        <div>
            Room
            <input type="date" 
            onChange={(event) => {
                setDate(event.target.value)
            }} />
            <button className="btn btn-success" onClick={getroomFee}> Show </button>
            {/* {getroomFee()} */}
        </div>
    );
}

export default RoomFee;