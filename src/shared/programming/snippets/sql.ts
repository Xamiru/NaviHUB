import type { ProgSnippet } from '../snippets'

// sql snippet deck — one file per language so authors never collide. Rules
// in snippets.ts. Every query here was executed against better-sqlite3 on
// this machine to confirm the stated result before being written down.
export const SQL_SNIPPETS: ProgSnippet[] = [
  {
    key: 'sql-count-star-vs-col',
    lang: 'sql',
    kind: 'output',
    code: `CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, phone TEXT);
INSERT INTO employees VALUES
  (1,'Ann','555-1'), (2,'Bo',NULL), (3,'Cy','555-3'), (4,'Di',NULL);

SELECT COUNT(*) AS n_all, COUNT(phone) AS n_phone FROM employees;`,
    prompt: 'What does this query return?',
    options: [
      '1 row: (4, 2)',
      '1 row: (4, 4)',
      '1 row: (2, 2)',
      '1 row: (4, 0)'
    ],
    correct: 0,
    explain:
      'COUNT(*) counts all rows; COUNT(col) skips rows where that column is NULL, so the two counts diverge whenever the column has NULLs.'
  },
  {
    key: 'sql-group-by-bare-column',
    lang: 'sql',
    kind: 'output',
    code: `CREATE TABLE orders (id INTEGER PRIMARY KEY, customer TEXT, amount INTEGER);
INSERT INTO orders VALUES
  (1,'A',10), (2,'B',20), (3,'A',30), (4,'B',5);

SELECT customer, id, amount FROM orders GROUP BY customer;`,
    prompt: 'What does this query return? (SQLite allows a bare column here — no error.)',
    options: [
      '2 rows: (A, 3, 30), (B, 4, 5)',
      '2 rows: (A, 1, 10), (B, 2, 20)',
      'Error: id and amount are not in the GROUP BY clause',
      '4 rows: all rows returned, GROUP BY has no effect'
    ],
    correct: 1,
    explain:
      "SQLite doesn't require non-aggregated columns to be functionally dependent on the GROUP BY key — it just picks a value from one row per group, here the first row seen for each customer."
  },
  {
    key: 'sql-having-vs-where',
    lang: 'sql',
    kind: 'output',
    code: `CREATE TABLE sales (id INTEGER PRIMARY KEY, region TEXT, amount INTEGER);
INSERT INTO sales VALUES
  (1,'East',10), (2,'East',8), (3,'West',5), (4,'West',3);

SELECT region, SUM(amount) AS total FROM sales
GROUP BY region HAVING SUM(amount) > 15;`,
    prompt: 'What does this query return?',
    options: [
      '2 rows: (East, 18), (West, 8)',
      "0 rows: HAVING runs before GROUP BY so total isn't defined yet",
      '1 row: (East, 18)',
      'Error: HAVING cannot reference SUM(amount)'
    ],
    correct: 2,
    explain:
      'WHERE filters rows before grouping; HAVING filters the aggregated groups afterward, so only groups whose SUM(amount) exceeds 15 remain — just East.'
  },
  {
    key: 'sql-integer-division',
    lang: 'sql',
    kind: 'output',
    code: `CREATE TABLE bills (id INTEGER PRIMARY KEY, total INTEGER, people INTEGER);
INSERT INTO bills VALUES
  (1,7,2), (2,10,4), (3,9,3);

SELECT id, total / people AS share FROM bills;`,
    prompt: 'What does this query return?',
    options: [
      '3 rows: (1, 3.5), (2, 2.5), (3, 3.0)',
      '3 rows: (1, 4), (2, 3), (3, 3)',
      'Error: division requires CAST to REAL',
      '3 rows: (1, 3), (2, 2), (3, 3)'
    ],
    correct: 3,
    explain:
      'Both total and people are INTEGER columns, so `/` performs integer division and truncates toward zero instead of returning a fractional result.'
  },
  {
    key: 'sql-order-by-nulls',
    lang: 'sql',
    kind: 'output',
    code: `CREATE TABLE tasks (id INTEGER PRIMARY KEY, priority INTEGER);
INSERT INTO tasks VALUES
  (1,2), (2,NULL), (3,1), (4,NULL);

SELECT id, priority FROM tasks ORDER BY priority;`,
    prompt: 'What does this query return?',
    options: [
      '4 rows: (2, NULL), (4, NULL), (3, 1), (1, 2)',
      '4 rows: (3, 1), (1, 2), (2, NULL), (4, NULL)',
      'Error: cannot ORDER BY a column containing NULL',
      "2 rows: (3, 1), (1, 2) — rows with NULL priority are dropped"
    ],
    correct: 0,
    explain:
      'SQLite sorts NULL as the lowest possible value in ascending order, so rows with a NULL priority sort before any numeric priority.'
  },
  {
    key: 'sql-coalesce',
    lang: 'sql',
    kind: 'output',
    code: `CREATE TABLE users (id INTEGER PRIMARY KEY, nickname TEXT, name TEXT);
INSERT INTO users VALUES
  (1,'Nak','Nakamura'), (2,NULL,'Suzuki'), (3,NULL,NULL);

SELECT id, COALESCE(nickname, name, 'Unknown') AS display FROM users;`,
    prompt: 'What does this query return?',
    options: [
      '3 rows: (1, Nak), (2, NULL), (3, Unknown) — no nickname keeps NULL',
      '3 rows: (1, Nak), (2, Suzuki), (3, Unknown)',
      '3 rows: (1, Nak), (2, Suzuki), (3, NULL)',
      'Error: COALESCE takes only two arguments'
    ],
    correct: 1,
    explain:
      'COALESCE returns the first non-NULL argument scanning left to right, falling through nickname, then name, then the literal default.'
  },
  {
    key: 'sql-correlated-subquery',
    lang: 'sql',
    kind: 'output',
    code: `CREATE TABLE staff (id INTEGER PRIMARY KEY, name TEXT, dept TEXT, salary INTEGER);
INSERT INTO staff VALUES
  (1,'Ann','Eng',90), (2,'Bo','Eng',70), (3,'Cy','Sales',50), (4,'Di','Sales',60);

SELECT name FROM staff e
WHERE salary > (SELECT AVG(salary) FROM staff WHERE dept = e.dept);`,
    prompt: 'What does this query return?',
    options: [
      '2 rows: (Ann, Cy)',
      '1 row: (Ann)',
      '2 rows: (Ann, Di)',
      "4 rows: all staff, since the subquery isn't correlated to salary"
    ],
    correct: 2,
    explain:
      "The subquery recomputes AVG(salary) per outer row's dept, so each employee is compared only against their own department's average, not the company-wide one."
  },
  {
    key: 'sql-not-equal-null',
    lang: 'sql',
    kind: 'bug',
    code: `CREATE TABLE tags (id INTEGER PRIMARY KEY, label TEXT);
INSERT INTO tags VALUES
  (1,'a'), (2,'b'), (3,NULL), (4,'c');

SELECT id FROM tags WHERE label <> 'a';`,
    prompt: "This is meant to list every tag that isn't 'a'. Why is it wrong?",
    options: [
      "It also silently excludes id 4, because 'c' sorts after 'a' alphabetically in SQLite's default collation.",
      'It returns all four rows, since SQLite treats NULL as not equal to every string value, including itself.',
      "It throws an error, because you can't compare a TEXT column to NULL in a WHERE clause.",
      "It silently drops id 3: `<> 'a'` against NULL is neither true nor false, so WHERE excludes it."
    ],
    correct: 3,
    explain:
      "Any comparison against NULL — including `<> 'a'` — evaluates to NULL, which WHERE treats as false, so rows with a NULL label are silently dropped rather than kept."
  },
  {
    key: 'sql-not-in-null',
    lang: 'sql',
    kind: 'bug',
    code: `CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO people VALUES (1,'Ann'), (2,'Bo'), (3,'Cy');
CREATE TABLE banned (name TEXT);
INSERT INTO banned VALUES ('Bo'), (NULL);

SELECT name FROM people WHERE name NOT IN (SELECT name FROM banned);`,
    prompt: 'This is meant to list everyone not on the banned list. Why does it return nothing?',
    options: [
      "It returns nothing: the NULL row in banned makes every NOT IN comparison unknown, so WHERE matches no one.",
      'It returns all three people, because NOT IN ignores NULL entries in the subquery.',
      'It returns just Ann and Cy, skipping Bo as intended.',
      'It throws an error, because the subquery returns a NULL value.'
    ],
    correct: 0,
    explain:
      '`x NOT IN (subquery)` expands to a chain of `x <> v1 AND x <> v2 ...`; once one value is NULL, that whole AND chain is NULL for every row, so nothing matches.'
  },
  {
    key: 'sql-left-join-where-bug',
    lang: 'sql',
    kind: 'bug',
    code: `CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
INSERT INTO customers VALUES (1,'Ann'), (2,'Bo');
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, amount INTEGER);
INSERT INTO orders VALUES (1,1,20);

SELECT c.name, o.amount FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.amount > 10;`,
    prompt:
      'This is meant to list every customer with their order amount, keeping customers with no orders. Why is Bo missing?',
    options: [
      "Bo is missing entirely because customer id 2 doesn't actually exist in the customers table at all.",
      'Bo\'s order amount is NULL, and NULL > 10 is neither true nor false, so WHERE drops that row.',
      'The LEFT JOIN silently drops every customer whose id happens to be an even number.',
      'Bo is excluded because his order total is exactly 10, which is not greater than 10.'
    ],
    correct: 1,
    explain:
      'Putting a right-table condition in WHERE instead of the ON clause discards the very NULL-padded rows the LEFT JOIN was meant to preserve, turning it into an INNER JOIN.'
  },
  {
    key: 'sql-limit-no-order',
    lang: 'sql',
    kind: 'bug',
    code: `CREATE TABLE queue (id INTEGER PRIMARY KEY, task TEXT);
INSERT INTO queue (task) VALUES ('a'), ('b'), ('c'), ('d');
DELETE FROM queue WHERE task = 'b';
INSERT INTO queue (task) VALUES ('e');

SELECT task FROM queue LIMIT 2;`,
    prompt: 'This is meant to grab the two oldest tasks in the queue. What is actually wrong with it?',
    options: [
      'It is fine: LIMIT always returns rows in insertion order in SQLite, by design.',
      'It throws an error, because LIMIT requires an ORDER BY clause in SQLite specifically.',
      "There's no ORDER BY, so the row order is unspecified, even though it returns ('a','c') here.",
      "It returns the two most recently inserted tasks, 'd' and 'e', instead of the oldest ones."
    ],
    correct: 2,
    explain:
      'LIMIT only caps the row count; without ORDER BY, SQL makes no promise about which rows or what order you get, even if one particular build looks consistent.'
  },
  {
    key: 'sql-insert-or-replace-cascade',
    lang: 'sql',
    kind: 'bug',
    code: `CREATE TABLE parent (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE child (id INTEGER PRIMARY KEY,
  parent_id INTEGER REFERENCES parent(id) ON DELETE CASCADE, note TEXT);
PRAGMA foreign_keys = ON;
INSERT INTO parent VALUES (1,'Alice');
INSERT INTO child VALUES (1,1,'first note');

INSERT OR REPLACE INTO parent VALUES (1,'Alicia');
SELECT COUNT(*) AS n FROM child;`,
    prompt: "This is meant to just rename parent row 1 to 'Alicia'. Why does the child row disappear?",
    options: [
      "It's a bug in the CASCADE trigger — ON DELETE CASCADE shouldn't fire when a row is replaced, only when deleted outright.",
      "The child row survives; COUNT(*) returns 0 because 'note' is treated as a reserved word.",
      'REPLACE only touches the name column, so the child row keeps parent_id = 1 and survives.',
      'INSERT OR REPLACE deletes the conflicting row first, and that DELETE cascades — removing every child row referencing parent_id 1 — before the new row is inserted.'
    ],
    correct: 3,
    explain:
      'INSERT OR REPLACE resolves a primary-key conflict by deleting the old row and inserting a new one, and that DELETE is a real delete — foreign-key cascades fire on it.'
  }
]
