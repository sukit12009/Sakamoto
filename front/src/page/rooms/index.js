import React from 'react';
import { navigate } from "@reach/router";


export default function Rooms() {
    return (
        <div>
            <button onClick={() =>
                navigate(`/showRooms`)
            }>
                แสดงห้องแถว
            </button>
            <button onClick={() =>
                navigate(`/showMonth`)
            }>
                แสดงเดือนค่าห้องปัจจุบัน
            </button>
            <button onClick={() =>
                navigate(`/addRoom`)
            }>
                เพิ่มห้องแถว
            </button>
        </div>
    )
}
