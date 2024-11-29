const mysql = require('mysql2');

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    port: 3306,
    password: "Himasha2001!@",
    database: "Book"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to the MySQL database");
});


exports.getBooks = (req, res) => {
    const query = 'SELECT * FROM book'; 

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            res.status(500).send("Error fetching data");
            return;
        }


        res.json(results);
    });
};


exports.addBook = (req,res)=>{
    console.log(req.body);
  const{title, author, rating, review_text } = req.body;
  const query = 'INSERT INTO Book (title, author,rating,review_text) VALUES (?,?,?,?)';
  db.query(query,[title,author,rating,review_text],(err,result) =>{
    if(err){
        console.error("Error adding book",err.message);
        return res.status(500).send("Error adding book");
    }
    res.status(201).json({id:result.insertId,title,author,rating,review_text});
  })
}

exports.updateBook = (req,res)=>{
    const {id} = req.params;
    const{title, author, rating, review_text} = req.body;
    const query = 'UPDATE book SET title=?,author=?, rating=?, review_text=? WHERE id=?';
    db.query(query,[title,author, rating, review_text,id],(err, results) =>{
        if(err){
            console.log("Error Updating Book:", err.message);
            return res.status(500).send('Error updating book');
        }
        if(results.affectedRows === 0){
            return res.status(404).send("Book not found");
        }
        res.status(200).json({id, title, author, rating, review_text});
    });
};

exports.deleteBook = (req,res) =>{
    const {id} = req.params;
    const query = 'DELETE FROM book WHERE id =?';
    db.query(query,[id],(err, results)=>{
        if(err){
            console.error("Error deleteing book:", err.message);
            return res.status(500).send("Eror deleting book");
        }
        if(results.affectedRows === 0){
            return res.status(404).send("Book not found");
        }
        res.status(204).send();
    }) 
}