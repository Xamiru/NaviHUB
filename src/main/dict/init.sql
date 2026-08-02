-- Offline Yomitan dictionaries live in their own SQLite file
-- (userData/dictionaries.db), separate from navihub.db: the data is large,
-- fully rebuildable from the source zips, and carries no personal data, so it
-- stays out of the library export. Bump DICT_SCHEMA_VERSION in dictDb.ts on any
-- incompatible change here — the DB is dropped and recreated, and the user
-- re-imports.

-- Registry of installed dictionaries. `title` (from the zip's index.json) is the
-- replace key: re-importing the same title swaps its rows in place.
CREATE TABLE IF NOT EXISTS dict (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL UNIQUE,
  revision TEXT,
  format INTEGER,
  priority INTEGER NOT NULL DEFAULT 0,
  term_count INTEGER NOT NULL DEFAULT 0,
  kanji_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One term-bank row. reading '' means "same as expression" (Yomitan
-- convention). glossary holds the raw glossary array as JSON text; it is parsed
-- per-result at lookup time (cheap for the <=32 results we ever return).
CREATE TABLE IF NOT EXISTS term (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dict_id INTEGER NOT NULL,
  expression TEXT NOT NULL,
  reading TEXT NOT NULL DEFAULT '',
  def_tags TEXT,
  rules TEXT,                 -- space-separated deinflection word-types (v1 v5 vs vk adj-i)
  score INTEGER NOT NULL DEFAULT 0,
  glossary TEXT NOT NULL,     -- JSON array of glossary items
  sequence INTEGER,
  term_tags TEXT
);
CREATE INDEX IF NOT EXISTS idx_term_expr ON term(expression);
CREATE INDEX IF NOT EXISTS idx_term_reading ON term(reading);
CREATE INDEX IF NOT EXISTS idx_term_dict ON term(dict_id);

CREATE TABLE IF NOT EXISTS kanji (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dict_id INTEGER NOT NULL,
  character TEXT NOT NULL,
  onyomi TEXT,                -- space-separated
  kunyomi TEXT,              -- space-separated
  tags TEXT,
  meanings TEXT NOT NULL,     -- JSON array
  stats TEXT                  -- JSON object (grade/strokes/jlpt/freq/...)
);
CREATE INDEX IF NOT EXISTS idx_kanji_char ON kanji(character);
CREATE INDEX IF NOT EXISTS idx_kanji_dict ON kanji(dict_id);

-- Pitch accent from term_meta banks (mode='pitch' only; 'freq' rows are skipped
-- on import). pitches is a JSON array of {position, devoice?, nasal?, tags?}.
CREATE TABLE IF NOT EXISTS pitch (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dict_id INTEGER NOT NULL,
  expression TEXT NOT NULL,
  reading TEXT NOT NULL DEFAULT '',
  pitches TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_pitch_expr ON pitch(expression);
CREATE INDEX IF NOT EXISTS idx_pitch_dict ON pitch(dict_id);

-- Tag definitions (def_tags/term_tags resolve against this per dictionary).
CREATE TABLE IF NOT EXISTS tag (
  dict_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  category TEXT,
  ord INTEGER,
  notes TEXT,
  score INTEGER,
  PRIMARY KEY (dict_id, name)
) WITHOUT ROWID;

-- English -> Japanese search. Self-contained FTS5 (stores its own copy of the
-- flattened gloss text) so rows delete with a plain WHERE dict_id=? and there is
-- no external-content sync hazard.
CREATE VIRTUAL TABLE IF NOT EXISTS gloss_fts USING fts5(
  gloss,
  term_id UNINDEXED,
  dict_id UNINDEXED,
  tokenize = 'porter unicode61'
);

-- Word frequency ranks from term_meta banks (mode='freq'), e.g. the JPDB or
-- BCCWJ Yomitan dictionaries. One row per (expression, reading) per dictionary;
-- LOWER rank = more common. Feeds the dictionary page's rank chip, the prep
-- deck's rank fusion, and the core-frequency-deck generator.
CREATE TABLE IF NOT EXISTS freq (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  dict_id INTEGER NOT NULL,
  expression TEXT NOT NULL,
  reading TEXT NOT NULL DEFAULT '',
  rank INTEGER NOT NULL,
  display TEXT                -- displayValue when the bank supplies one
);
CREATE INDEX IF NOT EXISTS idx_freq_expr ON freq(expression);
CREATE INDEX IF NOT EXISTS idx_freq_dict ON freq(dict_id);
CREATE INDEX IF NOT EXISTS idx_freq_rank ON freq(dict_id, rank);

-- ---- Example sentence bank (Tatoeba pairs) ----
-- Not a Yomitan format: a TSV of JP/EN pairs imported by dict/sentences.ts.
-- Registry row is written LAST like `dict`; orphans are swept on startup.
CREATE TABLE IF NOT EXISTS sentence_bank (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'tatoeba'
  sentence_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sentence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bank_id INTEGER NOT NULL,
  jp TEXT NOT NULL,
  en TEXT NOT NULL,
  attribution TEXT                      -- CC-BY per-sentence credit, kept verbatim
);
CREATE INDEX IF NOT EXISTS idx_sentence_bank ON sentence(bank_id);

-- Term -> sentence search. `keywords` is the space-joined set of kuromoji BASE
-- forms plus surface forms of each sentence, tokenized once at import: unicode61
-- keeps each space-separated CJK token whole, so MATCH '"食べる"' is an exact
-- token hit that also finds 食べた/食べている. Indexing raw sentence text instead
-- would be useless — unicode61 cannot segment unsegmented Japanese.
CREATE VIRTUAL TABLE IF NOT EXISTS sentence_fts USING fts5(
  keywords,
  sentence_id UNINDEXED,
  bank_id UNINDEXED,
  tokenize = 'unicode61'
);

-- ---- KanjiVG stroke order ----
-- strokes = JSON array of SVG path `d` strings in stroke order, in KanjiVG's
-- 109x109 viewBox space. Stroke numbers are derived from each path's starting
-- point (shared/strokes.ts:pathStart), not stored.
CREATE TABLE IF NOT EXISTS stroke_set (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'kanjivg'
  revision TEXT,                        -- release tag, e.g. 'r20250816'
  char_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS stroke (
  set_id INTEGER NOT NULL,
  character TEXT NOT NULL,
  strokes TEXT NOT NULL,                -- JSON string[]
  PRIMARY KEY (set_id, character)
) WITHOUT ROWID;

-- ---- English dictionary (WordNet 3.0 + CMUdict pronunciations) ----
-- Not a Yomitan format: parsed from WordNet's own database files by
-- dict/wordnet.ts. Registry row is written LAST like `dict`; orphans swept on
-- startup. One bank per source ('wordnet'), re-import replaces it.
CREATE TABLE IF NOT EXISTS en_dict (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'wordnet'
  version TEXT,                         -- '3.0'
  lemma_count INTEGER NOT NULL DEFAULT 0,
  synset_count INTEGER NOT NULL DEFAULT 0,
  pron_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One row per (lemma, part of speech), from WordNet's index.{noun,verb,adj,adv}.
-- `offsets` is a JSON number[] of synset offsets IN WORDNET'S SENSE ORDER (most
-- frequent first) — that ordering is the whole reason to keep the index files
-- rather than deriving lemmas from the data files.
CREATE TABLE IF NOT EXISTS en_lemma (
  bank_id INTEGER NOT NULL,
  lemma TEXT NOT NULL,
  pos TEXT NOT NULL,                    -- 'n' | 'v' | 'a' | 'r'
  offsets TEXT NOT NULL                 -- JSON number[]
);
CREATE INDEX IF NOT EXISTS idx_en_lemma_lemma ON en_lemma(lemma);
CREATE INDEX IF NOT EXISTS idx_en_lemma_bank ON en_lemma(bank_id);

-- One row per synset, from data.{noun,verb,adj,adv}. `words` are the synset's
-- members (underscores already converted to spaces) = the synonym set;
-- `examples` are the quoted usages split out of the raw gloss.
CREATE TABLE IF NOT EXISTS en_synset (
  bank_id INTEGER NOT NULL,
  pos TEXT NOT NULL,                    -- data-file pos ('a' also covers 's')
  offset INTEGER NOT NULL,
  def TEXT NOT NULL,
  examples TEXT NOT NULL DEFAULT '[]',  -- JSON string[]
  words TEXT NOT NULL DEFAULT '[]',     -- JSON string[]
  PRIMARY KEY (bank_id, pos, offset)
) WITHOUT ROWID;

-- WordNet's morphological exception lists ({noun,verb,adj,adv}.exc): the
-- irregular inflections Morphy's suffix rules can never produce (ran -> run,
-- better -> good/well).
CREATE TABLE IF NOT EXISTS en_exc (
  bank_id INTEGER NOT NULL,
  form TEXT NOT NULL,
  pos TEXT NOT NULL,
  lemmas TEXT NOT NULL                  -- JSON string[]
);
CREATE INDEX IF NOT EXISTS idx_en_exc_form ON en_exc(form);
CREATE INDEX IF NOT EXISTS idx_en_exc_bank ON en_exc(bank_id);

-- CMUdict pronunciations, ARPABET converted to IPA at import time. WordNet has
-- no phonetics, so this is what keeps the dictionary page's /ɪpə/ line working
-- offline. Only the first (unparenthesized) variant of each word is kept.
CREATE TABLE IF NOT EXISTS en_pron (
  bank_id INTEGER NOT NULL,
  word TEXT NOT NULL,
  ipa TEXT NOT NULL,
  PRIMARY KEY (bank_id, word)
) WITHOUT ROWID;

-- ---- English word frequency (OpenSubtitles ranks) ----
-- hermitdave/FrequencyWords en_50k, imported by dict/enFreq.ts. Rank = 1-based
-- position after filtering to plain lowercase word tokens. Joined against
-- en_lemma by the vocab/spelling pools to tier "advanced" words — never shown
-- as content on its own. Registry row written LAST (dict-table idiom).
CREATE TABLE IF NOT EXISTS en_freq_set (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'opensubtitles'
  revision TEXT,                        -- pinned commit sha (short)
  word_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS en_freq (
  bank_id INTEGER NOT NULL,
  word TEXT NOT NULL,
  rank INTEGER NOT NULL,
  PRIMARY KEY (bank_id, word)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS idx_en_freq_rank ON en_freq(bank_id, rank);

-- ---- KRADFILE kanji components ----
-- Not a Yomitan format: krad.json + krad_components.json from the
-- krad-unicode conversion of EDRDG's KRADFILE, imported by dict/krad.ts.
-- krad_part is the radkfile inversion (component -> kanji), computed at import
-- so search-by-parts is one GROUP BY.
CREATE TABLE IF NOT EXISTS krad_set (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'kradfile'
  revision TEXT,                        -- pinned commit sha (short)
  kanji_count INTEGER NOT NULL DEFAULT 0,
  component_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS krad (
  set_id INTEGER NOT NULL,
  kanji TEXT NOT NULL,
  components TEXT NOT NULL,             -- JSON string[] in kradfile order
  PRIMARY KEY (set_id, kanji)
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS krad_part (
  set_id INTEGER NOT NULL,
  component TEXT NOT NULL,
  kanji TEXT NOT NULL,
  PRIMARY KEY (set_id, component, kanji)
) WITHOUT ROWID;

CREATE TABLE IF NOT EXISTS krad_component (
  set_id INTEGER NOT NULL,
  component TEXT NOT NULL,
  strokes INTEGER,
  PRIMARY KEY (set_id, component)
) WITHOUT ROWID;

-- ---- Grammar library (hanabira.org N5-N1 grammar points) ----
-- Five JSON files imported by dict/grammar.ts. examples is a JSON array of
-- {jp, romaji, en, clozeJp, clozeAnswer} — the cloze fields are pre-computed
-- at import via @shared/cloze so the drill's pool filter is trivial.
CREATE TABLE IF NOT EXISTS grammar_bank (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'hanabira'
  point_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS grammar_point (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  bank_id INTEGER NOT NULL,
  level TEXT NOT NULL,                  -- 'N5'..'N1'
  title TEXT NOT NULL,
  meaning TEXT NOT NULL,                -- short explanation
  explanation TEXT,                     -- long explanation
  formation TEXT,
  examples TEXT NOT NULL DEFAULT '[]',  -- JSON GrammarExample[]
  sort INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_grammar_level ON grammar_point(level);
CREATE INDEX IF NOT EXISTS idx_grammar_bank ON grammar_point(bank_id);

-- ---- Tatoeba per-sentence audio ----
-- Clip files live under userData/jpaudio/tatoeba/ (served via navimg://); rows
-- are the metadata. `jp` (exact sentence text) is the join key onto the
-- sentence bank — re-importing the bank rebuilds sentence ids, text survives.
-- license is NOT NULL by design: unlicensed clips are skipped at import.
CREATE TABLE IF NOT EXISTS audio_bank (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'tatoeba-audio'
  clip_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sentence_audio (
  bank_id INTEGER NOT NULL,
  audio_id INTEGER NOT NULL,
  tatoeba_id INTEGER NOT NULL,
  jp TEXT NOT NULL,
  path TEXT NOT NULL,                   -- 'jpaudio/tatoeba/<audio_id>.mp3'
  license TEXT NOT NULL,
  attribution TEXT,
  PRIMARY KEY (bank_id, audio_id)
) WITHOUT ROWID;
CREATE INDEX IF NOT EXISTS idx_sentence_audio_jp ON sentence_audio(jp);

-- ---- Pitch minimal pairs (kotu.io backup pack) ----
-- Audio decoded out of the repo's base64 JSON blobs into
-- userData/jpaudio/pairs/<pair_id>/; rows carry the notation metadata. items is
-- a JSON array of {pron, position, moraCount, audioPath}.
CREATE TABLE IF NOT EXISTS pair_set (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL UNIQUE,          -- 'kotu-minimal-pairs'
  revision TEXT,                        -- pinned commit sha (short)
  pair_count INTEGER NOT NULL DEFAULT 0,
  imported_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS minimal_pair (
  set_id INTEGER NOT NULL,
  pair_id TEXT NOT NULL,
  buckets TEXT NOT NULL,                -- JSON string[] ('pitch0'.., 'devoiced')
  kana TEXT NOT NULL,
  items TEXT NOT NULL,                  -- JSON MinimalPairItem[]
  PRIMARY KEY (set_id, pair_id)
) WITHOUT ROWID;
