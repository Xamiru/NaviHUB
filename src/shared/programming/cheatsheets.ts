import type { CheatEntry, CheatSheet } from './types'

// Command-line cheatsheets (/programming/cheatsheets) + the typed practice
// drill's answer bank. Pure data, checklist.ts idiom: sheet `key` strings are
// FROZEN (stored in quiz_session settings for 'cli' rounds).
//
// Practice convention: prompts ask for the command with its flags but WITHOUT
// real file/host names — `answers` lists every accepted spelling, canonical
// first. Entries without `answers` are reference-only and never drilled.

export const CHEAT_SHEETS: CheatSheet[] = [
  {
    key: 'files',
    title: 'Files & directories',
    entries: [
      {
        cmd: 'ls -la',
        desc: 'List everything in long format, hidden files included',
        answers: ['ls -la', 'ls -al', 'ls -l -a', 'ls -a -l']
      },
      {
        cmd: 'cd -',
        desc: 'Jump back to the previous working directory',
        answers: ['cd -']
      },
      {
        cmd: 'cp -r',
        desc: 'Copy a directory and everything under it',
        example: 'cp -r src/ backup/',
        answers: ['cp -r', 'cp -R', 'cp --recursive']
      },
      {
        cmd: 'mv',
        desc: 'Move or rename a file or directory (same command for both)',
        example: 'mv old-name.txt new-name.txt',
        answers: ['mv']
      },
      {
        cmd: 'rm -rf',
        desc: 'Delete a directory tree, no prompts, no mercy',
        example: 'rm -rf node_modules',
        answers: ['rm -rf', 'rm -fr']
      },
      {
        cmd: 'mkdir -p',
        desc: 'Create a directory path, parents included, no error if it exists',
        example: 'mkdir -p a/b/c',
        answers: ['mkdir -p']
      },
      {
        cmd: 'ln -s',
        desc: 'Create a symbolic link (target first, link name second)',
        example: 'ln -s /opt/tool/bin/tool ~/.local/bin/tool',
        answers: ['ln -s']
      },
      {
        cmd: 'touch',
        desc: 'Create an empty file, or bump the mtime of an existing one',
        answers: ['touch']
      },
      {
        cmd: 'stat',
        desc: 'Show file metadata: size, permissions, owner, timestamps',
        answers: ['stat']
      },
      {
        cmd: 'file',
        desc: 'Identify what a file actually is from its magic bytes, not its name',
        example: 'file better_sqlite3.node   # ELF or PE32+?',
        answers: ['file']
      },
      {
        cmd: 'realpath',
        desc: 'Resolve a path to its absolute form, symlinks unwound',
        answers: ['realpath']
      },
      {
        cmd: 'du -sh',
        desc: 'Total size of a directory, human-readable',
        example: 'du -sh ~/.cache',
        answers: ['du -sh']
      },
      {
        cmd: 'chmod +x',
        desc: 'Make a file executable',
        answers: ['chmod +x', 'chmod u+x']
      },
      {
        cmd: 'chown -R',
        desc: 'Change owner (and group) of a whole tree',
        example: 'chown -R xamir:xamir /srv/app',
        answers: ['chown -R']
      }
    ]
  },
  {
    key: 'text',
    title: 'Text processing',
    entries: [
      {
        cmd: 'grep -r',
        desc: 'Search every file under a directory for a pattern',
        example: "grep -r 'TODO' src/",
        answers: ['grep -r', 'grep -R', 'grep -rn']
      },
      {
        cmd: 'grep -i',
        desc: 'Search case-insensitively',
        answers: ['grep -i']
      },
      {
        cmd: 'grep -v',
        desc: 'Keep only the lines that do NOT match',
        example: "ps aux | grep node | grep -v grep",
        answers: ['grep -v']
      },
      {
        cmd: 'grep -E',
        desc: 'Search with extended regex (alternation, +, ? without backslashes)',
        answers: ['grep -E', 'egrep']
      },
      {
        cmd: "sed -i 's/old/new/g'",
        desc: 'Replace every occurrence of a pattern in a file, in place',
        example: "sed -i 's/localhost/0.0.0.0/g' config.ini",
        answers: ["sed -i 's/old/new/g'", 'sed -i s/old/new/g']
      },
      {
        cmd: "awk '{print $2}'",
        desc: 'Print the second whitespace-separated column of each line',
        example: "ps aux | awk '{print $2}'",
        answers: ["awk '{print $2}'", 'awk {print $2}']
      },
      {
        cmd: 'sort | uniq -c | sort -rn',
        desc: 'Count occurrences of each unique line, most frequent first',
        example: "awk '{print $1}' access.log | sort | uniq -c | sort -rn | head",
        answers: ['sort | uniq -c | sort -rn']
      },
      {
        cmd: 'sort -u',
        desc: 'Sort lines and drop duplicates in one go',
        answers: ['sort -u']
      },
      {
        cmd: 'wc -l',
        desc: 'Count lines',
        answers: ['wc -l']
      },
      {
        cmd: 'cut -d, -f1',
        desc: 'Take the first comma-separated field of each line',
        answers: ['cut -d, -f1', 'cut -d , -f 1', 'cut -d, -f 1']
      },
      {
        cmd: 'head -n 20',
        desc: 'First 20 lines',
        answers: ['head -n 20', 'head -20', 'head -n20']
      },
      {
        cmd: 'tail -n 50',
        desc: 'Last 50 lines',
        answers: ['tail -n 50', 'tail -50', 'tail -n50']
      },
      {
        cmd: 'tail -f',
        desc: 'Print a file as it grows (logs)',
        example: 'tail -f /var/log/syslog',
        answers: ['tail -f', 'tail -F']
      },
      {
        cmd: 'diff -u',
        desc: 'Compare two files as a unified diff (the patch/PR format)',
        answers: ['diff -u']
      },
      {
        cmd: "tr -d '\\r'",
        desc: 'Strip carriage returns (fix CRLF line endings from Windows)',
        example: "tr -d '\\r' < dos.txt > unix.txt",
        answers: ["tr -d '\\r'", 'tr -d \\r']
      },
      {
        cmd: 'jq .',
        desc: 'Pretty-print JSON from stdin',
        example: 'curl -s https://api.example.com/x | jq .',
        answers: ['jq .', "jq '.'"]
      }
    ]
  },
  {
    key: 'find',
    title: 'find & xargs',
    entries: [
      {
        cmd: "find . -name '*.log'",
        desc: 'Find files by name pattern, recursively from here',
        answers: ["find . -name '*.log'", 'find . -name *.log', 'find -name *.log']
      },
      {
        cmd: 'find . -type d',
        desc: 'Find directories only',
        answers: ['find . -type d', 'find -type d']
      },
      {
        cmd: 'find . -mtime -1',
        desc: 'Find files modified in the last 24 hours',
        answers: ['find . -mtime -1', 'find -mtime -1']
      },
      {
        cmd: 'find . -size +100M',
        desc: 'Find files bigger than 100 MB',
        answers: ['find . -size +100M', 'find -size +100M']
      },
      {
        cmd: "find . -name '*.tmp' -delete",
        desc: 'Find files by pattern and delete them',
        answers: ["find . -name '*.tmp' -delete", 'find . -name *.tmp -delete']
      },
      {
        cmd: 'find . -type f -exec chmod 644 {} +',
        desc: 'Run a command on every found file ({} is the filename)',
        example: 'find . -type f -exec chmod 644 {} +   # + batches, \\; runs one-by-one'
      },
      {
        cmd: 'find . -print0 | xargs -0',
        desc: 'Feed found files to another command, safe for names with spaces',
        example: 'find . -name "*.orig" -print0 | xargs -0 rm'
      },
      {
        cmd: 'xargs -n1',
        desc: 'Run the command once per input item instead of batching',
        example: 'cat urls.txt | xargs -n1 curl -O',
        answers: ['xargs -n1', 'xargs -n 1']
      },
      {
        cmd: 'which',
        desc: 'Print which executable in PATH a command resolves to',
        answers: ['which', 'command -v', 'type -p']
      }
    ]
  },
  {
    key: 'processes',
    title: 'Processes & jobs',
    entries: [
      {
        cmd: 'ps aux',
        desc: 'List every running process with owner, CPU and memory',
        answers: ['ps aux', 'ps -aux', 'ps -ef']
      },
      {
        cmd: 'pgrep -f',
        desc: 'Find PIDs whose full command line matches a pattern',
        example: 'pgrep -f electron',
        answers: ['pgrep -f', 'pgrep']
      },
      {
        cmd: 'kill -9',
        desc: 'Force-kill a process (SIGKILL — cannot be caught or ignored)',
        answers: ['kill -9', 'kill -KILL', 'kill -s KILL']
      },
      {
        cmd: 'pkill -f',
        desc: 'Kill every process whose command line matches a pattern',
        answers: ['pkill -f', 'pkill', 'killall']
      },
      {
        cmd: 'htop',
        desc: 'Live process viewer (top works everywhere, htop is nicer)',
        answers: ['htop', 'top']
      },
      {
        cmd: 'lsof -i :8080',
        desc: 'Which process is using port 8080',
        answers: ['lsof -i :8080', 'lsof -i:8080']
      },
      {
        cmd: 'ctrl-z, then bg',
        desc: 'Suspend the foreground job, then resume it in the background',
        answers: ['bg']
      },
      {
        cmd: 'fg',
        desc: 'Bring the most recent background job back to the foreground',
        answers: ['fg']
      },
      {
        cmd: 'nohup <cmd> &',
        desc: 'Run a command immune to hangups (survives closing the terminal)',
        example: 'nohup ./long-job.sh > job.log 2>&1 &'
      },
      {
        cmd: 'time',
        desc: 'Measure how long a command takes',
        example: 'time npm run build',
        answers: ['time']
      },
      {
        cmd: 'watch -n 2',
        desc: 'Re-run a command every 2 seconds, full-screen',
        example: 'watch -n 2 df -h',
        answers: ['watch -n 2', 'watch -n2']
      }
    ]
  },
  {
    key: 'system',
    title: 'System & services',
    entries: [
      {
        cmd: 'systemctl status',
        desc: 'Is this service running, and what were its last log lines',
        example: 'systemctl status jackett.service',
        answers: ['systemctl status']
      },
      {
        cmd: 'systemctl restart',
        desc: 'Restart a service',
        answers: ['systemctl restart']
      },
      {
        cmd: 'systemctl enable --now',
        desc: 'Start a service now AND at every boot, in one command',
        answers: ['systemctl enable --now']
      },
      {
        cmd: 'journalctl -u <unit> -f',
        desc: 'Follow one service’s logs as they arrive',
        example: 'journalctl -u jackett.service -f'
      },
      {
        cmd: 'journalctl -f',
        desc: 'Follow the whole system journal live',
        answers: ['journalctl -f']
      },
      {
        cmd: 'journalctl -b -p err',
        desc: 'Every error since this boot',
        answers: ['journalctl -b -p err', 'journalctl -p err -b']
      },
      {
        cmd: 'df -h',
        desc: 'Free space per mounted filesystem, human-readable',
        answers: ['df -h']
      },
      {
        cmd: 'du -sh *',
        desc: 'Size of everything in the current directory, one line each',
        answers: ['du -sh *']
      },
      {
        cmd: 'free -h',
        desc: 'Memory and swap usage',
        answers: ['free -h']
      },
      {
        cmd: 'uname -a',
        desc: 'Kernel version and architecture',
        answers: ['uname -a']
      },
      {
        cmd: 'uptime',
        desc: 'How long the machine has been up, plus load averages',
        answers: ['uptime']
      },
      {
        cmd: 'crontab -e',
        desc: 'Edit your user crontab',
        answers: ['crontab -e']
      },
      {
        cmd: 'crontab -l',
        desc: 'Show your user crontab',
        answers: ['crontab -l']
      },
      {
        cmd: 'sudo !!',
        desc: 'Re-run the previous command with sudo',
        answers: ['sudo !!']
      }
    ]
  },
  {
    key: 'network',
    title: 'Network & transfer',
    entries: [
      {
        cmd: 'curl -O',
        desc: 'Download a URL keeping its remote filename',
        answers: ['curl -O']
      },
      {
        cmd: 'curl -sL',
        desc: 'Fetch silently, following redirects (the pipe-to-things combo)',
        example: 'curl -sL https://example.com/install.sh | less',
        answers: ['curl -sL', 'curl -Ls', 'curl -s -L', 'curl -L -s']
      },
      {
        cmd: "curl -X POST -H 'Content-Type: application/json' -d '{}'",
        desc: 'POST a JSON body',
        example: "curl -X POST -H 'Content-Type: application/json' -d '{\"a\":1}' http://localhost:3000/api"
      },
      {
        cmd: 'wget -c',
        desc: 'Download with resume support (continue a partial file)',
        answers: ['wget -c']
      },
      {
        cmd: 'ssh -L 8080:localhost:80',
        desc: 'Tunnel: your local port 8080 reaches port 80 on the remote',
        example: 'ssh -L 8080:localhost:80 user@server',
        answers: ['ssh -L 8080:localhost:80', 'ssh -L']
      },
      {
        cmd: 'ssh-copy-id',
        desc: 'Install your public key on a remote host (passwordless login)',
        answers: ['ssh-copy-id']
      },
      {
        cmd: 'scp',
        desc: 'Copy a file to or from a remote host over SSH',
        example: 'scp dist/app.tar.gz user@server:/opt/',
        answers: ['scp']
      },
      {
        cmd: 'rsync -avz',
        desc: 'Mirror a directory to a remote host: archive mode, compressed, only diffs',
        example: 'rsync -avz --delete media/ user@nas:backup/media/',
        answers: ['rsync -avz', 'rsync -az', 'rsync -av']
      },
      {
        cmd: 'ping -c 4',
        desc: 'Send exactly four probes and stop',
        answers: ['ping -c 4', 'ping -c4']
      },
      {
        cmd: 'ss -ltnp',
        desc: 'Every listening TCP port and the process that owns it',
        answers: ['ss -ltnp', 'ss -tlnp', 'ss -plnt', 'netstat -tlnp']
      },
      {
        cmd: 'ip a',
        desc: 'Show network interfaces and their addresses',
        answers: ['ip a', 'ip addr', 'ip address', 'ifconfig']
      },
      {
        cmd: 'dig +short',
        desc: 'Resolve a domain to its records, answer only',
        example: 'dig +short example.com',
        answers: ['dig +short']
      },
      {
        cmd: 'python3 -m http.server',
        desc: 'Serve the current directory over HTTP (throwaway file sharing)',
        answers: ['python3 -m http.server', 'python -m http.server']
      }
    ]
  },
  {
    key: 'archives',
    title: 'Archives & compression',
    entries: [
      {
        cmd: 'tar -xzf',
        desc: 'Extract a gzipped tarball (.tar.gz / .tgz)',
        example: 'tar -xzf release.tar.gz',
        answers: ['tar -xzf', 'tar xzf', 'tar -zxf', 'tar zxf', 'tar -xvzf', 'tar xvzf']
      },
      {
        cmd: 'tar -czf',
        desc: 'Create a gzipped tarball from a directory',
        example: 'tar -czf backup.tar.gz ~/notes',
        answers: ['tar -czf', 'tar czf', 'tar -cvzf', 'tar cvzf']
      },
      {
        cmd: 'tar -tf',
        desc: 'List what is inside a tarball without extracting',
        answers: ['tar -tf', 'tar tf', 'tar -tzf', 'tar tzf']
      },
      {
        cmd: 'tar -xf',
        desc: 'Extract any tar (modern tar auto-detects gzip/xz/zstd)',
        answers: ['tar -xf', 'tar xf']
      },
      {
        cmd: 'unzip',
        desc: 'Extract a .zip',
        answers: ['unzip']
      },
      {
        cmd: 'unzip -l',
        desc: 'List a .zip’s contents without extracting',
        answers: ['unzip -l']
      },
      {
        cmd: 'zip -r',
        desc: 'Zip a directory recursively',
        example: 'zip -r bundle.zip dist/',
        answers: ['zip -r']
      },
      {
        cmd: 'gunzip',
        desc: 'Decompress a bare .gz file',
        answers: ['gunzip', 'gzip -d']
      }
    ]
  },
  {
    key: 'git',
    title: 'Git daily driver',
    entries: [
      {
        cmd: 'git status -sb',
        desc: 'Status, short form: branch line + one line per change',
        answers: ['git status -sb', 'git status -s']
      },
      {
        cmd: 'git add -p',
        desc: 'Stage interactively, hunk by hunk',
        answers: ['git add -p', 'git add --patch']
      },
      {
        cmd: 'git commit --amend --no-edit',
        desc: 'Fold what is staged into the previous commit, keep its message',
        answers: ['git commit --amend --no-edit']
      },
      {
        cmd: 'git log --oneline --graph',
        desc: 'Compact history with branch/merge structure drawn',
        answers: ['git log --oneline --graph', 'git log --graph --oneline']
      },
      {
        cmd: 'git diff --staged',
        desc: 'Diff of what is staged (what the next commit will contain)',
        answers: ['git diff --staged', 'git diff --cached']
      },
      {
        cmd: 'git switch -c',
        desc: 'Create a branch and move onto it',
        answers: ['git switch -c', 'git checkout -b']
      },
      {
        cmd: 'git restore',
        desc: 'Throw away unstaged changes to a file',
        answers: ['git restore', 'git checkout --']
      },
      {
        cmd: 'git restore --staged',
        desc: 'Unstage a file, keep the changes in the worktree',
        answers: ['git restore --staged', 'git reset HEAD']
      },
      {
        cmd: 'git stash',
        desc: 'Park all uncommitted changes and get a clean worktree',
        answers: ['git stash']
      },
      {
        cmd: 'git stash pop',
        desc: 'Re-apply the most recent stash and drop it',
        answers: ['git stash pop']
      },
      {
        cmd: 'git rebase -i HEAD~5',
        desc: 'Rewrite the last five commits (squash, reword, reorder, drop)',
        answers: ['git rebase -i HEAD~5', 'git rebase -i']
      },
      {
        cmd: 'git reflog',
        desc: 'Every position HEAD has been at — the undo log for disasters',
        answers: ['git reflog']
      },
      {
        cmd: 'git cherry-pick',
        desc: 'Apply one existing commit onto the current branch',
        answers: ['git cherry-pick']
      },
      {
        cmd: 'git fetch --prune',
        desc: 'Fetch and drop remote-tracking refs for deleted branches',
        answers: ['git fetch --prune', 'git fetch -p']
      },
      {
        cmd: 'git push --force-with-lease',
        desc: 'Force-push, but refuse if someone else pushed meanwhile',
        answers: ['git push --force-with-lease']
      },
      {
        cmd: 'git worktree add',
        desc: 'Check out a second branch of this repo into another directory',
        example: 'git worktree add ../hotfix hotfix-branch',
        answers: ['git worktree add']
      }
    ]
  },
  {
    key: 'docker',
    title: 'Docker',
    entries: [
      {
        cmd: 'docker run -it --rm',
        desc: 'Run a container interactively and delete it on exit',
        example: 'docker run -it --rm debian:bookworm bash',
        answers: ['docker run -it --rm', 'docker run --rm -it', 'docker run -ti --rm']
      },
      {
        cmd: 'docker run -d -p 8080:80',
        desc: 'Run detached, publishing host port 8080 to container port 80',
        answers: ['docker run -d -p 8080:80', 'docker run -p 8080:80 -d']
      },
      {
        cmd: 'docker run -v $PWD:/app',
        desc: 'Run with the current directory bind-mounted into the container',
        example: 'docker run -v $PWD:/app -w /app node:22 npm ci',
        answers: ['docker run -v $PWD:/app', 'docker run -v ${PWD}:/app', 'docker run -v .:/app']
      },
      {
        cmd: 'docker ps -a',
        desc: 'List all containers, stopped ones included',
        answers: ['docker ps -a', 'docker ps --all', 'docker container ls -a']
      },
      {
        cmd: 'docker images',
        desc: 'List local images',
        answers: ['docker images', 'docker image ls', 'docker images ls']
      },
      {
        cmd: 'docker exec -it <container> bash',
        desc: 'Open a shell inside a running container',
        answers: ['docker exec -it bash', 'docker exec -ti bash']
      },
      {
        cmd: 'docker logs -f',
        desc: "Follow a container's logs as they arrive",
        answers: ['docker logs -f', 'docker logs --follow']
      },
      {
        cmd: 'docker build -t name:tag .',
        desc: 'Build an image from the Dockerfile here and tag it',
        answers: ['docker build -t name:tag .', 'docker build -t name .', 'docker build .']
      },
      {
        cmd: 'docker stop',
        desc: 'Ask a container to exit (SIGTERM, then SIGKILL after the grace period)',
        answers: ['docker stop']
      },
      {
        cmd: 'docker rm -f',
        desc: 'Force-remove a container even if it is still running',
        answers: ['docker rm -f', 'docker rm --force']
      },
      {
        cmd: 'docker cp',
        desc: 'Copy a file between the host and a container',
        example: 'docker cp mycontainer:/var/log/app.log ./app.log',
        answers: ['docker cp']
      },
      {
        cmd: 'docker inspect',
        desc: 'Dump a container or image’s full JSON metadata',
        example: "docker inspect --format '{{.State.ExitCode}}' mycontainer",
        answers: ['docker inspect']
      },
      {
        cmd: 'docker compose up -d',
        desc: 'Start every service in the compose file in the background',
        answers: ['docker compose up -d', 'docker-compose up -d']
      },
      {
        cmd: 'docker compose down -v',
        desc: 'Stop the compose stack and delete its named volumes too',
        answers: ['docker compose down -v', 'docker-compose down -v']
      },
      {
        cmd: 'docker compose logs -f',
        desc: 'Follow the logs of every compose service',
        answers: ['docker compose logs -f', 'docker-compose logs -f']
      },
      {
        cmd: 'docker system prune -a',
        desc: 'Reclaim disk: delete stopped containers, unused networks and ALL unused images',
        answers: ['docker system prune -a', 'docker system prune --all']
      },
      {
        cmd: 'docker system df',
        desc: 'Show how much disk images, containers and volumes are using',
        answers: ['docker system df']
      },
      {
        cmd: 'docker image history',
        desc: 'Show an image’s layers and what each one added to its size',
        answers: ['docker image history', 'docker history']
      }
    ]
  },
  {
    key: 'tmux',
    title: 'tmux',
    entries: [
      {
        cmd: 'tmux new -s <name>',
        desc: 'Start a new named session',
        example: 'tmux new -s navihub',
        answers: ['tmux new -s', 'tmux new-session -s']
      },
      {
        cmd: 'tmux ls',
        desc: 'List running sessions',
        answers: ['tmux ls', 'tmux list-sessions']
      },
      {
        cmd: 'tmux attach -t <name>',
        desc: 'Re-attach to an existing session by name',
        answers: ['tmux attach -t', 'tmux a -t', 'tmux attach-session -t']
      },
      {
        cmd: 'tmux kill-session -t <name>',
        desc: 'Kill one session by name',
        answers: ['tmux kill-session -t']
      },
      {
        cmd: 'tmux kill-server',
        desc: 'Kill every session and the tmux server itself',
        answers: ['tmux kill-server']
      },
      {
        cmd: 'tmux new -d -s <name> <cmd>',
        desc: 'Start a detached session running a command (scripts, long jobs)',
        example: 'tmux new -d -s build "npm run build"',
        answers: ['tmux new -d -s', 'tmux new-session -d -s']
      },
      {
        cmd: 'tmux source-file ~/.tmux.conf',
        desc: 'Reload the config without restarting the server',
        answers: ['tmux source-file ~/.tmux.conf', 'tmux source ~/.tmux.conf']
      },
      // Key bindings are reference-only: they are keystrokes, not commands, so
      // they carry no `answers` and never enter the typing drill.
      { cmd: 'prefix d', desc: 'Detach from the session (default prefix is Ctrl-b)' },
      { cmd: 'prefix c', desc: 'Create a new window' },
      { cmd: 'prefix n / prefix p', desc: 'Next / previous window' },
      { cmd: 'prefix <n>', desc: 'Jump straight to window number n' },
      { cmd: 'prefix %', desc: 'Split the pane vertically (side by side)' },
      { cmd: 'prefix "', desc: 'Split the pane horizontally (top and bottom)' },
      { cmd: 'prefix arrow', desc: 'Move focus between panes' },
      { cmd: 'prefix z', desc: 'Zoom the current pane to full screen, and back' },
      { cmd: 'prefix x', desc: 'Kill the current pane' },
      { cmd: 'prefix ,', desc: 'Rename the current window' },
      { cmd: 'prefix [', desc: 'Enter copy/scroll mode (q to leave)' },
      { cmd: 'prefix ?', desc: 'List every key binding' }
    ]
  },
  {
    key: 'node',
    title: 'Node & npm',
    entries: [
      {
        cmd: 'npm ci',
        desc: 'Install exactly what the lockfile says (the CI/reproducible install)',
        answers: ['npm ci', 'npm clean-install']
      },
      {
        cmd: 'npm i -D',
        desc: 'Install a package as a dev dependency',
        answers: ['npm i -D', 'npm install -D', 'npm i --save-dev', 'npm install --save-dev']
      },
      {
        cmd: 'npm run',
        desc: 'Run a script from package.json',
        example: 'npm run typecheck',
        answers: ['npm run']
      },
      {
        cmd: 'npm outdated',
        desc: 'Show which dependencies have newer versions',
        answers: ['npm outdated']
      },
      {
        cmd: 'npm ls <pkg>',
        desc: 'Show why a package is installed and which version resolved',
        example: 'npm ls better-sqlite3',
        answers: ['npm ls']
      },
      {
        cmd: 'npm audit fix',
        desc: 'Apply the non-breaking security fixes npm audit found',
        answers: ['npm audit fix']
      },
      {
        cmd: 'npx',
        desc: 'Run a package binary without installing it globally',
        example: 'npx tsc --noEmit',
        answers: ['npx']
      },
      {
        cmd: 'npm pkg get version',
        desc: "Read a field out of package.json without opening it",
        answers: ['npm pkg get version']
      },
      {
        cmd: 'npm version patch --no-git-tag-version',
        desc: 'Bump the version in package.json without creating a git tag',
        answers: ['npm version patch --no-git-tag-version']
      },
      {
        cmd: 'node --watch',
        desc: 'Run a script and restart it whenever a file changes (no nodemon needed)',
        answers: ['node --watch']
      },
      {
        cmd: 'node --test',
        desc: "Run Node's built-in test runner",
        answers: ['node --test']
      },
      {
        cmd: 'node -e',
        desc: 'Evaluate a snippet of JavaScript straight from the shell',
        example: `node -e "console.log(process.versions.node)"`,
        answers: ['node -e']
      },
      {
        cmd: 'npm publish --dry-run',
        desc: 'Show exactly what would be published without publishing it',
        answers: ['npm publish --dry-run']
      }
    ]
  },
  {
    key: 'python',
    title: 'Python tooling',
    entries: [
      {
        cmd: 'python3 -m venv .venv',
        desc: 'Create a virtual environment in .venv',
        answers: ['python3 -m venv .venv', 'python -m venv .venv']
      },
      {
        cmd: 'source .venv/bin/activate',
        desc: 'Activate the virtual environment in this shell',
        answers: ['source .venv/bin/activate', '. .venv/bin/activate']
      },
      {
        cmd: 'pip install -e .',
        desc: 'Install the current project in editable mode',
        answers: ['pip install -e .', 'pip install --editable .', 'python -m pip install -e .']
      },
      {
        cmd: 'pip install -r requirements.txt',
        desc: 'Install every pinned dependency from a requirements file',
        answers: ['pip install -r requirements.txt']
      },
      {
        cmd: 'pip freeze > requirements.txt',
        desc: 'Write the current environment’s exact versions to a requirements file',
        answers: ['pip freeze > requirements.txt']
      },
      {
        cmd: 'pip list --outdated',
        desc: 'Show installed packages that have newer releases',
        answers: ['pip list --outdated', 'pip list -o']
      },
      {
        cmd: 'pip show <pkg>',
        desc: 'Show a package’s version, location and dependencies',
        answers: ['pip show']
      },
      {
        cmd: 'pytest -x',
        desc: 'Stop the test run at the first failure',
        answers: ['pytest -x', 'pytest --exitfirst']
      },
      {
        cmd: 'pytest -k',
        desc: 'Run only the tests whose names match an expression',
        example: 'pytest -k "parse and not slow"',
        answers: ['pytest -k']
      },
      {
        cmd: 'pytest -q',
        desc: 'Quiet output (one character per test)',
        answers: ['pytest -q', 'pytest --quiet']
      },
      {
        cmd: 'python -m pdb',
        desc: 'Run a script under the debugger',
        example: 'python -m pdb script.py',
        answers: ['python -m pdb', 'python3 -m pdb']
      },
      {
        cmd: 'python -m json.tool',
        desc: 'Pretty-print JSON from stdin with no extra tools installed',
        answers: ['python -m json.tool', 'python3 -m json.tool']
      },
      {
        cmd: 'python -m timeit',
        desc: 'Micro-benchmark a snippet from the shell',
        example: `python -m timeit "sum(range(1000))"`,
        answers: ['python -m timeit', 'python3 -m timeit']
      },
      {
        cmd: 'ruff check .',
        desc: 'Lint the project (the fast modern replacement for flake8)',
        answers: ['ruff check .', 'ruff check']
      }
    ]
  },
  {
    key: 'go',
    title: 'Go toolchain',
    entries: [
      {
        cmd: 'go run .',
        desc: 'Compile and run the package in the current directory',
        answers: ['go run .', 'go run main.go']
      },
      {
        cmd: 'go build ./...',
        desc: 'Build every package in the module (the /... wildcard)',
        answers: ['go build ./...']
      },
      {
        cmd: 'go test ./...',
        desc: 'Run every test in the module',
        answers: ['go test ./...']
      },
      {
        cmd: 'go test -run',
        desc: 'Run only the tests whose names match a regex',
        example: 'go test -run TestParse ./internal/parser',
        answers: ['go test -run']
      },
      {
        cmd: 'go test -race ./...',
        desc: 'Run the tests with the race detector on',
        answers: ['go test -race ./...', 'go test -race']
      },
      {
        cmd: 'go test -bench .',
        desc: 'Run benchmarks',
        answers: ['go test -bench .', 'go test -bench=.']
      },
      {
        cmd: 'go mod init',
        desc: 'Start a new module (creates go.mod)',
        example: 'go mod init github.com/xamir/navi-tool',
        answers: ['go mod init']
      },
      {
        cmd: 'go mod tidy',
        desc: 'Sync go.mod/go.sum with what the code actually imports',
        answers: ['go mod tidy']
      },
      {
        cmd: 'go get',
        desc: 'Add or upgrade a dependency',
        example: 'go get github.com/mattn/go-sqlite3@latest',
        answers: ['go get']
      },
      {
        cmd: 'go fmt ./...',
        desc: 'Format the whole module (gofmt is not optional in Go)',
        answers: ['go fmt ./...', 'gofmt -w .']
      },
      {
        cmd: 'go vet ./...',
        desc: 'Static checks for suspicious code (printf args, copies of locks)',
        answers: ['go vet ./...', 'go vet']
      },
      {
        cmd: 'go doc',
        desc: 'Show the docs for a package or symbol in the terminal',
        example: 'go doc strings.Builder',
        answers: ['go doc']
      },
      {
        cmd: 'go install',
        desc: 'Build and install a tool binary into $GOPATH/bin',
        example: 'go install golang.org/x/tools/cmd/goimports@latest',
        answers: ['go install']
      }
    ]
  }
]

export function cheatSheet(key: string): CheatSheet | null {
  return CHEAT_SHEETS.find((s) => s.key === key) ?? null
}

// The drill compares normalized forms: whitespace collapsed, pipes spaced
// uniformly. Case is preserved — flags are case-sensitive.
export const normalizeCmd = (s: string): string =>
  s
    .replace(/\s*\|\s*/g, ' | ')
    .replace(/\s+/g, ' ')
    .trim()

export interface CliPracticeItem {
  sheetKey: string
  sheetTitle: string
  cmd: string // canonical display form
  desc: string // the prompt
  example?: string
  answers: string[] // normalized accepted spellings, [0] shown on a miss
}

// Every drillable entry from the given sheets (null/empty = all sheets).
export function practicePool(sheetKeys: string[] | null): CliPracticeItem[] {
  const selected =
    !sheetKeys || sheetKeys.length === 0
      ? CHEAT_SHEETS
      : CHEAT_SHEETS.filter((s) => sheetKeys.includes(s.key))
  const out: CliPracticeItem[] = []
  for (const sheet of selected) {
    for (const e of sheet.entries as CheatEntry[]) {
      if (!e.answers || e.answers.length === 0) continue
      out.push({
        sheetKey: sheet.key,
        sheetTitle: sheet.title,
        cmd: e.cmd,
        desc: e.desc,
        example: e.example,
        answers: e.answers.map(normalizeCmd)
      })
    }
  }
  return out
}
