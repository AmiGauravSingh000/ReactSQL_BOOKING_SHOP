import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
const app = express();

const db = mysql.createConnection({
    host: "127.0.0.1", // Use only the IP address here
    port: 3306,        // Specify the port separately
    user: "root",
    password: "root",
    database: "db1"
});

app.use(express.json());
app.use(cors());
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});

app.get('/' , (req,res) => {
    res.json("Hey There this is the backend");
})
app.get('/books', (req,res)=>{
    const q = "SELECT * FROM books";
    db.query(q, (err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post('/books', (req,res)=>{
    const q = "INSERT INTO books (`title`, `descri`,`price`,`cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.descri,
        req.body.price,
        req.body.cover
    ];

    db.query(q,[values],(err,data) =>{
        if(err) return res.json(err);
        return res.json("book has been successfully created");
    })

})

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("book has been deleted successfully");
    });
});


app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, descri, price, cover } = req.body;
    const q = "UPDATE books SET title = ?, descri = ?, price = ?, cover = ? WHERE id = ?";
    const values = [title, descri, price, cover];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully.");
    });
});





  
app.listen(8080, () => {
    console.log("Connected to the backend!");
});
