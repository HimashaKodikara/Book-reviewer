# Book-reviewer

//MYSQL code for setup database

create database book;

use book;

CREATE TABLE Book (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(255) NOT NULL,       
    author VARCHAR(255) NOT NULL,      
    rating INT CHECK (rating BETWEEN 1 AND 5), 
    review_text varchar(255) NOT NULL,         
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);




select * from Book;
