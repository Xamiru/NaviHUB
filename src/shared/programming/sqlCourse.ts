import type { ProgCourseDef } from './types'

export const SQL_COURSE: ProgCourseDef = {
  key: 'sql',
  title: 'Practical SQL',
  description:
    'Working SQL with a SQLite accent: joins, aggregation, windows, and reading query plans.',
  lessons: [
    {
      key: 'select-fundamentals',
      title: 'SELECT fundamentals and NULL logic',
      body: `# SELECT fundamentals and NULL logic

You write a query top-to-bottom, but the engine evaluates it in a different order. Knowing that order explains most "why can't I reference that here" errors:

1. FROM (and joins) builds the working row set
2. WHERE filters rows
3. GROUP BY collapses groups, HAVING filters them
4. SELECT computes output expressions
5. DISTINCT deduplicates
6. ORDER BY sorts, LIMIT/OFFSET trims

This is why WHERE cannot see a SELECT alias (it runs first) but ORDER BY can (it runs last). SQLite is lenient and lets aliases into WHERE as an extension, but portable SQL does not — repeat the expression or use a subquery.

## Three-valued logic

Every comparison in SQL yields TRUE, FALSE, or NULL, and WHERE only keeps rows where the predicate is TRUE. NULL compared to anything — including another NULL — is NULL, not FALSE. The classic trap:

\`\`\`sql
-- media_item.status is NULL for untracked titles
SELECT title FROM media_item WHERE status != 'dropped'
\`\`\`

This silently drops every row whose status is NULL, because \`NULL != 'dropped'\` evaluates to NULL. If you mean "not dropped, including untracked":

\`\`\`sql
SELECT title FROM media_item
WHERE status != 'dropped' OR status IS NULL
-- SQLite shorthand: WHERE status IS NOT 'dropped'
\`\`\`

SQLite's \`IS\` / \`IS NOT\` operators are NULL-safe equality (standard SQL spells it \`IS DISTINCT FROM\`). Use them any time either side can be NULL. Related helpers: \`COALESCE(a, b)\` returns the first non-NULL argument, and \`NULLIF(a, b)\` returns NULL when they match — \`x / NULLIF(y, 0)\` is the standard divide-by-zero guard.

## DISTINCT

\`SELECT DISTINCT\` deduplicates the entire output row, not one column. \`SELECT DISTINCT media_type, status\` yields distinct pairs. Note that DISTINCT treats NULLs as equal to each other for dedup purposes — one NULL survives — which is deliberately inconsistent with comparison semantics.

## CASE expressions

CASE is an expression, usable anywhere a value goes — SELECT, ORDER BY, even GROUP BY:

\`\`\`sql
SELECT title,
  CASE
    WHEN score >= 90 THEN 'great'
    WHEN score >= 70 THEN 'good'
    WHEN score IS NULL THEN 'unrated'
    ELSE 'meh'
  END AS verdict
FROM media_item
ORDER BY CASE status
  WHEN 'watching' THEN 0
  WHEN 'planned' THEN 1
  ELSE 2
END, title
\`\`\`

Two forms exist: searched CASE (\`WHEN <predicate>\`) and simple CASE (\`CASE x WHEN value\`). The simple form compares with \`=\`, so \`CASE x WHEN NULL\` never matches — use the searched form with \`IS NULL\` for that branch. With no ELSE, an unmatched CASE yields NULL.

## LIMIT needs ORDER BY

Rows have no inherent order; without ORDER BY, \`LIMIT 10\` returns an arbitrary ten and may change between runs or after a VACUUM. Any query whose result order matters — pagination especially — needs an ORDER BY whose keys are unique (tack on \`, id\` as a tiebreaker), or page boundaries will overlap.`,
      questions: [
        {
          prompt: "A table has 100 rows; 10 have category = 'a', 5 have category IS NULL. How many rows does WHERE category != 'a' return?",
          options: ['90', '85', '95', '100'],
          correct: 1,
          explain: "NULL != 'a' evaluates to NULL, which WHERE treats like FALSE, so the 5 NULL rows are excluded along with the 10 matching rows: 100 - 10 - 5 = 85."
        },
        {
          prompt: 'Why can ORDER BY reference a SELECT alias while (portable) WHERE cannot?',
          options: [
            'ORDER BY is parsed in a separate pass with its own scope',
            'Aliases are only visible to clauses in the same line',
            'It cannot — both clauses see aliases identically',
            'ORDER BY runs after SELECT in logical evaluation order; WHERE runs before it'
          ],
          correct: 3,
          explain: 'WHERE filters rows before SELECT expressions (and their aliases) exist; ORDER BY sorts the finished output. SQLite permits aliases in WHERE as an extension, but the standard does not.'
        },
        {
          prompt: "What does CASE x WHEN NULL THEN 'missing' ELSE 'present' END return when x is NULL?",
          options: ["'present'", "'missing'", 'NULL', 'A syntax error'],
          correct: 0,
          explain: "Simple CASE compares with =, and NULL = NULL is NULL (not true), so the WHEN never matches and the ELSE fires. Use a searched CASE with 'WHEN x IS NULL' instead."
        },
        {
          prompt: 'Which SQLite expression is a NULL-safe "not equal" (true when one side is NULL and the other is not)?',
          options: ['a != b', 'a IS NOT b', 'NOT (a = b)', 'COALESCE(a != b, 0)'],
          correct: 1,
          explain: 'IS / IS NOT treat NULL as a comparable value, so NULL IS NOT 5 is true. The others yield NULL (or false for the COALESCE form) when either side is NULL.'
        }
      ]
    },
    {
      key: 'joins',
      title: 'Joins: inner, outer, self, anti',
      body: `# Joins: inner, outer, self, anti

A join is conceptually a filtered cross product: pair every row of the left table with every row of the right, then keep pairs where the ON predicate is true. \`CROSS JOIN\` is that product with no filter; \`INNER JOIN ... ON\` keeps matching pairs; \`LEFT JOIN\` additionally keeps every left row that matched nothing, padding the right table's columns with NULL. SQLite added \`RIGHT\` and \`FULL\` joins in 3.39, but a RIGHT JOIN is just a LEFT JOIN with the tables swapped — most codebases standardize on LEFT.

\`\`\`sql
-- every anime and its theme songs, keeping anime with none
SELECT m.title, ts.slug, ts.song_title
FROM media_item m
LEFT JOIN theme_song ts ON ts.media_id = m.id
WHERE m.media_type = 'anime'
\`\`\`

## ON vs WHERE: the outer-join trap

For an INNER join, a condition in ON and the same condition in WHERE produce identical results — put join keys in ON and filters in WHERE for readability. For a LEFT join they are completely different:

\`\`\`sql
-- WRONG: silently becomes an inner join
SELECT m.title, ts.song_title
FROM media_item m
LEFT JOIN theme_song ts ON ts.media_id = m.id
WHERE ts.kind = 'OP'
\`\`\`

Unmatched left rows have \`ts.kind\` = NULL, \`NULL = 'OP'\` is NULL, and WHERE discards them — the "keep everything on the left" behavior is gone. The fix is to move the right-table filter into the ON clause:

\`\`\`sql
LEFT JOIN theme_song ts
  ON ts.media_id = m.id AND ts.kind = 'OP'
\`\`\`

Now non-OP songs simply do not match, and every anime still appears. Rule of thumb: with LEFT JOIN, conditions on the *right* table belong in ON; conditions on the *left* table belong in WHERE. The one deliberate exception is the anti-join below.

## Self-joins

Joining a table to itself just needs two aliases. Sequels in a relations table:

\`\`\`sql
SELECT a.title AS base, b.title AS sequel
FROM media_relation r
JOIN media_item a ON a.id = r.media_id
JOIN media_item b ON b.id = r.related_id
WHERE r.relation = 'sequel'
\`\`\`

Aliases are mandatory here — without them every column reference is ambiguous.

## Anti-joins: rows with no match

"Anime with zero theme songs" has two idiomatic spellings:

\`\`\`sql
-- 1: LEFT JOIN ... IS NULL
SELECT m.title
FROM media_item m
LEFT JOIN theme_song ts ON ts.media_id = m.id
WHERE ts.id IS NULL

-- 2: NOT EXISTS
SELECT m.title FROM media_item m
WHERE NOT EXISTS (
  SELECT 1 FROM theme_song ts WHERE ts.media_id = m.id
)
\`\`\`

Both are correct and modern planners execute them near-identically. In form 1, test a NOT NULL column of the right table (its primary key) — testing a nullable column would also match rows that joined but hold a NULL. Avoid the third spelling, \`WHERE m.id NOT IN (SELECT media_id FROM theme_song)\`: if the subquery yields even one NULL, NOT IN evaluates to NULL for every row and the query returns nothing. NOT EXISTS has no such trap, which is why it is the safer default.`,
      questions: [
        {
          prompt: 'A LEFT JOIN of orders to shipments has WHERE shipments.carrier = \'ups\'. What happens to orders with no shipment?',
          options: [
            'They appear with NULL carrier',
            'They cause an error because carrier is NULL',
            "They appear only if some other order shipped via 'ups'",
            'They are filtered out — the query behaves like an INNER JOIN'
          ],
          correct: 3,
          explain: 'Unmatched rows carry NULL in shipment columns; NULL = \'ups\' is NULL, so WHERE drops them. Put right-table filters in the ON clause to keep the outer behavior.'
        },
        {
          prompt: 'Why is NOT IN (SELECT col ...) dangerous as an anti-join?',
          options: [
            'It cannot use an index on col, so the anti-join degrades into a full scan every time',
            'If the subquery returns any NULL, the predicate is never true and zero rows come back',
            'It compares by rowid rather than by value',
            'It is limited to 999 values in SQLite'
          ],
          correct: 1,
          explain: "x NOT IN (1, NULL) expands to x != 1 AND x != NULL; the second term is NULL, so the AND can never be TRUE. NOT EXISTS avoids this entirely."
        },
        {
          prompt: 'In the LEFT JOIN ... IS NULL anti-join pattern, which right-table column should the IS NULL test use?',
          options: [
            'A NOT NULL column such as its primary key',
            'Any column — they are all NULL on a non-match',
            'The join key of the left table',
            'A nullable column, so genuine NULLs are also caught'
          ],
          correct: 0,
          explain: 'On a non-match every right column is NULL, but a nullable column can also be NULL on a real match — testing the PK distinguishes "no matching row" from "matched a row holding NULL".'
        },
        {
          prompt: 'For an INNER JOIN, moving a filter between the ON clause and the WHERE clause...',
          options: [
            'changes which rows survive, as with LEFT JOIN',
            'is a syntax error for non-key conditions',
            'produces the same result either way',
            'disables index use on the joined table'
          ],
          correct: 2,
          explain: 'Inner joins keep only matching pairs, so filtering during or after the match is equivalent; the ON/WHERE distinction only carries semantics for outer joins.'
        }
      ]
    },
    {
      key: 'aggregation',
      title: 'Aggregation: GROUP BY, HAVING, conditional counts',
      body: `# Aggregation: GROUP BY, HAVING, conditional counts

GROUP BY partitions the filtered row set into groups sharing the same key values, then collapses each group to one output row. Aggregates — \`COUNT\`, \`SUM\`, \`AVG\`, \`MIN\`, \`MAX\`, SQLite's \`group_concat\` — compute over each group. With aggregates but no GROUP BY, the whole result is one group (and an empty input still yields one row: \`COUNT(*)\` = 0, the others NULL).

\`\`\`sql
SELECT media_type, status, COUNT(*) AS n, AVG(score) AS avg_score
FROM media_item
GROUP BY media_type, status
ORDER BY n DESC
\`\`\`

## WHERE vs HAVING

WHERE filters rows *before* grouping; HAVING filters groups *after* aggregation. WHERE therefore cannot reference an aggregate, and HAVING exists precisely so you can:

\`\`\`sql
-- artists with at least 5 liked tracks
SELECT ar.name, COUNT(*) AS liked
FROM music_track t
JOIN music_artist ar ON ar.id = t.artist_id
WHERE t.liked = 1          -- row filter: cheap, shrinks the groups
GROUP BY ar.id
HAVING COUNT(*) >= 5       -- group filter: needs the count to exist
\`\`\`

Anything that *can* go in WHERE should — it shrinks the data before the (comparatively expensive) grouping. Using HAVING for a plain row predicate works in SQLite but wastes work and reads wrong.

## COUNT(*) vs COUNT(col)

\`COUNT(*)\` counts rows. \`COUNT(col)\` counts rows where col is not NULL. \`COUNT(DISTINCT col)\` counts distinct non-NULL values. This makes NULL-skipping a feature:

\`\`\`sql
SELECT COUNT(*) AS titles,
       COUNT(score) AS rated,
       COUNT(*) - COUNT(score) AS unrated
FROM media_item
\`\`\`

The same skipping applies to every aggregate: \`AVG(score)\` averages only the rated rows. If you want NULLs to count as zero, say so: \`AVG(COALESCE(score, 0))\` — a genuinely different statistic.

## Bare columns: the SQLite quirk

Standard SQL rejects a SELECT column that is neither grouped nor aggregated. SQLite instead returns the value from *some arbitrary row* of the group — a silent correctness bug in most queries, because which row is unspecified. The one blessed exception: when the query uses a bare \`MIN(x)\` or \`MAX(x)\`, other bare columns come from the row that held that min/max, which makes "the newest row per group" a supported one-liner:

\`\`\`sql
SELECT media_id, MAX(created_at) AS latest, page  -- page rides along
FROM manga_chapter
GROUP BY media_id
\`\`\`

Rely on that only deliberately, and only in SQLite; elsewhere use a window function.

## Conditional aggregation

Pivot-style counts in one pass, no self-joins. The portable spelling embeds CASE in the aggregate; SQLite (3.30+) also supports the cleaner \`FILTER\` clause:

\`\`\`sql
SELECT media_type,
  COUNT(*) FILTER (WHERE status = 'completed') AS done,
  COUNT(*) FILTER (WHERE status = 'planned')  AS planned,
  SUM(CASE WHEN favorite = 1 THEN 1 ELSE 0 END) AS favs
FROM media_item
GROUP BY media_type
\`\`\`

\`COUNT(CASE WHEN p THEN 1 END)\` (no ELSE, so non-matches are NULL and skipped) is the CASE equivalent of a filtered COUNT. FILTER attaches to any aggregate — \`AVG(score) FILTER (WHERE status = 'completed')\` averages scores of finished titles only.`,
      questions: [
        {
          prompt: 'A table has 8 rows; 3 have email IS NULL. What do COUNT(*) and COUNT(email) return?',
          options: ['8 and 8', '5 and 5', '8 and 5', '8 and 3'],
          correct: 2,
          explain: 'COUNT(*) counts rows regardless of content (8); COUNT(email) skips NULLs (5).'
        },
        {
          prompt: 'Why should a plain row-level filter live in WHERE rather than HAVING, even though SQLite accepts both?',
          options: [
            'HAVING cannot use indexes at all',
            'WHERE runs before grouping, so groups are built from less data',
            'HAVING silently skips NULL rows',
            'HAVING may only contain aggregate functions, so a row-level test there is rejected outright'
          ],
          correct: 1,
          explain: 'Both give the same rows here, but WHERE shrinks the input to GROUP BY. HAVING is for predicates over aggregates, which cannot exist before grouping.'
        },
        {
          prompt: 'In SQLite, SELECT dept, name, MAX(salary) FROM emp GROUP BY dept returns name from which row?',
          options: [
            'It is a syntax error, as in standard SQL',
            'An arbitrary row of the group, unspecified',
            'The first row inserted into the group',
            'The row that holds that group\'s maximum salary'
          ],
          correct: 3,
          explain: 'The bare-column-with-MIN/MAX exception: SQLite guarantees other bare columns come from the min/max row. Without a bare MIN/MAX the value would be from an arbitrary row.'
        },
        {
          prompt: "Which expression counts rows matching a predicate within an aggregate, portably (no FILTER clause)?",
          options: [
            "COUNT(CASE WHEN status = 'done' THEN 1 END)",
            "COUNT(status = 'done')",
            "SUM(status = 'done' OR NULL)",
            "COUNT(*) WHERE status = 'done'"
          ],
          correct: 0,
          explain: "The CASE yields 1 for matches and NULL otherwise, and COUNT skips NULLs. COUNT(status = 'done') counts every row where the boolean expression is non-NULL — including false ones."
        }
      ]
    },
    {
      key: 'subqueries-ctes',
      title: 'Subqueries and CTEs',
      body: `# Subqueries and CTEs

A subquery can stand in for a value, a set, or a table. A *scalar* subquery returns one row, one column, and is usable anywhere an expression goes:

\`\`\`sql
SELECT title, score,
  score - (SELECT AVG(score) FROM media_item) AS vs_avg
FROM media_item
WHERE score IS NOT NULL
\`\`\`

If a scalar subquery returns no rows it yields NULL; in SQLite, extra rows are silently truncated to the first (other engines raise an error — do not rely on it).

## Correlated subqueries

A subquery that references the outer row is *correlated* — logically re-evaluated per row:

\`\`\`sql
-- each anime's newest theme song
SELECT m.title,
  (SELECT ts.song_title FROM theme_song ts
   WHERE ts.media_id = m.id
   ORDER BY ts.id DESC LIMIT 1) AS latest_song
FROM media_item m WHERE m.media_type = 'anime'
\`\`\`

Fine when the inner lookup is indexed (here: an index on \`theme_song.media_id\`); a correlated scan inside a large outer query is the classic accidental O(n*m).

## IN vs EXISTS

\`IN (subquery)\` tests membership of a value; \`EXISTS (subquery)\` tests whether any row comes back, typically correlated:

\`\`\`sql
SELECT title FROM media_item m
WHERE EXISTS (
  SELECT 1 FROM media_tag mt WHERE mt.media_id = m.id AND mt.tag_id = 7
)
\`\`\`

For the positive form they optimize similarly and the choice is stylistic. The semantics only really diverge on the negated form: \`NOT IN\` returns nothing if the subquery produces a NULL (three-valued logic again), while \`NOT EXISTS\` just counts rows and is immune. Default to EXISTS/NOT EXISTS for correlated tests.

## CTEs

\`WITH\` names a subquery so it can be referenced (even several times) and read top-down:

\`\`\`sql
WITH rated AS (
  SELECT media_type, score FROM media_item WHERE score IS NOT NULL
),
per_type AS (
  SELECT media_type, AVG(score) AS avg_score, COUNT(*) AS n
  FROM rated GROUP BY media_type
)
SELECT * FROM per_type WHERE n >= 10 ORDER BY avg_score DESC
\`\`\`

A CTE is not automatically a temp table. SQLite decides per use: a CTE referenced once is usually *inlined* into the outer query (fully optimizable, predicates pushed down); one referenced twice or more is typically *materialized* once. You can force either with \`WITH t AS MATERIALIZED (...)\` or \`AS NOT MATERIALIZED (...)\` (3.35+). MATERIALIZED acts as an optimization fence — handy to compute an expensive intermediate exactly once, harmful when it blocks an index-friendly pushdown. Same query, both behaviors; EXPLAIN QUERY PLAN tells you which you got.

## Recursive CTEs

A recursive CTE iterates: an initial SELECT seeds the working set, then the part after UNION ALL runs repeatedly on the newest rows until it produces none. A tree walk over a self-referencing table:

\`\`\`sql
WITH RECURSIVE subtree(id, name, depth) AS (
  SELECT id, name, 0 FROM category WHERE id = 42
  UNION ALL
  SELECT c.id, c.name, s.depth + 1
  FROM category c JOIN subtree s ON c.parent_id = s.id
)
SELECT * FROM subtree ORDER BY depth
\`\`\`

\`UNION\` (without ALL) additionally discards rows already seen — that dedup is what terminates a walk over a *cyclic* graph. With UNION ALL, a cycle recurses forever; add a depth cap or carry a path string and test membership.`,
      questions: [
        {
          prompt: 'A scalar subquery in a SELECT list matches zero rows. What does it evaluate to in SQLite?',
          options: ['0', 'An error', 'NULL', 'The empty string'],
          correct: 2,
          explain: 'No row means no value: the scalar subquery yields NULL. (Multiple rows are truncated to the first in SQLite; other engines error.)'
        },
        {
          prompt: 'When do IN and EXISTS meaningfully differ in behavior (not just style)?',
          options: [
            'EXISTS cannot be correlated with the outer query',
            'In the negated form: NOT IN yields no rows if the subquery emits a NULL, NOT EXISTS is unaffected',
            'IN forces materialization of the subquery, EXISTS never does',
            'IN only accepts literal lists, not subqueries'
          ],
          correct: 1,
          explain: 'Positive IN/EXISTS optimize alike. NOT IN inherits the x != NULL three-valued-logic trap; NOT EXISTS merely checks row existence and has no such failure mode.'
        },
        {
          prompt: 'What does AS MATERIALIZED on a CTE do?',
          options: [
            'Forces the CTE to be computed once into a transient table — an optimization fence',
            'Writes the CTE to a permanent table for later sessions',
            'Enables recursion within the CTE',
            'Caches the CTE result across separate query executions on the same open connection'
          ],
          correct: 0,
          explain: 'MATERIALIZED guarantees compute-once semantics but blocks predicate pushdown into the CTE; NOT MATERIALIZED requests inlining. By default SQLite chooses based on how many times the CTE is referenced.'
        },
        {
          prompt: 'A recursive CTE over a graph with cycles uses UNION ALL. What happens?',
          options: [
            'SQLite detects the cycle and stops',
            'The recursion never terminates (until a LIMIT or depth guard stops it)',
            'It behaves identically to UNION',
            'The query errors at parse time'
          ],
          correct: 1,
          explain: 'UNION ALL keeps duplicates, so a cycle keeps re-generating visited rows forever. Plain UNION discards already-seen rows, which is what terminates cyclic walks.'
        }
      ]
    },
    {
      key: 'window-functions',
      title: 'Window functions',
      body: `# Window functions

An aggregate collapses rows; a window function computes over a set of related rows but *keeps every row*. The \`OVER\` clause defines that set: \`PARTITION BY\` splits rows into independent groups (like GROUP BY, minus the collapsing), \`ORDER BY\` orders rows within each partition, and an optional frame clause narrows which peers are visible.

\`\`\`sql
SELECT title, media_type, score,
  AVG(score) OVER (PARTITION BY media_type) AS type_avg,
  score - AVG(score) OVER (PARTITION BY media_type) AS delta
FROM media_item WHERE score IS NOT NULL
\`\`\`

One pass, no self-join, every row annotated with its group's average. Window functions are evaluated after WHERE/GROUP BY/HAVING and before ORDER BY — so you cannot filter on one directly in WHERE; wrap the query.

## Ranking: ROW_NUMBER, RANK, DENSE_RANK

All three number rows by the window ORDER BY; they differ only on ties. For scores 100, 90, 90, 80:

- \`ROW_NUMBER()\`: 1, 2, 3, 4 — ties broken arbitrarily, always unique
- \`RANK()\`: 1, 2, 2, 4 — ties share a rank, next rank skips
- \`DENSE_RANK()\`: 1, 2, 2, 3 — ties share, no gaps

Use ROW_NUMBER when you need exactly one winner (dedup, pagination), RANK for competition-style standings, DENSE_RANK when ranks must stay contiguous.

## Top-N per group

The idiom windows can do and GROUP BY cannot:

\`\`\`sql
-- 3 highest-scored titles of each media type
SELECT * FROM (
  SELECT title, media_type, score,
    ROW_NUMBER() OVER (
      PARTITION BY media_type ORDER BY score DESC
    ) AS rn
  FROM media_item WHERE score IS NOT NULL
)
WHERE rn <= 3
\`\`\`

The subquery is required because WHERE cannot see window results (evaluation order). Swap in RANK to include ties past N.

## LAG and LEAD

\`LAG(expr, n, default)\` reads a column from n rows earlier in the partition; LEAD reads ahead. Deltas between consecutive rows:

\`\`\`sql
SELECT played_at, score,
  score - LAG(score) OVER (ORDER BY played_at) AS improvement
FROM quiz_session
WHERE kind = 'song'
\`\`\`

The first row has no predecessor, so LAG yields NULL (or the third-argument default). LAG/LEAD ignore the frame clause — they address by row offset within the whole partition.

## Running totals and frames

With ORDER BY inside OVER, aggregates become cumulative — but the *default frame* has a trap. It is \`RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\`, and RANGE includes all *peers* of the current row: rows tied on the ORDER BY key get the same running total. For a strict row-by-row total, say ROWS explicitly:

\`\`\`sql
SELECT day, plays,
  SUM(plays) OVER (
    ORDER BY day
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative,
  AVG(plays) OVER (
    ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS week_avg
FROM daily_plays
\`\`\`

\`ROWS BETWEEN 6 PRECEDING AND CURRENT ROW\` is a 7-row moving window — the standard moving-average shape. If the ORDER BY key is unique, RANGE and ROWS coincide, which is why the bug hides until duplicate keys appear.

A repeated OVER clause can be named once with WINDOW: \`WINDOW w AS (PARTITION BY media_type ORDER BY score DESC)\` then \`RANK() OVER w\` — same semantics, less noise.`,
      questions: [
        {
          prompt: 'For values 50, 40, 40, 30 ordered descending, what does DENSE_RANK() assign?',
          options: ['1, 2, 2, 4', '1, 2, 3, 4', '1, 2, 2, 3', '1, 1, 2, 3'],
          correct: 2,
          explain: 'DENSE_RANK gives ties the same rank and never skips: the 30 gets rank 3. RANK would give 1, 2, 2, 4.'
        },
        {
          prompt: 'Why must the top-N-per-group pattern wrap ROW_NUMBER() in a subquery before filtering rn <= 3?',
          options: [
            'Window functions are evaluated after WHERE, so WHERE cannot reference their results directly',
            'ROW_NUMBER cannot appear in the same SELECT as ordinary columns',
            'PARTITION BY forbids any WHERE in the same query',
            'The optimizer requires it for index use'
          ],
          correct: 0,
          explain: 'WHERE runs before window evaluation in the logical pipeline; the subquery turns the window result into an ordinary column the outer WHERE can filter.'
        },
        {
          prompt: 'SUM(x) OVER (ORDER BY d) with duplicate d values produces equal "running totals" for the tied rows. Why?',
          options: [
            'SUM skips rows whose ORDER BY key repeats',
            'The default frame is RANGE ... CURRENT ROW, which includes all peer rows tied on the ORDER BY key',
            'Ties make the sort unstable, randomizing the sum',
            'SQLite computes window sums per distinct key by design'
          ],
          correct: 1,
          explain: 'RANGE frames end at the current row and its peers, so every tied row sees the same total. Spell ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW for a strict per-row total.'
        },
        {
          prompt: 'What does LAG(score) OVER (ORDER BY played_at) return for the first row of the partition?',
          options: ['0', 'The last row\'s score (wraps around)', 'An error', 'NULL, unless a default third argument is given'],
          correct: 3,
          explain: 'There is no preceding row, so LAG yields NULL; LAG(score, 1, 0) would substitute 0.'
        }
      ]
    },
    {
      key: 'indexes-planning',
      title: 'Indexes and query planning',
      body: `# Indexes and query planning

A B-tree index is a sorted structure over one or more columns, each entry pointing back to its table row (in SQLite, via the rowid). Sorted order buys two things: binary search for point lookups and in-order traversal for ranges and ORDER BY. The costs: every write updates each index, and reads that go through an index pay one extra lookup per row to fetch the rest of the columns from the table.

\`\`\`sql
CREATE INDEX idx_theme_song_media ON theme_song (media_id)
\`\`\`

## Composite indexes: column order is the design

An index on \`(a, b, c)\` is sorted by a, then b within a, then c within b — like a phone book sorted by last name, first name. It serves:

- equality on a
- equality on a plus equality or range on b
- equality on a and b plus anything on c
- ORDER BY that follows the same prefix

It does *not* help a query filtering only on b or c — that is a scan of the whole index at best. And a range breaks the chain: \`WHERE a = 1 AND b > 5 AND c = 9\` uses the index for a and the b range, but c is filtered row-by-row afterwards. Rule of thumb: equality columns first, then the one range or ORDER BY column last. One \`(a, b)\` index also makes a separate \`(a)\` index redundant.

## Covering indexes

If the index contains every column a query touches, SQLite answers from the index alone and never visits the table — the plan says \`USING COVERING INDEX\`. For a hot query like "song titles for an anime", \`CREATE INDEX ... ON theme_song (media_id, song_title)\` turns each lookup into a pure index range scan. The trade is a fatter index; cover deliberately, not by default.

## When an index is skipped

The planner can only match an index to a predicate it can see the shape of:

- A function or expression over the column: \`WHERE lower(title) = 'akira'\` cannot use an index on title. Fix with an expression index (\`CREATE INDEX ... ON media_item (lower(title))\`) or SQLite's \`COLLATE NOCASE\`.
- A leading wildcard: \`LIKE '%kagi'\` has no usable prefix. \`LIKE 'aka%'\` can use an index, but in SQLite only when the column's collation matches LIKE's case-insensitive behavior (text columns need NOCASE, or use \`GLOB\`). Substring search wants FTS5, not B-trees.
- Type mismatches: comparing a TEXT column to a number can force affinity conversions that disqualify the index.
- Low selectivity: if most rows match, a table scan is genuinely cheaper and the planner is right to skip the index.

## EXPLAIN QUERY PLAN and ANALYZE

Never guess — ask. \`EXPLAIN QUERY PLAN SELECT ...\` (EQP) prints the strategy, one line per table:

\`\`\`sql
EXPLAIN QUERY PLAN
SELECT m.title, ts.song_title
FROM media_item m JOIN theme_song ts ON ts.media_id = m.id
WHERE m.media_type = 'anime'
-- SCAN m
-- SEARCH ts USING INDEX idx_theme_song_media (media_id=?)
\`\`\`

\`SEARCH ... USING INDEX\` is an indexed lookup; \`SCAN\` is a full pass — fine for the driving table of a join, a smell when a WHERE on an indexed column still scans. \`USE TEMP B-TREE FOR ORDER BY\` means the sort is materialized rather than read from an index. Plain \`EXPLAIN\` dumps bytecode; you almost always want EQP.

\`ANALYZE\` gathers table and index statistics into \`sqlite_stat1\` so the planner can compare strategies with real cardinalities instead of defaults — cheap to run, worth doing after bulk loads. \`PRAGMA optimize\` on connection close is the low-effort way to keep stats fresh.`,
      questions: [
        {
          prompt: 'With an index on (media_type, status, score), which WHERE clause can use it least effectively?',
          options: [
            "media_type = 'anime' AND status = 'completed'",
            "status = 'completed' AND score > 80",
            "media_type = 'anime' AND score > 80",
            "media_type = 'anime' AND status = 'completed' AND score > 80"
          ],
          correct: 1,
          explain: 'Without a predicate on the leading column media_type, the sorted order is useless for seeking — the best case is scanning the whole index. Option 3 uses the first column, then filters score.'
        },
        {
          prompt: "Why can't WHERE lower(title) = 'akira' use a plain index on title?",
          options: [
            'lower() is not deterministic in SQLite, so the planner will not use an index with it',
            'Indexes never apply to TEXT columns',
            'String functions force a temp B-tree',
            'The index stores title values, not lower(title) values, so its order says nothing'
          ],
          correct: 3,
          explain: 'The predicate is over a computed expression the index does not contain. An expression index on lower(title), or COLLATE NOCASE, restores index use.'
        },
        {
          prompt: 'In EXPLAIN QUERY PLAN output, what does "SEARCH t USING COVERING INDEX ..." mean?',
          options: [
            'The query is answered from the index alone, never touching the table rows',
            'The index covers every row of the table',
            'The index is being rebuilt to cover the query',
            'A full scan of the index with no seeking'
          ],
          correct: 0,
          explain: 'Covering means every column the query needs is present in the index entries, eliminating the per-row table lookup.'
        },
        {
          prompt: 'What does ANALYZE actually do?',
          options: [
            'Rewrites stored queries into a canonical optimized form that the planner can cost directly',
            'Collects statistics into sqlite_stat1 so the planner can estimate real cardinalities',
            'Defragments indexes like VACUUM',
            'Prints the query plan for the last statement'
          ],
          correct: 1,
          explain: 'ANALYZE is purely about statistics; better estimates change plan choices (e.g., which index, or index vs scan). It rewrites nothing and reclaims nothing.'
        }
      ]
    },
    {
      key: 'sqlite-specifics',
      title: 'SQLite specifics: affinity, UPSERT, JSON1, WAL',
      body: `# SQLite specifics: affinity, UPSERT, JSON1, WAL

SQLite differs from the big servers in ways that bite exactly once each. This lesson is the once.

## Type affinity and STRICT tables

Column types are *affinities*, not constraints. Declaring \`score INTEGER\` means "prefer to store integers": \`'42'\` is coerced to 42, but \`'abc'\` is stored as-is, as TEXT, without error. Affinity is derived from the declared type name by substring rules (contains INT gives INTEGER; CHAR/CLOB/TEXT gives TEXT; BLOB or nothing gives BLOB; REAL/FLOA/DOUB gives REAL; else NUMERIC) — which is why a column declared \`FLOATING POINT\` gets INTEGER affinity (the substring INT wins) and \`STRING\` gets NUMERIC, one of SQLite's honest footguns. Since 3.37, \`CREATE TABLE ... STRICT\` opts a table into real type checking: only INT/INTEGER/REAL/TEXT/BLOB/ANY are allowed, and inserting \`'abc'\` into an INT column is an error. Existing schemas keep flexible typing; mixed-type columns then compare by storage class (INTEGER < TEXT), which can make a "numeric" TEXT column sort lexically.

## UPSERT

\`INSERT ... ON CONFLICT (...) DO UPDATE\` targets a specific unique constraint and reacts to just that conflict. The \`excluded.\` pseudo-table holds the row that failed to insert:

\`\`\`sql
INSERT INTO settings (key, value) VALUES ('theme', 'lain')
ON CONFLICT (key) DO UPDATE SET value = excluded.value

-- keep personal fields, refresh canonical ones
INSERT INTO gacha_unit (game, kind, external_id, name, rarity)
VALUES (?, ?, ?, ?, ?)
ON CONFLICT (game, kind, external_id) DO UPDATE SET
  name = excluded.name,
  rarity = excluded.rarity,
  image_path = COALESCE(excluded.image_path, image_path)
\`\`\`

An unqualified column in DO UPDATE means the existing row; \`excluded.col\` means the incoming one — the COALESCE pattern keeps old data when the new value is NULL. \`DO NOTHING\` skips silently. The conflict target is required for DO UPDATE, and only UNIQUE/PK constraints qualify.

## INSERT OR IGNORE / OR REPLACE

Older and blunter. \`OR IGNORE\` skips a row on *any* constraint violation — including NOT NULL and CHECK, not just the uniqueness you had in mind. \`OR REPLACE\` is the sharp one: it *deletes* every conflicting row, then inserts. That delete is real — ON DELETE CASCADE fires and takes child rows with it, delete triggers run, and the new row gets a fresh rowid, breaking anything that stored the old id. \`REPLACE INTO\` is the same statement. Prefer UPSERT: it updates in place, preserves the rowid and children, and names the constraint it handles.

## JSON1

The JSON functions make a TEXT column queryable — how this app stores importer metadata:

\`\`\`sql
SELECT title, json_extract(metadata, '$.seasonYear') AS year
FROM media_item
WHERE json_extract(metadata, '$.season') = 'WINTER'

UPDATE media_item
SET metadata = json_set(COALESCE(metadata, '{}'), '$.season', 'SPRING')
WHERE id = ?
\`\`\`

\`->\` and \`->>\` (3.38+) mirror Postgres: \`->>\` returns SQL values, \`->\` returns JSON. \`json_set\` creates-or-replaces a path, \`json_each\` explodes an array into rows for joining. JSON extraction in WHERE is a full scan unless you build an expression index on the extract.

## Transactions and WAL

Every statement runs in its own implicit transaction; wrap multi-statement work in \`BEGIN ... COMMIT\` (better-sqlite3: \`db.transaction(fn)\`) for atomicity *and* speed — one fsync instead of hundreds makes bulk inserts orders of magnitude faster. SQLite allows one writer at a time. In the default rollback-journal mode, a writer blocks readers; \`PRAGMA journal_mode = WAL\` appends changes to a write-ahead log instead, so readers keep reading a consistent snapshot while one writer writes. WAL is persistent (set once per database) and is the right default for interactive apps; occasional checkpoints fold the log back into the main file. \`BEGIN IMMEDIATE\` takes the write lock up front, avoiding "database is locked" upgrades mid-transaction under concurrency.`,
      questions: [
        {
          prompt: "A column is declared FLOATING POINT in a non-STRICT SQLite table. What affinity does it get?",
          options: ['REAL', 'NUMERIC', 'INTEGER', 'BLOB'],
          correct: 2,
          explain: "Affinity rules match substrings in order, and 'FLOATING POINT' contains 'INT', which maps to INTEGER before the REAL rules are consulted — a classic affinity footgun."
        },
        {
          prompt: 'In an ON CONFLICT DO UPDATE clause, what does excluded.name refer to?',
          options: [
            'The value from the row that the INSERT attempted to insert',
            'The existing row\'s current value',
            'The column default',
            'NULL, since the row was excluded'
          ],
          correct: 0,
          explain: 'excluded is the incoming, conflicting row; a bare column name in DO UPDATE refers to the row already in the table.'
        },
        {
          prompt: 'Why is INSERT OR REPLACE dangerous on a table referenced by ON DELETE CASCADE foreign keys?',
          options: [
            'It disables foreign key checks for the statement',
            'It updates children to point at a random parent',
            'It fails with a constraint error whenever children exist',
            'It deletes the conflicting row before inserting, so cascades fire and child rows are destroyed'
          ],
          correct: 3,
          explain: 'REPLACE is delete-then-insert: delete triggers and cascades run, and the new row gets a new rowid. UPSERT updates in place and avoids all of it.'
        },
        {
          prompt: 'What changes when a SQLite database switches to WAL journal mode?',
          options: [
            'Multiple writers can commit concurrently, since each appends to its own log',
            'Readers no longer block on a writer — they read a snapshot while it appends',
            'Transactions become durable without any fsync',
            'The database file becomes read-only until a checkpoint'
          ],
          correct: 1,
          explain: 'WAL decouples readers from the single writer; writes append to the -wal file and checkpoints merge it back. There is still only one writer at a time.'
        },
        {
          prompt: 'Why is wrapping 10,000 INSERTs in one transaction dramatically faster than 10,000 bare INSERTs?',
          options: [
            'Each bare INSERT is its own implicit transaction and pays a durability sync; one transaction pays roughly one',
            'SQLite batches statements into pages only inside explicit transactions',
            'Autocommit mode re-parses the statement each time',
            'The transaction disables index maintenance until COMMIT'
          ],
          correct: 0,
          explain: 'The per-commit fsync dominates; amortizing it over the batch is the win. Prepared statements avoid re-parsing, but that is a separate (smaller) effect.'
        }
      ]
    }
  ]
}
