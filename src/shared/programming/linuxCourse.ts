import type { ProgCourseDef } from './types'

export const LINUX_COURSE: ProgCourseDef = {
  key: 'linux-internals',
  title: 'Linux internals and networking',
  description: 'Processes, files, permissions, systemd and memory, then TCP/IP, DNS, HTTP/TLS, SSH and the debugging tools that make them visible.',
  lessons: [
    {
      key: 'processes-signals',
      title: 'Processes and signals',
      body: `# Processes and signals

Every process on a Linux box exists because another process cloned itself. There is no "run this program" syscall in the Unix model. There is \`fork()\`, which duplicates the calling process, and \`execve()\`, which discards the current program image and loads a different one into the same process. A shell running \`ls\` forks itself, and the child immediately execs \`/bin/ls\`.

That two-step is not an accident of history, it is the whole design. Between the fork and the exec the child is still the shell, so the shell can adjust the environment the new program will inherit: open a file and point fd 1 at it, close descriptors, change directory, drop privileges, set the process group. Redirection, pipes and \`sudo\` all live in that gap.

## PIDs, PPIDs and the tree

Every process has a PID and a PPID, so the process list is a tree. PID 1 is whatever the kernel started first — systemd on Debian, Ubuntu, Fedora and Arch; in a container it is whatever your image's entrypoint is. Names in square brackets in \`ps\` output are kernel threads, not real processes.

\`\`\`bash
ps -ef --forest | less     # the tree, one line per process
pstree -p $$               # the tree above your current shell
cat /proc/self/status      # what the kernel knows about the reader itself
\`\`\`

## Process states

The \`STAT\` column of \`ps aux\` and the \`State:\` line of \`/proc/<pid>/status\` use the same letters:

- \`R\` — runnable: either on a CPU right now or queued waiting for one.
- \`S\` — interruptible sleep, waiting for something and wakeable by a signal. Most processes, most of the time.
- \`D\` — uninterruptible sleep, essentially always waiting on I/O. A process in \`D\` does not respond to any signal, **including SIGKILL**, until the I/O completes. A pile of \`D\` processes means a sick disk or a hung NFS mount, not a software bug.
- \`T\` — stopped, by \`SIGSTOP\` or job control.
- \`Z\` — zombie.

## Zombies and orphans

When a process exits, the kernel frees its memory but keeps a small record holding the exit status, because the parent may still want to read it. That record is the zombie: no memory, no CPU, just a PID and a number. It is cleared when the parent calls \`wait()\`, which is called *reaping*.

So a zombie is a bug in the **parent**, which is not reaping its children. You cannot kill a zombie — it is already dead, and \`kill -9\` on it does nothing at all. Fix or kill the parent, and the zombies vanish immediately.

An orphan is the mirror image: the parent died first. The kernel re-parents the child to PID 1 (or to the nearest registered subreaper), which reaps it properly. Orphans are normal and harmless; that is exactly how daemons used to detach.

## Signals

A signal is a one-byte interrupt, not a message: there is no payload and no delivery receipt.

- \`SIGTERM\` (15) — the default of \`kill\`. Polite, and catchable, so a program can flush buffers, remove its pidfile and exit.
- \`SIGINT\` (2) — Ctrl-C, sent to the terminal's foreground process group.
- \`SIGHUP\` (1) — the terminal went away. Daemons with no terminal reuse it to mean "reload your config".
- \`SIGKILL\` (9) — cannot be caught, blocked or ignored. The kernel tears the process down where it stands: no flush, no cleanup, temp files and lock files left behind.
- \`SIGSTOP\` (19) and \`SIGCONT\` (18) — freeze and thaw. \`SIGSTOP\` is uncatchable too, and a stopped process does not act on a queued \`SIGTERM\` until it is continued.
- \`SIGQUIT\` (3) — Ctrl-backslash, dumps core; Go runtimes print every goroutine stack instead.

The operational rule is: send TERM, wait a few seconds, escalate to KILL only if it is still there. Reaching for \`kill -9\` first is how databases end up needing recovery.

## Exit codes

An exit status is a single byte. \`0\` is success and everything else is failure — there is no convention beyond that, except the ones the shell adds:

- \`127\` — command not found, \`126\` — found but not executable.
- \`128 + N\` — killed by signal N. \`137\` is SIGKILL, \`143\` is SIGTERM, \`130\` is Ctrl-C. Seeing 137 in a container log almost always means the OOM killer or a memory limit, not your code.

\`\`\`bash
sleep 60 &
kill -9 %1
wait $!; echo $?      # 137
\`\`\`

## Staying alive after logout

Closing a terminal delivers SIGHUP to the session leader — your shell — and bash passes it on to its jobs. Backgrounding with \`&\` alone does not protect anything; the job is still in that session.

- \`nohup cmd &\` — makes the command ignore SIGHUP and redirects output to \`nohup.out\`. Same session, but deaf to the hangup.
- \`setsid cmd\` — starts the command in a brand new session with no controlling terminal, so the hangup never reaches it in the first place.
- \`disown -h %1\` — the retroactive fix, for the job you already started. It only edits your shell's job table.
- A systemd unit, or \`systemd-run --user\`, for anything that genuinely needs to survive logout and reboots.

## Job control

Job control is a shell feature built on process groups. The terminal has exactly one foreground process group; \`Ctrl-Z\` sends \`SIGTSTP\` to it, \`bg\` continues it in the background, \`fg\` puts it back in front, and \`jobs -l\` lists them with PIDs. A background job that tries to read from the terminal is stopped with \`SIGTTIN\`, which is why a background command sometimes freezes for no visible reason.`,
      questions: [
        {
          prompt: 'A process is stuck in state Z and kill -9 on it changes nothing. What actually clears it?',
          options: [
            'Sending SIGKILL to its entire process group rather than the single PID',
            'Getting its parent to reap it, by fixing the parent or killing the parent',
            'Waiting for the kernel to expire the entry, which it does after a few minutes',
            'Nothing needs doing, because Z is an ordinary busy state',
          ],
          correct: 1,
          explain: 'A zombie is only an exit-status record left behind for the parent to read. It has no code to signal; the parent calling wait(), or dying so PID 1 inherits the job, is what removes it.',
        },
        {
          prompt: 'Why does kill -9 leave a database in a worse state than a plain kill?',
          options: [
            'SIGKILL skips the kernel buffer flush that SIGTERM performs on open files',
            'SIGKILL is delivered to every thread at once instead of just the main one',
            'SIGKILL cannot be caught, so the process never runs its own cleanup path',
            'SIGKILL bypasses the filesystem journal, so the last writes are rolled back',
          ],
          correct: 2,
          explain: 'SIGTERM is catchable, so a well-written server flushes and closes on the way out. SIGKILL is handled entirely by the kernel and the process never executes another instruction.',
        },
        {
          prompt: 'A container exits with status 137. What does that number tell you?',
          options: [
            'The process was killed by signal 9, since the shell reports 128 plus the signal',
            'The main process returned the value 137 from its own main() function as it exited',
            'The image is missing an executable, which is the 137 convention',
            'The health check failed 137 times before the runtime gave up',
          ],
          correct: 0,
          explain: 'Exit statuses above 128 encode death by signal: 128 + 9 = 137 is SIGKILL, which in a container usually means an enforced memory limit or the OOM killer.',
        },
        {
          prompt: 'You started a long job with ./build.sh & and now need to close the terminal. Which option protects the already-running job?',
          options: [
            'Re-run it under nohup, which retroactively covers the running process too',
            'Nothing is needed, because & already detaches a job from the session',
            'setsid on the PID, which moves a running process into a new session',
            'disown -h %1, which removes the job from the hangup list your shell keeps',
          ],
          correct: 3,
          explain: 'nohup and setsid must wrap the command at launch time. disown is the after-the-fact tool, since it edits the running shell’s own job table.',
        },
      ],
    },
    {
      key: 'filesystem-inodes',
      title: 'Files, inodes and permissions',
      body: `# Files, inodes and permissions

A Unix filename is not a file. The file is the **inode**: a numbered record holding the size, timestamps, owner, permission bits and the pointers to the data blocks. A directory is just a table mapping names to inode numbers. That single fact explains most of the surprising behaviour in this lesson.

\`\`\`bash
ls -li notes.txt          # the first column is the inode number
stat notes.txt            # inode, links, blocks, owner, three timestamps
df -i /                   # inodes free — a filesystem can fill up on these alone
\`\`\`

## Hard links and symlinks

A hard link is a second name pointing at the same inode. Both names are equally real; there is no original. The inode carries a **link count**, and the data is freed only when the count reaches zero. This is why the syscall behind \`rm\` is called \`unlink\`: it removes a name, not a file.

A symlink is its own tiny inode whose contents are a path string. It can point across filesystems, it can point at a directory, and it can point at nothing at all (a dangling link). A hard link can do none of those: it cannot cross a filesystem boundary, because inode numbers are only meaningful within one filesystem, and ordinary users cannot hard-link directories.

The same rule governs the classic disk-space mystery. Delete a 40 GB log that nginx still has open and \`du\` will not see it, but \`df\` still counts it: the name is gone, yet the open file descriptor is a reference, so the link count has not reached zero. Restart the process or truncate the file and the space returns.

## Permission bits

Nine bits, three triples — user, group, other — each read, write, execute. \`ls -l\` prints them, \`chmod\` sets them, octal is the sane way to talk about them: \`644\` for a normal file, \`755\` for a program or a directory, \`600\` for a secret.

On a **directory** the bits mean something different from what most people assume:

- \`r\` — you may list the names in it.
- \`w\` — you may create, rename and delete entries in it. Deleting a file is a write to its **directory**, not to the file, which is why you can delete a read-only file you do not own.
- \`x\` — you may traverse it, that is, use it as a component of a path. A directory with \`x\` but no \`r\` lets you open a file inside it if you already know the name.

\`chmod -R 755\` on a source tree is a classic mistake: it marks every \`.txt\` and \`.png\` executable. \`chmod -R u+rwX,go+rX\` is the fix — the capital \`X\` sets the execute bit only on directories and on files that already had one.

## umask

New files get \`0666\` and new directories \`0777\` from the creating program, and the process **umask** subtracts from that. A umask of \`022\` yields \`644\` files and \`755\` directories. Debian and Ubuntu default to \`002\` for regular users, on the "user private group" model where every user has their own group; Fedora uses the same scheme. The result is group-writable files, which is fine when your group is just you and surprising when it is not.

## setuid, setgid and the sticky bit

Three extra bits sit above the nine:

- **setuid** (\`4000\`) — the program runs as the file's owner instead of the caller. \`/usr/bin/sudo\` and \`/usr/bin/passwd\` show \`-rwsr-xr-x\`, owned by root: that is how an ordinary user edits \`/etc/shadow\`. On scripts it is ignored by Linux, for good reasons.
- **setgid** (\`2000\`) — on a program, run as the file's group. On a **directory** it means something else entirely and much more useful: new entries inherit the directory's group, which is how shared project trees stay shared.
- **sticky** (\`1000\`) — on a directory, only the owner of an entry may delete it. \`/tmp\` is \`drwxrwxrwt\`, world-writable but not a place where anyone can remove your files.

## Mounts and the virtual filesystems

There is one tree. Devices are grafted onto it at mount points, and \`findmnt\` or \`mount | column -t\` shows what is grafted where. Several of those mounts are not disks at all:

- \`/proc\` — the kernel's view of processes. Every PID is a directory: \`cmdline\`, \`environ\`, \`status\`, \`limits\`, \`cwd\`, \`fd\`.
- \`/sys\` — devices, drivers and kernel tunables, one file per attribute.
- \`/dev\` — device nodes, plus the useful fictions \`/dev/null\`, \`/dev/zero\`, \`/dev/urandom\`.

## File descriptors

An open file is a small integer per process: 0 stdin, 1 stdout, 2 stderr, and upward from 3. The kernel exposes them as symlinks:

\`\`\`bash
ls -l /proc/self/fd            # the fds of the process listing them
ls -l /proc/$(pgrep -f nginx | head -1)/fd | head
lsof -p 1234                   # the same thing, with names and types
\`\`\`

Descriptors are inherited across \`fork\` and survive \`exec\` unless marked close-on-exec, which is exactly what makes shell redirection and pipelines work. It is also why a leaked descriptor eventually produces "too many open files" — the per-process limit, \`ulimit -n\`, counts these entries.`,
      questions: [
        {
          prompt: 'df reports the root filesystem 100% full, but du -sh / adds up to far less. What is the most likely cause?',
          options: [
            'du counts compressed sizes while df counts the uncompressed block usage',
            'A large deleted file is still held open by a running process, so its blocks stay allocated',
            'df includes the swap partition and the blocks reserved for root in the used total for that filesystem',
            'The filesystem journal grew and is not reported by du',
          ],
          correct: 1,
          explain: 'Unlinking removes a name; the blocks are freed only when the link count and every open descriptor are gone. Restarting the holder, or truncating via /proc/<pid>/fd, returns the space.',
        },
        {
          prompt: 'Why can you delete a file that is owned by another user and mode 444?',
          options: [
            'Deleting checks the write bit of the containing directory, not of the file',
            'Mode 444 only protects the file contents, and unlink does not read contents',
            'The kernel grants delete rights to any member of the file owner’s group',
            'Because rm falls back to a forced unlink when the first attempt is refused',
          ],
          correct: 0,
          explain: 'Removing a name is a modification of the directory entry table, so directory write permission is what is checked. The sticky bit exists precisely to re-tighten that on shared directories like /tmp.',
        },
        {
          prompt: 'Which statement about hard links is true?',
          options: [
            'A hard link stores the path of its target and breaks if the target moves',
            'A hard link cannot point at an inode on a different filesystem',
            'Removing the original name makes every hard link to it dangle',
            'A hard link needs the target to exist when the link is created and read',
          ],
          correct: 1,
          explain: 'Hard links are additional directory entries for one inode number, and inode numbers only mean anything inside a single filesystem. Storing a path and dangling are symlink properties.',
        },
        {
          prompt: 'A shared directory is set to mode 2775. What does the leading 2 buy you?',
          options: [
            'Files created inside it end up owned by root regardless of which user created them',
            'The directory is mounted read-only for users outside the owning group',
            'Only the owner of a file inside it may remove that file',
            'New entries inherit the directory’s group instead of the creator’s primary group',
          ],
          correct: 3,
          explain: 'setgid on a directory propagates the group downward, which keeps a shared tree readable by the project group. Restricting deletion to the owner is the sticky bit, mode 1000.',
        },
      ],
    },
    {
      key: 'users-privilege',
      title: 'Users, groups and privilege',
      body: `# Users, groups and privilege

The kernel does not know your name. It knows a numeric **uid** and a set of **gids**, and every permission check is arithmetic on those numbers. Names are a userspace convenience resolved through \`/etc/passwd\`, \`/etc/group\` and whatever else \`/etc/nsswitch.conf\` lists. Uid 0 is root, and root is special in exactly one way: most permission checks are skipped for it.

\`\`\`bash
id                      # your uid, primary gid and every supplementary group
getent passwd xamir     # goes through nsswitch, so it sees LDAP/SSSD too
groups                  # names only
\`\`\`

## passwd and shadow

\`/etc/passwd\` is world-readable and holds seven colon-separated fields: name, an \`x\` placeholder, uid, gid, comment, home directory, login shell. It is readable by everyone because ordinary programs need to map uid 1001 to a name when they print a listing.

The hashes moved out to \`/etc/shadow\` decades ago, which is \`-rw-r-----\` root:shadow. That split is the point: a world-readable file cannot hold material worth cracking offline. It is also why \`passwd\` is a setuid-root binary — an unprivileged user must somehow write one line of a file they cannot read.

A service account has \`/usr/sbin/nologin\` or \`/bin/false\` as its shell and often \`*\` or \`!\` in the shadow field, meaning no password will ever match. It exists to own files and run a process, not to log in.

## sudo, su and their differences

- \`su user\` starts a shell as that user but keeps most of your environment and your current directory. \`su - user\` simulates a full login: it runs the login shell, loads that user's profile, and resets \`HOME\`, \`PATH\` and \`SHELL\`. The dash is where "it works for me but not under su" bugs come from.
- \`su\` asks for the **target** user's password; \`sudo\` asks for **your own**. That is the reason sudo won: on a machine with ten admins, nobody has to know the root password and each of them can be revoked individually.
- \`sudo -i\` is the login-shell form, \`sudo -s\` keeps your environment, and \`sudo -u www-data cmd\` runs as any user, not just root.

Rules live in \`/etc/sudoers\` and \`/etc/sudoers.d/\`, and you edit them with \`visudo\`, which refuses to save a file that fails its syntax check. A broken sudoers file locks everyone out of privilege on a machine you may have no other way into. The default group differs by distro: Debian and Ubuntu use \`sudo\`, Fedora and Arch use \`wheel\`.

Sudo also logs. Every invocation lands in the journal or \`/var/log/auth.log\`, with the command line and the invoking user, which is an audit trail that a shared root password cannot produce.

## Capabilities instead of all-or-nothing root

Historically, a program that needed one privileged operation had to be setuid root and therefore got **every** privilege. Linux split root's powers into capabilities so that need not be true:

\`\`\`bash
getcap /usr/bin/ping
sudo setcap cap_net_bind_service=+ep /usr/local/bin/myserver
getpcaps $$
\`\`\`

\`CAP_NET_BIND_SERVICE\` allows binding ports below 1024. \`CAP_NET_RAW\` allows raw sockets, which is what \`ping\` actually needs and why modern distros ship it with a capability rather than a setuid bit. \`CAP_SYS_ADMIN\` is so broad that it is jokingly called the new root.

The safer pattern for a service is usually neither: start as root under systemd, bind the port, and let \`User=\` drop privileges — or avoid the low port entirely and put a reverse proxy in front.

## chown and chmod pitfalls

- \`chmod -R 777\` is never the fix. It marks data files executable, makes everything world-writable, and on a web root it invites anyone who can write a file to have it served back. If a permission problem is solved by 777, the real problem was ownership or a missing \`x\` on a parent directory.
- Use \`chmod -R u=rwX,go=rX\` so the capital \`X\` touches only directories and already-executable files.
- \`chown -R\` following symlinks is a trap; \`-h\` acts on the link itself and \`-P\` avoids descending through them.
- SSH refuses keys that are group or world readable, so \`chmod 600 ~/.ssh/id_ed25519\` and \`700 ~/.ssh\`. This is a frequent cause of "it asks for a password even though I installed the key".
- Ownership and permissions are checked at \`open()\` time only. Tightening a file does not close descriptors a process already holds.

## Why a service gets its own user

Running a daemon as root means one remote-code-execution bug in it is a whole-machine compromise. Give it a uid of its own, own only the files it must write, and the blast radius becomes those files. That is the entire argument, and it is why every packaged service on every distro creates a user at install time — \`nginx\` under \`www-data\` on Debian and Ubuntu, \`nginx\` under \`nginx\` on Fedora.

systemd makes this cheap: \`User=\`, \`Group=\`, plus \`ProtectSystem=strict\`, \`PrivateTmp=yes\` and \`NoNewPrivileges=yes\` to remove things the service will never need.`,
      questions: [
        {
          prompt: 'Why is /etc/passwd world-readable while /etc/shadow is not?',
          options: [
            'passwd is world-readable so that users can change their own login shell and comment field by editing it directly',
            'shadow is encrypted, so its permissions are only a formality anyway',
            'Ordinary programs need the uid-to-name mapping, but nothing outside authentication needs the hashes',
            'The kernel reads passwd directly and cannot open root-only files during a login',
          ],
          correct: 2,
          explain: 'Any ls listing has to turn uid 1001 into a name, so that mapping must stay public. Password hashes are exactly what an attacker would want offline, so they moved to a root-only file.',
        },
        {
          prompt: 'Which is the strongest practical argument for sudo over a shared root password?',
          options: [
            'sudo authenticates each admin as themselves, so access is logged and revocable one person at a time',
            'sudo runs commands in a sandbox that limits what root can touch',
            'sudo is faster because it avoids starting a second login shell',
            'sudo encrypts the command and its arguments before they reach the kernel, so nothing is readable in transit',
          ],
          correct: 0,
          explain: 'You type your own password, so the audit log names a person and removing one admin is a one-line change. A shared root password has to be rotated for everyone.',
        },
        {
          prompt: 'Your Go server needs to listen on port 443 and nothing else privileged. What is the least-privilege option?',
          options: [
            'Make the binary setuid root so it can bind before dropping back down',
            'Add its user to the wheel group and start it with sudo from a boot script',
            'Run it as root but chroot it into its own directory tree',
            'Grant it cap_net_bind_service so only that one power is added',
          ],
          correct: 3,
          explain: 'A capability adds a single privilege, while setuid root hands the process every privilege and relies on the code to drop them correctly.',
        },
        {
          prompt: 'A script works when you run it, but fails under su deploy while working under su - deploy. What explains that?',
          options: [
            'su without a dash keeps your environment, so PATH and HOME are still yours',
            'su without a dash does not switch the uid until the first command runs',
            'su - grants the target user extra capabilities from the sudoers file',
            'su without a dash runs the script through dash instead of bash',
          ],
          correct: 0,
          explain: 'The dash makes it a login shell: the target user’s profile is sourced and HOME, PATH and SHELL are reset. Without it, the script still sees your environment and may find the wrong binaries or config.',
        },
      ],
    },
    {
      key: 'systemd-boot',
      title: 'Boot, systemd and the journal',
      body: `# Boot, systemd and the journal

## What happens between power and login

Firmware (UEFI, or BIOS on older machines) picks a boot device and loads a bootloader, usually GRUB. GRUB loads two files: the kernel and an **initramfs**, a small compressed root filesystem held in memory. The kernel unpacks the initramfs and runs it, because the drivers needed to reach the real root — RAID, LVM, LUKS decryption, an exotic disk controller — often are not built into the kernel itself. The initramfs assembles and mounts the real root, then \`switch_root\`s onto it and executes \`/sbin/init\`, which on every mainstream distro today is **systemd** and becomes PID 1.

If a machine hangs before you get a login prompt, the split matters: an initramfs failure drops you at a tiny emergency shell with almost no commands, while a failure after switch_root gives you a normal-looking system with services missing.

## Units and targets

systemd manages **units**, and the type is the file extension: \`.service\`, \`.socket\`, \`.timer\`, \`.mount\`, \`.target\`, \`.path\`. Unit files live in three places, and the order is a hierarchy: \`/usr/lib/systemd/system\` (the package's copy), \`/etc/systemd/system\` (yours, wins), and \`/run/systemd/system\` (transient).

A **target** is just a unit that groups other units — the replacement for runlevels. \`multi-user.target\` is a booted system with networking and no GUI, \`graphical.target\` pulls that in plus a display manager. Ordering comes from \`After=\`/\`Before=\`, and dependency from \`Wants=\`/\`Requires=\`; they are independent, and confusing them produces services that start in the right order but do not start at all.

\`\`\`ini
[Unit]
Description=Sync media library
After=network-online.target

[Service]
Type=simple
User=media
ExecStart=/usr/local/bin/sync-library --once
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=multi-user.target
\`\`\`

## The lifecycle commands

- \`systemctl start\` / \`stop\` — right now, this boot only.
- \`systemctl enable\` — at boot, from now on. It creates the symlink described by \`[Install]\`. Neither implies the other, which is why \`enable --now\` exists.
- \`systemctl daemon-reload\` — re-read unit files after you edit one. Skipping it means systemd keeps running your old definition, and this is the single most common systemd confusion.
- \`systemctl reload\` — tell the service to re-read its own config, if the unit defines \`ExecReload\`.
- \`systemctl mask\` — hard off. It symlinks the unit to \`/dev/null\` so nothing, including a dependency, can start it. \`disable\` alone does not stop another unit pulling it in.
- \`systemctl edit foo.service\` — a drop-in override in \`/etc/systemd/system/foo.service.d/\` that survives package upgrades. Editing the vendor file does not.
- \`systemctl cat\`, \`list-units --failed\`, \`show foo -p Restart\` — for finding out what is actually in effect.

## Restart policies

\`Restart=\` takes \`no\` (default), \`on-failure\`, \`on-abnormal\`, \`always\` and a few more. \`on-failure\` covers a non-zero exit or a fatal signal but respects a clean \`exit 0\`; \`always\` restarts even after success, which is what you want for a server that should never terminate and wrong for a one-shot job.

Restarts are rate limited: \`StartLimitBurst\` restarts within \`StartLimitIntervalSec\` and the unit lands in \`failed\` and stays there. That is a feature — it stops a crash loop from hammering a database — but it also means a service can be down while \`Restart=always\` looks correct in the file. \`systemctl reset-failed\` clears the counter.

## The journal

\`journalctl\` reads a structured binary log, so filtering is by field rather than by grep:

\`\`\`bash
journalctl -u nginx -f              # follow one unit
journalctl -u nginx --since "1 hour ago" --no-pager
journalctl -b -p err                # this boot, priority error and worse
journalctl -b -1                    # the previous boot, if storage is persistent
journalctl -k                       # kernel messages, same as dmesg
journalctl _PID=1234 -o json-pretty # every field of every entry
\`\`\`

Persistence is a per-distro default worth checking: Fedora and Arch keep the journal in \`/var/log/journal\`, while Debian and Ubuntu have historically kept it in \`/run\`, meaning it disappears at reboot. \`Storage=persistent\` in \`/etc/systemd/journald.conf\` fixes it.

## Timers versus cron

A \`.timer\` unit activates a \`.service\` of the same name. Compared with cron it gives you: \`Persistent=true\`, which runs a missed job once the machine comes back rather than skipping it; \`RandomizedDelaySec\`, so a fleet does not stampede at midnight; dependency ordering; resource limits and \`User=\` from the service; and the job's output in the journal instead of mailed to a user nobody reads. \`systemctl list-timers\` shows the next and last run of each.

Cron is still fine for a personal one-liner, and it is one file. Anything a service owns belongs in a timer.

## User units

\`systemctl --user\` runs a private instance for your login, with units in \`~/.config/systemd/user\`. They stop when your last session ends unless you enable **lingering** with \`loginctl enable-linger $USER\`. This is the clean way to run something personal on a shared box without touching system units.`,
      questions: [
        {
          prompt: 'You edited /etc/systemd/system/api.service and ran systemctl restart api, but the old ExecStart is still in effect. Why?',
          options: [
            'The unit needs to be re-enabled before a changed ExecStart takes effect',
            'restart only re-executes the binary and never re-reads the unit definition',
            'systemd caches unit files until daemon-reload is run',
            'The vendor copy in /usr/lib/systemd/system takes priority over /etc',
          ],
          correct: 2,
          explain: 'systemd keeps a parsed copy of every unit in memory. daemon-reload re-reads the files from disk; without it, restart faithfully restarts the old definition.',
        },
        {
          prompt: 'What is the difference between systemctl enable foo and systemctl start foo?',
          options: [
            'enable creates the boot-time symlink described by [Install], start runs it now',
            'enable validates the unit file first, while start skips that validation for speed',
            'enable applies to targets while start applies only to services',
            'enable starts it as root, start uses the User= value from the unit',
          ],
          correct: 0,
          explain: 'They are independent: a unit can be enabled but not running, or running but disabled and gone after reboot. systemctl enable --now does both.',
        },
        {
          prompt: 'A unit has Restart=always yet systemctl status shows it inactive (dead) after a crash loop. What happened?',
          options: [
            'Restart=always is ignored when the unit also sets a User= value',
            'The journal partition filled, and systemd suspends restarts when it cannot log',
            'always only covers clean exits, and a crash needs on-abnormal',
            'It hit the start rate limit, so systemd stopped retrying until reset-failed',
          ],
          correct: 3,
          explain: 'StartLimitBurst restarts inside StartLimitIntervalSec put the unit into a failed state on purpose, so a broken service cannot restart forever. systemctl reset-failed clears the counter.',
        },
        {
          prompt: 'Which advantage do systemd timers have over an equivalent crontab entry?',
          options: [
            'Timers can run more often than once per minute, which cron cannot express',
            'Timers run without any parent process, so they survive a systemd restart',
            'Timers execute their jobs in parallel while cron serializes everything',
            'Persistent=true runs a job that was missed while the machine was off',
          ],
          correct: 3,
          explain: 'cron simply skips an occurrence that fell during downtime. A persistent timer notices the missed elapse and runs the service once the machine is back.',
        },
        {
          prompt: 'You want a personal sync job on a shared server that keeps running after you log out. What is the systemd way?',
          options: [
            'Put the unit in /etc/systemd/system and add your username to WantedBy',
            'A --user unit plus loginctl enable-linger for your account',
            'Run systemctl --user start inside a nohup wrapper at login',
            'Add the unit to graphical.target so the display manager keeps it alive',
          ],
          correct: 1,
          explain: 'The user manager normally exits with your last session; lingering keeps it running at boot and after logout, which is what a --user unit needs to persist.',
        },
      ],
    },
    {
      key: 'memory-io',
      title: 'Memory, the page cache and file descriptors',
      body: `# Memory, the page cache and file descriptors

## Virtual memory

Every process sees a private address space. The addresses it uses are virtual, and the MMU translates them to physical frames through page tables the kernel maintains. Nothing a process does can name a physical address, which is the isolation guarantee the whole system rests on.

Two consequences matter daily. First, memory can be **shared**: two processes running the same binary map the same physical pages of code, and after \`fork()\` all pages are shared copy-on-write until one side writes. Second, an allocation is a promise, not a delivery — the kernel hands out address space and only backs a page with a real frame when the process touches it.

## VSZ versus RSS

- **VSZ** is virtual size: everything mapped, including memory never touched, mapped files, and huge reservations. A JVM or a Go program can show gigabytes of VSZ while using very little.
- **RSS** is resident set size: physical pages currently in RAM for this process. Closer to the truth, but it counts every shared page in full, so summing RSS across processes double-counts shared libraries and can exceed the machine's RAM.
- **PSS**, in \`/proc/<pid>/smaps_rollup\`, divides each shared page by the number of sharers. It is the number that actually adds up.

\`\`\`bash
ps -o pid,rss,vsz,comm -p 1234
grep -E '^(Pss|Rss)' /proc/1234/smaps_rollup
\`\`\`

## "Free" memory is a trap

\`\`\`
              total   used   free   shared  buff/cache   available
Mem:          7.8Gi  3.8Gi  1.9Gi     58Mi       2.4Gi       4.0Gi
\`\`\`

The kernel uses every spare page as **page cache**: file contents kept in RAM so the next read does not touch the disk. Cache is not consumption — it is evicted instantly when something needs the memory. So \`free\` is not the interesting column and low free memory is not a problem; it means the machine is doing its job.

The column to read is **available**: an estimate of what a new process could get without swapping, which is roughly free plus the reclaimable part of the cache. If available is healthy, the machine is fine no matter how small free looks. Dropping caches to make the number look nicer only throws away work you already paid for.

## Swap

Swap is disk space used to hold pages that are not being used, so RAM can hold pages that are. Some swapping is normal and healthy: a daemon that ran once at boot has no business occupying RAM. \`vm.swappiness\` (default 60) tunes how eagerly the kernel prefers evicting cache over swapping anonymous pages.

Pathological swapping — **thrashing** — is different, and you identify it by rate rather than by amount. Swap used, high and stable, is fine. Constant \`si\`/\`so\` traffic in \`vmstat 1\` with the machine crawling means the working set does not fit in RAM. Note that a machine with no swap does not avoid the problem; it just reaches the OOM killer sooner.

## The OOM killer

Because allocations are overcommitted, the kernel can run out of physical pages with no way to refuse an allocation that already succeeded. The out-of-memory killer then picks a victim by a badness score, mostly proportional to memory used and adjustable per process with \`oom_score_adj\`, and sends it an uncatchable kill.

You find it after the fact, never in the victim's own logs:

\`\`\`bash
dmesg -T | grep -i -E 'killed process|out of memory'
journalctl -k -b | grep -i oom
cat /proc/1234/oom_score
\`\`\`

Inside a container the same thing happens at the cgroup limit rather than at machine level, and the process simply disappears with exit status 137.

## Descriptors, pipes and sockets

Files, pipes, sockets, epoll instances, timers and inotify watches are all descriptors, so they all count against the same limits. A pipe is a kernel buffer with a reader and a writer: it blocks when full, and the writer receives SIGPIPE when the reader closes, which is exactly what \`head -1\` does to the command before it.

\`\`\`bash
lsof -p 1234                # everything one process has open
lsof -i :8080               # who owns a port
lsof +D /var/lib/app        # who is holding files under a directory
lsof | grep deleted         # unlinked files still consuming disk
ls /proc/1234/fd | wc -l    # the fast count, no lsof needed
cat /proc/1234/limits       # the limits that process actually got, not your shell's
\`\`\`

## ulimits

\`ulimit -n\` is the per-process descriptor limit, and \`EMFILE\` — "too many open files" — is what a server hits when it leaks connections or simply serves more than the default allows. There is a soft limit you can raise up to the hard limit yourself, and a hard limit only root can raise. A shell's \`ulimit\` change dies with the shell; for a service the value belongs in the unit as \`LimitNOFILE=\`, and for a login session in \`/etc/security/limits.conf\`. The system-wide ceiling is \`fs.file-max\`.

Always check what the *running* process actually got, with \`cat /proc/<pid>/limits\` as listed above, rather than what your interactive shell reports: the two are frequently different, and only the first one explains the error.`,
      questions: [
        {
          prompt: 'free -h shows 1.9Gi free out of 7.8Gi, with 2.4Gi in buff/cache and 4.0Gi available. Is this machine short of memory?',
          options: [
            'Yes, because free is below 25% of total and swapping is imminent',
            'No, cache is reclaimable and available is the figure that matters',
            'Yes, since buff/cache counts as used by definition in this output',
            'It cannot be told from free at all, only vmstat can answer it',
          ],
          correct: 1,
          explain: 'The kernel deliberately spends idle RAM on page cache and gives it back on demand. available already accounts for the reclaimable part, so 4.0Gi of headroom is the real answer.',
        },
        {
          prompt: 'Why can the RSS values of all processes add up to more than the machine has RAM?',
          options: [
            'RSS is measured in units of 4 KiB pages while free reports totals in decimal megabytes',
            'RSS includes pages that have been swapped out to disk as well',
            'Shared pages such as libc are counted in full for every process mapping them',
            'RSS is sampled per second and drifts upward under load',
          ],
          correct: 2,
          explain: 'A shared library resident once in physical memory appears in each mapper’s RSS. PSS in smaps_rollup divides each shared page among its users, which is the figure that sums correctly.',
        },
        {
          prompt: 'A service vanished with no stack trace and nothing in its own log. Where do you look first?',
          options: [
            'strace on the next run, since the exit path is only visible at syscall level',
            'The core dump directory, because an uncaught exception always writes one',
            'dmesg -T or journalctl -k, where the OOM killer records the process it chose',
            'The systemd unit file, since Restart= silently hides crash output',
          ],
          correct: 2,
          explain: 'The OOM kill is a kernel decision delivered as an uncatchable SIGKILL, so the victim cannot log anything. The kernel ring buffer names the process and its score.',
        },
        {
          prompt: 'Your server dies with "too many open files" under load. Which fix actually applies to the running service?',
          options: [
            'Run ulimit -n 65535 in your shell before restarting the machine',
            'Raise fs.file-max, which is what the per-process check consults',
            'Add LimitNOFILE= to its systemd unit and reload the daemon',
            'Increase the socket backlog, since sockets are not descriptors',
          ],
          correct: 2,
          explain: 'EMFILE comes from the per-process soft limit, which a service inherits from its unit and not from your interactive shell. fs.file-max is only the system-wide ceiling.',
        },
      ],
    },
    {
      key: 'packages-storage',
      title: 'Packages, disks and filesystems',
      body: `# Packages, disks and filesystems

## The package manager mental model

Every distro's package manager does the same four things: fetch signed **metadata** from configured repositories, resolve a dependency graph, download packages, and unpack them while running maintainer scripts. The commands differ, the model does not.

- Debian and Ubuntu — \`apt update\` refreshes the metadata, \`apt upgrade\` installs newer versions of what you have, \`apt full-upgrade\` also lets it remove packages to satisfy a dependency change. \`apt update\` alone never installs anything, and \`apt upgrade\` without a preceding update just re-reads yesterday's index. Files: \`/etc/apt/sources.list\`, \`/etc/apt/sources.list.d/\`, keys in \`/etc/apt/keyrings/\`. Lower-level tool: \`dpkg\`.
- Fedora and RHEL — \`dnf upgrade\` refreshes and upgrades in one step; metadata expiry is automatic. Repos in \`/etc/yum.repos.d/\`, each naming its \`gpgkey\`. Lower-level tool: \`rpm\`.
- Arch — \`pacman -Syu\` and nothing else. Arch is a rolling release, so a **partial upgrade** (\`-Sy\` then installing one package) is explicitly unsupported and breaks systems: you would install a package built against libraries newer than the ones on disk.

Signing is the security model, not HTTPS. Each repository is signed, the manager verifies the signature against a locally trusted key, and a mirror that serves you a modified package fails verification. This is why "just add this key and this repo" from a random blog post is a genuine privilege handover — you are trusting that publisher with root on every future upgrade.

## Disks, partitions and LVM

\`\`\`bash
lsblk -f                    # tree of disks, partitions, filesystems, UUIDs, mountpoints
findmnt /var                # what is mounted there, from where, with which options
blkid                       # UUIDs and types
sudo fdisk -l               # partition tables
\`\`\`

Names follow the transport: \`/dev/sda\` for SATA and USB, \`/dev/nvme0n1\` for NVMe, with partitions \`sda1\` or \`nvme0n1p1\`. Partition tables are GPT on anything modern; MBR survives on old BIOS machines and caps out at 2 TiB.

**LVM** inserts a layer between partitions and filesystems. Physical volumes (a partition or whole disk) join a volume group (a pool), and logical volumes are carved out of the pool. The payoff is that an LV is not tied to a contiguous region of one disk: you can grow it onto a second disk, shrink another, or snapshot one before a risky upgrade — all online. The cost is one more layer to understand when something breaks. \`pvs\`, \`vgs\` and \`lvs\` summarise each level.

## Filesystems

- **ext4** — the boring default on Debian and Ubuntu. Journaled, extremely well tested, can grow online but not shrink while mounted.
- **XFS** — the default on RHEL and Fedora. Excellent with large files and parallel writes; it can grow but **cannot shrink at all**, which is a real planning constraint.
- **Btrfs** — the default on Fedora Workstation and openSUSE. Copy-on-write, with built-in snapshots, checksums and multi-device support, which is why snapshot-before-upgrade tooling exists there.
- **tmpfs** — RAM-backed, contents gone at reboot. \`/run\`, \`/dev/shm\`, sometimes \`/tmp\`.

A filesystem also has a fixed inode count set at \`mkfs\` time. Millions of tiny files can exhaust inodes while gigabytes of space remain, and the error is the same misleading "No space left on device". \`df -i\` is the only way to see it.

## fstab and mounting

\`/etc/fstab\` lists what is mounted at boot: source, mount point, type, options, dump flag, fsck order.

\`\`\`
UUID=1f2a...9c  /data  ext4  defaults,noatime  0 2
\`\`\`

Identify by **UUID** (or \`LABEL\`), never by \`/dev/sdb1\`. Kernel device names depend on probe order, so adding a disk can renumber the others and your data mount becomes your backup disk. Useful options: \`noatime\` (skip access-time writes), \`nofail\` (do not block boot if the device is missing — essential for external and network storage), \`ro\`, \`noexec\`, \`nosuid\`. After editing, \`sudo mount -a\` and \`systemctl daemon-reload\` prove it before you reboot into an emergency shell.

## df versus du

They answer different questions and disagreeing is normal:

- \`df\` asks the **filesystem** how many blocks are allocated. It sees deleted-but-open files, filesystem metadata, and the 5% reserved-for-root blocks that ext4 sets aside by default.
- \`du\` walks a **directory tree** and adds up the files it can see. It misses anything you cannot read, anything under a mount point that is now covered by another mount, and every unlinked file still held open.

The three classic gaps: a deleted log still open in a process (find it with \`lsof | grep deleted\`), files hidden under a mount point (bind-mount the parent elsewhere to look), and inode exhaustion (\`df -i\`). \`du -sh * | sort -h\` remains the fastest way to find where the space actually went.`,
      questions: [
        {
          prompt: 'On Debian, what does apt update do?',
          options: [
            'Refreshes the package index from the configured repositories, installing nothing',
            'Upgrades every installed package to the newest version that the repositories offer',
            'Rebuilds the local dpkg database after a manual package install',
            'Downloads new packages but defers unpacking until the next apt upgrade',
          ],
          correct: 0,
          explain: 'update only fetches metadata, which is why upgrade without it works from a stale index. Fedora’s dnf upgrade folds both steps together.',
        },
        {
          prompt: 'Why does fstab identify filesystems by UUID rather than by /dev/sdb1?',
          options: [
            'UUIDs let the kernel mount partitions in parallel during early boot',
            'Kernel device names depend on probe order, so adding a disk can renumber them',
            'Device names are unavailable until udev has finished, which is after fstab is read',
            'UUIDs survive a reformat of the partition while device names do not',
          ],
          correct: 1,
          explain: 'sda and sdb are assigned as devices are discovered, so an extra disk or a slow controller can swap them. The UUID is stored in the filesystem superblock and follows the data.',
        },
        {
          prompt: 'df says the volume is full, du -sh on it is far smaller, and lsof shows no deleted files. What is worth checking next?',
          options: [
            'Whether the disk is failing, since SMART errors inflate the used figure',
            'Whether swap is on the same partition and counted twice',
            'Whether df -i shows the inode table exhausted by many small files',
            'Whether du was run without -x and crossed into another filesystem',
          ],
          correct: 2,
          explain: 'An ext4 filesystem has a fixed inode count from mkfs time, and running out gives the same "No space left on device" error while blocks remain free.',
        },
        {
          prompt: 'What does LVM give you that plain partitions do not?',
          options: [
            'Encryption of the volume contents without a separate LUKS layer',
            'Checksums on every block, so silent corruption is detected on read',
            'A guarantee that filesystems never fragment across physical extents',
            'Logical volumes that can be resized and snapshotted across several disks',
          ],
          correct: 3,
          explain: 'Pooling physical volumes into a group decouples a volume from one contiguous region of one disk, so growing onto another disk or snapshotting before an upgrade works online. Encryption is LUKS and per-block checksums are Btrfs or ZFS.',
        },
      ],
    },
    {
      key: 'tcp-ip',
      title: 'TCP/IP as you actually use it',
      body: `# TCP/IP as you actually use it

## The layers, briefly

Four that matter in practice. **Link** moves frames between machines on the same physical segment, addressed by 48-bit MAC addresses, with ARP mapping an IP to a MAC. **Internet** moves packets between networks, addressed by IP, with routers making one hop-by-hop decision each. **Transport** gives you TCP or UDP and, crucially, port numbers. **Application** is HTTP, DNS, SSH and everything else.

The useful takeaway is where a failure lives. Cannot reach a machine on your own LAN — link or ARP. Reach a gateway but nothing beyond — routing. Reach the host but the port refuses — transport, and the host is up. Connect but get garbage — application.

## Addresses and CIDR

An IPv4 address is 32 bits. \`/24\` means the first 24 bits are the network and the last 8 identify the host, giving 256 addresses of which 254 are usable — the all-zeros address is the network and the all-ones is broadcast.

- \`/24\` — 256 addresses, 254 hosts.
- \`/26\` — 64 addresses, 62 hosts.
- \`/16\` — 65,536 addresses, the size of a Docker bridge network by default.
- \`/32\` — exactly one address, the way a single host is written in a firewall rule.

Every step down the prefix doubles the size. Private ranges, which never appear on the public internet, are \`10.0.0.0/8\`, \`172.16.0.0/12\` and \`192.168.0.0/16\`, plus \`127.0.0.0/8\` for loopback and \`169.254.0.0/16\` for link-local, which is what an address means when DHCP failed.

IPv6 is the same ideas at 128 bits with hex groups: \`2a03:a5a0:4:1::2067\`, where \`::\` elides a run of zeros, \`fe80::/10\` is link-local and appears on every interface, and \`/64\` is the standard subnet.

## Ports and sockets

A port is a 16-bit number that lets one host run many services. Below 1024 is privileged and needs root or \`CAP_NET_BIND_SERVICE\`.

A connection is identified by a **four-tuple**: source IP, source port, destination IP, destination port. This is why one server port serves thousands of clients — each connection differs in the client side of the tuple. Outbound connections take an ephemeral source port from \`net.ipv4.ip_local_port_range\`, typically 32768-60999.

Where a listener binds is a security decision, not a formality. \`127.0.0.1:6379\` is reachable only from the machine itself; \`0.0.0.0:6379\` is reachable from every interface, which is how unauthenticated Redis instances end up on the public internet.

## TCP versus UDP

TCP opens with a three-way handshake: the client sends \`SYN\`, the server answers \`SYN-ACK\`, the client replies \`ACK\`. From there it guarantees ordered, complete delivery with sequence numbers, acknowledgements, retransmission and congestion control. Closing is a four-way exchange of \`FIN\` and \`ACK\`.

States you will actually see in \`ss\`:

- \`LISTEN\` — a server waiting.
- \`ESTABLISHED\` — the normal working state.
- \`TIME_WAIT\` — the side that closed **first** waits about 60 seconds so late packets cannot be mistaken for a new connection. Thousands of these on a busy client are normal, not a leak.
- \`CLOSE_WAIT\` — the peer closed and **your** application has not called close. This one is a bug in your code, and it accumulates until you run out of descriptors.
- \`SYN-SENT\` piling up — your SYNs are going unanswered: a firewall dropping packets, or a host that is down.

UDP has no handshake, no ordering and no retransmission: one datagram in, one out, possibly lost, possibly duplicated. That is the right trade for DNS, for video, and for QUIC, which rebuilds reliability in userspace.

## The tools

\`\`\`bash
ip -brief a               # interfaces and addresses, one line each
ip r                      # the routing table
ip neigh                  # the ARP cache
ss -ltnp                  # listening TCP sockets with owning process
ss -tn state established  # current connections
\`\`\`

\`ifconfig\`, \`route\` and \`netstat\` are the deprecated equivalents from net-tools; they are often not installed at all on a modern minimal image.

A routing table is read most-specific-prefix-first:

\`\`\`
default via 185.226.93.1 dev ens160 proto static
172.17.0.0/16 dev docker0 proto kernel scope link
185.226.93.0/24 dev ens160 proto kernel scope link src 185.226.93.104
\`\`\`

A packet to \`185.226.93.50\` matches the \`/24\` and goes straight out the link. A packet to \`8.8.8.8\` matches nothing specific and takes the default route to the gateway. \`ip route get 8.8.8.8\` asks the kernel to make the decision for you and prints the answer.

## NAT

Private addresses cannot be routed on the internet, so a home router or a cloud gateway rewrites the source address of outgoing packets to its own public one and keeps a table so replies can be translated back. This is source NAT, or masquerading, and it is exactly what Docker does for containers on \`172.17.0.0/16\`.

The consequence is asymmetry: outbound works, inbound does not, because an unsolicited packet arriving at the public address matches no entry in the translation table. Port forwarding and \`docker run -p\` are explicit destination-NAT rules that create the missing mapping.`,
      questions: [
        {
          prompt: 'A host is listed as 10.4.7.19/26. How many usable host addresses does that subnet have?',
          options: [
            '30 usable addresses out of 32 in the block',
            '62, since a /26 holds 64 addresses and two are reserved',
            '64, because every address in the block can be assigned',
            '126 usable addresses out of 128',
          ],
          correct: 1,
          explain: 'A /26 leaves 6 host bits, so 2^6 = 64 addresses, minus the network and broadcast addresses.',
        },
        {
          prompt: 'Your service shows thousands of sockets in CLOSE_WAIT. What does that indicate?',
          options: [
            'The remote end closed and your application never called close on its socket',
            'Normal churn from short-lived connections that will clear in 60 seconds',
            'The kernel is out of ephemeral ports and is recycling old ones',
            'A firewall is dropping the final ACK of each handshake',
          ],
          correct: 0,
          explain: 'CLOSE_WAIT means the FIN arrived and the local application still holds the descriptor. It is a leak in your code, unlike TIME_WAIT, which the kernel clears on its own.',
        },
        {
          prompt: 'You changed a database to bind 0.0.0.0:5432 instead of 127.0.0.1:5432. What changed?',
          options: [
            'It now accepts IPv6 clients in addition to IPv4 ones',
            'It uses the default route rather than loopback for its own outbound connections too',
            'It stops requiring authentication for connections from the local machine',
            'It listens on every interface, so anything that can route to the host can connect',
          ],
          correct: 3,
          explain: 'The bind address selects which interfaces the listener answers on. 0.0.0.0 covers all of them, so the only remaining barrier is a firewall.',
        },
        {
          prompt: 'curl to a host returns "connection refused" immediately rather than hanging. What does that tell you?',
          options: [
            'The DNS name did not resolve to any address at all',
            'A firewall is silently dropping the packets on the way in',
            'The packets reached the host and nothing was listening on that port',
            'The TLS certificate was rejected by curl before the request could be sent',
          ],
          correct: 2,
          explain: 'A refusal is a TCP RST from the host itself, so routing and the machine are fine. A dropped packet gives you a timeout instead, which is how you tell a firewall from an absent service.',
        },
        {
          prompt: 'Why can a container on 172.17.0.2 reach the internet, while nothing on the internet can reach it without -p?',
          options: [
            'Containers use UDP for outbound traffic, which needs no reverse path',
            'The bridge interface filters inbound packets at the link layer by MAC',
            'Docker assigns containers a publicly routable address only for the duration of an outbound session',
            'Source NAT maps outbound flows to the host address, and inbound packets match no entry',
          ],
          correct: 3,
          explain: 'Masquerading builds its translation table from connections started inside. An unsolicited inbound packet has no matching entry, so -p installs an explicit destination-NAT rule.',
        },
      ],
    },
    {
      key: 'dns-http-tls',
      title: 'DNS, HTTP and TLS',
      body: `# DNS, HTTP and TLS

## What resolving a name actually does

A program calls \`getaddrinfo()\`. Glibc consults \`/etc/nsswitch.conf\`, whose \`hosts:\` line lists sources in order — typically \`files\` then \`dns\`, with \`resolve\` or \`myhostname\` in between on systemd distros. So:

1. \`/etc/hosts\` is checked first, and an entry there wins outright. No TTL, no cache to flush, and it is why a stale test entry can survive an entire afternoon of debugging.
2. Then the resolver named in \`/etc/resolv.conf\`. On Debian, Ubuntu, Fedora and Arch with systemd-resolved that file is a symlink to a stub and contains \`nameserver 127.0.0.53\` — a local stub listener, not your real DNS server. The real upstreams are configured in resolved and shown by \`resolvectl status\`.
3. That resolver, if it has no cached answer, walks the hierarchy: a root server points at the TLD servers for \`.com\`, those point at the authoritative servers for the domain, and the authoritative server gives the answer. Each step is cached, for the TTL of the record.

The layered caching is what makes the "it works from my laptop" reports so common: your browser, the stub, the ISP resolver and the authoritative record can all be at different points in time.

\`\`\`bash
resolvectl query example.com        # goes through nsswitch, hosts file, and the stub cache
resolvectl statistics               # cache hit rate
dig example.com A +short            # asks 127.0.0.53 directly, IGNORING /etc/hosts
dig @1.1.1.1 example.com +trace     # bypass local config entirely, walk from the root
sudo resolvectl flush-caches
\`\`\`

That difference is the single most useful DNS debugging fact: \`dig\` speaks DNS to a server, so it never sees \`/etc/hosts\`, while your application does. When dig and the application disagree, look in \`/etc/hosts\` and \`nsswitch.conf\`.

Record types you need: \`A\` (IPv4), \`AAAA\` (IPv6), \`CNAME\` (an alias to another name, and it cannot coexist with other records at the same name), \`MX\` (mail), \`TXT\` (verification and SPF), \`NS\` (delegation).

## An HTTP request end to end

Typing \`https://example.com/api/items\` sets off, in order: resolve the name, open a TCP connection to port 443, complete a TLS handshake, send the request, read the response, and reuse or close the connection.

\`\`\`bash
curl -v https://example.com/api/items
\`\`\`

In \`curl -v\` output, \`*\` lines are curl's own commentary — the address it connected to, the TLS version and cipher, the certificate subject and issuer, the negotiated ALPN protocol. \`>\` lines are your request, \`<\` lines are the response. Reading them in order tells you exactly which stage failed, and \`--resolve example.com:443:10.0.0.5\` lets you aim at one specific backend while keeping the correct \`Host\` and certificate name.

The \`Host\` header is what allows one IP to serve many sites: the server picks the virtual host from it. Status codes group by first digit — 2xx fine, 3xx redirect, 4xx your request is wrong, 5xx the server broke — and the two most informative individually are 401 (not authenticated) versus 403 (authenticated, not allowed).

## The TLS handshake

The client sends a \`ClientHello\` listing the TLS versions and ciphers it supports, plus two extensions that matter: **SNI**, the hostname it wants, sent in the clear because the server must choose a certificate before it can encrypt anything, and **ALPN**, the application protocol it would like. The server replies with its certificate chain and key-exchange material; both sides derive session keys and everything after that is encrypted. TLS 1.3 does this in one round trip.

Validation is three separate checks, and the error messages name which one failed: the chain leads to a certificate authority in the local trust store (\`/etc/ssl/certs\` on Debian and Ubuntu, \`/etc/pki/tls/certs\` on Fedora); the certificate is inside its validity window; and the hostname you asked for is in the certificate's Subject Alternative Names. A self-signed certificate fails the first, an expired one the second, and using an IP address instead of the name usually fails the third.

\`\`\`bash
openssl s_client -connect example.com:443 -servername example.com < /dev/null
echo | openssl s_client -connect example.com:443 2>/dev/null | openssl x509 -noout -dates
\`\`\`

The most common production TLS incident is not an attack. It is expiry, and it is prevented by monitoring \`notAfter\` rather than by remembering.

## HTTP/1.1, 2 and 3 in one paragraph

HTTP/1.1 sends one request at a time per connection, so browsers open six connections per host and a slow response blocks the ones behind it. HTTP/2 keeps one TCP connection and multiplexes many streams over it with binary framing and header compression, which removes that application-level blocking — but a lost TCP segment still stalls every stream, since TCP must deliver in order. HTTP/3 answers that by moving to QUIC over UDP, where each stream is independently ordered, so packet loss affects only the stream that lost data, and it folds the TLS handshake into the transport handshake for a faster start. All three carry the same semantics: methods, headers, status codes and bodies are unchanged.`,
      questions: [
        {
          prompt: 'dig api.internal returns the production address, but your application connects somewhere else entirely. What explains the mismatch?',
          options: [
            'dig caches answers separately from the system resolver cache',
            'The application resolves through nsswitch, so an /etc/hosts entry overrides DNS',
            'dig defaults to TCP while the application uses UDP and gets a different reply',
            'The record has two A values and dig always prints the lower one',
          ],
          correct: 1,
          explain: 'dig speaks DNS directly to a nameserver and never consults /etc/hosts, while getaddrinfo follows the hosts: order in nsswitch.conf, where files comes first.',
        },
        {
          prompt: 'Why is SNI sent unencrypted in the ClientHello?',
          options: [
            'It is a legacy field kept only for compatibility with old proxies',
            'It is covered by the certificate signature and cannot be encrypted twice',
            'The server must know which hostname to serve before it can pick a certificate',
            'Encrypting it would break HTTP/2 multiplexing across virtual hosts',
          ],
          correct: 2,
          explain: 'One IP can host many sites, and the certificate is chosen from SNI. It has to travel before any session key exists, which is the gap Encrypted Client Hello aims to close.',
        },
        {
          prompt: 'A browser reports a certificate error for an internal service that worked yesterday. Which cause is most likely?',
          options: [
            'The certificate reached its notAfter date and expired',
            'The server started negotiating TLS 1.3 instead of TLS 1.2',
            'The certificate authority rotated its intermediate signing algorithm',
            'A cipher suite the browser prefers was disabled on the server',
          ],
          correct: 0,
          explain: 'Expiry is by far the most common TLS incident, because a certificate that validated fine for a year fails at a fixed timestamp with no other change. Checking notAfter is a one-command test.',
        },
        {
          prompt: 'What problem does HTTP/3 solve that HTTP/2 does not?',
          options: [
            'It compresses request headers, which HTTP/2 still sends as plain text on the wire',
            'It allows more than one request per connection',
            'Loss of one packet no longer stalls every other stream on the connection',
            'It removes the need for a certificate on the server side',
          ],
          correct: 2,
          explain: 'HTTP/2 multiplexes streams over one TCP connection, and TCP still has to deliver bytes in order, so a lost segment blocks all of them. QUIC orders each stream independently.',
        },
        {
          prompt: 'You need to test a new backend at 10.0.0.5 while keeping the correct Host header and certificate name. Which curl approach fits?',
          options: [
            'curl -H "Host: example.com" https://10.0.0.5/, which keeps validation intact',
            'curl --resolve example.com:443:10.0.0.5 https://example.com/',
            'curl -k https://10.0.0.5/ and ignore the certificate mismatch',
            'Add an /etc/hosts entry for every backend before each individual test',
          ],
          correct: 1,
          explain: '--resolve overrides only the address lookup, so SNI, the Host header and hostname validation all still use the real name. Aiming at the IP directly breaks the SAN check.',
        },
      ],
    },
    {
      key: 'ssh-firewall',
      title: 'SSH, tunnels and firewalls',
      body: `# SSH, tunnels and firewalls

## Keys, and why not passwords

An SSH keypair is a private key that never leaves your machine and a public key you copy to the server's \`~/.ssh/authorized_keys\`. Authentication is a signature challenge: the server proves nothing to you about your password, because none was sent.

That is the argument in one sentence — a password is a shared secret that travels and can be guessed, while a private key is never transmitted and cannot be brute-forced across the network. A public SSH port with password authentication enabled sees continuous automated guessing; with \`PasswordAuthentication no\` in \`/etc/ssh/sshd_config\`, those attempts cannot succeed at all no matter how many are made. Generate \`ed25519\` (short, fast, modern) unless you must interoperate with something ancient.

\`\`\`bash
ssh-keygen -t ed25519 -C "laptop"
ssh-copy-id user@host           # appends your public key, fixing modes on the way
chmod 700 ~/.ssh; chmod 600 ~/.ssh/id_ed25519
\`\`\`

The other half of the trust is \`~/.ssh/known_hosts\`: on first connection you accept the **server's** host key, and on every later one the client checks it. A loud "REMOTE HOST IDENTIFICATION HAS CHANGED" warning means the key differs from the stored one — usually a rebuilt machine or a recycled IP, but structurally identical to a man-in-the-middle, so verify rather than delete the line reflexively.

\`ssh-agent\` holds the decrypted private key in memory so a passphrase is typed once per session. **Agent forwarding** (\`-A\`) lets a remote host use your local agent to hop further — convenient, but root on that host can then use your keys for as long as you are connected. \`ProxyJump\` does the same job without exposing the agent, and is the better default.

## ~/.ssh/config

Everything you type repeatedly belongs here.

\`\`\`
Host vps
    HostName 185.226.93.104
    User xamir
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 30

Host db
    HostName 10.0.5.12
    User admin
    ProxyJump vps

Host *
    ControlMaster auto
    ControlPath ~/.ssh/cm-%r@%h:%p
    ControlPersist 10m
\`\`\`

\`ssh db\` now reaches a private host through the bastion in one command, and \`ControlMaster\` reuses a single connection for later sessions, which turns a two-second handshake into an instant one and speeds up anything that runs many small SSH commands. \`ssh -v\` prints which config blocks matched.

## Port forwarding

The three flags confuse everyone once, so anchor them to direction:

- \`-L 8080:localhost:5432 vps\` — **local** forward. A listener opens on *your* machine at 8080; connections are tunnelled to the remote side and from there to \`localhost:5432\` **as resolved on the server**. This is how you reach a database that only listens on the server's loopback.
- \`-R 9000:localhost:3000 vps\` — **remote** forward. A listener opens on the *server* at 9000 and connections come back to port 3000 on your machine. This is how you expose a local dev server to a remote box. By default the remote listener binds loopback only; \`GatewayPorts yes\` on the server changes that.
- \`-D 1080 vps\` — **dynamic**, a local SOCKS5 proxy. Applications configured to use it have their traffic emerge from the server.

Add \`-N\` to open a tunnel without a shell, and \`-f\` to push it to the background.

## Copying files

\`rsync\` transfers only differences and is the right tool for anything repeated:

\`\`\`bash
rsync -avz --delete ~/site/ vps:/var/www/site/
rsync -avzn --delete ~/site/ vps:/var/www/site/   # -n: dry run, always do this first
\`\`\`

The trailing slash on the source is load-bearing: \`~/site/\` copies the **contents** into the destination, while \`~/site\` copies the **directory itself**, creating \`/var/www/site/site/\`. \`--delete\` removes destination files missing from the source, which is why the dry run exists. \`scp\` still works for a single quick file, but it has no resume and no delta transfer, and OpenSSH now implements it over SFTP internally.

## Firewalls

Netfilter in the kernel is the enforcement point; \`nftables\` is the modern configuration layer that replaced \`iptables\`, and \`ufw\` (Debian and Ubuntu) or \`firewalld\` (Fedora and RHEL) are friendly front ends over it.

\`\`\`bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
sudo ufw allow from 10.0.0.0/8 to any port 5432 proto tcp
sudo ufw enable
sudo ufw status numbered
\`\`\`

The policy that matters is **default deny inbound**: everything is blocked unless a rule opens it, so a service that accidentally binds \`0.0.0.0\` is not automatically exposed. Allow your SSH port before enabling the firewall on a remote machine, or you will lock yourself out of it. Note also that Docker writes its own netfilter rules for published ports and can bypass ufw's chains, so a container port can be reachable while \`ufw status\` looks reassuring.

**fail2ban** is a complementary idea rather than a firewall: it tails logs, notices repeated authentication failures from one address, and inserts a temporary block rule. It cuts noise and blunts brute force, but on a key-only SSH server it protects against nothing that was going to succeed anyway. Moving SSH off port 22 is the same kind of measure — less log noise, no real security gain.`,
      questions: [
        {
          prompt: 'You need to reach a Postgres instance that listens only on the server’s loopback interface. Which command does it?',
          options: [
            'ssh -R 5432:localhost:5432 vps, then connect to localhost:5432',
            'ssh -L 5432:localhost:5432 vps, then connect to localhost:5432',
            'ssh -D 5432 vps, then point the client at the SOCKS port',
            'ssh vps -o GatewayPorts=yes, then connect to the public address',
          ],
          correct: 1,
          explain: 'A local forward opens the listener on your machine and terminates the far end on the server, where localhost means the server itself. -R goes the other direction, exposing something of yours to the server.',
        },
        {
          prompt: 'rsync -av ~/site vps:/var/www/site/ produced /var/www/site/site/. What went wrong?',
          options: [
            'The destination path needed no trailing slash, because archive mode already implies a directory transfer',
            'Archive mode recreates the source directory name at the destination',
            'The source had no trailing slash, so the directory itself was copied rather than its contents',
            'rsync always nests unless --delete removes the extra level',
          ],
          correct: 2,
          explain: 'A trailing slash on the source means "the contents of this directory". Without it, rsync copies the directory as an entry inside the destination.',
        },
        {
          prompt: 'What is the core reason key authentication beats password authentication for a public SSH port?',
          options: [
            'The private key is never transmitted, so remote guessing cannot succeed',
            'Keys are longer than passwords, so brute force takes proportionally longer',
            'Key material is stored encrypted on the server, unlike password hashes',
            'Key logins are exempt from the connection rate limiting sshd applies',
          ],
          correct: 0,
          explain: 'Authentication is a signature challenge, so no reusable secret crosses the network and there is nothing on the wire to guess. Length is a secondary benefit.',
        },
        {
          prompt: 'ssh warns that the remote host identification has changed. What is the correct first response?',
          options: [
            'Delete the known_hosts line, since the warning always follows a reinstall',
            'Retry with -o StrictHostKeyChecking=no to get on with the work',
            'Regenerate your own keypair, because your private key may be compromised',
            'Verify the new host key out of band before accepting or removing anything',
          ],
          correct: 3,
          explain: 'A rebuilt server and an interception attempt look exactly the same from the client. Confirming the fingerprint through the provider console or another channel is what distinguishes them.',
        },
        {
          prompt: 'Which statement about fail2ban is accurate?',
          options: [
            'It replaces the firewall by filtering every packet through a userspace daemon',
            'It watches logs and adds temporary blocks, which adds little on a key-only SSH server',
            'It rewrites sshd_config to disable password authentication after repeated failures',
            'It requires nftables and cannot work on hosts still using an iptables backend',
          ],
          correct: 1,
          explain: 'It reacts to log lines by inserting time-limited netfilter rules. Where password authentication is already off, the attempts it blocks could never have succeeded.',
        },
      ],
    },
    {
      key: 'troubleshooting',
      title: 'Troubleshooting a live machine',
      body: `# Troubleshooting a live machine

## A method, not a toolbox

The tools below are useless without an order to apply them in. The order is:

1. **State the symptom precisely.** "Slow" is not a symptom. "The API's p99 went from 40 ms to 3 s at 14:10, on all instances" is.
2. **Classify the resource.** Every host problem is CPU, memory, disk I/O, network, or a lock. Two commands narrow it to one, and everything after that is cheap.
3. **Ask what changed.** A deploy, a package upgrade, a certificate, a cron job, a data volume crossing a threshold. Machines rarely degrade spontaneously.
4. **Measure before you guess.** Reading a number takes ten seconds and a wrong guess costs an hour.
5. **Change one thing at a time**, and write down what you did. A restart that fixes the symptom and destroys the evidence has cost you the next occurrence.

## Load average, read correctly

\`uptime\` and \`top\` show three numbers: the 1, 5 and 15 minute averages. Compare against **core count** (\`nproc\`) — 4.0 on a four-core box is fully busy, on a sixteen-core box it is idling.

The Linux-specific catch: load counts runnable processes **and** processes in uninterruptible sleep (\`D\` state), which is disk wait. So a load of 30 with 2% CPU usage is not a CPU problem at all — it is I/O, and \`top\`'s \`%wa\` figure will confirm it. Comparing the three numbers gives you direction: 1-minute far above 15-minute means it is getting worse right now.

Read them with \`uptime\` beside \`nproc\`. In \`top\`, press \`1\` for per-core figures, \`M\` to sort by memory and \`P\` to sort by CPU; \`htop\` shows the same data already sorted and readable.

## Narrowing by resource

\`\`\`bash
vmstat 1 5            # r, b, si/so, wa — one screen for CPU, memory and I/O
free -h               # look at available, not free
df -h; df -i          # blocks and inodes
du -sh * | sort -h    # where the space actually went, one level at a time
iotop -o              # which process is doing the I/O (needs root)
ss -s                 # socket summary, including TIME_WAIT counts
\`\`\`

High \`si\`/\`so\` in vmstat is swap thrashing. A large \`b\` column with high \`wa\` is disk. High \`r\` with high user CPU is genuine compute. This one screen ends most "the server is slow" investigations.

## When you need to see inside a process

\`strace\` prints every syscall a process makes, which answers "what is it actually doing" and, more often, "which file or socket did it fail to open".

\`\`\`bash
strace -f -p 1234                        # attach, follow threads and children
strace -f -e trace=openat,connect -p 1234
strace -c -p 1234                        # syscall counts and time, then Ctrl-C
strace -f -o /tmp/trace.log ./myprog     # trace from the start, into a file
\`\`\`

\`-f\` matters, because without it a process that forks disappears from your view. Two caveats: strace slows the target considerably, so avoid it on a hot production process where \`perf\` would do; and it needs \`ptrace\` permission, which on Ubuntu means \`sudo\` unless \`kernel.yama.ptrace_scope\` is 0.

The classic wins are unglamorous. A hung process shows one syscall and no progress — usually \`read\` on a socket, meaning it is waiting on something else. A "config not found" mystery shows the exact paths it tried in the \`openat\` calls, which is nearly always somewhere you did not expect.

## Files, ports, packets

\`\`\`bash
lsof -p 1234                # everything the process has open
lsof -i :443                # who owns the port
lsof | grep deleted         # unlinked files still consuming disk
ss -ltnp                    # listening sockets with owning processes
ss -tn state established dst 10.0.0.5
sudo tcpdump -i any -nn 'port 5432 and host 10.0.0.5'
\`\`\`

Reach for \`tcpdump\` only after \`ss\` has failed to answer the question: \`ss\` tells you whether a connection exists and in what state, which is enough most of the time. \`tcpdump\` tells you what is on the wire — the retransmissions, the resets, the request that never got a reply — and \`-nn\` keeps it from stalling on reverse DNS. Write to a file with \`-w\` and open it in Wireshark for anything non-trivial.

## Logs, in the right order

\`\`\`bash
journalctl -u myapp -f
journalctl -u myapp --since "14:00" --until "14:30" --no-pager
journalctl -b -p err                 # this boot, errors and worse
journalctl -k -b | tail -50          # kernel messages
dmesg -T | tail -50                  # same ring buffer, human timestamps
\`\`\`

\`dmesg -T\` is where the kernel's own opinions live and it is consistently the fastest answer to "the process vanished" or "the disk went read-only": OOM kills, filesystem errors, I/O errors, segfaults, USB and network resets. \`-T\` matters, because raw dmesg timestamps are seconds since boot and useless for correlating with an incident.

Not everything is in the journal. \`/var/log/auth.log\` on Debian and Ubuntu (\`/var/log/secure\` on Fedora and RHEL) holds SSH and sudo events; \`/var/log/syslog\` on Debian and Ubuntu, \`/var/log/messages\` on Fedora; and application logs go wherever the application decided.

## A worked example

"Disk full" on a web server. \`df -h\` says 100%. \`du -sh /* | sort -h\` totals 40 GB on a 100 GB volume — so the space is not in any visible file. \`df -i\` shows inodes fine, ruling out the small-files case. \`lsof | grep deleted\` names a 55 GB \`access.log\` still held open by nginx: logrotate moved it, nothing sent nginx the signal to reopen, and it has been writing to an unlinked inode ever since. Restart or \`systemctl reload nginx\`, the space returns instantly, and the actual fix is the missing \`postrotate\` step.`,
      questions: [
        {
          prompt: 'A four-core server shows a load average of 30 but CPU usage is only 3%. What does that combination mean?',
          options: [
            'The load figure is stale and updates only once every five minutes',
            'Thirty processes are competing for CPU time on four available cores',
            'Many processes are blocked in uninterruptible I/O wait, which Linux counts as load',
            'A runaway process is spawning short-lived threads that exit before they are ever scheduled',
          ],
          correct: 2,
          explain: 'Linux load counts runnable processes plus those in D state, so disk or network storage stalls inflate it while the CPUs sit idle. The %wa figure in top confirms it.',
        },
        {
          prompt: 'A service hangs with no log output. Which command tells you what it is waiting on right now?',
          options: [
            'strace -f -p on its PID, to see the syscall it is blocked in',
            'journalctl -u for the unit, filtered to the last few minutes',
            'kill -QUIT to force it to write a stack trace to its log file',
            'top sorted by CPU, to check whether it is spinning instead of blocked',
          ],
          correct: 0,
          explain: 'A blocked process is sitting in one syscall, and strace names it along with the file or socket involved. The other commands cannot see inside a process that is producing no output.',
        },
        {
          prompt: 'df shows the volume full, du finds far less, and df -i shows plenty of inodes. What comes next?',
          options: [
            'Run fsck, because the block accounting has drifted from reality',
            'Clear the page cache so the kernel releases the cached blocks',
            'Extend the logical volume, since the filesystem is genuinely out of space',
            'Check lsof for deleted files a process is still holding open',
          ],
          correct: 3,
          explain: 'An unlinked file keeps its blocks until the last descriptor closes, so df counts it and du cannot see it. A rotated log that was never reopened is the usual culprit.',
        },
        {
          prompt: 'When is tcpdump the right tool rather than ss?',
          options: [
            'Whenever a connection feels slow, since ss reports no timing information whatsoever',
            'When you need to see the packets themselves, such as retransmissions or a reset',
            'When the remote host is behind NAT, which ss cannot represent',
            'When you want the process that owns a socket, which tcpdump resolves',
          ],
          correct: 1,
          explain: 'ss answers whether a connection exists and in what state, which settles most questions cheaply. Only packet capture shows what actually crossed the wire.',
        },
        {
          prompt: 'Why is dmesg -T preferred over plain dmesg during an incident?',
          options: [
            'It includes messages from userspace daemons that plain dmesg omits',
            'It keeps a persistent copy on disk that survives the next reboot',
            'It converts seconds-since-boot into wall-clock times you can correlate',
            'It filters the buffer down to warnings and errors automatically',
          ],
          correct: 2,
          explain: 'Raw ring-buffer timestamps are an offset from boot, which cannot be lined up with an incident time or with application logs without arithmetic.',
        },
      ],
    },
  ],
}
