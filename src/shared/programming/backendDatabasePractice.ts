import type { LearningUnit } from '../learningEvidence'

export const BACKEND_DATABASE_PRACTICE: Record<string, LearningUnit> = {
  'backend-distributed-systems': {
    id: 'backend-distributed-systems',
    title: 'Backend and distributed systems: applied evidence check',
    body: `# Before you begin

Complete the lessons through transactions, messaging, ordering, replication, and resilience. These exercises check whether you can trace a concrete operation through concurrency and partial failure. Use only the assumptions stated in each prompt. Enter the exact short result requested; spaces, punctuation, and capitalization matter.

## Worked example

A service has two workers and a queue with two waiting slots. Jobs J1 and J2 are running, while J3 and J4 are waiting. A fifth job cannot be admitted without breaking the bound. If the overload contract returns HTTP 503, enter:

\`503\`

The count includes both running and waiting work. Adding another in-memory item would hide overload rather than handle it.`,
    practice: [
      {
        id: 'backend-practice-idempotency-counts',
        prompt: 'Request K commits one payment row and one outbox row, but its HTTP response is lost. The identical request K retries and returns the stored result. Enter the final row counts exactly as `PAYMENTS OUTBOX`.',
        answers: ['1 1'],
        explanation: 'The request identity makes the retry return the committed outcome. It does not repeat either durable insert.'
      },
      {
        id: 'backend-practice-fencing-trace',
        prompt: 'Worker A holds fencing token 14 and pauses. Worker B receives token 15 and commits the job. A resumes and the job store rejects tokens below 15. Enter the accepted worker and final token exactly as `WORKER TOKEN`.',
        answers: ['B 15'],
        explanation: 'The protected store accepts the newer authority and fences A even if A still believes its old lease is valid.'
      }
    ],
    transfer: [
      {
        id: 'backend-transfer-budget-result',
        prompt: 'A stable service receives 250 requests per second and average end-to-end time is 0.16 seconds. Using Little’s Law, enter the average in-flight request count as one integer.',
        answers: ['40'],
        explanation: 'Average concurrency is throughput multiplied by time: 250 × 0.16 = 40.'
      },
      {
        id: 'backend-transfer-queue-offset',
        prompt: 'A consumer has durably applied offsets 20 and 21. Processing offset 22 fails before any durable effect, and the process restarts. Enter the first offset it must process after restart as one integer.',
        answers: ['22'],
        explanation: 'Only work through 21 was durably applied and checkpointed. Offset 22 must be delivered again.'
      }
    ]
  },
  'database-engineering': {
    id: 'database-engineering',
    title: 'Database engineering: applied evidence check',
    body: `# Before you begin

Complete the lessons through relational design, SQL, transactions, indexing, recovery, and operations. Read each declared schema and schedule literally. SQL results have no guaranteed order unless the prompt states an \`ORDER BY\`. Enter only the exact row, count, or schedule result requested.

## Worked example

Table \`task(id, state)\` contains \`(1,'ready')\`, \`(2,'done')\`, and \`(3,'ready')\`. For \`SELECT count(*) FROM task WHERE state='ready'\`, enter:

\`2\`

\`count(*)\` counts the two qualifying rows. The text is compared exactly under the prompt’s stated values, and no unstated rows exist.`,
    practice: [
      {
        id: 'database-practice-left-join-result',
        prompt: 'Members are M1 and M2. Tracking rows are `(M1,A)` and `(M1,B)`; M2 has none. A query starts from member, left joins tracking, groups by member, and returns `member_id, count(tracking.media_id)` ordered by member_id. Enter both rows exactly as `M1:COUNT M2:COUNT`.',
        answers: ['M1:2 M2:0'],
        explanation: 'The left join retains M2, and count of the nullable joined column is zero when no tracking row matches.'
      },
      {
        id: 'database-practice-write-skew',
        prompt: 'Admins A and B are active. Under snapshot isolation, transaction X reads count 2 and deactivates A; Y reads count 2 and deactivates B. They update different rows and both commit. Enter the final active-admin count as one integer.',
        answers: ['0'],
        explanation: 'The disjoint writes do not conflict, but the combined result violates the cross-row invariant. This is write skew.'
      }
    ],
    transfer: [
      {
        id: 'database-transfer-cursor-result',
        prompt: 'Rows ordered by `(created_at,id)` are `(10,a) (10,b) (11,c) (12,d)`. A page of two rows ended at cursor `(10,b)`. Enter the ids on the next page of size two exactly as `ID ID`.',
        answers: ['c d'],
        explanation: 'The next predicate is `(created_at,id) > (10,b)`, so the deterministic next rows are c and d.'
      },
      {
        id: 'database-transfer-recovery-point',
        prompt: 'A destructive transaction commits at log sequence 906. The required state is immediately before it. Logs are complete through 940. Enter the final log sequence to replay as one integer.',
        answers: ['905'],
        explanation: 'Point-in-time recovery must stop before the destructive transaction, so sequence 905 is the last applied record.'
      }
    ]
  }
}
