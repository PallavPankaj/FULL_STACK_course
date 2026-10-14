
CREATE DATABASE IF NOT EXISTS college_db;
USE college_db;

CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT CHECK (age >= 17),
    city VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    title VARCHAR(80) NOT NULL,
    credits INT DEFAULT 3,
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    marks INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO departments VALUES
(1, 'CSE'), (2, 'ECE'), (3, 'Mechanical'), (4, 'Civil');

INSERT INTO students VALUES
(101, 'Aarav', 20, 'Roorkee', 1),
(102, 'Diya', 21, 'Dehradun', 1),
(103, 'Kabir', 19, 'Haridwar', 2),
(104, 'Meera', 22, 'Roorkee', 1),
(105, 'Rohan', 20, 'Delhi', 3),
(106, 'Sana', 21, 'Dehradun', 2),
(107, 'Vikram', 23, 'Jaipur', NULL),
(108, 'Isha', 19, 'Roorkee', 2);

INSERT INTO courses VALUES
(201, 'Data Structures', 4, 1),
(202, 'Operating Systems', 4, 1),
(203, 'Digital Electronics', 3, 2),
(204, 'Thermodynamics', 3, 3),
(205, 'Machine Learning', 4, 1);

INSERT INTO enrollments VALUES
(101, 201, 88), (101, 202, 76), (101, 205, 91),
(102, 201, 67), (102, 205, 72),
(103, 203, 81),
(104, 201, 95), (104, 202, 89),
(105, 204, 58),
(106, 203, 74),
(108, 203, 66);

-- Check: should return 8 students.
SELECT * FROM students;
