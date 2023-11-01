// 导入必要的插件
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const port = 3000;

const app = express();
// json数据处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 允许所有域的请求
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// 数据连接配置信息
const dbConfig = {
    host: '192.168.50.46',
    user: 'user_wah',
    password: '123456',
    database: 'overwork'
};

const pool = mysql.createPool(dbConfig);

// app.post('/insert', (req, res) => {
//     const dataTosert = req.body;
//     pool.query('insert into person')
// })

app.post('/query', (req, res) => {

    // 使用1=1来始终为where子句添加一个条件
    // let query = 'select * from overtime where 1';

    let query = 'select subquery.* from (select staff.staff_name, overtime.* from overtime inner join staff on overtime.staff_code = staff.staff_code) as subquery where 1'

    const data = req.body;

    // 动态条件查询, 条件可以自由组合
    const queryParams = [];

    if (data.id) {
        query += ` and id = ${data.id}`;
        console.log(data.id);
        queryParams.push(data.id)
    }
    if (data.overdate) {
        query += ` and overdate = '${data.overdate}'`;
        console.log(data.overdate)
        queryParams.push(data.overdate)
    }
    if (data.staff_code) {
        query += ` and staff_code = ${data.staff_code}`;
        console.log(data.staff_code)
        queryParams.push(data.staff_code)
    }

    console.log(data);
    query += ' order by check_status asc, overdate desc';

    pool.query(query, queryParams, (err, results) => {
        if (err) {
            console.log('Error querying data: ', err);
            return res.status(500).json({ error: 'Failed to query data' });
        }
        results.forEach((row) => {
            if (row.overdate) {
                const isoDate = new Date(row.overdate);
                const adjustedDate = new Date(isoDate.getTime() + 8*60*60*1000);
                row.overdate = adjustedDate.toISOString();
            }
        });
        res.json(results);
    })
});

app.post('/query_staff', (req, res) => {

    const data = req.body;
    let query = 'select * from staff where 1';
    if (data.staff_code) {
        query += ` and staff_code = ${data.staff_code}`;
    }
    
    pool.query(query, (err, results) => {
        if (err) {
            console.log('Error querying data: ', err);
            return res.status(500).json({ error: 'Failed to query data' });
        } else {
            res.json(results);
        }
        // results.forEach((row) => {
        //     if (row.overdate) {
        //         const isoDate = new Date(row.overdate);
        //         const adjustedDate = new Date(isoDate.getTime() + 8*60*60*1000);
        //         row.overdate = adjustedDate.toISOString();
        //     }
        // });
        
    })

})

app.post('/insert', (req, res) => {
    const data = req.body;
    console.log(data);
    // res.json({ message: 'Data received successfully', data });

    // console.log(`insert into overtime (staff_code, type, overdate, hours, stime, etime, remark) values (
    // ${data.staff_code || 0},
    // ${data.type || 0},
    // ${data.hours || 0},
    // ${data.overdate || 0},
    // ${data.stime || 0},
    // ${data.etime || 0},
    // ${data.remark || 0},
    // );`)

    // insert into overtime (staff_code, type, overdate, hours, stime, etime, remark) values ("05092", "1", "2023-10-10", "2.5", "19:00:00", "21:30:00", "测试")

    pool.query(`insert into overtime (staff_code, type, overdate, hours, stime, etime, remark) values ("${data.staff_code || 0}","${data.type || 0}","${data.overdate || '2023-1-1'}",${data.hours || 0},"${data.stime || ''}","${data.etime || ''}","${data.remark || ''}");`, (err, results) => {
        if (err) {
            console.log('Error querying data: ', err);
            return res.status(500).json({ error: 'Failed to query data' });
        }
        res.json(results);
    })
});

app.post('/update', (req, res) => {
    const data = req.body;
    // console.log(`update overtime set remark = '开发' where id = ${data.id};`)
    
    if (data.check != null) {

        const updateQueries = data.check.map(item => {
            return mysql.format(
                'update overtime set check_status = ? where id = ?',
                [item.check_status, item.id]
            );
        });
        updateQueries.forEach(query => {
            pool.query(query, (err, results) => {
                res.json(results);
                if (err) {
                    console.log('Error delete data: ', err);
                    return res.status(500).json({ error: 'Failed to query data' });
                }
            });
        });
    } else {
        let query = 'update overtime set id = id';
        // if (req.body.id) {
        //     query += ` , id = ${req.body.id}`;
        //     console.log(req.body.id);
        //     queryParams.push(req.body.id)
        // }
        if (data.staff_code) {
            query += ` , staff_code = "${data.staff_code}"`;
        }
        if (data.overdate) {
            query += ` , overdate = "${data.overdate}"`;
        }
        if (data.hours) {
            query += ` , hours = "${data.hours}"`;
        }
        if (data.stime) {
            query += ` , stime = "${data.stime}"`;
        }
        if (data.etime) {
            query += ` , etime = "${data.etime}"`;
        }
        if (data.remark) {
            query += ` , remark = "${data.remark}"`;
        }
        if (data.check_status != null) {
            query += ` , check_status = "${data.check_status}"`;
        }
        query += ` where id = "${data.id}";`;
        console.log(query)
    
        if (data.id) {
            pool.query(query, (err, results) => {
                if (err) {
                    console.log('Error delete data: ', err)
                    return res.status(500).json({ error: 'Failed to query data' });
                }
                res.json(results);
            })
        }
    }

    
})

app.post('/delete', (req, res) => {
    const data = req.body;
    if (data.id != null) {
        pool.query(`delete from overtime where id = "${data.id}";`, (err, results) => {
            if (err) {
                console.log('Error delete data: ', err)
                return res.status(500).json({ error: 'Failed to query data' });
            }
            res.json(results)
        })
    } else {
        res.json(null)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
})