const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "12345678",
    database: "room_cost"
})

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/employees/create', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const country = req.body.country;
    const position = req.body.position;
    const wage = req.body.wage;
    db.query(
        "INSERT INTO employees (name, age, country, position, wage) VALUES(?,?,?,?,?)",
        [name, age, country, position, wage],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

app.put('/employees/update', (req, res) => {
    const id = req.body.id;
    const wage = req.body.wage;
    db.query("UPDATE employees SET wage = ? WHERE id = ?",
        [wage, id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        })
})

app.delete('/employees/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

app.get('/roomFee', (req, res) => {
    const day = req.query.day;
    const dayBefore = new Date(day);
    const dayBeforeString = new Date(dayBefore.setMonth(dayBefore.getMonth() - 1)).toISOString().split('T')[0];
    // db.query("SELECT * FROM months WHERE date = ?", 
    let afterDate;
    let beforeDate;
    db.query(
        `SELECT months.date, 
        months.unit_fire, months.unit_water, rooms.room_name, rooms.fee_room, rooms.fee_bin
        FROM months
        RIGHT JOIN rooms
        ON months.room_id = rooms.room_id
        WHERE months.date=?
        ORDER BY months.room_id`,
        [day],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                afterDate = result;
                // res.send(result);
                db.query(
                    `SELECT months.date, 
                    months.unit_fire, months.unit_water, rooms.room_name, rooms.fee_room, rooms.fee_bin
                    FROM months
                    RIGHT JOIN rooms
                    ON months.room_id = rooms.room_id
                    WHERE months.date=?
                    ORDER BY months.room_id`,
                    [dayBeforeString],
                    (err, result) => {
                        if (err) {
                            console.log(err);
                        } else {
                            beforeDate = result;
                            let a = [...afterDate, ...beforeDate]
                            res.send(a);
                        }
                    });
            }
        });
});

app.get('/showRooms', (req, res) => {
    db.query("SELECT * FROM rooms", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/addRoom', (req, res) => {
    const name = req.body.name;
    const feeRoom = req.body.feeRoom;
    const feeBin = req.body.feeBin;
    db.query(
        "INSERT INTO rooms (room_name, fee_room, fee_bin) VALUES(?,?,?)",
        [name, feeRoom, feeBin],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Values inserted");
            }
        }
    );
});

app.get('/result', (req, res) => {
    const day = new Date(req.query.day);

    function getFormatMonth(value) {
        return value + 1 > 9 ? "" + (value + 1) : "0" + (value + 1);
    };

    const month = getFormatMonth(day.getMonth());
    const year = String(Number(day.getFullYear()));
    //  SELECT * FROM result_total
    //         WHERE MONTH(date) = ?
    //         AND YEAR(date) = ?
    db.query(`
        SELECT result_total.fee_fire, 
        result_total.fee_water,
        result_total.fee_bin,
        result_total.fee_room,
        rooms.room_name,
        result_total.total,
        result_total.date,
        result_total.unit_fire_before,
        result_total.unit_water_before,
        result_total.unit_fire_after,
        result_total.unit_water_after,
        result_total.different_unit_fire,
        result_total.different_unit_water
        
        FROM result_total INNER JOIN rooms ON result_total.room_id = rooms.room_id
               WHERE MONTH(date) = ?
               AND YEAR(date) = ?
    `,
        [month, year],
        (err, result) => {
            if (err) {
                console.log("err", err);
            } else {
                res.send(result);
            }
        }
    )
})

app.listen('3001', () => {
    console.log('Server is running on port 3001')
})