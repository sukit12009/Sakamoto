import React, { useState, useEffect } from 'react';
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Axios from "axios";

export default function ShowRooms() {
    const [roomList, setRoomList] = useState([]);
    const getroomFee = () => {
        Axios.get(`http://localhost:3001/showRooms`
        ).then((response) => {
            setRoomList(response.data);
        });
    };

    useEffect(() => {
        getroomFee();
    }, [])

    return (
        <div>
            <BootstrapTable
                data={roomList}
            >
                <TableHeaderColumn
                    isKey
                    width='150'
                    dataField='room_name'
                >
                    ห้องที่
                    </TableHeaderColumn>
                <TableHeaderColumn
                    width='150'
                    dataField='fee_room'
                >
                    ค่าเช่าห้อง
                     </TableHeaderColumn>
                <TableHeaderColumn
                    width='150'
                    dataField='fee_bin'
                >
                    ค่าขยะ
                     </TableHeaderColumn>
            </BootstrapTable>
        </div>
    )
}
