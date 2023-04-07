import sql, { ConnectionPool } from 'mssql';

const config = {
    user: 'voa',
    password: 'm*#cf$fK2&RaS^',
    server: 'cs6083.database.windows.net',
    database: 'voa',
    options: {
      encrypt: true
    }
};

export const pool = new sql.ConnectionPool(config);

// pool.connect().then( async  connection => {
//     console.log('Connected to database', connection);
//     // Use the connection object here
//     try {
//         const result = await connection.request().query('SELECT * FROM AFZ_Activity');
//         console.log(result);
//         // Use the query result here
//       } catch (err) {
//         console.error(err);
//         // Handle query errors here
//       }
      
//   }).catch(error => {
//     console.error(error);
//     // Handle connection errors here
//   });
