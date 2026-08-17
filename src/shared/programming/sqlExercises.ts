// The SQL sandbox: a small self-referential dataset (studios, anime, episodes,
// tags) plus exercises with an expected query. Everything here is code with
// FROZEN keys (the programming/ convention). Main seeds an in-memory SQLite
// from `SQL_DATASET`, runs the user's SELECT in a killable utility process and
// compares the rows to `expectedSql`'s — see main/sqlSandboxCore.ts.
//
// Authoring rules: no random(), no dates relative to now, deliberate NULLs
// (studio-less anime, unscored anime, unknown episode minutes) so NULL / LEFT
// JOIN exercises have something to find; every exercise prompt NAMES the
// columns (and aliases) the result must have; `orderMatters` only when the
// prompt says "ordered by".

export interface SqlColumn {
  name: string
  type: string
  note?: string
}
export interface SqlDatasetTable {
  name: string
  columns: SqlColumn[]
}
export interface SqlDataset {
  ddl: string
  inserts: string
  tables: SqlDatasetTable[] // drives the Schema panel; tests check it against PRAGMA table_info
}

export interface SqlExercise {
  key: string // FROZEN kebab-case
  title: string
  prompt: string // names every required column / alias
  level: 1 | 2 | 3
  concept: string // short chip: 'WHERE', 'LEFT JOIN', 'window'
  lessonKey?: string // e.g. 'sql/joins' — link back to the course
  expectedSql: string
  orderMatters?: boolean
  hint: string
}

// Dataset shape, for authoring exercises against it:
//   studio     8 rows — Trigger has no anime; CloverWorks has NULL founded
//   anime     24 rows — 2 without a studio (23, 24), 3 without a score (16, 23, 24),
//                       statuses completed / watching / planned / dropped
//   episode   83 rows — 10 anime have episode rows (1, 2, 5, 10, 13, 14, 15, 21, 23, 24),
//                       14 have none; 3 rows with NULL minutes; Frieren's 4 share one aired date
//   tag       10 rows — sports and horror are used by nobody
//   anime_tag 37 rows — My Hero Academia (19) and Aragne (24) carry no tags
export const SQL_DATASET: SqlDataset = {
  ddl: `
CREATE TABLE studio (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  country TEXT NOT NULL,
  founded INTEGER
);
CREATE TABLE anime (
  id        INTEGER PRIMARY KEY,
  title     TEXT NOT NULL,
  studio_id INTEGER REFERENCES studio(id),
  year      INTEGER NOT NULL,
  episodes  INTEGER NOT NULL,
  score     REAL,
  status    TEXT NOT NULL
);
CREATE TABLE episode (
  id       INTEGER PRIMARY KEY,
  anime_id INTEGER NOT NULL REFERENCES anime(id),
  number   INTEGER NOT NULL,
  title    TEXT NOT NULL,
  minutes  INTEGER,
  aired    TEXT NOT NULL
);
CREATE TABLE tag (
  id   INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
CREATE TABLE anime_tag (
  anime_id INTEGER NOT NULL REFERENCES anime(id),
  tag_id   INTEGER NOT NULL REFERENCES tag(id),
  PRIMARY KEY (anime_id, tag_id)
);
`,
  inserts: `
INSERT INTO studio (id, name, country, founded) VALUES
  (1, 'Kyoto Animation', 'JP', 1981),
  (2, 'MAPPA', 'JP', 2011),
  (3, 'ufotable', 'JP', 2000),
  (4, 'Bones', 'JP', 1998),
  (5, 'Madhouse', 'JP', 1972),
  (6, 'Wit Studio', 'JP', 2012),
  (7, 'Trigger', 'JP', 2011),
  (8, 'CloverWorks', 'JP', NULL);

INSERT INTO anime (id, title, studio_id, year, episodes, score, status) VALUES
  (1, 'Violet Evergarden', 1, 2018, 13, 8.7, 'completed'),
  (2, 'Chainsaw Man', 2, 2022, 12, 8.5, 'watching'),
  (3, 'Demon Slayer', 3, 2019, 26, 8.5, 'completed'),
  (4, 'Fullmetal Alchemist: Brotherhood', 4, 2009, 64, 9.1, 'completed'),
  (5, 'Death Note', 5, 2006, 37, 8.6, 'completed'),
  (6, 'Attack on Titan', 6, 2013, 25, 8.5, 'completed'),
  (7, 'Hyouka', 1, 2012, 22, 8.1, 'completed'),
  (8, 'Jujutsu Kaisen', 2, 2020, 24, 8.6, 'watching'),
  (9, 'Fate/Zero', 3, 2011, 25, 8.3, 'completed'),
  (10, 'Mob Psycho 100', 4, 2016, 12, 8.4, 'completed'),
  (11, 'One Punch Man', 5, 2015, 12, 8.5, 'completed'),
  (12, 'Vinland Saga', 6, 2019, 24, 8.7, 'completed'),
  (13, 'The Promised Neverland', 8, 2019, 12, 8.3, 'completed'),
  (14, 'Bocchi the Rock!', 8, 2022, 12, 8.8, 'completed'),
  (15, 'K-On!', 1, 2009, 13, 7.9, 'completed'),
  (16, 'Sound! Euphonium', 1, 2015, 13, NULL, 'planned'),
  (17, 'Dorohedoro', 2, 2020, 12, 8.1, 'dropped'),
  (18, 'Yuri on Ice', 2, 2016, 12, 7.9, 'completed'),
  (19, 'My Hero Academia', 4, 2016, 13, 7.8, 'dropped'),
  (20, 'Hunter x Hunter', 5, 2011, 148, 9.0, 'watching'),
  (21, 'Frieren: Beyond Journey''s End', 5, 2023, 28, 9.3, 'completed'),
  (22, 'Spy x Family', 6, 2022, 12, 8.4, 'watching'),
  (23, 'Pale Cocoon', NULL, 2006, 1, NULL, 'planned'),
  (24, 'Aragne: Sign of Vermillion', NULL, 2018, 1, NULL, 'dropped');

INSERT INTO episode (id, anime_id, number, title, minutes, aired) VALUES
  (1, 1, 1, '"I Love You" and Auto Memory Dolls', 24, '2018-01-11'),
  (2, 1, 2, 'Never Coming Back', 24, '2018-01-18'),
  (3, 1, 3, 'May You Be an Exemplary Auto Memory Doll', 24, '2018-01-25'),
  (4, 1, 4, 'You Won''t Be a Tool, but a Person Worthy of the Name', 24, '2018-02-01'),
  (5, 1, 5, 'You Write Letters That Bring People Together?', 24, '2018-02-08'),
  (6, 1, 6, 'Somewhere, Under a Starry Sky', 24, '2018-02-15'),
  (7, 1, 7, 'Untitled', NULL, '2018-02-22'),
  (8, 1, 8, 'Untitled', 24, '2018-03-01'),
  (9, 1, 9, 'Violet Evergarden', 24, '2018-03-08'),
  (10, 1, 10, 'Loved Ones Will Always Watch Over You', 24, '2018-03-15'),
  (11, 1, 11, 'I Don''t Want Anybody Else to Die', 24, '2018-03-22'),
  (12, 1, 12, 'Untitled', 24, '2018-03-29'),
  (13, 1, 13, 'Auto Memory Doll and "I Love You"', 24, '2018-04-05'),
  (14, 2, 1, 'Dog & Chainsaw', 24, '2022-10-12'),
  (15, 2, 2, 'Arrival in Tokyo', 24, '2022-10-19'),
  (16, 2, 3, 'Meowy''s Whereabouts', 24, '2022-10-26'),
  (17, 2, 4, 'Rescue', 24, '2022-11-02'),
  (18, 2, 5, 'Gun Devil', 24, '2022-11-09'),
  (19, 2, 6, 'Kill Denji', 24, '2022-11-16'),
  (20, 2, 7, 'The Taste of a Kiss', 24, '2022-11-23'),
  (21, 2, 8, 'Gunfire', 24, '2022-11-30'),
  (22, 2, 9, 'From Kyoto', 24, '2022-12-07'),
  (23, 2, 10, 'Bruised & Battered', 24, '2022-12-14'),
  (24, 2, 11, 'Mission Start', 24, '2022-12-21'),
  (25, 2, 12, 'Katana vs. Chainsaw', 24, '2022-12-28'),
  (26, 5, 1, 'Rebirth', 23, '2006-10-04'),
  (27, 5, 2, 'Confrontation', 23, '2006-10-11'),
  (28, 5, 3, 'Dealings', 23, '2006-10-18'),
  (29, 10, 1, 'Self-Proclaimed Psychic: Reigen Arataka', 24, '2016-07-12'),
  (30, 10, 2, 'Doubts About Youth', 24, '2016-07-19'),
  (31, 10, 3, 'An Invitation to a Meeting', 24, '2016-07-26'),
  (32, 10, 4, 'Idiots Only Event', 24, '2016-08-02'),
  (33, 10, 5, 'Ochimusha', 24, '2016-08-09'),
  (34, 10, 6, 'Discord', 24, '2016-08-16'),
  (35, 10, 7, 'Exaltation', 24, '2016-08-23'),
  (36, 10, 8, 'The Older Brother Bows', 24, '2016-08-30'),
  (37, 10, 9, 'Claw', 24, '2016-09-06'),
  (38, 10, 10, 'The Heinous Aura', 24, '2016-09-13'),
  (39, 10, 11, 'Master', 24, '2016-09-20'),
  (40, 10, 12, 'Mob and Reigen', 24, '2016-09-27'),
  (41, 13, 1, '121045', 23, '2019-01-11'),
  (42, 13, 2, '131045', 23, '2019-01-18'),
  (43, 13, 3, '181045', 23, '2019-01-25'),
  (44, 13, 4, '291045', 23, '2019-02-01'),
  (45, 13, 5, '301045', 23, '2019-02-08'),
  (46, 13, 6, '311045', 23, '2019-02-15'),
  (47, 13, 7, '011145', 23, '2019-02-22'),
  (48, 13, 8, '021145', 23, '2019-03-01'),
  (49, 13, 9, '031145', 23, '2019-03-08'),
  (50, 13, 10, '130146', 23, '2019-03-15'),
  (51, 13, 11, '140146', 23, '2019-03-22'),
  (52, 13, 12, '150146', 23, '2019-03-29'),
  (53, 14, 1, 'Bocchi the Rock', 24, '2022-10-09'),
  (54, 14, 2, 'See You Tomorrow', 24, '2022-10-16'),
  (55, 14, 3, 'Be Right There', 24, '2022-10-23'),
  (56, 14, 4, 'Jumping Girl(s)', 24, '2022-10-30'),
  (57, 14, 5, 'Flightless Fish', 24, '2022-11-06'),
  (58, 14, 6, 'Eight Views', 24, '2022-11-13'),
  (59, 14, 7, 'Tomorrow Never Knows', 24, '2022-11-20'),
  (60, 14, 8, 'Bocchi the Rock', 24, '2022-11-27'),
  (61, 14, 9, 'Enoshima Escar', 24, '2022-12-04'),
  (62, 14, 10, 'After Dark', 24, '2022-12-11'),
  (63, 14, 11, 'Twelve-Bar Alone', 24, '2022-12-18'),
  (64, 14, 12, 'Morning Light Falls on You', NULL, '2022-12-25'),
  (65, 15, 1, 'Disband the Club!', 24, '2009-04-03'),
  (66, 15, 2, 'Instruments!', 24, '2009-04-10'),
  (67, 15, 3, 'Cram Session!', 24, '2009-04-17'),
  (68, 15, 4, 'Training Camp!', 24, '2009-04-24'),
  (69, 15, 5, 'Advisor!', 24, '2009-05-01'),
  (70, 15, 6, 'School Festival!', 24, '2009-05-08'),
  (71, 15, 7, 'Christmas!', 24, '2009-05-15'),
  (72, 15, 8, 'Freshman Reception!', 24, '2009-05-22'),
  (73, 15, 9, 'New Club Member!', 24, '2009-05-29'),
  (74, 15, 10, 'Another Training Camp!', 24, '2009-06-05'),
  (75, 15, 11, 'Crisis!', 24, '2009-06-12'),
  (76, 15, 12, 'Light Music!', 24, '2009-06-19'),
  (77, 15, 13, 'Winter Days!', NULL, '2009-06-26'),
  (78, 21, 1, 'The Journey''s End', 24, '2023-09-29'),
  (79, 21, 2, 'It Didn''t Have to Be Magic...', 24, '2023-09-29'),
  (80, 21, 3, 'Killing Magic', 24, '2023-09-29'),
  (81, 21, 4, 'The Land Where Souls Rest', 24, '2023-09-29'),
  (82, 23, 1, 'Pale Cocoon', 23, '2006-01-27'),
  (83, 24, 1, 'Aragne: Sign of Vermillion', 74, '2018-08-18');

INSERT INTO tag (id, name) VALUES
  (1, 'action'),
  (2, 'drama'),
  (3, 'comedy'),
  (4, 'fantasy'),
  (5, 'sci-fi'),
  (6, 'slice-of-life'),
  (7, 'romance'),
  (8, 'mystery'),
  (9, 'sports'),
  (10, 'horror');

INSERT INTO anime_tag (anime_id, tag_id) VALUES
  (1, 2), (1, 4),
  (2, 1), (2, 3),
  (3, 1), (3, 4),
  (4, 1), (4, 4),
  (5, 8), (5, 2),
  (6, 1),
  (7, 8), (7, 6),
  (8, 1),
  (9, 4),
  (10, 1), (10, 3),
  (11, 1), (11, 3),
  (12, 1),
  (13, 8), (13, 2),
  (14, 3), (14, 6),
  (15, 3), (15, 6),
  (16, 2), (16, 6),
  (17, 1), (17, 3), (17, 4),
  (18, 7), (18, 2),
  (20, 1),
  (21, 4),
  (22, 3),
  (23, 5);
`,
  tables: [
    {
      name: 'studio',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'TEXT' },
        { name: 'country', type: 'TEXT' },
        { name: 'founded', type: 'INTEGER', note: 'NULL when unknown' }
      ]
    },
    {
      name: 'anime',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'title', type: 'TEXT' },
        { name: 'studio_id', type: 'INTEGER', note: 'NULL for independent releases' },
        { name: 'year', type: 'INTEGER' },
        { name: 'episodes', type: 'INTEGER', note: 'declared episode count (episode rows may be missing)' },
        { name: 'score', type: 'REAL', note: 'NULL when unscored' },
        { name: 'status', type: 'TEXT', note: "'completed' | 'watching' | 'planned' | 'dropped'" }
      ]
    },
    {
      name: 'episode',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'anime_id', type: 'INTEGER' },
        { name: 'number', type: 'INTEGER' },
        { name: 'title', type: 'TEXT' },
        { name: 'minutes', type: 'INTEGER', note: 'NULL when the runtime is unknown' },
        { name: 'aired', type: 'TEXT', note: "'YYYY-MM-DD'" }
      ]
    },
    {
      name: 'tag',
      columns: [
        { name: 'id', type: 'INTEGER' },
        { name: 'name', type: 'TEXT', note: 'unique' }
      ]
    },
    {
      name: 'anime_tag',
      columns: [
        { name: 'anime_id', type: 'INTEGER' },
        { name: 'tag_id', type: 'INTEGER' }
      ]
    }
  ]
}

export const SQL_EXERCISES: SqlExercise[] = [
  // ---- Level 1: one table ----
  {
    key: 'titles-and-years',
    title: 'Titles and years',
    prompt: 'Return every anime with the columns title and year (nothing else).',
    level: 1,
    concept: 'SELECT',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: 'SELECT title, year FROM anime',
    hint: 'Name the two columns after SELECT instead of using *.'
  },
  {
    key: 'completed-or-watching',
    title: 'Completed hits, or still watching',
    prompt:
      "Return the columns title and score of every anime that is either completed with a score of at least 8.6, or has status 'watching' (whatever its score).",
    level: 1,
    concept: 'WHERE',
    lessonKey: 'sql/select-fundamentals',
    expectedSql:
      "SELECT title, score FROM anime WHERE (status = 'completed' AND score >= 8.6) OR status = 'watching'",
    hint: 'AND binds tighter than OR, so parenthesise the completed-and-scored half.'
  },
  {
    key: 'top-five-scores',
    title: 'Top five',
    prompt:
      'Return the five highest-scored anime as columns title and score, ordered by score descending and then by title ascending to break ties.',
    level: 1,
    concept: 'ORDER BY',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: 'SELECT title, score FROM anime ORDER BY score DESC, title ASC LIMIT 5',
    orderMatters: true,
    hint: 'ORDER BY takes several keys separated by commas; LIMIT comes last.'
  },
  {
    key: 'distinct-years',
    title: 'Release years',
    prompt: 'Return each distinct release year that appears in the anime table, one column named year with no duplicates.',
    level: 1,
    concept: 'DISTINCT',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: 'SELECT DISTINCT year FROM anime',
    hint: 'DISTINCT goes right after SELECT.'
  },
  {
    key: 'unscored-anime',
    title: 'Not scored yet',
    prompt: 'Return the title of every anime that has no score, one column named title.',
    level: 1,
    concept: 'IS NULL',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: 'SELECT title FROM anime WHERE score IS NULL',
    hint: 'NULL is not equal to anything, not even NULL; use IS NULL.'
  },
  {
    key: 'exclamation-titles',
    title: 'Ends with a bang',
    prompt: 'Return the title of every anime whose title ends with an exclamation mark, one column named title.',
    level: 1,
    concept: 'LIKE',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: "SELECT title FROM anime WHERE title LIKE '%!'",
    hint: "In LIKE, % matches any run of characters, so anchor the pattern with the ! at the end."
  },
  {
    key: 'planned-or-dropped',
    title: 'Planned or dropped',
    prompt: "Return the columns title and status of every anime whose status is 'planned' or 'dropped'.",
    level: 1,
    concept: 'IN',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: "SELECT title, status FROM anime WHERE status IN ('planned', 'dropped')",
    hint: 'IN takes a comma-separated list in parentheses.'
  },
  {
    key: 'released-2015-2019',
    title: 'The late 2010s',
    prompt: 'Return the columns title and year of every anime released from 2015 through 2019 inclusive.',
    level: 1,
    concept: 'BETWEEN',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: 'SELECT title, year FROM anime WHERE year BETWEEN 2015 AND 2019',
    hint: 'BETWEEN is inclusive at both ends.'
  },
  {
    key: 'count-anime',
    title: 'How many anime?',
    prompt: 'Return how many rows the anime table has: one row, one column named n.',
    level: 1,
    concept: 'COUNT',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: 'SELECT COUNT(*) AS n FROM anime',
    hint: 'COUNT(*) counts rows; alias it with AS n.'
  },
  {
    key: 'estimated-runtime',
    title: 'Estimated runtime',
    prompt:
      'For every anime return its title and an estimated total runtime assuming 24 minutes per episode: columns title and est_minutes (episodes times 24).',
    level: 1,
    concept: 'arithmetic',
    lessonKey: 'sql/select-fundamentals',
    expectedSql: 'SELECT title, episodes * 24 AS est_minutes FROM anime',
    hint: 'A computed column needs an alias so it can be named est_minutes.'
  },

  // ---- Level 2: joins and aggregates ----
  {
    key: 'anime-with-studio',
    title: 'Anime and their studio',
    prompt:
      'Return every anime that has a studio, as columns title and studio (the studio name aliased studio). Anime without a studio must not appear.',
    level: 2,
    concept: 'INNER JOIN',
    lessonKey: 'sql/joins',
    expectedSql: 'SELECT a.title, s.name AS studio FROM anime a JOIN studio s ON s.id = a.studio_id',
    hint: 'An inner JOIN on anime.studio_id = studio.id drops rows whose studio_id is NULL.'
  },
  {
    key: 'anime-keep-independent',
    title: 'Keep the independents',
    prompt:
      'Return every anime as columns title and studio (the studio name aliased studio), keeping anime that have no studio with studio NULL.',
    level: 2,
    concept: 'LEFT JOIN',
    lessonKey: 'sql/joins',
    expectedSql: 'SELECT a.title, s.name AS studio FROM anime a LEFT JOIN studio s ON s.id = a.studio_id',
    hint: 'LEFT JOIN keeps every row of the left table and fills the right side with NULLs.'
  },
  {
    key: 'studios-without-anime',
    title: 'Studios with nothing tracked',
    prompt: 'Return the name of every studio that has no anime in the anime table, one column named name.',
    level: 2,
    concept: 'anti-join',
    lessonKey: 'sql/joins',
    expectedSql:
      'SELECT s.name FROM studio s LEFT JOIN anime a ON a.studio_id = s.id WHERE a.id IS NULL',
    hint: 'LEFT JOIN anime onto studio, then keep the rows where the anime side stayed NULL.'
  },
  {
    key: 'anime-per-status',
    title: 'Per status',
    prompt:
      'For each status return the columns status, n (how many anime have that status) and total_episodes (the sum of their declared episodes).',
    level: 2,
    concept: 'GROUP BY',
    lessonKey: 'sql/aggregation',
    expectedSql:
      'SELECT status, COUNT(*) AS n, SUM(episodes) AS total_episodes FROM anime GROUP BY status',
    hint: 'GROUP BY status, then COUNT(*) and SUM(episodes) in the select list.'
  },
  {
    key: 'busy-years',
    title: 'Busy years',
    prompt:
      'Return the columns year and n (the number of anime released that year), but only for years with three or more anime.',
    level: 2,
    concept: 'HAVING',
    lessonKey: 'sql/aggregation',
    expectedSql: 'SELECT year, COUNT(*) AS n FROM anime GROUP BY year HAVING COUNT(*) >= 3',
    hint: 'WHERE filters rows before grouping; HAVING filters the groups afterwards.'
  },
  {
    key: 'anime-per-studio',
    title: 'Anime per studio',
    prompt:
      'For each studio that has at least one anime, return the columns name (the studio name) and n_anime (how many anime it has).',
    level: 2,
    concept: 'join + GROUP BY',
    lessonKey: 'sql/aggregation',
    expectedSql:
      'SELECT s.name, COUNT(*) AS n_anime FROM studio s JOIN anime a ON a.studio_id = s.id GROUP BY s.id',
    hint: 'Join studio to anime, then GROUP BY the studio.'
  },
  {
    key: 'comedy-titles',
    title: 'Comedies',
    prompt: "Return the title of every anime tagged 'comedy', one column named title.",
    level: 2,
    concept: 'many-to-many',
    lessonKey: 'sql/joins',
    expectedSql:
      "SELECT a.title FROM anime a JOIN anime_tag at ON at.anime_id = a.id JOIN tag t ON t.id = at.tag_id WHERE t.name = 'comedy'",
    hint: 'Two joins: anime to anime_tag on anime_id, then anime_tag to tag on tag_id.'
  },
  {
    key: 'tag-popularity',
    title: 'Tag popularity',
    prompt:
      'Return every tag as columns name (the tag name) and n_anime (how many anime carry it, 0 for unused tags), ordered by n_anime descending and then by name ascending.',
    level: 2,
    concept: 'ORDER BY aggregate',
    lessonKey: 'sql/aggregation',
    expectedSql:
      'SELECT t.name, COUNT(at.anime_id) AS n_anime FROM tag t LEFT JOIN anime_tag at ON at.tag_id = t.id GROUP BY t.id ORDER BY n_anime DESC, t.name ASC',
    orderMatters: true,
    hint: 'LEFT JOIN from tag so unused tags survive, and COUNT a column from anime_tag (not *) so they count as 0.'
  },
  {
    key: 'coalesce-minutes',
    title: 'Fill in the runtime',
    prompt:
      "Return the columns number and minutes for every episode of the anime titled 'Violet Evergarden', showing 24 in minutes wherever the stored value is NULL.",
    level: 2,
    concept: 'COALESCE',
    lessonKey: 'sql/select-fundamentals',
    expectedSql:
      "SELECT e.number, COALESCE(e.minutes, 24) AS minutes FROM episode e JOIN anime a ON a.id = e.anime_id WHERE a.title = 'Violet Evergarden'",
    hint: 'COALESCE(minutes, 24) returns the first non-NULL argument; alias it back to minutes.'
  },
  {
    key: 'avg-score-per-studio',
    title: 'Average score per studio',
    prompt:
      'For each studio that has at least one anime, return the columns name (the studio name) and avg_score (the average score of its scored anime, rounded to 2 decimals).',
    level: 2,
    concept: 'ROUND',
    lessonKey: 'sql/aggregation',
    expectedSql:
      'SELECT s.name, ROUND(AVG(a.score), 2) AS avg_score FROM studio s JOIN anime a ON a.studio_id = s.id GROUP BY s.id',
    hint: 'AVG skips NULL scores by itself; wrap it in ROUND(x, 2).'
  },
  {
    key: 'length-label',
    title: 'Short, season or long',
    prompt:
      "For every anime return the columns title and length, where length is 'short' when episodes is 13 or fewer, 'season' when it is 26 or fewer, and 'long' otherwise.",
    level: 2,
    concept: 'CASE',
    lessonKey: 'sql/select-fundamentals',
    expectedSql:
      "SELECT title, CASE WHEN episodes <= 13 THEN 'short' WHEN episodes <= 26 THEN 'season' ELSE 'long' END AS length FROM anime",
    hint: 'A searched CASE checks its WHEN branches in order, so the <= 13 test must come first.'
  },
  {
    key: 'status-per-studio',
    title: 'Status breakdown per studio',
    prompt:
      'For every anime that has a studio, count how many share each (studio, status) pair: columns name (the studio name), status and n.',
    level: 2,
    concept: 'multi-column GROUP BY',
    lessonKey: 'sql/aggregation',
    expectedSql:
      'SELECT s.name, a.status, COUNT(*) AS n FROM anime a JOIN studio s ON s.id = a.studio_id GROUP BY s.id, a.status',
    hint: 'GROUP BY can take two columns; each distinct combination becomes one row.'
  },

  // ---- Level 3: subqueries, CTEs, windows ----
  {
    key: 'above-average-score',
    title: 'Above average',
    prompt:
      'Return the columns title and score of every anime whose score is strictly greater than the average score of all scored anime.',
    level: 3,
    concept: 'scalar subquery',
    lessonKey: 'sql/subqueries-ctes',
    expectedSql: 'SELECT title, score FROM anime WHERE score > (SELECT AVG(score) FROM anime)',
    hint: 'A parenthesised SELECT AVG(score) works as a single value in the WHERE clause.'
  },
  {
    key: 'best-of-each-studio',
    title: 'Best of each studio',
    prompt:
      'Return the columns title and score of every anime whose score equals the highest score among the anime of the same studio. Anime without a studio are excluded.',
    level: 3,
    concept: 'correlated subquery',
    lessonKey: 'sql/subqueries-ctes',
    expectedSql:
      'SELECT a.title, a.score FROM anime a WHERE a.score = (SELECT MAX(b.score) FROM anime b WHERE b.studio_id = a.studio_id)',
    hint: 'The inner query refers to the outer row: WHERE b.studio_id = a.studio_id.'
  },
  {
    key: 'studios-being-watched',
    title: 'Studios being watched',
    prompt:
      "Return the name of every studio that has at least one anime with status 'watching', one column named name.",
    level: 3,
    concept: 'IN (subquery)',
    lessonKey: 'sql/subqueries-ctes',
    expectedSql: "SELECT name FROM studio WHERE id IN (SELECT studio_id FROM anime WHERE status = 'watching')",
    hint: 'The subquery lists studio_id values; the outer query tests studio.id IN that list.'
  },
  {
    key: 'cte-recorded-minutes',
    title: 'Recorded minutes',
    prompt:
      'Using a CTE that sums the recorded episode minutes per anime, return the columns title and total_minutes for every anime whose recorded minutes total at least 200.',
    level: 3,
    concept: 'CTE',
    lessonKey: 'sql/subqueries-ctes',
    expectedSql:
      'WITH mins AS (SELECT anime_id, SUM(minutes) AS total_minutes FROM episode GROUP BY anime_id) SELECT a.title, m.total_minutes FROM mins m JOIN anime a ON a.id = m.anime_id WHERE m.total_minutes >= 200',
    hint: 'WITH mins AS (...) SELECT ... FROM mins JOIN anime; SUM ignores NULL minutes.'
  },
  {
    key: 'rank-within-studio',
    title: 'Rank within studio',
    prompt:
      'For every anime that has both a studio and a score, return the columns title, studio_id and rank_in_studio, where rank_in_studio is its RANK() among the anime of the same studio ordered by score descending (1 = best).',
    level: 3,
    concept: 'window',
    lessonKey: 'sql/window-functions',
    expectedSql:
      'SELECT title, studio_id, RANK() OVER (PARTITION BY studio_id ORDER BY score DESC) AS rank_in_studio FROM anime WHERE studio_id IS NOT NULL AND score IS NOT NULL',
    hint: 'RANK() OVER (PARTITION BY studio_id ORDER BY score DESC), with a WHERE that drops NULL studios and scores.'
  },
  {
    key: 'running-minutes',
    title: 'Running total',
    prompt:
      "For the episodes of the anime titled 'Violet Evergarden', return the columns number, minutes and running_minutes (the sum of minutes of this and all earlier episodes), ordered by number ascending.",
    level: 3,
    concept: 'window',
    lessonKey: 'sql/window-functions',
    expectedSql:
      "SELECT e.number, e.minutes, SUM(e.minutes) OVER (ORDER BY e.number) AS running_minutes FROM episode e JOIN anime a ON a.id = e.anime_id WHERE a.title = 'Violet Evergarden' ORDER BY e.number",
    orderMatters: true,
    hint: 'SUM(minutes) OVER (ORDER BY number) is a running total; the NULL episode adds nothing.'
  },
  {
    key: 'same-year-pairs',
    title: 'Same-year pairs',
    prompt:
      'Return every pair of different anime released in the same year as columns a_title and b_title, listing each pair once with a_title alphabetically before b_title.',
    level: 3,
    concept: 'self-join',
    lessonKey: 'sql/joins',
    expectedSql:
      'SELECT a.title AS a_title, b.title AS b_title FROM anime a JOIN anime b ON b.year = a.year AND a.title < b.title',
    hint: 'Join anime to itself on year, and use a.title < b.title so each pair appears once.'
  },
  {
    key: 'anime-without-episodes',
    title: 'No episodes recorded',
    prompt: 'Return the title of every anime that has no rows in the episode table, one column named title.',
    level: 3,
    concept: 'NOT EXISTS',
    lessonKey: 'sql/subqueries-ctes',
    expectedSql: 'SELECT title FROM anime a WHERE NOT EXISTS (SELECT 1 FROM episode e WHERE e.anime_id = a.id)',
    hint: 'NOT EXISTS with a correlated subquery on episode.anime_id = anime.id.'
  }
]

export function sqlExercise(key: string): SqlExercise | undefined {
  return SQL_EXERCISES.find((e) => e.key === key)
}
