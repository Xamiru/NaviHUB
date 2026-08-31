import type { ProgCourseDef, ProgLessonDef, ProgQuestion } from './types'

const check = (
  prompt: string,
  options: string[],
  correct: number,
  explain: string
): ProgQuestion => ({ prompt, options, correct, explain })

const lesson = (
  key: string,
  title: string,
  body: string,
  questions: ProgQuestion[]
): ProgLessonDef => ({ key, title, body, questions })

// A self-contained path from first principles to production data systems.
// Lesson keys are FROZEN: completed progress is stored as
// 'data-science-engineering/<lesson-key>'.
export const DATA_SCIENCE_ENGINEERING_COURSE: ProgCourseDef = {
  key: 'data-science-engineering',
  title: 'Data science and engineering: beginner to master',
  description:
    'A self-contained path through Python, statistics, machine learning, analytical systems, batch and streaming pipelines, reliability, governance, and production capstones.',
  lessons: [
    lesson(
      'data-lifecycle',
      'The data lifecycle and the jobs inside it',
      `# The data lifecycle and the jobs inside it

Data work is not one activity called "analysis." It is a loop that turns events in the world into decisions and then measures what those decisions changed:

1. **Define** a question and the decision it will support.
2. **Generate** events through products, sensors, transactions, surveys, or experiments.
3. **Collect** those events without silently losing or duplicating them.
4. **Store and model** them so their meaning survives beyond the producing application.
5. **Transform and validate** raw records into trustworthy datasets.
6. **Analyze or learn** patterns with statistics and machine learning.
7. **Serve** results through reports, APIs, features, alerts, or automated decisions.
8. **Observe and govern** quality, cost, privacy, security, lineage, and retention.

A **data analyst** usually starts near the decision: define metrics, query modeled data, find causes, and communicate a recommendation. A **data scientist** adds experimental design, statistical inference, forecasting, and predictive modeling. A **data engineer** makes the collection, storage, transformation, and serving path reliable at the required scale. A **machine-learning engineer** turns a useful model into a repeatable, monitored production service. Real teams overlap. The durable skill is following the data across boundaries, not defending a title.

## Start with a decision, not a dataset

"Analyze customer activity" has no finish line. "Should we change the onboarding flow to improve seven-day activation without increasing support contacts?" names a decision, an outcome, a time horizon, and a guardrail. Before touching code, write:

- the unit of observation, such as one user, order, device, or day;
- the population and time window;
- the outcome and how it is measured;
- the comparison or baseline;
- important slices where an average may hide harm;
- what action follows each plausible result.

This is a **data contract with the decision maker**. A technically perfect model for the wrong unit or time horizon is still wrong.

## Grain is the first schema question

The **grain** says what one row represents. A table called \`sales\` could be one row per order, order line, payment attempt, customer-day, or store-month. Mixing grains creates believable nonsense: joining order lines to payments can multiply both sides and inflate revenue. State the grain in one sentence before writing a query.

An event table commonly has an immutable event identifier, event time, ingestion time, actor or entity identifier, event type, payload, and producer version. Event time answers "when did it happen?" Ingestion time answers "when did we learn about it?" Keeping both is essential when records arrive late.

## Correctness has several dimensions

Data can be syntactically valid and still unfit for use. Check:

- **Completeness:** did expected records and fields arrive?
- **Validity:** do values satisfy types, ranges, and allowed sets?
- **Uniqueness:** is the declared key actually unique?
- **Consistency:** do related systems agree on definitions?
- **Timeliness:** is the data fresh enough for its decision?
- **Accuracy:** does it represent reality? This often needs external verification.

Never collapse these into one "quality score." A daily finance report may tolerate arriving at 08:05 instead of 08:00 but cannot tolerate duplicated payments.

## The local running case

This course uses a fictional media service. Users play titles, rate them, and subscribe. The recurring business question is: "Which experiences retain users without degrading playback quality?" You will meet event records, user and title dimensions, daily aggregates, experiments, models, batch pipelines, and streaming alerts built around that case. The domain is small enough to reason about but contains the same hard parts as a real system: late events, changing attributes, leakage, retries, and competing definitions.

## Guided practice

A product manager asks: "Which titles are successful?" Rewrite it as a decision-ready question. Declare the row grain for its source data and name four quality checks.

## Worked solution

One defensible rewrite is: "For titles released in the last 90 days, should we commission another season when 28-day completion exceeds the category baseline while playback-error rate remains below 1%?" The analysis grain is one title. Source grains might be one row per playback event and one row per title. Checks include unique event ids, non-null user and title ids, event times not implausibly in the future, and an arrival-volume comparison with the previous four matching weekdays. Different decisions produce different valid definitions; the important move is making every choice explicit before computation.`,
      [
        check(
          'What should be written before querying a vaguely named table such as sales?',
          [
            'The row grain and the decision the result must support',
            'The chart colors and final dashboard layout',
            'The largest machine available for processing it',
            'The model family trained on every column before the decision itself is defined'
          ],
          0,
          'Grain prevents accidental multiplication, while a decision gives the work a testable purpose. Tools and presentation come after those definitions.'
        ),
        check(
          'Why should an event record preserve both event time and ingestion time?',
          [
            'One is UTC and the other must always use local time',
            'They distinguish when reality occurred from when the system observed it',
            'The pair guarantees that every event identifier is unique',
            'Both timestamps are required to calculate a database primary key and partition value'
          ],
          1,
          'Late and out-of-order events are visible only when occurrence time and arrival time are separate. They serve different operational questions.'
        ),
        check(
          'A feed arrives on time but contains each payment twice. Which quality dimensions differ?',
          [
            'It is invalid but complete and unique',
            'It is accurate but neither timely nor valid',
            'It is timely but violates uniqueness and likely accuracy',
            'It is consistent because every duplicate has a matching row'
          ],
          2,
          'Freshness does not imply correctness. Duplicate payments violate the declared key and make aggregates misrepresent reality.'
        ),
        check(
          'Which question is most ready for a data project?',
          [
            'Can we inspect every customer field and report whichever patterns look most interesting after exploration?',
            'What is the most advanced model this dataset permits?',
            'Could someone build a dashboard about weekly engagement?',
            'Should we change onboarding to raise seven-day activation without raising support contacts?'
          ],
          3,
          'The last question names a decision, measurable outcome, time horizon, and guardrail, so evidence can lead to an action.'
        )
      ]
    ),
    lesson(
      'python-foundations',
      'Python foundations for data work',
      `# Python foundations for data work

Python reads top to bottom. A **name** points to an object; it is not a typed box. \`count = 3\` binds the name \`count\` to an integer, and \`count = "three"\` later rebinds it to a string. Useful scalar types are \`int\`, \`float\`, \`bool\`, \`str\`, and \`None\`. Check a type with \`type(value)\`, but prefer asking what an object can do over filling code with type checks.

\`\`\`python
title = "Serial Experiments Lain"
episodes = 13
score = 8.7
finished = True
notes = None

print(f"{title}: {episodes} episodes, score {score:.1f}")
\`\`\`

Arithmetic uses \`+\`, \`-\`, \`*\`, \`/\`, floor division \`//\`, remainder \`%\`, and power \`**\`. Comparisons return booleans. Combine them with \`and\`, \`or\`, and \`not\`. Python chains comparisons, so \`0 <= score <= 10\` means what it reads like.

## Collections

A **list** is ordered and mutable. A **tuple** is ordered and normally used for a fixed record or multiple return values. A **dict** maps unique hashable keys to values. A **set** stores unique hashable values and makes membership tests fast.

\`\`\`python
scores = [7, 9, 8]
user = {"id": 42, "country": "GB"}
genres = {"drama", "science-fiction", "drama"}

scores.append(10)
user["plan"] = "plus"
print(scores[1:3])          # [9, 8]
print("drama" in genres)   # True
\`\`\`

Indexes start at zero; slices exclude their end. \`xs[a:b]\` selects positions \`a\` through \`b - 1\`. Negative indexes count from the end. Assigning \`copy = scores\` creates a second name for the same list. Use \`scores.copy()\` for a shallow independent list.

## Control flow and iteration

\`\`\`python
for score in scores:
    if score >= 9:
        label = "excellent"
    elif score >= 7:
        label = "good"
    else:
        label = "needs attention"
    print(score, label)

passing = [s for s in scores if s >= 7]
\`\`\`

Indentation defines a block. A comprehension is concise when it expresses one transformation and perhaps one filter; use an ordinary loop when state or branching makes the line cryptic. \`enumerate(items)\` yields index-value pairs. \`zip(a, b)\` walks collections together and stops at the shorter input.

## Functions make assumptions testable

\`\`\`python
def completion_rate(completed: int, started: int) -> float | None:
    """Return a proportion, or None when no user started."""
    if started == 0:
        return None
    return completed / started

rate = completion_rate(completed=81, started=100)
\`\`\`

Type hints document intent and help static tools; Python does not enforce them at runtime. Default arguments are evaluated once when the function is defined, so never use a mutable default such as \`rows=[]\`. Use \`rows=None\` and create the list inside.

## Fail deliberately

\`\`\`python
def parse_score(raw: str) -> float:
    value = float(raw)
    if not 0 <= value <= 10:
        raise ValueError("score must be between 0 and 10")
    return value

try:
    score = parse_score("eleven")
except ValueError as error:
    print(f"bad input: {error}")
\`\`\`

Catch the narrow exception you can handle. \`except Exception: pass\` turns defects and corrupt input into invisible missing data. Files should be opened with \`with open(...) as handle:\`; the context manager closes them even when parsing fails.

## Guided practice

Write \`summarize(scores)\` returning a dict with \`count\`, \`mean\`, and \`passing\` (scores at least 7). Empty input should return count 0, mean \`None\`, and an empty passing list.

## Worked solution

\`\`\`python
def summarize(scores: list[float]) -> dict[str, object]:
    passing = [score for score in scores if score >= 7]
    mean = sum(scores) / len(scores) if scores else None
    return {"count": len(scores), "mean": mean, "passing": passing}

assert summarize([]) == {"count": 0, "mean": None, "passing": []}
assert summarize([6, 8, 10])["mean"] == 8
\`\`\`

The guard on empty input prevents division by zero. The function returns new objects and does not mutate its argument, which makes repeated analysis easier to reason about.`,
      [
        check(
          'After b = a for a list a, what does b.append(4) do?',
          [
            'It changes the one list referenced by both a and b',
            'It copies a and appends only to the new list b',
            'It fails because assignment makes b an immutable tuple',
            'It changes b now and synchronizes a on the next access'
          ],
          0,
          'Assignment binds another name to the same mutable list. Use a.copy() when the outer list itself must be independent.'
        ),
        check(
          'What values does [10, 20, 30, 40][1:3] produce?',
          ['[10, 20, 30]', '[20, 30]', '[20, 30, 40]', '[10, 20]'],
          1,
          'A slice includes its starting index and excludes its ending index, so positions 1 and 2 are selected.'
        ),
        check(
          'Why should a function avoid a default argument such as rows=[]?',
          [
            'Lists cannot be used as function arguments in Python',
            'The list is converted to a tuple before the first call',
            'One list is created at definition time and reused by later calls',
            'Type checkers reject every collection used as a default value in a function signature'
          ],
          2,
          'Mutable defaults persist across calls because the default object is created once. None plus an inside-the-function initialization avoids shared state.'
        ),
        check(
          'Which exception strategy best protects a data pipeline?',
          [
            'Catch every exception, hide the error, and continue without recording or reporting the row',
            'Convert every parsing failure into the number zero',
            'Avoid exceptions by checking only whether input is non-empty',
            'Catch only an expected error, add context, and surface or quarantine it'
          ],
          3,
          'Narrow handling distinguishes known bad input from programming defects and preserves enough context to investigate the affected records.'
        )
      ]
    ),
    lesson(
      'reproducible-projects',
      'Reproducible environments, scripts, and notebooks',
      `# Reproducible environments, scripts, and notebooks

An analysis is reproducible when another person, or you three months later, can start from declared inputs and produce the same outputs with recorded code and dependencies. "It works in my notebook" is a warning that hidden state may be part of the result.

## Isolate the environment

\`\`\`bash
mkdir retention-study
cd retention-study
python -m venv .venv
# Linux/macOS
source .venv/bin/activate
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
python -m pip install --upgrade pip
python -m pip install numpy pandas matplotlib scikit-learn duckdb pyarrow jupyterlab
python -m pip freeze > requirements-lock.txt
\`\`\`

\`python -m pip\` guarantees that pip belongs to the active Python interpreter. A virtual environment separates project packages from the system installation. A fully frozen file records exact transitive versions for reproduction; a short human-maintained requirement list records direct intent. Mature projects often keep both and regenerate the lock rather than editing it by hand.

Never commit secrets or the \`.venv\` directory. Put credentials in environment variables or a local secret store, add their names to a documented \`.env.example\`, and ignore the real \`.env\`.

## A project with explicit boundaries

\`\`\`text
retention-study/
  README.md
  requirements.txt
  requirements-lock.txt
  data/
    raw/          # immutable source snapshots
    processed/    # reproducible outputs
  notebooks/      # exploration and communication
  src/            # reusable transformations and models
  tests/          # small, deterministic checks
  reports/        # exported figures and decisions
\`\`\`

Raw data is append-only or replaced by a newly versioned snapshot, never manually "fixed" in place. Transformations from raw to processed belong in code. If a source is too sensitive or large for version control, version a manifest containing its URI, retrieval time, row count, schema, and checksum.

## Notebooks are interfaces, not build systems

A notebook is excellent for exploration because code, plots, and explanation stay together. It is dangerous when execution order becomes invisible. The kernel remembers variables from cells that may no longer exist. Before trusting a result:

- restart the kernel and run all cells top to bottom;
- put imports and configuration near the top;
- never redefine the same function across scattered cells;
- move stable transformations into \`src/\` and import them;
- make expensive input snapshots explicit;
- fix random seeds when randomness is not the subject of study.

\`\`\`python
from pathlib import Path
import random
import numpy as np

ROOT = Path(__file__).resolve().parents[1]  # use Path.cwd() deliberately in a notebook
SEED = 20260830
random.seed(SEED)
np.random.seed(SEED)
\`\`\`

A seed makes a pseudo-random sequence repeatable under the same algorithm and call order. It does not make a stochastic conclusion universally identical across library versions or parallel hardware. Record versions and report uncertainty rather than treating one seed as truth.

## Scripts need a controlled entry point

\`\`\`python
from pathlib import Path
import argparse

def build(input_path: Path, output_path: Path) -> None:
    rows = input_path.read_text(encoding="utf-8").splitlines()
    output_path.write_text("\n".join(sorted(set(rows))), encoding="utf-8")

def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    build(args.input, args.output)

if __name__ == "__main__":
    main()
\`\`\`

Separating \`build\` from \`main\` lets a test call the transformation without simulating a terminal. Command arguments expose inputs rather than hiding machine-specific paths in code.

## Record provenance

For every important output, be able to answer: which code revision, input version, parameters, dependency versions, and execution time produced it? A simple JSON run manifest is enough to begin. Hashing an input with SHA-256 detects accidental change; it does not prove the source was correct.

## Guided practice

Design a reproducible layout for a weekly churn analysis that receives a new CSV every Monday. Explain what is immutable, what is generated, and how a colleague reruns week 12.

## Worked solution

Store the source as \`data/raw/2026-week-12.csv\` without editing it and record its SHA-256 plus source in a manifest. Put parsing and feature creation in \`src/build_features.py\`, tests in \`tests/\`, and a parameterized reporting script in \`src/report.py\`. Lock dependencies, document one command such as \`python -m src.report --week 12\`, and write outputs to \`reports/week-12/\`. A notebook may investigate anomalies, but the official weekly result comes from the clean script path.`,
      [
        check(
          'What is the strongest reason to run pip as python -m pip?',
          [
            'It selects pip attached to the Python interpreter being used',
            'It installs every package into the operating system globally',
            'It automatically chooses the newest prerelease dependency versions',
            'It replaces the need to create and activate a virtual environment'
          ],
          0,
          'Machines may expose several Python and pip executables. Running pip as a module ties installation to the selected interpreter.'
        ),
        check(
          'What check best exposes hidden notebook state?',
          [
            'Run only the last cell twice and compare its displayed text',
            'Restart the kernel and execute every cell from top to bottom',
            'Clear plot outputs while keeping all variables in memory',
            'Move the imports to the final cell after analysis is complete'
          ],
          1,
          'A clean top-to-bottom run proves that the visible notebook, rather than stale in-memory objects or a special execution order, creates the result.'
        ),
        check(
          'Which treatment of raw input best supports reproducibility?',
          [
            'Correct mistakes directly in the only copy of the source file',
            'Keep only the cleaned output because it is smaller and easier to share',
            'Preserve an immutable versioned snapshot and transform it with code',
            'Paste selected source rows into the notebook that analyzes them'
          ],
          2,
          'An immutable source plus a coded transformation preserves both evidence and method. Manual edits destroy the ability to reconstruct what happened.'
        ),
        check(
          'What does fixing a random seed actually guarantee?',
          [
            'The estimate becomes unbiased across every possible population',
            'The result is identical on all library versions and hardware',
            'The chosen random sample becomes representative of the population by construction',
            'The pseudo-random sequence repeats under matching software and call order'
          ],
          3,
          'A seed controls a pseudo-random sequence under matching conditions. It does not remove sampling error, bias, or all platform differences.'
        )
      ]
    ),
    lesson(
      'numpy-arrays',
      'NumPy arrays, vectorization, and numerical thinking',
      `# NumPy arrays, vectorization, and numerical thinking

Python lists hold references to arbitrary objects. A NumPy \`ndarray\` stores a rectangular block of values with one data type, a shape, and strides describing how indexes move through memory. That restriction enables compact storage and fast compiled loops.

\`\`\`python
import numpy as np

plays = np.array([
    [12, 4, 0],
    [8,  5, 2],
    [20, 1, 3]
], dtype=np.int64)

print(plays.shape)       # (3, 3)
print(plays.ndim)        # 2
print(plays.dtype)       # int64
print(plays[:, 0])       # first column
print(plays[1, :])       # second row
\`\`\`

\`axis=0\` collapses rows and leaves one result per column. \`axis=1\` collapses columns and leaves one per row. Do not memorize a slogan about horizontal or vertical; ask which dimension disappears.

\`\`\`python
column_totals = plays.sum(axis=0)  # shape (3,)
row_means = plays.mean(axis=1)     # shape (3,)
\`\`\`

## Vectorization and broadcasting

\`\`\`python
minutes = np.array([24, 48, 72], dtype=float)
hours = minutes / 60                 # scalar broadcasts to every element
centered = plays - plays.mean(axis=0) # (3,3) minus (3,) by trailing axes
active = plays > 0                   # boolean array
kept = plays[active]                 # one-dimensional selected values
\`\`\`

Broadcast dimensions are compatible when they are equal or one of them is 1, comparing from the trailing dimension backward. Shapes \`(3, 3)\` and \`(3,)\` work; \`(3, 3)\` and \`(2,)\` do not. Broadcasting is conceptual repetition without necessarily copying data.

Vectorization moves loops into optimized native code, but it is not magic. A chain that creates five full-size temporary arrays may use more memory than a carefully chunked loop. Measure the real bottleneck.

## Dtypes are part of the data model

An integer array cannot represent \`NaN\` without changing representation. A floating array has finite precision: \`0.1 + 0.2 == 0.3\` is false in binary floating point. Use tolerances such as \`np.isclose\` for calculated values, integer minor units for money where appropriate, and explicit decimal arithmetic when contractual decimal behavior is required.

\`\`\`python
values = np.array([1.0, np.nan, 3.0])
print(values.mean())       # nan
print(np.nanmean(values))  # 2.0 -- explicitly ignores NaN
\`\`\`

Silently dropping missing values changes the population. The \`nan*\` functions are tools, not permission; first ask why the values are missing.

## Views, copies, and mutation

Basic slicing usually returns a **view** sharing memory. Fancy indexing with a list or boolean mask returns a **copy**.

\`\`\`python
x = np.arange(6)
view = x[1:4]
view[0] = 99
print(x)                 # [0, 99, 2, 3, 4, 5]

copy = x[[1, 2, 3]]
copy[0] = -1
print(x[1])              # still 99
\`\`\`

Use \`.copy()\` when independence matters. Check \`np.shares_memory(a, b)\` while debugging, but design transformations so mutation is deliberate rather than surprising.

## Random generators

Prefer a local generator over global random state:

\`\`\`python
rng = np.random.default_rng(20260830)
sample = rng.choice(np.arange(1000), size=100, replace=False)
\`\`\`

Passing a generator into functions makes randomness explicit and tests deterministic.

## Guided practice

For a matrix where rows are users and columns are weekly play counts, calculate each user's total, retain users with at least five total plays, and normalize each retained row into proportions. Avoid division by zero.

## Worked solution

\`\`\`python
plays = np.array([[1, 2, 3], [0, 0, 0], [5, 5, 0], [1, 1, 1]])
totals = plays.sum(axis=1)
retained = plays[totals >= 5]
retained_totals = retained.sum(axis=1, keepdims=True)
proportions = retained / retained_totals

assert proportions.shape == (2, 3)
assert np.allclose(proportions.sum(axis=1), 1)
\`\`\`

\`keepdims=True\` leaves totals with shape \`(2, 1)\`, which broadcasts cleanly across the three columns. Filtering first guarantees the denominators are positive.`,
      [
        check(
          'For an array shaped (100, 4), what shape does sum(axis=0) return?',
          ['(4,), because the 100-row axis is collapsed', '(100,), one value for each row', '(1,), because every value is summed', '(100, 4), because reductions preserve the complete input shape'],
          0,
          'Axis 0 is removed by the reduction, leaving the four-column dimension and therefore four totals.'
        ),
        check(
          'Why can a matrix shaped (50, 3) subtract an array shaped (3,)?',
          [
            'NumPy resizes the matrix down to three rows before subtraction',
            'Their trailing dimensions match, so the vector broadcasts by row',
            'Every one-dimensional array is automatically treated as a scalar',
            'Subtraction ignores shape and walks flat memory until one input ends'
          ],
          1,
          'Broadcasting compares trailing dimensions. The three entries align with the matrix columns and are reused for each row.'
        ),
        check(
          'What normally happens when you mutate a basic slice such as x[2:5]?',
          [
            'Nothing changes until the slice is assigned back to x',
            'The operation fails because slices are read-only arrays',
            'The original may change because the slice is usually a view',
            'Only the dtype and memory-layout metadata of the original array are updated'
          ],
          2,
          'Basic slicing generally shares the original storage. Fancy indexing normally copies, so explicit .copy() is safest when independence is required.'
        ),
        check(
          'Why is np.nanmean not automatically the correct response to missing values?',
          [
            'It replaces every missing value with an unrecorded random number',
            'It supports integer arrays but produces invalid floating results',
            'It always divides by the original count including missing entries in the denominator',
            'Ignoring missing observations can change the population being estimated'
          ],
          3,
          'Missingness may be systematic. A function that ignores NaN computes correctly for observed values but cannot justify treating them as representative.'
        )
      ]
    ),
    lesson(
      'pandas-dataframes',
      'pandas DataFrames: selecting, combining, and reshaping',
      `# pandas DataFrames: selecting, combining, and reshaping

A pandas \`DataFrame\` is a labeled, two-dimensional table whose columns may have different dtypes. A \`Series\` is one labeled column. Labels are powerful, but automatic alignment can surprise anyone thinking only in row positions.

\`\`\`python
import pandas as pd

events = pd.DataFrame({
    "user_id": [1, 1, 2, 3],
    "title_id": [10, 11, 10, 12],
    "minutes": [24, 48, 12, 30],
    "occurred_at": pd.to_datetime([
        "2026-08-01T10:00:00Z", "2026-08-02T10:00:00Z",
        "2026-08-01T11:00:00Z", "2026-08-03T09:00:00Z"
    ])
})

print(events.dtypes)
print(events.head())
\`\`\`

Inspect \`shape\`, \`dtypes\`, \`head()\`, \`sample()\`, \`describe()\`, and null counts before transformation. A display is not proof: sampling can miss rare corruption, and truncated output can hide values.

## Select explicitly

\`\`\`python
cols = events[["user_id", "minutes"]]
long = events.loc[events["minutes"] >= 30, ["user_id", "title_id", "minutes"]]
first_two_rows = events.iloc[:2, :]
\`\`\`

\`.loc\` is label-based; \`.iloc\` is position-based. Boolean conditions use \`&\`, \`|\`, and \`~\`, with each comparison parenthesized. Python's \`and\` cannot decide the truth of an entire Series.

\`\`\`python
subset = events.loc[
    (events["minutes"] >= 20) & (events["title_id"].isin([10, 12]))
].copy()
subset["hours"] = subset["minutes"] / 60
\`\`\`

Calling \`.copy()\` makes the intent independent and avoids ambiguous chained assignment.

## Group and aggregate

\`\`\`python
per_user = (
    events.groupby("user_id", as_index=False)
    .agg(
        total_minutes=("minutes", "sum"),
        titles=("title_id", "nunique"),
        last_seen=("occurred_at", "max")
    )
)
\`\`\`

\`agg\` reduces each group. \`transform\` returns one value per original row, useful for within-group comparisons:

\`\`\`python
events["share_of_user_time"] = (
    events["minutes"] / events.groupby("user_id")["minutes"].transform("sum")
)
\`\`\`

## Joins require cardinality checks

\`\`\`python
titles = pd.DataFrame({"title_id": [10, 11, 12], "genre": ["drama", "comedy", "drama"]})
enriched = events.merge(titles, on="title_id", how="left", validate="many_to_one")
\`\`\`

\`validate="many_to_one"\` asserts that the right key is unique. Use \`one_to_one\`, \`one_to_many\`, or \`many_to_many\` only when that relationship is intended. Also inspect unmatched keys with \`indicator=True\`. A join that finishes without an exception may still multiply rows.

## Reshape without losing the grain

\`\`\`python
daily = (
    events.assign(day=events["occurred_at"].dt.floor("D"))
    .groupby(["day", "title_id"], as_index=False)["minutes"].sum()
)
wide = daily.pivot(index="day", columns="title_id", values="minutes")
long_again = wide.reset_index().melt(id_vars="day", value_name="minutes")
\`\`\`

\`pivot\` requires each index-column pair to be unique. \`pivot_table\` aggregates duplicates, which is convenient but can conceal a grain mistake unless the aggregation was explicitly intended.

## Alignment is by label

Adding two Series aligns their indexes. If one index is \`[0, 1]\` and the other is \`[1, 2]\`, only label 1 meets; the other results are missing. Use \`.to_numpy()\` only when positional calculation is truly intended and you have already proved the same row order.

## Guided practice

Using the events table, produce one row per user with total minutes, distinct titles, and a boolean \`power_user\` for totals at least 60. Join a unique country table and prove the output remains one row per user.

## Worked solution

\`\`\`python
countries = pd.DataFrame({"user_id": [1, 2, 3], "country": ["GB", "JP", "US"]})
summary = (
    events.groupby("user_id", as_index=False)
    .agg(total_minutes=("minutes", "sum"), distinct_titles=("title_id", "nunique"))
)
summary["power_user"] = summary["total_minutes"] >= 60
result = summary.merge(countries, on="user_id", how="left", validate="one_to_one")

assert result["user_id"].is_unique
assert len(result) == events["user_id"].nunique()
\`\`\`

The assertions encode the intended grain. If the country source later gains duplicate user rows, the validated merge fails before a report is inflated.`,
      [
        check(
          'What does merge(validate="many_to_one") assert?',
          [
            'Each key on the right appears at most once',
            'Both tables contain exactly the same number of rows',
            'Every left key has a non-null match on the right',
            'The resulting table is sorted by the join key'
          ],
          0,
          'Many left rows may share a key, but the right side must be unique for that key. Match completeness is a separate check.'
        ),
        check(
          'When is groupby(...).transform(...) preferable to agg(...) ?',
          [
            'When each group must become exactly one output row',
            'When a group result must align back to every original row',
            'When grouping columns should be discarded before calculation',
            'When the operation must ignore the DataFrame index labels'
          ],
          1,
          'Transform preserves the original row count and index, allowing values such as a group total or mean to be compared with each member.'
        ),
        check(
          'Why can pivot_table hide a modeling error that pivot exposes?',
          [
            'It removes all missing values and duplicate index labels before reshaping the data',
            'It converts every label to a positional integer index',
            'It aggregates duplicate cells instead of rejecting non-unique grain',
            'It automatically joins the table to itself on every column'
          ],
          2,
          'A plain pivot fails when an index-column cell has multiple rows. Pivot_table combines them, which is correct only if that aggregation was intended.'
        ),
        check(
          'How are two pandas Series normally added?',
          [
            'Strictly by physical row position regardless of their indexes',
            'After both are silently sorted and their index labels are discarded before addition',
            'Only when their indexes are the same object in memory',
            'By aligning matching index labels and marking unmatched labels missing'
          ],
          3,
          'Pandas arithmetic aligns labels. This protects many calculations but surprises code that assumes two differently indexed Series are positional arrays.'
        )
      ]
    ),
    lesson(
      'cleaning-and-types',
      'Cleaning data without erasing evidence',
      `# Cleaning data without erasing evidence

Cleaning is not making a table look tidy. It is converting observed source records into a declared model while preserving enough evidence to explain every rejection and repair.

## Profile before changing

\`\`\`python
import pandas as pd

raw = pd.read_csv("data/raw/users.csv", dtype="string")
profile = pd.DataFrame({
    "dtype": raw.dtypes.astype(str),
    "missing": raw.isna().sum(),
    "distinct": raw.nunique(dropna=False)
})
print(profile)
\`\`\`

Reading uncertain columns as strings first prevents identifiers such as \`00123\` becoming the number 123 and lets you apply explicit parsing. Inspect value counts, quantiles, minimum and maximum lengths, duplicated candidate keys, and representative invalid rows. Always retain a raw snapshot.

## Normalize carefully

\`\`\`python
users = raw.copy()
users["email_normalized"] = users["email"].str.strip().str.lower()
users["country"] = users["country"].str.strip().str.upper()
users["age"] = pd.to_numeric(users["age"], errors="coerce").astype("Int64")
users["joined_at"] = pd.to_datetime(users["joined_at"], errors="coerce", utc=True)
\`\`\`

\`errors="coerce"\` converts failures to missing values. That is acceptable only when you count and quarantine the affected rows; otherwise it silently launders invalid input into ordinary nulls. Preserve a flag such as \`age_parse_failed\` before conversion.

Unicode text needs domain-specific treatment. Trimming surrounding whitespace is usually safe. Lowercasing email domains is safe; lowercasing every identifier may not be. Unicode normalization can make canonically equivalent characters comparable, but compatibility normalization may intentionally merge visually similar forms. Keep original display text when normalization affects identity.

## Missing is not one state

A null can mean not collected, not applicable, redacted, not yet known, corrupted, or genuinely absent. If those meanings affect decisions, represent them with a status column rather than one null. Common mechanisms are:

- **MCAR:** missingness unrelated to observed or unobserved values;
- **MAR:** related to observed values and perhaps adjustable using them;
- **MNAR:** related to the missing value itself, such as high earners refusing an income question.

Dropping incomplete rows is unbiased only under strong conditions and can waste data. Mean imputation shrinks variance and invents a pile of identical observations. For prediction, fit imputation parameters on training data only and often add a missingness indicator. For inference, justify the mechanism and use sensitivity analysis.

## Duplicates require an identity rule

Exact duplicate rows are easy. Entity duplication is not. Two users sharing a name are not duplicates; one person changing an email may have two records. Define deterministic matching rules, assign match confidence, and preserve a crosswalk from source ids to canonical ids. Never delete ambiguous records merely because a fuzzy score is high.

\`\`\`python
duplicate_ids = users.loc[users["user_id"].duplicated(keep=False)].sort_values("user_id")
assert users["user_id"].notna().all()
assert users["user_id"].is_unique
\`\`\`

## Outliers may be the subject

An impossible age of 900 is invalid. A valid purchase 100 times larger than usual may be fraud, a wholesale customer, or a currency error. Use domain bounds, distribution checks, and source investigation. If you winsorize, transform, or exclude values, retain the original and record the rule. Robust summaries such as the median and interquartile range reduce sensitivity without pretending the extremes never occurred.

## Build a reject path

A production cleaner emits at least two outputs: valid normalized rows and rejected rows containing the source record, reason code, source version, and processing time. Monitor reject counts by reason. A sudden drop to zero can mean validation stopped running, not that the source became perfect.

## Guided practice

A CSV contains \`user_id\`, \`age\`, \`country\`, and \`joined_at\`. Create valid and rejected outputs. Require a non-empty unique id, age 13 through 120 when present, two-letter country codes, and a parseable timestamp.

## Worked solution

\`\`\`python
df = pd.read_csv("users.csv", dtype="string")
df["age_parsed"] = pd.to_numeric(df["age"], errors="coerce").astype("Int64")
df["joined_parsed"] = pd.to_datetime(df["joined_at"], errors="coerce", utc=True)
df["country_clean"] = df["country"].str.strip().str.upper()

reason = pd.Series(pd.NA, index=df.index, dtype="string")
reason = reason.mask(df["user_id"].isna() | df["user_id"].str.strip().eq(""), "missing_id")
reason = reason.mask(df["user_id"].duplicated(keep=False), "duplicate_id")
reason = reason.mask(df["age"].notna() & ~df["age_parsed"].between(13, 120), "invalid_age")
reason = reason.mask(~df["country_clean"].str.fullmatch(r"[A-Z]{2}", na=False), "invalid_country")
reason = reason.mask(df["joined_parsed"].isna(), "invalid_joined_at")

valid = df.loc[reason.isna()].copy()
rejected = df.loc[reason.notna()].assign(reject_reason=reason[reason.notna()])
\`\`\`

This compact version records one final reason per row; a mature validator would retain all violated rules in a separate reject-detail table. The raw columns remain beside parsed values for diagnosis.`,
      [
        check(
          'Why might uncertain identifier columns be read as strings initially?',
          [
            'To preserve formatting such as leading zeroes until rules are applied',
            'To guarantee that duplicate identifiers are removed automatically across the complete source',
            'To make arithmetic faster than using integer representations',
            'To prevent every missing identifier from appearing as a null value'
          ],
          0,
          'Automatic numeric inference can destroy meaningful formatting and exceed numeric precision. Explicit parsing preserves evidence and intent.'
        ),
        check(
          'What is the danger of errors="coerce" without a reject count?',
          [
            'It raises on the first invalid value and stops all ingestion before returning any output',
            'Invalid source values become ordinary-looking missing values silently',
            'It converts every valid number to a locale-formatted string',
            'The operation always changes the original raw file on disk'
          ],
          1,
          'Coercion is useful when failures remain measurable and diagnosable. Without that path, corruption is indistinguishable from expected missingness.'
        ),
        check(
          'Which statement about a large outlier is most defensible?',
          [
            'Delete it because values far from the mean cannot be real',
            'Replace it with the mean before checking the source system',
            'Investigate its domain meaning and retain the original alongside any treatment',
            'Keep it unchanged in every calculation regardless of source defects or measurement error'
          ],
          2,
          'An extreme observation may be error or signal. Domain validation and an auditable transformation are safer than automatic deletion or blind retention.'
        ),
        check(
          'What should a production cleaning job emit besides accepted rows?',
          [
            'Only a chart showing the percentage of complete columns',
            'A second cleaned copy with every null replaced by zero',
            'An unversioned text log containing only the first failed record and no reason code',
            'Rejected source rows with reason codes and processing provenance'
          ],
          3,
          'A structured reject path preserves evidence, supports reprocessing, and makes changes in source quality observable over time.'
        )
      ]
    ),
    lesson(
      'analytical-sql',
      'SQL from raw rows to analytical answers',
      `# SQL from raw rows to analytical answers

SQL describes the result you want while the database chooses an execution plan. A query is written \`SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ... LIMIT\`, but its logical flow begins with \`FROM\`, then \`WHERE\`, grouping and \`HAVING\`, \`SELECT\`, and finally ordering and limiting.

\`\`\`sql
SELECT title_id,
       COUNT(*) AS play_events,
       COUNT(DISTINCT user_id) AS viewers,
       SUM(minutes) AS total_minutes,
       AVG(minutes) AS average_minutes
FROM play_event
WHERE occurred_at >= '2026-08-01'
  AND occurred_at <  '2026-09-01'
GROUP BY title_id
HAVING COUNT(DISTINCT user_id) >= 100
ORDER BY total_minutes DESC, title_id
LIMIT 20;
\`\`\`

Use half-open time ranges: at or after the start, strictly before the next boundary. They work at every timestamp precision and compose without overlap. SQL uses three-valued logic: comparisons with \`NULL\` yield unknown, and \`WHERE\` keeps only true. Test missing values with \`IS NULL\`; use \`COALESCE(value, fallback)\` only when the fallback has legitimate domain meaning.

## Join at a declared grain

\`\`\`sql
SELECT e.user_id, e.occurred_at, t.title, t.genre
FROM play_event AS e
JOIN title AS t ON t.title_id = e.title_id;
\`\`\`

If \`title.title_id\` is unique, the output remains one row per event. Prove key constraints in the schema or check them. A \`LEFT JOIN\` preserves unmatched left rows and fills right columns with null. A right-side filter in \`WHERE\` removes those null-extended rows and often turns the query into an accidental inner join; put such a condition in \`ON\` when unmatched left rows should remain.

## Conditional aggregates

\`\`\`sql
SELECT user_id,
       COUNT(*) AS plays,
       SUM(CASE WHEN minutes >= 20 THEN 1 ELSE 0 END) AS long_plays,
       AVG(CASE WHEN playback_error = 0 THEN minutes END) AS clean_play_minutes
FROM play_event
GROUP BY user_id;
\`\`\`

The last average excludes error rows because \`AVG\` ignores nulls. That is different from treating them as zero. State which interpretation answers the question.

## Window functions preserve rows

Aggregation collapses a group. A window computes across related rows while retaining each row.

\`\`\`sql
WITH daily AS (
  SELECT date(occurred_at) AS day, title_id, SUM(minutes) AS minutes
  FROM play_event
  GROUP BY date(occurred_at), title_id
)
SELECT day,
       title_id,
       minutes,
       SUM(minutes) OVER (
         PARTITION BY title_id
         ORDER BY day
         ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS rolling_7_row_minutes,
       ROW_NUMBER() OVER (PARTITION BY day ORDER BY minutes DESC, title_id) AS daily_rank
FROM daily;
\`\`\`

The frame says seven **rows**, not necessarily seven calendar days. Build a calendar table and join missing dates when calendar windows matter. \`ROW_NUMBER\` always gives unique positions, \`RANK\` leaves gaps after ties, and \`DENSE_RANK\` does not.

## CTEs make transformations inspectable

A common table expression introduced with \`WITH\` names one step. Use CTEs to express grain changes explicitly: events to user-day, user-day to cohort-month, cohort-month to report. They improve reasoning but are not automatically materialized; inspect the query plan before assuming a performance effect.

## Guided practice

Given \`subscription(user_id, started_at)\` and \`play_event(user_id, occurred_at, minutes)\`, calculate each signup month's users and the share who produced a play event during days 7 through 13 after signup. Keep users with no qualifying event.

## Worked solution

\`\`\`sql
WITH users AS (
  SELECT user_id,
         started_at,
         strftime('%Y-%m-01', started_at) AS cohort_month
  FROM subscription
), retained AS (
  SELECT u.user_id,
         u.cohort_month,
         MAX(CASE WHEN e.user_id IS NOT NULL THEN 1 ELSE 0 END) AS retained
  FROM users AS u
  LEFT JOIN play_event AS e
    ON e.user_id = u.user_id
   AND e.occurred_at >= datetime(u.started_at, '+7 days')
   AND e.occurred_at <  datetime(u.started_at, '+14 days')
  GROUP BY u.user_id, u.cohort_month
)
SELECT cohort_month,
       COUNT(*) AS users,
       AVG(1.0 * retained) AS retention_rate
FROM retained
GROUP BY cohort_month
ORDER BY cohort_month;
\`\`\`

The event-time conditions stay in \`ON\`, preserving users with no match. The intermediate grain is one row per user before the final cohort aggregate.`,
      [
        check(
          'Why is a half-open monthly range preferred for timestamps?',
          [
            'Adjacent ranges meet without overlap at any timestamp precision',
            'It allows the database to ignore every index on the time column',
            'The exclusive boundary automatically converts local time to UTC',
            'It includes records with missing timestamps in the first month'
          ],
          0,
          'Using start inclusive and next boundary exclusive neither misses nor double-counts records at a boundary, even with subsecond timestamps.'
        ),
        check(
          'How does a window aggregate differ from GROUP BY aggregation?',
          [
            'It can execute only after the query has been exported to Python outside the database',
            'It calculates across related rows while retaining individual rows',
            'It removes duplicate values before calculating every aggregate',
            'It requires one result row for each distinct partition key'
          ],
          1,
          'Window functions annotate the existing row grain. GROUP BY changes the grain by collapsing every group into one result row.'
        ),
        check(
          'Where should a filter on the optional right table of a LEFT JOIN usually go?',
          [
            'In ORDER BY so unmatched rows sort after matches',
            'In SELECT as an alias used by every other clause',
            'In the ON condition when unmatched left rows must survive',
            'In LIMIT so the query returns only qualifying matches found on the right table'
          ],
          2,
          'A right-side predicate in WHERE rejects the null-extended nonmatches. Keeping it in ON limits matches while preserving all left rows.'
        ),
        check(
          'A seven-row rolling window always represents seven calendar days when...',
          [
            'the metric column is an integer rather than a floating-point value with decimals',
            'the query also partitions by the title identifier',
            'the result is ordered after the window calculation finishes',
            'the input has exactly one row for every calendar day in scope'
          ],
          3,
          'ROWS counts physical rows. A complete calendar spine is necessary when a row must correspond to each calendar day.'
        )
      ]
    ),
    lesson(
      'exploration-and-visualization',
      'Exploratory analysis and honest visualization',
      `# Exploratory analysis and honest visualization

Exploratory data analysis is a disciplined search for structure, defects, and alternative explanations before formal modeling. It is not repeatedly plotting columns until a story appears.

Begin with the contract:

- What is one row, and is the claimed key unique?
- Which time window and population are present?
- How much is missing, duplicated, late, or impossible?
- What changed in collection or product behavior during the window?
- Which outcome will eventually be analyzed, and could any column reveal its future?

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_parquet("data/processed/play_events.parquet")
print(df.shape)
print(df.dtypes)
print(df.isna().mean().sort_values(ascending=False).head(10))
print(df.select_dtypes("number").describe(percentiles=[.01, .25, .5, .75, .99]).T)
\`\`\`

Profile categorical counts including missing values, numeric distributions on both ordinary and log scales when values are skewed, time-series volume, and relationships by meaningful slices. Compare the first and last period; a stable aggregate can hide a changing composition.

## Match visual encoding to the question

- Use a bar chart for comparisons among discrete categories, with a zero baseline when length encodes magnitude.
- Use a line chart for an ordered continuous axis such as time; do not connect unordered categories.
- Use a histogram or empirical cumulative distribution for a numeric distribution.
- Use a scatter plot for two numeric variables, adding transparency or binning when points overlap.
- Use a box or violin plot to compare distributions, but also show counts and understand what its summary hides.

\`\`\`python
daily = df.set_index("occurred_at").resample("D")["event_id"].count()
ax = daily.plot(figsize=(10, 4), title="Playback events per UTC day")
ax.set(xlabel="Day", ylabel="Events")
ax.figure.tight_layout()
plt.show()
\`\`\`

Every figure needs a population, measure, unit, and time range. "Retention" is not a label; "Share of new users with any play on days 7-13, signup cohorts Jan-Jun 2026" is.

## Avoid visual deception

A truncated bar-axis exaggerates differences because bar length carries the value. A line chart may use a nonzero range if clearly labeled because position and slope, not length from zero, carry the comparison. Dual y-axes can make unrelated trends appear coupled; normalize against a meaningful baseline or use aligned panels. Three-dimensional charts add perspective distortion without information.

Do not let a smooth curve imply more evidence than exists. Show raw points or uncertainty. A 95% interval is not decoration; it says what repeated sampling uncertainty the estimate carries under assumptions.

## Slice before celebrating

An overall metric can reverse inside every subgroup, known as Simpson's paradox, when group composition changes. Compare key segments selected **before** seeing the outcome: platform, geography, acquisition channel, tenure, and accessibility needs may matter. Avoid mining hundreds of slices and reporting only the most dramatic one.

## Separate exploration from confirmation

Exploration generates hypotheses using the data at hand. Confirmation tests a prespecified hypothesis on new data or an untouched holdout. If you choose a metric, subgroup, and time window after seeing which looks strongest, the nominal p-value no longer describes the selection process.

## Guided practice

You receive playback events with \`occurred_at\`, \`platform\`, \`minutes\`, and \`error\`. Design a six-view EDA report that can expose data defects and product changes without claiming causality.

## Worked solution

A strong report includes: daily event count with deployment markers; missing and duplicate rates by day; a histogram plus high quantiles of minutes; error rate over time with binomial intervals; minutes and error rate by platform with sample counts; and the platform composition by day. Annotate UTC boundaries and the exact filters. The report may say "error rate rose as mobile share increased" but cannot say mobile caused the rise until design or adjustment addresses confounding.`,
      [
        check(
          'Which plot is normally best for the distribution of one continuous variable?',
          [
            'A histogram with stated binning and sample size',
            'A pie chart with one slice per unique numeric value',
            'A connected line in the table current row order',
            'A three-dimensional bar chart sorted by magnitude'
          ],
          0,
          'A histogram or empirical cumulative distribution reveals shape, spread, and tails. Unique-value categories usually obscure continuous structure.'
        ),
        check(
          'Why should most bar charts begin their value axis at zero?',
          [
            'Matplotlib refuses to render bars on any other baseline',
            'Bar length encodes magnitude, so truncation distorts the comparison',
            'Zero prevents sampling uncertainty from appearing on the chart',
            'A zero baseline automatically accounts for missing observations and unequal samples'
          ],
          1,
          'Viewers compare the lengths of bars from their baseline. A truncated baseline makes small numerical differences look proportionally large.'
        ),
        check(
          'What makes a confirmatory analysis different from exploration?',
          [
            'It never displays a chart or descriptive statistic',
            'It must use a machine-learning model rather than a sample mean',
            'Its hypothesis and decision rule are set before inspecting test outcomes',
            'It can reuse unlimited outcome-driven slices without adjustment on the same outcomes'
          ],
          2,
          'Prespecification protects the advertised error rate from the many unreported choices made while searching the data.'
        ),
        check(
          'An aggregate metric improves while every major segment worsens. What should be checked first?',
          [
            'Whether the chart library rounded each segment differently',
            'Whether every segment should be deleted as an outlier',
            'Whether the aggregate needs a more saturated display color',
            'Whether the mixture of segment sizes changed over time'
          ],
          3,
          'Changing composition can reverse the aggregate relationship. Report both subgroup behavior and the weights producing the overall metric.'
        )
      ]
    ),
    lesson(
      'descriptive-statistics',
      'Descriptive statistics, distributions, and robust summaries',
      `# Descriptive statistics, distributions, and robust summaries

A dataset has an **empirical distribution**: values and how frequently they occur. A summary is useful only when it preserves the features important to the decision.

For observations \`x1\` through \`xn\`, the sample mean is their sum divided by \`n\`. It is the balance point and uses every magnitude, so one extreme value can move it strongly. The median is the middle ordered value and resists extremes. The mode is the most frequent value and may be non-unique.

\`\`\`python
import numpy as np

x = np.array([12, 14, 15, 16, 18, 120], dtype=float)
print(x.mean())              # 32.5
print(np.median(x))          # 15.5
print(np.quantile(x, [.25, .75]))
\`\`\`

Neither center is universally better. Mean revenue answers total revenue divided by customers. Median revenue describes a typical ordered customer. Report both when skew matters.

## Spread and units

The range uses only two points. The interquartile range is \`Q3 - Q1\` and covers the central half. Variance averages squared deviations from the mean; sample variance divides by \`n - 1\` to estimate population variance. Standard deviation takes the square root and returns to the original unit.

\`\`\`python
sample_sd = x.std(ddof=1)
population_sd = x.std(ddof=0)
\`\`\`

The \`ddof\` choice is part of the estimand. Do not mix population description and sample inference by habit.

The median absolute deviation, based on distances from the median, is robust to extremes. Coefficient of variation divides standard deviation by mean and is meaningful only on a ratio scale with a meaningful zero and a non-near-zero mean.

## Shape

Skew describes asymmetry; heavy tails describe extreme probability relative to a reference distribution. A normal distribution is defined by mean and variance, is symmetric, and has mathematically specific tail behavior. Many real durations, counts, and monetary values are not normal. The central limit theorem concerns the sampling distribution of a suitably normalized mean under conditions; it does not make the raw data normal.

Quantiles answer operational questions directly: p95 latency is the value at or below which 95% of observations fall. It does **not** mean 95% of requests took exactly that long. Quantile calculation conventions differ for finite samples, so record the library and method when boundaries drive policy.

## Covariance and correlation

Covariance shows whether two variables vary together, but its magnitude depends on units. Pearson correlation standardizes covariance to -1 through 1 and measures linear association. Spearman correlation is Pearson correlation of ranks and captures monotonic association. Neither implies causation; both can be distorted by outliers, restricted ranges, time trends, and mixtures of groups.

\`\`\`python
from scipy.stats import spearmanr

pearson = np.corrcoef(minutes, rating)[0, 1]
spearman = spearmanr(minutes, rating).statistic
\`\`\`

Always inspect the scatter plot. The same correlation can arise from a straight cloud, a curve, separated clusters, or one influential point.

## Standardization

A z-score \`(x - mean) / standard_deviation\` expresses distance in standard deviations. It does not turn a variable into a normal distribution and is sensitive to the same outliers as mean and standard deviation. Robust scaling uses median and IQR. Fit scaling parameters on training data only in predictive work.

## Guided practice

Compare playback minutes for plans A and B. A is \`[10, 12, 14, 15, 16, 120]\`; B is \`[18, 20, 21, 22, 24, 26]\`. Calculate mean, median, sample standard deviation, and IQR, then write a decision-safe summary.

## Worked solution

\`\`\`python
import numpy as np

def describe(values):
    values = np.asarray(values, dtype=float)
    q1, q3 = np.quantile(values, [.25, .75])
    return {
        "mean": values.mean(),
        "median": np.median(values),
        "sample_sd": values.std(ddof=1),
        "iqr": q3 - q1
    }

print(describe([10, 12, 14, 15, 16, 120]))
print(describe([18, 20, 21, 22, 24, 26]))
\`\`\`

Plan A's mean is pulled above B by one extreme session, while its typical user is lower and its dispersion much larger. Report the distribution and investigate the 120-minute observation; do not declare A better from its mean alone.`,
      [
        check(
          'Which center is least changed by one extremely large observation?',
          ['The median of the ordered observations', 'The arithmetic mean of all values', 'The root mean square of the values', 'The midpoint between minimum and maximum'],
          0,
          'The median depends on order rather than the extreme magnitude. It can still change with the sample, but its response to one huge value is bounded.'
        ),
        check(
          'Why is standard deviation easier to interpret than variance?',
          [
            'It always lies between zero and one for every dataset',
            'It returns spread to the original unit of the variable',
            'It is immune to outliers because it uses a square root',
            'It measures the central half rather than every observation'
          ],
          1,
          'Variance has squared units. Its square root, standard deviation, uses the same units as the observations, though it remains sensitive to extremes.'
        ),
        check(
          'What does the central limit theorem most directly describe?',
          [
            'Every sufficiently large raw dataset becomes normally distributed',
            'Every population can be summarized without using its variance',
            'The sampling distribution of an aggregate such as a mean under conditions',
            'All sample correlations converge to one as sample size and variable count increase'
          ],
          2,
          'The theorem concerns repeated-sample aggregates after normalization. A highly skewed population remains highly skewed even when its sample mean is near normal.'
        ),
        check(
          'A Pearson correlation of zero proves that two variables are...',
          ['independent in every possible joint distribution', 'causally unrelated after all confounding is removed', 'identically distributed with the same mean, variance, quantiles, and tail behavior', 'without measured linear association, though another relationship may exist'],
          3,
          'Pearson correlation summarizes linear association. Curves, clusters, and other dependencies can produce zero correlation.'
        )
      ]
    ),
    lesson(
      'probability-and-sampling',
      'Probability, conditional reasoning, and sampling',
      `# Probability, conditional reasoning, and sampling

Probability is a language for uncertainty, not a guarantee about one event. A sample space lists possible outcomes; an event is a set of outcomes. Probabilities satisfy non-negativity, total probability one, and addition for disjoint events.

The complement rule is \`P(not A) = 1 - P(A)\`. For any events, \`P(A or B) = P(A) + P(B) - P(A and B)\`. Conditional probability is:

\`P(A given B) = P(A and B) / P(B)\`, when \`P(B) > 0\`.

Events A and B are independent when knowing B does not change A, equivalently \`P(A and B) = P(A)P(B)\`. Mutually exclusive non-impossible events are not independent: learning one occurred proves the other did not.

## Bayes' rule and base rates

Suppose 1% of accounts are fraudulent. A detector catches 90% of fraud and flags 5% of legitimate accounts. Among 10,000 accounts, expect 100 frauds with 90 flagged and 9,900 legitimate accounts with 495 flagged. Therefore only \`90 / (90 + 495)\`, about 15.4%, of flagged accounts are fraudulent.

\`P(fraud given flag)\` is not \`P(flag given fraud)\`. Bayes' rule reverses the condition using the base rate:

\`P(A given B) = P(B given A) P(A) / P(B)\`.

Work with expected counts when conditional notation feels abstract; the arithmetic is the same and often exposes neglected base rates.

## Random variables and expectation

A random variable maps outcomes to numbers. Its expected value is the probability-weighted long-run average, not necessarily a possible outcome. Linearity of expectation holds without independence: \`E[X + Y] = E[X] + E[Y]\`. Variances add only when covariance is accounted for; independent variables have zero covariance, though zero covariance alone need not imply independence.

Common distributions model mechanisms:

- Bernoulli: one yes/no trial with probability \`p\`.
- Binomial: number of successes in a fixed number of independent equal-probability trials.
- Poisson: counts over exposure under a constant-rate independent-event model.
- Normal: symmetric continuous variation produced by many small additive effects.
- Exponential: waiting time in a memoryless Poisson process.

Choose from the generating story and validate it; do not select a distribution because its formula is familiar.

## Sampling designs

A simple random sample gives every eligible unit a known equal selection chance. Stratified sampling samples within declared groups to guarantee coverage and can improve precision. Cluster sampling selects groups, often reducing cost but increasing similarity within samples. Convenience samples have unknown selection mechanisms and cannot be repaired merely by having many rows.

Sampling **without replacement** creates dependence between draws but yields representative finite-population inference when designed correctly. Survey weights often invert selection probabilities, then adjust for nonresponse and calibration. Weighting can reduce known imbalance but raises variance and cannot fix missing unmeasured groups by magic.

## Selection and survivorship bias

Instrumentation captures users who reached the instrumented state. An analysis of completed sessions says nothing directly about users who failed before session creation. Conditioning on a variable caused by two others can create a spurious relationship, known as collider bias. Draw the data-generating process before deciding which filters or controls are safe.

## Guided practice

A service has 20% paid users. A churn rule flags 80% of users who will churn and 10% of users who will not. If 5% of paid users churn next month, calculate the probability that a flagged paid user really churns.

## Worked solution

Use 10,000 paid users. Expected churners: 500, of whom 400 are flagged. Non-churners: 9,500, of whom 950 are flagged. The positive predictive value is \`400 / (400 + 950)\`, about 29.6%. High sensitivity does not create a high positive predictive value when churn is uncommon and false positives accumulate across the large negative class.`,
      [
        check(
          'Two non-impossible events are mutually exclusive. What follows?',
          [
            'They cannot be independent because one rules out the other',
            'They must have equal probabilities within the sample space',
            'Their intersection has the larger event probability',
            'Observing either event makes the other more likely to occur'
          ],
          0,
          'Mutual exclusion gives an intersection probability of zero, while independence would require the product of two positive probabilities.'
        ),
        check(
          'Why can an accurate detector have a low positive predictive value?',
          [
            'Precision is calculated without using any detector outcomes',
            'False positives can dominate when the target base rate is low',
            'Sensitivity and false-positive rate always sum exactly to one',
            'Bayes rule applies only when both classes have equal size'
          ],
          1,
          'Even a modest false-positive rate applied to a large negative class can outnumber true positives from a rare target class.'
        ),
        check(
          'What does linearity of expectation require about X and Y?',
          [
            'They must be independent and normally distributed',
            'They must share the same variance, expected value, and full probability distribution',
            'No independence assumption is needed for E[X + Y] = E[X] + E[Y]',
            'They must each take only the values zero and one'
          ],
          2,
          'Expectations add regardless of dependence. Variance calculations, unlike this identity, must account for covariance.'
        ),
        check(
          'What is the central weakness of a very large convenience sample?',
          [
            'It cannot contain more than one observation from each stratum or sampled cluster',
            'Its sampling variance must exceed that of every small sample',
            'It prevents any descriptive calculation within the observed group',
            'Its unknown selection process may systematically exclude the target population'
          ],
          3,
          'More observations reduce random error around the sampled mechanism but do not eliminate selection bias from who could or chose to appear.'
        )
      ]
    ),
    lesson(
      'estimation-and-uncertainty',
      'Estimation, confidence intervals, and bootstrap reasoning',
      `# Estimation, confidence intervals, and bootstrap reasoning

An **estimand** is the population quantity you intend to learn: the mean 28-day watch time among users who signed up in August, or the difference in activation rates caused by two onboarding variants. An **estimator** is the rule applied to a sample. An **estimate** is the resulting number. Confusing them makes uncertainty vague.

Repeated samples produce a **sampling distribution** of an estimator. Bias is the difference between its expected value and the estimand. Variance measures how much it changes across samples. Mean squared error combines variance and squared bias. A slightly biased stable estimator can predict better than a wildly variable unbiased one, but bias is unacceptable when it encodes the wrong population or causal question.

## Standard errors and confidence intervals

The standard error is the estimated standard deviation of the estimator's sampling distribution. For an independent sample mean it is approximately \`sample_sd / sqrt(n)\`. Quadrupling sample size halves this standard error; it does not eliminate systematic bias.

A frequentist 95% confidence procedure produces intervals that cover the fixed true parameter in 95% of repeated samples under its assumptions. After observing one interval, the parameter is not treated as randomly moving in and out of it. In ordinary communication, say the interval gives the range of values reasonably compatible with the data and model, then name the assumptions.

\`\`\`python
import numpy as np
from scipy.stats import t

x = np.asarray(session_minutes, dtype=float)
n = len(x)
mean = x.mean()
se = x.std(ddof=1) / np.sqrt(n)
critical = t.ppf(.975, df=n - 1)
interval = (mean - critical * se, mean + critical * se)
\`\`\`

The t interval assumes independent observations and a mean whose sampling distribution is adequately modeled. Repeated sessions from the same user are clustered, so treating them as independent usually understates uncertainty.

## Bootstrap

The nonparametric bootstrap repeatedly samples \`n\` observed units **with replacement** and recalculates the statistic. It approximates sampling variation using the empirical distribution.

\`\`\`python
rng = np.random.default_rng(20260830)
x = np.asarray(user_level_minutes)
boot = np.empty(10_000)
for i in range(len(boot)):
    sample = rng.choice(x, size=len(x), replace=True)
    boot[i] = np.median(sample)
lo, hi = np.quantile(boot, [.025, .975])
\`\`\`

Resample at the independent unit. If treatment is assigned to users and each user has sessions, resample users with all their sessions, not individual session rows. For time series, naive row resampling destroys autocorrelation; block bootstrap or a time-series model may be needed. The bootstrap cannot create missing populations or correct a biased collection process.

## Practical versus statistical precision

An interval can be statistically narrow and practically useless if the estimand is poorly defined. Conversely, an estimate may be imprecise yet rule out harmful effects. Define a smallest effect worth acting on before seeing results. Report absolute effects as well as relative changes: a 20% relative lift from 1.0% to 1.2% is a 0.2 percentage-point absolute lift.

## Prediction intervals

A confidence interval for a mean concerns uncertainty in the average. A prediction interval for a new individual includes both mean uncertainty and individual variation, so it is wider. Do not give a customer the confidence interval for average delivery time as if it described their delivery.

## Guided practice

You have one row per user with 28-day minutes. Estimate the median and a bootstrap 95% interval, then explain what the interval does and does not cover.

## Worked solution

\`\`\`python
import numpy as np

x = np.asarray(user_minutes, dtype=float)
rng = np.random.default_rng(7)
estimates = np.array([
    np.median(rng.choice(x, size=x.size, replace=True))
    for _ in range(20_000)
])
estimate = np.median(x)
interval = np.quantile(estimates, [.025, .975])
\`\`\`

The interval approximates repeated-sample uncertainty for the population median under representative independent user sampling. It does not contain 95% of individual users, repair selection bias, or guarantee coverage in this one dataset.`,
      [
        check(
          'What is an estimand?',
          [
            'The population quantity the analysis is designed to learn',
            'One numeric value calculated from the observed sample after the sampling process finishes',
            'The software function used to draw a visualization',
            'The random seed controlling a resampling algorithm'
          ],
          0,
          'The estimand is the target quantity. An estimator is a rule, and its application to observed data produces an estimate.'
        ),
        check(
          'Under ideal independent sampling, quadrupling n changes the mean standard error how?',
          ['It becomes four times larger', 'It is approximately halved', 'It remains exactly unchanged', 'It becomes exactly zero'],
          1,
          'Standard error scales approximately with one over the square root of n, so multiplying n by four divides it by two.'
        ),
        check(
          'At what level should a bootstrap resample repeated sessions nested within users?',
          [
            'Each individual numeric cell independently and separately from all other cells',
            'Each session row while forgetting which user produced it',
            'Users together with their associated sessions when users are independent',
            'Only the users whose outcomes exceed the observed median'
          ],
          2,
          'The bootstrap must preserve dependence inside the sampling unit. User-level resampling keeps each selected user full cluster of observations together.'
        ),
        check(
          'Why is a prediction interval usually wider than a confidence interval for the mean?',
          [
            'It is always required to use a lower confidence percentage',
            'It ignores the fitted model and uses only the sample range',
            'It estimates the parameter with fewer observations drawn from the population by definition',
            'It includes individual outcome variation as well as mean uncertainty'
          ],
          3,
          'A new individual varies around the population mean even if that mean were known perfectly, so prediction carries both sources of uncertainty.'
        )
      ]
    ),
    lesson(
      'experiments-and-causality',
      'Hypothesis tests, experiments, and causal claims',
      `# Hypothesis tests, experiments, and causal claims

A hypothesis test asks how surprising a prespecified statistic would be if a null model were true. The p-value is the probability, **under the null and its assumptions**, of a result at least as incompatible with the null as the observed one. It is not the probability the null is true, the probability the result is chance, or the size of an effect.

Choose before observing outcomes:

- the primary metric and its unit of analysis;
- null and alternative hypotheses;
- minimum effect worth detecting;
- significance level and desired power;
- sample-size or stopping rule;
- exclusions, guardrails, and subgroup analyses.

Statistical significance without effect size and interval is incomplete. With enough data, a negligible difference becomes significant. With little data, a valuable effect may remain uncertain.

## Randomized experiments

Random assignment makes treatment independent of potential outcomes in expectation, allowing a difference in outcomes to estimate a causal effect for the assigned population. Preserve assignment with intention-to-treat analysis: compare groups as assigned, even when some users do not comply. An analysis of only compliers can reintroduce selection bias.

Before reading the outcome, check assignment counts and pre-treatment covariates. A severe mismatch may reveal instrumentation failure. Do not repeatedly test and stop the moment \`p < 0.05\`; optional stopping inflates false positives unless a sequential design accounts for each look.

\`\`\`python
import numpy as np
from scipy.stats import ttest_ind

control = user_level.loc[user_level.variant.eq("control"), "minutes_28d"]
treatment = user_level.loc[user_level.variant.eq("treatment"), "minutes_28d"]
effect = treatment.mean() - control.mean()
test = ttest_ind(treatment, control, equal_var=False)
\`\`\`

The independent unit must match randomization. If users are randomized, aggregating to user level or using cluster-aware inference avoids pretending sessions are independent.

## Multiple testing

At a 5% threshold, testing 20 true nulls independently yields about one false rejection on average. Prespecify a small primary family. Bonferroni controls the probability of any false positive by dividing alpha; false discovery rate procedures control the expected proportion of false discoveries among rejected hypotheses. Neither rescues outcome-driven storytelling.

## Observational causal reasoning

Association becomes causal only under a design and assumptions. A **confounder** affects both exposure and outcome. A **mediator** lies on the causal path; controlling it removes part of the total effect. A **collider** is caused by two variables; conditioning on it can create a false association.

Draw a directed acyclic graph before selecting controls. For an observational estimate, common strategies include adjustment for measured confounders, matching or weighting by propensity, difference-in-differences with parallel-trend assumptions, instrumental variables with strong validity conditions, and regression discontinuity near a fixed threshold. Each identifies a particular effect under assumptions that must be defended, not merely calculated.

Prediction does not require causal features to predict well. Intervention does. A model may learn that support contact predicts churn; forcing users to contact support will not therefore prevent churn.

## Practical experiment checklist

Check sample ratio, exposure logging, novelty and seasonality, interference between users, metric latency, guardrail harm, and whether treatment changed who gets measured. Report assignment effect, absolute and relative estimates, intervals, sample sizes, and every planned primary outcome.

## Guided practice

Design an experiment for a recommendation row intended to increase 28-day completed titles without increasing playback errors. State unit, metrics, assignment, stopping, and analysis.

## Worked solution

Randomize eligible users once and persist assignment. Primary metric: completed titles per assigned user in 28 days. Guardrails: error sessions per 1,000 starts and support contacts per user. Choose a minimum worthwhile increase and calculate sample size from historical user-level variance; run through the fixed exposure and follow-up window. Analyze intention to treat at user grain with an effect and 95% interval, check assignment and missing outcome rates before unblinding, and correct or label the prespecified guardrail family. Users sharing households may interfere, so document that limitation or randomize at household grain if reliable.`,
      [
        check(
          'What does a p-value represent?',
          [
            'A tail probability for the observed statistic under the null model',
            'The posterior probability that the null hypothesis is correct',
            'The proportion of the measured effect caused by random noise',
            'The probability a successful replication returns the same estimate'
          ],
          0,
          'A p-value is calculated assuming the null and analysis assumptions. It does not assign a probability to the hypothesis itself.'
        ),
        check(
          'Why analyze a randomized experiment by original assignment?',
          [
            'It guarantees every assigned user actually receives the treatment',
            'It preserves the causal comparison created by randomization',
            'It removes the need to monitor missing outcome measurements',
            'It estimates only the effect among users who perfectly comply'
          ],
          1,
          'Filtering on compliance can select different types of users in each arm. Intention to treat keeps the randomized groups comparable.'
        ),
        check(
          'What can happen when analysis conditions on a collider?',
          [
            'Every confounding path is automatically blocked',
            'The treatment becomes randomized inside every subgroup',
            'A spurious association can be opened between its causes',
            'All measurement error becomes independent of the outcome'
          ],
          2,
          'A collider is a shared effect. Selecting or controlling on it can make its otherwise independent causes statistically dependent.'
        ),
        check(
          'Why is repeatedly checking an ordinary fixed-horizon test and stopping at p < 0.05 unsafe?',
          [
            'It always decreases the estimated treatment effect to exactly zero in expectation',
            'It prevents any user from remaining in the control group',
            'It changes a two-sided test into a valid one-sided test',
            'Repeated opportunities to stop raise the actual false-positive rate'
          ],
          3,
          'A fixed-horizon threshold assumes one planned look. Sequential methods can support repeated looks only by adjusting their decision boundaries.'
        )
      ]
    ),
    lesson(
      'ml-problem-framing',
      'Machine-learning problems, baselines, and evaluation design',
      `# Machine-learning problems, baselines, and evaluation design

Machine learning estimates a function from examples. The difficult work is defining an example that exists at prediction time and an evaluation that represents deployment.

A supervised dataset contains features \`X\` and a target \`y\`. Regression predicts a numeric target, classification predicts class probabilities or labels, ranking orders candidates, forecasting predicts a future indexed sequence, and survival analysis models time until an event with censoring. Choose the formulation from the decision, not from the algorithm you want to use.

Write a prediction contract:

- **Unit:** one row represents what entity or decision?
- **Prediction time:** exactly when is the prediction made?
- **Horizon:** what future window defines the outcome?
- **Target:** how is the label computed, including missing and censored outcomes?
- **Available features:** what is known by prediction time?
- **Action:** what changes because of the score?
- **Cost:** what are false positives, false negatives, delay, and no action worth?

"Predict churn" is incomplete. "At 00:00 UTC each Monday, rank active paid users by probability of canceling in the next 28 days, using information available before that Monday, so a fixed-capacity retention team can contact 2,000 users" is testable.

## Start with a baseline

A regression baseline can predict the training mean or a group median. A classification baseline can predict the prevalence or rank by one sensible rule. A forecast can use the last value or same weekday last week. A complex model that does not beat a correctly evaluated baseline has not earned production complexity.

\`\`\`python
from sklearn.dummy import DummyClassifier

baseline = DummyClassifier(strategy="prior")
baseline.fit(X_train, y_train)
baseline_probability = baseline.predict_proba(X_valid)[:, 1]
\`\`\`

Also estimate the value of perfect prediction. If the action cannot change an outcome, labels arrive too late, or capacity is zero, even a flawless score has no product value.

## Split like deployment

Random splitting assumes examples are exchangeable. It is wrong when future data predicts past performance, the same user appears across splits, or near-duplicate records cross the boundary.

- Use a time split when predicting the future from the past.
- Use a group split when examples from one entity must stay together.
- Use a spatial or site holdout when deployment must generalize to new locations.
- Deduplicate before splitting, while fitting any learned deduplication rule on training data only.

Keep a final test set untouched until choices are finished. Use training data to fit, validation or cross-validation to choose, and test data for one final estimate. Repeatedly consulting the test set turns it into another validation set.

## Metrics follow decisions

Loss functions train models; evaluation metrics compare decisions. Mean absolute error expresses typical absolute numeric error. Root mean squared error punishes large errors more. Log loss evaluates probability quality. Precision, recall, and ranking metrics describe selection. Calibration asks whether predictions near 0.2 occur about 20% of the time.

An aggregate metric should be reported with uncertainty and slices. A model can improve average error while failing the highest-value region or a protected group. Measure latency, feature availability, abstentions, and coverage too.

## Offline and online are different questions

Offline evaluation asks how a frozen model would have predicted recorded labels. Deployment may change behavior, data availability, and the population it sees. A recommender trained on past clicks learns from items earlier systems exposed. Online experiments measure the full intervention, including those feedback loops.

## Guided practice

Frame a model that helps a support team prioritize playback failures. The team can inspect 500 sessions per day and wants to find sessions likely to lead to cancellation within seven days.

## Worked solution

Use one row per completed or failed playback session, scored immediately after the session ends. The target is whether the same account cancels during the following seven full days; exclude sessions without seven days of observable follow-up or handle them as censored. Features include only data known by session end. Split chronologically and group sessions from an account to avoid identity leakage. Compare with ranking by error code severity. Primary evaluation is precision among the top 500 daily scores, with recall, calibration, capacity stability, account-level slices, and a later randomized test of the support intervention.`,
      [
        check(
          'What must a prediction-time contract prevent?',
          [
            'Features that become known only after the prediction is made',
            'Models that return a probability rather than a hard label at the scoring boundary',
            'Training sets containing more rows than validation sets',
            'Metrics with values outside the interval from zero to one'
          ],
          0,
          'A deployed model cannot use future information. Stating prediction time and feature availability exposes this temporal leakage before training.'
        ),
        check(
          'Why establish a simple baseline before tuning complex models?',
          [
            'A baseline automatically removes every source of measurement bias',
            'It shows whether complexity creates useful incremental performance',
            'The baseline target can then be reused safely as an input feature',
            'A baseline guarantees the final model is calibrated by construction'
          ],
          1,
          'The baseline represents an inexpensive alternative. A sophisticated system must beat it under the same valid evaluation to justify added risk and cost.'
        ),
        check(
          'When is a random row split especially unsafe?',
          [
            'The feature matrix has both integers and floating values',
            'The positive class is less frequent than the negative class in the development sample',
            'Rows from the same user appear repeatedly and can cross splits',
            'The target is numeric rather than a classification label'
          ],
          2,
          'Repeated entities allow the model to recognize identity-specific patterns rather than generalize. Grouped or temporal splits should reflect deployment.'
        ),
        check(
          'Why should a final test set be consulted only after choices are fixed?',
          [
            'Its labels are unavailable until the model is deployed publicly',
            'Test rows cannot be transformed by a fitted preprocessing pipeline',
            'Most libraries delete the test set after the first evaluation call',
            'Repeated choices based on it overfit the evaluation itself'
          ],
          3,
          'Every test-driven choice transfers information from that set into the model development process, making its reported performance optimistically biased.'
        )
      ]
    ),
    lesson(
      'preprocessing-and-leakage',
      'Preprocessing, feature engineering, and leakage-proof pipelines',
      `# Preprocessing, feature engineering, and leakage-proof pipelines

A feature pipeline is part of the model. Every parameter learned from data, including a mean, vocabulary, category list, imputation value, selected column, or outlier threshold, must be fit on training data and then applied unchanged to validation, test, and production records.

## Numeric and categorical features

Numeric variables may need imputation, transformation, and scaling. Standardization helps distance-based models and regularized linear models; tree splits usually do not require it. Log transforms can make positive heavy-tailed values easier to model, using \`log1p\` when zero is valid. Never log a value merely to make a chart look normal.

Categorical variables with a manageable vocabulary can use one-hot encoding. Ordinal encoding is appropriate only when categories have a real order. High-cardinality identifiers can memorize training outcomes. Target encoding must be computed out of fold with smoothing or it leaks the label directly.

Text, images, and timestamps also require prediction-time discipline. From a timestamp, derive hour, weekday, or elapsed time only from a legitimate reference. A "days until cancellation" feature is the target in disguise.

## Use a single fitted pipeline

\`\`\`python
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric = ["sessions_7d", "minutes_7d", "error_rate_7d"]
categorical = ["plan", "country", "platform"]

numeric_pipe = Pipeline([
    ("impute", SimpleImputer(strategy="median", add_indicator=True)),
    ("scale", StandardScaler())
])
categorical_pipe = Pipeline([
    ("impute", SimpleImputer(strategy="most_frequent")),
    ("encode", OneHotEncoder(handle_unknown="ignore"))
])
preprocess = ColumnTransformer([
    ("numeric", numeric_pipe, numeric),
    ("categorical", categorical_pipe, categorical)
])
model = Pipeline([
    ("preprocess", preprocess),
    ("model", LogisticRegression(max_iter=1000))
])
model.fit(train[numeric + categorical], train["churned"])
\`\`\`

The pipeline makes cross-validation fit preprocessing inside each training fold. Preprocessing the complete dataset before cross-validation lets validation-fold distributions influence training.

## Leakage patterns

**Target leakage** uses information created by or after the outcome: refund reason while predicting refunds. **Train-test contamination** fits transformations or selects features using all rows. **Entity leakage** places one entity in both splits. **Temporal leakage** computes a rolling feature without cutting events off at prediction time. **Label leakage through joins** attaches a current dimension value that was different historically.

Point-in-time correctness requires asking, for every feature row: "What would this table have contained then?" A mutable user table with today's plan cannot reconstruct the plan a user had six months ago. Use effective-dated dimensions or event histories.

## Feature engineering from behavior

Reliable behavioral features often use recency, frequency, and magnitude over explicit windows:

- sessions in the previous 7 and 28 days;
- days since last successful play;
- error sessions divided by starts with a zero-denominator rule;
- trend comparing recent and earlier windows;
- distinct active days rather than raw event count.

Build features from event time less than the row prediction time. Unit-test boundary events exactly at the cutoff.

## Missing and unseen values

Production will see categories absent from training. Encoders need an unknown policy. A missing indicator can carry signal, but if missingness comes from an upstream failure the model may exploit an incident rather than user behavior. Monitor missing and unknown rates as operational features of the input contract.

## Guided practice

Find the leakage in this workflow: combine January through June users, calculate each numeric column mean over the full table, fill missing values, select features most correlated with churn over the full table, then split May-June as validation.

## Worked solution

Both imputation values and correlation-based selection used validation outcomes or distributions. Split by time first. Fit imputation and feature selection only on January-April, ideally inside a pipeline; apply the fitted transformations to May-June. Also audit every source column against its row prediction time, keep all records from an entity in a defensible temporal arrangement, and reserve a later untouched period for final testing.`,
      [
        check(
          'Where must a median imputer be fit during cross-validation?',
          [
            'Inside each training fold and then applied to its validation fold',
            'Once on the complete dataset before folds are created',
            'Separately on each validation fold using its own median',
            'Only after final test performance has already been reported and the model published'
          ],
          0,
          'A fold must simulate unseen data. Learning the median from validation rows contaminates training with information from the evaluation distribution.'
        ),
        check(
          'What is point-in-time correctness?',
          [
            'Every feature table uses the same current calendar date',
            'Each feature contains only information available at prediction time',
            'All timestamps are rounded to whole seconds before joining',
            'The target and every feature cover identical future windows and outcome periods'
          ],
          1,
          'Historical training examples must reconstruct what the production system would have known then, including historical dimension values.'
        ),
        check(
          'Why is ordinary target encoding computed on the same rows dangerous?',
          [
            'It always creates more columns than one-hot encoding',
            'It cannot represent categories with string names',
            'The encoded value directly incorporates each row outcome signal',
            'It forces every category to receive an identical numeric value for every future row'
          ],
          2,
          'Target statistics must be produced out of fold with regularization so a row label does not leak into its own feature.'
        ),
        check(
          'Which feature most clearly leaks a cancellation target?',
          [
            'Successful sessions during the 28 days before scoring',
            'The account plan recorded at the historical scoring time',
            'Playback error rate calculated before the cutoff timestamp',
            'The cancellation reason entered after the account closes'
          ],
          3,
          'A post-outcome cancellation reason cannot exist at scoring time and is created by the event being predicted.'
        )
      ]
    ),
    lesson(
      'regression',
      'Regression, regularization, and numeric prediction',
      `# Regression, regularization, and numeric prediction

Regression predicts a numeric target and can also estimate interpretable conditional relationships. Ordinary least squares chooses coefficients minimizing the sum of squared residuals:

\`y_hat = intercept + beta1*x1 + ... + betap*xp\`.

A coefficient is the expected change in prediction for a one-unit feature increase while other modeled features remain fixed. That is not automatically causal; omitted variables, measurement error, selection, and functional-form mistakes all affect interpretation.

\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

model = LinearRegression().fit(X_train, y_train)
pred = model.predict(X_valid)
mae = mean_absolute_error(y_valid, pred)
rmse = mean_squared_error(y_valid, pred) ** 0.5
r2 = r2_score(y_valid, pred)
\`\`\`

MAE weights absolute errors equally and is in target units. RMSE emphasizes large misses. \`R squared\` compares squared error with predicting the target mean and can be negative on unseen data. A high \`R squared\` does not mean predictions are accurate enough for a decision.

## Assumptions and residuals

For unbiased linear conditional-mean estimation, errors should average zero given features. Classical standard errors additionally rely on independence and an appropriate variance model. Exact normal residuals are not required for prediction, but residual plots reveal missing nonlinear structure, changing variance, groups, and extreme influence.

Add nonlinear terms explicitly when theory supports them:

\`\`\`python
df["tenure_squared"] = df["tenure_days"] ** 2
df["mobile_error_interaction"] = df["is_mobile"] * df["error_rate"]
\`\`\`

An interaction means one feature effect depends on another. Centering continuous variables can make lower-order coefficients easier to interpret.

## Regularization

When features are numerous or correlated, ordinary coefficients become unstable. Ridge regression adds an L2 penalty, shrinking coefficients smoothly and often improving prediction. Lasso adds an L1 penalty and can set coefficients exactly to zero, but its selected feature among correlated alternatives may be unstable. Elastic net combines both.

\`\`\`python
from sklearn.linear_model import Ridge
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

ridge = make_pipeline(StandardScaler(), Ridge(alpha=10.0))
ridge.fit(X_train, y_train)
\`\`\`

Scale features before penalized linear models because penalties act on coefficient magnitude. Choose regularization strength within cross-validation, never on the final test set.

## Transforming targets

Positive skewed targets may use a log transform. If training on \`log1p(y)\`, convert with \`expm1\`, but the back-transformed conditional mean is not simply the exponential of the mean log prediction because of Jensen's inequality. Evaluate in the original decision unit and consider distributions designed for counts or positive values.

Quantile regression predicts a conditional quantile, useful when under- and overprediction have unequal cost. Poisson or negative-binomial models better reflect count mechanisms when their assumptions fit.

## Extrapolation

Linear models continue their fitted relationship beyond observed feature ranges. Tree models usually predict within learned leaf outcomes. Neither provides evidence in regions without training support. Record feature ranges and flag extrapolation.

## Guided practice

You predict next-month viewing minutes. Most users have 0-100 minutes, a few have thousands, and underpredicting high-capacity demand is twice as costly as overpredicting. Design evaluation and candidate models.

## Worked solution

Start with group median and last-month baselines. Report MAE, RMSE, residual quantiles, and a weighted loss reflecting the asymmetric operational cost. Compare a regularized linear pipeline on transformed behavioral features, a robust or quantile regressor, and a tree ensemble. Split by future month and user. Evaluate every candidate in original minutes, inspect errors across activity levels, and keep an explicit zero-activity treatment. A log target may stabilize the center but must not hide severe underprediction in the high-demand tail.`,
      [
        check(
          'How should a linear coefficient be interpreted for observational prediction?',
          [
            'As a conditional association given modeled features, not automatic causation',
            'As the exact individual treatment effect for every observed row',
            'As the target standard deviation after the feature rises by one unit under the fitted model',
            'As proof that omitted variables are unrelated to the target'
          ],
          0,
          'Regression conditions on included variables and assumptions. Causal interpretation requires a causal design beyond fitting the equation.'
        ),
        check(
          'How does RMSE differ from MAE?',
          [
            'RMSE ignores residual sign while MAE keeps positive and negative errors',
            'RMSE gives relatively more weight to large absolute errors',
            'RMSE has squared target units while MAE has original units',
            'RMSE is always numerically smaller for the same predictions'
          ],
          1,
          'Squaring before averaging emphasizes large errors; taking the square root returns RMSE to target units.'
        ),
        check(
          'Why are features commonly standardized before ridge regression?',
          [
            'Standardization makes every feature normally distributed with identical tail behavior',
            'It guarantees all fitted coefficients become positive',
            'The coefficient penalty should act comparably across feature scales',
            'Ridge cannot mathematically accept an unscaled input matrix'
          ],
          2,
          'Without scaling, a unit-dependent coefficient magnitude receives a unit-dependent penalty unrelated to predictive importance.'
        ),
        check(
          'What does negative test-set R squared mean?',
          [
            'The model has discovered a strong inverse causal relationship',
            'Every residual is negative because predictions are too large',
            'The target contains negative values that regression cannot model under any transformation',
            'Predictions have more squared error than the test-set mean baseline'
          ],
          3,
          'R squared compares squared error with a constant mean predictor. On unseen data a poor model can be worse and therefore score below zero.'
        )
      ]
    ),
    lesson(
      'classification',
      'Classification, probabilities, thresholds, and calibration',
      `# Classification, probabilities, thresholds, and calibration

A classifier should usually produce a score or probability first; a threshold converts it into an action. The best threshold depends on capacity and the costs of false positives and false negatives, not on a universal 0.5.

For binary outcomes, the confusion matrix contains true positives, false positives, true negatives, and false negatives. From it:

- Precision = TP / (TP + FP): among selected cases, how many were positive?
- Recall = TP / (TP + FN): among positives, how many were selected?
- Specificity = TN / (TN + FP): among negatives, how many were rejected?
- False-positive rate = FP / (FP + TN).

Accuracy can be useless for imbalance: predicting "not fraud" on a 0.1% fraud population is 99.9% accurate and catches nothing.

## Logistic regression

Logistic regression models log odds as a linear function and maps it through the sigmoid to zero through one.

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import log_loss, roc_auc_score, average_precision_score

model = LogisticRegression(max_iter=1000, class_weight=None)
model.fit(X_train, y_train)
prob = model.predict_proba(X_valid)[:, 1]
print(log_loss(y_valid, prob))
print(roc_auc_score(y_valid, prob))
print(average_precision_score(y_valid, prob))
\`\`\`

An exponentiated coefficient is an odds ratio per unit, conditional on other features. Odds are \`p / (1-p)\`, not probability. An odds ratio of two does not mean probability doubles.

## Ranking metrics

ROC AUC is the probability a random positive receives a higher score than a random negative, ignoring ties in the usual way. It evaluates ranking over all thresholds and can look strong when false positives in a huge negative population are operationally unacceptable. Precision-recall curves focus on positive retrieval and depend on prevalence. Compare them against the deployment base rate.

Top-k precision or recall matches fixed review capacity. Lift at k compares the selected positive rate with overall prevalence.

## Probability quality

Log loss rewards probability assigned to the true outcome and heavily punishes confident mistakes. The Brier score is mean squared probability error. Calibration means that among predictions near 0.7, about 70% are positive. A model can rank perfectly yet be miscalibrated.

Estimate calibration on held-out data. Platt scaling fits a logistic map; isotonic regression fits a flexible monotonic map and needs more data. Calibration itself can drift when prevalence changes.

## Threshold as policy

Build an expected-cost table across thresholds, or select the top capacity each scoring period. Measure subgroup error rates and the consequences of unequal prevalence and measurement. Equalizing one fairness metric can make another unequal; policy requires explicit values and legal or domain review, not a library default.

Class weighting changes the training objective and often distorts raw probability interpretation. It may improve ranking for rare classes, but calibrate and evaluate under the real prevalence. Synthetic oversampling must occur inside training folds only.

## Guided practice

A review team can inspect 200 of 50,000 daily transactions. Fraud prevalence is 0.4%. Define useful metrics and a thresholding policy.

## Worked solution

Rank all eligible transactions and inspect the top 200, so daily capacity determines the threshold. Report precision at 200, recall at 200, fraud value recovered, false-positive customer cost, and score calibration. Compare with business rules under the same capacity. Use a future time split and prevent account or transaction-family leakage. ROC AUC is supplementary because it averages thresholds the team can never operate. Monitor daily score distribution and prevalence, since a fixed numeric threshold may overflow capacity during drift.`,
      [
        check(
          'What does precision measure?',
          [
            'The positive share among cases selected by the classifier',
            'The selected share among all actual positive cases',
            'The negative share among rejected classifier cases',
            'The probability ranking quality measured over every possible decision threshold'
          ],
          0,
          'Precision conditions on predicted or selected positives. Recall instead conditions on all actual positives.'
        ),
        check(
          'Why is 0.5 not a universal classification threshold?',
          [
            'Probabilities below 0.5 cannot be estimated from training data',
            'Optimal action depends on costs, capacity, and prevalence',
            'Every calibrated model outputs only the values zero and one',
            'ROC AUC becomes undefined when another threshold is used'
          ],
          1,
          'A probability becomes a decision only through consequences and constraints. Different operations can rationally act at different thresholds.'
        ),
        check(
          'A model ranks positives above negatives but predicts probabilities twice too high. It is...',
          [
            'well calibrated but unable to rank examples',
            'equivalent to a constant prevalence baseline under every possible threshold',
            'a strong ranker with poor probability calibration',
            'necessarily worse than random under ROC AUC'
          ],
          2,
          'Ranking and calibration are distinct. A monotonic score can order cases perfectly while its numeric probabilities are systematically wrong.'
        ),
        check(
          'Why can accuracy mislead on a rare positive class?',
          [
            'Accuracy excludes every correctly predicted negative case',
            'It applies only to models with more than two classes',
            'It is always calculated from predicted probabilities without a threshold or decision rule',
            'Predicting the majority class can score highly while finding no positives'
          ],
          3,
          'When negatives dominate, their correct predictions overwhelm the metric. Use measures tied to positive retrieval and decision cost.'
        )
      ]
    ),
    lesson(
      'trees-and-ensembles',
      'Decision trees, random forests, and gradient boosting',
      `# Decision trees, random forests, and gradient boosting

A decision tree recursively splits feature space into regions and predicts from training outcomes in each leaf. For regression it commonly reduces squared error; for classification it reduces impurity such as Gini or entropy.

Trees capture thresholds and interactions without scaling. They handle nonlinear structure, but a deep tree follows noise: each split searches many possibilities, leaves become small, and training error approaches zero while validation error rises.

Control complexity with maximum depth, minimum samples per leaf, minimum impurity reduction, and pruning. These are model choices selected using training validation, not the final test.

## Bagging and random forests

Bagging trains trees on bootstrap samples and averages them, reducing variance. Random forests also consider a random subset of features at each split, decorrelating trees so averaging helps more.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

forest = RandomForestClassifier(
    n_estimators=500,
    min_samples_leaf=20,
    max_features="sqrt",
    n_jobs=-1,
    random_state=7
)
forest.fit(X_train, y_train)
\`\`\`

More trees reduce Monte Carlo instability but do not fix biased features or an overly flexible leaf structure. Out-of-bag predictions use trees where a row was absent from the bootstrap sample, offering internal validation under exchangeable sampling; they do not replace temporal or group holdouts.

## Gradient boosting

Boosting adds weak trees sequentially, each reducing the current loss. Learning rate controls each tree contribution; number and depth of trees control capacity. Small learning rates often need more trees. Early stopping chooses the useful number from a validation set.

Modern histogram boosting bins numeric values for speed and can handle large tables efficiently. Libraries differ in categorical handling, missing routing, regularization, and defaults. Understand the learned function rather than treating package choice as the skill.

## Avoid misleading importance

Impurity-based feature importance sums split improvements and tends to favor continuous or high-cardinality features with many split opportunities. Correlated features share or steal importance unpredictably. Permutation importance measures performance drop when a validation feature is shuffled, but correlated substitutes can hide each other and permutation may create impossible rows.

Use held-out permutation, partial dependence, accumulated local effects, and case-level explanations as complementary diagnostics. None turns association into causality.

## Operational behavior

Trees do not extrapolate smooth numeric trends beyond learned regions. An unseen category needs an encoding or library policy. Large ensembles consume memory and latency. Measure batch throughput, single-row latency, serialization compatibility, and determinism under thread settings.

Monotonic constraints can encode that, all else equal, risk should not fall when a risk measure rises. They reduce implausible behavior but cannot correct a wrongly measured feature.

## Guided practice

A boosted tree beats logistic regression by 1% average precision but uses a feature with 20,000 categories and shows a large impurity importance. Decide how to validate the gain and the feature.

## Worked solution

Reevaluate on a future untouched period with the real top-capacity metric and uncertainty, including latency and calibration. Compare against a tuned regularized logistic pipeline, not a weak default. Audit how the high-cardinality feature is encoded and whether it identifies entities or contains future state. Calculate held-out permutation importance, ablate the feature, inspect unseen-category behavior, and test group leakage. If the small gain vanishes or relies on memorization, keep the simpler model.`,
      [
        check(
          'What is a principal weakness of one deep decision tree?',
          [
            'It can fit noisy training partitions with high variance',
            'It can represent only a strictly linear decision boundary',
            'It requires every numeric input to have mean zero',
            'It cannot express interactions between two input features'
          ],
          0,
          'A deep tree searches many splits and can create tiny leaves tailored to training noise, producing unstable out-of-sample predictions.'
        ),
        check(
          'How does a random forest improve on ordinary bagged trees?',
          [
            'It trains every tree on the complete data without replacement',
            'It randomizes candidate features at splits to reduce tree correlation',
            'It forces all trees to share the same complete sequence of split features and thresholds',
            'It adds trees sequentially to correct the prior tree residuals'
          ],
          1,
          'Feature subsampling makes individual trees differ beyond bootstrap rows. Less correlated errors average away more effectively.'
        ),
        check(
          'Why can impurity-based feature importance favor high-cardinality inputs?',
          [
            'Such features are always causal drivers of the target',
            'They necessarily contain fewer missing values than other inputs',
            'More possible split points create more chances for apparent improvement',
            'Importance is calculated only from feature storage size in bytes and compression ratio'
          ],
          2,
          'Searching many candidate splits increases the opportunity to find sample-specific impurity reduction, even when generalization value is weak.'
        ),
        check(
          'What is the role of learning rate in gradient boosting?',
          [
            'It sets the fraction of training rows permanently discarded',
            'It fixes the number of features each tree may examine',
            'It determines the probability threshold used for classification',
            'It scales each added tree contribution to the ensemble'
          ],
          3,
          'Shrinkage controls how aggressively each sequential learner updates the function. Smaller rates commonly require more boosting rounds.'
        )
      ]
    ),
    lesson(
      'model-selection',
      'Cross-validation, tuning, and trustworthy model selection',
      `# Cross-validation, tuning, and trustworthy model selection

Model selection estimates which development choice will generalize. Cross-validation repeatedly partitions training data into fit and validation folds, giving every row an out-of-fold prediction. It is not permission to ignore time, groups, or dependence.

Use ordinary K-fold only for approximately exchangeable independent units. Stratification stabilizes class proportions. Group K-fold keeps entities or sites intact. Time-series splits train on the past and validate on later blocks, often with a gap when feature windows could overlap labels.

\`\`\`python
from sklearn.model_selection import GroupKFold, cross_validate

cv = GroupKFold(n_splits=5)
scores = cross_validate(
    model,
    X,
    y,
    groups=user_id,
    cv=cv,
    scoring=["neg_log_loss", "average_precision"],
    return_estimator=False
)
\`\`\`

All learned preprocessing must live inside \`model\`. Otherwise each validation fold has already influenced the transformations.

## Hyperparameter search

Grid search exhausts a small declared grid. Random search samples combinations and is more efficient when only a few dimensions matter. Bayesian optimization uses past trials to choose promising settings. Successive halving spends small resources on many candidates and more on survivors.

The search budget is part of comparison. Giving one model 1,000 trials and another default settings measures effort as much as algorithm quality. Define plausible ranges on meaningful scales, such as log-uniform regularization, and record every trial.

## Nested evaluation

Choosing the best cross-validation result introduces optimism because many noisy estimates competed. Nested cross-validation uses an inner loop for tuning and an outer loop for evaluation. It is useful for small datasets requiring an honest development estimate. With temporal products, a final future holdout often communicates deployment behavior more directly.

## Compare uncertainty, not decimal places

Fold scores are dependent because their training sets overlap. Their standard deviation describes variation across folds, not a perfect confidence interval. Compare out-of-fold predictions at the independent unit, use paired bootstrap where appropriate, and ask whether the difference matters operationally.

Select using a primary metric and constraints. Looking at twelve metrics and choosing whichever favors a candidate is multiple testing. Use secondary metrics for diagnosis and guardrails.

## Thresholds and calibration need data too

If hyperparameters, probability calibration, and threshold are all chosen on the same validation outcomes, performance is increasingly tailored to them. Use nested or staged out-of-fold predictions: fit models within folds, collect predictions, choose a policy, then estimate once on a later untouched set.

## Refit and freeze

After choices are fixed, refit the complete development period with the selected pipeline, store the exact feature contract and dependency versions, and evaluate once on test. A surprisingly bad test result is information, not a reason to reopen tuning on the test set. Investigate mismatch, revise the development process, and acquire a new future test period if another unbiased estimate is needed.

## Guided practice

You have two years of monthly user examples, with many rows per user. Design selection for a model deployed in month 25.

## Worked solution

Reserve months 22-24 as the final test period. Within months 1-21, use several expanding-window folds: train early months, leave a gap at least as long as feature-label overlap risk, validate on a later block, and keep each prediction row feature cutoff correct. Users may appear over time because deployment scores returning users, but no feature calculation may cross the cutoff; for a new-user deployment claim, also hold users out by group. Tune full preprocessing pipelines, collect out-of-fold predictions for threshold and calibration decisions, refit through month 21, and open months 22-24 once.`,
      [
        check(
          'What is required when cross-validating repeated rows from one independent entity?',
          [
            'Keep the entity rows together whenever deployment requires entity generalization',
            'Place at least one row from every entity into every training and validation fold for comparison',
            'Randomize individual columns independently before forming folds',
            'Use leave-one-feature-out validation rather than row partitions'
          ],
          0,
          'Group-aware splitting prevents identity information and correlated observations from leaking across train and validation boundaries.'
        ),
        check(
          'Why can the best result among many tuning trials be optimistic?',
          [
            'Cross-validation never evaluates a model on unseen rows',
            'Selection favors candidates that benefited from evaluation noise',
            'Hyperparameters cannot affect the fitted prediction function',
            'Every trial is trained on exactly the final test set labels before validation begins'
          ],
          1,
          'When many noisy estimates compete, the maximum tends to include favorable noise. Nested or future evaluation estimates the selected procedure.'
        ),
        check(
          'What does nested cross-validation place in its inner loop?',
          [
            'The final production monitoring and alert thresholds',
            'Only data ingestion without any model fitting',
            'Model and hyperparameter selection for each outer training split',
            'The permanent test set used repeatedly by every candidate during model selection'
          ],
          2,
          'The inner loop chooses the candidate; the outer held-out fold evaluates that choice as a procedure, reducing selection optimism.'
        ),
        check(
          'After one final test is unexpectedly weak, what is the disciplined response?',
          [
            'Tune repeatedly on that test until the target metric is reached',
            'Delete test rows where the model made its largest errors',
            'Report the cross-validation estimate as if the test did not exist or contain useful evidence',
            'Investigate mismatch, revise development, and seek a new future test'
          ],
          3,
          'Once used for decisions, the test is no longer untouched. Its weak result should inform a revised process, not be optimized away.'
        )
      ]
    ),
    lesson(
      'unsupervised-learning',
      'Clustering, dimensionality reduction, and anomaly detection',
      `# Clustering, dimensionality reduction, and anomaly detection

Unsupervised learning finds structure without a labeled target. Its outputs are descriptions produced by assumptions, not discovered natural truth. A clustering always partitions according to its representation, distance, algorithm, and hyperparameters.

## Representation and distance come first

Euclidean distance is dominated by large-scale features, so standardize comparable continuous inputs. One-hot categorical columns alter geometry as vocabulary grows. Cosine distance compares direction and is common for text embeddings. Manhattan distance can be more robust in some high-dimensional sparse settings. A user representation based on total minutes answers a different question from proportions across genres.

## K-means

K-means alternates assigning rows to their nearest centroid and recomputing centroids, minimizing within-cluster squared Euclidean distance. It works best for roughly compact, similarly scaled, convex groups and is sensitive to initialization and outliers.

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

clusterer = make_pipeline(
    StandardScaler(),
    KMeans(n_clusters=5, n_init=20, random_state=7)
)
labels = clusterer.fit_predict(features)
\`\`\`

K is a modeling choice. Elbow plots and silhouette score summarize compactness and separation but do not prove usefulness. Check stability across resamples and seeds, cluster sizes, understandable profiles, and whether an independent decision improves.

Hierarchical clustering creates a merge tree and supports exploration at several cut levels. Density methods such as DBSCAN can discover irregular dense regions and label sparse points as noise, but distance becomes less informative in high dimensions and one global density threshold may fail.

## Principal component analysis

PCA finds orthogonal directions of maximum variance in centered numeric data. The first component captures the most variance, the next the most remaining variance subject to orthogonality. Components are linear combinations, and sign is arbitrary.

\`\`\`python
from sklearn.decomposition import PCA

pca = make_pipeline(StandardScaler(), PCA(n_components=0.90))
compressed = pca.fit_transform(X_train)
\`\`\`

PCA may compress correlated variables and help visualization, but high variance is not the same as predictive or meaningful signal. Fit it on training data. Nonlinear visualization methods such as t-SNE and UMAP are useful exploratory maps whose global distances and visible islands can be artifacts; do not treat a two-dimensional picture as proof of population clusters.

## Anomaly detection

An anomaly is unusual relative to a reference, not necessarily wrong or harmful. Statistical rules, isolation forests, one-class models, reconstruction error, and density scores each define unusual differently. Rare subpopulations can be legitimate; fraud can mimic ordinary behavior.

Evaluate using reviewed labels when possible, precision at review capacity, alert stability, time-to-detection, and false-positive burden. Fit only on a defensible reference period and monitor drift. Never delete anomalies from an analysis before understanding whether they are the outcome of interest.

## Guided practice

Create user segments from monthly activity for campaign design. Explain feature choice, validation, and what you will not claim.

## Worked solution

Use pre-campaign features such as active days, completion proportion, genre shares, and median session duration, transforming heavy tails and standardizing continuous measures. Compare stable K-means and hierarchical solutions across resampled users and months, profile clusters on held-out behaviors not used to construct them, and reject tiny unstable solutions. Run a randomized campaign policy test before claiming value. Call them operational segments defined by the current representation, not inherent personality types.`,
      [
        check(
          'What objective does standard K-means optimize?',
          [
            'Within-cluster squared Euclidean distance to centroids',
            'The number of labeled outcomes classified correctly',
            'Maximum pairwise distance between every two centroids',
            'A causal effect difference across assigned user groups'
          ],
          0,
          'K-means partitions rows to minimize squared distance from each row to its assigned arithmetic-mean centroid.'
        ),
        check(
          'Why standardize features before Euclidean clustering?',
          [
            'It forces the data to contain exactly spherical true groups',
            'Different numeric scales otherwise dominate distance unequally',
            'It makes categorical identifiers safe continuous measurements with meaningful distances',
            'The algorithm cannot accept values outside zero through one'
          ],
          1,
          'A feature measured in thousands contributes far more squared distance than one measured in tenths unless scale reflects intended importance.'
        ),
        check(
          'What does PCA first component maximize?',
          [
            'The classification accuracy against a hidden target label',
            'The number of original features with zero missing values',
            'Variance of projected centered observations along one direction',
            'The causal contribution of the most important measured feature to every observed outcome'
          ],
          2,
          'PCA is an unsupervised linear variance decomposition. It knows no target and makes no causal claim.'
        ),
        check(
          'Why should an anomaly not be automatically deleted?',
          [
            'Anomaly scores are always calculated from ground-truth fraud labels',
            'Every rare observation must be a correct measurement by definition',
            'Deleting it necessarily raises variance in every estimator',
            'It may be legitimate signal, a rare group, or the event of interest'
          ],
          3,
          'Unusual means unlike the reference under one scoring rule. Domain investigation determines whether it is error, novelty, or valuable signal.'
        )
      ]
    ),
    lesson(
      'time-series',
      'Time series, forecasting, and backtesting',
      `# Time series, forecasting, and backtesting

A time series has ordered dependence. Randomly shuffling its rows lets models learn from the future and destroys the question forecasting asks.

Define frequency, forecast origin, horizon, update schedule, and availability. A daily forecast for the next 14 days is 14 related tasks, not one generic "future" label. Inputs published two days late cannot be used at a same-day origin without modeling that delay.

## Components and stationarity

Series often contain trend, seasonality, calendar effects, interventions, and noise. Stationarity roughly means the joint behavior does not change with absolute time; many classical models assume a stable mean, variance, and autocovariance after transformations. Differencing can remove a stochastic trend; seasonal differencing compares with the same prior season. Excess differencing adds noise.

Plot the series, seasonal views, autocorrelation, and residuals. ACF spikes do not prove a causal lag; shared trend and seasonality create correlation.

## Baselines

Always evaluate naive forecasts:

- last observation;
- same weekday or season last cycle;
- rolling mean using only past values;
- drift from first to last observation.

For seasonal product data, same weekday last week is often hard to beat.

\`\`\`python
series = daily.sort_index()
seasonal_naive = series.shift(7)
mae = (series - seasonal_naive).abs().loc[test_start:].mean()
\`\`\`

## Features and models

Autoregressive models use past target values. Exogenous regressors use known or separately forecast inputs. Tree models can learn from lag, rolling, calendar, and event features. Every rolling calculation must be shifted so the current or future target is absent.

\`\`\`python
frame["lag_1"] = frame["y"].shift(1)
frame["lag_7"] = frame["y"].shift(7)
frame["mean_28"] = frame["y"].shift(1).rolling(28).mean()
\`\`\`

Future promotions may be known, but future weather is not; using observed future weather in backtests exaggerates deployable accuracy unless the production input is a weather forecast.

## Rolling-origin evaluation

Backtesting trains through an origin and evaluates the following horizon, then advances the origin. Match how often production retrains. Include gaps when labels or features arrive late. Report error by horizon, season, and important regime, not only one average.

MAE is robust and interpretable. RMSE emphasizes large failures. MAPE explodes near zero and is undefined at zero. Weighted absolute percentage error aggregates absolute error over aggregate actual magnitude but lets high-volume items dominate. For probabilistic forecasts, evaluate quantile loss and interval coverage plus width.

## Hierarchies and intermittent demand

Item forecasts should often add up to category and total forecasts. Forecasting every level independently breaks coherence; reconciliation adjusts them. Sparse intermittent demand needs occurrence and size reasoning, not smooth percentage metrics.

## Guided practice

Forecast daily playback starts for four weeks to plan capacity. Traffic has weekday seasonality, releases, and occasional outages. Design a backtest and feature set.

## Worked solution

Build daily UTC totals and preserve outage flags rather than silently imputing normal volume. Compare last-day, same-weekday, and four-week weekday-average baselines. Use rolling origins across several months, forecasting all 28 horizons at each origin and retraining at the planned production cadence. Features include shifted lags, shifted rolling summaries, known release calendar, holidays, and platform mix available at origin. Report MAE and high-quantile underforecast by horizon; produce prediction intervals because capacity needs tail risk. Evaluate ordinary days, releases, and incidents separately.`,
      [
        check(
          'Why is a random train-test split invalid for ordinary forecasting?',
          [
            'Training can use later observations to predict earlier held-out rows',
            'Time-series targets must always be categorical rather than numeric in every forecast horizon',
            'Random splitting creates too few columns for autoregressive models',
            'Forecast metrics cannot be calculated on non-contiguous indexes'
          ],
          0,
          'Forecast deployment moves from past to future. Random rows allow future regimes and nearby target information into training.'
        ),
        check(
          'Why is y.rolling(28).mean() unsafe as a same-row feature?',
          [
            'Rolling windows require at least 28 separate target columns',
            'It includes the current target unless shifted to past values',
            'A mean cannot be used by any nonlinear forecasting model',
            'It permanently removes weekly seasonality from the source'
          ],
          1,
          'Pandas rolling includes the current row by default. Shift first so the feature contains only values known before the forecast origin.'
        ),
        check(
          'What does rolling-origin backtesting simulate?',
          [
            'One random split repeated with different pseudo-random seeds',
            'A clustering model fitted separately to every future outcome',
            'Repeated historical forecast origins followed by their future horizons',
            'A model trained once on all dates including the evaluation period'
          ],
          2,
          'Each origin recreates the information boundary and future horizon a production forecast would face at that historical time.'
        ),
        check(
          'Why can MAPE be a poor metric for sparse demand?',
          [
            'It measures errors in the original units rather than percentages',
            'It assigns no penalty to very large forecast errors',
            'It can be calculated only for normally distributed targets',
            'Division by zero or near-zero actuals makes it undefined or explosive'
          ],
          3,
          'Percentage error is unstable when the actual denominator is zero or tiny, which is common for intermittent series.'
        )
      ]
    ),
    lesson(
      'neural-networks',
      'Neural-network foundations and responsible deep learning',
      `# Neural-network foundations and responsible deep learning

A neural network composes affine transformations and nonlinear activation functions. A dense layer calculates \`z = XW + b\`; an activation such as ReLU applies \`max(0, z)\`. Stacking layers can represent complex functions, but representation capacity does not guarantee generalization.

Training performs a forward pass, calculates a loss, uses backpropagation to obtain gradients through the chain rule, and updates parameters with an optimizer such as stochastic gradient descent or Adam.

\`\`\`python
import torch
from torch import nn

model = nn.Sequential(
    nn.Linear(feature_count, 64),
    nn.ReLU(),
    nn.Dropout(0.2),
    nn.Linear(64, 1)
)
loss_fn = nn.BCEWithLogitsLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
\`\`\`

\`BCEWithLogitsLoss\` combines the sigmoid-compatible binary loss with raw logits for numerical stability. During evaluation, call \`model.eval()\` so dropout and batch-normalization behavior changes appropriately, and disable gradients.

## Batches, epochs, and optimization

A batch estimates the full-data gradient. One epoch processes the training set once. Learning rate too high diverges; too low wastes time or stalls. Batch size affects memory, noise, and optimization. Monitor training and validation loss by step or epoch. Stop based on validation behavior and restore the best checkpoint, not simply the final epoch.

Gradients can vanish or explode through deep computation. ReLU-family activations, careful initialization, normalization, residual connections, and gradient clipping address different mechanisms. A residual block learns a change around an identity path, making deep optimization easier.

## Architecture follows structure

Convolutions share local pattern detectors across spatial positions. Recurrent networks carry sequential state. Transformers use attention to mix information across positions and now dominate many sequence tasks. An attention head forms query, key, and value projections; similarity between queries and keys determines weighted value combinations. Positional information is necessary because bare self-attention is permutation-equivariant.

For ordinary tabular data, gradient-boosted trees are often a stronger and cheaper baseline than deep networks. Deep learning earns its cost with large datasets, unstructured inputs, learned representations, transfer learning, or architectures matching the problem.

## Regularization and data

Weight decay, dropout, augmentation, early stopping, and smaller architectures can reduce overfitting. Data leakage and duplicate contamination remain more dangerous than insufficient regularization. Near-identical images, text fragments, or users must not cross evaluation boundaries.

Transfer learning starts with a model pretrained on a broad task, freezes or lightly tunes it, then gradually unfreezes when enough task data exists. Use a lower learning rate, preserve an untouched evaluation set, and confirm license, privacy, and training-data constraints.

## Reproducibility and hardware

Record code, data, model weights, optimizer state, seed, and library or accelerator versions. Some parallel GPU kernels are nondeterministic; deterministic settings may cost speed and still not bridge every platform. Repeat important results across seeds and report variation.

## Guided practice

A team wants a neural network for a 50,000-row churn table because it is "more advanced." Decide the evidence needed before adopting it.

## Worked solution

Establish a prevalence and business-rule baseline, regularized logistic regression, and tuned gradient boosting under point-in-time group-aware evaluation. The neural model must use the same preprocessing boundary and search budget. Compare decision metric, calibration, uncertainty, training cost, inference latency, memory, explanation needs, and stability across seeds. If it does not produce a material reproducible gain, choose the simpler system. Advanced means the smallest reliable method that meets the decision, not the largest architecture.`,
      [
        check(
          'What does backpropagation compute?',
          [
            'Loss gradients for parameters by applying the chain rule',
            'A random partition of examples into training and validation sets',
            'The final probability threshold from operational capacity',
            'A causal graph connecting treatment to observed outcome'
          ],
          0,
          'Backpropagation efficiently propagates derivatives from loss through composed operations so an optimizer can update parameters.'
        ),
        check(
          'Why should evaluation call model.eval() in a typical deep-learning library?',
          [
            'It retrains the network on validation labels before scoring',
            'It switches modules such as dropout to inference behavior',
            'It converts every model parameter into a fixed integer',
            'It guarantees identical predictions across all hardware'
          ],
          1,
          'Training-only stochastic or state-updating layers behave differently during inference. Evaluation mode applies their inference semantics.'
        ),
        check(
          'What does a transformer attention mechanism principally combine?',
          [
            'Only adjacent values through one fixed convolutional filter',
            'Class labels selected by a decision threshold',
            'Value vectors weighted by query-key compatibility',
            'Database rows ordered by their physical storage address'
          ],
          2,
          'Attention scores compatibility between queries and keys, then uses normalized scores to mix corresponding values.'
        ),
        check(
          'When is deep learning most clearly justified over strong tabular baselines?',
          [
            'Whenever the dataset has at least two numeric columns',
            'When stakeholders request an algorithm with more parameters',
            'When a random split reports higher training-set accuracy',
            'When data scale or structure yields a material validated operational gain'
          ],
          3,
          'Model complexity must earn itself under realistic evaluation, including accuracy, reliability, latency, cost, and maintenance.'
        )
      ]
    ),
    lesson(
      'nlp-and-embeddings',
      'Text, embeddings, retrieval, and language-model systems',
      `# Text, embeddings, retrieval, and language-model systems

Text modeling begins with a task: classification, extraction, search, clustering, generation, or question answering. The same document can require different representations for each.

## Sparse text representations

Tokenization splits text into units. Word tokens are interpretable but struggle with spelling and unseen words. Character n-grams handle variants. Subword tokenizers learn reusable pieces and are common in neural language models.

Bag-of-words counts tokens and ignores order. TF-IDF downweights terms common across documents and often gives a strong, fast classification or retrieval baseline.

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

model = make_pipeline(
    TfidfVectorizer(ngram_range=(1, 2), min_df=3, max_features=100_000),
    LogisticRegression(max_iter=1000)
)
model.fit(train_text, train_label)
\`\`\`

Split duplicate templates and authors carefully; random rows can reward memorizing boilerplate.

## Embeddings and similarity

An embedding maps an item to a dense vector learned so geometric relationships support a training objective. Cosine similarity compares direction:

\`cos(a, b) = dot(a, b) / (norm(a) * norm(b))\`.

Embedding similarity is not human truth. It reflects training data, objective, truncation, language coverage, and model version. Normalize vectors when an index assumes cosine via inner product.

Exact nearest-neighbor search compares every vector. Approximate indexes trade a controlled amount of recall for speed and memory. Evaluate retrieval with labeled relevance: recall at k, mean reciprocal rank, normalized discounted cumulative gain, latency, and difficult slices.

## Retrieval-augmented generation

A retrieval system for question answering commonly:

1. parses and versions source documents;
2. chunks them with identifiers and access metadata;
3. embeds and indexes chunks;
4. retrieves candidates for a query;
5. reranks candidates with a stronger model;
6. supplies selected context to a generator;
7. returns citations tied to source versions;
8. logs quality, latency, cost, and access decisions.

Chunk size trades local specificity against context. Overlap can preserve boundary meaning but creates near-duplicates. Retrieval failure and generation failure must be measured separately. A language model can answer fluently from irrelevant context.

## Language-model behavior

Autoregressive models estimate the next token given previous tokens. Temperature rescales logits before sampling: lower values concentrate probability, higher values diversify. Greedy decoding is deterministic under stable computation but not necessarily accurate. Context windows bound input tokens; they are not guaranteed working memory, and information position affects use.

Fine-tuning changes model behavior or task specialization. Retrieval supplies changeable knowledge without placing it in weights. Prompting, retrieval, tools, constrained output schemas, and fine-tuning solve different failure modes.

## Safety and evaluation

Treat generated text as untrusted. Enforce authorization before retrieval, not after generation. Defend tool calls with schemas, allowlists, least privilege, confirmation for material actions, and output validation. Retrieved documents can contain prompt injection; content is data, not authority.

Build a versioned evaluation set containing ordinary, ambiguous, adversarial, multilingual, access-controlled, and unanswerable cases. Measure answer correctness, citation support, retrieval recall, refusal appropriateness, latency, and cost. Human review needs a rubric and agreement checks.

## Guided practice

Design offline search over a private technical manual collection, with cited answers and no external service at query time.

## Worked solution

Parse local versioned documents into access-labeled chunks, store text and stable source locations, create embeddings locally, and build an approximate index plus keyword fallback. At query time authorize the user scope first, retrieve and rerank candidates, and either compose a cited answer from provided passages or say evidence is insufficient. Keep the original documents available for citation. Evaluate retrieval recall and answer support separately on a manually labeled set, include prompt-injection documents, and pin every parser, embedding model, index, and generator version for reproducible rebuilds.`,
      [
        check(
          'What is a strong baseline for many moderate-size text classification tasks?',
          [
            'TF-IDF features with a regularized linear classifier',
            'Random integer ids assigned independently to each document',
            'A generated summary used as both input and target label',
            'Exact string equality against one positive training example'
          ],
          0,
          'Sparse n-gram features plus a linear model are fast, interpretable, and surprisingly competitive, making them an essential baseline.'
        ),
        check(
          'What does approximate nearest-neighbor search trade?',
          [
            'It guarantees exact recall by using unlimited memory',
            'Some retrieval recall for lower latency or resource use',
            'It replaces vector similarity with causal inference',
            'All stored vectors for one generated category label'
          ],
          1,
          'Approximate indexes avoid exhaustive comparison. Their speed-quality-memory tradeoff must be measured on the actual retrieval distribution.'
        ),
        check(
          'Why measure retrieval and generation separately in a cited QA system?',
          [
            'The generator always retrieves a separate hidden document set',
            'Retrieval metrics can be calculated only after public deployment',
            'Missing evidence and misuse of present evidence are distinct failures',
            'A correct answer guarantees every supporting chunk was retrieved'
          ],
          2,
          'The system cannot use absent evidence, while a generator can still fail despite good evidence. Separate metrics make remediation possible.'
        ),
        check(
          'Where should document access control be enforced?',
          [
            'Only after the generated answer is displayed to the requester',
            'Inside a prompt asking the model not to reveal private passages',
            'During nightly evaluation but not during live retrieval',
            'Before retrieval supplies any unauthorized content to the model'
          ],
          3,
          'Authorization must constrain the data path. A prompt is not a security boundary once secret content has entered model context.'
        )
      ]
    ),
    lesson(
      'interpretability-and-fairness',
      'Interpretability, fairness, and model risk',
      `# Interpretability, fairness, and model risk

Interpretability answers a specific audience question. A developer may ask whether a model uses leakage; an operator needs a reason code and recourse; a regulator needs evidence about process and impact; a scientist may need a conditional relationship. No single importance chart satisfies all of them.

## Global and local explanations

Linear coefficients describe the fitted equation after preprocessing. Tree impurity importance is biased toward features with many split opportunities. Held-out permutation importance measures performance loss when a feature association is broken. Partial dependence averages predictions while varying a feature, potentially creating unrealistic combinations. Accumulated local effects reduce some extrapolation by using local differences. SHAP-style values allocate a prediction difference under a chosen background and feature-dependence assumption.

Every explanation describes the model, not necessarily reality or causality. Correlated features make attribution non-unique: the model may exchange one proxy for another while predictions barely change.

## Counterfactuals and recourse

A counterfactual asks what input change would alter a prediction under the model. Actionable recourse adds feasibility, cost, stability, and causality. Telling a person to change age or an outcome proxy is not recourse. Even changing an actionable variable may not cause the modeled effect if the feature is only correlated.

## Fairness begins before modeling

Ask who is in the population, who receives labels, whose outcomes are measured accurately, and who bears errors. Historical labels may encode unequal access or enforcement. Removing a protected attribute does not remove proxies and can prevent measuring harm.

Useful group metrics include selection rate, true-positive rate, false-positive rate, positive predictive value, calibration, and outcome utility. With different base rates and imperfect prediction, several fairness criteria cannot generally be equal at once. Choose metrics from the decision context and legal obligations rather than optimizing every gap blindly.

Report uncertainty, sample counts, and intersections. An apparent small gap in a tiny group may be highly uncertain; a stable aggregate can hide severe intersectional harm.

## Stress and sensitivity tests

- Retrain across seeds and time windows.
- Remove suspicious proxies and compare both performance and harm.
- Perturb measurement within plausible error.
- Test missing and unseen categories.
- Evaluate worst groups and high-consequence cases.
- Simulate threshold and capacity changes.
- Review examples near the decision boundary.

Document intended use, prohibited use, training population, data limitations, metric definitions, validation, approval owner, monitoring, and rollback. A model card is evidence, not immunity.

## Human oversight

"Human in the loop" helps only when reviewers have information, time, authority, and an appeal path. Automation bias can make a nominal reviewer rubber-stamp scores. Measure override rates, disagreement, reviewer outcomes, and whether explanations improve decisions rather than merely confidence.

## Guided practice

A churn model sends discounts to high-risk users. One region has lower recall and higher false-positive rate. Design an investigation and mitigation process.

## Worked solution

Verify label completeness, prediction-time feature availability, sample size, and confidence intervals by region and relevant intersections. Compare score distributions, calibration, acquisition channels, product availability, and missingness. Audit whether training underrepresents the region or a feature is a regional proxy. Simulate thresholds and capacity with business and fairness costs, consider region-specific calibration only if operationally and legally justified, and test any policy prospectively. Record who receives no offer, who pays for errors, appeal or support routes, owners, monitoring limits, and rollback. Do not force equal metrics before understanding measurement and consequences.`,
      [
        check(
          'What does a feature explanation primarily describe?',
          [
            'How the fitted model behaves under the explanation assumptions',
            'The true causal mechanism producing every real-world outcome',
            'A guarantee that removing the feature removes all related proxies',
            'The legal acceptability of the decision in every jurisdiction'
          ],
          0,
          'Attribution methods inspect model behavior under choices about background and dependence. Causal and legal conclusions require separate evidence.'
        ),
        check(
          'Why can removing a protected attribute be insufficient?',
          [
            'Models require a protected field to calculate any prediction',
            'Other variables can proxy it, while removal also hides impact measurement',
            'Protected attributes are always the strongest legitimate predictors',
            'Group fairness metrics can be measured only during training'
          ],
          1,
          'Geography, behavior, and access patterns may encode group membership. Keeping protected data in a governed audit path can be necessary to detect harm.'
        ),
        check(
          'What makes a counterfactual recommendation actionable recourse?',
          [
            'It changes the largest model coefficient regardless of feasibility',
            'It always recommends changing a protected personal characteristic',
            'The change is feasible, stable, and credibly connected to the outcome',
            'It raises the model score even if the real decision is unaffected'
          ],
          2,
          'Recourse must be something a person can reasonably do and that has a defensible path to changing the decision or outcome.'
        ),
        check(
          'When does human review fail as a safeguard?',
          [
            'Reviewers receive documented uncertainty and source evidence',
            'Overrides and appeal outcomes are monitored over time',
            'Reviewers can delay or reverse the automated recommendation',
            'Reviewers lack time or authority and merely confirm model output'
          ],
          3,
          'A nominal checkpoint without capacity, information, or power does not provide meaningful oversight and may amplify automation bias.'
        )
      ]
    ),
    lesson(
      'production-ml',
      'Production ML: serving, monitoring, and lifecycle control',
      `# Production ML: serving, monitoring, and lifecycle control

A production model is a versioned decision system, not a serialized estimator. It includes feature definitions, transformation code, artifacts, runtime, policy, monitoring, ownership, and rollback.

## Batch and online serving

Batch scoring computes many predictions on a schedule and writes a versioned table. It is simple, cheap, replayable, and appropriate when actions tolerate delay. Online serving computes per request and requires strict latency, availability, and feature freshness. Streaming scoring reacts to events but inherits event-time, ordering, and state complexity.

Choose the least complex mode meeting the decision deadline. A weekly outreach list does not need a sub-50-millisecond service.

## Train-serve consistency

Feature definitions must match offline training and online serving. Share transformation code where practical, but also compare outputs on golden records. Feature stores can manage definitions and point-in-time joins; they do not automatically prevent semantic mistakes.

Package an immutable model bundle containing:

- model and preprocessing artifacts;
- feature names, types, defaults, and cutoff semantics;
- training data and code references;
- dependency and runtime versions;
- validation report and approval;
- intended policy, thresholds, and expiry or review date.

Never load an untrusted pickle-like artifact: deserialization can execute code. Sign or checksum trusted artifacts and restrict their source.

## Deployment strategies

Shadow deployment calculates predictions without affecting users, testing integration and distributions. Canary sends a small traffic share to the new version. A/B testing randomizes policy impact. Blue-green keeps two complete environments for fast switching. Champion-challenger compares candidates under controlled routing.

Separate model rollout from policy rollout when possible. A new score can run in shadow while the old decision remains active.

## Monitor four layers

1. **Service:** latency, throughput, errors, saturation, availability.
2. **Inputs:** schema, missingness, unknown categories, ranges, freshness, drift.
3. **Predictions:** score distribution, action rate, calibration when labels mature.
4. **Outcomes:** decision utility, harm, subgroup performance, delayed labels.

Covariate drift changes \`P(X)\`; label shift changes \`P(y)\`; concept drift changes the relationship \`P(y given X)\`. A distribution alert does not identify which occurred or prove retraining helps. Diagnose upstream incidents and policy changes first.

## Feedback loops

A fraud model changes which transactions are investigated, so labels become selective. A recommender changes exposure, so clicks describe the prior policy. Log assignment, eligibility, scores, actions, and outcomes. Preserve randomized exploration where safe to retain information about alternatives.

## Retraining and rollback

Retraining should be a tested pipeline with explicit data windows, validation gates, approval, and artifact registration. Do not retrain automatically merely because drift crossed one threshold. A broken upstream value can make a new model learn an incident.

Rollback must include compatible model, feature, and policy versions. Practice it. Keep a safe baseline such as rules or last-known-good batch scores when features or serving fail.

## Guided practice

Design production operation for the weekly churn ranking from the framing lesson.

## Worked solution

Run a weekly batch after source freshness checks. Build point-in-time features, validate schema and quality, load an approved immutable pipeline, score eligible users, and write a table keyed by user, score week, model version, probability, rank, and policy reason. Select the top capacity under guardrails and log eligibility plus action. Monitor task success, feature nulls, score and selection distributions, regional slices, and eventual calibration and treatment outcomes. Keep the previous valid list and rule baseline for failure. Retraining is a separate scheduled candidate job with temporal validation, comparison gates, review, registry promotion, canary or shadow scoring, and one-command rollback.`,
      [
        check(
          'When is batch inference preferable to an online service?',
          [
            'The decision tolerates scheduled latency and values replayability',
            'Every prediction must respond inside one interactive request',
            'Features exist only in volatile memory for a few milliseconds',
            'The action depends on each event before the event is committed'
          ],
          0,
          'Batch is operationally simpler and easier to reproduce. It should be the default when the decision deadline does not demand online scoring.'
        ),
        check(
          'What is shadow deployment?',
          [
            'Deleting production logs so a model version remains hidden',
            'Running predictions without allowing them to affect decisions',
            'Training the model only on users outside the target population',
            'Serving the new model to all traffic without monitoring outcomes'
          ],
          1,
          'Shadowing tests real integration, latency, and distributions while the existing policy continues to control user-facing actions.'
        ),
        check(
          'Why does an input drift alert not automatically justify retraining?',
          [
            'Drift metrics can be calculated only when outcome labels are absent',
            'Every input distribution must remain exactly constant forever',
            'The cause may be harmless change or an upstream defect, not concept drift',
            'Retraining cannot use any records newer than the original model'
          ],
          2,
          'A shift in inputs says data changed, not why or whether the target relationship changed. Diagnose and validate candidate performance first.'
        ),
        check(
          'What must a complete rollback restore?',
          [
            'Only the numeric probability threshold from the old policy',
            'Only the latest raw input table without its schema',
            'A fresh model trained automatically on the incident window',
            'Compatible model, features, runtime, and decision policy versions'
          ],
          3,
          'Components evolve together. Restoring one artifact against incompatible feature semantics or policy can preserve the failure.'
        )
      ]
    ),
    lesson(
      'ingestion-and-apis',
      'Ingestion from files, databases, and APIs',
      `# Ingestion from files, databases, and APIs

Ingestion copies source facts into a controlled landing zone with enough metadata to replay and audit them. Transformation comes later. The first responsibility is not to lose, invent, or silently reinterpret source records.

## Classify the source contract

A file drop may be a full snapshot or a delta. An API may paginate by page number, cursor, or updated timestamp. A database source may support snapshot reads, an increasing key, or change data capture from its transaction log. Ask:

- What identifies a record and a source version?
- Is deletion represented, inferred from snapshots, or unavailable?
- Can records change after first publication?
- Which clock defines an incremental boundary?
- What are rate limits, retention, and replay limits?
- How are schema changes announced?

Never assume a larger id means later creation unless the source guarantees it. Timestamps can tie and be corrected. An incremental cursor should usually use a tuple such as \`(updated_at, id)\`, query inclusively with overlap, and deduplicate at the destination.

## Files

Land a file immutably with source name, retrieval timestamp, checksum, byte count, parser version, and original filename. Validate that transfer completed before reading; many producers upload to a temporary name then atomically rename or provide a manifest.

\`\`\`python
from hashlib import sha256
from pathlib import Path

path = Path("landing/2026-08-30/events.jsonl")
digest = sha256(path.read_bytes()).hexdigest()
manifest = {"path": str(path), "bytes": path.stat().st_size, "sha256": digest}
\`\`\`

JSON Lines contains one JSON object per line, making streaming and partial failure easier than one huge JSON array. CSV has no universal schema: delimiter, quoting, encoding, newline, null representation, decimal format, and header behavior belong in the contract.

## APIs

\`\`\`python
import time
import requests

def fetch_pages(url, token):
    cursor = None
    while True:
        response = requests.get(
            url,
            headers={"Authorization": f"Bearer {token}"},
            params={"cursor": cursor, "limit": 500},
            timeout=(5, 30)
        )
        if response.status_code == 429:
            time.sleep(min(int(response.headers.get("Retry-After", "1")), 60))
            continue
        response.raise_for_status()
        page = response.json()
        yield page["items"]
        cursor = page.get("next_cursor")
        if cursor is None:
            break
\`\`\`

Production code bounds retries, uses exponential backoff with jitter for transient failures, respects server retry guidance, and does not retry permanent client errors blindly. Store raw successful responses or a durable equivalent before advancing the cursor. Secrets belong in a secret manager and must be redacted from URLs and logs.

## Databases and CDC

Polling by \`updated_at\` misses hard deletes unless tombstones exist and can miss tied timestamps without a secondary key. Change data capture reads committed insert, update, and delete changes from a log, preserving order within documented boundaries. CDC still requires an initial consistent snapshot, schema handling, offset checkpoints, and idempotent consumers.

Do not run unbounded analytical queries against an operational primary. Use a replica, export, or CDC and limit source load.

## Reconciliation

For every ingestion run record source range, rows read, rows landed, rejects, checksum or aggregate controls, cursor before and after, and duration. Compare destination counts and important sums with source controls. A green HTTP status proves transport, not completeness.

## Guided practice

An API returns orders sorted by \`updated_at\`, allows ties, updates old orders, and retains only 30 days of history. Design a safe hourly ingest.

## Worked solution

Persist a high-water tuple of \`updated_at\` and stable order id, but request with an overlap before the watermark because records and clocks can be delayed. Page by the API cursor, land every raw page immutably, and merge by order id plus source version only after the complete run succeeds. Advance the committed watermark after landing and validation, never before. Represent source deletions if the API exposes them; otherwise schedule a periodic full reconciliation within retention. Alert before a failed cursor becomes older than 30 days, when replay would no longer be possible.`,
      [
        check(
          'Why is an updated_at watermark alone often unsafe?',
          [
            'Tied timestamps and late corrections can fall across its boundary',
            'Timestamps cannot be stored in analytical database columns',
            'It automatically includes every hard deletion from the source',
            'A timestamp cursor forces every extract to be a full snapshot'
          ],
          0,
          'An inclusive overlap plus a stable tiebreaker and destination deduplication protects boundaries and delayed records.'
        ),
        check(
          'When should an ingest commit its new source cursor?',
          [
            'Before requesting the first page so another worker can start',
            'After durable landing and validation of the covered source range',
            'Whenever one response has a successful HTTP status',
            'Only after deleting all earlier raw source snapshots'
          ],
          1,
          'Advancing early can strand records if later pages or writes fail. The cursor represents data durably captured, not merely requested.'
        ),
        check(
          'What does database change data capture add over updated_at polling?',
          [
            'Automatic correction of every invalid source business value',
            'A guarantee that downstream code never receives a duplicate',
            'Committed inserts, updates, and deletes from a source change log',
            'A replacement for the initial snapshot and schema contract'
          ],
          2,
          'CDC exposes row-level changes including deletes, but consumers still need snapshots, offsets, schema handling, and idempotency.'
        ),
        check(
          'Why store a checksum with a landed source file?',
          [
            'It encrypts the file so unauthorized readers cannot open it',
            'It proves the source business values accurately represent reality',
            'It converts a schema-less CSV into a strongly typed table',
            'It detects whether the bytes later differ from the captured artifact'
          ],
          3,
          'A cryptographic digest provides integrity evidence for the bytes. It does not supply confidentiality or semantic correctness.'
        )
      ]
    ),
    lesson(
      'etl-elt-idempotency',
      'ETL, ELT, idempotency, and backfills',
      `# ETL, ELT, idempotency, and backfills

ETL transforms before loading into the analytical store. ELT lands raw data first and transforms inside the destination. Modern systems often combine them: perform minimal safe parsing and security controls during ingest, preserve raw evidence, then use scalable SQL transformations.

A pipeline is a sequence of contracts, not a line of scripts. Each step has declared inputs, output grain, schema, ownership, freshness, quality checks, and replay behavior.

## Idempotency

An operation is idempotent when repeating it with the same logical input produces the same durable result. Retries are inevitable, so idempotency is a correctness requirement.

Common patterns:

- overwrite one deterministic partition atomically;
- merge on a stable key and source version;
- insert with a uniqueness constraint and ignore exact repeats;
- write to a run-specific temporary location, validate, then publish atomically;
- record processed event ids for non-idempotent external actions.

\`\`\`sql
INSERT INTO order_current AS target (order_id, status, amount, source_updated_at)
SELECT order_id, status, amount, source_updated_at
FROM staged_order
WHERE 1
ON CONFLICT(order_id) DO UPDATE SET
  status = excluded.status,
  amount = excluded.amount,
  source_updated_at = excluded.source_updated_at
WHERE excluded.source_updated_at > target.source_updated_at;
\`\`\`

The version comparison prevents an older late record from overwriting newer state. For equal timestamps, use a source sequence or deterministic tie policy.

## Incremental processing

Incremental jobs reduce work but add state. Define:

- the input interval and whether boundaries are inclusive;
- overlap for late arrival;
- deduplication key;
- update and deletion behavior;
- committed watermark ownership;
- how a full rebuild compares with incremental state.

Partition by event date for event facts, but process recent partitions again to absorb late events. Ingestion date is useful for operations but usually not the business date for analysis.

## Backfills are production writes

A backfill reprocesses historical intervals because code, data, or definitions changed. It must use bounded ranges, versioned code, isolated staging, quality comparison, and controlled publication. Limit concurrency so historical work does not starve current SLAs.

Backfills expose hidden non-determinism: dependence on current dimension values, unversioned reference data, current time, random seeds, or mutable APIs. Pass the logical interval into transformations rather than calling the wall clock inside them.

## Exactly once is an end-to-end property

A scheduler may execute a task twice after a worker loses acknowledgement. A message system may redeliver after a crash. "Exactly once" requires the source position and destination effect to commit atomically, or an idempotent destination that makes repeats equivalent. Do not confuse one delivery attempt with one business effect.

External side effects such as email and payments need a stable idempotency key recorded before or atomically with the action when the provider supports it.

## Atomic publication

Readers should see the old complete dataset or new complete dataset, never a half-written mixture. Database transactions, atomic table or partition swaps, and versioned object paths with a metadata pointer implement this boundary.

## Guided practice

A daily job rebuilds yesterday's title metrics. Events can arrive seven days late, and retries sometimes create duplicates. Design its incremental and backfill behavior.

## Worked solution

Ingest events with immutable event ids. Each daily run recomputes event-date partitions for the previous eight days from deduplicated landed events, writes them to run-specific staging, validates key uniqueness and aggregates, then atomically replaces those partitions. Record the maximum ingestion watermark only after source landing. A backfill accepts explicit start and end dates, stages all affected partitions under one run id, compares totals with old output, and publishes in bounded batches. Repeating any run yields identical partitions; current-day work receives priority over backfill concurrency.`,
      [
        check(
          'What makes a pipeline write idempotent?',
          [
            'Repeating the same logical input leaves the same durable result',
            'Every run appends another copy with a different random identifier',
            'The scheduler promises never to retry after a worker failure',
            'The task uses more than one storage system for its output'
          ],
          0,
          'Idempotency makes retries safe by ensuring repeated execution is equivalent to one successful execution.'
        ),
        check(
          'Why recompute a recent event-time window in an incremental job?',
          [
            'It prevents old partitions from ever being queried again',
            'It incorporates records that arrived after their event date',
            'It changes all source timestamps to the current execution date',
            'It guarantees no event producer can send a duplicate identifier'
          ],
          1,
          'Late arrivals belong in historical event partitions. A bounded lookback plus deduplication updates them without rebuilding all history.'
        ),
        check(
          'What is required for safe publication of multi-part output?',
          [
            'Readers poll each temporary file while it is being written',
            'New and old partitions are mixed until the next full rebuild',
            'Readers switch atomically from one complete version to another',
            'Quality checks run only after the incomplete output is public'
          ],
          2,
          'Atomic publication prevents consumers from observing partial state and gives validation a complete candidate to approve.'
        ),
        check(
          'Why should a backfill receive its interval as an explicit parameter?',
          [
            'Historical tables cannot store timestamp columns without it',
            'The scheduler cannot execute tasks containing current dates',
            'An explicit interval automatically makes every source immutable',
            'Replaying history should not depend on the wall clock at rerun time'
          ],
          3,
          'Logical time is input data. Using now() inside historical transformation changes results depending on when the backfill runs.'
        )
      ]
    ),
    lesson(
      'data-modeling',
      'Data modeling: transactions, facts, dimensions, and history',
      `# Data modeling: transactions, facts, dimensions, and history

Operational models optimize valid writes and current application reads. Analytical models optimize stable meaning, history, joins, and aggregates. Copying an application schema into a warehouse without modeling exports its accidental complexity.

## Normalized operational data

Normalization separates entities to reduce update anomalies. An order header and its lines belong in different tables because one order has many products. Primary keys identify rows, foreign keys enforce relationships, and transactions preserve invariants.

Analytical queries often prefer a **star schema**: fact tables at a declared event or periodic grain, surrounded by dimensions describing entities.

## Facts

A playback fact might be one row per playback session with measures such as minutes and bytes, foreign keys for user, title, device, and date, plus a degenerate session id. Measures can be:

- additive across every dimension, such as revenue;
- semi-additive, such as account balance across users but not time;
- non-additive, such as ratios and distinct counts.

Store ratio components, not only the ratio. Summing daily error rates is meaningless; summing errors and starts then dividing is valid.

Factless fact tables record that an event or relationship occurred, such as user eligibility for a campaign.

## Dimensions and surrogate keys

Dimensions carry descriptive attributes and a stable surrogate key independent of mutable source identifiers. A conformed title dimension used by playback and billing gives both facts the same genre and studio definitions.

Slowly changing dimensions preserve history:

- Type 1 overwrites an attribute and loses prior state.
- Type 2 closes the old version and inserts a new row with effective interval.
- Type 3 stores limited previous values in extra columns and is uncommon.

\`\`\`text
user_key  user_id  plan   valid_from           valid_to
101       u-7      basic  2026-01-01T00:00Z    2026-04-10T15:00Z
205       u-7      plus   2026-04-10T15:00Z    9999-12-31T00:00Z
\`\`\`

An event at 2026-03-01 joins user u-7 to key 101; a current-state join to key 205 would rewrite history. Use half-open effective intervals and enforce no overlap per natural key.

## Snapshots and accumulating facts

A periodic snapshot stores one row per entity-period, such as account-day balance, even when no event occurs. An accumulating snapshot updates one row as a process reaches milestones, such as order placed, paid, shipped, and delivered. Event facts remain the immutable audit trail.

## Semantic layer and metrics

Define a metric with name, owner, grain, entity, time dimension, filters, numerator, denominator, late-data behavior, and tests. "Active users" must specify qualifying events and period. Central definitions reduce disagreement but still require versioning when business meaning changes.

## Guided practice

Model subscription revenue and playback quality so analysts can compare plan-at-event-time without rewriting history.

## Worked solution

Create a playback-session fact at one row per session with user, title, device, event-date, starts, errors, minutes, and bytes. Create a payment fact at one row per settled payment or ledger movement rather than a mutable invoice snapshot. Use Type 2 user-subscription dimension versions with surrogate user-version keys and effective intervals; resolve each fact at its event time. Conform date, title, and plan dimensions. Store error and start counts for a weighted error rate. Add uniqueness, foreign-key-or-unknown-member, nonoverlapping-effective-range, and reconciliation tests against source totals.`,
      [
        check(
          'What should the first sentence of a fact-table definition state?',
          [
            'The exact grain represented by one fact row',
            'The dashboard color assigned to each measure',
            'The maximum number of dimensions allowed by the database',
            'The current employee who first created the source table'
          ],
          0,
          'Grain determines valid keys, joins, and aggregation. Every other modeling decision depends on knowing what one row represents.'
        ),
        check(
          'Why store error count and start count rather than only daily error rate?',
          [
            'The ratio cannot be represented by a numeric database type',
            'Components can be aggregated and then divided with correct weighting',
            'A stored denominator guarantees every event arrived on time',
            'Daily rates are always equal across titles and platforms'
          ],
          1,
          'Ratios are non-additive. Summing components across the desired grain and dividing preserves the correct exposure weighting.'
        ),
        check(
          'What does a Type 2 slowly changing dimension preserve?',
          [
            'Only the newest value for each natural key',
            'One previous value in a fixed backup column',
            'Effective-dated versions of changing dimension attributes',
            'Every raw event payload inside the dimension row'
          ],
          2,
          'Type 2 inserts a new surrogate-keyed version and closes the old interval, allowing facts to retain historical context.'
        ),
        check(
          'Which measure is semi-additive?',
          [
            'Settled payment amount summed by product and day',
            'Playback error events summed across devices',
            'Minutes viewed summed across users and titles',
            'End-of-day account balance summed across users but not dates'
          ],
          3,
          'Balances can add across accounts at one time but adding snapshots across dates double-counts the same carried value.'
        )
      ]
    ),
    lesson(
      'parquet-and-partitioning',
      'Files, compression, Parquet, and partition design',
      `# Files, compression, Parquet, and partition design

Storage layout determines how much data a query reads, lists, transfers, decompresses, and holds in memory.

CSV is portable and inspectable but has weak typing, repeated text, ambiguous nulls, and no internal statistics. JSON supports nested records but repeats keys and also needs a schema contract. Avro is row-oriented with an embedded schema and works well for event exchange. Parquet is columnar and optimized for analytical scans.

## Parquet layout

A Parquet file contains row groups. Each row group contains one contiguous column chunk per column, and chunks contain encoded, compressed pages. File metadata stores schema, locations, and statistics. A query selecting three of one hundred columns can read their chunks without reading the other 97. Row-group min and max statistics may let a reader skip groups that cannot satisfy a filter.

\`\`\`python
import duckdb

result = duckdb.sql("""
    SELECT title_id, SUM(minutes) AS minutes
    FROM read_parquet('lake/play_event/event_date=2026-08-*/*.parquet')
    WHERE platform = 'mobile'
    GROUP BY title_id
    ORDER BY minutes DESC
""").df()
\`\`\`

Projection pushdown reads required columns; predicate pushdown moves filters into the scan. Compression trades CPU for bytes. Dictionary encoding is effective for repeated low-cardinality values. Measure realistic workloads rather than assuming one codec wins.

## Partitioning

Directory partitioning places values in paths such as \`event_date=2026-08-30/region=gb/part-000.parquet\`. Engines can prune directories from filters. Choose columns frequently filtered, with bounded cardinality and enough data per partition. Partitioning by user id creates millions of tiny directories and metadata operations.

Do not create a file per event or tiny batch. Small files multiply listing, opening, scheduling, and metadata cost. Compact them into healthy files while preserving atomic publication. Huge files reduce parallelism and make rewrites expensive. File and row-group sizes depend on engine, storage, network, and workload, so benchmark rather than copying one universal number.

Partition evolution matters. Changing from day to month or adding a bucket should be represented in table metadata or a versioned layout, not by mixing ambiguous paths.

## Schemas and evolution

Adding a nullable column is usually backward compatible. Removing, renaming, narrowing a type, or reusing a field name changes meaning and may break old readers. Keep stable field identifiers where the format supports them. When reading partitions with different columns, union-by-name can preserve missing fields as null, but this is a migration tool, not permission for uncontrolled drift.

Nested data can remain nested when one entity naturally owns repeated children and common queries consume them together. Flatten when independent joins and filtering benefit. Avoid encoding structured fields into opaque JSON without a reason.

## Object storage is not a local filesystem

Object stores address immutable objects by key and favor large sequential transfers. Rename is often copy plus delete, listing may be a costly operation, and concurrent writers need a commit protocol. Publish versioned files and atomically update table metadata or a manifest; do not let readers infer correctness from whatever objects happen to share a prefix.

## Guided practice

Design storage for three years of playback events. Most queries filter a date range and sometimes platform; there are 50 platforms and 20 million users.

## Worked solution

Use a typed Parquet table partitioned by event date, not user. Sort or cluster within output by a useful key such as title or user only if measured queries benefit. Platform may be a second partition only if each date-platform partition remains substantial and platform filtering is common; otherwise column statistics handle it without multiplying directories. Produce multiple balanced files per busy day, compact small late-arrival files, store schema and snapshots in table metadata, and validate event-id uniqueness and partition counts before atomic publication.`,
      [
        check(
          'Why can a Parquet query avoid reading unselected columns?',
          [
            'Each row group stores separate contiguous chunks by column',
            'Every file contains only one field from the logical table',
            'The file converts all columns into one shared dictionary value',
            'Column selection is performed after the entire file enters memory'
          ],
          0,
          'Column chunks let a reader locate and scan only requested columns, reducing I/O for wide analytical tables.'
        ),
        check(
          'What is the small-files problem?',
          [
            'Small files always use an incorrect schema data type',
            'Per-file metadata, listing, opening, and task overhead dominate',
            'Compression cannot be applied to files smaller than a row group',
            'Object stores reject files below one gigabyte by definition'
          ],
          1,
          'Thousands of tiny objects turn fixed metadata and scheduling work into the bottleneck even when total data volume is modest.'
        ),
        check(
          'Which field is usually a poor directory partition key?',
          [
            'A bounded event date frequently used in query filters',
            'A low-cardinality region used for compliance isolation',
            'A very high-cardinality user identifier',
            'A month column for a large append-only history'
          ],
          2,
          'One partition per user creates enormous directory and file counts with little data in each, defeating pruning benefits.'
        ),
        check(
          'What is a safe publication pattern on object storage?',
          [
            'Readers scan every object under a prefix while writers upload it',
            'Writers overwrite random pieces of the current snapshot in place',
            'Readers decide completeness from the newest object modification time',
            'Write versioned data, validate it, then switch table metadata or a manifest'
          ],
          3,
          'A metadata commit gives readers one complete snapshot boundary despite object-store rename and listing semantics.'
        )
      ]
    ),
    lesson(
      'warehouses-and-lakehouses',
      'Warehouses, lakes, lakehouses, and query engines',
      `# Warehouses, lakes, lakehouses, and query engines

A data warehouse combines managed analytical storage, SQL execution, metadata, security, and workload controls. A data lake stores diverse files in inexpensive object storage, separating storage from compute. A lakehouse adds table metadata and transaction semantics over lake files so engines can read consistent snapshots, evolve schemas, and update tables.

These are architectural properties, not product identities. A small local DuckDB database can teach the same columnar scan, join, aggregate, and materialization choices as a distributed warehouse.

## Separate storage and compute deliberately

Independent compute clusters can scale workloads and reduce contention while sharing governed storage. The cost is network I/O, cache misses, and more coordination. Co-located storage can offer lower latency and strong local optimization. Choose from workload, scale, failure, governance, and cost rather than slogans.

## Query execution

A SQL engine parses and validates a query, builds a logical plan, optimizes it using rules and statistics, selects physical operators, then executes. Important operators include scans, filters, projections, hash or sort-merge joins, aggregation, sorting, and exchange between workers.

\`\`\`sql
EXPLAIN ANALYZE
SELECT t.genre, SUM(f.minutes)
FROM playback_fact AS f
JOIN title_dim AS t ON t.title_key = f.title_key
WHERE f.event_date >= DATE '2026-08-01'
GROUP BY t.genre;
\`\`\`

Read plans from leaves upward. Ask whether partition pruning occurred, estimated row counts resemble actual counts, a small dimension can broadcast, filters were pushed down, and a join or aggregate causes data movement.

## Tables and snapshots

A table format over object files tracks which data files belong to each snapshot, schemas, partition transforms, and statistics. Atomic metadata commits give snapshot isolation: readers see one committed version. Optimistic concurrency rejects conflicting writers. Time travel aids audit and rollback but retention policies eventually remove old files.

Updates and deletes often write new files or deletion metadata rather than modify Parquet bytes in place. Compaction and metadata cleanup are regular maintenance, not optional polish.

## Workload management

Separate ingestion, transformation, interactive exploration, dashboards, and data-science training when they compete. Use queues, quotas, timeouts, statement limits, autoscaling, and cost attribution. A runaway cross join should not block a finance report.

Materialized views and aggregate tables trade write complexity and freshness for faster repeated reads. Cache only after identifying repeated expensive work; a cache can hide inefficient queries until invalidation or scale exposes them.

## Security

Grant access through roles and groups, not direct per-user exceptions. Apply least privilege, row or column policies where needed, encryption, audit logs, and separate sensitive zones. Masking presentation is not authorization if raw values remain queryable elsewhere. Metadata catalogs should record owner, classification, lineage, and retention.

## Guided practice

A company has 5 TB of append-heavy events, small changing dimensions, hourly transforms, daily dashboards, and occasional large data-science scans. Sketch an architecture and isolation strategy.

## Worked solution

Land immutable events in object storage and publish them through a transactional table format partitioned by event date. Keep conformed dimensions and curated facts in the same governed catalog, with hourly incremental transforms and snapshot history. Run dashboard queries on a small isolated warehouse or compute pool backed by aggregate tables, transformations on scheduled compute, and exploratory scans on quota-limited elastic compute. Broadcast small dimensions where plans support it, compact event files, maintain statistics, classify sensitive columns, and attribute storage and compute cost by workload and owner. A managed warehouse could implement the same logical zones if simpler operations outweigh lake flexibility.`,
      [
        check(
          'What does a lakehouse table layer add to ordinary object files?',
          [
            'Snapshot metadata, schema control, and transactional publication',
            'A requirement that every query run on one local machine',
            'Automatic proof that all source facts are accurate',
            'One unchanging physical partition layout for the table lifetime'
          ],
          0,
          'The table metadata identifies consistent file snapshots and manages changes. It cannot establish real-world accuracy by itself.'
        ),
        check(
          'What often makes a distributed analytical join expensive?',
          [
            'Selecting a small subset of columns from a columnar file',
            'Moving rows across workers to align matching join keys',
            'Applying a filter supported by partition pruning',
            'Broadcasting a genuinely small dimension to workers'
          ],
          1,
          'A shuffle or exchange involves serialization, network transfer, disk spill, and synchronization, often dominating local computation.'
        ),
        check(
          'Why isolate dashboard and exploratory compute workloads?',
          [
            'They must use different SQL syntax for identical tables',
            'Dashboards cannot read a table used by data scientists',
            'Large unpredictable scans should not consume latency-critical capacity',
            'Exploration requires permanent administrator access to all data'
          ],
          2,
          'Resource isolation protects predictable service levels and makes cost or failures attributable without duplicating governed storage.'
        ),
        check(
          'What does an atomic table snapshot provide to readers?',
          [
            'Every historical snapshot is retained forever without cost',
            'No two writers can ever attempt work concurrently',
            'All queries return in constant time independent of data size',
            'A consistent committed set of files rather than partial writes'
          ],
          3,
          'Readers resolve one committed metadata version. Concurrency and retention still require explicit policies.'
        )
      ]
    ),
    lesson(
      'analytics-transformations',
      'Modular SQL transformations, tests, documentation, and lineage',
      `# Modular SQL transformations, tests, documentation, and lineage

An analytics transformation project treats SQL as software: small named models, declared dependencies, version control, review, tests, documentation, reproducible builds, and environments. Tools such as dbt implement this pattern, but the design is portable.

## Layer by responsibility

A useful structure is:

- **Sources:** metadata for raw tables owned elsewhere.
- **Staging:** one model per source, renaming, typing, and minimal normalization without joins.
- **Intermediate:** reusable joins, pivots, sessionization, or grain changes hidden from end users.
- **Marts:** facts, dimensions, and decision-ready models with stable contracts.

Do not create layers solely to satisfy a naming fashion. Each model should have one clear grain and purpose.

\`\`\`sql
-- models/staging/stg_play_event.sql
SELECT
  CAST(event_id AS VARCHAR) AS event_id,
  CAST(user_id AS VARCHAR) AS user_id,
  CAST(title_id AS VARCHAR) AS title_id,
  CAST(occurred_at AS TIMESTAMP) AS occurred_at,
  CAST(minutes AS INTEGER) AS minutes
FROM raw.play_event
\`\`\`

\`\`\`sql
-- models/marts/fct_playback_daily.sql
SELECT
  CAST(occurred_at AS DATE) AS event_date,
  title_id,
  COUNT(*) AS sessions,
  SUM(minutes) AS minutes
FROM stg_play_event
GROUP BY CAST(occurred_at AS DATE), title_id
\`\`\`

In a dependency-aware build tool, referencing another model creates a graph edge. The graph determines order and selective rebuilds; folder order should not.

## Tests are executable contracts

Generic tests cover non-null, uniqueness, accepted values, and relationships. Singular SQL tests assert a domain invariant and return failing rows. Unit tests feed small fixed inputs into complicated logic. Data-diff or reconciliation tests compare new and old builds during change.

Test the grain first. A model documented as one row per date-title must have a unique compound key. Test source freshness separately from model success; a perfectly executed transformation of stale input is stale.

## Incremental models

An incremental model processes a bounded source slice and merges or replaces destination partitions. It needs a unique key, late-arrival lookback, schema-change policy, deletion behavior, and full-refresh path. Run a periodic comparison between incremental and clean rebuild outputs to detect accumulated drift.

## Documentation and ownership

For each exposed model document purpose, owner, grain, keys, update cadence, source lineage, important columns, metric semantics, caveats, and deprecation plan. Generate column descriptions near code and publish them in a searchable catalog.

Lineage shows dependency, not correctness or causality. Column-level lineage helps assess whether changing a source field affects downstream reports. Runtime lineage also records which versions and snapshots a run actually consumed.

## Environments and CI

Develop against isolated schemas or databases. CI should parse and compile the graph, lint risky patterns, build modified models plus affected children on representative data, run tests, and compare contracts. Production credentials must not appear in developer configuration.

## Guided practice

Refactor one 500-line query that parses events, joins users and titles, calculates daily metrics, and ranks titles.

## Worked solution

Create source declarations; one staging model for each source with types and names; an intermediate point-in-time event-to-user-version join; a daily title aggregate at date-title grain; and a final ranking mart that windows within date. Test event id uniqueness, required keys, dimension relationships with an explicit unknown-member policy, the date-title compound key, nonnegative additive measures, freshness, and reconciliation totals. Document each grain and effective-time rule. Materialize small stable dimensions as tables or views based on measured cost, and make the daily aggregate incremental by replaceable recent event-date partitions.`,
      [
        check(
          'What belongs in a staging transformation?',
          [
            'Source-local renaming, typing, and minimal normalization',
            'Every cross-domain metric used by executive dashboards',
            'A random sample of rows selected for machine-learning labels',
            'All historical backfill scheduling and cluster configuration'
          ],
          0,
          'Staging creates a clean, source-shaped boundary. Joins and business grain changes belong in later reusable models.'
        ),
        check(
          'What should the first tests on a mart enforce?',
          [
            'The query text contains a minimum number of common table expressions',
            'The declared grain key is non-null and unique',
            'Every numeric output has a value greater than zero',
            'The model is materialized using the most expensive option'
          ],
          1,
          'If row identity is wrong, downstream joins and aggregates are unsafe. Grain tests make the central contract executable.'
        ),
        check(
          'Why periodically compare an incremental model with a full rebuild?',
          [
            'Full builds always use fewer resources than incremental processing',
            'Incremental jobs cannot contain any SQL aggregation',
            'State, late data, or changed logic can accumulate divergence',
            'The comparison automatically deletes all historical source data'
          ],
          2,
          'Incremental correctness depends on boundaries and prior state. A clean recomputation is an important audit of those assumptions.'
        ),
        check(
          'What does lineage alone prove?',
          [
            'Every upstream source value accurately represents reality',
            'The final metric has a causal interpretation',
            'Every dependency met its freshness service level',
            'Which declared data dependencies feed a downstream artifact'
          ],
          3,
          'Lineage maps flow and impact. Quality, freshness, and semantics need their own contracts and evidence.'
        )
      ]
    ),
    lesson(
      'airflow-orchestration',
      'Airflow orchestration, retries, intervals, and backfills',
      `# Airflow orchestration, retries, intervals, and backfills

An orchestrator schedules and observes work; it should not contain all transformation logic. Tasks call versioned, independently testable programs that read declared inputs and publish idempotent outputs.

Airflow represents a workflow as a Dag of tasks and dependencies. A Dag run covers a **data interval** and has a logical date describing that interval, distinct from wall-clock execution. A daily run triggered after midnight usually processes the day that just ended. Use the interval supplied by runtime context rather than subtracting one day from the current clock.

Airflow 3 exposes stable authoring interfaces through \`airflow.sdk\`:

\`\`\`python
import pendulum
from airflow.sdk import dag, get_current_context, task

@dag(
    schedule="0 2 * * *",
    start_date=pendulum.datetime(2026, 1, 1, tz="UTC"),
    catchup=True,
    tags=["playback"]
)
def playback_daily():
    @task(retries=3, retry_delay=pendulum.duration(minutes=5))
    def ingest() -> str:
        context = get_current_context()
        start = context["data_interval_start"]
        end = context["data_interval_end"]
        return land_events(start=start, end=end)  # return a URI, not the dataset

    @task
    def transform(landing_uri: str) -> str:
        return build_daily_partition(landing_uri)

    @task
    def validate(candidate_uri: str) -> None:
        validate_partition(candidate_uri)

    validate(transform(ingest()))

playback_daily()
\`\`\`

This example is conceptual: imported business functions live in a tested package. Small return values can travel as task metadata; large DataFrames belong in object storage or a database, with tasks passing a URI and version.

## Retries and timeouts

Retry transient failures such as rate limits and temporary network errors with bounded exponential backoff and jitter. Do not retry invalid schema or authorization indefinitely. Every retried task must be idempotent. Set execution timeouts, queue or pool limits, and task-level resource requests.

A sensor waits for an external condition. Use deferrable or reschedule behavior where supported so waiting does not occupy a worker. Prefer event or asset scheduling when an upstream dataset publication is the true trigger.

## Dependencies and dynamic work

Task boundaries should represent independently retryable, observable units with durable handoffs. Thousands of tasks each handling one tiny file overload scheduler metadata; one opaque task processing everything loses isolation. Batch work at a useful operational grain.

Dynamic task mapping expands work from runtime inputs, but cap expansion and make each mapped task idempotent. Keep Dag topology reasonably stable so operators can understand it.

## Catchup and backfill

\`catchup=True\` creates scheduled historical intervals since the start date when missing. That is safe only when tasks process their interval and source history still exists. A backfill is a controlled set of historical Dag runs: limit concurrency, isolate staging, monitor current workload, and validate before publication.

## Failure semantics

A task marked successful must mean its durable contract is complete. Do not swallow exceptions or report success after writing half an output. Use trigger rules carefully for cleanup and alerts; a downstream "done" task should not make failed business output appear successful.

Alert messages need Dag, task, run interval, attempt, owner, error class, relevant logs, and first remediation action. Alert on user impact and SLA, not every retry.

## Guided practice

Design a Dag for hourly API ingestion followed by a daily aggregate. The API has rate limits, the hourly source can arrive 20 minutes late, and history can be replayed for 30 days.

## Worked solution

Use an hourly Dag with interval-bound ingest, a bounded wait or data-ready signal, API retry respecting rate limits, raw immutable landing, reconciliation, and cursor commit only after validation. Limit its pool so concurrent catchup cannot exceed API capacity. Publish one hourly asset or manifest. A daily Dag depends on all expected hourly assets or a complete daily manifest, rebuilds a late-arrival window idempotently, validates and atomically swaps the partition. Enable catchup within source retention, restrict backfill concurrency, and alert well before the oldest failed interval reaches 30 days. Pass URIs and interval metadata between tasks, never bulk rows.`,
      [
        check(
          'What should an Airflow task use to select the period it processes?',
          [
            'Its assigned logical data interval from runtime context',
            'The worker wall clock minus a hardcoded number of hours',
            'The newest source timestamp regardless of the scheduled run',
            'A random unprocessed partition discovered during execution'
          ],
          0,
          'Data intervals make retries and backfills deterministic. Wall-clock calculations change meaning depending on when a task runs.'
        ),
        check(
          'What should tasks exchange for a large intermediate dataset?',
          [
            'The complete DataFrame serialized into scheduler metadata',
            'A durable storage reference plus its version or manifest',
            'One process-memory pointer shared across all workers',
            'A screenshot of the successful upstream task output'
          ],
          1,
          'Orchestrator metadata is for small control values. Durable storage creates a replayable boundary across processes and retries.'
        ),
        check(
          'What property is required before a task is safely retried?',
          [
            'It never writes any data or external side effect',
            'It runs only once per physical worker machine',
            'Its repeated logical execution has an idempotent durable effect',
            'It catches and suppresses every exception internally'
          ],
          2,
          'Worker failures can occur after an effect but before success acknowledgement. Idempotency makes the resulting duplicate attempt safe.'
        ),
        check(
          'Why avoid creating one orchestrator task per tiny file?',
          [
            'Files cannot be processed by parallel worker processes',
            'Every task must run on a different physical cluster',
            'File contents cannot be associated with a data interval',
            'Scheduler and metadata overhead can dominate useful work'
          ],
          3,
          'Task isolation has fixed control-plane cost. Batch tiny units into a meaningful retry and observability boundary.'
        )
      ]
    ),
    lesson(
      'spark-distributed-compute',
      'Spark, distributed execution, shuffles, and skew',
      `# Spark, distributed execution, shuffles, and skew

Distributed compute helps when one machine cannot meet data volume, time, concurrency, or fault-tolerance requirements. It also adds serialization, scheduling, network, spill, retries, and operational cost. Use a single-machine vectorized engine when it satisfies the workload.

Spark SQL and DataFrames build a lazy logical plan. Transformations such as \`select\`, \`filter\`, \`join\`, and \`groupBy\` do not execute until an action such as \`write\`, \`count\`, or \`collect\` requests a result. The optimizer pushes filters and projections, reorders eligible joins, and chooses physical operators using rules and statistics.

\`\`\`python
from pyspark.sql import functions as F

events = spark.read.parquet("lake/play_event")
titles = spark.read.parquet("lake/title_dim")

daily = (
    events
    .filter(F.col("event_date") >= F.lit("2026-08-01"))
    .join(F.broadcast(titles.select("title_id", "genre")), "title_id")
    .groupBy("event_date", "genre")
    .agg(F.sum("minutes").alias("minutes"), F.count("*").alias("sessions"))
)
daily.explain("formatted")
\`\`\`

Broadcast a dimension only when it is truly small enough for every executor. Hints are suggestions requiring measurement, not decorations.

## Narrow and wide transformations

A narrow transformation can compute each output partition from one input partition, such as a filter. A wide transformation requires rows to move between partitions, such as grouping or joining by a differently distributed key. This **shuffle** serializes, transfers, sorts or hashes, spills, and synchronizes data.

Inspect plans for \`Exchange\` nodes and the runtime UI for input, shuffle read and write, spill, duration, failed tasks, and skew. Reducing data before a shuffle, selecting only needed columns, using good join strategies, and aligning storage partitioning can matter more than adding machines.

## Partitions and files

Too few partitions underuse cores and create large tasks. Too many add scheduler overhead and tiny output files. \`repartition\` performs a shuffle and can increase or decrease partitions with a distribution. \`coalesce\` commonly reduces partitions without a full shuffle but may create imbalance. Partition count is a measured workload setting, not a constant copied from another cluster.

Never call \`collect()\` on unbounded data; it moves all results to the driver. Use \`limit\`, write distributed output, or aggregate to a known small result.

## Skew

If one key owns a huge share of rows, one task becomes the straggler or runs out of memory while others finish. Diagnose partition-size and task-duration distributions. Remedies include filtering invalid hot keys, pre-aggregating, broadcasting the other side, adaptive skew handling, or salting a hot key and combining partial results. Salting changes the computation and must preserve exact semantics.

## Fault tolerance and nondeterminism

Spark can recompute lost partitions from lineage. Side effects inside transformations may run more than once and should be avoided. Row order is undefined without an explicit order, and even an order requires a deterministic tiebreaker. Floating reductions can differ slightly with partition order.

Cache only reused expensive intermediate results that fit the storage level. Caching every DataFrame consumes memory, adds serialization work, and can make jobs slower. Unpersist when the reuse window ends.

## Guided practice

A Spark join of 10 TB of events to a 2 GB compressed user table runs slowly. One null user id covers 35% of events, most tasks finish in two minutes, and one runs for an hour. Diagnose and redesign.

## Worked solution

Inspect actual in-memory user-table size before broadcasting; 2 GB compressed may be too large per executor. Separate or reject null user ids before the keyed join if the domain permits, because they all hash together and cannot match a valid user. Ensure required event columns and date partitions are pruned, refresh statistics, and inspect the physical join. If a few valid users remain hot, pre-aggregate event measures by user where semantics allow or use adaptive skew handling or carefully salted joins. Tune shuffle partitions from observed bytes and task duration, compact output files, and compare total network, spill, and wall time after each change rather than merely adding executors.`,
      [
        check(
          'What triggers execution of a lazy Spark DataFrame plan?',
          [
            'An action such as writing, counting, or collecting a result',
            'Importing the functions module into the driver process',
            'Naming an intermediate DataFrame variable in Python',
            'Adding a comment before a select transformation'
          ],
          0,
          'Transformations build a plan. An action requests materialized results and causes Spark to optimize and schedule stages.'
        ),
        check(
          'Why is a shuffle expensive?',
          [
            'It always trains a machine-learning model on each partition',
            'Rows are redistributed with network, serialization, and possible spill',
            'It permanently deletes the input partitions after one read',
            'Every shuffle result must be collected into driver memory'
          ],
          1,
          'Wide dependencies require workers to exchange rows by key, coordinate stages, and often sort or hash substantial state.'
        ),
        check(
          'What is a common symptom of key skew?',
          [
            'Every task finishes at nearly the same time with no spill',
            'The query plan contains only narrow filter operations',
            'A few partitions run far longer or use much more memory',
            'The driver displays fewer columns than the input schema'
          ],
          2,
          'Hot keys concentrate work into a small number of partitions, creating stragglers even when most of the cluster is idle.'
        ),
        check(
          'When is collect() safe?',
          [
            'Any time the source table is stored as Parquet files',
            'Whenever executors have more combined memory than the driver',
            'After every join so Python can validate the full result locally',
            'Only when the final result is proven small enough for driver memory'
          ],
          3,
          'Collect transfers every result row to one process. Distributed output or bounded aggregation is required for large results.'
        )
      ]
    ),
    lesson(
      'kafka-streaming',
      'Kafka, streaming state, event time, and delivery semantics',
      `# Kafka, streaming state, event time, and delivery semantics

A stream is an unbounded sequence of records. Streaming systems process records continuously or in small micro-batches, but they still need keys, schemas, time semantics, state, replay, and correctness under failure.

Kafka stores records in ordered **partitions** within a topic. Each record has an offset unique within its partition. Ordering is guaranteed only inside one partition. Producers choose a partition, commonly by hashing a key, so all events for one user stay ordered relative to that user. More partitions increase parallelism but also metadata, open files, rebalancing, and distributed state.

A consumer group assigns each partition to at most one consumer in the group at a time. Different groups read independently. A committed offset records the next position to resume, not proof that an external destination effect succeeded.

## Delivery semantics

- At most once: commit before processing; a crash can lose work.
- At least once: process then commit; a crash between effect and commit can repeat work.
- Exactly once: destination effects and source position are committed atomically within a supported boundary.

Kafka transactions support atomic consume-transform-produce behavior between Kafka topics with read-committed consumers. Writing to an external database needs cooperation: store the offset with results in one database transaction, or make writes idempotent with event keys. Exactly-once processing does not mean the physical computation executes once.

## Event time and processing time

Event time says when the source event occurred. Processing time says when the streaming job handled it. Networks, mobile clients, retries, and outages make events late and out of order.

A watermark estimates that event time before a boundary is mostly complete. A ten-minute watermark is not "wait exactly ten minutes" and cannot guarantee no later event. It lets the engine close old window state according to a late-data policy. Define whether later records are dropped, sent to correction, or update previously emitted results.

Windows may be tumbling nonoverlapping intervals, sliding overlapping intervals, or sessions separated by inactivity. Use half-open boundaries and a clear timezone.

## Stateful processing

Counts by key, joins, deduplication, and sessions retain state. Bound state with windows, watermarks, or expiry. A forever set of every event id eventually exhausts storage. Checkpoint state and source positions to durable storage, and treat checkpoint compatibility as part of deployment.

Stream-stream joins require time constraints so unmatched state can expire. Joining a stream to a dimension needs a policy: current value at processing time, effective-dated value at event time, or a broadcast snapshot version. Those give different answers.

## Schemas and keys

Use a schema registry or equivalent compatibility gate. Adding optional fields is generally safe; changing meaning under the same field is not. Keys control partitioning and compaction semantics. A compacted topic retains latest records per key eventually and can represent current state plus tombstones, but it is not a replacement for immutable audit events.

## Operations

Monitor producer errors, broker availability, partition imbalance, consumer lag, processing latency, watermark delay, state size, late and duplicate rates, dead letters, and sink failures. Lag is work outstanding in offsets; translate it to time and user impact.

## Guided practice

Design a real-time playback-error alert per title over five-minute windows. Mobile events can arrive 15 minutes late and may be retried.

## Worked solution

Publish versioned events keyed by title id with immutable event id, event time, ingestion time, platform, start flag, and error flag. Consumers deduplicate within a bounded horizon, aggregate tumbling five-minute event-time windows, and allow at least 20 minutes of lateness based on measured distribution. Emit provisional alerts quickly and correction or final records later, keyed by title-window so the sink upserts idempotently. Store checkpoint and state durably. Keep too-late events in a correction stream and batch-reconcile official metrics. Alert on error count plus rate and minimum starts to avoid tiny denominators, and monitor consumer lag, watermark age, duplicates, late events, and alert delivery separately.`,
      [
        check(
          'What ordering does a Kafka topic guarantee?',
          [
            'Record order within each partition, not across the entire topic',
            'One global order across every partition and consumer group',
            'Alphabetical order of record keys after compaction',
            'Event-time order even when producers send late records'
          ],
          0,
          'Offsets order records inside a partition. Separate partitions advance independently, so cross-partition order needs another definition.'
        ),
        check(
          'Why can at-least-once consumption duplicate a destination write?',
          [
            'A consumer commits before reading every record by definition',
            'A crash can occur after the write but before the offset commit',
            'Kafka assigns one partition to several consumers in one group',
            'Offsets are generated randomly and frequently collide'
          ],
          1,
          'On restart the consumer resumes from the last committed offset and repeats records whose effects completed but were not acknowledged.'
        ),
        check(
          'What is the purpose of an event-time watermark?',
          [
            'To convert every event timestamp into processing time',
            'To guarantee that no event can arrive after the boundary',
            'To bound state and define handling as old windows become complete',
            'To choose the partition count for newly created topics'
          ],
          2,
          'A watermark is a completeness heuristic and state-management boundary. The policy must still define what happens to later events.'
        ),
        check(
          'How can a consumer make database output and progress atomic?',
          [
            'Commit the source offset before beginning the database transaction',
            'Disable every producer retry and ignore database failures',
            'Keep only the latest offset in process memory between restarts',
            'Store results and the consumed offset in the same database transaction'
          ],
          3,
          'If both commit together, a crash leaves either both durable or neither durable, allowing safe resume from the recorded position.'
        )
      ]
    ),
    lesson(
      'quality-governance-operations',
      'Data quality, observability, governance, security, and cost',
      `# Data quality, observability, governance, security, and cost

Production data is trustworthy when people can discover its meaning, verify its fitness for a decision, understand its lineage, and recover when it fails. A collection of passing null checks is not enough.

## Contracts and quality

A data contract names producer and consumers, owner, grain, keys, schema, semantics, update cadence, late-data policy, compatibility, retention, security classification, and service objectives. Enforce it at the earliest controlled boundary and again at important marts.

Quality checks cover:

- schema and compatibility;
- uniqueness and referential integrity;
- accepted values and domain ranges;
- distribution and volume changes;
- freshness and completeness by partition;
- cross-system reconciliation of counts and financial controls;
- semantic invariants such as completed time not before start time.

Hard failures should quarantine or block publication when data would be unsafe. Warnings allow known tolerances. Record every check result as time-series data; the monitoring system itself needs a heartbeat so "no failed checks" cannot mean checks stopped.

## Service levels and incidents

An SLI is a measurement such as percent of partitions published before 07:00. An SLO is a target such as 99.5% over 30 days. An SLA is an external commitment with consequences. Freshness, completeness, correctness, availability, and recovery can each have objectives.

Alert on actionable user impact with owner, run, affected assets, lineage, severity, and playbook. During an incident: stop propagation, preserve evidence, communicate scope, restore a known-good state, backfill or correct, verify consumers, and write a blameless review with concrete prevention.

## Governance and privacy

Catalog datasets with owner, description, grain, classification, lineage, quality, retention, and approved use. Collect only needed data, limit purpose, minimize precision and retention, and support deletion or legal holds. Distinguish anonymous from pseudonymous: replacing a user id with a stable hash still permits linkage and may remain personal data.

Apply least privilege through roles, separate production and development, rotate secrets, encrypt transport and storage, log access, and review unusual queries. Tokenization substitutes sensitive values through a controlled mapping. Hashing low-entropy identifiers without a secret is vulnerable to guessing. Use a keyed construction when a stable protected pseudonym is needed, with keys managed outside data tables.

Backups must be encrypted, access-controlled, retention-aware, and tested through restore. Deletion requirements include derived tables, caches, indexes, features, exports, and eligible backups under the defined policy.

## Cost engineering

Measure bytes scanned, compute time, storage versions, file count, network transfer, retries, and idle capacity by owner and product. Cost is part of architecture:

- prune columns and partitions;
- aggregate repeated dashboard work;
- compact files and expire obsolete snapshots safely;
- cap exploratory queries and backfills;
- choose batch over streaming when latency brings no value;
- delete unused models and tables through an ownership process.

Optimizing only cloud cost can externalize engineer time and reliability risk. Track total cost of ownership and user value.

## Guided practice

A daily revenue mart is fresh and passes schema tests, but finance reports 4% more revenue than the payment processor. Create an incident response and prevention plan.

## Worked solution

Declare the mart unsafe, pause downstream publication or visibly mark it, preserve affected run artifacts, and compare processor settlement controls with each pipeline stage by date, currency, status, and payment id. Check duplicate retries, one-to-many joins, timezone boundaries, refunds, and late settlement. Restore the last known-good report or publish processor controls with caveats. Correct idempotently and notify every identified consumer. Add end-to-end count and amount reconciliation with tolerance, unique ledger movement keys, join-cardinality tests, currency handling, owner and runbook, an SLO for reconciliation, and a release comparison for metric logic changes. The incident closes only after downstream corrections are verified.`,
      [
        check(
          'What makes a data contract broader than a schema?',
          [
            'It includes semantics, ownership, service, change, and policy',
            'It removes the need for any runtime validation checks',
            'It guarantees that consumers use data only for causal analysis',
            'It requires every dataset to have the same update frequency'
          ],
          0,
          'Types are one part of a usable contract. Meaning, grain, timeliness, compatibility, ownership, and governance determine fitness.'
        ),
        check(
          'What is the difference between an SLI and an SLO?',
          [
            'An SLI is a legal penalty while an SLO is a table schema',
            'An SLI is the measurement; an SLO is its target over a window',
            'An SLI is always qualitative while an SLO is always financial',
            'An SLI applies to batch systems and an SLO only to streaming'
          ],
          1,
          'The indicator is what can be measured, such as freshness. The objective states the desired performance and evaluation period.'
        ),
        check(
          'Why is a stable hash of a user id not necessarily anonymous?',
          [
            'Hash functions always store the original text beside the digest',
            'A stable digest automatically exposes the encryption key',
            'It enables linkage and may be guessed from a small identifier space',
            'Hashed values cannot be used in joins between controlled tables'
          ],
          2,
          'Pseudonymous stable identifiers retain linkability, and unsalted low-entropy inputs can be enumerated. Privacy obligations may still apply.'
        ),
        check(
          'What is the first priority during a harmful data incident?',
          [
            'Delete every log so the bad values cannot be viewed again',
            'Continue publication until the exact root cause is proven',
            'Tune unrelated queries to reduce the next compute invoice',
            'Contain propagation while preserving evidence and communicating impact'
          ],
          3,
          'Containment limits further harm; preserved evidence and early scope communication support recovery and investigation.'
        )
      ]
    ),
    lesson(
      'capstone-analytics-platform',
      'Capstone: build a local analytics platform',
      `# Capstone: build a local analytics platform

This project integrates Python, SQL, files, modeling, testing, orchestration principles, and operations on one machine. It is deliberately local so you can complete every layer without a cloud account. The architecture scales conceptually because its contracts are explicit.

## Mission

Build a media-service analytics platform from three sources:

- \`users.csv\`: current user id, country, plan, plan update time;
- \`titles.jsonl\`: title id, title, genre, release date;
- daily \`play_events_YYYY-MM-DD.jsonl\`: event id, user id, title id, event time, ingestion time, minutes, platform, error flag.

Use Python for ingest and manifests, Parquet for landed typed data, DuckDB for SQL transformation, and a command-line runner for explicit intervals. Synthetic input is acceptable; generate at least 10,000 events with duplicates, nulls, one late day, and one schema error so failure paths are exercised.

## Required repository

\`\`\`text
data-platform/
  README.md
  requirements.txt
  data/raw/
  data/landing/
  data/published/
  manifests/
  src/generate.py
  src/ingest.py
  src/build.py
  src/validate.py
  src/run.py
  sql/staging/
  sql/intermediate/
  sql/marts/
  tests/
  reports/
\`\`\`

## Contracts

Landing preserves raw source plus a manifest with checksum, bytes, schema version, source interval, row count, reject count, and run id. Typed Parquet rows retain source filename and ingest run id. Invalid records go to a reject dataset with reason codes.

Build these models:

- \`stg_play_event\`: one row per accepted event id;
- \`dim_title\`: one row per title;
- \`dim_user_plan\`: effective-dated plan versions reconstructed from daily snapshots or generated change events;
- \`fct_playback_session\`: event grain resolved to plan at event time;
- \`mart_title_daily\`: date-title grain with starts, users, minutes, errors, and error-rate components;
- \`mart_cohort_weekly\`: signup cohort-week grain with eligible users and retained users.

## Required behavior

The command \`python -m src.run --start 2026-08-01 --end 2026-08-08\` must be idempotent. Write candidate output to a run-specific path, validate, then atomically publish a manifest naming the complete version. Reprocess a configurable late-arrival window. Support a clean rebuild and prove it matches incremental output.

Tests must cover unique keys, required fields, accepted platform and error values, dimension relationships, nonoverlapping plan versions, nonnegative measures, partition completeness, event-to-mart reconciliation, and a known cohort fixture. Simulate failure after candidate write and prove readers still see the prior complete publication.

## Questions the final report must answer

- Which titles have high completion engagement without high playback error?
- How does day-7-through-13 retention vary by signup cohort and initial plan?
- Did the intentionally late events correct historical dates after replay?
- What data would be unsafe for causal conclusions and why?
- Which step dominates runtime and what measurement supports that answer?

## Mastery rubric

Beginner completion means the scripts run and models have correct grain. Intermediate completion adds idempotency, rejects, tests, and explicit intervals. Advanced completion adds point-in-time dimensions, atomic publication, incremental-full equivalence, failure simulation, lineage documentation, and a measured optimization. Mastery means another person can clone the project, generate inputs, run it twice, recover a failed run, explain every metric, and obtain the same published results without asking you an undocumented question.

## Guided practice

Before coding, write the run state machine and publication boundary. Name what happens when ingestion, transformation, validation, or publication fails.

## Worked solution

A run begins \`created\`, writes immutable raw manifests, becomes \`landed\`, builds only under \`published/_candidates/<run_id>\`, then becomes \`validated\` after every contract and reconciliation passes. Publication writes an immutable version manifest and atomically replaces one small \`CURRENT\` pointer, then marks \`published\`. Failure leaves status and diagnostics but never moves \`CURRENT\`; retry reuses or safely replaces deterministic run artifacts. The next run reads only \`CURRENT\`, never lists a half-built prefix. Backfill uses explicit partitions and the same path. This state model is the core solution; tool syntax is secondary.`,
      [
        check(
          'What is the publication boundary in the capstone?',
          [
            'An atomic pointer from readers to one validated complete version',
            'The first candidate Parquet file appearing in its directory',
            'The moment raw generation starts writing source events',
            'A notebook cell displaying one aggregate without errors'
          ],
          0,
          'Readers must remain on the previous complete version until the entire candidate passes and one atomic metadata switch publishes it.'
        ),
        check(
          'What proves incremental correctness most strongly?',
          [
            'The incremental run finishes faster than the full rebuild',
            'Its published tables match a clean rebuild for the same inputs',
            'It writes fewer log lines than the initial historical run',
            'Its output contains at least one partition for every month'
          ],
          1,
          'A clean rebuild removes accumulated state. Equality at declared grain exposes missed late records, stale rows, and boundary errors.'
        ),
        check(
          'Why reconstruct effective-dated plan versions?',
          [
            'To make every user appear under every possible plan',
            'To reduce the event fact to one row per current user',
            'To join an event to the plan that was valid when it occurred',
            'To avoid storing event timestamps in the fact table'
          ],
          2,
          'Current user state rewrites historical context. Effective intervals make the fact join point-in-time correct.'
        ),
        check(
          'What should a simulated candidate-write failure do?',
          [
            'Move the reader pointer to the incomplete candidate for inspection',
            'Delete the previous publication before starting its retry',
            'Suppress the error and mark the run published for continuity',
            'Leave readers on the prior version and preserve failure evidence'
          ],
          3,
          'Candidate isolation means failed work is diagnosable without corrupting the stable consumer view.'
        )
      ]
    ),
    lesson(
      'capstone-ml-and-streaming',
      'Capstones: production ML and real-time reliability',
      `# Capstones: production ML and real-time reliability

The final two projects share the analytics platform but exercise different production constraints. Complete both, then use the review checklist as your mastery examination.

## Capstone A: churn intervention system

At each Monday 00:00 UTC, rank active users by probability of canceling during the next 28 days. A team can contact 500 users weekly. Use only data available before the scoring cutoff.

Build:

- a label generator with explicit eligibility and full follow-up;
- point-in-time features for 7-day and 28-day activity, errors, recency, plan, and tenure;
- prevalence, rule, and simple model baselines;
- a full preprocessing pipeline and at least logistic and boosted-tree candidates;
- expanding-time validation with account-aware leakage tests;
- top-500 precision, recall, lift, calibration, expected value, and group slices;
- a threshold or ranking policy with contact and discount costs;
- a versioned batch model bundle and score table;
- shadow comparison, monitoring, delayed-outcome evaluation, and rollback plan.

Add one deliberate leaked feature, show its unrealistic validation gain, and write a test that removes it from the feature contract. Then simulate an upstream platform field becoming 80% missing and show which alert fires before scoring affects users.

### Reference solution

Rows are user-cutoff pairs; labels look forward 28 days while features stop strictly before cutoff. Reserve the latest three complete cohorts for final test and use earlier expanding folds. Fit every transformation inside folds. Choose the policy from out-of-fold predictions, then evaluate once on final cohorts. The score table stores user, cutoff, model version, probability, rank, eligibility, and policy. Publication is batch and idempotent. Shadow scores compare distribution and rank overlap before activation. Monitoring covers job, feature, score, action, calibration, value, and group impact. Rollback restores the last model-feature-policy bundle and can fall back to a recency rule.

## Capstone B: streaming playback reliability

Build a local event-log simulation that detects title-platform error incidents within five minutes while handling duplicate, late, and out-of-order events. Kafka is optional for execution; an append-only JSONL log with per-partition offsets is enough to implement the semantics offline.

Create:

- partitioning by stable title key and an immutable event id;
- event time, ingestion time, and per-partition offset;
- at-least-once replay with an idempotent sink;
- five-minute event-time windows with an explicit watermark;
- bounded deduplication and state expiry;
- provisional and final alerts keyed by title-platform-window;
- a correction path for events beyond the watermark;
- checkpoints, restart recovery, lag and state monitoring;
- a batch reconciliation that produces the official daily metric.

Inject a crash after sink write but before offset commit, a hot title producing 40% of traffic, and a 30-minute network delay. Prove no business alert duplicates, explain what arrives provisionally or by correction, and show how hot-key pressure appears.

### Reference solution

The sink upserts by title, platform, window start, and alert version, so replay replaces rather than duplicates. Source offsets commit only after sink state is durable; the injected crash repeats computation safely. A measured 20-minute watermark closes ordinary windows, while later events enter a correction stream and the daily batch rebuild becomes authoritative. State expires after watermark plus correction margin. The hot key remains one ordering unit and may need internal two-stage partial aggregation without breaking final key order. Metrics include partition lag in time, processing latency, watermark delay, state bytes, dedup hits, late count, correction count, alerts, and sink errors.

## Mastery examination

Without notes, explain and then verify in code or diagrams:

- the grain and point-in-time boundary of every dataset;
- why a retry cannot duplicate a business effect;
- how a future, group, and final holdout differ;
- which metric connects each model to capacity and cost;
- how late data changes batch and streaming outputs;
- where schema, quality, privacy, and access are enforced;
- how to backfill without harming current service;
- what is observed, what alerts, who owns it, and how rollback works;
- which claim is descriptive, predictive, experimental, or causal;
- which complexity you would remove first at one-tenth the scale.

You have reached practical mastery when you can build both systems, deliberately break them, recover without data loss or duplicate action, explain uncertainty and limitations, and defend simpler alternatives. Mastery is not memorizing every library call; it is preserving meaning and correctness as data crosses time, systems, people, and failure.

## Guided practice

Write a launch review for both capstones with one page each covering decision, contract, validation, failure modes, security, monitoring, rollback, cost, and unresolved risk.

## Worked solution

Approve only when every model input has a source owner and cutoff test, evaluation matches deployment, action capacity and harm are explicit, artifacts and schemas are versioned, sensitive fields have least-privilege access and retention, retry and backfill have passed failure injection, service and data SLIs have thresholds and owners, and rollback was rehearsed. Keep unresolved risks visible with severity, owner, mitigation, and decision date. A launch review that says "tests pass" without naming these boundaries is incomplete.`,
      [
        check(
          'What is the correct row identity for weekly churn training?',
          [
            'One eligible user at one historical scoring cutoff',
            'One future cancellation event with all later account data',
            'One current user row reused unchanged for every past week',
            'One playback event labeled by its own error flag'
          ],
          0,
          'A user-cutoff row creates the same information boundary and horizon the weekly production score will face.'
        ),
        check(
          'How does the streaming sink prevent duplicate business alerts after replay?',
          [
            'It commits offsets before writing any alert state',
            'It upserts using a stable title-platform-window-version key',
            'It assumes the event source never retries a message',
            'It assigns a new random alert identity on every attempt'
          ],
          1,
          'A deterministic business key makes repeated processing converge on one logical alert even if physical attempts repeat.'
        ),
        check(
          'What is the role of batch reconciliation in the streaming capstone?',
          [
            'It deletes the source log once the first provisional alert fires',
            'It changes every event time to its ingestion time',
            'It rebuilds authoritative metrics including events beyond live lateness bounds',
            'It removes the need for any live checkpoint or state management'
          ],
          2,
          'Low-latency output uses bounded waiting. A later batch can incorporate all arrived history and correct the official record.'
        ),
        check(
          'Which outcome best demonstrates course mastery?',
          [
            'Reciting the default parameters of every named software package',
            'Selecting the largest architecture for every possible dataset',
            'Producing one high training score without a deployment contract',
            'Building, breaking, recovering, and defending both systems end to end'
          ],
          3,
          'Mastery integrates semantics, evaluation, systems, failure, governance, and judgment rather than memorizing APIs.'
        )
      ]
    )
  ]
}
