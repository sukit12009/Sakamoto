import React, { useState } from 'react'
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddRoom() {
    const [name, setName] = useState("")
    const [feeRoom, setFeeRoom] = useState(undefined)
    const [feeBin, setFeeBin] = useState(undefined)
    const addRoom = () => {
        Axios.post('http://localhost:3001/addRoom', {
            name: name,
            feeRoom: feeRoom,
            feeBin: feeBin,
        }).then((result) => {
            toast.success("เพิ่มข้อมูลสำเร็จ");
            setName("");
            setFeeRoom("");
            setFeeBin("");
        });
    };

    return (
        <div>

            ชื่อห้อง
            <input
                type="text"
                name="RoomName"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <br />
                    ค่าห้อง
            <input
                type="number"
                name="FeeRoom"
                onChange={(e) => setFeeRoom(e.target.value)}
                value={feeRoom}
            />
            <br />
                        ค่าขยะ
            <input
                type="number"
                name="FeeBin"
                onChange={(e) => setFeeBin(e.target.value)}
                value={feeBin}
            />
            <br />
            <button
                onClick={() => addRoom()}
            >
                Add
            </button>
            <ToastContainer />
        </div>
    )
}
