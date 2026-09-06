import type { ProgQuestion } from './types'

interface LessonPractice {
  practice: string
  solution: string
  questions: ProgQuestion[]
}

const text = (...lines: string[]): string => lines.join('\n')

export const BACKEND_DISTRIBUTED_PRACTICE: Record<string, LessonPractice> = {
  'backend-contracts': {
    practice: text(
      'Build a paper contract for `POST /reservations`. Use this input and assume only two seats remain:',
      '```json',
      '{"showId":"s7","seats":2,"requestId":"r44"}',
      '```',
      'Write the validation result for `seats` values 0, 2, and 3; the authorization check; one transaction invariant; the stored idempotency key; the success status and body; and the response to an identical retry. Include a 500 ms database deadline and name the metric emitted on timeout.'
    ),
    solution: text(
      'Accept only an integer from 1 through 4, so 0 is `400`, 2 is valid, and 3 is valid syntactically but may lose the capacity race. Check that the caller may reserve for `s7`. In one transaction, insert `(caller,r44)` once and conditionally decrement seats with `remaining >= 2`; store the resulting `201` response beside that key. The identical retry returns the stored response without another decrement. A database deadline returns an unavailable error with an unknown-outcome-safe retry contract and increments `reservation_db_timeout_total`. Test two concurrent requests for two seats: exactly one succeeds and remaining capacity is zero.'
    ),
    questions: [
      { prompt: 'A client repeats request r44 after losing the response. What should the service do?', options: ['Run the reservation again after checking current capacity', 'Return the response stored for caller and request r44', 'Reject every repeated request as malformed input', 'Create a second reservation and reconcile it overnight'], correct: 1, explain: 'The caller-scoped idempotency record makes a retry return the original outcome without repeating the durable effect.' },
      { prompt: 'Which test proves the limited-seat invariant at the service boundary?', options: ['Two concurrent valid requests leave capacity nonnegative', 'One sequential request returns before the configured timeout', 'A mocked repository reports that decrement was called', 'The JSON schema rejects a missing show identifier'], correct: 0, explain: 'Concurrent requests exercise the race; the durable postcondition is that successful reservations never exceed capacity.' },
      { prompt: 'Where should the authorization decision occur for POST /reservations?', options: ['After committing, so unauthorized writes can be audited', 'Inside the client, because it already knows the user identity', 'Before the protected transaction using authenticated identity', 'In a nightly job that removes forbidden reservations'], correct: 2, explain: 'The backend must authorize the authenticated principal before changing protected state; client checks are only presentation.' },
      { prompt: 'What does a successful 201 response contractually mean here?', options: ['The handler reached its final source-code line', 'The database driver accepted one SQL statement', 'A worker will probably attempt the operation later without proof', 'The reservation outcome is durable and retrievable by r44'], correct: 3, explain: 'A success response promises a durable business outcome, including a stable result for later retries and reads.' }
    ]
  },
  'api-design': {
    practice: text(
      'Design one page of `GET /jobs?limit=2&after=...` for rows `(created_at,id)` equal to `(10,a)`, `(10,b)`, `(11,c)`, `(12,d)`. Write the SQL predicate and ordering, the first response, and the cursor decoded for the next request. Then add an optional `priority` response field without breaking an older client.'
    ),
    solution: text(
      'Use `ORDER BY created_at, id LIMIT 3` and, after a cursor, `WHERE (created_at,id) > (?,?)`. The first page contains `a,b`, reports `hasMore: true`, and encodes `(10,b)` in an opaque signed cursor; the next page begins at `c`. Fetching one extra row establishes `hasMore`. Add nullable `priority` while preserving every existing field and meaning. Reject malformed or expired cursors as a client error rather than silently restarting at page one.'
    ),
    questions: [
      { prompt: 'Why must the cursor include both created_at and id?', options: ['To compress every job into the URL-safe token', 'To give tied timestamps a stable unique position', 'To let clients edit the database sort expression', 'To avoid authenticating requests after the first page'], correct: 1, explain: 'The unique id breaks timestamp ties, preventing duplicated or skipped rows between pages.' },
      { prompt: 'An old client ignores a newly added nullable priority field. Is the change compatible?', options: ['Yes, if existing fields and meanings remain stable', 'Yes, but only if every old row receives priority zero', 'No, every response-field addition requires a new host', 'No, JSON clients must reject fields they do not know'], correct: 0, explain: 'Adding an optional response field is normally backward compatible when old fields retain their contract.' },
      { prompt: 'What should a service do with a cursor whose signature is invalid?', options: ['Treat it as the beginning of the collection', 'Run the decoded bytes directly as a query value', 'Return a clear invalid-cursor client error', 'Guess the nearest valid timestamp and continue'], correct: 2, explain: 'A tampered or malformed cursor is invalid input; silently restarting produces surprising duplicates and hides misuse.' },
      { prompt: 'Which response best supports clients during a deprecation window?', options: ['Remove the old field when the server deploys without notice', 'Change the field meaning but retain its old name', 'Return different shapes from identical requests', 'Publish a deadline and measure remaining old-version use'], correct: 3, explain: 'A dated, measured migration lets owners contact remaining consumers before removing the compatibility path.' }
    ]
  },
  'domain-data': {
    practice: text(
      'Model a wallet transfer of 30 from account A with balance 50 to B with balance 10. List aggregate boundaries, write the invariant and a three-statement transaction using conditional SQL, and state the expected balances. Repeat the trace when A has balance 20.'
    ),
    solution: text(
      'The invariant is `balance >= 0` and total money is conserved. Begin a transaction; run `UPDATE account SET balance=balance-30 WHERE id=\'A\' AND balance>=30`; require one changed row; then update B by 30 and insert a transfer record with a unique request id; commit. Expected balances are A=20 and B=40. With A=20 the first update affects zero rows, so roll back and leave A=20, B=10. Concurrent tests assert one request id creates one transfer.'
    ),
    questions: [
      { prompt: 'Which database action decides the insufficient-funds race safely?', options: ['Read A in one request and update it in another', 'Conditionally decrement A where balance is sufficient', 'Cache A and reconcile any negative value tomorrow', 'Lock only B because it receives the transferred value'], correct: 1, explain: 'The conditional update combines the check and state change under the transaction, so stale reads cannot overspend A.' },
      { prompt: 'What is the row grain of the transfer record?', options: ['One durable attempted business transfer identity', 'One current balance shared by every account', 'One HTTP response field for the destination user', 'One daily total reconstructed without source events'], correct: 0, explain: 'A transfer row represents one identified business operation; balances are separate current-state facts.' },
      { prompt: 'Why retain a unique request id on a transfer?', options: ['It sorts transfers by their monetary amount', 'It encrypts the account identities at query time', 'It prevents one logical request creating two transfers', 'It replaces the transaction around both balance updates'], correct: 2, explain: 'A uniqueness constraint lets repeated delivery converge on the existing business operation.' },
      { prompt: 'Which result shows conservation for the successful example?', options: ['A=20 and B=10 after committing the debit', 'A=50 and B=40 after committing the credit', 'A=-10 and B=70 after both updates complete', 'A=20 and B=40 with the same total of 60'], correct: 3, explain: 'Thirty moves between accounts, so the two balances change while their combined total remains 60.' }
    ]
  },
  concurrency: {
    practice: text(
      'Trace a bounded worker pool with two workers and queue capacity two. Jobs J1 and J2 run; J3 and J4 wait; J5 arrives. Record the queue and admission result after each arrival, then state what happens when J1 completes. Add a per-caller limit that prevents one caller occupying all four slots.'
    ),
    solution: text(
      'After J1: running `[J1]`; after J2: `[J1,J2]`; J3 and J4 occupy the two waiting slots. J5 must receive overload or wait only within a defined admission deadline; an unbounded append violates the memory limit. When J1 completes, J3 starts and one queue slot opens. Reserve capacity fairly or enforce, for example, at most two admitted jobs per caller. Cancellation removes queued work and running work checks its signal before committing.'
    ),
    questions: [
      { prompt: 'What is the correct admission result when both workers and both queue slots are occupied?', options: ['Spawn an untracked fifth worker for this incoming request', 'Append J5 to an unbounded in-memory backlog', 'Reject or briefly wait under an explicit deadline', 'Drop J3 so the newest request can always proceed'], correct: 2, explain: 'Bounded admission preserves resource limits; overload must be visible or subject to a finite waiting contract.' },
      { prompt: 'Which state must a mutex protect in this worker-pool example?', options: ['The shared queue and transitions into worker slots', 'Every network request across the entire application', 'Immutable job payloads after they have been decoded', 'Independent computation performed inside each job'], correct: 0, explain: 'Queue membership and slot assignment are shared mutable state whose transitions must be atomic.' },
      { prompt: 'Why is a per-caller admission limit useful?', options: ['It makes every job execute in global arrival order', 'It prevents one caller consuming all bounded capacity', 'It guarantees a remote dependency will never fail', 'It removes the need for cancellation and timeouts'], correct: 1, explain: 'Fairness limits stop a noisy caller from starving unrelated work while retaining the system-wide bound.' },
      { prompt: 'When should a cancelled running job stop?', options: ['Only after it commits every remaining side effect', 'Whenever a different caller submits newer work', 'After the process exhausts the entire global queue', 'At safe checkpoints before its next durable effect'], correct: 3, explain: 'Cooperative cancellation checks at safe boundaries and must not abandon a partially committed invariant.' }
    ]
  },
  'transactions-idempotency': {
    practice: text(
      'Trace payment request `p9` through tables `idempotency`, `payment`, and `outbox`. The database commits but the HTTP response is lost; the client retries and the publisher delivers the event twice. Write the row counts after every step and the consumer rule.'
    ),
    solution: text(
      'The first transaction inserts one `idempotency(p9,payload_hash,response)`, one payment, and one outbox event, then commits. Lost acknowledgement changes no rows. The retry matches the hash and returns the stored response: counts remain 1,1,1. The publisher may send the same stable event id twice. Each consumer inserts that event id into its inbox or uses it as a unique effect key in the same transaction as its effect, so the business effect count remains one.'
    ),
    questions: [
      { prompt: 'The same idempotency key arrives with a different amount. What is the safe response?', options: ['Return the first result despite the changed payload', 'Reject the key because its payload hash conflicts', 'Create a second payment under the existing key', 'Delete the prior record and execute the new amount'], correct: 1, explain: 'Binding the key to a payload hash prevents accidental key reuse from changing the meaning of an established operation.' },
      { prompt: 'Why insert the payment and outbox event in one transaction?', options: ['So committed state always has its event to publish', 'So the broker participates in the SQL commit protocol', 'So consumers receive the event before payment commits', 'So publishing can no longer produce duplicates'], correct: 0, explain: 'The atomic write closes the gap where payment commits but its notification event is never recorded.' },
      { prompt: 'What does at-least-once delivery require from the consumer?', options: ['Assume the broker filters every repeated event', 'Acknowledge before doing any durable consumer work', 'Deduplicate the effect by the stable event identity', 'Generate a new identity for each delivery attempt'], correct: 2, explain: 'Repeated deliveries are allowed, so durable effect and deduplication must commit together under one event identity.' },
      { prompt: 'After a lost HTTP response, how many payment rows should the retry leave?', options: ['Zero, because the caller did not observe success', 'Two, because both handler attempts executed', 'An unknown count requiring manual reconciliation', 'One, returned through the stored request outcome'], correct: 3, explain: 'The committed idempotency record makes the unknown client outcome safely discoverable without repeating payment.' }
    ]
  },
  'queues-events': {
    practice: text(
      'Assign these order events to three partitions using `orderId`: O1-created, O2-created, O1-paid, O3-created, O2-cancelled. Write each partition sequence under any explicit mapping, then trace consumer offset behavior when O1-paid fails twice and is quarantined on the third attempt.'
    ),
    solution: text(
      'One valid mapping is O1 to P0, O2 to P1, O3 to P2. P0 is `[O1-created,O1-paid]`, P1 is `[O2-created,O2-cancelled]`, and P2 is `[O3-created]`; exact partition numbers do not matter, stable keys do. The consumer commits the O1-created offset after its durable effect. It does not skip O1-paid on transient failures. After the bounded third failure it records the event and reason in quarantine, advances according to the documented poison policy, and alerts. Replay uses the same event id after correction.'
    ),
    questions: [
      { prompt: 'Which message key preserves order for changes to one order?', options: ['The consumer process id chosen at startup', 'The order id shared by that order’s events', 'The wall-clock second when publishing begins', 'A new random partition key for every message'], correct: 1, explain: 'A stable order id routes related events to the same partition where their append order is preserved.' },
      { prompt: 'When may a consumer checkpoint an event safely?', options: ['After its durable effect and dedup record commit', 'Immediately after receiving bytes from the broker', 'Before validating the message schema version', 'Whenever queue depth exceeds a warning threshold'], correct: 0, explain: 'Checkpointing after the durable effect avoids losing work when the consumer crashes between receipt and commit.' },
      { prompt: 'Which metric reveals a stuck old message better than queue depth alone?', options: ['Number of topics configured in the cluster', 'Average encoded payload length at the producer', 'Age of the oldest uncompleted message', 'Count of healthy consumer process identifiers'], correct: 2, explain: 'A shallow queue can still contain one very old poison item; oldest age measures that user-visible delay.' },
      { prompt: 'What is required before replaying a quarantine backlog?', options: ['Delete original event ids to avoid collisions', 'Increase every consumer retry loop without a cap', 'Replay at maximum broker throughput immediately', 'Correct the cause and throttle against downstream health'], correct: 3, explain: 'Controlled replay preserves identities and prevents the recovered backlog from overwhelming dependencies.' }
    ]
  },
  caching: {
    practice: text(
      'Construct cache keys for tenant T7 reading media M2 under permission versions 4 and 5. Trace a cache-aside miss, a role revocation, and the next read. Then show a safe immutable artwork key for bytes whose digest is `abc123`.'
    ),
    solution: text(
      'Use a key such as `media:T7:M2:view-v3:perm-4`. On miss, authorize against the source, read, and fill only that scoped key. Revocation advances permission version to 5 or explicitly invalidates version 4; the next read cannot reuse the old authorization result and may be denied. The public immutable object can use `art:abc123`, while a mutable alias must revalidate. A key of `media:M2` is unsafe because tenants and permission states collide.'
    ),
    questions: [
      { prompt: 'Which cache key safely scopes a private media representation?', options: ['media:M2 shared by every authenticated caller', 'T7:M2:representation-v3:permission-v4', 'M2:last-reader with no tenant information', 'media:all using the current server process id'], correct: 1, explain: 'Tenant, representation, and authorization version all affect whether the cached value is valid for this read.' },
      { prompt: 'What should happen if the optional cache becomes unavailable?', options: ['Read the source under normal authorization and limits', 'Treat cached copies as the new durable authority', 'Disable authorization until the cache has recovered', 'Accept writes in memory and promise later durability'], correct: 0, explain: 'A derived cache failure should degrade performance while the authoritative path remains correct and bounded.' },
      { prompt: 'How does request coalescing reduce a cache stampede?', options: ['It gives every miss an independent source query', 'It expires all hot keys at exactly the same instant', 'It lets concurrent misses share one in-flight fill', 'It retains negative results without an expiry policy'], correct: 2, explain: 'Coalescing turns simultaneous misses for one key into one source request and shared result.' },
      { prompt: 'Which artwork identifier supports very long immutable caching?', options: ['The most recent editor’s display name', 'A mutable database row number with reused content', 'A short TTL keyed only by requesting tenant', 'A digest derived from the exact artwork bytes'], correct: 3, explain: 'A content digest changes when bytes change, so the old object can remain immutable and cached indefinitely.' }
    ]
  },
  'service-boundaries': {
    practice: text(
      'Draw modules for catalog, ratings, recommendations, and identity in a product owned by one small team. For each module name its data owner and public operation. Add one measurable trigger that would justify extracting recommendations later, and list the migration steps.'
    ),
    solution: text(
      'Keep one deployable application with enforced modules. Catalog owns title metadata and `getTitle`; ratings owns user ratings and `setRating`; identity owns principals and `authorize`; recommendations owns derived suggestions and consumes rating events. Extract recommendations only after evidence such as its compute load blocking transactional releases or a distinct team needing independent operation. Stabilize its contract, publish a backfill plus change stream, copy and validate its derived data, shadow reads, cut traffic gradually, and retain rollback before removing the module path.'
    ),
    questions: [
      { prompt: 'For one small team, what is a sensible initial deployment shape?', options: ['A modular monolith with explicit data ownership', 'One network service for every database table', 'Shared mutable tables used by all future services', 'A synchronous call cycle across four deployments'], correct: 0, explain: 'Modules preserve domain boundaries without paying distributed latency, coordination, and operations costs prematurely.' },
      { prompt: 'Which evidence can justify extracting recommendations?', options: ['A diagram looks cleaner with another rectangle', 'Its workload needs independent scaling and ownership', 'The catalog table has more than ten columns', 'The framework includes a service generator command'], correct: 1, explain: 'Materially different scale, change cadence, ownership, or isolation are concrete reasons to add a service boundary.' },
      { prompt: 'How should another service obtain ratings-owned mutable facts?', options: ['Write directly into the ratings database tables', 'Copy the table nightly without version or owner', 'Use the ratings contract or its published events', 'Import ratings internals as a shared source package'], correct: 2, explain: 'An owned API or event contract preserves authority and allows internal storage to evolve independently.' },
      { prompt: 'Which dependency shape most strongly signals a distributed monolith?', options: ['Asynchronous derived recommendations from rating events', 'One deployment with module-level interface checks', 'A service whose reads tolerate bounded staleness', 'Cyclic synchronous calls requiring coordinated releases'], correct: 3, explain: 'A synchronous cycle couples availability and deployment across services while retaining distributed failure modes.' }
    ]
  },
  'time-order': {
    practice: text(
      'Trace operations A=`add x` on device D1 sequence 8, B=`remove x` on D2 after observing A, and C=`add y` on D3 without observing either. Write the causal relations, identify concurrency, and explain why timestamps 12:00:03, 11:59:58, and 12:00:01 cannot determine truth.'
    ),
    solution: text(
      'A happens before B because B carries a version vector that includes D1:8. C is concurrent with both until synchronization because its vector contains neither operation. The three wall times can be skewed or adjusted, so sorting them may place B before A and cannot establish observation. Apply B after A so x is removed; merge C independently so y is present. Stable operation ids deduplicate replay, and tombstones remain until all supported replicas have crossed their causal horizon.'
    ),
    questions: [
      { prompt: 'What establishes that remove B happened after add A?', options: ['B’s causal metadata records that it observed A', 'B has a lexicographically larger device name', 'B arrived at one server during a later second', 'B contains fewer payload bytes than operation A'], correct: 0, explain: 'Causal metadata captures observation; wall-clock order or arrival order alone does not prove happens-before.' },
      { prompt: 'Why can wall time not safely choose the winning edit?', options: ['UTC timestamps cannot be stored in a database', 'Machine clocks can differ or jump between writes', 'Every device produces timestamps with equal values', 'A timestamp always includes a complete version vector'], correct: 1, explain: 'Clock skew and adjustment can order timestamps differently from the causal sequence of user actions.' },
      { prompt: 'What does a tombstone represent in this merge?', options: ['A cache entry whose TTL has not yet expired', 'A network request waiting for DNS resolution', 'A durable removal needed to defeat an old add', 'A lease granting one server permanent ownership'], correct: 2, explain: 'The removal marker must survive long enough that an offline replica cannot resurrect the deleted item.' },
      { prompt: 'Which pair is concurrent in the stated trace?', options: ['A and B, because they occurred on different devices', 'B and A, because their timestamps are out of order', 'No pair, because a server can assign a total sequence', 'C and B, because neither observed the other'], correct: 3, explain: 'C has no causal relation to A or B; a later server ordering does not change that original concurrency.' }
    ]
  },
  'replication-consistency': {
    practice: text(
      'Assign consistency contracts to three operations: claim username `nova`, increment a public view count, and read a profile immediately after editing it. For each, state the result during a writer-to-replica partition and how the client learns freshness.'
    ),
    solution: text(
      'Username claim uses one linearizable conditional authority and may reject or remain unavailable during a partition rather than create duplicates. View increments carry event ids, may queue locally, and converge by deduplicated aggregation. The editor receives profile version 19 and reads from the writer or a replica known to have replayed at least 19; public readers may accept a documented staleness bound. Expose pending or version state instead of silently sending the editor backward.'
    ),
    questions: [
      { prompt: 'Which contract fits unique username registration?', options: ['One strongly consistent conditional-write authority', 'Eventually merge two owners of the same username', 'Read from any replica and accept both claims', 'Use client timestamps to select the later claimant'], correct: 0, explain: 'Uniqueness requires serialization at an authority; availability may be reduced during a partition to prevent duplicates.' },
      { prompt: 'How can view counts tolerate repeated increment delivery?', options: ['Discard every increment received after a failover', 'Aggregate events while deduplicating stable event ids', 'Require one global lock for every page impression', 'Trust each replica’s wall clock as a unique key'], correct: 1, explain: 'Event identities let independently processed increments converge without counting retransmission twice.' },
      { prompt: 'What gives an editor read-your-writes on profile version 19?', options: ['Choose a random replica for every subsequent read', 'Wait a fixed ten milliseconds after the update', 'Route to a node known to serve at least version 19', 'Remove the version from the update response body'], correct: 2, explain: 'A version fence ties routing to observed replication progress rather than an unreliable delay.' },
      { prompt: 'Why is a live replica not a sufficient backup?', options: ['Replicas cannot answer read-only queries', 'Replication always encrypts data with one lost key', 'A replica stores only indexes and no table rows', 'Deletion or corruption can propagate to every replica'], correct: 3, explain: 'Replication improves availability, but it faithfully copies harmful changes and therefore needs independent recovery copies.' }
    ]
  },
  'consensus-coordination': {
    practice: text(
      'Trace scheduler S1 acquiring lease token 41, pausing past expiry, and S2 acquiring token 42. Both then attempt `UPDATE job SET owner_token=?`. State which writes succeed and write the resource-side predicate that fences stale S1.'
    ),
    solution: text(
      'S1 may believe it is still owner after resuming, so lease checking in S1 is insufficient. The job store retains the highest accepted token and executes an update only when the presented token is at least that value, atomically advancing it. S2 with 42 succeeds. S1 with 41 affects zero rows and must stop. Jobs still carry stable attempt ids because S1 may have completed work before losing authority and delivery may repeat.'
    ),
    questions: [
      { prompt: 'Why does a lease alone not stop paused scheduler S1?', options: ['The process can resume unaware that its lease expired', 'Consensus clocks always move backward after renewal', 'A lease grants authority permanently once acquired', 'The protected job store cannot compare integers'], correct: 0, explain: 'A paused process cannot observe expiry while paused and may resume with stale assumptions unless the resource fences it.' },
      { prompt: 'Which token must the job store accept after S2 takes over?', options: ['Any token previously issued to scheduler S1', 'Token 42 while rejecting the older token 41', 'Only token 41 because it was created first', 'A random token chosen separately for each write'], correct: 1, explain: 'Monotonically increasing fencing tokens let the resource reject mutations from superseded owners.' },
      { prompt: 'What can a consensus system safely coordinate here?', options: ['Every byte of high-volume job output forever', 'Correctness of arbitrary application commands', 'Lease ownership and the next fencing token', 'Availability even after loss of a majority quorum'], correct: 2, explain: 'Consensus can order the small ownership record; application idempotency and resource checks remain separate.' },
      { prompt: 'What should S1 do when its fenced update affects zero rows?', options: ['Overwrite token 42 using an administrator account', 'Retry token 41 until S2’s lease eventually expires', 'Continue admitting jobs but delay their commits', 'Stop acting as owner and reconcile uncertain attempts'], correct: 3, explain: 'A rejected fencing token proves lost authority; continuing work would risk conflicting owners.' }
    ]
  },
  'partitioning-sharding': {
    practice: text(
      'Place users U1 through U6 into eight virtual partitions using the supplied mapping `U1=0,U2=1,U3=1,U4=4,U5=6,U6=7`; physical node A owns 0-3 and B owns 4-7. Move virtual partition 1 to new node C while writes continue. List copy, catch-up, cutover, and validation checkpoints.'
    ),
    solution: text(
      'Initially A owns U1,U2,U3 and B owns U4,U5,U6. Record routing version 9, copy partition 1 to C at a watermark, and stream later changes from A. Compare row counts and checksums at the watermark, drain or dual-route a bounded final interval, then atomically publish routing version 10 mapping partition 1 to C. Version-aware clients retry stale routes. Observe errors and lag before deleting A’s old copy after rollback expires. Only U2 and U3 move.'
    ),
    questions: [
      { prompt: 'Which users move when virtual partition 1 moves to C?', options: ['U2 and U3 because both map to partition 1', 'U1 through U6 because every route version changes', 'Only U1 because it has the lowest partition number', 'U4 and U5 because they were stored on node B'], correct: 0, explain: 'Virtual partition placement changes independently; only keys mapped to the moved partition need data movement.' },
      { prompt: 'What closes the gap between the initial copy and cutover?', options: ['Ignoring writes received while copying old rows', 'Capturing and applying changes after a watermark', 'Hashing every user again with an unrelated function', 'Deleting the source before comparing destination data'], correct: 1, explain: 'Change capture brings the copied snapshot forward so the destination contains writes that occurred during copying.' },
      { prompt: 'Why attach a version to the routing map?', options: ['It makes every cross-shard join locally executable', 'It guarantees that no shard will become overloaded', 'It lets clients detect and retry stale placement', 'It removes the need to validate copied row counts'], correct: 2, explain: 'A route version distinguishes an old location decision during cutover and supports safe redirect or retry.' },
      { prompt: 'Which workload can still defeat hash balance by user id?', options: ['Six equally active users spread across eight partitions', 'A range scan that names every partition explicitly', 'A checksum computed once after the data copy', 'One celebrity user producing most system traffic'], correct: 3, explain: 'All work for one key remains together, so a single extremely hot identity can dominate its partition.' }
    ]
  },
  resilience: {
    practice: text(
      'Allocate a 900 ms request budget across authentication, catalog, and optional recommendations. Authentication normally uses 80 ms, catalog 250 ms, and recommendations 400 ms. Give each a deadline, one retry policy, and the returned shape when recommendations time out at 350 ms.'
    ),
    solution: text(
      'Reserve roughly 100 ms for ingress and response, then cap authentication at 120 ms, catalog at 300 ms, and optional recommendations at 350 ms while running independent calls concurrently where possible. Fail closed if authentication is unavailable. Catalog is required. Recommendations receive at most one jittered retry only if its operation is idempotent and the remaining shared deadline permits it. At 350 ms return catalog data with `recommendationsUnavailable: true`; cancel obsolete work. Separate pools prevent the optional dependency consuming required capacity.'
    ),
    questions: [
      { prompt: 'Why should retries share the original 900 ms budget?', options: ['So repeated attempts cannot outlive the user request', 'So every dependency receives a full extra second', 'So timeouts prove that no side effect occurred', 'So all callers retry at exactly the same instant'], correct: 0, explain: 'A retry consumes remaining user time and resources; a shared deadline bounds both latency and amplified load.' },
      { prompt: 'What is the safe fallback when authentication is unavailable?', options: ['Serve cached permissions regardless of their age', 'Fail the protected request closed within its deadline', 'Skip identity and return only the requested fields', 'Retry forever because authorization is mandatory'], correct: 1, explain: 'Required authorization cannot degrade to an unverified result; it should fail clearly and within a bounded time.' },
      { prompt: 'How does a bulkhead protect catalog calls?', options: ['It increases the recommendation timeout without limit', 'It converts every response into an asynchronous job', 'It gives optional work a separate bounded resource pool', 'It guarantees the catalog database never becomes slow'], correct: 2, explain: 'Separate pools contain resource exhaustion so slow optional work cannot occupy every slot needed by required work.' },
      { prompt: 'What should the endpoint return after optional recommendations time out?', options: ['An unbounded wait until every dependency recovers', 'A success claiming recommendations were freshly computed', 'A stale authorization decision from a shared cache', 'Catalog data plus an explicit unavailable optional field'], correct: 3, explain: 'A documented partial response preserves required value while making omitted optional data visible to the client.' }
    ]
  },
  observability: {
    practice: text(
      'For 10,000 accepted notification operations, 9,930 reach the correct terminal state within 30 seconds, 40 finish late, and 30 fail. Calculate the 30-second success SLI and consumed error budget for a 99.5% objective. Name trace spans and bounded metric labels across API, outbox, broker, and worker.'
    ),
    solution: text(
      'The SLI is `9930 / 10000 = 99.3%`. A 99.5% objective permits 50 bad operations; 70 were late or failed, so consumption is `70 / 50 = 140%`, exceeding the budget by 20 operations. Use spans `api.accept`, `db.commit`, `outbox.publish`, `broker.receive`, and `worker.notify`, joined by operation and trace ids in logs rather than metric labels. Safe labels include operation type, outcome, region, and release; user or event ids would create unbounded cardinality.'
    ),
    questions: [
      { prompt: 'What is the stated 30-second success SLI?', options: ['99.3%, from 9,930 timely successes of 10,000', '99.5%, because that is the selected objective', '99.7%, counting every operation that did not fail', '70%, from adding forty late and thirty failed'], correct: 0, explain: 'Only correct terminal outcomes within the deadline count as good events, giving 9,930 divided by 10,000.' },
      { prompt: 'How much of the allowed error budget was consumed?', options: ['70%, because seventy operations were not timely', '140%, because seventy bad events exceed fifty allowed', '20%, because the objective missed by two tenths', '50%, because the objective permits fifty bad events'], correct: 1, explain: 'The objective allows 0.5% of 10,000, or 50; 70 divided by 50 consumes 140% of that allowance.' },
      { prompt: 'Which value is unsafe as a metric label?', options: ['A bounded operation type such as notification', 'A small release identifier such as 2026.09', 'A unique user id attached to every request', 'A fixed outcome category such as timeout'], correct: 2, explain: 'Unique user ids create an effectively unbounded time-series set and also raise privacy concerns.' },
      { prompt: 'Which signal connects one operation across all listed components?', options: ['A host CPU average sampled once per minute', 'A queue-depth gauge with no message identity', 'A release counter emitted only by the API', 'Propagated trace context plus safe operation identifiers'], correct: 3, explain: 'Trace context joins causal spans; safe identifiers in logs support precise investigation without exploding metric labels.' }
    ]
  },
  'performance-security': {
    practice: text(
      'A stable endpoint completes 600 requests per second with average end-to-end time 0.20 seconds. Use Little’s Law to estimate average in-flight requests. Then plan capacity for one of three zones lost and identify two authorization tests for tenant-scoped recommendations.'
    ),
    solution: text(
      'Average concurrency is `L = throughput × time = 600 × 0.20 = 120` requests. With three equal zones, losing one requires each survivor to carry half the total, or 300 rps instead of its normal 200 rps, before burst headroom. Load-test at that arrival rate without waiting for prior responses. Security tests use a valid workload identity but a user from another tenant, and a valid user attempting a bulk item id outside their scope; both must be denied and safely audited.'
    ),
    questions: [
      { prompt: 'What average concurrency follows from 600 rps and 0.20 seconds?', options: ['120 in-flight requests under stable conditions', '300 in-flight requests in each healthy zone', '600 in-flight requests regardless of latency', '3,000 in-flight requests from dividing throughput'], correct: 0, explain: 'Little’s Law gives average concurrency as throughput multiplied by average time: 600 times 0.20 equals 120.' },
      { prompt: 'After one of three equal zones fails, what steady share does each survivor carry?', options: ['One third of total traffic, or 200 rps', 'One half of total traffic, or 300 rps', 'All traffic in both zones, or 600 rps each', 'One sixth of total traffic, or 100 rps'], correct: 1, explain: 'Two surviving zones split 600 rps, so each must sustain 300 rps before additional safety margin.' },
      { prompt: 'Which load generator avoids coordinated omission?', options: ['It sends the next request only after a response', 'It pauses arrivals whenever the server becomes slow', 'It schedules arrivals independently of response time', 'It reports only successful requests below the median'], correct: 2, explain: 'Independent arrivals continue representing demand during stalls instead of hiding the requests users would have made.' },
      { prompt: 'Which control prevents cross-tenant recommendation reads?', options: ['A larger cache shared under item id alone', 'Transport encryption without caller authorization', 'A client-supplied tenant name trusted directly', 'Server-side scope checks for user and workload identity'], correct: 3, explain: 'Authenticated identities still need authorization against the tenant and requested resources at the service boundary.' }
    ]
  },
  'capstone-distributed': {
    practice: text(
      'Run this fault trace for job J7: submit succeeds but response is lost; retry arrives; outbox publishes twice; worker W1 leases with token 8 and pauses; W2 receives token 9 and completes; W1 resumes; notification provider times out after accepting. Write every durable row and final state.'
    ),
    solution: text(
      'Submission creates one job J7, one idempotency response, and one outbox event. Retry returns that response. Duplicate publish yields repeated delivery but one inbox identity. W1 records attempt 1 under token 8; W2 takes token 9 and conditionally transitions J7 to completed. W1’s token-8 commit is rejected. Notification uses stable effect id `job-complete:J7`; timeout leaves `unknown`, reconciliation queries or safely retries according to provider support. Final job state is completed once, with one logical notification decision and an auditable uncertain delivery outcome.'
    ),
    questions: [
      { prompt: 'How many job rows should the lost-response retry create?', options: ['One, because submission is keyed by request identity', 'Two, because two HTTP handlers received the input', 'Zero, until the client observes a response body', 'An arbitrary count determined by worker timing'], correct: 0, explain: 'The idempotency record binds repeated submission to the one durable job and its stored response.' },
      { prompt: 'Why must W1’s completion fail after W2 obtains token 9?', options: ['W1 has processed fewer total jobs than W2', 'Token 8 is fenced by the newer ownership token', 'The broker guarantees exactly one worker delivery', 'Wall time says W2 probably started a little later'], correct: 1, explain: 'The durable state transition rejects an older fencing token even if the paused worker resumes and believes it owns J7.' },
      { prompt: 'What is the notification state after provider acceptance followed by timeout?', options: ['Definitely failed, so send with a new identity', 'Definitely delivered, so erase all attempt evidence', 'Unknown, requiring provider-aware reconciliation', 'Uncommitted, so roll back the completed job'], correct: 2, explain: 'A timeout does not reveal whether the remote side effect occurred; reconciliation must preserve the stable effect identity.' },
      { prompt: 'Which capstone evidence proves replay safety?', options: ['A screenshot of the system in its healthy state', 'Average CPU measured before fault injection begins', 'One successful request with every service online', 'Repeated events rebuild the same one-completion state'], correct: 3, explain: 'Replaying the durable history under deduplication should converge on the same business state without duplicate completion.' }
    ]
  }
}
