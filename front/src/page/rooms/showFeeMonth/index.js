import React, { useState } from 'react'
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Axios from "axios";

export default function ShowFeeRoom() {
    const [date, setDate] = useState("");
    const [dataList, setDataList] = useState([]);
    const [total, setTotal] = useState(0);

    const showValue = () => {
        Axios.get(`http://localhost:3001/result/?day=${date}`
        ).then((response) => {
            // console.log("response.data ", response.data);
            setDataList(response.data);
            let totalTemp = total;
            response.data.forEach((element) => {
                totalTemp += element.total;
            });
            setTotal(totalTemp);
        });
    };

    const FireFormater = (cell, row) => {
        return (
            <div>
                {row.unit_fire_before}-{row.unit_fire_after} =
                {' '} {row.different_unit_fire}({row.fee_fire} บาท)
            </div>
        )
    };

    const WaterFormater = (cell, row) => {
        return (
            <div>
                {row.unit_water_before}-{row.unit_water_after} =
                {' '} {row.different_unit_water}({row.fee_water} บาท)
            </div>
        )
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

            <BootstrapTable
                data={dataList}
            >
                <TableHeaderColumn
                    isKey
                    width='50'
                    dataField='room_name'
                >
                    ชื่อห้อง
                    </TableHeaderColumn>
                <TableHeaderColumn
                    width='50'
                    dataField='fee_room'
                >
                    ค่าเช่าห้อง
                     </TableHeaderColumn>
                <TableHeaderColumn
                    width='50'
                    dataField='fee_bin'
                >
                    ค่าขยะ
                     </TableHeaderColumn>
                <TableHeaderColumn
                    width='150'
                    dataField='fee_bin'
                    dataFormat={FireFormater}
                >
                    ค่าไฟ
                     </TableHeaderColumn>
                <TableHeaderColumn
                    width='150'
                    dataField='fee_bin'
                    dataFormat={WaterFormater}
                >
                    ค่าน้ำ
                     </TableHeaderColumn>
                <TableHeaderColumn
                    width='50'
                    dataField='total'
                >
                    รวม
                     </TableHeaderColumn>
            </BootstrapTable>
            {total}
        </div>
    )
}
