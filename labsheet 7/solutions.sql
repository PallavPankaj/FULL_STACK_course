USE college_db;
CREATE TABLE faculty (
    faculty_id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

ALTER TABLE faculty ADD COLUMN phone VARCHAR(15);

ALTER TABLE faculty RENAME COLUMN phone TO contact_no;

ALTER TABLE faculty DROP COLUMN contact_no;

DROP TABLE faculty;

INSERT INTO students (student_id, name, age, city, dept_id)
VALUES (109, 'Neha', 20, 'Roorkee', 1);

INSERT INTO students (student_id, name, age, dept_id)
VALUES (110, 'Arjun', 20, 1);
SELECT * FROM students WHERE student_id = 110;

UPDATE students SET city = 'Roorkee' WHERE student_id = 105;

UPDATE enrollments SET marks = marks + 5 WHERE course_id = 203;

DELETE FROM students WHERE student_id IN (109, 110);

SELECT * FROM students;

SELECT name, city FROM students;

SELECT * FROM students WHERE city = 'Roorkee';

SELECT * FROM students WHERE age BETWEEN 20 AND 22;

SELECT * FROM students WHERE city IN ('Roorkee', 'Dehradun');

SELECT * FROM students WHERE name LIKE 'A%';

SELECT * FROM students WHERE dept_id IS NULL;

SELECT DISTINCT city FROM students;

SELECT * FROM students ORDER BY age DESC, name ASC;

SELECT * FROM students ORDER BY age DESC LIMIT 3;

SELECT name AS `Student Name`, age AS Age FROM students;

SELECT COUNT(*) AS total_students FROM students;

SELECT AVG(marks) AS average_marks,
       MIN(marks) AS minimum_marks,
       MAX(marks) AS maximum_marks
FROM enrollments;

SELECT city, COUNT(*) AS student_count
FROM students
GROUP BY city;

SELECT c.course_id, c.title, AVG(e.marks) AS average_marks
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.title;

SELECT city, COUNT(*) AS student_count
FROM students
GROUP BY city
HAVING COUNT(*) > 1;

SELECT d.dept_id, d.dept_name, COALESCE(SUM(c.credits), 0) AS total_credits
FROM departments d
LEFT JOIN courses c ON d.dept_id = c.dept_id
GROUP BY d.dept_id, d.dept_name;

SELECT UPPER(name) AS uppercase_name, LENGTH(name) AS name_length
FROM students;


SELECT s.name, d.dept_name
FROM students s
INNER JOIN departments d ON s.dept_id = d.dept_id;

SELECT s.name, d.dept_name
FROM students s
LEFT JOIN departments d ON s.dept_id = d.dept_id;

SELECT d.dept_name, s.name AS student_name
FROM departments d
LEFT JOIN students s ON d.dept_id = s.dept_id;

SELECT s.name, c.title, e.marks
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;

SELECT DISTINCT s.name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE c.title = 'Data Structures';

SELECT s.student_id, s.name
FROM students s
LEFT JOIN enrollments e ON s.student_id = e.student_id
WHERE e.student_id IS NULL;

SELECT c.course_id, c.title, COUNT(e.student_id) AS enrolled_students
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.title;

SELECT d.dept_id, d.dept_name,
       COUNT(s.student_id) AS student_count,
       AVG(s.age) AS average_age
FROM departments d
LEFT JOIN students s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name;


SELECT * FROM students
WHERE age > (SELECT AVG(age) FROM students);

SELECT DISTINCT s.student_id, s.name, e.marks
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
WHERE e.marks = (SELECT MAX(marks) FROM enrollments);

SELECT * FROM courses c
WHERE EXISTS (
    SELECT 1 FROM enrollments e WHERE e.course_id = c.course_id
);

SELECT s.student_id, s.name, COUNT(*) AS course_count
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.name
HAVING COUNT(*) > 2;

SELECT d.dept_id, d.dept_name, COUNT(s.student_id) AS student_count
FROM departments d
LEFT JOIN students s ON d.dept_id = s.dept_id
GROUP BY d.dept_id, d.dept_name
HAVING COUNT(s.student_id) = (
    SELECT MAX(dept_count)
    FROM (
        SELECT COUNT(*) AS dept_count
        FROM students
        WHERE dept_id IS NOT NULL
        GROUP BY dept_id
    ) AS counts_by_department
);

SELECT c.title, s.name, e.marks
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c ON c.course_id = e.course_id
WHERE e.marks > (
    SELECT AVG(e2.marks)
    FROM enrollments e2
    WHERE e2.course_id = e.course_id
)
ORDER BY c.course_id, e.marks DESC;

CREATE INDEX idx_students_city ON students(city);
EXPLAIN SELECT * FROM students WHERE city = 'Roorkee';

CREATE VIEW student_marks AS
SELECT s.name AS student_name, c.title AS course_title, e.marks
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;

SELECT * FROM student_marks WHERE marks > 80;

DROP VIEW student_marks;
DROP INDEX idx_students_city ON students;

START TRANSACTION;
UPDATE enrollments
SET marks = 100
WHERE student_id = 101 AND course_id = 201;
ROLLBACK;
SELECT marks FROM enrollments
WHERE student_id = 101 AND course_id = 201;

START TRANSACTION;
UPDATE enrollments
SET marks = 100
WHERE student_id = 101 AND course_id = 201;
COMMIT;
SELECT marks FROM enrollments
WHERE student_id = 101 AND course_id = 201;
SELECT s.student_id, s.name, SUM(e.marks) AS total_marks,
       RANK() OVER (ORDER BY SUM(e.marks) DESC) AS student_rank
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
GROUP BY s.student_id, s.name;

SELECT s.name, c.title, e.marks,
       CASE
           WHEN e.marks >= 90 THEN 'A'
           WHEN e.marks BETWEEN 75 AND 89 THEN 'B'
           WHEN e.marks BETWEEN 60 AND 74 THEN 'C'
           ELSE 'D'
       END AS grade
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c ON c.course_id = e.course_id;

SELECT s1.name AS student_1, s2.name AS student_2, s1.city
FROM students s1
JOIN students s2
  ON s1.city = s2.city
 AND s1.student_id < s2.student_id
WHERE s1.city IS NOT NULL;

SELECT MAX(marks) AS second_highest_marks
FROM enrollments
WHERE marks < (SELECT MAX(marks) FROM enrollments);
