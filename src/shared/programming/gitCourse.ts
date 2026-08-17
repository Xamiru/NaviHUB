import type { ProgCourseDef } from './types'

export const GIT_COURSE: ProgCourseDef = {
  key: 'git-internals',
  title: 'Git beyond basics',
  description: 'How git actually works under the hood, and the power tools that fall out of understanding it.',
  lessons: [
    {
      key: 'object-model',
      title: 'The object model',
      body: `# The object model

Everything git stores lives in one place: \`.git/objects\`, a content-addressed database. There are four object types — **blobs**, **trees**, **commits**, and **annotated tags** — and every one of them is named by the SHA-1 hash of its own content (plus a small header). Same content, same hash, always. That single design decision explains most of git's behavior.

## The four types

- A **blob** is file content. Just the bytes — no filename, no mode, no timestamp.
- A **tree** is a directory listing: for each entry, a mode, a name, and the SHA of a blob or another tree.
- A **commit** points at exactly one tree (the full snapshot of the project root), zero or more parent commits, an author, a committer, and a message.
- An **annotated tag** points at another object (usually a commit) and adds a tagger and a message. Lightweight tags are not objects at all — they are just refs.

You can dissect any of these with \`cat-file\`:

\`\`\`bash
git cat-file -t HEAD          # commit
git cat-file -p HEAD          # tree <sha>, parent <sha>, author, message
git cat-file -p HEAD^{tree}   # the root directory listing
git cat-file -p <blob-sha>    # raw file content
\`\`\`

## Snapshots, not diffs

This is the part that rewires your mental model: **a commit is a snapshot, not a diff**. Every commit points at a complete tree describing every file in the project at that moment. When \`git show\` or \`git log -p\` displays a diff, git is computing it on the fly by comparing two snapshots.

This sounds wasteful, but content addressing makes it cheap. If a file did not change between two commits, both trees point at the *same* blob SHA — the content is stored once, ever. Unchanged subdirectories reuse the same tree object wholesale. On top of that, \`git gc\` packs objects into packfiles where similar objects are delta-compressed against each other — but that is a storage optimization, invisible to the model. Conceptually, diffs do not exist in the database.

## Why content addressing matters

Because an object's name is a hash of its content, and a commit's hash covers its tree and its parents' hashes, a single commit SHA transitively pins down the *entire history* behind it. Two repositories that report the same commit SHA provably contain identical history — that is what makes distributed git possible without a central authority, and it is why history rewriting necessarily changes SHAs (a theme that returns in the rebase lessons).

It also means objects are immutable. Git never edits an object; it only writes new ones. "Modifying" a commit with \`--amend\` actually writes a brand-new commit object and moves a ref. The old object is still in \`.git/objects\` until garbage collection reaps it — which is why so much is recoverable.

\`\`\`bash
git rev-parse HEAD            # resolve a name to a SHA
git ls-tree -r HEAD           # every blob in the current snapshot
find .git/objects -type f | head   # the loose objects on disk
\`\`\`

Hold onto one sentence: *git is a content-addressed object store, and everything else — branches, merges, rebases, the reflog — is a thin layer of pointers on top of it.*`,
      questions: [
        {
          prompt: 'What does a commit object directly point to?',
          options: [
            'A diff against its parent commit',
            'One tree (the full root snapshot) plus zero or more parent commits',
            'A list of the blobs that changed in that commit, plus its parent commit',
            'The branch it was committed on',
          ],
          correct: 1,
          explain: 'A commit references exactly one root tree — a complete snapshot — and its parents. Diffs are computed on demand by comparing snapshots, and commits know nothing about branches.',
        },
        {
          prompt: 'Two commits both contain an identical, unchanged src/util.js. How is that file stored?',
          options: [
            'As one blob object, referenced by both trees',
            'As two blobs, one per commit, delta-compressed later',
            'As a copy in the first commit and a zero-length marker in the second',
            'As a symlink object pointing at the earlier commit',
          ],
          correct: 0,
          explain: 'Content addressing means identical content hashes to the same SHA, so both trees simply reference the same blob. Storage is deduplicated by construction.',
        },
        {
          prompt: 'Which command prints the human-readable contents of the object HEAD refers to?',
          options: [
            'git show-ref --heads --tags HEAD',
            'git rev-parse HEAD',
            'git ls-files HEAD',
            'git cat-file -p HEAD',
          ],
          correct: 3,
          explain: 'cat-file -p pretty-prints any object: for a commit you see its tree, parents, author and message. rev-parse only resolves the name to a SHA.',
        },
        {
          prompt: 'Why does rewriting an old commit necessarily change the SHAs of every commit after it?',
          options: [
            'Git re-signs each descendant commit with a fresh timestamp and committer identity, and both get hashed into the new commit object',
            'Each commit hash covers its parent hashes, so a changed ancestor cascades through all descendants',
            'The branch ref stores a checksum over the whole history',
            'Packfiles must be rebuilt, which assigns new object ids',
          ],
          correct: 1,
          explain: 'A commit hash includes its parents SHAs. Change any ancestor and every descendant commit must be rewritten as a new object with a new hash.',
        },
        {
          prompt: 'What is a blob, precisely?',
          options: [
            'File content plus the path and permission bits recorded for it',
            'A compressed diff hunk stored in a packfile',
            'File content only — names and modes live in tree entries',
            'A pointer from the index to the working tree',
          ],
          correct: 2,
          explain: 'Blobs are pure content. The filename and mode are recorded by the tree entry that references the blob, which is why renames are detected heuristically rather than stored.',
        },
      ],
    },
    {
      key: 'refs-head',
      title: 'Refs, HEAD and branches',
      body: `# Refs, HEAD and branches

If objects are the database, refs are the bookmarks. A **ref** is nothing more than a file under \`.git/refs\` containing a 40-character SHA. That is the entire implementation of a branch:

\`\`\`bash
cat .git/refs/heads/main      # a single commit SHA (or see packed-refs)
git update-ref refs/heads/main <sha>   # the plumbing that moves it
\`\`\`

A **branch** is a ref under \`refs/heads/\` that git moves forward automatically when you commit. That is all. Creating a branch writes one 41-byte file; deleting it removes the file. No history is copied, nothing is duplicated — which is why branching in git is instant and why "branches are cheap" is not a slogan but a file-system fact. (Older refs get compacted into \`.git/packed-refs\`, one line each, but the model is unchanged.)

## HEAD

\`HEAD\` is a special ref answering one question: *what is checked out right now?* Normally it is a **symbolic ref** — a file containing the text \`ref: refs/heads/main\` rather than a SHA. Committing then means: write the commit object, and move whatever branch HEAD points *through*.

\`\`\`bash
git symbolic-ref HEAD         # refs/heads/main
git rev-parse HEAD            # the SHA it ultimately resolves to
\`\`\`

## Detached HEAD, demystified

Check out a raw SHA or a tag and git puts the SHA directly into \`.git/HEAD\` — no branch in between. This is **detached HEAD**, and despite the scary warning it is completely harmless and often exactly what you want: inspecting an old release, running tests at a bisect step, building from a tag.

The only real caveat: commits you make while detached move HEAD itself, and no branch follows along. Switch away and they become unreferenced — but not lost. The reflog keeps them reachable for (by default) at least 30 days, and \`git switch -c rescue-branch\` at any point pins them down. Detached HEAD is a read-mostly mode with an easy exit, not a danger zone.

## Remote-tracking refs and upstreams

\`origin/main\` is a ref too: \`refs/remotes/origin/main\`, your local, read-only record of where \`main\` pointed on the remote *the last time you fetched*. It is not live, and it is not the remote — \`git fetch\` is what updates it. \`git status\` lines like "ahead 2, behind 1" are just a comparison between your branch ref and its remote-tracking ref, computed entirely offline.

A branch can declare an **upstream** (set with \`git push -u\` or \`git branch --set-upstream-to\`), and the \`@{upstream}\` (short \`@{u}\`) syntax names it:

\`\`\`bash
git log @{u}..HEAD            # commits you have not pushed
git log HEAD..@{u}            # commits fetched but not merged
git rebase @{u}               # rebase onto whatever you last fetched
\`\`\`

## The payoff

Once you see refs as pointer files, git's "scary" operations deflate. A force-push moves a remote ref. \`reset --hard\` moves a local ref (and syncs your files to it). Deleting a branch deletes a pointer, not commits. The objects sit immutable underneath; almost everything you do all day is moving small pointers across a big content-addressed graph.`,
      questions: [
        {
          prompt: 'What is a branch, at the implementation level?',
          options: [
            'A ref file under refs/heads containing one commit SHA, moved forward on commit',
            'A linked list of the commits made on that branch',
            'A copy-on-write clone of the tree it branched from, materialized on first commit',
            'A tag object that git updates automatically',
          ],
          correct: 0,
          explain: 'A branch is a single pointer file. The commits themselves carry no branch information, which is why creating or deleting branches is instant and copies nothing.',
        },
        {
          prompt: 'What does .git/HEAD contain in the normal (attached) state?',
          options: [
            'The SHA of the latest commit',
            'The text ref: refs/heads/<branch> — a symbolic ref',
            'A list of recently checked-out branches, newest first',
            'The SHA of the current tree object',
          ],
          correct: 1,
          explain: 'Attached HEAD is a symbolic ref naming a branch. Committing moves the branch HEAD points through; only in detached mode does HEAD hold a raw SHA.',
        },
        {
          prompt: 'You made two commits in detached HEAD, then switched to main. What is true?',
          options: [
            'The commits were deleted when you switched',
            'Git refuses to switch away until you either create a branch for them, discard them explicitly, or pass --force to override the safety check',
            'The commits are unreferenced but reachable via the reflog, and a new branch can still capture them',
            'Git silently merged them into main',
          ],
          correct: 2,
          explain: 'Nothing is deleted on switch. The commits lose their last ref but stay in the object store and the HEAD reflog, so git branch rescue <sha> recovers them.',
        },
        {
          prompt: 'What does origin/main actually represent?',
          options: [
            'A live view of the branch on the server',
            'The branch your pushes go to, which git updates on every local commit',
            'A protected mirror branch that only CI can move',
            'Your local record of where main was on origin at your last fetch',
          ],
          correct: 3,
          explain: 'Remote-tracking refs are a fetch-time cache under refs/remotes. They only move when you fetch (or push), which is why ahead/behind counts can be stale.',
        },
        {
          prompt: 'Which command lists only the commits on your current branch that its upstream does not have?',
          options: [
            'git log @{u}..HEAD',
            'git log HEAD..@{u}',
            'git log --branches --not --remotes=origin/main',
            'git diff @{u}',
          ],
          correct: 0,
          explain: 'A..B means commits reachable from B but not A, so @{u}..HEAD is exactly your unpushed commits. The reverse range shows what you have fetched but not integrated.',
        },
      ],
    },
    {
      key: 'merge-vs-rebase',
      title: 'Merge vs rebase',
      body: `# Merge vs rebase

Merge and rebase solve the same problem — integrating divergent lines of history — with opposite philosophies: merge *records* the divergence, rebase *erases* it.

## Three-way merge

\`git merge topic\` finds the **merge base** (the best common ancestor of the two tips, via \`git merge-base HEAD topic\`) and compares three snapshots: base, ours, theirs. For each file, a change on only one side wins automatically; changes on both sides that overlap become conflict markers for you to resolve. The result is a **merge commit** — a normal commit with *two parents*, permanently recording that two lines of work joined here. Both original branches remain in the graph, untouched.

## Fast-forward

If the branch you are merging is a strict descendant of your tip — you have no commits it lacks — there is nothing to merge. Git just slides your ref forward: a **fast-forward**. No new commit, no new objects, pure pointer motion.

\`\`\`bash
git merge --ff-only topic     # fast-forward or fail; never a surprise merge commit
git merge --no-ff topic       # force a merge commit even when ff is possible
\`\`\`

Teams pick a side deliberately: \`--no-ff\` keeps a visible bubble per feature; \`--ff-only\` (often as \`pull.ff=only\`) keeps mainline strictly linear and makes divergence an explicit error instead of an accidental merge commit.

## Rebase mechanics

\`git rebase main\` (while on \`topic\`) does something more radical: it takes each commit on \`topic\` that is not on \`main\`, computes its change relative to its parent, and **replays** those changes one at a time on top of \`main\`'s tip, then moves the \`topic\` ref to the last replayed commit.

The crucial consequence: replaying creates **new commit objects with new SHAs**. Each replayed commit has a different parent (and often a different tree) than the original, and since the parent hash is part of the commit hash, none of the originals survive as-is. The old commits still exist, now unreferenced except by the reflog — \`git reflog\` plus \`git reset --hard ORIG_HEAD\` undoes a bad rebase. Conflicts can appear per replayed commit; resolve, \`git rebase --continue\`, or bail with \`git rebase --abort\`.

## The golden rule

**Never rebase history that others may have built on.** If commits have been pushed to a shared branch and someone based work on them, rebasing replaces those commits with different SHAs. The old and new copies now coexist, everyone downstream gets duplicate commits and gratuitous conflicts, and the shared branch needs a force-push that stomps their view. Rebasing your own unpushed work, or a personal PR branch (force-push with \`--force-with-lease\`, which refuses to overwrite refs you have not seen), is fine and normal. Rebasing \`main\` is how you make enemies.

## Choosing

- **Rebase** local work onto a fresh upstream before sharing: \`git pull --rebase\` keeps your history linear and free of noise merges like "Merge branch main into main".
- **Merge** for integrating completed, shared work into long-lived branches — the merge commit is an honest, auditable record, and it never rewrites anyone's SHAs.
- Linear history bisects and reads beautifully; merge-heavy history preserves true chronology and context. Most teams land on: rebase privately, merge publicly.`,
      questions: [
        {
          prompt: 'What three snapshots does a three-way merge compare?',
          options: [
            'HEAD, the index, and the working tree',
            'The merge base, our tip, and their tip',
            'The last three commits on the current branch',
            'Ours, theirs, and the remote-tracking ref',
          ],
          correct: 1,
          explain: 'Merge finds the common ancestor (merge base) and reconciles both tips against it — a change on one side only is taken automatically; overlapping changes conflict.',
        },
        {
          prompt: 'When does a fast-forward merge happen?',
          options: [
            'When both branches changed disjoint sets of files, so no three-way merge is needed',
            'When merge.ff is set to always in config',
            'When the merged branch strictly descends from your tip, so your ref just moves forward',
            'When the merge completes with zero conflicts',
          ],
          correct: 2,
          explain: 'Fast-forward requires your branch to have no commits of its own since the base — git moves the pointer without creating any commit. A conflict-free true merge still makes a merge commit.',
        },
        {
          prompt: 'Why do rebased commits always get new SHAs?',
          options: [
            'Git bumps the committer timestamp on every replay, and that timestamp is hashed into it',
            'Rebase re-signs commits with your current GPG key',
            'The rebase todo file is hashed into each commit',
            'Each replayed commit has a new parent, and parent hashes are part of the commit hash',
          ],
          correct: 3,
          explain: 'Rebase replays changes as brand-new commit objects atop a different parent. Since a commit hash covers its parents (and tree), identical-looking commits still hash differently.',
        },
        {
          prompt: 'Which action violates the golden rule of rebasing?',
          options: [
            'Rebasing a shared branch that teammates have based work on, then force-pushing it',
            'Rebasing your local unpushed commits onto origin/main before opening a pull request',
            'Force-pushing your own PR branch with --force-with-lease after a rebase',
            'Running git pull --rebase on your feature branch',
          ],
          correct: 0,
          explain: 'Rewriting published, built-upon history strands everyone downstream on the old SHAs. Rewriting your own private or single-author PR branches is routine.',
        },
      ],
    },
    {
      key: 'interactive-rebase',
      title: 'Interactive rebase',
      body: `# Interactive rebase

\`git rebase -i\` is git's history editor. It shows the commits about to be replayed as a **todo list** in your editor, oldest first, and replays whatever the list says — reordered, combined, reworded, or dropped.

\`\`\`bash
git rebase -i HEAD~5          # edit the last 5 commits
git rebase -i main            # edit everything on this branch since main
\`\`\`

## The verbs

- \`pick\` — replay the commit as-is (the default for every line).
- \`reword\` — replay it, but stop to edit the message.
- \`edit\` — replay it, then pause with HEAD on it so you can amend or add commits.
- \`squash\` — meld into the previous commit, then let you combine both messages.
- \`fixup\` — meld into the previous commit and *discard* this message.
- \`drop\` — delete the commit (removing the line does the same).

Reordering lines reorders commits. Everything from the first modified commit onward is rewritten with new SHAs — this is repeated rebase mechanics, so the golden rule applies: only do this to unpublished or personal-branch history.

## Autosquash: fixups without editing todo lists

The killer workflow for review feedback. You notice a bug introduced by an earlier commit on your branch; instead of a shameful "address review comments" commit:

\`\`\`bash
git add -p
git commit --fixup=abc123     # message becomes fixup! <abc123 subject>
git rebase -i --autosquash main
\`\`\`

\`--fixup\` records *which commit this amends* in the message; \`--autosquash\` then pre-arranges the todo list, moving each \`fixup!\` commit under its target with the \`fixup\` verb already set. You usually just save the todo and exit. Set \`rebase.autosquash=true\` to make it the default, and \`git commit --squash=<sha>\` is the message-keeping variant. Newer git can even skip the rebase entirely for simple cases with \`git commit --fixup\` followed by \`git rebase --autosquash\` non-interactively.

## Splitting a commit

Mark the fat commit \`edit\`. When the rebase pauses there:

\`\`\`bash
git reset HEAD^               # undo the commit, keep changes in the worktree
git add -p                    # stage the first logical piece
git commit -m 'first piece'
git add -p && git commit -m 'second piece'
git rebase --continue
\`\`\`

\`reset HEAD^\` moves HEAD back one commit without touching your files, leaving the commit's changes unstaged and ready to be re-committed in slices.

## What --amend really does

\`git commit --amend\` is the one-commit special case of all this: it builds a **new commit object** with the current index and message, whose parent is the *old commit's parent*, then moves the branch ref to it. The original commit is not modified — objects never are — it is abandoned to the reflog. That is why amending a pushed commit forces a force-push: the remote has the old SHA, you now have a sibling, not a descendant.

If a rebase goes sideways: \`git rebase --abort\` during, \`git reflog\` plus \`git reset --hard HEAD@{n}\` (or \`ORIG_HEAD\`) after. Interactive rebase feels dangerous precisely until the object model sinks in — nothing is destroyed, only re-pointed, and the reflog remembers where you were.`,
      questions: [
        {
          prompt: 'What is the difference between squash and fixup in a rebase todo?',
          options: [
            'squash keeps both commits in history; fixup deletes one',
            'Both meld into the previous commit; squash combines the messages, fixup discards one',
            'fixup melds forward into the next commit in the todo list instead of the previous one',
            'squash requires --autosquash; fixup works everywhere',
          ],
          correct: 1,
          explain: 'Both verbs combine a commit into the one above it in the todo; the only difference is whether its message survives into the combined commit.',
        },
        {
          prompt: 'What does git commit --fixup=abc123 do?',
          options: [
            'Immediately melds the staged changes into commit abc123 and rewrites every descendant commit after it with a new SHA',
            'Reverts abc123 and stages the inverse changes',
            'Creates a normal commit whose fixup! message lets a later --autosquash rebase fold it into abc123',
            'Amends abc123 in place if it is unpushed',
          ],
          correct: 2,
          explain: 'The fixup commit is an ordinary commit with a magic message; nothing is rewritten until git rebase -i --autosquash reorders and folds it automatically.',
        },
        {
          prompt: 'While splitting a commit at an edit pause, why run git reset HEAD^?',
          options: [
            'To discard the commit\'s changes and start over',
            'To move the commit onto the previous branch',
            'To detach HEAD entirely, so the new commits you make afterward never move the current branch ref along at all',
            'To un-commit while keeping its changes in the working tree, ready to re-stage in pieces',
          ],
          correct: 3,
          explain: 'A mixed reset to the parent removes the commit but leaves its changes as unstaged edits, so git add -p can carve them into multiple smaller commits.',
        },
        {
          prompt: 'What does git commit --amend actually create?',
          options: [
            'A new commit whose parent is the old commit\'s parent, with the branch ref moved to it',
            'An in-place edit of the existing commit object',
            'A child commit of the old one containing only the delta you just staged on top',
            'A fixup! commit scheduled for the next rebase',
          ],
          correct: 0,
          explain: 'Objects are immutable, so amend writes a sibling commit and re-points the branch. The old commit survives only in the reflog, and a pushed ancestor now requires a force-push.',
        },
        {
          prompt: 'Halfway through an interactive rebase you realize the plan was wrong. Cleanest exit?',
          options: [
            'git reset --hard origin/main',
            'git rebase --abort',
            'git rebase --skip until it finishes',
            'Delete .git/rebase-merge and switch branches',
          ],
          correct: 1,
          explain: 'rebase --abort restores the branch exactly as it was before the rebase started. Even after finishing, ORIG_HEAD and the reflog let you reset back.',
        },
      ],
    },
    {
      key: 'reset-reflog',
      title: 'Reset, restore and the reflog',
      body: `# Reset, restore and the reflog

\`git reset\` stops being confusing the moment you name the **three trees** it manipulates:

- **HEAD** — the snapshot of the current commit.
- **The index** (staging area) — the snapshot the *next* commit will have.
- **The working tree** — your actual files.

A normal, clean state has all three identical. \`git status\` is nothing but two diffs: HEAD vs index ("changes to be committed") and index vs worktree ("changes not staged").

## The three resets

\`git reset [mode] <commit>\` moves the current branch ref to \`<commit>\`, then stops at a different point depending on the mode:

- \`--soft\` — move the ref. Index and worktree untouched, so everything that differed is now "staged". Perfect for re-doing the last few commits as one: \`git reset --soft HEAD~3 && git commit\`.
- \`--mixed\` (the default) — move the ref *and* reset the index to match. Your files are untouched but nothing is staged. This is the "un-commit but keep my work" reset, and \`git reset\` with no commit argument is the classic unstage-everything.
- \`--hard\` — move the ref, reset the index, *and* overwrite the working tree. The only mode that touches your files. Uncommitted changes it overwrites are genuinely gone (they were never objects); committed work merely becomes unreferenced, which the reflog fixes.

## restore and switch: checkout, split sanely

Old \`git checkout\` overloaded two unrelated jobs, so modern git split it:

\`\`\`bash
git switch topic              # move HEAD between branches
git switch -c new-branch      # create and switch
git switch --detach v2.1.0    # explicit detached HEAD

git restore file.txt                  # worktree file back to index version
git restore --staged file.txt         # unstage (index back to HEAD)
git restore --source=HEAD~2 file.txt  # grab an old version of one file
\`\`\`

\`restore\` never moves branches; \`switch\` never touches individual files. Muscle-memory \`checkout\` still works, but the split commands make the destructive cases much harder to hit by accident.

## The reflog: git's undo history

Every time HEAD or a branch ref moves — commit, reset, rebase, merge, switch — git appends the old and new SHAs to a local, per-repo log. \`git reflog\` shows it for HEAD; \`git reflog show main\` for a branch. Entries live ~90 days (30 for unreachable ones) before \`gc\` expiry, and the log is purely local — never pushed, never fetched.

\`\`\`bash
git reflog
# a1b2c3d HEAD@{0}: reset: moving to HEAD~3
# f4e5d6c HEAD@{1}: commit: the work you just vaporized
git reset --hard HEAD@{1}     # and it is back
\`\`\`

This is why almost nothing committed is ever lost. Botched \`reset --hard\`? Reflog. Rebase mangled the branch? \`git reset --hard ORIG_HEAD\` (a ref git sets before drastic moves) or the reflog. Deleted a branch? \`git reflog\` still shows its tip; \`git branch rescue <sha>\` resurrects it. Even fully unreferenced commits can be found with \`git fsck --lost-found\`.

The honest danger list is short: uncommitted changes clobbered by \`reset --hard\`, \`restore\`, or \`checkout --\` — content that never became an object has no reflog to save it. The practical rule follows directly: **commit or stash early and often; anything that has ever been committed is recoverable for weeks.**`,
      questions: [
        {
          prompt: 'After git reset --soft HEAD~3, what state are you in?',
          options: [
            'The last three commits and all of their changes are gone from your files entirely',
            'The branch moved back three commits; all their changes sit staged in the index',
            'HEAD is detached at HEAD~3 with a clean worktree',
            'The three commits are squashed into one automatically',
          ],
          correct: 1,
          explain: 'Soft reset only moves the ref. Index and worktree still hold the newer content, so it shows as staged changes — one git commit away from a squash.',
        },
        {
          prompt: 'Which reset mode is the only one that overwrites your working tree files?',
          options: [
            '--hard',
            '--mixed',
            '--soft',
            '--keep is the only destructive mode',
          ],
          correct: 0,
          explain: 'Soft touches only the ref, mixed also resets the index, and only hard forces the worktree to match — which is why it is the one to pause before running.',
        },
        {
          prompt: 'What is the modern command to unstage a file without changing its contents?',
          options: [
            'git switch --staged file.txt',
            'git reset --hard file.txt',
            'git restore --staged file.txt',
            'git rm --cached file.txt',
          ],
          correct: 2,
          explain: 'restore --staged copies the HEAD version into the index only, leaving the worktree alone. rm --cached would remove the file from tracking entirely.',
        },
        {
          prompt: 'You ran git reset --hard HEAD~5 on the wrong branch. Best recovery?',
          options: [
            'git pull to restore the commits from the remote',
            'git fsck --full and then cherry-pick whatever turns up in the lost-found report',
            'The commits are permanently gone after a hard reset',
            'git reflog to find the pre-reset tip, then git reset --hard HEAD@{1}',
          ],
          correct: 3,
          explain: 'The reflog recorded the ref movement, so the old tip is one reset away. fsck is the last resort and the remote may not have the commits at all.',
        },
        {
          prompt: 'Which loss can the reflog NOT undo?',
          options: [
            'A branch deleted with git branch -D',
            'Uncommitted working-tree changes clobbered by git reset --hard',
            'Commits abandoned by a bad interactive rebase you ran this morning',
            'A commit orphaned by git commit --amend',
          ],
          correct: 1,
          explain: 'The reflog tracks ref movements between commits. Content that was never committed produced no objects, so there is nothing for it to point back to.',
        },
      ],
    },
    {
      key: 'bisect-blame',
      title: 'Bisect, blame and the pickaxe',
      body: `# Bisect, blame and the pickaxe

History is only useful if you can interrogate it. These four tools answer the recurring questions: *when did this break*, *where did this line come from*, and *what happened to this code*.

## git bisect: binary-search the breakage

You know the bug exists now and did not exist at v2.0. Between them lie 600 commits — but binary search needs only ~10 probes:

\`\`\`bash
git bisect start
git bisect bad                # current commit is broken
git bisect good v2.0          # this one was fine
# git checks out the midpoint (detached HEAD); you test, then:
git bisect good   # or: git bisect bad, or: git bisect skip
# ...repeat until:
# a1b2c3d is the first bad commit
git bisect reset              # back to where you started
\`\`\`

Each verdict halves the range. \`skip\` handles commits that will not build. Note that bisect runs in detached HEAD on purpose — it is the canonical harmless use of it.

## bisect run: fully automatic

If the test is scriptable, stop answering by hand:

\`\`\`bash
git bisect start HEAD v2.0
git bisect run npm test
git bisect run ./repro.sh
\`\`\`

The exit-code contract: **0 means good, 1-124 or 126-127 mean bad, 125 means skip** (untestable — for example the build fails), and 128+ aborts the bisect. \`repro.sh\` can be three lines that build and grep for the symptom; git then finds the culprit among hundreds of commits while you get coffee. This alone justifies keeping commits small and always-buildable.

## git blame, without the noise

\`git blame file.c\` annotates each line with the commit that last touched it — but naive blame constantly fingers reformatting and refactoring commits instead of authors of the logic. Two flags fix most of it:

\`\`\`bash
git blame -w -C file.c
git blame -w -C -C -C -L 120,160 file.c
\`\`\`

- \`-w\` ignores whitespace-only changes (indentation sweeps stop owning every line).
- \`-C\` detects lines *copied or moved* from other files and blames the true origin; each extra \`-C\` (up to three) searches harder, into the commits that created and modified other files.
- \`-L start,end\` limits blame to a line range, which is also dramatically faster on big files.

There is also \`git config blame.ignoreRevsFile .git-blame-ignore-revs\` — list your repo's mass-reformat commits there and blame skips them permanently.

## The pickaxe: search history by content

\`git log -S\` and \`-G\` search *diffs*, not messages — the tool for "who added or deleted this string, ever":

\`\`\`bash
git log -S disableCache --oneline            # commits changing the COUNT of this string
git log -S 'validateToken(' -p               # show those diffs too
git log -G 'retries\\s*=\\s*[0-9]+'            # regex match on changed lines
\`\`\`

The difference is subtle but useful: \`-S\` fires only when the number of occurrences changes (added or removed — great for "where did this function go"), while \`-G\` fires on any changed line matching the regex, including pure moves and edits.

## Following a file through renames

\`git log file.c\` stops at the commit where the file got its current name. \`git log --follow file.c\` continues through renames by similarity detection. It only works for a single file, and pairs well with \`--patch\` to watch the file evolve backward. For line-level ancestry, \`git log -L 10,40:file.c\` traces a line range through history — blame's more narrative cousin.`,
      questions: [
        {
          prompt: 'In git bisect run, what does an exit code of 125 from the script mean?',
          options: [
            'The current commit is bad',
            'This commit cannot be tested — skip it',
            'Abort the whole bisect session immediately, discarding every verdict recorded so far',
            'The current commit is good',
          ],
          correct: 1,
          explain: 'The contract is 0 = good, 1-124/126-127 = bad, 125 = skip (for example the build fails), 128+ = abort. Scripts often exit 125 when compilation fails.',
        },
        {
          prompt: 'Roughly how many test steps does bisect need for a 600-commit range?',
          options: [
            'About 10, since each step halves the range',
            'About 600, one per commit',
            'About 300, half on average',
            'About 25, since bisect must also test one commit at every merge point along the range',
          ],
          correct: 0,
          explain: 'Binary search is logarithmic: log2(600) is about 9.2, so roughly ten verdicts pinpoint the first bad commit.',
        },
        {
          prompt: 'Why add -w -C to git blame?',
          options: [
            'To blame the working tree instead of HEAD, so uncommitted edits are attributed rather than skipped',
            'To include commits from all branches',
            'To skip whitespace-only commits and trace lines moved or copied from elsewhere to their true origin',
            'To colorize the output by commit age',
          ],
          correct: 2,
          explain: '-w ignores whitespace-only changes and -C follows copied or moved code, so blame lands on the commit that wrote the logic instead of a reformat or refactor.',
        },
        {
          prompt: 'What is the key difference between git log -S and -G?',
          options: [
            '-S searches commit messages while -G searches the diff text of every commit it walks',
            '-S is case-insensitive; -G is case-sensitive',
            '-G follows renames; -S does not',
            '-S fires only when the string\'s occurrence count changes; -G matches any changed line',
          ],
          correct: 3,
          explain: '-S (the pickaxe) detects additions and removals of a string, ignoring pure moves; -G is a regex over every changed line, so it also catches edits and relocations.',
        },
      ],
    },
    {
      key: 'stash-worktrees-hooks',
      title: 'Stash, worktrees and hooks',
      body: `# Stash, worktrees and hooks

## Stash is just commits

\`git stash\` feels like a magic clipboard, but it is ordinary object-model machinery: each stash is a **merge commit** whose parents are HEAD and a commit holding your staged index (a third parent appears with \`--include-untracked\`). The stashes hang off one ref, \`refs/stash\`, and the "stack" is nothing but that ref's reflog — which is why entries are named \`stash@{0}\`, \`stash@{1}\` in reflog syntax, and why \`git stash list\` is really \`git log -g refs/stash\`. You can \`git show stash@{1}\` or even \`git checkout -b fix stash@{0}\` like any commit.

\`\`\`bash
git stash push -m 'wip: half-refactored parser'
git stash push -p             # interactively pick hunks to stash
git stash push -- src/one.ts  # stash only these paths
git stash pop                 # apply + drop if clean
git stash apply stash@{2}     # apply, keep the entry
git stash branch fix stash@{0}  # replay onto a new branch from where it was made
\`\`\`

\`push -p\` is the underrated one: stash *only* the debug noise, keep the real change. Prefer \`apply\` over \`pop\` when conflicts are possible — \`pop\` only drops the entry on clean application, and a conflicted pop leaves confusing half-state. A dropped stash prints its SHA; being a commit, it is recoverable until gc.

## Worktrees: many checkouts, one repo

\`git worktree\` gives one repository multiple simultaneous working directories, each on its own branch, all sharing \`.git/objects\` — no re-clone, no duplicated history, near-zero disk cost:

\`\`\`bash
git worktree add ../app-review origin/main    # detached, for reviewing
git worktree add ../app-hotfix -b hotfix-1.2 v1.2
git worktree list
git worktree remove ../app-hotfix
\`\`\`

Uses that come up constantly: run the test suite on another branch while you keep editing; hold a long-lived build directory for the release branch; review a PR in a real checkout without stashing your work. Worktrees are also the natural fit for **AI-agent workflows** — give each coding agent its own worktree and branch, and several can run in parallel against one repo without trampling each other's files, merging back through normal branches. One rule: a branch can only be checked out in one worktree at a time (git enforces it, since two worktrees moving one ref would corrupt each other's state).

## Hooks: scripts at the choke points

Hooks are executables git runs at lifecycle moments. Local ones live in \`.git/hooks\` (activate a sample by dropping the \`.sample\` suffix and making it executable). The high-value ones:

- \`pre-commit\` — runs before the commit message editor; nonzero exit aborts the commit. Lint, format checks, forbid stray debug code. Bypass consciously with \`git commit --no-verify\`.
- \`commit-msg\` — receives the message file path as \`$1\`; validate or rewrite it. This is where Conventional Commits or ticket-id policies get enforced.
- Also worth knowing: \`pre-push\` (last local gate before publishing) and \`post-checkout\`/\`post-merge\` (auto-install dependencies after switching).

\`.git/hooks\` is not versioned — a fresh clone has no hooks. The modern fix is a tracked directory plus one config line:

\`\`\`bash
git config core.hooksPath .githooks
\`\`\`

Commit \`.githooks/\` and every configured clone runs the same checks (each developer still opts in with that one command — hooks are deliberately not auto-installed for fresh clones, because cloning must never execute repository-controlled code). Frameworks like husky or pre-commit are wrappers around exactly this mechanism.`,
      questions: [
        {
          prompt: 'What is a stash entry, at the object level?',
          options: [
            'A patch file stored under .git/stash, replayed with git apply when you pop it',
            'A merge commit (parents: HEAD and an index commit) hanging off the refs/stash reflog',
            'A hidden branch named stash/<n>',
            'A tag pointing at the pre-stash worktree state',
          ],
          correct: 1,
          explain: 'Stashes are ordinary commits — the entry commit merges HEAD with a commit of your staged index — and the stack is just the reflog of refs/stash, hence stash@{0}.',
        },
        {
          prompt: 'You want to stash only your debug print statements and keep the real change in the worktree. Which command?',
          options: [
            'git stash push --keep-index',
            'git stash push --keep-index --include-untracked -q',
            'git stash push -p and select just the debug hunks',
            'git stash pop -p',
          ],
          correct: 2,
          explain: 'push -p walks the hunks interactively like add -p, so you stash exactly the hunks you pick. --keep-index stashes everything while leaving staged copies behind.',
        },
        {
          prompt: 'Why do git worktrees cost almost no extra disk space?',
          options: [
            'Each worktree holds only the files that differ from main',
            'Worktrees use filesystem snapshots when available',
            'Files in extra worktrees are hardlinks into the first one, so edits are copy-on-write',
            'All worktrees share the one .git object database; only the checked-out files are duplicated',
          ],
          correct: 3,
          explain: 'A linked worktree has its own working files and its own HEAD/index, but history and objects live once in the shared repository — unlike a second clone.',
        },
        {
          prompt: 'Why can the same branch not be checked out in two worktrees at once?',
          options: [
            'Both worktrees would move the same ref as you commit, corrupting each other\'s state, so git forbids it',
            'The index file format only supports one checkout per branch at a time, so the second worktree would silently overwrite the first one\'s index on disk',
            'It would double-count commits in git log',
            'It is allowed, but only with --force on both sides',
          ],
          correct: 0,
          explain: 'Each worktree\'s commits advance the checked-out branch ref. Two worktrees sharing one ref would silently invalidate each other, so git enforces one-checkout-per-branch.',
        },
        {
          prompt: 'How do you make a hooks directory that is versioned and shared with the team?',
          options: [
            'Commit .git/hooks directly to the repository — it is tracked and versioned like any other project directory',
            'Commit a .githooks directory and set core.hooksPath to it',
            'Add hooks = .githooks to .gitattributes',
            'Push hooks to the remote with git push --hooks',
          ],
          correct: 1,
          explain: '.git/hooks is never versioned or transferred. core.hooksPath points git at a tracked directory instead; each clone opts in with one config command, since repos must not auto-run code on clone.',
        },
      ],
    },
  ],
}
