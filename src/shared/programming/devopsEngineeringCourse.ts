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

// A self-contained path from first principles to reliable production delivery.
// Lesson keys are FROZEN: completed progress is stored as
// 'devops-engineering/<lesson-key>'.
export const DEVOPS_ENGINEERING_COURSE: ProgCourseDef = {
  key: 'devops-engineering',
  title: 'DevOps engineering: beginner to master',
  description:
    'A self-contained path through Linux, networks, delivery automation, containers, cloud, infrastructure as code, Kubernetes, observability, reliability, security, platform engineering, and production capstones.',
  lessons: [
    lesson(
      'devops-system',
      'DevOps as a delivery and learning system',
      `# DevOps as a delivery and learning system

DevOps is a way to design the entire path from an idea to a safely operating service. It is not a job title, a CI server, a cloud account, or a team that receives code after developers finish. Development and operations are different concerns, but separating their feedback and incentives creates slow handoffs, oversized releases, hidden risk, and arguments about ownership. A DevOps system gives the people who change a service enough shared context, automation, and production feedback to own its outcomes together.

Think in four loops. The **delivery loop** moves a small change through review, build, tests, security checks, release, deployment, and verification. The **operation loop** measures user experience, capacity, failure, cost, and security. The **learning loop** turns incidents, support reports, experiments, and delivery data into prioritized improvements. The **governance loop** supplies boundaries: who may change what, which evidence is required, how sensitive data is protected, and how risk is accepted.

## Flow, feedback, and learning

A value stream begins when a need is selected and ends when the intended value is verified in production. Draw every wait, queue, approval, retry, manual copy, environment difference, and ownership boundary. Optimizing one fast build step does little when a change waits three days for an environment. Four useful delivery measures are deployment frequency, lead time for changes, change failure rate, and time to restore service. They describe a system; they are not targets for ranking individuals. Pushing people to inflate one number destroys the information it provides.

Small batches reduce simultaneous unknowns, shorten feedback, and make rollback or forward repair easier. Automation makes the safe path repeatable, but automating a confused process only produces confusion faster. First define inputs, outputs, success, failure, ownership, and recovery. Then automate the smallest reliable path and improve it from measurements.

## Production is part of design

A service is not complete when it compiles. It needs a deployable artifact, configuration contract, health behavior, logs and metrics, capacity assumptions, data migration plan, backup and restore procedure, security boundary, support owner, and removal path. These are application design decisions. The operator cannot invent them safely after release.

Use blamelessness precisely. It does not mean nobody is accountable. It means investigations seek the conditions that made an action reasonable: missing guardrails, ambiguous instructions, risky defaults, weak tests, time pressure, or poor visibility. People remain responsible for improving the system. Punishment hides evidence; accountability creates and follows corrective work.

## The running service

This course uses a small HTTP service called Relay. It accepts jobs, stores them in PostgreSQL, and processes them with a worker. You will deliver it first as local processes, then containers, then a declarative platform. Every layer must preserve the same contract: a request is accepted once, work can retry without duplicating its business effect, users can see status, and operators can recover from failure.

## Guided practice

Map the path for a one-line application fix from selection to verified production value. Identify five waits or failure points, the feedback available at each, and the person or automation that owns the next action.

## Worked solution

A reasonable map is selected issue, local test, reviewed change, clean CI build, immutable artifact, staging deployment, smoke verification, production canary, user-level verification, and observation through one normal traffic period. Likely waits include unclear acceptance criteria, review queue, unavailable test environment, manual credentials, and approval without evidence. Each boundary needs an explicit owner and artifact: issue criteria, review policy, test report, short-lived deployment identity, and a release record linked to health. The first improvement should remove the wait with the largest combination of delay and repeated risk, not the most fashionable tool.`,
      [
        check(
          'What does a value stream end with?',
          [
            'A developer pushing a branch to the central repository',
            'The intended user or business value being verified in operation',
            'An operations team receiving a complete deployment instruction document after development',
            'A monitoring server collecting its first infrastructure metric'
          ],
          1,
          'Delivery is not complete at a technical handoff. The change must operate and produce the intended outcome.'
        ),
        check(
          'Why do small changes generally reduce delivery risk?',
          [
            'They eliminate the need for tests and production observation',
            'They guarantee that no shared dependency can ever fail',
            'They reduce simultaneous unknowns and simplify recovery',
            'They allow every engineer to bypass the review process'
          ],
          2,
          'A smaller batch narrows the possible causes and usually makes validation, rollback, or forward repair more tractable.'
        ),
        check(
          'How should delivery metrics be used?',
          [
            'As system signals for finding constraints and improvement opportunities',
            'As an individual leaderboard tied directly to compensation',
            'As proof that deployment frequency alone always represents reliable user value',
            'As replacements for user outcomes and reliability measurements'
          ],
          0,
          'System measures lose integrity when turned into personal quotas and never replace evidence of user value.'
        ),
        check(
          'What does a blameless incident review still require?',
          [
            'Removing every named decision, responsibility, and ownership detail from the incident record',
            'Declaring every action correct because the system allowed it',
            'Avoiding corrective work that might imply a prior weakness',
            'Accountability for improving the conditions that enabled failure'
          ],
          3,
          'Blamelessness protects truthful learning; it does not remove responsibility to fix risky conditions and follow through.'
        )
      ]
    ),
    lesson(
      'shell-and-automation',
      'The shell, streams, and safe automation',
      `# The shell, streams, and safe automation

The shell is both an interactive control surface and a programming language for composing processes. A command receives arguments and environment variables, reads standard input, writes normal output to standard output, writes diagnostics to standard error, and returns an integer exit status. By convention zero means success and nonzero means failure. Automation becomes dependable when it treats each channel deliberately instead of parsing whatever happened to appear on screen.

Paths may contain spaces, wildcard characters, leading hyphens, and newlines. Quote variable expansions as \`"$file"\`; use \`--\` before user-controlled positional paths when a command supports it; prefer null-delimited interfaces such as \`find -print0\` with \`xargs -0\` for arbitrary filenames. Never store a list of paths in one space-separated variable. Shell parsing happens in stages, so unquoted text can undergo expansion and word splitting before the target program sees it.

## Pipes and redirection

A pipeline connects the standard output of one process to the standard input of the next. Redirection connects a channel to a file or another channel. Keep data on stdout and explanations on stderr so another program can consume the data. A log line mixed into JSON output corrupts the interface.

In Bash, begin nontrivial scripts with a deliberate strictness policy:

\`\`\`bash
#!/usr/bin/env bash
set -Eeuo pipefail

on_error() {
  printf 'failed at line %s\\n' "$1" >&2
}
trap 'on_error "$LINENO"' ERR
\`\`\`

\`-e\` exits after many unhandled failures, \`-u\` rejects unset variables, and \`pipefail\` makes a pipeline fail when an earlier command fails. They are guardrails, not proofs. Conditional commands, subshells, and cleanup still need testing. Capture an exit status before another command overwrites it.

## Idempotency and explicit state

An idempotent operation can run again and converge on the same desired result. Check before creating, replace files atomically, use upsert-like APIs, and distinguish absent from failed. A provisioning script that appends the same line on every run is not idempotent. Prefer writing a complete candidate file, validating it, then renaming it over the live path on the same filesystem.

Use temporary directories from \`mktemp -d\` and remove only the exact path created by the script. A cleanup trap should validate that the variable is nonempty and inside an expected parent. Avoid broad recursive deletion, unresolved globs, and privileged execution unless the task truly requires them.

## Interfaces for scripts

A reusable script documents required commands, arguments, environment variables, produced files, exit codes, and whether retry is safe. Parse flags, reject unknown input, show usage, and support a dry-run for risky changes. Emit machine-readable output when another tool will consume it. Do not put secrets in command arguments because process listings and logs may expose them; prefer protected files, standard input, or a secret-provider mechanism.

## Guided practice

Write a deployment helper that accepts an artifact path and destination directory, verifies a checksum file, copies to a versioned candidate, atomically moves a \`current\` symbolic link, and restores the old link when a smoke command fails.

## Worked solution

Validate both arguments as absolute expected paths, require regular artifact and checksum files, create a temporary directory under the destination, and register a narrowly scoped cleanup trap. Verify before copying. Name the release by the artifact digest, copy without overwriting an existing different digest, and create a temporary link that is renamed over \`current\`. Run the smoke command through \`current\`; on failure, atomically restore the captured previous target and return nonzero. Send the new release identifier to stdout and diagnostics to stderr. Running the same digest twice should make no duplicate release and should preserve the same link.`,
      [
        check(
          'What does a zero process exit status conventionally mean?',
          ['The process succeeded', 'The process was killed', 'The output is empty', 'The process needs a retry'],
          0,
          'Exit status is the programmatic success channel; zero conventionally reports successful completion.'
        ),
        check(
          'Why is pipefail useful in a shell pipeline?',
          [
            'It writes every pipeline value to a permanent audit log',
            'It reports failure when an earlier piped command fails',
            'It automatically quotes every expanded shell variable',
            'It retries a failed command with elevated privileges'
          ],
          1,
          'Without pipefail, the last successful command can hide an earlier producer failure and publish incomplete data.'
        ),
        check(
          'Which behavior demonstrates idempotency?',
          [
            'Appending another configuration block on every execution',
            'Ignoring all errors so every execution returns successfully',
            'Converging repeatedly on one declared configuration state',
            'Deleting the complete destination before checking the source'
          ],
          2,
          'Idempotent work can be retried because repeating it converges rather than accumulating unintended effects.'
        ),
        check(
          'Where should a script place diagnostics when stdout is machine-readable?',
          ['In the JSON value itself', 'In the exit status bytes', 'In the input stream', 'On standard error'],
          3,
          'Separating diagnostics onto stderr preserves stdout as a stable data interface.'
        )
      ]
    ),
    lesson(
      'linux-files-permissions',
      'Linux files, users, permissions, and packages',
      `# Linux files, users, permissions, and packages

Linux exposes most resources through a filesystem namespace rooted at \`/\`. Configuration commonly lives under \`/etc\`, variable application state under \`/var/lib\`, logs under \`/var/log\`, transient runtime state under \`/run\`, user data under \`/home\`, optional application trees under \`/opt\`, and executables and libraries under system directories such as \`/usr\`. These are conventions, not security boundaries. The exact distribution layout and package manager must be checked before automation assumes them.

A directory entry maps a name to an inode. A hard link is another name for the same inode; deleting one name does not remove data while another link remains. A symbolic link stores a path and can cross filesystems or become dangling. An open file descriptor can keep an unlinked file alive until the process closes it, which explains why disk space may not return immediately after deleting a large active log.

## Identities and mode bits

Processes run with user and group identities. Files have an owner, group, and permission bits for owner, group, and others. On regular files, read, write, and execute mean what their names suggest. On directories, read lists names, write changes directory entries, and execute traverses or looks up names. A writable directory can allow a file to be removed even when the file itself is not writable.

Use the least-privileged service account that can do the job. Give services ownership only of their state directories, not application code or system configuration. Avoid shared writable groups without a clear membership and audit policy. The set-user-ID, set-group-ID, and sticky bits change normal behavior and require careful review. The sticky bit on a shared directory such as \`/tmp\` limits deletion to appropriate owners.

Access control lists can grant permissions beyond the basic mode bits. Capabilities can grant a process a narrow kernel privilege instead of full root, but they still expand attack surface. Mandatory access controls such as SELinux or AppArmor add policy beyond Unix modes. If permissions appear correct but access is denied, inspect every layer rather than disabling the security control.

## Mounts, space, and inodes

A mounted filesystem attaches another filesystem at a directory. \`df\` reports filesystem block use; \`du\` walks reachable directory entries. Their results differ when deleted files remain open, mounts hide underlying content, sparse files exist, or permissions prevent traversal. A filesystem can exhaust inodes even with free bytes, so monitor both. Understand whether storage is persistent, ephemeral, local, networked, or reconstructed before placing state on it.

## Packages and updates

A package manager tracks installed files, dependencies, versions, and signatures. Refresh metadata and apply changes through the distribution's supported interface. Do not mix random binary downloads, source installs, and managed packages without an ownership plan. Pinning every version forever prevents security fixes; floating every version makes builds irreproducible. Record constraints and digests, automate controlled updates, test them, and retain rollback or rebuild evidence.

## Guided practice

Design users and directories for Relay. Its executable is immutable, configuration is administrator-managed, the service writes job state and a Unix socket, and a log collector only needs read access.

## Worked solution

Create a non-login \`relay\` service account and a separate collector identity. Put application-owned immutable release files under a root-owned path such as \`/opt/relay/releases/<digest>\`, configuration under root-owned \`/etc/relay\`, persistent state under \`/var/lib/relay\` owned by relay, and the socket under a runtime directory created at service start. Grant the collector read access through a narrow group or ACL only where required. Neither identity can modify the executable or system configuration. Package or image updates produce a new versioned release rather than editing the running tree.`,
      [
        check(
          'What does execute permission on a directory allow?',
          [
            'Changing the owner of every file below it',
            'Traversing it to look up entries by name',
            'Reading the contents of all files below it',
            'Running every regular file stored inside it'
          ],
          1,
          'Directory execute permission controls traversal and name lookup, independently of listing or file content access.'
        ),
        check(
          'Why can deleted log data still consume disk space?',
          [
            'A package manager permanently copies every removed file',
            'A symbolic link always embeds a full duplicate of its target',
            'A process may still hold an open descriptor to the inode',
            'Directory read permission automatically creates a backup'
          ],
          2,
          'Unlinking removes a name, but the inode persists while links or open file descriptors still reference it.'
        ),
        check(
          'Which service layout best applies least privilege?',
          [
            'Root owns code and configuration while the service owns only required state',
            'The service account owns every system binary it might execute',
            'All application identities share one unrestricted writable directory covering code, configuration, and state',
            'The collector runs as root so permission design is unnecessary'
          ],
          0,
          'A service should be unable to rewrite its executable or policy and should write only the state it genuinely owns.'
        ),
        check(
          'Why can df and du disagree significantly?',
          [
            'They always report values using incompatible encryption keys',
            'One measures CPU pages and the other measures network packets',
            'The kernel updates directory names only during a reboot',
            'Open unlinked files or hidden mounts are visible differently'
          ],
          3,
          'Filesystem allocation and a walk of reachable names are different views, especially around open deletions and mount points.'
        )
      ]
    ),
    lesson(
      'processes-and-services',
      'Processes, signals, systemd, and host diagnosis',
      `# Processes, signals, systemd, and host diagnosis

A process is a running program with an identity, address space, open file descriptors, environment, current directory, resource limits, and parent relationship. A thread is an execution path inside a process and shares much of that process state. The kernel scheduler chooses runnable work; virtual memory maps process addresses to physical memory or backing storage; the virtual filesystem presents files, sockets, pipes, and devices through common interfaces.

Process states matter during diagnosis. Runnable work may be executing or waiting for CPU. Interruptible sleep usually waits for an event. Uninterruptible sleep often indicates a kernel or storage wait and will not respond immediately to normal signals. A zombie has exited but its parent has not collected its status; it consumes a process-table entry, not its former memory. High load average counts runnable and certain uninterruptible tasks, so load can rise from CPU pressure or blocked I/O.

## Signals and shutdown

Signals request process behavior. \`SIGTERM\` asks for graceful termination and can be handled; \`SIGKILL\` cannot be handled and gives no cleanup opportunity. Send TERM, allow a bounded grace period, then escalate only if required. A service should stop accepting new work, make in-flight work safe, flush or close durable state, and exit before its supervisor's deadline. Test this path. A deployment that kills halfway through a non-idempotent operation can corrupt business state.

Resource limits constrain file descriptors, processes, memory locking, and other resources. Exhausted descriptors often appear as unrelated network or file errors. Memory pressure may trigger reclaim, swapping, or the out-of-memory killer. CPU, memory, disk latency, network, and locks interact; diagnose evidence instead of guessing from one percentage.

## systemd service units

On many Linux systems, systemd is process 1 and a service manager. A unit declares how a service starts, dependencies and ordering, its identity, environment sources, restart policy, resource controls, sandboxing, and readiness model. The manager tracks the actual process rather than relying on fragile PID files.

\`After=network.target\` expresses ordering, not proof that an external database is reachable. Services must retry bounded transient dependencies themselves. Use restart policies for unexpected exits, not configuration errors that will loop forever. Add start-rate limits. Send logs to stdout/stderr or the journal and include structured context.

Operational commands answer different questions: \`systemctl status\` shows unit state and recent messages; \`journalctl -u relay\` queries its journal; \`ps\` and \`top\` show processes; \`ss\` shows sockets; \`lsof\` maps descriptors; \`strace\` observes system calls; and \`dmesg\` shows kernel messages. Observation tools can expose secrets or add overhead, so use them with access and duration controls.

## A disciplined diagnosis loop

State the user symptom and start time. Confirm scope. Compare a healthy peer or prior window. Check recent changes. Move from user request to process, dependencies, kernel, and infrastructure while recording evidence. Change one hypothesis at a time. During an incident, mitigate before pursuing a perfect explanation when mitigation is safe and reversible.

## Guided practice

Relay accepts requests but workers stop completing jobs every afternoon. CPU is low, load average is high, and several workers are in uninterruptible sleep. Write the next five diagnostic steps and a safe mitigation.

## Worked solution

Confirm user-visible queue delay and the affected hosts, then inspect process state and wait channels, storage latency and errors, open files, filesystem capacity and inodes, and recent storage or deployment changes. Correlate kernel and service logs by time. Uninterruptible sleep plus low CPU points toward I/O, not a reason to add workers. Safely stop routing new jobs to affected hosts, preserve evidence, and fail over only if the durable store supports it. Restarting may not clear a blocked kernel operation and could enlarge the queue. After recovery, reproduce the storage threshold and add a user-level queue SLI plus disk-latency and saturation diagnostics.`,
      [
        check(
          'What distinguishes SIGKILL from SIGTERM?',
          [
            'SIGKILL cannot be handled and provides no cleanup opportunity',
            'SIGKILL is delivered only after a successful graceful shutdown',
            'SIGKILL can be ignored while SIGTERM always forces an exit',
            'SIGKILL applies only to processes that have no parent process'
          ],
          0,
          'SIGKILL is the final kernel-enforced stop; graceful cleanup requires a handled signal such as SIGTERM and enough time.'
        ),
        check(
          'What can high load with low CPU utilization indicate?',
          [
            'Every process is idle and the host has no resource pressure',
            'Tasks are blocked in uninterruptible I/O waits',
            'The service has too few executable files on disk',
            'System time has stopped advancing on the host'
          ],
          1,
          'Load includes runnable work and some blocked tasks; an I/O backlog can raise it without consuming much CPU.'
        ),
        check(
          'What does systemd After= primarily express?',
          [
            'A guarantee that a remote dependency accepts transactions',
            'A permanent firewall allow rule between two service units',
            'Startup and shutdown ordering between units',
            'A retry budget for every request made by the process'
          ],
          2,
          'Ordering is not dependency health. Applications must tolerate transient external unavailability.'
        ),
        check(
          'What should a graceful worker shutdown do first?',
          [
            'Delete every queued job before another worker sees it',
            'Close the durable database without handling current work',
            'Ignore the termination request until all future work arrives',
            'Stop taking new work and make in-flight work safe'
          ],
          3,
          'Draining prevents new work while the service completes, checkpoints, or safely returns operations already in progress.'
        )
      ]
    ),
    lesson(
      'networking-foundations',
      'Networking, DNS, HTTP, and TLS from packets to requests',
      `# Networking, DNS, HTTP, and TLS from packets to requests

Networks move packets between interfaces, but operators usually diagnose a chain of abstractions: name resolution, route selection, link transfer, transport connection, encryption, application protocol, and dependency behavior. Saying "the network is down" hides which layer failed.

An IP address identifies an interface in a routing context. A subnet prefix describes which addresses are considered directly reachable. A default route handles destinations without a more specific route. Routers forward packets across networks and usually reduce the time-to-live or hop limit. Network address translation rewrites addresses or ports; it is common but does not replace a firewall or identity policy.

TCP provides an ordered byte stream with connection state, retransmission, flow control, and congestion control. UDP provides datagrams without those guarantees and is useful when the application handles loss or values low overhead. A port identifies a transport endpoint on an address. A listening socket is not proof that the entire request path works.

## DNS and names

DNS maps names to typed records through resolvers and authoritative servers. Answers have time-to-live values and may be cached positively or negatively. A record update does not instantly change every client. Search domains, split-horizon views, stale caches, record-family differences, and resolver timeouts can make two hosts see different results. Diagnose with the same name, record type, resolver path, and network context as the application.

## HTTP behavior

HTTP requests have a method, target, headers, and optional body. Responses have a status, headers, and optional body. Methods express semantics: GET is safe and should not cause a business change; PUT is intended to replace a named resource idempotently; POST often creates or triggers work and needs an idempotency key when clients may retry. Status classes distinguish success, redirects, client errors, and server errors, but exact retry behavior is part of the API contract.

Timeouts need layers: DNS/connect, TLS handshake, response headers, body or idle, and total operation. An unbounded timeout is a resource leak. A timeout does not prove the server did nothing, so retrying a non-idempotent request can duplicate an effect. Use bounded exponential backoff with jitter and a maximum attempt or elapsed-time budget. Do not retry permanent validation errors.

## TLS and trust

TLS authenticates endpoints with certificates and protects traffic integrity and confidentiality. The client verifies that the certificate chains to a trusted authority, is valid for the requested name, is within its validity window, and satisfies policy. Encryption without name verification permits an attacker to present the wrong valid certificate. Certificates are public; private keys are secret. Automate rotation before expiry and monitor it from the client path.

## Guided practice

A browser reports a TLS name error for \`api.example.test\`, while a direct request to the server IP succeeds when certificate verification is disabled. Explain why the IP test is not evidence of health and give a layer-by-layer diagnosis.

## Worked solution

The bypass test removed the property under investigation and may also select a different virtual host because the hostname and TLS server-name indication changed. Resolve the exact hostname through the client's resolver, inspect all returned address families, confirm the route and TCP connection, then perform TLS with the original server name and inspect the served chain and subject alternative names. Check load-balancer listeners and backend selection, certificate deployment consistency, client clock, and recent DNS or certificate changes. Never make disabled verification the fix. Restore a certificate valid for the name across every serving endpoint and verify from outside the operator's own cache.`,
      [
        check(
          'What does TCP provide to an application?',
          [
            'An ordered byte stream with retransmission and flow control',
            'A guarantee that the remote business transaction succeeded',
            'Automatic certificate validation for every application protocol',
            'A permanent route that bypasses all intermediate networks'
          ],
          0,
          'TCP supplies transport semantics; application success, identity, and authorization remain separate concerns.'
        ),
        check(
          'Why can a DNS change take time to reach every client?',
          [
            'Routers permanently rewrite every resolved hostname into an operating-system hosts file',
            'Resolvers may cache prior positive or negative answers until expiry',
            'TCP requires the old address to remain valid for one year',
            'TLS certificates prohibit multiple addresses for one name'
          ],
          1,
          'Distributed DNS caches honor their current answer lifetimes; record publication and observation are not simultaneous.'
        ),
        check(
          'Why is retrying a timed-out POST potentially dangerous?',
          [
            'POST responses are forbidden from containing any machine-readable status or result data',
            'The client must change DNS providers after every timeout',
            'The server may have committed the first request before the response was lost',
            'A timeout automatically disables transport encryption'
          ],
          2,
          'The result is unknown, not necessarily absent. An idempotency contract is needed to make retries converge.'
        ),
        check(
          'What must a TLS client verify in addition to encryption?',
          [
            'That the service runs as the root operating-system user',
            'That every packet always follows the same fixed route through every intermediate network',
            'That the server disables all certificate rotation',
            'That the certificate is trusted and valid for the requested name'
          ],
          3,
          'Confidential transport without authenticated identity can establish a protected channel to the wrong endpoint.'
        )
      ]
    ),
    lesson(
      'git-collaboration',
      'Git history, collaboration, and change control',
      `# Git history, collaboration, and change control

Git stores a content-addressed graph. A commit records a tree, parent commit or commits, author and committer metadata, and a message. A branch is a movable reference to a commit; a tag is another reference commonly used for a release point. The working tree is your checked-out files, the index is the proposed next tree, and the repository stores objects and references. Understanding those states makes recovery safer than memorizing commands.

A merge commit joins histories and preserves their topology. A rebase copies commits onto another base, producing new commit identities. Rebasing unpublished local work can create a clear series; rebasing shared history forces collaborators to reconcile rewritten identities. Choose a team policy and protect important branches. Never use destructive reset or force push as a reflex when you have not resolved the exact affected references.

## Changes as reviewable units

A good change has one coherent purpose, tests or evidence, a clear description of behavior and risk, and a recovery plan proportional to impact. Keep generated artifacts separate when possible. Review architecture, correctness, security, operability, and maintainability rather than only style. The author owns making the change reviewable; the reviewer owns a timely, evidence-based decision.

Protected branches can require reviews, status checks, signed or verified identities, linear history if desired, and restricted force pushes. These controls reduce accidental and unauthorized changes, but they do not prove the code is safe. A compromised automation identity or malicious dependency can pass superficial gates. Layer controls and preserve auditable linkage from issue to source revision to build artifact to deployment.

## Releases and immutable identity

Deploy a commit-derived immutable artifact, not a branch name or mutable image tag. A release record should identify the source revision, build invocation, dependency or lockfile state, artifact digest, approvals, target environment, deployment time, and verification result. A human-readable version is useful, but the digest is the unambiguous artifact identity.

Do not build separately for staging and production. Build once, promote the same artifact, and inject environment-specific configuration at deployment. Separate builds introduce untested differences. If a production fix is required, create a normal reviewed source revision, build it through the trusted pipeline, and later reconcile any release branches with the main line.

## Secrets and repository hygiene

Assume committed content remains recoverable even after deletion from the latest branch. If a secret enters history, revoke and rotate it first, then clean history if policy requires. Secret scanners reduce risk but cannot identify every sensitive value. Store templates and secret references in source; obtain secret values from an access-controlled system at runtime or deployment.

## Guided practice

A production deployment is known only as \`main-latest\`, and rebuilding that reference produces different bytes. Design the minimum traceability chain and branch controls needed to make the next release reproducible and auditable.

## Worked solution

Require reviewed changes and passing checks on the protected main branch. Trigger the release from one immutable commit, resolve dependencies through committed locks, build in a recorded clean environment, and publish an artifact by digest with provenance connecting it to the commit and build. Create a release record that promotes that exact digest through staging to production with target-specific configuration, approval evidence, smoke results, and timestamps. Keep mutable convenience tags only as pointers; deployment policy resolves and records the digest. Reproduction means running the declared build inputs, not rebuilding an unrecorded moving branch.`,
      [
        check(
          'What happens to commit identity during a rebase?',
          [
            'Copied commits receive new identities because their ancestry changes',
            'Every file is removed from both the index and working tree',
            'The remote server permanently locks all affected branches',
            'The original commits are encrypted under a destination-branch key and keep their identities'
          ],
          0,
          'A commit hash covers content and metadata including its parent, so copying it onto a new base creates another commit.'
        ),
        check(
          'Why should staging and production receive the same artifact?',
          [
            'Production configuration must be committed inside the binary',
            'Promotion preserves the identity of what staging actually tested',
            'A single artifact allows branch protection to be disabled safely',
            'Rebuilding is impossible on any continuous-integration runner'
          ],
          1,
          'Build-once promotion prevents an unnoticed production rebuild from differing from the candidate that passed verification.'
        ),
        check(
          'What is the strongest deployment artifact identity?',
          [
            'A branch name selected by the deployment operator immediately before the release begins',
            'A mutable tag such as latest on a package registry',
            'A content digest recorded with its source and build evidence',
            'The local filename used by the original developer'
          ],
          2,
          'A digest identifies exact bytes; source and provenance explain how those bytes were produced.'
        ),
        check(
          'What is the first response to a committed credential?',
          [
            'Rename the file while keeping the credential active',
            'Add the credential path to ignore rules for future commits',
            'Delete only the latest branch and leave all tags unchanged',
            'Revoke or rotate the credential before cleaning history'
          ],
          3,
          'History may have been fetched or cached elsewhere, so invalidating the exposed credential is the urgent control.'
        )
      ]
    ),
    lesson(
      'scripting-and-configuration',
      'Automation with Python and configuration contracts',
      `# Automation with Python and configuration contracts

Shell is excellent for connecting a few processes. Move to a general-purpose language when logic needs structured data, nested error handling, concurrency, tests, reusable types, or a stable library interface. Python is a practical operations language because it has strong standard libraries for files, processes, JSON, HTTP clients, hashing, dates, and testing. The goal is not replacing every command; it is moving complexity into an environment where it can be represented and verified clearly.

A dependable automation program separates pure decisions from side effects. Parse and validate input into typed internal values. Compute a plan. Present or persist the plan. Apply actions through narrow adapters. Verify postconditions. This separation permits tests to cover decisions without creating cloud resources or modifying a host.

\`\`\`python
from dataclasses import dataclass
from pathlib import Path

@dataclass(frozen=True)
class Release:
    digest: str
    artifact: Path

def release_path(root: Path, release: Release) -> Path:
    if not release.digest.startswith("sha256:"):
        raise ValueError("unsupported digest")
    return root / release.digest.removeprefix("sha256:")
\`\`\`

The pure \`release_path\` function is easy to test. File creation, network calls, and subprocesses belong in adapters that accept timeouts and return explicit results. Never construct a shell command by concatenating untrusted strings. Pass an argument array to the process API, check the exit status, bound execution time, and capture stdout and stderr separately.

## Configuration is an interface

Configuration changes behavior without rebuilding the artifact. Define every setting's name, type, default, allowed range, secrecy, reload behavior, and environment scope. Validate at process startup and fail with a precise message. Silently accepting a misspelled key is dangerous because the service appears healthy under an unintended default.

Keep ordinary configuration separate from secrets. Environment variables are convenient but inherited by child processes and may appear in diagnostic surfaces. Mounted protected files or a secret-agent interface can support rotation and clearer access. Whatever the delivery mechanism, the application should receive the minimum secret at the latest useful time and should never log it.

Configuration should be versioned as policy or declarative files when it is nonsecret. A schema can reject unknown keys and incompatible combinations. Include a configuration fingerprint in service metadata while excluding secret values; this helps correlate incidents without leaking them.

## Structured data and time

Parse JSON or YAML into data, then validate it; never edit structured configuration with global text replacement. Be explicit about text encoding. Use timezone-aware timestamps and store instants in UTC, while preserving source timezone only when the business meaning needs it. Generate unique operation identifiers for retries and correlate logs across steps.

## Guided practice

Design a Python release planner that reads a desired release document, compares it with current state, prints a JSON plan, applies only with an explicit flag, and can be safely retried after interruption.

## Worked solution

Define schemas for desired and observed state, reject unknown fields, normalize artifact digests and targets, and calculate actions in a pure function. The default command emits the plan and exits without mutation. Apply records an operation id, performs actions through argument arrays or APIs with deadlines, and writes checkpoints only after each action is verified. Creation uses idempotency keys or stable names; updates use conditional versions; deletion requires a separate opt-in. A rerun observes completed actions and skips them. Output has a versioned JSON schema on stdout, diagnostics on stderr, redacted logs, and exit codes distinguishing invalid input, plan difference, partial failure, and success.`,
      [
        check(
          'When should automation usually move beyond shell?',
          [
            'When it needs structured logic, reusable tests, and typed data',
            'Whenever a command produces one line of standard output',
            'Only after it has already modified every production environment',
            'When quoting arguments is considered unnecessary by the author'
          ],
          0,
          'A general-purpose language makes growing state, structure, errors, and tests explicit rather than encoded in fragile text flow.'
        ),
        check(
          'Why separate planning from side effects?',
          [
            'It allows every mutation to bypass validation and approval',
            'Pure decisions can be tested and reviewed before mutation',
            'It guarantees that every external API is always available',
            'It stores secret values inside source-controlled fixtures'
          ],
          1,
          'A calculated plan is inspectable and testable; narrow apply adapters contain the unavoidable external risk.'
        ),
        check(
          'What should happen to an unknown configuration key?',
          [
            'It should silently enable the closest matching feature',
            'It should be copied into application logs for later use',
            'It should be rejected by startup validation',
            'It should always be interpreted as a secret value'
          ],
          2,
          'Failing precisely prevents a typo from leaving the service running under an unintended default.'
        ),
        check(
          'How should a program start a subprocess with untrusted arguments?',
          [
            'Join the arguments into one shell command string and depend on hand-written escaping',
            'Place them in a temporary world-readable command file',
            'Remove the timeout so the operation cannot be interrupted',
            'Use an argument array with explicit timeout and status handling'
          ],
          3,
          'Direct argv execution avoids shell interpretation and supports controlled output, timeout, and error semantics.'
        )
      ]
    ),
    lesson(
      'application-operability',
      'Designing applications that can be operated',
      `# Designing applications that can be operated

Operations begins inside application design. A service that cannot report readiness, shut down safely, migrate data compatibly, limit work, or identify its build cannot be repaired by adding a deployment tool around it. The application and platform need a written runtime contract.

A process should expose build identity, start time, configuration version or redacted fingerprint, dependency status, and health through controlled endpoints or metadata. **Liveness** asks whether the process is stuck and should be restarted. **Readiness** asks whether it should receive traffic. **Startup** protects a legitimately slow initialization from premature liveness failure. These are different questions. A liveness check that fails whenever a database is briefly unavailable can restart every application replica and amplify the outage.

## Lifecycle and load

Startup validates configuration, establishes bounded dependency connections, applies no surprise destructive migration, and becomes ready only when it can serve its contract. Shutdown stops admission, drains or safely returns in-flight work, closes consumers, flushes telemetry within a limit, and exits before forced termination. Long-running jobs need leases, checkpoints, or idempotent operations so another worker can recover them.

Every external call needs a timeout. Every queue needs a capacity policy. Every retry needs a budget and idempotency. Concurrency must be bounded so overload becomes controlled rejection or delay instead of resource collapse. Backpressure propagates the fact that a downstream system cannot keep up. Load shedding protects essential traffic. Circuit breakers can reduce repeated pressure but require careful half-open recovery and should not hide persistent failure.

## State and migrations

Stateless compute can be replaced freely; durable state needs a lifecycle. Schema changes should use expand-and-contract: first add backward-compatible structures, deploy code that can work across versions, backfill safely, switch reads or writes, then remove the old shape only after every old process is gone and rollback no longer requires it. A single release that renames a live column and deploys new code can break old replicas during a rolling update.

Feature flags can separate deployment from release. Flags need owners, defaults, audit history, failure behavior, and removal dates. They are operational state and can create combinatorial complexity. Kill switches should fail safely and be rehearsed.

## Logs and errors

Return stable error categories to clients and preserve internal causal detail in protected logs. Include request or operation id, service, version, environment, outcome, duration, and relevant resource identity. Do not log credentials, tokens, raw personal data, or entire request bodies by default. Make an error actionable: what failed, under which operation, whether retry is safe, and which dependency or invariant was involved.

## Guided practice

Relay workers currently exit immediately on termination, retry database writes without an idempotency key, and report unhealthy whenever the database is slow. Redesign their runtime contract for rolling deployment.

## Worked solution

Give each job an immutable business id and make completion an idempotent conditional transition. On termination, workers stop polling, finish or release the current lease within the grace period, close connections, and exit. Readiness becomes false while draining. Liveness checks the worker event loop or internal progress, not database availability. A startup check covers initialization. Database calls have deadlines and a bounded retry budget with jitter; sustained inability makes readiness false and leaves the process observable rather than causing a restart storm. Schema changes are backward compatible across the maximum rollout and rollback window. Metrics expose queue age, claims, completions, retries, lease expiry, and drain duration by low-cardinality outcome.`,
      [
        check(
          'What should a readiness check answer?',
          [
            'Whether this instance should receive traffic or work now',
            'Whether the process has ever started successfully in its lifetime',
            'Whether every dependency in the company is fully available',
            'Whether the operating system should immediately reboot'
          ],
          0,
          'Readiness controls admission to this instance; it can change during draining or dependency failure without implying a restart.'
        ),
        check(
          'Why should liveness avoid depending on a shared database?',
          [
            'Database queries never produce measurable response times',
            'A database outage could trigger a restart storm across healthy processes',
            'Liveness checks are allowed to run only before process startup',
            'Applications are prohibited from opening any network connection after initialization completes'
          ],
          1,
          'Restarting every client rarely repairs a shared dependency and adds connection and startup load during the failure.'
        ),
        check(
          'What is the purpose of expand-and-contract migrations?',
          [
            'To deploy destructive schema changes before any compatible application release exists',
            'To keep every deprecated field permanently writable',
            'To preserve compatibility across rollout and rollback windows',
            'To run all database changes manually without an audit trail'
          ],
          2,
          'Overlapping compatible states allow old and new processes to coexist while data and traffic transition safely.'
        ),
        check(
          'What property makes a retried job completion safe?',
          [
            'The worker uses the largest possible concurrency setting',
            'Every exception is converted into success before the durable outcome is checked',
            'The database table has no unique keys or constraints',
            'The completion transition is idempotent under one business identity'
          ],
          3,
          'A stable identity and conditional transition make repeated delivery converge on one business effect.'
        )
      ]
    ),
    lesson(
      'testing-strategy',
      'Testing systems and deployment risk',
      `# Testing systems and deployment risk

Testing is a risk-control portfolio, not a contest to maximize one coverage number. Start from failure modes: wrong business decision, incompatible interface, unsafe migration, leaked secret, resource exhaustion, deployment failure, or impossible recovery. Choose the cheapest evidence that detects each important risk early, then preserve a smaller number of realistic system checks for boundaries that isolated tests cannot prove.

Unit tests exercise pure behavior quickly. Component tests run a service with controlled adapters. Contract tests verify that producers and consumers agree on an interface. Integration tests use real dependency behavior at a boundary. End-to-end tests cross the deployed path from an external perspective. Static analysis checks properties without execution. Security scanning, policy validation, load tests, migration rehearsals, restore tests, and failure injection cover other dimensions. None replaces the others.

## Determinism and fixtures

Tests should control time, randomness, network, and identifiers when those affect outcomes. A flaky test is an unknown result, not a harmless inconvenience. Record its frequency and cause, quarantine only with ownership and a deadline, and fix or remove it. Retrying a flaky gate until green converts failure into false confidence.

Use small readable fixtures for semantics and generated data for broad properties. Test boundaries: zero, one, maximum, duplicate, missing, out-of-order, concurrent, delayed, malformed, unauthorized, and interrupted. Property tests can assert invariants over many generated cases. A golden or snapshot test is useful when intentional changes are reviewed, but a giant unreadable snapshot can approve defects mechanically.

## Deployment and infrastructure tests

Validate configuration schemas, container metadata, infrastructure plans, policy, and Kubernetes manifests before mutation. Create ephemeral environments when the integration risk justifies their cost, but do not assume an empty temporary environment represents an upgrade of a years-old production system. Test migrations against realistic prior versions and data volumes.

After deployment, smoke tests verify the minimum critical path. Synthetic checks continuously exercise selected user journeys. A canary compares real behavior on a small scope. Monitoring is not merely post-test observation; it is the final assertion of the delivery pipeline. Define success and rollback thresholds before deploying.

## Performance and resilience

Load testing needs a model: request mix, arrival pattern, concurrency, data size, cache state, think time, and success criteria. Measure throughput, latency distributions, errors, saturation, and downstream behavior. A test at one average rate misses bursts and coordinated retries. Soak tests expose leaks and slow accumulation. Stress tests locate limits. Failure injection verifies known protections with a bounded blast radius and an abort condition.

## Guided practice

Create a test portfolio for a Relay change that adds job priority and migrates existing rows. Include what runs on every change, before production, during rollout, and after release.

## Worked solution

Every change runs unit tests for ordering and authorization, schema validation, static checks, a migration compatibility test from the prior schema, and a component test proving old rows receive the default priority. Contract tests confirm API clients tolerate the additive field. Before production, rehearse the migration at realistic volume, test rollback while both versions coexist, run load with mixed priorities, and verify no starvation. During rollout, a canary receives a bounded traffic share; compare success, latency, queue age by priority, database locks, and worker saturation against the baseline. A smoke job for each priority confirms end-to-end processing. After release, observe one full workload cycle and remove the old path only after rollback expires.`,
      [
        check(
          'How should a testing portfolio be selected?',
          [
            'Map important failure risks to the cheapest trustworthy evidence',
            'Use only end-to-end tests because they execute the most code',
            'Maximize line coverage without considering system boundaries',
            'Avoid testing recovery because it intentionally creates failures'
          ],
          0,
          'Tests are controls for identified risks; different risks require different scopes and evidence.'
        ),
        check(
          'What does retrying a flaky gate until it passes do?',
          [
            'It proves the change is deterministic under every environment',
            'It converts an unknown result into false confidence',
            'It guarantees that the production dependency will be available',
            'It permanently records the failure as a release blocker'
          ],
          1,
          'A nondeterministic test has not established the property, and blind retry hides that missing evidence.'
        ),
        check(
          'Why test migrations against prior populated schemas?',
          [
            'An empty latest schema always takes longer to initialize',
            'Production databases never use the current application schema',
            'Fresh setup tests cannot prove the real upgrade path',
            'Prior schemas automatically contain every future column'
          ],
          2,
          'Existing systems travel through migrations; building only a clean current database skips that critical path.'
        ),
        check(
          'What should be set before a canary deployment begins?',
          [
            'A requirement that the canary receive all production traffic',
            'A plan to change metrics after observing the first failure',
            'An unbounded retry loop for every failed user operation',
            'Explicit success, abort, and rollback thresholds'
          ],
          3,
          'Predeclared thresholds reduce biased decisions and let automation stop a harmful rollout promptly.'
        )
      ]
    ),
    lesson(
      'continuous-integration',
      'Continuous integration and trustworthy builds',
      `# Continuous integration and trustworthy builds

Continuous integration means developers integrate small changes frequently into a shared main line that is kept releasable by fast automated feedback. A hosted workflow product can run CI, but YAML alone does not create integration. Long-lived branches, week-long red builds, nondeterministic dependencies, and tests ignored by the team defeat the practice.

A change pipeline commonly checks formatting and static analysis, resolves locked dependencies, builds, runs unit and component tests, validates licenses and known vulnerabilities, and produces reports. Parallelize independent checks while preserving clear failure evidence. Fail fast on cheap decisive checks, but collect enough related diagnostics that engineers do not need ten reruns to find ten simple issues.

## Clean, reproducible builds

A build should start from declared source and dependency inputs in a controlled environment. Lock dependencies and verify their integrity. Avoid downloading mutable scripts and executing them without identity checks. Separate dependency caches from produced artifacts: a cache is an optional acceleration that the job can reconstruct; an artifact is an output that later stages must identify and verify. Treat restored caches as untrusted input and never store secrets in them.

Build once for a release candidate. Record source revision, runner or builder identity, toolchain, invocation, resolved dependencies, artifact digest, test evidence, and timestamps. Reproducible builds aim for the same inputs to create the same bytes, but even without perfect bit reproducibility, provenance makes the process auditable.

## Workflow security

Workflow code executes with repository, token, network, and artifact access. Give each job the minimum token permissions. Pin third-party workflow actions to immutable full commit identities and review their source and update process. Do not interpolate untrusted issue titles, branch names, or pull-request text directly into shell scripts; pass them as data through environment variables and quote them. Low-trust contributions must not receive deployment credentials.

Prefer short-lived identity federation such as OpenID Connect for cloud access instead of stored long-lived keys. The cloud trust policy must restrict repository, branch or environment, workflow identity, audience, and other relevant claims. A token being short-lived does not make an overly broad role safe.

Self-hosted runners persist in your trust boundary. An untrusted build can alter tools, steal later credentials, or reach internal networks. Use isolated ephemeral runners where feasible, rebuild from a known image, segment networks, and never mix hostile pull requests with privileged deployments on the same persistent machine.

## Pipeline health

Measure queue time, execution time, failure causes, flake rate, cache usefulness, artifact size, and time to first useful signal. Assign ownership to the pipeline as a product. A broken main branch blocks delivery and deserves immediate repair. Optimize after measurement; an opaque clever cache that sometimes serves wrong content costs more than it saves.

## Guided practice

Design CI for Relay on pull requests and protected main. It builds a container later in the course, but for now produces a versioned package. Separate trusted and untrusted work and name the evidence passed to release.

## Worked solution

Pull requests receive read-only source permissions and no environment secrets. Independent jobs validate formatting, types, unit tests, dependency integrity, secret patterns, configuration schemas, and a component test. Any external action is pinned immutably. Untrusted text is passed as quoted data, never generated code. Main reruns required checks from the protected merge commit in a clean isolated builder, creates one package, calculates its digest, and publishes it with test reports and provenance. A later release consumes that exact digest, not a rebuilt branch. Deployment uses a separate protected workflow and short-lived narrowly scoped identity. Pipeline metrics distinguish product failures, infrastructure failures, and flaky checks.`,
      [
        check(
          'What is continuous integration fundamentally trying to preserve?',
          [
            'A frequently integrated shared main line that remains releasable',
            'A separate long-lived branch and private environment maintained permanently for each developer',
            'A manual build whose steps differ for each release engineer',
            'A policy that allows failed checks to remain red indefinitely'
          ],
          0,
          'Frequent small integration plus prompt repair keeps feedback short and the shared line in a known state.'
        ),
        check(
          'How does a dependency cache differ from a release artifact?',
          [
            'A cache permanently contains production secrets while a release artifact can never contain files',
            'A cache is disposable acceleration; an artifact is an identified output',
            'A cache must be deployed directly when a build fails',
            'An artifact may be addressed only by a mutable branch name'
          ],
          1,
          'Correct jobs can run without a cache, while release stages require the exact produced and verified artifact.'
        ),
        check(
          'Why pin a third-party CI action to a full commit identity?',
          [
            'It grants the action broader repository token permissions',
            'It lets the action rewrite protected branch history automatically',
            'It prevents a movable tag from changing the executed action code',
            'It disables the need to review future dependency updates'
          ],
          2,
          'An immutable reference fixes the code being trusted; updates remain explicit reviewable changes.'
        ),
        check(
          'What is the safer cloud authentication pattern for CI?',
          [
            'One administrator access key copied into every repository and runner environment',
            'A credential printed to logs so failed jobs can reuse it',
            'A permanent key embedded inside the built package',
            'Short-lived federation constrained by workflow and environment claims'
          ],
          3,
          'Federated tokens reduce stored-secret lifetime, while claim and role restrictions enforce the actual authorization boundary.'
        )
      ]
    ),
    lesson(
      'continuous-delivery',
      'Continuous delivery, releases, and safe rollout',
      `# Continuous delivery, releases, and safe rollout

Continuous delivery keeps every accepted change in a deployable state. Continuous deployment automatically releases qualifying changes to production. A team may practice delivery with a human production decision; the important property is that deployment is routine, automated, evidence-driven, and uses the same tested mechanism every time.

Separate **deployment**, placing code in an environment, from **release**, exposing behavior to users. A feature flag, routing rule, or capability negotiation can separate them. This enables dark deployment, internal verification, gradual exposure, and rapid disablement. It also creates state that must be owned, audited, tested in both important positions, and removed when the transition ends.

## Rollout strategies

A rolling update replaces instances gradually. It is efficient but old and new versions coexist, so APIs, schemas, queues, and caches need compatibility. Blue-green maintains two complete environments and switches traffic; rollback can be quick, but state and double capacity complicate it. A canary exposes a small representative scope, compares it with a control, then expands in steps. Percentage alone is insufficient: choose users or requests so sessions and state behave correctly.

For every strategy, define readiness, minimum healthy capacity, surge, drain time, and failure thresholds. Deployment success is not "the tool returned zero." Verify the artifact digest, configuration, instance health, critical synthetic path, user-level errors and latency, dependency pressure, and business invariants.

## Roll back or roll forward

Rollback is safest for stateless compatible code. It may be unsafe after irreversible data changes, external side effects, or a security event. Forward repair may be faster when the cause is clear and the new state cannot be interpreted by the old version. Decide before release which changes are reversible, how long rollback remains valid, and what data action accompanies it. Never label a button "rollback" without testing what it actually restores.

Database migrations use expand-and-contract and often run as separately observed steps. Backfills are production workloads with rate limits, checkpoints, pause controls, and validation. Do not run an unbounded table rewrite inside application startup across every replica.

## Environments and approvals

Environment promotion proves increasing confidence, but staging cannot perfectly copy production traffic, data, scale, identity, and failure. Keep configuration differences intentional and validated. Production approvals should review evidence and risk, not ask a person to repeat mechanical commands. Protect the production environment, prevent self-approval where risk requires separation, serialize conflicting deployments, and preserve an audit trail.

## Guided practice

Relay adds a new worker algorithm and an additive schema field. Plan a canary from artifact selection through full release, including database steps, traffic cohorts, observation, abort, and cleanup.

## Worked solution

First deploy the additive schema and verify old code. Backfill only if needed under a throttled checkpointed job. Build one immutable artifact and deploy it dark with the new algorithm disabled. Canary a stable cohort of jobs to new workers, preserving job affinity and enough volume for comparison. At each step compare completion success, duplicate-effect invariant, queue age, processing latency, retry rate, database saturation, and cost with the control. Predeclare automatic pause and rollback thresholds. Disabling the flag returns work to the old algorithm while the additive schema remains compatible. Expand gradually, observe a full workload cycle, make the new path default, then remove the old path and field only in later changes after rollback expires.`,
      [
        check(
          'How does continuous delivery differ from continuous deployment?',
          [
            'Delivery keeps changes deployable; deployment releases them automatically',
            'Delivery prohibits automation while deployment prohibits testing',
            'Delivery applies exclusively to databases while deployment applies exclusively to source code',
            'Delivery rebuilds production while deployment promotes one artifact'
          ],
          0,
          'Continuous delivery assures release readiness; continuous deployment automatically exercises the production release decision.'
        ),
        check(
          'Why must rolling updates preserve cross-version compatibility?',
          [
            'They always erase the durable data store before startup',
            'Old and new instances operate at the same time',
            'They require every user to clear local network routes',
            'A rolling controller cannot perform readiness checks'
          ],
          1,
          'During gradual replacement, versions share APIs, data, queues, and traffic, so incompatible transitions can fail mid-rollout.'
        ),
        check(
          'When can rollback be unsafe?',
          [
            'When the artifact digest is recorded in release metadata',
            'When a canary uses a stable representative traffic cohort',
            'After an irreversible data or external side effect',
            'When the prior version passed its original unit tests'
          ],
          2,
          'Old code may not understand or undo the new durable world; recovery needs a data-aware forward or restore plan.'
        ),
        check(
          'What is a useful production approval?',
          [
            'A person manually repeating every deterministic deployment command',
            'A reviewer approving without access to tests or expected impact',
            'An informal message that is absent from the release record',
            'A risk decision based on preserved evidence and recovery readiness'
          ],
          3,
          'Human judgment adds value at the risk boundary when automation has already assembled trustworthy evidence.'
        )
      ]
    ),
    lesson(
      'container-foundations',
      'Container isolation, images, and runtime behavior',
      `# Container isolation, images, and runtime behavior

A container is a process or group of processes using kernel isolation and resource-control features with a packaged filesystem and runtime configuration. It is not a miniature virtual machine. Containers on one host share its kernel. Namespaces can isolate process ids, mounts, networks, hostnames, users, and interprocess resources; control groups account for and limit resources; capabilities split portions of root privilege; seccomp and mandatory access controls restrict behavior further.

An image is an immutable content-addressed set of layers plus configuration. A registry distributes image manifests and blobs. A container adds a writable layer and runtime state. Deleting the container deletes that writable layer unless data lives in a mounted volume or external service. Therefore logs, uploads, and databases must have deliberate persistence instead of relying on the container filesystem.

## Process contract

The main container process receives signals and determines container lifetime. Avoid wrappers that fail to forward signals or collect child processes. Use exec-form entrypoints so the application receives termination directly. Write logs to stdout and stderr. Run one primary concern per container, while tightly coupled helper sidecars can be justified when their lifecycle truly belongs together.

Use a non-root user and drop capabilities. A root user inside a container is constrained but can enlarge the damage of runtime or kernel weaknesses. Make the root filesystem read-only when possible, mount only required writable paths, avoid privileged mode and host namespace access, and never mount a container-engine control socket into ordinary workloads.

## Resources and failure

Set memory and CPU expectations. A memory limit can terminate the process when exceeded. CPU limits throttle rather than reserve dedicated CPU. File descriptors, process count, ephemeral disk, and network also need consideration. Container restart policy can repair a crashed process, but it cannot fix an invalid configuration or shared dependency. Observe restart loops and preserve the previous termination reason.

Image tags are convenient movable names; digests identify exact content. Deployment should record the digest even when humans select a tag. Scanning finds known package vulnerabilities and configuration weaknesses, but a finding needs reachability, severity, exploitability, ownership, and remediation policy. A clean scan does not prove safety, and a noisy scanner without action becomes ignored.

## Containers and virtual machines

A VM virtualizes hardware and runs its own kernel, usually providing a stronger default isolation boundary at greater overhead. Containers optimize packaging and process density. They can be combined: containers commonly run inside VMs. Choose boundaries from threat model, operations, startup, compatibility, and cost rather than treating either as universally superior.

## Guided practice

Threat-model a Relay worker container that needs outbound database access and a temporary work directory but no inbound port. Define its runtime user, filesystems, capabilities, network, resources, and shutdown behavior.

## Worked solution

Run as a fixed non-root uid with no login shell, drop all capabilities, enable the runtime's default seccomp profile, and keep the image filesystem read-only. Mount a size-limited temporary directory at the one required path. Do not publish a port. Permit egress only to DNS if required, the database endpoint, and telemetry, while denying other destinations at the platform layer. Inject the database credential at runtime through a protected secret file and rotate it. Set measured CPU and memory requests or limits plus a process limit. The worker handles TERM by stopping claims and safely settling its lease before the grace deadline. Image selection uses a verified digest and the release record captures it.`,
      [
        check(
          'What do containers on the same host normally share?',
          ['The host kernel', 'One writable root filesystem', 'Every process namespace', 'All runtime credentials'],
          0,
          'Containers isolate processes using host-kernel features; they do not normally bring an independent guest kernel.'
        ),
        check(
          'What happens to data in a container writable layer after removal?',
          [
            'It is automatically committed, signed, and published as a production image after removal',
            'It is lost unless persisted through a deliberate external mount or service',
            'It becomes readable from every container on the registry',
            'It is moved into the host package manager database'
          ],
          1,
          'Container-local writable state is disposable; durable data must live behind an explicit persistence contract.'
        ),
        check(
          'Why prefer an exec-form container entrypoint?',
          [
            'It starts a second kernel for the application process',
            'It makes every filesystem path writable by default',
            'It avoids a shell wrapper interfering with signals and arguments',
            'It automatically grants the application every Linux capability available on the host'
          ],
          2,
          'Direct execution preserves argument boundaries and lets the main application receive lifecycle signals.'
        ),
        check(
          'What identifies exact image content?',
          ['The container hostname', 'A human-readable repository name', 'A mutable latest tag', 'A content digest'],
          3,
          'Tags can move between images; a digest binds the deployment to exact manifest content.'
        )
      ]
    ),
    lesson(
      'container-builds',
      'Secure and efficient container builds',
      `# Secure and efficient container builds

A Dockerfile or compatible build definition is executable supply-chain policy. It selects the base, obtains dependencies, runs build tools, chooses runtime files, declares identity, and sets the startup contract. Review it with the same care as application code.

Multi-stage builds separate the tool-rich build environment from the minimal runtime output. Compile and test in one stage, then copy only the required binary, runtime dependencies, certificates, and static assets into the final stage. This reduces size and attack surface. Minimal does not mean unusable: if the application needs time-zone data, certificate roots, a shell for a documented diagnostic, or native libraries, include and maintain them deliberately.

\`\`\`dockerfile
# syntax=docker/dockerfile:1
FROM golang:1.25 AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go test ./... && CGO_ENABLED=0 go build -o /out/relay ./cmd/relay

FROM scratch
COPY --from=build /out/relay /relay
USER 65532:65532
ENTRYPOINT ["/relay"]
\`\`\`

This illustrates structure, not a permanently correct version selection. Pin production bases by digest for reproducibility and use an automated reviewed update process so pinning does not freeze security fixes.

## Context and cache

The build context is data sent to the builder. Exclude source-control metadata, local dependencies, credentials, test secrets, and irrelevant large files with a reviewed ignore file. A later deletion does not remove a secret already captured in an earlier layer or remote cache. Never copy it into the context.

Layer cache keys depend on instructions and inputs. Copy lockfiles and resolve dependencies before copying frequently changing source so normal edits reuse expensive dependency layers. Use build cache mounts where appropriate, but do not let cache contents become undeclared output. Combine package-index refresh and install in one layer, remove transient package lists, and avoid unnecessary packages.

## Reproducibility and metadata

Control timestamps and nondeterministic archives where the ecosystem permits. Lock dependencies, verify checksums, and record builder identity. Attach standard source revision, version, license, and creation metadata without putting secrets in labels or environment values. Generate a software bill of materials and build provenance through the trusted build platform. Sign or attest artifacts and enforce verification at promotion or admission, not merely generate files nobody checks.

Run tests inside or alongside the same build graph that creates the artifact. Scan both operating-system and application dependencies, then classify findings with a remediation deadline. Rebuild periodically even when application source does not change because base and dependency fixes arrive independently.

## Guided practice

Review a container build that copies the entire repository, installs production dependencies without a lock, stores a registry token in an environment instruction, runs as root, and deploys \`latest\`. Produce a corrected build and update process.

## Worked solution

Remove the token from source, history, context, layers, and logs, then rotate it. Add an ignore file and copy dependency manifests first. Require the lockfile, verify dependencies, build and test in an isolated stage, and copy only runtime outputs into a trusted minimal final stage. Create an explicit non-root uid, fixed entrypoint, and required metadata. Resolve base and deployment images to digests, while automation proposes digest updates with vulnerability and test evidence. Generate SBOM and provenance in the builder, sign or attest through an identity outside tenant-controlled steps, and make deployment verify them. The final image contains no compiler, package cache, source tree, or credential.`,
      [
        check(
          'What is the main benefit of a multi-stage image build?',
          [
            'It separates build tools from the smaller runtime output',
            'It guarantees that every dependency has no vulnerabilities',
            'It lets secrets remain safely stored in earlier image layers',
            'It removes the need to test the produced runtime artifact'
          ],
          0,
          'The final stage can contain only runtime necessities, reducing size and the available attack surface.'
        ),
        check(
          'Why copy lockfiles before frequently changed source?',
          [
            'It grants the builder access to production deployment credentials',
            'Dependency layers can remain cached when only source changes',
            'It forces every source edit to invalidate all prior layers',
            'The container runtime cannot read lockfiles in later layers'
          ],
          1,
          'Stable dependency inputs make a reusable cache boundary without changing the declared dependency result.'
        ),
        check(
          'Why is deleting a copied secret in a later layer insufficient?',
          [
            'The secret is automatically uploaded to the DNS resolver',
            'Deleting it makes the complete final image filesystem world-readable to every container user',
            'The earlier immutable layer can still contain the secret bytes',
            'Container images cannot represent deleted directory entries'
          ],
          2,
          'Layered images retain earlier content. Sensitive material must never enter the context or build layer in the first place.'
        ),
        check(
          'What makes generated provenance operationally useful?',
          [
            'Storing it only on the builder until its disk is recycled',
            'Allowing application code to rewrite it after deployment',
            'Treating it as a substitute for all application tests',
            'Verifying it against policy before accepting an artifact'
          ],
          3,
          'Evidence changes security only when a trusted control checks its authenticity and expected source and builder identity.'
        )
      ]
    ),
    lesson(
      'compose-local-systems',
      'Local multi-service systems with Compose',
      `# Local multi-service systems with Compose

A multi-container development stack should make the application's real boundaries visible without pretending to be production. Compose describes services, networks, volumes, configuration, health behavior, and dependencies in one declarative local model. It is useful for integration, onboarding, and reproducible experiments; it is not a substitute for production architecture, security, backups, or orchestration.

Each service gets an isolated container filesystem and can join named networks. On a Compose network, service names provide discoverable DNS names. From the Relay API container, PostgreSQL is reached by its service name and container port, not by \`localhost\`; localhost refers to the API container itself. Published host ports are required only when a host process or user must connect. Avoid exposing databases to all host interfaces by default.

Named volumes persist independently of a container and are appropriate for local database state. Bind mounts expose host paths and are convenient for source code, but they inherit host permissions, path conventions, performance, and accidental access. Mark configuration read-only and never mount broad home or engine-control directories.

## Startup is not readiness

Dependency order can start a database before an API, but starting a process does not mean it accepts queries. Add health checks and make applications retry transient startup dependencies with bounded backoff. Seed and migration jobs should be explicit one-shot services with idempotent behavior, not hidden in every application replica.

Profiles or override files can enable optional diagnostics without changing the base stack. Keep the normal path small. Environment files may hold nonsecret local settings, but a file committed to source is not a secret store. Provide a checked-in example with safe placeholders and load personal values from ignored protected storage.

## Reproducible developer workflow

Document one sequence to validate configuration, build or pull exact images, start, inspect health, run tests, stop, and deliberately remove data. Pin important image versions and update them consciously. A developer should know whether \`down\` preserves volumes and which separate action erases them. Destructive reset must be explicit.

Use the stack for failure learning: pause a dependency, fill a queue, rotate a password, restart a worker during a job, and observe retry and recovery. Keep resource expectations modest and health checks meaningful. If local behavior depends on production-only infrastructure, provide a narrow emulator or adapter and document the semantic differences.

## Guided practice

Design a Compose stack for Relay API, worker, PostgreSQL, and a one-shot migration service. Explain networks, volumes, health checks, secrets, port publication, and reset behavior.

## Worked solution

Place API, worker, migration, and database on one private application network. Publish only the API port to loopback. Give PostgreSQL a named data volume and health check that performs an authenticated trivial query. The migration service waits for database health, runs versioned idempotent migrations once, and exits; API and worker require its successful completion where supported but still handle temporary database loss at runtime. Supply local credentials from an ignored restrictive file or runtime secret mechanism, not the image. Use exact image versions. A normal stop preserves the volume; a separately named reset command confirms and removes only this project's volume. Tests create unique data and clean it through application interfaces.`,
      [
        check(
          'How should one Compose service reach another?',
          [
            'Through the target service name on their shared network',
            'Through localhost inside the calling container',
            'By mounting the target container root filesystem',
            'By requiring every internal port to be publicly exposed'
          ],
          0,
          'Service DNS and container ports provide internal connectivity; localhost names only the current container.'
        ),
        check(
          'What is a named volume used for?',
          [
            'Embedding the host kernel inside every image build',
            'Persisting managed data independently of container replacement',
            'Granting a container unrestricted access to the home directory',
            'Replacing database consistency and backup procedures'
          ],
          1,
          'A named volume outlives disposable containers, though the application still owns data integrity and backup semantics.'
        ),
        check(
          'Why is dependency start order insufficient?',
          [
            'Containers cannot make any network connections after start',
            'Health checks can execute only after a service has stopped',
            'A started dependency may not yet be ready to serve',
            'Compose always starts every process in one shared namespace'
          ],
          2,
          'Process creation and service readiness are distinct; health and application retry cover the actual dependency contract.'
        ),
        check(
          'How should a local destructive reset be exposed?',
          [
            'As the default behavior of every normal stop command',
            'As a recursive deletion based on an unresolved variable',
            'As an automatic action whenever a health check fails',
            'As a separate explicit operation scoped to project data'
          ],
          3,
          'Separating reset from routine lifecycle protects local state and makes the destructive target reviewable.'
        )
      ]
    ),
    lesson(
      'cloud-foundations',
      'Cloud architecture, identity, and shared responsibility',
      `# Cloud architecture, identity, and shared responsibility

Cloud platforms expose compute, storage, networking, identity, databases, messaging, and operational controls through APIs. The important shift is not renting somebody else's computer; it is treating infrastructure capabilities as programmable resources with explicit ownership, lifecycle, policy, and cost. Managed services transfer some work to the provider, but never transfer responsibility for your data model, access choices, resilience goals, or application correctness.

In infrastructure as a service, the provider operates facilities, physical hardware, and parts of virtualization while you usually own guest operating systems, networks, identities, applications, and data. Platform and managed services move the boundary, but you still configure access, availability, backups, encryption, and usage correctly. Read the exact service responsibility model rather than assuming "managed" means "cannot fail."

## Regions, zones, and failure domains

A region is a geographic deployment area; an availability zone is an isolated failure domain within it, though exact design differs by provider. Multiple replicas in one zone do not survive a zone failure. Multiple zones reduce correlated infrastructure risk but add network, data, consistency, and cost decisions. Multiple regions add much more operational complexity. Choose from explicit recovery objectives and user needs, not a diagram goal.

Compute instances provide VM control; serverless functions or containers trade control for managed scaling and lifecycle; managed databases trade engine operation for configuration constraints and service pricing. Object storage holds blobs by key and is not a mounted transactional filesystem. Block storage provides virtual disks. Network filesystems provide shared file semantics. Match consistency, durability, latency, throughput, access, and lifecycle to the workload.

## Virtual networks and traffic

A virtual network contains address ranges, subnets, routes, gateways, firewalls or security groups, and private endpoints. Public addressability and inbound permission are separate. Keep workloads private unless they must accept public traffic; place a controlled load balancer or gateway at the edge. Egress is also a security and cost boundary. Record DNS, certificate, route, and firewall ownership.

## Identity before network location

Use human federation with multifactor authentication and short sessions. Workloads receive dedicated identities with narrowly scoped roles. Avoid shared users and long-lived access keys. Authorization policies should name exact actions and resources where practical, and privileged emergency access should be time-bounded, monitored, and reviewed. Organization-level policy can prohibit unsafe regions, public storage, or missing audit logs.

Tag or label resources with owner, service, environment, data classification, and cost allocation. Centralize immutable audit events outside the ordinary operator's control. Establish budgets and anomaly alerts before scale. A forgotten test database is both a bill and a security exposure.

## Guided practice

Design a cloud landing zone for Relay with public API traffic, private workers and database, separate development and production risk, short-lived CI deployment access, logs, and budget controls.

## Worked solution

Use separate accounts, projects, or subscriptions for production and lower environments under organization policy. Place only a managed edge load balancer in public subnets; keep API compute, workers, and database on private networks with narrowly scoped ingress and egress. Give each workload and deployment workflow a distinct federated identity. Production deployment trusts only the protected workflow and environment. Centralize audit, DNS, certificate, security, and billing logs in protected services. Encrypt data with managed keys appropriate to the threat model, enable tested database backups, and declare zone behavior from recovery objectives. Require owner and cost tags, budgets, anomaly alerts, and an expiry process for temporary resources.`,
      [
        check(
          'What remains the customer responsibility with a managed database?',
          [
            'Correct access, data use, configuration, and recovery requirements',
            'Replacing failed physical disks inside the provider facility',
            'Maintaining the provider network backbone and cooling system',
            'Writing the hypervisor used by every underlying compute host'
          ],
          0,
          'Managed service boundaries remove selected operational tasks, not accountability for configuration, access, data, and business recovery.'
        ),
        check(
          'Why spread replicas across availability zones?',
          [
            'To make every database transaction globally synchronous',
            'To reduce exposure to one zone-level failure domain',
            'To remove all network latency between service components',
            'To avoid defining any application recovery behavior'
          ],
          1,
          'Zone diversity targets correlated facility or infrastructure failures within the region, with application tradeoffs still required.'
        ),
        check(
          'Which identity pattern is preferred for a deployment workflow?',
          [
            'A shared administrator password embedded in the repository',
            'A permanent access key copied to every build runner',
            'A short-lived federated identity with a narrow role',
            'An anonymous public endpoint that accepts infrastructure changes'
          ],
          2,
          'Federation and least privilege reduce credential lifetime and bind deployment authority to a controlled workflow.'
        ),
        check(
          'What should determine a multi-region design?',
          [
            'A rule that every cloud application requires two regions',
            'The desire to use the greatest number of managed products',
            'An assumption that regional data never needs synchronization',
            'Explicit user, recovery, compliance, and cost requirements'
          ],
          3,
          'Multi-region systems add major consistency and operating complexity and should buy a clearly stated outcome.'
        )
      ]
    ),
    lesson(
      'infrastructure-as-code',
      'Infrastructure as code with OpenTofu',
      `# Infrastructure as code with OpenTofu

Infrastructure as code represents desired resources in versioned configuration and uses provider APIs to plan and reconcile changes. It replaces unrecorded console actions with reviewable, repeatable intent. It does not make every change safe automatically. Provider behavior, state, credentials, destructive plans, service quotas, and eventual consistency remain real.

OpenTofu configurations contain blocks for required providers, provider configuration, resources, data sources, input variables, local values, outputs, and modules. A resource block declares lifecycle ownership. A data source reads an object managed elsewhere. The distinction matters: declaring a shared network as a resource in two states creates competing ownership.

\`\`\`hcl
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

variable "service_name" {
  type = string
  validation {
    condition     = can(regex("^[a-z][a-z0-9-]+$", var.service_name))
    error_message = "service_name must be a lowercase DNS-style name"
  }
}

resource "local_file" "manifest" {
  filename = "\${path.module}/out/\${var.service_name}.txt"
  content  = "service=\${var.service_name}\n"
}
\`\`\`

Within this TypeScript template the example is conceptual; in a real HCL file the interpolation expressions are written normally. Initialization installs declared providers and configures the backend. Validation checks syntax and internal rules. Planning compares configuration, recorded state, and refreshed remote objects to propose actions. Apply executes an approved plan and records resulting bindings.

## Declarative dependencies

References between resource attributes create graph dependencies. Add an explicit dependency only for a real ordering relationship that data flow cannot express. Arbitrary dependencies serialize work and hide design. Provider operations must still handle eventual readiness; creation completion does not always mean the service is usable.

Variables are module inputs, locals name derived expressions, and outputs expose a deliberate interface. Marking a value sensitive reduces display but does not remove it from state. Do not pass secrets through infrastructure code unless the provider and state protection model is acceptable; prefer creating secret containers and letting a controlled secret workflow populate values.

## The operating loop

Format and validate on every change. Run policy and security checks. Create a saved plan from the exact reviewed revision and environment. Review additions, changes, replacements, deletions, unknowns, and cost or blast radius. Apply that exact plan with serialized state access and short-lived identity. Verify postconditions and preserve plan and apply evidence. Do not approve a plan summary without inspecting surprising details.

## Guided practice

Model Relay's network, load balancer, compute identity, and database at a high level. Decide which values are inputs, derived locals, resources, data sources, and outputs, and define the first safe plan review.

## Worked solution

Inputs include environment, region, address range, capacity bounds, and approved database class. Locals create consistent names and required tags. Existing organization DNS zone and shared audit sink are data sources because another state owns them. This stack owns its network segments, rules, workload identity, load balancer, compute group, database, and backup policy. Outputs expose only integration values such as service endpoint and workload identity, not raw credentials. CI validates and plans using read plus planned write permissions; a protected apply job assumes the write role. Review flags any public database route, wildcard identity grant, replacement, deletion, backup reduction, or cross-zone change before approval.`,
      [
        check(
          'What does an infrastructure resource block declare?',
          [
            'Lifecycle ownership of an object managed through a provider',
            'A comment that can never result in remote API operations',
            'A temporary cache that is always safe to delete manually',
            'A secret guaranteed to remain absent from state snapshots'
          ],
          0,
          'A managed resource binds configuration and state to the lifecycle of a remote object.'
        ),
        check(
          'What is the purpose of an infrastructure plan?',
          [
            'To apply every provider upgrade without showing changes',
            'To propose changes from configuration, state, and observed reality',
            'To prove that every created service is ready for user traffic',
            'To remove the need for state locking during mutation'
          ],
          1,
          'The plan is review evidence for intended reconciliation, not proof of runtime readiness or safe concurrent apply.'
        ),
        check(
          'Why use a data source for a shared network owned elsewhere?',
          [
            'Data sources automatically copy all network resources into this state',
            'A data source grants administrator permission to every module',
            'It reads integration data without claiming competing lifecycle ownership',
            'It prevents the network from being changed by its actual owner'
          ],
          2,
          'One state should own lifecycle; consumers can read its interface rather than declaring the same object again.'
        ),
        check(
          'What should a protected apply job execute?',
          [
            'A fresh unreviewed plan created from a different revision',
            'Every stack concurrently using one unrestricted credential',
            'A targeted change that ignores the rest of configuration forever',
            'The saved reviewed plan under serialized state access'
          ],
          3,
          'Applying the preserved plan maintains the review-to-mutation link, while locking prevents competing state writes.'
        )
      ]
    ),
    lesson(
      'iac-state-and-modules',
      'State, modules, drift, testing, and safe evolution',
      `# State, modules, drift, testing, and safe evolution

OpenTofu state maps declared resource addresses to remote object identities and stores metadata needed to plan changes. It can contain infrastructure attributes and sensitive values. Protect it like production configuration data: remote encrypted storage, access control, versioning, audit, and locking. Do not commit state to source or edit its JSON directly. Use supported state commands only after a backup and exact plan.

One state should have a bounded blast radius, ownership group, lifecycle, and rate of change. A single global state serializes unrelated teams and makes every plan risky. Thousands of tiny states create dependency and discoverability problems. Split on trust, environment, service boundary, failure impact, and independent lifecycle. Exchange narrow outputs through a registry, parameter system, or remote-state interface whose coupling is understood.

Workspaces provide multiple state instances for one configuration, but are not a strong separation mechanism for environments requiring different credentials, access policies, or architecture. Separate roots and backends are usually clearer for those boundaries.

## Module design

A module packages a coherent infrastructure capability behind typed inputs and deliberate outputs. A useful module creates a meaningful policy-bearing unit such as a production-ready service identity or database, not a thin wrapper around every provider resource. Validate inputs, choose safe defaults, expose escape hatches sparingly, document upgrade and deletion behavior, and publish versions. Callers pin a reviewed module version.

Provider and module versions need constraints plus lock information. Upgrade through an automated change that produces a plan and tests. A version constraint describes acceptable choices; a lock records the selected provider build. Module source pinning depends on its distribution mechanism and should resolve to immutable reviewed content.

## Drift and import

Drift is a difference between configuration, state, and remote reality. Some drift comes from incident intervention, autoscaling controllers, provider defaults, or unauthorized changes. Detect it on a schedule and decide whether code should adopt the change or reconciliation should revert it. Blindly applying can erase a valid emergency fix; leaving it undocumented makes the next apply surprising.

Import binds an existing remote object to a resource address; it does not magically create correct configuration. Write the intended declaration, import the exact identity, plan until no unintended mutation remains, then bring it under normal review. Moving resource addresses should use declarative moved blocks or supported state operations so the tool understands identity continuity rather than destroy and recreate.

## Tests and guardrails

Format, validate, lint, scan, and apply policy to plans. Unit-like tests can evaluate expressions and module contracts; integration tests can create isolated temporary resources and destroy them reliably. Policy should block high-risk facts such as public storage, unrestricted ingress, missing encryption, or absent required tags. It cannot understand every business context, so provide an explicit exception process with owner and expiry.

## Guided practice

Relay began as one state for development and production. A developer manually enlarged the production database during an incident. Plan the state split, drift decision, and module evolution without replacing the database.

## Worked solution

Freeze ordinary applies and back up the versioned locked state. Document the incident resize and decide to adopt it until capacity analysis says otherwise. Add the matching production configuration so the plan is stable. Design separate roots and backends with separate identities for production and lower environments. Move bindings using supported state move or import procedures, one reviewed address at a time, verifying a no-replacement plan after each boundary; never merely copy and edit JSON. Extract only a meaningful database module with inputs for engine, capacity, backup, network, and deletion protection. Add moved blocks for address changes where supported. Rehearse on a restored nonproduction state, preserve rollback copies, and require production plans to show no database recreation.`,
      [
        check(
          'Why must infrastructure state be strongly protected?',
          [
            'It binds real resources and may contain sensitive attributes',
            'It contains only comments that providers never read',
            'It is recreated perfectly from log messages after every apply',
            'It cannot influence deletion or replacement decisions'
          ],
          0,
          'State controls identity bindings and planning and may expose sensitive infrastructure data.'
        ),
        check(
          'What is a good module boundary?',
          [
            'One wrapper for every individual provider argument',
            'A coherent policy-bearing capability with a stable interface',
            'A global module that owns all unrelated company infrastructure',
            'An unversioned source directory edited directly by consumers'
          ],
          1,
          'Modules are most valuable when they encode a meaningful reusable capability and its safety policy.'
        ),
        check(
          'How should valid emergency drift be handled?',
          [
            'Ignore it permanently so no review ever observes the change',
            'Immediately overwrite it without asking why it exists',
            'Document and reconcile it into code or deliberately revert it',
            'Delete the state backend and rediscover resources by accident'
          ],
          2,
          'Drift requires an ownership decision so the next normal apply reflects intentional reality.'
        ),
        check(
          'What does importing a remote resource accomplish?',
          [
            'It generates a complete correct architecture automatically',
            'It converts the resource into an ephemeral test fixture',
            'It disables all future changes to the imported object',
            'It binds an existing object identity to a declared address'
          ],
          3,
          'Import establishes identity in state; configuration and a safe no-surprise plan still need to be authored.'
        )
      ]
    ),
    lesson(
      'configuration-management',
      'Configuration management and immutable infrastructure',
      `# Configuration management and immutable infrastructure

Infrastructure as code usually creates infrastructure resources; configuration management brings operating systems and software toward a desired state. Tools such as Ansible connect to hosts and apply packages, users, files, services, and policies. Image-building tools create a preconfigured machine image before deployment. These approaches can be combined, but unclear ownership creates drift.

A configuration task should be declarative and idempotent: install a named package state, render a file from controlled variables, ensure a service is enabled and running. A handler restarts or reloads only when its dependent configuration changes. Shell commands are an escape hatch; they need explicit changed conditions, failure rules, safe quoting, and idempotency guards.

Group inventory by capability and environment rather than embedding policy in hostnames. Variables need an understandable precedence model. Encrypting a secret file protects it at rest but still requires key access, rotation, redaction, and minimum exposure on the target. Prefer references to a secret service when available.

## Mutable and immutable patterns

In-place configuration is useful for base policy, long-lived specialized hosts, and emergency repair, but repeated history can make nominally identical hosts differ. Immutable infrastructure builds a versioned machine image, tests it, and replaces instances rather than upgrading them in place. This narrows configuration combinations and makes rollback an image selection. It does not make state immutable, eliminate kernel maintenance, or excuse slow image updates.

A strong pattern builds a minimal base through a trusted pipeline, applies hardening and required agents, tests boot and service behavior, scans it, records provenance, and publishes by immutable identity. Infrastructure then rolls a new instance group from that image and drains the old group. Avoid one giant company image containing every language and agent; it becomes slow, vulnerable, and impossible to own.

## Patch and fleet strategy

Define severity-based deadlines, regular rebuild cadence, emergency path, reboot handling, and end-of-life policy. Inventory actual versions, not intended versions. Replace or patch in bounded waves across failure domains. Begin with a representative canary, verify user behavior, then continue. Retain enough prior image and configuration compatibility for rollback.

Configuration runs need concurrency limits, failure summaries, unreachable-host treatment, and serial rollout. A run that succeeds on 95% of hosts may create a dangerous split fleet. Record exactly which hosts changed and verify the postcondition rather than trusting task exit alone.

## Guided practice

Relay runs on 100 VMs whose packages and service units have drifted. Design a transition to image-based replacement without changing every host at once or losing the ability to recover.

## Worked solution

First inventory actual packages, unit files, kernel, application digest, and configuration fingerprint. Capture the intended base in reviewed configuration and build a new versioned image in CI. Test boot, identity, networking, telemetry, Relay health, shutdown, vulnerability policy, and a restart after configuration load. Launch a small canary group in a separate capacity pool, route representative traffic, and compare user and host signals. Expand one failure domain at a time while draining old nodes. Keep configuration external and compatible with the prior image through the rollback window. Quarantine rather than silently retain failed nodes. Once replacement is complete, disable in-place snowflake changes except a documented emergency path that creates a follow-up image change.`,
      [
        check(
          'What property should a configuration-management task have?',
          [
            'Repeated execution converges on the declared state',
            'Every execution reports changed even when nothing differs',
            'It depends on an undocumented command run by one operator',
            'It stores target credentials in unprotected inventory text'
          ],
          0,
          'Idempotent tasks make retries and scheduled convergence safe and make actual changes visible.'
        ),
        check(
          'What is the core immutable-infrastructure update pattern?',
          [
            'SSH to each production host and apply unique edits',
            'Build and verify a new image, then replace instances gradually',
            'Keep one host forever so its identity never changes',
            'Store all durable application state in the machine image'
          ],
          1,
          'Replacement from a tested image reduces accumulated host history while rollout controls service risk.'
        ),
        check(
          'Why is 95% configuration success potentially unsafe?',
          [
            'Configuration tools cannot operate on more than ten hosts',
            'Every unchanged host is automatically deleted by the provider',
            'The resulting split fleet may have inconsistent security and behavior',
            'A partial run always consumes all available network addresses'
          ],
          2,
          'Unknown or mixed states can violate compatibility and security assumptions; failed targets require explicit handling.'
        ),
        check(
          'What should an emergency host repair produce afterward?',
          [
            'A policy that preserves the repaired host as a permanent exception',
            'A deletion of all logs showing the emergency intervention',
            'A requirement that future images avoid the same repair',
            'A reviewed source change incorporated into the next image'
          ],
          3,
          'The fleet definition must learn the fix so replacement does not reintroduce the incident condition.'
        )
      ]
    ),
    lesson(
      'kubernetes-architecture',
      'Kubernetes architecture and reconciliation',
      `# Kubernetes architecture and reconciliation

Kubernetes is a platform for declaratively managing containerized workloads. Its central idea is reconciliation: users submit desired API objects, controllers observe desired and actual state, and repeatedly act to reduce the difference. It is not a collection of remote shell commands and does not make an application reliable without correct probes, resources, storage, security, and failure behavior.

The control plane includes the API server, which validates and persists object operations; a backing store for cluster state; the scheduler, which assigns unscheduled Pods to nodes; and controllers, which reconcile resources. Nodes run a kubelet that makes assigned Pod specifications real, a container runtime, and networking components. Managed Kubernetes may operate much of this plane, while you still own workload and many cluster policies.

## API objects

Objects have an API version, kind, metadata, desired specification, and observed status. Names identify objects in a namespace; labels identify sets and power selectors; annotations hold nonidentifying metadata. Labels are part of operational design. A selector that accidentally matches two applications can send traffic or controller ownership to both.

Most writes are declarative and asynchronous. An accepted Deployment does not mean its replicas are ready. Generation and observed-generation fields, conditions, events, and controller status explain reconciliation. Use watches or bounded polling instead of assuming immediate convergence.

Namespaces scope many names and policies but are not complete security boundaries. Cluster-scoped resources, node kernels, privileged workloads, and shared control-plane behavior cross them. Use separate clusters or accounts when the threat and failure boundary requires stronger isolation.

## Pods and desired state

A Pod is the smallest deployable compute object. Its containers share a network namespace and can share volumes. Pods are disposable identities; controllers replace them. Do not depend on a Pod name, local writable layer, or fixed IP for durable identity. Higher-level workloads manage replicas and rollout. Services provide stable discovery over changing Pod endpoints.

The scheduler filters and scores feasible nodes using resource requests, constraints, affinity, taints, topology, and policy. It does not move a running Pod because another node later becomes better. The kubelet restarts containers according to Pod policy, while workload controllers replace failed Pods.

## kubectl as an API client

\`kubectl get\` summarizes objects, \`describe\` shows conditions and events, \`logs\` reads container output, \`exec\` starts a process in a container, and \`apply\` submits declared state. Use explicit contexts and namespaces. A command against the wrong cluster can be destructive; display context in the prompt, restrict credentials, and require stronger production controls than operator memory.

## Guided practice

A Deployment was accepted, but no Relay Pod becomes Running. Describe a reconciliation-based diagnosis from Deployment down to node without repeatedly deleting Pods.

## Worked solution

Inspect Deployment conditions, desired and available replica counts, then its ReplicaSet and Pod status. If Pods are Pending, read scheduling events for insufficient requested resources, taints, affinity, quotas, unbound volumes, or policy rejection. If assigned but not running, inspect image pull, secret, mount, runtime, and node conditions. If running but unavailable, inspect readiness and application logs. Confirm selectors and ownership references at every layer. Deleting Pods merely asks the same controller to recreate the same desired state; fix the unsatisfied constraint or declaration and observe controllers converge.`,
      [
        check(
          'What is Kubernetes reconciliation?',
          [
            'Controllers repeatedly act to move actual state toward declared state',
            'Operators manually run every container command on each node',
            'The scheduler stores all application data inside Pod names',
            'The API server guarantees immediate readiness after object acceptance'
          ],
          0,
          'Controllers continuously compare desired and observed reality; API acceptance begins rather than completes convergence.'
        ),
        check(
          'What is a label commonly used for?',
          [
            'Storing an unbounded encrypted database backup',
            'Selecting and grouping related API objects',
            'Replacing all authentication to the API server',
            'Giving every Pod a permanent network address'
          ],
          1,
          'Labels form queryable identity dimensions used by controllers, Services, and policy selectors.'
        ),
        check(
          'Why should an application not rely on a Pod IP?',
          [
            'Pods cannot open any transport-layer connection',
            'All containers in a Pod have separate external IP addresses',
            'Pod instances are disposable and replacement identities change',
            'The API server exposes every Pod directly to the public internet'
          ],
          2,
          'Controllers replace Pods, so stable communication belongs behind Services and durable identity belongs elsewhere.'
        ),
        check(
          'What does an accepted Deployment object prove?',
          [
            'Every desired replica has completed its startup check',
            'The service has met its user-facing reliability objective',
            'All future image pulls are guaranteed to succeed',
            'The API accepted desired state, not that rollout is complete'
          ],
          3,
          'Status and conditions must be observed until the asynchronous controllers achieve the required availability.'
        )
      ]
    ),
    lesson(
      'kubernetes-workloads',
      'Pods, Deployments, Jobs, and rollout mechanics',
      `# Pods, Deployments, Jobs, and rollout mechanics

Choose a Kubernetes workload controller from lifecycle semantics. A Deployment manages interchangeable stateless replicas through ReplicaSets and rolling updates. A StatefulSet gives ordered stable Pod identities and per-replica storage claims, but the application must still implement replication, quorum, backup, and recovery. A DaemonSet places a Pod on matching nodes for node-local functions. A Job runs work to completion; a CronJob creates Jobs on a schedule. A bare Pod lacks a controller and is rarely an application deployment.

A Pod template defines containers, images, commands, ports, environment, mounts, security context, probes, and resource expectations. A template change creates a new workload revision. Selectors are effectively immutable identity and must exactly match intended template labels. Put version and ownership metadata on the template, but avoid high-cardinality or mutable identity in selector labels.

## Rolling Deployments

A rolling Deployment balances \`maxSurge\` and \`maxUnavailable\`. Surge adds temporary capacity; unavailable permits capacity below desired replicas. Readiness determines whether a new Pod can receive Service traffic and counts toward availability. A minimum-ready duration can require stability before progress. A progress deadline reports a stuck rollout; it does not automatically prove rollback is safe.

Termination begins with endpoint removal and a TERM signal, but distributed propagation is not instantaneous. Applications should become unready, stop admission, drain, and exit within the grace period. A pre-stop hook may assist but consumes the same deadline and should not replace signal handling. Keep enough replicas and a disruption budget to tolerate voluntary maintenance.

## Jobs and delivery semantics

Jobs may retry failed Pods. CronJobs can miss or overlap schedules depending on delays and concurrency policy. Neither guarantees exactly-once business effects. Give each logical operation a durable idempotency key, claim work transactionally, and make output commits converge. Set deadlines, retry limits, and cleanup policy. A failed Job should retain useful status and logs long enough for diagnosis.

Init containers run to completion before application containers and can perform narrow preparation. Do not place an unbounded global migration in every Pod's init path; simultaneous replicas can contend, and a failure blocks the whole rollout. Run migrations as a separately owned release step or Job with locking and evidence.

## Debugging without mutation

Compare the desired template, live object, controller revision, and actual container identity. Read events and previous container logs after restarts. Use an ephemeral debug container when the production image intentionally lacks tools, subject to access policy and audit. Avoid editing a live Pod; controllers replace it and the change is not source-controlled.

## Guided practice

Relay API has six replicas. During rollout, all old Pods terminate before new Pods pass a slow startup. Design workload settings and application behavior that preserve capacity and make failure visible.

## Worked solution

Use a Deployment with a startup probe sized from measured initialization, readiness on the real serving contract, and liveness only for internal deadlock. Configure zero or low unavailability and bounded surge according to capacity. Require a minimum ready duration and progress deadline. On TERM, mark unready immediately, drain requests, and exit inside the grace period. Keep the schema compatible with old and new replicas. Ensure scheduling requests leave room for surge. A disruption budget protects voluntary node work but does not block every involuntary failure. The release controller watches available replicas, user-level errors, and rollout conditions and aborts expansion when the deadline or health threshold is crossed.`,
      [
        check(
          'Which controller fits interchangeable stateless HTTP replicas?',
          ['A Deployment', 'A bare Pod', 'A CronJob', 'A PersistentVolume'],
          0,
          'Deployments manage replica replacement and rolling revisions for interchangeable long-running workloads.'
        ),
        check(
          'What does maxSurge control during a rolling update?',
          [
            'The number of permanent database schema versions',
            'Temporary replicas allowed above the desired count',
            'The maximum size of every application log message',
            'The count of namespaces an identity may access'
          ],
          1,
          'Surge trades temporary capacity for the ability to start new replicas before removing old ones.'
        ),
        check(
          'Why does a Job not guarantee exactly-once business execution?',
          [
            'Jobs cannot start more than one container process',
            'Completed Jobs are always converted into Deployments',
            'Pod retries can repeat work after an unknown outcome',
            'Cron schedules disable all persistent storage access'
          ],
          2,
          'Infrastructure retries provide at-least-once attempts; the application needs stable identity and idempotent commit.'
        ),
        check(
          'Where should a global schema migration run?',
          [
            'Unbounded in every application Pod startup at the same time',
            'Inside the liveness probe for continuous verification',
            'As a manual live-Pod edit that controllers cannot observe',
            'As a separately controlled, locked, and observed release step'
          ],
          3,
          'A single explicit migration operation has clear ownership, concurrency control, evidence, and failure handling.'
        )
      ]
    ),
    lesson(
      'kubernetes-networking',
      'Kubernetes Services, DNS, ingress, and network policy',
      `# Kubernetes Services, DNS, ingress, and network policy

Every Pod receives an address in the cluster network, and containers inside a Pod share one network namespace. Pod addresses are replaceable. A Service gives a stable virtual endpoint and DNS name for a selected set of ready Pods. Its selector must match the intended workload labels; readiness controls endpoint membership. A healthy Service object with no endpoints usually indicates a selector or readiness problem, not a reason to restart cluster DNS.

Service types express exposure. ClusterIP is internal. NodePort exposes a port on nodes and is often an implementation detail for another edge. LoadBalancer asks an integration to provision an external balancer. An ExternalName provides a DNS alias and has protocol caveats. Headless Services omit the virtual IP and return individual endpoints, useful when clients need replica discovery.

## DNS and discovery

Cluster DNS creates names such as \`relay-api.apps.svc.cluster.local\`. A short name resolves according to the Pod's namespace and search configuration. Use a fully qualified name across namespaces to avoid accidental shadowing. DNS discovery tells a client where a service is, not whether one operation will succeed. Clients still need connection pools, deadlines, bounded retries, and endpoint change handling.

## North-south and east-west traffic

Ingress resources historically describe HTTP entry routing and require an ingress controller. The newer Gateway API separates infrastructure and application routing roles with resources such as GatewayClass, Gateway, and HTTPRoute. Availability depends on installed controllers and supported features; an API object alone does not create a data plane. Whichever interface you use, declare TLS termination, hostname, path rules, timeouts, request limits, trusted forwarding headers, and backend readiness.

East-west traffic flows between workloads. A service mesh may add workload identity, traffic policy, and telemetry, but also adds proxies or nodes, control planes, upgrades, latency, and failure modes. Start with application and platform needs, not a default mandate.

## NetworkPolicy

NetworkPolicy declares allowed ingress and egress for selected Pods, but enforcement requires a network implementation that supports it. Once a Pod is selected for a direction, traffic not allowed by applicable policies is denied for that direction. Build default-deny policy and add exact flows: edge to API, API to database or queue, worker to database, DNS where needed, and telemetry. Policy is usually based on Pod and namespace labels or IP ranges, not Service names. DNS, control-plane, health, and external dependencies must be included deliberately.

Network policy is not application authorization. A permitted connection still needs TLS identity and endpoint-level access. Egress restrictions reduce exfiltration and unexpected dependencies, but dynamic external services may require gateways or carefully owned ranges.

## Guided practice

Relay's API Service has no endpoints, and after adding default-deny policy workers can no longer resolve the database name. Diagnose both and produce minimum network flows.

## Worked solution

Compare the Service selector with API Pod labels, then inspect endpoint slices and readiness. If labels match but Pods are unready, fix readiness rather than bypassing it. For DNS failure, confirm the policy selected workers for egress and explicitly allow UDP and TCP DNS traffic to the cluster DNS Pods in its namespace, then allow database traffic to the exact destination and port. Add ingress to the API only from the edge controller namespace, API and worker egress to database, and telemetry flows. Validate from a disposable diagnostic Pod with the same labels and service account, then test unauthorized paths remain denied.`,
      [
        check(
          'What provides a stable endpoint over changing Pod replicas?',
          ['A Service', 'A container writable layer', 'A node hostname file', 'A Pod restart counter'],
          0,
          'A Service selects current endpoints and offers a stable virtual address and discoverable name.'
        ),
        check(
          'What commonly causes a Service to have no endpoints?',
          [
            'The image contains more than one filesystem layer',
            'Its selector matches no ready Pods',
            'The namespace has at least one resource quota',
            'A node has a different operating-system hostname'
          ],
          1,
          'Endpoint membership follows selector identity and readiness, so both should be inspected first.'
        ),
        check(
          'What must exist for an Ingress or Gateway route to carry traffic?',
          [
            'A privileged shell inside every application container',
            'A shared writable volume mounted into all namespaces',
            'A compatible controller and configured data plane',
            'A policy that disables hostname and certificate checks'
          ],
          2,
          'Declarative routing resources require an implementation to reconcile them into actual load-balancing behavior.'
        ),
        check(
          'What does NetworkPolicy not replace?',
          [
            'Pod label selection for defining traffic groups',
            'The network plugin that enforces declared rules',
            'An egress decision for external destinations',
            'Application identity, authentication, and authorization'
          ],
          3,
          'Network reachability is one layer; services must still authenticate and authorize the caller and operation.'
        )
      ]
    ),
    lesson(
      'kubernetes-config-storage',
      'Configuration, Secrets, persistent storage, and state',
      `# Configuration, Secrets, persistent storage, and state

ConfigMaps and Secrets hold configuration data outside an image. A ConfigMap is for nonconfidential values. A Secret receives special handling but is not automatically safe merely because of its kind: API access, backing-store encryption, node access, manifests, logs, backups, and mounted consumers all matter. Base64 representation is encoding, not encryption.

Values can enter a container as environment variables or mounted files. Environment variables are fixed for the process and can leak through child processes or diagnostics. Projected files can update when the source changes, but applications must reopen or watch them correctly, and propagation has delay. A rollout triggered by a configuration digest gives a clear versioned transition. Treat reload as an explicit application feature with validation and fallback.

Keep secret values out of source-controlled manifests. Integrate a secret manager through a controller, CSI driver, or workload identity according to platform policy. Prefer short-lived dynamic credentials where supported. Limit RBAC to exact consumers, disable unnecessary service-account token mounting, rotate, and audit. A namespace user who can create a Pod that mounts another Secret may effectively read it, even without direct Secret get permission; privilege analysis must include workload creation.

## Volumes and claims

A volume gives containers in a Pod shared or persistent storage according to its type. \`emptyDir\` follows the Pod lifetime and is useful for scratch space, not durable state. A PersistentVolume represents storage capacity; a PersistentVolumeClaim requests it; a StorageClass describes dynamic provisioning behavior. Access modes describe attachment intent but do not magically provide application-safe concurrent writes.

Reclaim policy determines what happens to storage after a claim is removed. Expansion, snapshots, topology, performance class, encryption, and backup behavior depend on the driver and provider. A snapshot is not automatically an application-consistent backup. Databases may need coordinated flush, engine-native backup, write-ahead logs, and restore verification.

StatefulSets provide stable ordinal identity and per-replica claims. They do not create consensus, replication, failover, or data repair. Prefer a managed data service when it meets requirements and reduces undifferentiated operational work. If running stateful systems in Kubernetes, understand their operator, quorum, failure domains, upgrade sequence, backup format, and disaster recovery independently of Kubernetes objects.

## Guided practice

Relay reads a database password from an environment variable and stores PostgreSQL on \`emptyDir\`. Redesign configuration, credential rotation, storage, backup, and deletion protection.

## Worked solution

Move ordinary settings to a versioned ConfigMap and trigger a controlled rollout from its content digest. Obtain a short-lived database credential using the Relay workload identity or mount it from a tightly scoped secret integration; teach the application to reopen the credential and connections during rotation. PostgreSQL uses a managed service or a properly operated stateful deployment with dynamically provisioned persistent storage, encryption, zone-aware placement, and a retain-oriented deletion policy. Backups use database-consistent methods plus logs for the required recovery point, leave the cluster or failure domain, and are restore-tested. Admission and RBAC prevent ordinary deployment identities from deleting production claims or reading unrelated secrets.`,
      [
        check(
          'What does base64 do for a Kubernetes Secret value?',
          [
            'It encodes the value but does not provide confidentiality',
            'It encrypts the value with a workload-specific private key',
            'It prevents every API identity from requesting the object',
            'It rotates the underlying credential on every Pod restart'
          ],
          0,
          'Base64 is a representation. Confidentiality depends on access, storage encryption, delivery, and consumer controls.'
        ),
        check(
          'What is emptyDir suitable for?',
          [
            'A database that must survive Pod replacement indefinitely',
            'Scratch data whose lifecycle follows the Pod',
            'A cross-region backup archive with retention guarantees',
            'A permanent identity shared by every StatefulSet replica'
          ],
          1,
          'emptyDir persists across container restarts within one Pod but is removed with that Pod.'
        ),
        check(
          'What does a StatefulSet not supply by itself?',
          [
            'Stable ordinal names for managed Pods',
            'A template for per-replica volume claims',
            'Application replication, quorum, and data recovery',
            'Ordered behavior for selected lifecycle operations'
          ],
          2,
          'Stable identities help stateful software, but the software or operator must implement data-system correctness.'
        ),
        check(
          'What proves a database backup is useful?',
          [
            'The backup object has a recent creation timestamp',
            'The claim uses the largest available storage class',
            'The snapshot exists in the same failure domain as the database',
            'A restore test meets declared recovery objectives'
          ],
          3,
          'Only restoration and validation establish that data, logs, credentials, and procedure can recover the service.'
        )
      ]
    ),
    lesson(
      'kubernetes-resources-scaling',
      'Scheduling, resources, probes, autoscaling, and disruption',
      `# Scheduling, resources, probes, autoscaling, and disruption

Kubernetes schedules Pods primarily from resource requests and constraints. A CPU request influences placement and relative CPU shares; a memory request reserves schedulable capacity. Limits cap usage: CPU is generally throttled, while exceeding a memory limit can lead to termination. Requests that are too low overpack nodes and cause contention; requests that are too high waste capacity and leave Pods Pending. Derive them from observed distributions and load tests, then revisit.

Quality-of-service classes emerge from request and limit combinations and influence eviction under node pressure. Node ephemeral storage, process ids, and local volumes can also exhaust. Observe node conditions and eviction reasons, not only container CPU and memory graphs.

## Placement and failure domains

Node selectors and affinity choose eligible topology. Taints repel Pods unless they tolerate them. Pod affinity can colocate cooperating workloads; anti-affinity and topology spread distribute replicas across nodes or zones. Hard rules can make a workload unschedulable during partial failure. Use the weakest constraint that satisfies the requirement and test reduced-capacity behavior.

Priority can allow important Pods to preempt lower-priority work, but it does not create capacity and may cause cascading disruption. Reserve it for a small intentional hierarchy. Quotas constrain namespace aggregate resources; limit ranges set defaults and bounds.

## Probes

A startup probe delays liveness and readiness until initialization succeeds. Readiness removes an instance from Service traffic without restarting it. Liveness restarts a stuck container. Probe endpoints should be cheap, bounded, and semantically distinct. Avoid depending on every remote service in liveness. Account for failure threshold, interval, timeout, and the time controllers need to propagate endpoint changes.

## Autoscaling

Horizontal Pod Autoscaling changes replica count from observed metrics. CPU utilization is relative to requests, so incorrect requests distort it. Queue age or work backlog may better represent a worker. Metrics arrive with delay, new capacity has startup delay, and scale-down needs stabilization to avoid oscillation. Autoscaling handles variable demand within capacity; it does not replace load shedding, quotas, or capacity planning.

Cluster autoscaling adds nodes when Pods cannot schedule under supported conditions and removes eligible underused nodes. It reacts after demand appears, so headroom and fast startup still matter. Vertical recommendations can improve requests but changing them may restart Pods.

Pod disruption budgets limit simultaneous voluntary disruption to preserve availability. They do not protect against hardware failure, broken rollouts, or an application whose replicas share one dependency. Combine them with topology spread and tested failure behavior.

## Guided practice

Relay worker HPA scales on CPU, but queue age grows while CPU stays low because workers wait on external I/O. Redesign its metric, requests, scale behavior, and overload protection.

## Worked solution

Use queue age and ready backlog per effective worker as primary demand, with completion rate and dependency saturation as guardrails. Establish CPU and memory requests from stable workload percentiles and limits from tested failure behavior. Scale out before queue age violates the objective, accounting for image pull and startup delay; retain headroom or warm minimum replicas. Stabilize scale-down and drain workers so claims are not lost. Cap maximum replicas at database and downstream safe concurrency. When the cap is reached, apply admission limits, priority, or delayed acceptance rather than producing a retry storm. Monitor desired versus ready replicas, pending scheduling reasons, queue age, oldest job, completions, errors, and downstream connection pressure.`,
      [
        check(
          'What is a Kubernetes resource request used for?',
          [
            'Scheduling capacity and relative resource entitlement',
            'Encrypting every container filesystem layer',
            'Selecting the public DNS name for a Service',
            'Defining the number of historical image versions retained'
          ],
          0,
          'Requests tell the scheduler what capacity the Pod needs and influence runtime resource allocation.'
        ),
        check(
          'What happens when a readiness probe fails?',
          [
            'The node operating system always reboots immediately',
            'The instance is removed from ready traffic endpoints',
            'Every PersistentVolume in the namespace is deleted',
            'The container image is automatically rebuilt from source'
          ],
          1,
          'Readiness controls admission to an instance; liveness is the probe associated with restart.'
        ),
        check(
          'Why can CPU-based HPA be misleading?',
          [
            'CPU measurements are never available inside a cluster',
            'Horizontal scaling can operate only on storage capacity',
            'Utilization depends on requests and may not represent user demand',
            'Every service has exactly the same CPU-to-demand relationship'
          ],
          2,
          'Bad requests distort the percentage, and I/O or queue-bound work may need a demand metric closer to its service objective.'
        ),
        check(
          'What does a Pod disruption budget cover?',
          [
            'Every involuntary node and regional failure automatically',
            'Any application error caused by a new software version',
            'Unlimited capacity for all high-priority workloads',
            'The allowed concurrent impact of voluntary disruptions'
          ],
          3,
          'A disruption budget coordinates planned eviction; topology and application resilience address other failures.'
        )
      ]
    ),
    lesson(
      'kubernetes-security',
      'Kubernetes identity, RBAC, admission, and workload security',
      `# Kubernetes identity, RBAC, admission, and workload security

Kubernetes security is a chain: authenticate the caller, authorize the API action, validate the admitted object, schedule it onto a protected node, isolate its runtime and network, protect secrets and supply chain, and audit important activity. A secure image running under a cluster-admin service account is not secure; a strict Pod security context cannot compensate for a compromised control plane.

Human access should come from an external identity provider with short sessions and groups. Workloads use dedicated service accounts. RBAC Roles and ClusterRoles list allowed verbs on API resources; RoleBindings and ClusterRoleBindings grant them to subjects. Prefer namespace-scoped RoleBindings. Avoid wildcards, broad secret access, impersonation, bind, escalate, and workload-creation powers unless required, because several permissions enable privilege escalation indirectly.

Disable automatic service-account token mounting for workloads that do not call the API. Use projected bounded tokens with intended audiences where needed. Periodically review effective permissions and abandoned bindings. Separate deployment, application, and break-glass identities.

## Admission and Pod security

Admission runs after authentication and authorization but before persistence. Built-in Pod Security Admission can enforce the Baseline or Restricted Pod Security Standards by namespace labels. The Restricted profile drives non-root execution, limited privilege escalation, capability dropping, approved seccomp behavior, and other controls. Additional validating policies can require image digests, ownership labels, resource requests, approved registries, or protected topology.

Policy rollout needs audit or warn mode, exception ownership, test fixtures, and expiry. A global deny deployed without observing existing workloads can cause an outage. Mutation can add safe defaults but hidden mutation makes source differ from runtime; prefer visible declarations for important security behavior.

## Nodes, namespaces, and isolation

Containers share node kernels. Keep nodes patched, minimize host access, restrict metadata endpoints, protect kubelet and runtime sockets, and separate high-trust or privileged workloads from exposed untrusted workloads. Privileged Pods, host filesystem mounts, host process or network namespaces, dangerous capabilities, and writable runtime sockets can approach node-level control.

Namespaces organize policy but do not equal hostile multi-tenancy. Combine RBAC, quotas, network policy, Pod security, secret isolation, and possibly separate nodes or clusters. Protect the API and backing store with encryption, audit, backup, and recovery. Audit logs contain sensitive operational data and need retention and restricted access.

## Guided practice

A Relay Pod uses the default service account, runs as root, permits privilege escalation, has no seccomp declaration, uses a mutable image tag, and mounts a broad Secret. Produce a hardened specification and access model.

## Worked solution

Create a Relay-specific service account and disable token mounting because the process does not call the Kubernetes API. Bind no API role. Deploy an image selected by verified digest. At Pod and container scope require non-root with fixed uid, deny privilege escalation, drop all capabilities, apply RuntimeDefault seccomp, make the root filesystem read-only, and mount only the required writable temporary path. Project one exact database credential rather than a broad secret bundle. Enforce Restricted Pod security for the namespace, default-deny networking, resource bounds, and approved image policy. Give the deployment workflow narrow create/update access to Relay resource types without secret read, and use a separately protected identity for secret integration.`,
      [
        check(
          'Where should Kubernetes workload permissions usually be granted?',
          [
            'Through a dedicated service account with the minimum namespace-scoped role',
            'Through the default service account bound to cluster administrator',
            'Through a long-lived human token embedded in the container image',
            'Through unauthenticated access to the API server endpoint'
          ],
          0,
          'Dedicated identity and narrow RoleBindings make workload authority explicit and limit blast radius.'
        ),
        check(
          'When does admission control evaluate an API request?',
          [
            'After the object has been permanently deleted from storage',
            'After authorization but before the object is persisted',
            'Only when a container process exits with a failure code',
            'Before the caller presents any authentication identity'
          ],
          1,
          'Admission validates or mutates an authorized proposed object before it becomes desired cluster state.'
        ),
        check(
          'Why can permission to create Pods be sensitive?',
          [
            'Pod creators automatically own every external DNS domain',
            'Pod creation disables all API audit logs in the cluster',
            'A Pod may mount service tokens, secrets, host paths, or privileged features',
            'Every created Pod receives a permanent control-plane private key'
          ],
          2,
          'Workload creation can become an indirect route to credentials or node access, depending on other available policy.'
        ),
        check(
          'What is the safest way to introduce a broad new admission policy?',
          [
            'Deny production immediately without evaluating existing objects',
            'Create permanent undocumented exemptions for every failure',
            'Allow policy mutation to hide all changes from source review',
            'Observe in audit or warn mode, test, then enforce with owned exceptions'
          ],
          3,
          'Progressive policy rollout reveals compatibility impact and makes remaining exceptions explicit and temporary.'
        )
      ]
    ),
    lesson(
      'kubernetes-packaging',
      'Kubernetes configuration with Kustomize and Helm',
      `# Kubernetes configuration with Kustomize and Helm

Raw Kubernetes YAML becomes repetitive across services and environments. Configuration tools should reduce duplication while keeping rendered desired state reviewable. Kustomize composes a base with overlays and patches. Helm renders parameterized templates from a chart and tracks releases. Both can produce safe systems; both can also hide enormous complexity behind a small input file.

A Kustomize base contains reusable resources. An overlay applies environment-specific patches, names, labels, images, or generators. Prefer small structural patches and inspect the complete rendered output. If overlays replace most of the base, the environments are different architectures and should not pretend otherwise. Generated ConfigMap or Secret names can include content hashes to trigger rollout, but secret source material still must remain outside version control.

A Helm chart contains metadata, default values, templates, and optional schema and tests. Values form its public interface. Validate them with a JSON schema, choose safe defaults, and document required and sensitive values. Templates should use stable naming helpers and render deterministic resources. Avoid arbitrary template-time cluster lookups because the same chart then produces different output depending on hidden live state.

## Release behavior

Helm release history can support upgrade and rollback, but rollback only reapplies Kubernetes manifests and hooks from a prior revision. It does not undo database migrations, external resources, or irreversible application actions. Hooks are operational jobs with ordering, identity, retries, and cleanup; use them sparingly. A failed hook can leave release state and application state out of sync.

Package version and application version are different. The chart can change deployment policy without changing application bytes, and the app can change while chart structure stays the same. Record both plus every image digest. A chart dependency is code: pin, review, scan rendered privileges, and update deliberately.

## Render, validate, diff

CI should render each supported values profile, parse every object, validate schemas, enforce policy, verify immutable images, and compare meaningful changes. Server-side dry run can catch API defaulting or admission behavior against a representative cluster, but it requires controlled access. Store or attach the rendered production manifest to the release evidence so an operator can see exactly what was intended.

Keep environment configuration close enough to application change for compatibility, but protect production promotion according to risk. Avoid copying YAML manually between environments. Prefer a common package and explicit values with policy checks.

## Guided practice

Create a packaging contract for Relay with different replica counts and hostnames in development and production, one application image digest, configuration checksums, and no secret values in source.

## Worked solution

Define one base or chart that owns Deployment, Service, service account, disruption budget, route, and policy. Inputs include hostname, replica bounds, resource profile, nonsecret settings, and exact image digest. Production values cannot relax non-root security, remove requests, or select an unapproved registry because schema and policy reject them. The package references an externally populated Secret by name but never contains its value. A generated ConfigMap checksum annotates the Pod template to make config rollout visible. CI renders development and production, validates API and policy, and publishes the rendered output with chart or base revision and application digest. Database migration remains a separate controlled release operation.`,
      [
        check(
          'What is a Kustomize overlay intended to do?',
          [
            'Apply explicit environment-specific changes to a reusable base',
            'Execute arbitrary shell commands inside the API server process',
            'Store every production credential in plain source-controlled YAML',
            'Replace image digests with mutable local container names'
          ],
          0,
          'An overlay composes and patches declared resources while leaving a renderable full desired state.'
        ),
        check(
          'What should Helm values represent?',
          [
            'Hidden global variables that templates discover without declaration',
            'A validated public configuration interface for the chart',
            'A complete copy of live cluster state after every request',
            'An unrestricted language for modifying the control plane'
          ],
          1,
          'Typed, documented values make customization reviewable and prevent accidental unsupported combinations.'
        ),
        check(
          'Why can a Helm rollback fail to restore the whole service?',
          [
            'Helm never stores any revision of rendered resources',
            'Kubernetes rejects every object from an older chart version',
            'External side effects and data migrations may be irreversible',
            'A chart package cannot reference a container image digest'
          ],
          2,
          'Manifest history covers declared cluster objects, not every durable change made by applications or hooks.'
        ),
        check(
          'What should CI preserve for a packaged Kubernetes release?',
          [
            'Only the unexpanded template without any selected values',
            'A screenshot of one successfully running Pod',
            'A mutable tag that is resolved separately in every environment',
            'The validated rendered manifests and exact artifact identities'
          ],
          3,
          'Rendered desired state plus package and image identities connects review to what the reconciler was asked to run.'
        )
      ]
    ),
    lesson(
      'gitops-reconciliation',
      'GitOps, environment promotion, and reconciliation safety',
      `# GitOps, environment promotion, and reconciliation safety

GitOps applies the reconciliation model to delivery: an environment's desired declarative state lives in version control, an agent compares it with the target, and controlled changes converge the environment. The repository provides history, review, and a recovery point. It is not enough to run \`kubectl apply\` from a laptop after pulling Git, and it does not make every commit safe.

Separate application source, built artifacts, package definitions, and environment desired state conceptually. A source change produces one immutable artifact. Promotion changes the environment declaration to reference that artifact digest. This creates a reviewed record of exactly what should run without rebuilding it. Repositories may be combined or separated based on access, scale, and ownership, but the traceability chain must remain intact.

## Pull reconciliation

A cluster-side controller can pull desired state and requires repository read plus cluster write access. CI no longer needs broad inbound cluster credentials. The controller reports synchronization and health status. Protect its identity, namespace, source restrictions, and ability to deploy itself. A compromised desired-state repository remains powerful, so require reviews, signed or strongly attributed changes where useful, policy checks, and protected branches.

Automatic synchronization rapidly removes drift and deploys accepted changes. Pruning removes objects no longer declared and can be destructive. Self-healing reverts manual edits, including emergency interventions. Define which resources the controller owns, require deletion safeguards for stateful objects, and document how an incident override is recorded or temporarily pauses reconciliation.

## Promotion patterns

Promote by pull request that changes only the artifact identity and relevant configuration. Attach upstream test, scan, provenance, and staging evidence. Do not copy a mutable tag. Progressive delivery controllers can shift traffic in measured steps and update rollout status, while Git remains desired version intent. Avoid two controllers fighting over the same field.

Secrets in GitOps need a separate protection design: encrypted documents whose decryption key is available only in the target, or references to an external secret manager. Encryption allows storage but does not remove authorization, rotation, metadata, or plaintext-at-render concerns.

## Disaster and bootstrap

Document the root of trust: how a new cluster obtains the reconciler, repository identity, policy, secret access, and base configuration. Back up state that Git does not contain, including data, external identity mappings, certificates, and controller-specific keys. Test restoring a cluster from declared state plus protected backups. If the Git service is unavailable, running workloads should continue; decide how long deployment and reconciliation can pause.

## Guided practice

Relay production self-heals from Git, but an incident commander manually changes replicas and reconciliation immediately undoes it. Redesign the emergency path without normalizing permanent drift.

## Worked solution

The preferred emergency change is a fast reviewed commit to production desired state, with an incident identifier and expiry. If Git or review is unavailable and immediate scale is essential, the incident commander uses a separately audited break-glass procedure to pause reconciliation for the narrow Relay application, records the live patch, and sets a time-bounded owner. As soon as possible, the team commits the desired emergency state or determines the original declaration is correct, then resumes reconciliation and verifies convergence. Post-incident work removes the temporary setting and improves a runbook or automated capacity control. The controller never permanently ignores a field whose ownership is ambiguous.`,
      [
        check(
          'What changes during artifact promotion in a GitOps model?',
          [
            'Desired environment state references a previously built immutable artifact',
            'Production rebuilds the same branch with different dependencies',
            'The controller gives every workload repository administrator access',
            'All environment history is removed after successful synchronization'
          ],
          0,
          'Promotion records a new exact artifact identity in desired state; it does not manufacture new bytes.'
        ),
        check(
          'What risk does automatic pruning introduce?',
          [
            'It forces every Pod to use the host network namespace',
            'Removing a declaration can delete a live resource',
            'It disables all source review and branch protection automatically',
            'It prevents any controller from reporting synchronization status'
          ],
          1,
          'Declarative absence can become a destructive API deletion, so stateful and protected resources need explicit safeguards.'
        ),
        check(
          'Why can self-healing conflict with incident response?',
          [
            'It permanently turns all cluster identities into anonymous users',
            'It prevents workloads from writing any application logs',
            'It reverts manual mitigation that differs from declared state',
            'It deletes the source repository whenever a Pod is unhealthy'
          ],
          2,
          'A reconciler treats live divergence as drift regardless of whether a human intended it as emergency mitigation.'
        ),
        check(
          'What is needed to rebuild a GitOps-managed cluster?',
          [
            'Only the latest application container writable layer',
            'A manual memory of every previous operator command',
            'The DNS cache from one healthy developer workstation',
            'Declared state plus bootstrap trust and backups for external state'
          ],
          3,
          'Git captures desired configuration, but bootstrap identity, secrets, and durable application data need protected recovery paths.'
        )
      ]
    ),
    lesson(
      'observability-signals',
      'Observability with metrics, logs, traces, and profiles',
      `# Observability with metrics, logs, traces, and profiles

Monitoring checks known conditions. Observability is the ability to investigate system state from emitted evidence, including questions not anticipated when the software was written. Neither is achieved by buying a dashboard. Applications, platforms, and teams must define signals that connect user behavior to internal work while controlling volume, cost, sensitivity, and cardinality.

Metrics are numeric measurements aggregated over labeled dimensions. They are efficient for rates, distributions, objectives, alerts, and trends. Logs are timestamped event records with rich discrete context. Traces model one operation as causally related spans across boundaries. Profiles attribute resource use to code paths over time. The signals overlap but answer different questions; correlation identifiers and consistent resource attributes connect them.

## Instrument from the boundary inward

For online services record request count, errors, and duration at user-meaningful boundaries, plus saturation. For queues record accepted, completed, failed, retried, depth, and oldest age. For batch work record last success, duration, processed records, rejects, and freshness. Dependencies need client-side latency and outcome because server health cannot reveal the calling service's exact experience.

Use counters for cumulative events, gauges for current state, and histograms for distributions. Averages hide tails and mixed populations. Histograms allow aggregation when bucket boundaries are consistent; summaries and client-calculated quantiles have different aggregation limits. Choose buckets around service thresholds and observed ranges.

Labels multiply time series. Method, status class, region, and bounded route are useful. User id, request id, raw URL, stack trace, or arbitrary error text cause unbounded cardinality and cost. Put per-request identity in logs and traces, not metric labels.

## Structured logs

Emit one structured record per event with timestamp, severity, service, environment, version, operation, result, duration, and correlation context. Use stable error codes and fields. Multiline human text is hard to query. Redact or omit tokens, credentials, personal data, and payloads. Sampling can control routine success volume, but preserve errors and the ability to estimate rates.

## Distributed tracing

A trace id connects spans; parent relationships show causal calls. Context must be injected into outgoing carriers and extracted by receivers. OpenTelemetry provides APIs, SDKs, semantic conventions, propagation, and a Collector pipeline. The Collector can receive, process, sample, redact, batch, and export telemetry. Instrumentation should not make a healthy service fail because the telemetry backend is unavailable.

Head sampling decides near trace start and may miss rare late failures. Tail sampling decides after more of the trace is observed but costs buffering and infrastructure. Keep sampling decisions explicit and measurable. Never place secrets or personal data in propagated baggage.

## Guided practice

Relay jobs are sometimes slow, but metrics contain a \`job_id\` label and the monitoring bill is exploding. Redesign signals so an operator can move from an SLO alert to representative traces and logs.

## Worked solution

Remove job id from metrics. Measure accepted, completed, failed, and retried jobs by service, environment, bounded job type, and outcome. Record queue-age and processing-duration histograms with buckets around objectives, plus worker concurrency and dependency pool saturation. Put job id, attempt id, worker, version, and trace context in protected structured logs. Trace a controlled sample of job lifecycle and retain all or more slow and failed traces through tail policy. Exemplars or links connect histogram observations to traces when supported. Set retention and access by signal sensitivity, and test that telemetry loss does not block job completion.`,
      [
        check(
          'Which signal is well suited to alerting on an error-rate trend?',
          ['A counter-derived metric', 'A unique log file per user', 'A screenshot of one trace', 'A heap dump every request'],
          0,
          'Counters aggregate event rates efficiently over time and bounded dimensions.'
        ),
        check(
          'Why is user_id a dangerous metric label?',
          [
            'Metric systems cannot represent any text label values',
            'It creates high-cardinality series and cost',
            'It forces all user requests to share one time series',
            'It automatically encrypts every other metric label'
          ],
          1,
          'A series exists for each label-set combination, so unbounded identities multiply storage and query work.'
        ),
        check(
          'What enables one distributed trace across services?',
          [
            'Every service choosing an unrelated random timestamp',
            'A shared writable filesystem mounted into all processes',
            'Injecting and extracting trace context across call boundaries',
            'Disabling transport metadata between every service'
          ],
          2,
          'Propagation carries trace and parent identity so downstream spans join the causal operation.'
        ),
        check(
          'How should a service behave when telemetry export is unavailable?',
          [
            'Fail every user request until the exporter recovers',
            'Write unlimited telemetry into application memory',
            'Log all credentials to help diagnose the backend',
            'Bound and shed telemetry without breaking primary service'
          ],
          3,
          'Observability is important but should degrade safely under bounded queues rather than become a service-wide dependency.'
        )
      ]
    ),
    lesson(
      'prometheus-alerting',
      'Prometheus queries, dashboards, and actionable alerts',
      `# Prometheus queries, dashboards, and actionable alerts

Prometheus scrapes metric endpoints and stores labeled time series. PromQL selects, aggregates, and computes over those series. Its data model rewards instrumentation with stable names and bounded labels. A dashboard should explain user health and support diagnosis; an alert should demand a specific response. Collecting every available exporter metric without an operating question produces cost and noise.

Counters normally use \`rate\` over a window before aggregation. Aggregate numerator and denominator separately when computing ratios. For example, error rate is the sum of error request rates divided by the sum of all request rates, with careful handling for no traffic. Never average precomputed instance percentages with unequal request volume.

Histograms expose bucket counters plus sum and count. \`histogram_quantile\` estimates a percentile from aggregated bucket rates when bucket schemes align. A percentile is not the fraction meeting an objective; calculate good events directly for an SLI when possible. Recording rules precompute expensive or frequently used expressions and give service-level names to raw metrics.

## Dashboard hierarchy

Start with user-facing request success, latency, throughput, and critical freshness. Then show dependencies, workload saturation, rollout version, and relevant business invariants. Provide filters for service, environment, region, and bounded route, with links to logs, traces, release, and runbook. A dashboard that requires knowing an internal host before seeing user impact is backwards.

## Alert design

Page on symptoms tied to meaningful user harm or imminent exhaustion, not every possible cause. Pages require urgent human action. Tickets cover nonurgent corrective work. Logs or dashboards support later investigation. An alert includes impact, condition, scope, start time, current value and threshold, owning service, runbook, and useful links. A \`for\` duration can avoid reacting to transient blips, but it also delays detection; choose it from user tolerance.

Alert separately on monitoring-path failure. Dead-man or external black-box checks reveal when scrape, evaluation, routing, or notification disappears. Test alert delivery end to end. A green dashboard backed by a dead collector is not healthy.

Avoid cause-based page floods. One user-level latency page can link to database, CPU, queue, and network diagnostics without paging separately for all of them. Inhibition and grouping can suppress dependent noise, but alert rules should remain understandable. Review every page: was it actionable, timely, correctly owned, and worth waking someone?

## Guided practice

Relay pages separately for high CPU on each Pod, queue depth, database connections, and API latency, producing fifty notifications for one slowdown. Redesign the alert and dashboard structure.

## Worked solution

Page once on sustained user-impacting API or job SLI burn, grouped by production service and region, with a link to a Relay overview. The page shows impact, recent release, queue age, completion and error rates, latency distributions, ready capacity, worker saturation, database client latency and pool pressure, and representative traces. High CPU and connections become diagnostic panels or tickets unless they predict imminent exhaustion with a specific action. Queue age may page directly when it is itself the user contract. Group related alerts and inhibit downstream symptoms during a declared larger outage. Add a black-box synthetic and notification-path test so silence is not mistaken for health.`,
      [
        check(
          'How should a request error ratio be aggregated?',
          [
            'Sum error rates and divide by summed total request rates',
            'Average every instance percentage regardless of traffic',
            'Count the number of dashboard panels containing red pixels',
            'Use the largest process identifier as the denominator'
          ],
          0,
          'Aggregating event numerators and denominators preserves their actual traffic weighting.'
        ),
        check(
          'What should trigger a page?',
          [
            'Any metric changing by any amount for one scrape interval',
            'A condition requiring urgent human action for user harm or imminent risk',
            'Every warning log produced during an ordinary deployment',
            'A low-priority maintenance item with a one-month deadline'
          ],
          1,
          'Paging interrupts a human and is reserved for immediate actionable conditions.'
        ),
        check(
          'Why monitor the monitoring path itself?',
          [
            'It guarantees no application can ever have a software defect',
            'It replaces the need for any external user-level checks',
            'Telemetry failure can make an unhealthy system appear silent',
            'It causes all metric labels to become low cardinality'
          ],
          2,
          'Missing scrapes, rule evaluation, or notification delivery can suppress the very alerts operators rely on.'
        ),
        check(
          'What should a page contain?',
          [
            'Only a generic message stating that something changed',
            'A complete copy of all sensitive request payloads',
            'An instruction to restart everything before diagnosis',
            'Impact, condition, ownership, runbook, and diagnostic links'
          ],
          3,
          'Actionable context reduces time to orient and connects the interruption to an owned response.'
        )
      ]
    ),
    lesson(
      'slos-error-budgets',
      'SLIs, SLOs, error budgets, and capacity',
      `# SLIs, SLOs, error budgets, and capacity

A service level indicator is a quantitative measure of service behavior. A service level objective is a target for an SLI over a window. A service level agreement is a promise with business consequences and is not interchangeable with an internal objective. Start from what users need, then choose measurable events that approximate it. Do not begin with whatever metric an exporter happens to provide.

Availability is often \`good events / valid events\`. Latency can be the fraction of valid requests faster than a threshold. Freshness can be the fraction of expected outputs available by a deadline. Correctness may use verified result invariants. Define population, exclusions, point of measurement, window, threshold, and missing-data behavior. Server-side success can overstate availability when clients fail before reaching it, so measure as close to the user as practical.

## Error budgets

An objective below 100% allows a budget of imperfect events. For a 99.9% good-event objective, the nominal bad-event budget is 0.1% over the window. The budget is not permission for careless failure; it is a decision mechanism balancing reliability work and change. When burn is high, slow or pause risky releases and prioritize the causes consuming it. When healthy, the service can take measured change risk.

Burn rate compares how quickly the service consumes budget with the sustainable rate. Multi-window multi-burn alerts combine a fast window for severe events and a slower window for persistent harm, reducing both detection delay and noise. Use actual good and total events rather than translating every objective into downtime minutes.

## Choosing objectives

Segment different user journeys and service classes only when their expectations and actions differ. Too many objectives become unactionable. Do not choose a target merely because current performance already meets it, and do not overachieve thoughtlessly: users may depend on an unstated level that the architecture cannot promise economically. Record why the target exists, how it is measured, who owns it, and what policy follows budget states.

## Capacity planning

Forecast demand from historical patterns, product changes, seasonality, and uncertainty. Identify the first saturating resource and measure service demand per unit. Capacity includes quota, staff, downstream limits, and recovery headroom, not only CPU. Test at expected peak plus safety margin and degraded conditions such as one zone unavailable. Autoscaling is a control loop inside a capacity envelope; it needs quota, startup time, and a scalable dependency path.

## Guided practice

Define Relay objectives for API acceptance and background completion. Include indicators, windows, exclusions, measurement points, error-budget policy, and one capacity test.

## Worked solution

For API acceptance, measure at the edge the fraction of valid job submissions receiving a durable accepted response within 500 ms over 28 days, excluding only explicitly invalid requests. For processing, measure the fraction of accepted standard jobs reaching one correct terminal state within ten minutes, based on durable job timestamps, over the same window. Track correctness violations separately with a near-zero tolerance because duplicates may be worse than delay. Multi-window burn alerts page for rapid user harm and ticket slower erosion. The policy pauses ordinary rollout when budget is critically burned until mitigations are in place. Capacity testing runs peak projected arrival with one worker zone absent and confirms latency, queue age, database saturation, retry volume, and recovery remain inside bounds.`,
      [
        check(
          'What should an SLI measure?',
          [
            'A defined aspect of service behavior meaningful to users',
            'The number of tools installed on an operator workstation',
            'An individual engineer ranking unrelated to service outcomes',
            'Only the provider invoice total without usage context'
          ],
          0,
          'Useful indicators quantify a behavior users rely on and support a concrete operational decision.'
        ),
        check(
          'What is an error budget used for?',
          [
            'Guaranteeing that no service event can ever fail',
            'Balancing change risk and reliability action from objective performance',
            'Replacing every incident response and recovery procedure',
            'Setting the maximum number of source files in a repository'
          ],
          1,
          'Budget consumption gives product and reliability work a shared evidence-based control signal.'
        ),
        check(
          'What does a burn rate above one mean?',
          [
            'The service is accumulating budget faster than time passes',
            'The monitoring system has no valid events in its population',
            'Budget is being consumed faster than the sustainable rate',
            'Every request is completing below the latency threshold'
          ],
          2,
          'At a burn rate above one, continuing performance would exhaust the available bad-event allowance before the window ends.'
        ),
        check(
          'What must autoscaling still have?',
          [
            'A policy that removes all upper capacity boundaries',
            'A guarantee that dependencies scale with no coordination',
            'No startup delay or telemetry lag under any conditions',
            'Quota, headroom, startup time, and scalable dependencies'
          ],
          3,
          'Autoscaling reacts within physical and administrative limits; capacity engineering establishes that workable envelope.'
        )
      ]
    ),
    lesson(
      'incident-response',
      'Incident command, mitigation, communication, and learning',
      `# Incident command, mitigation, communication, and learning

An incident is an event that requires a coordinated response to protect service, data, security, or people. Severity reflects impact and urgency, not how interesting the technical failure is. Declare early when coordination would help; an incident process can be stood down. Waiting for perfect proof leaves responders operating without roles, communication, or an audit trail.

The incident commander owns priorities, roles, and decisions, not every command. An operations lead executes diagnosis and mitigation. A communications lead provides regular audience-appropriate updates. A scribe keeps timestamps, observations, actions, owners, and results. Small incidents can combine roles, but someone must retain the coordination view.

## Response loop

Confirm impact and scope. Establish a shared channel and incident record. Freeze unrelated changes. Identify recent changes and dependencies. Form hypotheses from evidence. Prefer safe reversible mitigation that reduces harm: stop a rollout, disable a feature, shed optional load, fail over, scale within safe limits, or restore a known state. Assign one operator to each mutation and state the expected result, abort condition, and rollback before execution.

Do not let many people make concurrent unrecorded production changes. Preserve logs and evidence. Security incidents may require containment, legal, privacy, and forensic procedures that differ from ordinary availability repair. Avoid destroying evidence or alerting an attacker through careless actions.

Communication says what users experience, when it began, scope, current mitigation, work underway, and the next update time. Do not invent a cause. Internally, distinguish fact, hypothesis, and decision. Externally, be truthful without exposing sensitive defense details.

Recovery is more than a green graph. Verify critical user journeys, data correctness, queues, delayed work, dependencies, and error-budget behavior. Remove emergency access and temporary overrides. Maintain heightened observation through a defined period.

## Post-incident learning

A useful review reconstructs a timeline and explains contributing conditions: design, tests, review, rollout, detection, response, documentation, staffing, and incentives. Root cause is often an oversimplification. Corrective actions should be specific, prioritized by recurrence and impact, owned, and tracked. Include detection improvements and recovery rehearsal, not only prevention. Share learning without blaming the person nearest the final action.

## Guided practice

A Relay release doubles database connections, causing timeouts and retries that add more load. Run the first thirty minutes of response and define follow-up work.

## Worked solution

Declare based on submission failures and queue delay, assign command, operations, communication, and scribe, then pause all other releases. Roll back or disable the connection-pool change if schema and state are compatible; otherwise route traffic to the prior pool policy. Cap retries and optional work to stop amplification, while protecting database health. Track user success, queue age, database connections, lock time, and retry rate after each action. Communicate observed impact and next update without claiming a cause prematurely. After recovery, drain backlog at a database-safe rate and verify no accepted job duplicated or vanished. Follow-up adds a fleet-wide connection budget, canary comparison, retry load test, database saturation alert tied to user impact, rollout abort threshold, and a rehearsal of pool rollback.`,
      [
        check(
          'What is the incident commander responsible for?',
          [
            'Coordinating priorities, roles, and response decisions',
            'Typing every diagnostic command personally',
            'Avoiding incident declaration until the root cause is proven',
            'Publishing unverified technical explanations to users'
          ],
          0,
          'Command keeps the whole response coherent while delegated operators execute focused work.'
        ),
        check(
          'What should precede a production mitigation command?',
          [
            'Several responders independently making the same change',
            'Expected result, owner, abort condition, and recovery action',
            'Deletion of logs that might make the command look risky',
            'A promise that the change has no possible side effects'
          ],
          1,
          'Predeclared expectations make the action controlled, observable, and reversible under pressure.'
        ),
        check(
          'When is an incident recovered?',
          [
            'As soon as one infrastructure CPU chart turns green',
            'When the incident channel has more than one responder',
            'After user paths, data, backlog, and dependencies are verified',
            'Immediately after the suspected release has been identified'
          ],
          2,
          'Technical symptoms can clear while user or data harm persists, so recovery requires end-to-end validation.'
        ),
        check(
          'What makes a corrective action useful?',
          [
            'It states that operators should be more careful next time',
            'It has no owner so the whole organization shares responsibility',
            'It focuses only on preventing one exact code typo',
            'It is specific, prioritized, owned, and tracked to completion'
          ],
          3,
          'Concrete ownership and priority turn learning into a changed system rather than a document.'
        )
      ]
    ),
    lesson(
      'resilience-disaster-recovery',
      'Resilience, backups, failover, and disaster recovery',
      `# Resilience, backups, failover, and disaster recovery

Reliability is the probability that a system provides its intended behavior over time. Resilience is its ability to absorb, adapt to, and recover from failure. High availability reduces interruption; disaster recovery restores capability after severe loss. These goals require different mechanisms and must be expressed through business consequences.

Recovery time objective is the target duration to restore an acceptable service. Recovery point objective is the acceptable amount of data loss measured in time. A five-minute RPO requires a data protection path capable of retaining changes within that interval; a daily snapshot cannot meet it. These are objectives, not guarantees, until rehearsals demonstrate the complete path.

## Failure modes and redundancy

Redundancy helps only when replicas do not share the failing dependency, configuration, credential, network, or operator action. Identify failure domains and common-mode risks. Active-active can reduce failover time but demands traffic, state, consistency, conflict, and capacity design. Active-passive may be simpler but the passive path can decay. Quorum systems trade availability and consistency during partitions according to their protocol; do not improvise failover by forcing members without understanding data safety.

Timeouts, retries, circuit breakers, bulkheads, queues, caches, replication, and load shedding are resilience mechanisms with costs. Retries multiply load. Caches can serve stale data. Queues move pressure and require capacity. Circuit breakers can synchronize oscillation. Test combined behavior under a realistic dependency outage.

## Backup design

Backups need protected scope, frequency, retention, encryption, access, immutability where required, geographic or account isolation, and a catalog. Follow the idea of multiple copies on different media or systems with one offsite or isolated and verify that at least one path is not writable by the ordinary production identity. Back up configurations, keys, identity mappings, and external dependencies needed to interpret data, not only database pages.

Restore is the proof. Automate restoration into an isolated environment, validate integrity and business invariants, measure time, and record gaps. A backup job reporting success proves only that it wrote something.

## Disaster runbook

Declare authority, trigger conditions, communication, target architecture, dependency order, DNS and certificate behavior, secret recovery, data restore or replication promotion, validation, traffic switch, and failback. Failback is another risky migration and needs a plan. During regional loss, capacity quotas and external providers may be constrained; reserve or prearrange what objectives require.

## Guided practice

Relay promises a one-hour RTO and five-minute RPO for accepted jobs. Design data protection and a quarterly exercise that can demonstrate or disprove both.

## Worked solution

Store accepted job state in a transactional database with continuous log archiving or managed point-in-time recovery meeting better than five minutes. Send backups and logs to a separate protected account or trust boundary with encryption, version retention, and deletion controls. Preserve infrastructure declarations, application digests, schema versions, secret and certificate recovery procedures, queue semantics, and DNS access. Quarterly, create an isolated target, restore to a selected point, deploy the compatible Relay version, validate job counts, terminal-state uniqueness, recent accepted samples, and API behavior, then measure from declaration to validated service. Exercise loss of the primary credentials as well as data. Record achieved RTO and RPO and remediate any gap rather than renewing the promise from backup timestamps.`,
      [
        check(
          'What does an RPO describe?',
          [
            'The acceptable amount of data loss expressed as a time interval',
            'The maximum number of Pods allowed in one namespace',
            'The target duration of every ordinary HTTP request',
            'The count of responders assigned to an incident channel'
          ],
          0,
          'The recovery point objective bounds how far restored durable state may lag the failure moment.'
        ),
        check(
          'Why can redundant replicas still fail together?',
          [
            'Replication prevents any instance from using a network',
            'They may share one dependency, policy, or failure domain',
            'Every replica always stores completely unrelated application data',
            'Load balancers require all backends to run on one process'
          ],
          1,
          'Common-mode dependencies and correlated changes defeat numerical redundancy.'
        ),
        check(
          'What proves a backup meets recovery needs?',
          [
            'A successful file-write status from the backup scheduler',
            'The backup has a larger byte size than the live database',
            'A validated restore meeting time and data objectives',
            'The backup remains writable by every production workload'
          ],
          2,
          'Recovery depends on readable data, keys, compatible systems, procedures, and time; restore tests verify the chain.'
        ),
        check(
          'Why must failback be planned?',
          [
            'A disaster target can never accept any user traffic',
            'DNS cannot represent more than one service endpoint',
            'Backups automatically delete the original region',
            'Returning traffic and state is another high-risk migration'
          ],
          3,
          'State may diverge during recovery, so moving back requires synchronization, validation, traffic control, and rollback.'
        )
      ]
    ),
    lesson(
      'supply-chain-security',
      'Secrets, software supply chains, and zero-trust delivery',
      `# Secrets, software supply chains, and zero-trust delivery

Delivery systems are privileged paths from source to production. Attackers target source accounts, dependencies, build runners, registries, update channels, and deployment identities because one compromise can reach many systems. Secure the chain by reducing implicit trust, producing verifiable evidence, and enforcing policy at boundaries.

Threat-model sources, dependency resolution, build inputs, builder isolation, artifacts, provenance, distribution, promotion, and runtime admission. Protect source branches with strong identity, review, and auditable changes. Lock dependencies and verify integrity. Separate low-trust tests from release builders. Release output should come from a clean ephemeral build environment whose control plane, not tenant-authored steps, produces provenance.

SLSA describes incremental supply-chain guarantees. Build provenance records where, when, and how an artifact was produced and its inputs. Higher build levels strengthen hosted and isolated builder properties. Provenance is evidence, not magic: consumers must verify the artifact digest, signature or authenticated envelope, trusted builder identity, build type, source, and allowed parameters against expectations.

An SBOM inventories components but does not say they are safe or present at runtime. Signatures authenticate an identity's statement but do not establish that the identity or build was trustworthy. Vulnerability scanners identify known issues but have false positives, false negatives, and delayed databases. Combine inventory, provenance, signatures or attestations, vulnerability policy, review, and runtime controls.

## Secret lifecycle

A secret has an owner, purpose, authorized subjects, creation, distribution, rotation, revocation, expiry, audit, and recovery policy. Prefer workload identity and short-lived credentials to copied static keys. Scope secrets to one environment and service. Never place them in source, image layers, CI caches, command arguments, telemetry, or support bundles. Redaction is a backup control, not permission to log secrets first.

Rotation must be compatible: issue a new credential, make consumers accept or load it, verify use, then revoke the old. Emergency revocation may reverse the order to contain harm. Monitor stale and unused secrets. Break-glass access is separately protected, time-limited, alerted, and reviewed.

## Zero trust as verification

Zero trust means access is not granted merely because a request comes from an internal network. Authenticate human and workload identity, authorize the exact action and resource, consider device or workload posture and context, encrypt traffic, log decisions, and re-evaluate. It does not mean trusting no component; it means making trust explicit, narrow, and continuously verified.

## Guided practice

Relay production currently accepts any image from its registry if tagged \`stable\`, and the deployment pipeline uses a year-long cloud key. Design a verifiable promotion and identity path.

## Worked solution

The protected main revision runs on an ephemeral trusted release builder with locked verified dependencies. The builder creates one image, SBOM, test reports, and signed provenance linking the digest to source and build. Registry storage prevents ordinary tag overwrite or retains immutable versions. Promotion references the digest. Admission verifies expected repository, trusted builder identity, provenance predicate and parameters, vulnerability and exception policy, and required runtime security. CI obtains a short-lived cloud token through federation constrained to the protected deployment workflow and environment, then assumes a least-privilege role. No long-lived key remains. Every promotion record links source, evidence, digest, approval, target, and result; key and policy changes are separately protected and audited.`,
      [
        check(
          'What does build provenance describe?',
          [
            'Where, when, how, and from which inputs an artifact was built',
            'A guarantee that the application has no possible logic defect',
            'The complete plaintext value of every deployment credential',
            'A replacement for verifying the artifact digest at admission'
          ],
          0,
          'Provenance connects artifact identity to source, process, builder, and inputs so a verifier can enforce expectations.'
        ),
        check(
          'What does an SBOM primarily provide?',
          [
            'Automatic authorization to deploy into every environment',
            'An inventory of software components in an artifact',
            'Proof that every listed component is unreachable and safe',
            'A short-lived identity token for the build runner'
          ],
          1,
          'An SBOM supports inventory and vulnerability response; it does not itself establish safety.'
        ),
        check(
          'What is the safe normal sequence for credential rotation?',
          [
            'Revoke the only credential and discover consumers afterward',
            'Print the old and new values in logs for comparison',
            'Issue new, migrate and verify consumers, then revoke old',
            'Keep both credentials valid permanently to avoid downtime'
          ],
          2,
          'An overlap window permits verified transition before the prior credential is removed, except when urgent containment changes priorities.'
        ),
        check(
          'What does zero-trust access require?',
          [
            'Treating every request from a private subnet as an administrator',
            'Removing encryption because identity is already known',
            'One shared identity for all humans and workloads',
            'Explicit identity, narrow authorization, context, and verification'
          ],
          3,
          'Network position alone is insufficient; trust is granted to a specific authenticated subject for a specific action under policy.'
        )
      ]
    ),
    lesson(
      'platform-engineering',
      'Platform engineering and paved delivery paths',
      `# Platform engineering and paved delivery paths

Platform engineering treats shared delivery and runtime capabilities as an internal product. Its users are developers and operators who need to build, release, observe, and recover services without relearning every infrastructure detail. A platform is not a portal placed over the same ticket queue. It combines usable interfaces, automated workflows, policy, documentation, support, and feedback.

Start from user research. Map recurring jobs: create a service, obtain an environment, publish an artifact, deploy safely, request a database, expose an endpoint, rotate a secret, meet an SLO, respond to an incident, and retire a service. Measure current lead time, error, cognitive load, and support demand. Build the thinnest end-to-end path that improves a frequent high-friction job.

## Paved roads and escape hatches

A paved road is the supported default that includes sensible security, reliability, observability, and cost behavior. Adoption should be earned through lower effort and faster feedback, then reinforced by policy for true nonnegotiable controls. A golden path that cannot support a valid workload needs an owned exception or extension process. An undocumented escape becomes permanent shadow infrastructure.

Define contracts rather than hiding everything. A service template can include repository policy, CI, build provenance, container defaults, deployment package, workload identity, telemetry, SLO starter, runbook, and ownership metadata. Generated code must have an update strategy; copying a template once creates drift. Central reusable workflows and modules can evolve behavior, but breaking changes need versions and migration support.

## Platform architecture

A service catalog records owner, lifecycle, dependencies, interfaces, data classification, repository, runtime, dashboards, objectives, and runbooks. A developer portal can present this catalog and trigger workflows, but source systems remain authoritative. Self-service APIs should be asynchronous, idempotent, observable, and policy-aware. The platform control plane is highly privileged and needs its own SLOs, threat model, isolation, audit, backup, and disaster recovery.

Keep team boundaries clear. The platform team owns the supported capability and its reliability; application teams own service behavior and declared use. Security provides policy and threat expertise; it should not become a manual approval bottleneck for routine compliant work. Reliability specialists help establish standards and consult on difficult systems rather than owning every production page forever.

## Product measures

Measure task success, time to first deployment, adoption, support tickets, failed changes, cognitive-load feedback, upgrade completion, policy exceptions, and platform reliability. Raw number of portal clicks or resources created is not value. Retire capabilities that duplicate better paths or no longer justify support.

## Guided practice

Design a first Relay-style service golden path for a company where teams currently copy pipelines and Kubernetes YAML. Define inputs, outputs, ownership, escape, and success measures.

## Worked solution

The user supplies service name, owner, data classification, runtime profile, expected traffic, and dependency needs. The platform creates a protected repository from a maintained template, dedicated workload identity, pinned reusable CI, trusted image build with provenance, registry path, deployment package, namespace policy, telemetry, starter dashboard, SLO worksheet, and catalog entry. A sample endpoint deploys to a temporary environment and proves the path. Production requires an owned objective, runbook, capacity choice, and environment promotion. Exceptional privilege or topology uses a reviewed time-bounded extension record rather than editing generated internals invisibly. Success is shorter time to a verified deployment, fewer copied defects, high upgrade compliance, lower support burden, and teams choosing the path because it helps.`,
      [
        check(
          'What makes an internal platform a product?',
          [
            'It is designed from user jobs, measured outcomes, and maintained interfaces',
            'It requires every request to become an untracked operations ticket',
            'It exposes every cloud provider control without safe defaults',
            'It is installed once and never receives compatibility updates'
          ],
          0,
          'Product practice centers user success, contracts, ownership, feedback, evolution, and retirement.'
        ),
        check(
          'What is a paved road?',
          [
            'A mandatory portal screen with no automation behind it',
            'A supported default path with built-in operational policy',
            'An undocumented sequence of administrator console actions',
            'A permanent exception that bypasses every security boundary'
          ],
          1,
          'A paved road packages reliable defaults into the easiest supported route while retaining governed extensions.'
        ),
        check(
          'Why do generated service templates need an update strategy?',
          [
            'Generated repositories cannot contain any source history',
            'Templates automatically delete application code after creation',
            'One-time copies drift from future security and platform improvements',
            'A template update always changes every service database schema'
          ],
          2,
          'Generation solves initial setup; reusable versioned components and migrations carry later improvements.'
        ),
        check(
          'Which is a meaningful platform success measure?',
          [
            'The total number of buttons added to a developer portal',
            'The number of cloud products visible to every application team',
            'The amount of platform code regardless of user adoption',
            'Time and success rate for a developer completing a delivery job'
          ],
          3,
          'A platform exists to improve user tasks safely, so task outcomes are more meaningful than surface size.'
        )
      ]
    ),
    lesson(
      'cost-performance-sustainability',
      'Cost, performance, and sustainable operations',
      `# Cost, performance, and sustainable operations

Cost is an architectural signal. Cloud bills reflect resource quantity, time, storage class, requests, data transfer, managed-service units, support, and discounts, while engineering time and reliability risk complete total cost of ownership. FinOps creates shared visibility and decisions among engineering, product, and finance; it is not a monthly demand to cut every resource by the same percentage.

Allocate spend with mandatory owner, service, environment, and product metadata. Shared infrastructure needs a documented allocation model rather than remaining invisible. Track unit economics such as cost per successful job, active user, build, or gigabyte processed. Total cost can rise appropriately when useful demand rises while unit cost improves.

## Measure before optimizing

Find dominant dimensions by service and workload. Common waste includes idle nonproduction capacity, oversized requests, unattached storage, old snapshots, excessive logs, cross-zone or internet transfer, chatty APIs, unbounded CI artifacts, overretained backups, and high-cardinality metrics. Deletion requires lifecycle policy and ownership; today's unknown object may be tomorrow's recovery dependency.

Rightsize from measured CPU, memory, I/O, throughput, latency, and failure behavior, not average utilization alone. Preserve headroom for bursts, failover, deployment surge, and uncertainty. Commit discounts or reserved capacity only for stable baseline demand. Use elastic pricing for variable work that can tolerate interruption, with checkpoints and idempotency.

Performance optimization follows a loop: define user objective, reproduce representative load, profile end to end, identify the constrained resource, change one thing, measure, and guard against regression. Faster internal code may not improve user latency if a downstream call dominates. Caching trades freshness, invalidation, memory, and failure modes for reduced work. Batching improves throughput but can increase latency. Compression trades CPU for transfer. Indexes speed reads but cost write and storage.

## Telemetry and retention economics

Observability has a budget. Control log level, sampling, metric cardinality, trace retention, and expensive queries while preserving incident and compliance needs. Tier data by access and retention. Make a change only with proof that important detection and investigation remain possible.

Sustainable operations includes human load. Toil is manual, repetitive, automatable, tactical work that scales with service size and has limited enduring value. Measure pages, repetitive tickets, manual releases, and maintenance. Automate the highest recurring safe target, simplify architecture, or remove unused service. Do not automate rare high-risk work before defining it well.

## Guided practice

Relay cost doubled while traffic rose 20%. Create an investigation that separates healthy growth from waste and protects reliability during reduction.

## Worked solution

Break spend down by environment, component, owner, and meter; compare cost per accepted and completed job. Check compute request versus use distributions, minimum replicas and failover headroom, database class and storage IOPS, cross-zone traffic, log and trace ingestion by field or label, image and CI artifact retention, snapshots, and idle preview environments. Correlate the date with releases and demand shape. First remove clearly orphaned owned resources through retention policy, then reduce telemetry noise and idle lower-environment schedules. Load-test rightsizing with one failure domain absent before changing production. Track SLOs and unit cost together and roll back a saving that consumes reliability budget or increases human toil more than it saves.`,
      [
        check(
          'What is a useful cloud unit-cost metric for Relay?',
          [
            'Cost per successfully completed job',
            'Total number of YAML lines in the repository',
            'The highest single CPU reading from any developer laptop',
            'Count of provider products listed in the console navigation'
          ],
          0,
          'Unit economics relate resource cost to useful output and distinguish demand growth from declining efficiency.'
        ),
        check(
          'Why not rightsize from average utilization alone?',
          [
            'Averages always equal the maximum observed resource use',
            'Bursts, failover, deployment, and uncertainty need headroom',
            'Resource requests cannot influence scheduling or capacity',
            'All managed services charge only for average CPU percentage'
          ],
          1,
          'A safe capacity choice accounts for distributions, workload peaks, recovery, and operating margins.'
        ),
        check(
          'What tradeoff does batching commonly introduce?',
          [
            'It guarantees that no queue can ever have a backlog',
            'It removes the need for application idempotency',
            'It can improve throughput while adding wait latency',
            'It makes every request use a separate network connection'
          ],
          2,
          'Waiting to accumulate a batch amortizes overhead but delays early items, so objectives determine the right size.'
        ),
        check(
          'What qualifies as operational toil?',
          [
            'Every design decision requiring creative engineering judgment',
            'All learning performed after a significant incident',
            'Any task that produces a lasting reusable capability',
            'Manual repetitive automatable work scaling with service size'
          ],
          3,
          'Toil consumes human capacity without durable leverage and is a target for automation, simplification, or removal.'
        )
      ]
    ),
    lesson(
      'database-operations',
      'Database delivery, migrations, backup, and recovery',
      `# Database delivery, migrations, backup, and recovery

Databases combine software, durable state, concurrency, and application semantics. Treat them as services with owners, objectives, capacity, security, maintenance, and recovery. A managed database reduces engine operations but does not choose correct indexes, transactions, schema transitions, retention, or restore validation for you.

Transactions provide atomicity boundaries defined by the application. Isolation controls which concurrent effects are visible, with performance and anomaly tradeoffs. Constraints enforce truths close to data: primary and unique keys, required values, references, and checks. Application validation improves errors but cannot replace database protection against concurrent writers.

## Connections and queries

Connections consume server resources. Each application instance needs a bounded pool, and fleet-wide maximum must remain below safe database capacity with room for operators and failover. Autoscaling clients without a connection budget can overload the database. Use deadlines, cancellation, transaction limits, and query observability. A timeout at the client should cancel server work when supported.

Diagnose slow queries from actual plans, row estimates, locks, I/O, cache, data distribution, and concurrent load. An index is a maintained data structure that speeds selected access at storage and write cost. Test with representative scale; a query fast on an empty staging database proves little.

## Schema delivery

Version migrations in source and record applied versions transactionally where supported. Classify changes as metadata-only, online, locking, rewriting, or destructive for the actual engine and version. Estimate duration and lock behavior from realistic data. Use expand-and-contract across compatible application releases. Build indexes through online or concurrent mechanisms when available, still monitoring their I/O and replication impact.

Backfills are restartable production jobs. Select bounded key ranges, checkpoint progress after committed work, rate-limit from database health, verify counts and invariants, and support pause. Dual writes are risky because one side can succeed alone; use transactions, an outbox, change capture, or reconciliation according to the boundary.

## Replication and recovery

Read replicas can serve stale data and may lag or replay slowly. They do not automatically provide backup because accidental deletes and corruption replicate. Failover changes endpoints and can lose recent asynchronous writes. Applications need reconnect and retry semantics that do not duplicate effects.

Back up base data and transaction logs according to RPO, encrypt and isolate them, retain the compatible engine and keys, and perform point-in-time restore exercises. Validate application invariants, not only engine startup. Document how to recover from accidental table deletion separately from total-region loss.

## Guided practice

Relay needs to make \`priority\` required on a 500-million-row job table with no downtime. Plan the migration, backfill, validation, rollout, and rollback.

## Worked solution

Add the nullable column without a table rewrite if the engine supports it, and deploy code that writes priority for new rows while reading missing values as the old default. Backfill by indexed primary-key ranges with checkpoints, small transactions, pause controls, and limits driven by replication lag, lock waits, I/O, and user latency. Continuously compare remaining nulls and priority distributions. After every writer version supplies the field and the backfill reaches zero, add a validated constraint through the engine's safest online sequence, then make the application assumption strict. Removal of the fallback occurs only after the rollback window. Rollback before the final contract stops new behavior while keeping the additive column; no emergency mass rewrite is required.`,
      [
        check(
          'Why enforce unique business keys in the database?',
          [
            'Concurrent writers can bypass application-only duplicate checks',
            'A unique key makes every query return rows in insertion order',
            'It removes all need for transactions around related updates',
            'It causes read replicas to have zero replication delay'
          ],
          0,
          'A database constraint arbitrates concurrent commits at the durable shared boundary.'
        ),
        check(
          'What is a danger of client autoscaling?',
          [
            'New instances cannot make database network connections',
            'Aggregate connection pools can exceed database capacity',
            'Every added application replica deletes one database index',
            'Autoscaling converts all writes into read-only transactions'
          ],
          1,
          'Per-instance pools multiply with replicas, so the fleet needs one coordinated connection and concurrency budget.'
        ),
        check(
          'What makes a large backfill operationally safe?',
          [
            'One unbounded transaction started during peak traffic',
            'No progress record so every retry starts from the beginning',
            'Bounded checkpoints, throttling, validation, and pause control',
            'Disabling replication and backups until the job completes'
          ],
          2,
          'Controlled batches turn backfill into observable restartable work whose impact can respond to service health.'
        ),
        check(
          'Why is a read replica not a backup?',
          [
            'Replicas can never answer any application query',
            'A backup must always run on the same compute process',
            'Replication stores only database schema and no row data',
            'Unwanted deletion or corruption can be replicated too'
          ],
          3,
          'Availability copies current state, including bad changes; recovery needs retained historical and isolated data.'
        )
      ]
    ),
    lesson(
      'advanced-operations',
      'Advanced operations, chaos, governance, and technical judgment',
      `# Advanced operations, chaos, governance, and technical judgment

Mastery in DevOps is not using the most tools. It is selecting the smallest system that meets user, reliability, security, compliance, recovery, and cost needs, then operating it transparently. Every abstraction adds a control plane, permissions, upgrade path, telemetry, failure mode, and on-call burden. A three-service product may not need a service mesh, multi-region Kubernetes, or fifteen deployment controllers.

Architecture decisions should record context, options, chosen outcome, consequences, owner, and review trigger. Make reversibility visible. Prefer managed capability when it meets requirements and reduces undifferentiated work, but evaluate lock-in as migration data, interface, skill, and exit cost rather than a slogan. Open source still creates dependency and operating lock-in.

## Governance as executable boundaries

Classify services and data by impact. Higher tiers require stronger objectives, reviews, backups, access separation, and exercises; applying maximum controls to every experiment makes people evade the system. Policy as code can require encryption, ownership, image evidence, network defaults, or retention. Keep policy versioned, tested against positive and negative fixtures, observable in audit mode, and paired with an exception workflow including reason, risk owner, compensating control, and expiry.

Change management should scale with risk. Routine small reversible changes flow automatically through evidence. High-blast-radius or irreversible changes receive deeper review and rehearsal. Emergency paths are fast, authenticated, audited, and reconciled afterward. A weekly meeting approving every low-risk deploy is not a safety system.

## Chaos and game days

Chaos engineering forms a hypothesis about steady-state behavior, introduces a controlled fault, observes whether protections work, and stops within a bounded blast radius. Start in tests, then nonproduction, then carefully selected production scope only when maturity and benefit justify it. Define abort conditions, owner, communication, recovery, and evidence before injection.

Useful experiments include instance termination, dependency latency, expired credential rehearsal, lost zone capacity, full disk, telemetry outage, queue surge, and backup restore. Random destruction without a hypothesis is not learning. A game day can exercise technical systems and human runbooks together.

## Operating lifecycle

Launch reviews confirm ownership, dependency contracts, objectives, capacity, security, telemetry, runbook, backup, restore, and rollback. Regular reviews examine budget, pages, vulnerabilities, cost, dependency end of life, exceptions, and disaster evidence. Retirement removes traffic, data according to policy, DNS, certificates, identities, secrets, pipelines, dashboards, alerts, backups according to retention, and ownership records. Abandoned systems remain attack and cost surfaces.

## Guided practice

Review a proposal to adopt Kubernetes, a service mesh, GitOps, and multi-region active-active for an internal service with 200 daily users and a four-hour RTO. Decide what to build now and define triggers for later complexity.

## Worked solution

Start from objectives and current pain. A simple managed container or VM platform in one region across appropriate failure domains, managed database with tested backups, ordinary CI/CD, short-lived identity, user-level monitoring, and a rehearsed four-hour restore may meet the contract with much less operational surface. Keep immutable artifacts and declarative infrastructure so migration remains possible. Adopt Kubernetes when workload count, scheduling, portability, or shared platform value exceeds its control-plane cost; a mesh when service identity or traffic policy cannot be met more simply; GitOps when declarative environment scale and drift justify another reconciler; multi-region active-active when user or regulatory objectives demand its consistency and on-call cost. Record quantitative triggers and review them, rather than building a hypothetical future.`,
      [
        check(
          'What characterizes mature DevOps technical judgment?',
          [
            'Choosing the smallest system that demonstrably meets requirements',
            'Selecting every popular platform before defining user needs',
            'Treating operational complexity as free after initial installation',
            'Avoiding managed services regardless of workload or team size'
          ],
          0,
          'Mastery weighs the full lifecycle and uses complexity only when it buys a required outcome.'
        ),
        check(
          'What should a policy exception contain?',
          [
            'An undocumented permanent bypass available to all workloads',
            'Reason, risk owner, compensating control, and expiry',
            'A deletion of the policy tests that detected the violation',
            'An anonymous approval with no affected resource identity'
          ],
          1,
          'Explicit bounded exceptions preserve accountability and ensure unresolved risk returns for review.'
        ),
        check(
          'What makes a chaos experiment useful?',
          [
            'Unbounded random failures without any response owner',
            'Running first in the largest production failure domain',
            'A steady-state hypothesis, bounded fault, abort, and evidence',
            'A requirement to cause visible user harm before stopping'
          ],
          2,
          'Controlled experiments verify a reliability claim while limiting risk and producing actionable observations.'
        ),
        check(
          'What belongs in service retirement?',
          [
            'Keeping unused credentials active in case the service returns',
            'Leaving DNS and alerts indefinitely without an owner',
            'Deleting regulated backups immediately despite retention policy',
            'Removing traffic, identities, resources, data, and records by policy'
          ],
          3,
          'Retirement is a controlled lifecycle that removes attack and cost surfaces while honoring data obligations.'
        )
      ]
    ),
    lesson(
      'capstone-local-delivery',
      'Capstone: build a local production delivery system',
      `# Capstone: build a local production delivery system

This capstone proves the foundations without requiring a cloud account or Kubernetes cluster. Build Relay or a comparable API and worker locally, then create the delivery and operating system around it. The goal is a repeatable production-quality path, not a large application.

## Required service behavior

The API accepts a job with a client idempotency key, stores one durable record, and returns its identity. A worker claims jobs through a lease, performs deterministic work, and records one terminal outcome. A retry after an unknown response must not duplicate a job or completion. PostgreSQL is the durable store. The service exposes build identity, readiness, liveness, structured logs, request metrics, queue age, and trace context.

Implement graceful API and worker shutdown. Use an expand-and-contract migration for one additive field and a checkpointed backfill. Create synthetic load that includes duplicate submissions, worker termination, slow database responses, invalid input, and dependency recovery.

## Repository and build

\`\`\`text
relay/
  README.md
  docs/architecture.md
  docs/runbook.md
  docs/slo.md
  app/
  migrations/
  tests/
  ops/compose.yaml
  ops/monitoring/
  scripts/
  .github/workflows/
  Dockerfile
\`\`\`

The container uses a multi-stage build, locked dependencies, a non-root runtime, read-only root filesystem compatibility, explicit entrypoint, health behavior, source metadata, and exact output digest. The build context contains no credentials. Generate an SBOM and a provenance document or faithful local simulation that records source, builder, inputs, commands, and artifact digest.

CI runs formatting, static checks, unit tests, contract or component tests, migration upgrade tests from a prior populated schema, image build, image inspection, secret scan, and policy checks. It publishes one artifact by digest. A local release command promotes that exact digest through Compose, runs migrations as one controlled job, verifies smoke behavior, and records the release. It supports dry run and returns the prior compatible version on failed verification.

## Operations

Compose includes API, worker, PostgreSQL, Prometheus-compatible metrics collection, and an optional trace/log backend. Publish only the API to loopback. Persist database data in a named volume and make reset a separate destructive command. Create dashboards for submission success and latency, job completion and queue age, worker saturation, database client behavior, version, and release annotation.

Define two SLIs and SLOs, multi-window burn calculations, one page-like actionable alert, and one ticket alert. Write a runbook for queue delay and database saturation. Back up the database, destroy a copy of the stack, restore it, validate idempotency and row invariants, and record achieved RTO and RPO.

## Failure examination

Demonstrate a worker killed after the business effect but before acknowledgement, database unavailability during submission, a bad readiness change, a migration interrupted halfway, full temporary disk, and unavailable telemetry. For each, predict behavior, inject the fault, preserve evidence, recover, and state which guardrail worked or failed.

## Guided practice

Before implementing, draw the artifact, configuration, credential, request, job, telemetry, and recovery flows. Mark every durable commit and every point where an outcome can be unknown.

## Worked solution

The source revision produces one image digest and evidence. Compose injects nonsecret configuration and a protected local credential without rebuilding. Submission transaction inserts by unique idempotency key and returns the existing job on retry. Workers claim with expiring leases and commit terminal state conditionally by job identity, making acknowledgement retry safe. Telemetry is bounded and outside the commit path. Migration state is versioned; backfill checkpoints only after committed ranges. Release records digest, schema compatibility, smoke result, and rollback target. Backup includes schema and data plus documented credentials and artifact compatibility. The architecture diagram should let another person point to exactly why every retry, restart, rollout, and restore converges.`,
      [
        check(
          'What is the primary artifact rule in the local capstone?',
          [
            'Build once and promote the same verified digest',
            'Rebuild separately after every environment verification',
            'Deploy a mutable branch name with no recorded bytes',
            'Copy the developer working directory into production'
          ],
          0,
          'One digest preserves the relationship between tests, evidence, staging behavior, and release.'
        ),
        check(
          'How does job completion survive an unknown acknowledgement?',
          [
            'The worker writes a new random job on every retry',
            'A stable identity and conditional terminal commit make retry converge',
            'The queue permanently disables retries after any timeout',
            'The database removes unique constraints during worker startup'
          ],
          1,
          'The business transition is idempotent even if transport delivery or acknowledgement repeats.'
        ),
        check(
          'What must the restore exercise validate?',
          [
            'Only that a backup filename exists on disk',
            'Only that the database process accepts one TCP connection',
            'Service behavior, data invariants, and achieved recovery objectives',
            'That every old log line has the same local timestamp format'
          ],
          2,
          'A useful restore recreates a compatible service and proves business state and recovery timing.'
        ),
        check(
          'What is mastery evidence for a failure injection?',
          [
            'The fault caused the maximum possible user harm',
            'The operator deleted evidence after service recovery',
            'The team restarted every component without a hypothesis',
            'Prediction, bounded experiment, evidence, recovery, and learned control'
          ],
          3,
          'A deliberate experiment tests a stated system claim and produces a concrete reliability conclusion.'
        )
      ]
    ),
    lesson(
      'capstone-platform-sre',
      'Capstones: Kubernetes platform and SRE disaster game',
      `# Capstones: Kubernetes platform and SRE disaster game

The final work has two connected projects. Complete both with local Kubernetes when available, or render and reason through every resource offline while using the local capstone for executable application behavior. The course remains self-contained: tools are implementations of the contracts you have learned, not hidden sources of correctness.

## Capstone A: a secure Kubernetes delivery platform

Create a small platform repository and onboard Relay through its paved road. The platform must provide:

- one versioned application package using Kustomize or Helm;
- development and production-like desired-state roots;
- GitOps-style promotion by exact image digest;
- dedicated service accounts with no unnecessary API token;
- Restricted Pod security, non-root containers, default-deny networking, and precise flows;
- requests, limits, startup, readiness, and liveness behavior;
- topology spread, disruption budget, rollout surge and availability settings;
- ConfigMap rollout identity and external secret reference;
- API Service and controlled edge route;
- separately owned migration Job;
- SLO recording rules, dashboards, actionable alerts, logs, traces, and release links;
- schema, manifest, policy, provenance, and admission checks in CI.

Build a service catalog record with owner, dependencies, data class, repository, artifact, runtime, objectives, dashboard, alerts, and runbook. Create one self-service request for a new Relay-like service. The request is idempotent and produces a reviewable plan before it creates anything. Document the extension process for a workload that genuinely needs a capability outside the default.

Promotion changes only desired state to an already built digest. A reconciler or local simulation reports sync and workload health. Pruning cannot delete persistent production data without a separate safeguard. Emergency override has authorization, audit, reconciliation pause or commit path, and expiry.

## Capstone B: SRE disaster game

Define user objectives for submission and completion, calculate budgets, and create fast and slow burn alerts. Establish incident roles and a communication template. Then run a game day containing at least:

- a bad release that passes liveness but fails readiness;
- database connection exhaustion amplified by retries;
- a lost worker node during a job;
- a network policy blocking DNS or telemetry;
- secret rotation with one stale consumer;
- exhausted cluster capacity preventing surge;
- a corrupted primary database requiring point-in-time restore;
- unavailable desired-state repository during otherwise healthy runtime.

Each scenario has a steady-state hypothesis, blast radius, abort, expected signals, runbook, recovery, and evidence. Inject one fault at a time, unless a planned compound scenario tests amplification. Measure detection, declaration, mitigation, recovery, user bad events, data correctness, pages, and operator actions. Never mark recovery from infrastructure color alone.

## Final review

Present the complete trace from reviewed source to builder, artifact digest, provenance, environment commit, reconciler, workload, user request, trace, SLI, alert, incident, backup, and restored service. Explain every identity and authority boundary. Demonstrate that a hostile pull request cannot obtain production credentials, a mutable tag cannot change deployed bytes, an ordinary workload cannot read another secret, a rollout cannot destroy schema compatibility, and a retry cannot duplicate a business effect.

Calculate cost per successful job and identify the first capacity bottleneck. Remove one unnecessary abstraction and defend the simpler design. Retire a test service completely, including route, DNS, certificate, identity, secret, desired state, telemetry, data, and backups according to policy.

## Guided practice

Write a launch review for Relay covering users, architecture, dependencies, identities, delivery, data, objectives, capacity, security, telemetry, failure modes, incident response, backup, restore, cost, and retirement. Name every unresolved risk with owner and decision date.

## Worked solution

Approve only when exact artifacts and desired state are traceable; changes are small, compatible, policy-checked, and recoverable; workload and automation identities are least-privileged and short-lived; user SLIs drive rollout and paging; capacity covers surge and a declared failure domain; secrets rotate without source exposure; retries and migrations preserve data invariants; backup restore meets measured objectives; incident command and emergency reconciliation were rehearsed; platform and workload ownership are explicit; and cost and toil are measured. An unresolved risk remains visible with impact, likelihood, mitigation, owner, expiry, and accepted authority. Mastery is the ability to build this path, break it deliberately, restore it without duplicate or lost business effects, explain every tradeoff, and simplify it when requirements do not justify complexity.`,
      [
        check(
          'What should GitOps promotion change?',
          [
            'Desired state to reference an already verified artifact digest',
            'Application source by editing it directly on the cluster',
            'Production dependencies through an unrecorded rebuild',
            'The workload identity into a permanent administrator account'
          ],
          0,
          'Promotion advances exact known bytes through a reviewed declaration rather than creating a new artifact.'
        ),
        check(
          'What defines recovery in the disaster game?',
          [
            'Every infrastructure dashboard panel has the same color',
            'User paths and data invariants are verified within objectives',
            'The incident channel stops receiving new messages',
            'The suspected component has been restarted at least once'
          ],
          1,
          'Recovery is an end-to-end service and data property measured against user and recovery commitments.'
        ),
        check(
          'What must a platform extension process preserve?',
          [
            'An unowned permanent bypass from all standard policy',
            'A hidden live edit that desired state will later overwrite',
            'Explicit risk, ownership, controls, compatibility, and lifecycle',
            'A guarantee that the platform team owns the application forever'
          ],
          2,
          'Extensions are supported contracts with governed risk, not invisible escapes from ownership.'
        ),
        check(
          'Which result best demonstrates DevOps mastery?',
          [
            'Memorizing every command flag in every named platform',
            'Using the maximum possible number of controllers and services',
            'Finishing one deployment without observing production behavior',
            'Delivering, operating, breaking, recovering, explaining, and simplifying safely'
          ],
          3,
          'Mastery integrates flow, systems, security, reliability, evidence, recovery, and judgment across the full lifecycle.'
        )
      ]
    )
  ]
}
