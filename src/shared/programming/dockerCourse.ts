import type { ProgCourseDef } from './types'

export const DOCKER_COURSE: ProgCourseDef = {
  key: 'docker',
  title: 'Docker from the ground up',
  description: 'Containers as they actually work — kernel primitives, images, builds, data, networks and Compose — so you stop cargo-culting flags.',
  lessons: [
    {
      key: 'images-containers',
      title: 'Images, containers, registries',
      body: `# What a container actually is

Strip away the tooling and a container is an ordinary Linux process. \`docker run\` does not boot anything: it asks the kernel to start your process inside a set of **namespaces** (pid, net, mnt, uts, ipc, user — each giving the process its own private view of process IDs, network interfaces, mount table, hostname and so on), constrained by **cgroups** (CPU, memory, IO limits), with its root filesystem assembled by an overlay filesystem from the image's read-only layers plus one fresh writable layer on top. There is no guest kernel and no hypervisor. Run \`ps aux\` on the host and the container's processes are right there, just with different apparent PIDs inside. That is why containers start in milliseconds, why every container shares the host kernel version, and why Docker on macOS and Windows quietly runs a Linux VM to host them — the isolation primitives are Linux kernel features. A container is closer to a chroot with resource limits and its own network stack than to a virtual machine.

## Images vs containers

An **image** is an immutable artifact: an ordered stack of read-only filesystem layers plus a JSON config (default command, environment, working directory, exposed ports). A **container** is an instance: those image layers, one writable layer, and runtime state. Start five containers from \`postgres:16\` and the read-only layers exist on disk exactly once; each container adds only its thin writable layer. Deleting a container deletes that writable layer — the image is untouched, and a fresh \`docker run\` starts clean again.

## Registries, tags, digests

A **registry** is where images live. \`docker pull electronuserland/builder:wine\` is shorthand for \`docker.io/electronuserland/builder:wine\` — registry host, namespace, repository, tag. \`docker push\` uploads only the layers the registry does not already have; layers are content-addressed, so a shared base uploads once ever.

A tag is a *mutable pointer*: \`node:20\` names whatever the maintainers last pushed there and can point at different bytes tomorrow. A **digest** (\`node@sha256:...\`) is the immutable content address of one specific image manifest — same digest, same bytes, forever.

\`\`\`bash
docker pull node:20
docker images --digests node
docker pull node@sha256:8d0f16fe841577f9317ab49011c6d819e1fa81f8d4af7ece7ae0ac815e07ac84
\`\`\`

Pin digests where reproducibility matters (CI base images); use tags for convenience and accept the drift.

## run is create plus start

\`docker run\` is a composition: \`docker create\` allocates the container — writable layer, config, a network endpoint, nothing running yet — then \`docker start\` launches the process, and unless you passed \`-d\` your terminal attaches to its output. Knowing the seam is occasionally useful: \`docker create\` followed by \`docker cp\` injects files before first start, and a stopped container you \`docker start\` again reuses the same writable layer rather than beginning fresh.

\`\`\`bash
docker create --name web nginx:1.27
docker cp ./site.conf web:/etc/nginx/conf.d/default.conf
docker start -a web
\`\`\`

Hold onto one sentence: *an image is a frozen filesystem recipe; a container is one kernel-isolated process tree running on top of it.*`,
      questions: [
        {
          prompt: 'A container differs from a virtual machine primarily because...',
          options: [
            'It boots a stripped-down guest kernel optimized for a single process',
            'It is a host process isolated by namespaces and cgroups, sharing the host kernel',
            'It emulates hardware in software instead of using a hypervisor',
            'It can only run statically linked binaries',
          ],
          correct: 1,
          explain: 'There is no guest kernel at all — namespaces give the process a private view, cgroups limit its resources, and the host kernel runs it like any other process.',
        },
        {
          prompt: 'What is destroyed when you docker rm a stopped container?',
          options: [
            'Its writable layer and runtime metadata; the image is untouched',
            'The image layers it was created from',
            'Nothing, until docker system prune runs',
            'The image tag, but the layers survive',
          ],
          correct: 0,
          explain: 'Containers add only a thin writable layer on top of shared read-only image layers. Removing the container deletes that layer and its config — the image remains.',
        },
        {
          prompt: 'Why pull an image by digest instead of by tag?',
          options: [
            'Digests download faster because they skip manifest resolution',
            'Registries delete tags after a retention period',
            'Digests include a cryptographic signature from the publisher',
            'A tag can be repointed to different content over time; a digest names one immutable image',
          ],
          correct: 3,
          explain: 'Tags are mutable pointers, so node:20 can silently change. A digest is the content address of a specific manifest and always resolves to the same bytes.',
        },
        {
          prompt: 'Which operations does docker run compose?',
          options: [
            'build, create, start',
            'pull, exec, attach',
            'create, start, and (unless -d) attach',
            'start and commit',
          ],
          correct: 2,
          explain: 'run is create + start with an attach by default. Splitting them manually lets you docker cp files into a created-but-not-started container.',
        },
      ],
    },
    {
      key: 'lifecycle',
      title: 'The container lifecycle',
      body: `# Lifecycle: from run to rm

The handful of run flags that carry most day-to-day work:

\`\`\`bash
docker run -d --name pg -e POSTGRES_PASSWORD=dev postgres:16
docker run -it --rm alpine:3.20 sh
\`\`\`

- \`-d\` detaches: the container runs in the background and \`run\` prints its id.
- \`-i\` keeps STDIN open and \`-t\` allocates a pseudo-TTY; together \`-it\` is what makes an interactive shell actually usable.
- \`--rm\` deletes the container (and its anonymous volumes) when it exits — the right default for throwaway runs. Without it, exited containers accumulate.
- \`--name\` gives a stable handle for exec/logs/stop; otherwise you get a random generated name.
- \`-e KEY=value\` sets environment; \`-e KEY\` alone forwards the variable from your shell.

\`docker ps\` lists only running containers; \`docker ps -a\` includes exited ones along with their exit codes — the first stop when a container "did nothing".

## stop vs kill

\`docker stop\` sends SIGTERM to PID 1, waits a grace period (default 10 seconds, \`-t 30\` to extend), then sends SIGKILL. \`docker kill\` skips the grace and SIGKILLs immediately (\`--signal HUP\` to send something else — handy for nginx reloads). The catch: only PID 1 receives the signal, and if PID 1 is a shell wrapping your app — the shell-form CMD trap from the next lesson — your app never sees the SIGTERM and every stop becomes a hard kill after ten silent seconds. \`docker run --init\` inserts a tiny init as PID 1 that forwards signals and reaps zombies.

A stopped container is not gone. \`docker start pg\` boots the same container again — same writable layer, same config. \`docker restart\` is stop then start. \`docker rm\` deletes it for real (\`-f\` to kill-and-remove in one step).

## Getting inside, getting data out

\`\`\`bash
docker exec -it pg psql -U postgres
docker exec -it web sh
docker logs -f --tail 100 web
docker cp web:/etc/nginx/nginx.conf ./nginx.conf
\`\`\`

\`exec\` starts a *new* process inside the container's existing namespaces — you are not "logging in" to anything, and when PID 1 exits your exec'd shell dies with the container. \`logs\` replays whatever the main process wrote to stdout and stderr, as captured by the logging driver — which is exactly why containerized apps should log to stdout instead of files. \`-f\` follows, \`--since 10m\` trims the backlog. \`cp\` copies both directions and works on *stopped* containers, which makes it the tool for post-mortem file extraction.

## inspect

\`docker inspect\` dumps the complete JSON state of a container, image, volume or network. With \`--format\` and a Go template you pull out a single field, script-friendly:

\`\`\`bash
docker inspect --format '{{.State.ExitCode}}' web
docker inspect --format '{{.State.OOMKilled}}' web
docker inspect --format '{{.Config.Env}}' pg
docker inspect --format '{{.NetworkSettings.IPAddress}}' pg
\`\`\`

That first pair is the exact incantation for "why did my container die", and it returns in the final lesson.`,
      questions: [
        {
          prompt: 'What does docker stop actually do?',
          options: [
            'Sends SIGKILL immediately',
            'Freezes the container cgroup until docker start',
            'Sends SIGTERM to PID 1, waits a grace period (default 10s), then SIGKILL',
            'Sends SIGHUP and detaches the logging driver',
          ],
          correct: 2,
          explain: 'stop gives the process a chance to shut down cleanly; only after the grace period does it hard-kill. kill is the one that goes straight to SIGKILL.',
        },
        {
          prompt: 'What does the -it flag pair do?',
          options: [
            'Keeps STDIN open and allocates a pseudo-TTY, making an interactive shell usable',
            'Runs the container in isolated-tmpfs mode',
            'Ignores the image CMD and starts /bin/sh instead',
            'Attaches your terminal to an already-running container',
          ],
          correct: 0,
          explain: '-i holds STDIN open and -t gives the process a terminal. Without both, a shell either exits instantly or behaves like a broken pipe.',
        },
        {
          prompt: 'What does docker exec -it web sh actually start?',
          options: [
            'A reconnection of your terminal to PID 1',
            'A second container from the same image',
            'An SSH session to the container',
            'A new process inside the running container\'s existing namespaces',
          ],
          correct: 3,
          explain: 'exec injects a fresh process into the same pid/net/mnt namespaces. It is not a login and it dies when the container does.',
        },
        {
          prompt: 'What does --rm change about a run?',
          options: [
            'The image is removed after the container exits',
            'The container (plus its anonymous volumes) is removed automatically when it exits',
            'The container restarts automatically on failure',
            'The container is hidden from docker ps -a while running',
          ],
          correct: 1,
          explain: 'Without --rm every exited container lingers in docker ps -a, along with any anonymous volumes the image declared.',
        },
      ],
    },
    {
      key: 'dockerfiles',
      title: 'Dockerfiles, layers, and the cache',
      body: `# Dockerfiles, layers, and the cache

A representative Node build, in the order the cache wants:

\`\`\`dockerfile
FROM node:20.14-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production
ARG APP_VERSION=dev
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

- \`FROM\` picks the base image; \`WORKDIR\` sets (and creates) the working directory for everything after it.
- \`ENV\` persists into the running container; \`ARG\` exists only at build time (\`docker build --build-arg APP_VERSION=1.2\`) and vanishes from the runtime environment.
- \`RUN\` executes a command at build time and snapshots its filesystem changes as a layer; \`COPY\` brings files in from the build context.
- \`EXPOSE\` is pure documentation — it publishes nothing (the networking lesson covers what actually does).

## CMD vs ENTRYPOINT

ENTRYPOINT is the executable, CMD is the default arguments. \`docker run img\` runs ENTRYPOINT + CMD; \`docker run img --verbose\` *replaces* CMD but *appends* to ENTRYPOINT. With no ENTRYPOINT, CMD is the whole command and any run arguments replace it entirely. The clean pattern for a tool image: \`ENTRYPOINT ["mytool"]\` with \`CMD ["--help"]\`.

Both come in two forms. Exec form — \`CMD ["node", "server.js"]\` — executes the binary directly. Shell form — \`CMD node server.js\` — actually runs \`/bin/sh -c 'node server.js'\`, which makes *sh* PID 1. sh does not forward SIGTERM, so \`docker stop\` waits its full grace period and then SIGKILLs node mid-write. Always use exec form for the final process.

## How the cache thinks

Every instruction produces a layer, and a rebuild reuses cached layers top-down until the *first* instruction that changed — everything after it rebuilds unconditionally. \`RUN\` is keyed on the instruction text; \`COPY\` and \`ADD\` are also keyed on the checksums of the files they copy. That is the entire reason for the ordering above: copy the dependency manifests first, run \`npm ci\`, and only then copy the source. Editing application code invalidates just the final \`COPY . .\` — dependencies install from cache. Reverse the order and every one-line code change reinstalls the world.

## Build context and .dockerignore

\`\`\`bash
docker build -t myapp:dev .
docker build -t myapp:dev -f docker/Dockerfile .
\`\`\`

The trailing \`.\` is not "where the Dockerfile is" — \`-f\` chooses that. It is the **build context**: the directory tree tarred up and sent to the daemon, and the boundary \`COPY\` can reach. A \`.dockerignore\` file (list \`node_modules\`, \`.git\`, \`dist\`, logs) keeps the upload small, stops \`COPY . .\` from cache-busting on junk, and keeps files that should never ship out of your layers.

## Multi-stage builds

\`\`\`dockerfile
FROM node:20.14-bookworm-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
\`\`\`

The final image contains only what the last stage keeps — compilers, devDependencies and source never ship. \`--target build\` stops at a named stage (useful for a CI test stage), and \`COPY --from=\` can even pull files out of an unrelated image by name.`,
      questions: [
        {
          prompt: 'With ENTRYPOINT ["mytool"] and CMD ["--help"], what does docker run img --version execute?',
          options: [
            'mytool --help --version',
            'mytool --version',
            '--version, replacing mytool entirely',
            'mytool --help, then mytool --version',
          ],
          correct: 1,
          explain: 'Run arguments replace CMD but append to ENTRYPOINT. CMD is only the default when no arguments are given.',
        },
        {
          prompt: 'Why is shell-form CMD (CMD node server.js) a problem for a long-running service?',
          options: [
            'It cannot reference environment variables',
            'It only works on alpine-based images',
            'It adds an extra layer to the image',
            'PID 1 becomes /bin/sh, which does not forward SIGTERM, so docker stop always ends in SIGKILL',
          ],
          correct: 3,
          explain: 'Shell form wraps the command in /bin/sh -c. The shell receives the stop signal and ignores it, so your app never gets a chance to shut down cleanly.',
        },
        {
          prompt: 'Why COPY the dependency manifests and install before copying the rest of the source?',
          options: [
            'So a source edit only invalidates the layers after the install — dependencies come from cache instead of reinstalling',
            'Because COPY . . refuses to include package.json',
            'Because npm ci fails when source files are already present',
            'It reduces the size of the final image',
          ],
          correct: 0,
          explain: 'The cache breaks at the first changed instruction. Isolating the manifests means code changes never touch the expensive install layer.',
        },
        {
          prompt: 'In docker build -t app ., what does the . mean?',
          options: [
            'The directory the built image is written into',
            'The location of the Dockerfile, and nothing else',
            'The build context: the tree sent to the daemon and the boundary COPY can reach',
            'The working directory inside the container',
          ],
          correct: 2,
          explain: 'The context is tarred and shipped to the daemon; -f separately picks the Dockerfile. .dockerignore exists to keep that context lean.',
        },
        {
          prompt: 'What is the main win of a multi-stage build?',
          options: [
            'Layers from all stages are merged into the final image',
            'The final image contains only what you COPY --from earlier stages — build toolchains stay out',
            'It disables caching for intermediate stages',
            'It lets one Dockerfile produce several tags in a single build',
          ],
          correct: 1,
          explain: 'Only the last stage ships. Compilers, dev dependencies and source live in earlier stages and never reach production.',
        },
      ],
    },
    {
      key: 'volumes-mounts',
      title: 'Volumes, bind mounts, tmpfs',
      body: `# Where data actually lives

The writable layer dies with the container: \`docker rm\` deletes every byte written there. It is also the slowest place to write — overlay filesystems do copy-up, so the first modification of a file from a lower layer copies the entire file into the writable layer first. Anything that should outlive a container, be shared, or be written heavily belongs in a mount. There are three kinds:

- A **named volume** is created and managed by Docker (under \`/var/lib/docker/volumes\`), survives container removal, and is the right default for databases and any stateful service in production.
- A **bind mount** maps a host path into the container verbatim; the host owns the data. It is the right tool for mounting source code into a dev container.
- A **tmpfs** mount is RAM only and vanishes at stop — scratch space, and data that must never touch disk.

## -v vs --mount

\`\`\`bash
docker run -d -v pgdata:/var/lib/postgresql/data postgres:16
docker run -it -v "$(pwd)":/app -v /app/node_modules node:20 npm run dev
docker run -d --mount type=volume,src=pgdata,dst=/var/lib/postgresql/data postgres:16
docker run -it --mount type=bind,src="$(pwd)",dst=/app node:20 npm run dev
docker run -it --tmpfs /scratch alpine:3.20 sh
\`\`\`

\`-v\` decides volume-versus-bind by spelling: a source starting with \`/\` or \`.\` is a bind mount, anything else is a volume name. \`--mount\` is explicit key=value and stricter in one very useful way: a bind mount whose \`src\` does not exist is an **error**, while \`-v /typo/path:/data\` silently creates an empty root-owned directory on the host — a classic "where did my data go". Prefer \`--mount\` in scripts; \`-v\` is fine at the prompt.

The second line above shows a standard dev-container move: the anonymous volume at \`/app/node_modules\` masks that subdirectory of the bind mount, so the container keeps its own installed dependencies instead of the host's. One more asymmetry worth knowing: a *named volume* mounted over a non-empty image path is seeded with the image's content on first use; a bind mount just shadows whatever the image had there.

## When each fits

Development: bind-mount the code, let the container be the toolchain, edits show up instantly. Production: named volumes — no host-path coupling, sane permissions, works with volume drivers and backup tooling. tmpfs: session scratch and sensitive temp files.

## Lifecycle and pruning

Volumes are deliberately *not* removed with their containers. Manage them directly:

\`\`\`bash
docker volume ls
docker volume inspect pgdata
docker rm -v ctr
docker volume prune
\`\`\`

\`docker rm -v\` removes the container's *anonymous* volumes only — named ones always stay. \`docker volume prune\` deletes every volume not referenced by any container; run \`ls\` first, because this is the one prune where real data disappears. Anonymous volumes leak steadily from images that declare \`VOLUME\` (postgres does) when run without \`--rm\`, so an occasional prune is part of normal hygiene.`,
      questions: [
        {
          prompt: 'What happens to data in the writable layer when the container is removed?',
          options: [
            'It is archived into the image as a new layer',
            'It is moved into an anonymous volume',
            'It is deleted — everything written there is gone',
            'It is kept until the next docker system prune',
          ],
          correct: 2,
          explain: 'The writable layer belongs to the container. docker rm deletes it, which is the whole argument for putting real data in volumes.',
        },
        {
          prompt: 'How does --mount differ usefully from -v for bind mounts?',
          options: [
            '--mount errors when the bind source is missing; -v silently creates an empty host directory',
            '--mount only works with named volumes',
            '-v cannot create bind mounts at all',
            'They differ only in syntax; behavior is identical',
          ],
          correct: 0,
          explain: 'The silent directory creation of -v turns a typo into an apparently empty dataset. --mount fails loudly, which is what you want in scripts.',
        },
        {
          prompt: 'A named volume is mounted (for the first time, empty) over a directory the image ships files in. What happens?',
          options: [
            'The mount fails with a conflict error',
            'The image content is permanently deleted from the image',
            'The volume shadows the directory, which now appears empty',
            'Docker seeds the empty volume with the image content at that path',
          ],
          correct: 3,
          explain: 'First-use seeding is unique to named volumes. A bind mount would simply shadow the image content instead.',
        },
        {
          prompt: 'Which pairing matches common practice?',
          options: [
            'Named volumes for source code in dev; bind mounts for database data in prod',
            'Bind-mounted source in dev; named volumes for stateful data in prod',
            'tmpfs for database data in prod',
            'Bind mounts everywhere; volumes are legacy',
          ],
          correct: 1,
          explain: 'Bind mounts give instant code sync during development; named volumes decouple production data from host paths and survive container replacement.',
        },
      ],
    },
    {
      key: 'networking',
      title: 'Networking and port publishing',
      body: `# Networking

## EXPOSE vs -p

\`EXPOSE\` in a Dockerfile publishes nothing — it is documentation plus a hint to tooling. \`-p\` is what actually wires the host to the container:

\`\`\`bash
docker run -d -p 8080:80 nginx:1.27
docker run -d -p 127.0.0.1:5432:5432 postgres:16
docker port pg
\`\`\`

The order is always \`-p host:container\`. The default bind address is 0.0.0.0, which means published ports are reachable from your LAN — and Docker inserts its own iptables rules ahead of ufw-style host firewalls, so "but the firewall blocks it" often is not true. Bind to loopback explicitly (\`127.0.0.1:5432:5432\`) for local-only services.

## The default bridge

Containers land on the \`docker0\` bridge by default, get addresses in 172.17.0.0/16, and reach the internet through NAT. They can reach *each other* by IP — but the default bridge provides **no DNS**: containers cannot find each other by name there (the deprecated \`--link\` flag was the old workaround). This is the single most common "containers cannot see each other" confusion.

## User-defined networks

\`\`\`bash
docker network create appnet
docker run -d --name db --network appnet postgres:16
docker run -d --name web --network appnet -p 8080:3000 myapp
\`\`\`

On a user-defined bridge, Docker runs an embedded DNS server and every container resolves its peers by container name: \`web\` reaches the database at \`db:5432\`. Note what is *not* involved: publishing. Container-to-container traffic on a shared network talks to the **container** port directly; \`-p\` exists only so the host and the outside world can reach in. This DNS-by-name behavior is exactly what Compose automates in the next lesson. \`--network-alias\` adds extra names, \`docker network connect\` joins a running container to additional networks, and containers on different user-defined networks are isolated from each other by default.

## Host networking

\`--network host\` drops network isolation entirely: the container shares the host's network stack, its process binds host ports directly, and \`-p\` is silently meaningless. It is occasionally the right call — performance-sensitive proxies, software needing huge port ranges or multicast — and it is Linux-only in any real sense, since on macOS and Windows "the host" is the hidden VM.

## Seeing what is actually wired

\`\`\`bash
docker port web
ss -ltnp | grep 8080
docker network inspect appnet
docker inspect --format '{{json .NetworkSettings.Ports}}' web
\`\`\`

\`docker port\` prints a container's published mappings. \`ss -ltnp\` on the host shows the actual listener (either a docker-proxy process or nothing visible when the kernel handles it purely in iptables NAT). \`docker network inspect\` lists a network's members with their IPs — the fastest way to confirm two containers really share a network before blaming DNS.`,
      questions: [
        {
          prompt: 'What does EXPOSE 3000 in a Dockerfile do at runtime?',
          options: [
            'Opens port 3000 in the host firewall',
            'Nothing — it is documentation and metadata; only -p actually publishes ports',
            'Publishes port 3000 on a random host port',
            'Restricts which ports -p is allowed to map',
          ],
          correct: 1,
          explain: 'EXPOSE records intent for humans and tooling. Without -p (or -P), no host port is touched.',
        },
        {
          prompt: 'Which is true about DNS between containers?',
          options: [
            'All bridge networks provide DNS by container name',
            'DNS only works with --network host',
            'DNS requires editing /etc/hosts inside each container',
            'User-defined networks provide DNS by container name; the default bridge does not',
          ],
          correct: 3,
          explain: 'The embedded DNS server only serves user-defined networks. On the default bridge, containers must use raw IPs — the root of many "cannot connect" reports.',
        },
        {
          prompt: 'What does -p 127.0.0.1:5432:5432 do?',
          options: [
            'Publishes the container port on loopback only, unreachable from the LAN',
            'Fails — -p accepts at most two colon-separated fields',
            'Maps host port 127 to container port 5432',
            'Makes the process inside the container bind to loopback',
          ],
          correct: 0,
          explain: 'The optional leading address controls the host-side bind. The default is 0.0.0.0, which exposes the port to the network and bypasses ufw-style firewalls.',
        },
        {
          prompt: 'web and db share a user-defined network; db listens on 5432 with no -p. How does web reach it?',
          options: [
            'It cannot until -p 5432:5432 is added to db',
            'Via the host IP and a published port',
            'Directly at db:5432 — publishing is only needed for access from the host or outside',
            'Docker assigns db a random published port automatically',
          ],
          correct: 2,
          explain: 'Containers on a shared network talk container-port to container-port over that network. -p is strictly about reaching in from outside.',
        },
      ],
    },
    {
      key: 'compose',
      title: 'Compose: one file, whole stack',
      body: `# Compose

Compose turns a stack of run commands into one declarative file. The anatomy, with the parts that matter:

\`\`\`yaml
services:
  web:
    build: .
    ports:
      - '8080:3000'
    environment:
      DATABASE_URL: postgres://app:\${DB_PASSWORD}@db:5432/app
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16.3
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
\`\`\`

Each service is a container recipe. \`image\` pulls; \`build\` builds from a context (specify both and the built image gets tagged with the \`image\` name). Compose creates a project-scoped user-defined network automatically, so services resolve each other by *service name* — the \`db\` host in that connection string is the previous lesson's embedded DNS at work, not magic. \`ports\`, \`volumes\` and \`environment\` map directly onto their run-flag equivalents; the named volume \`pgdata\` is declared at top level. The \`\${DB_PASSWORD}\` references are interpolated *by Compose* — from your shell environment or a \`.env\` file next to the yaml — before Docker ever sees the config.

## depends_on and its limits

Plain \`depends_on: [db]\` orders **startup only**: db's container has been started, which says nothing about postgres being ready to accept connections. \`condition: service_healthy\` is the real readiness gate — Compose waits until db's healthcheck passes before starting web. Even then, know the limits: nothing restarts web if db later dies, and nothing replaces application-level connection retry. Treat depends_on as first-boot ordering, not a supervision tree.

## The daily loop

\`\`\`bash
docker compose up -d
docker compose ps
docker compose logs -f web
docker compose exec db psql -U postgres
docker compose up -d --build web
docker compose down
docker compose down -v
\`\`\`

\`up -d\` is convergent: it diffs the file against what is running and only recreates services whose config changed. \`down\` removes containers and the network but **keeps named volumes**; \`down -v\` deletes those too — that is the flag that erases your database. \`up -d --build\` rebuilds images first; \`logs -f\`, \`ps\` and \`exec\` behave like their docker counterparts scoped to the project.

## Profiles

\`\`\`yaml
  adminer:
    image: adminer:4
    profiles:
      - debug
\`\`\`

A service with a \`profiles\` list is skipped by default and only starts under \`docker compose --profile debug up -d\` (or \`COMPOSE_PROFILES=debug\`). Services without profiles always run. This keeps optional tooling — DB admin UIs, mail catchers — declared in the file without paying for them every boot.

## Override files for dev

Compose automatically merges \`compose.override.yaml\` over \`compose.yaml\` when both exist. The idiom: keep the base file production-shaped, and put dev conveniences — bind-mounted source, extra published ports, debug services — in the override. Locally you just run \`up\` and get both; in CI or prod you pass \`-f compose.yaml\` explicitly (or chain \`-f compose.yaml -f compose.prod.yaml\` — later files win key by key) and the dev extras never apply.`,
      questions: [
        {
          prompt: 'What does a plain depends_on: [db] guarantee for the web service?',
          options: [
            'Only startup ordering — db\'s container was started, not that its process is ready',
            'That db has passed its healthcheck before web starts',
            'That web restarts whenever db restarts',
            'That web and db share a private network link',
          ],
          correct: 0,
          explain: 'Plain depends_on is start ordering only. Readiness gating requires condition: service_healthy plus a healthcheck on the dependency.',
        },
        {
          prompt: 'What is the difference between docker compose down and down -v?',
          options: [
            'down removes volumes; -v preserves them',
            'down -v additionally removes the built images',
            'down keeps named volumes; down -v deletes them along with the stack',
            'They are identical; -v only makes output verbose',
          ],
          correct: 2,
          explain: 'down tears down containers and the network but leaves data. The -v flag is what actually deletes named volumes — and your database.',
        },
        {
          prompt: 'How does the web service reach postgres in the example file?',
          options: [
            'Through a published host port',
            'By the service name db over the network Compose created',
            'Via the docker0 gateway IP',
            'Through a unix socket Compose mounts into both containers',
          ],
          correct: 1,
          explain: 'Compose puts services on a shared user-defined network, where the embedded DNS resolves service names. No publishing is involved for service-to-service traffic.',
        },
        {
          prompt: 'What is the standard role of compose.override.yaml?',
          options: [
            'It replaces compose.yaml wholesale when present',
            'It is only read when a profile is activated',
            'It is only read in production deployments',
            'It is merged over compose.yaml by default — the place for dev-only bind mounts, ports and services',
          ],
          correct: 3,
          explain: 'The override merges automatically for local runs. Production passes -f explicitly to skip it, keeping the base file clean.',
        },
      ],
    },
    {
      key: 'debugging-hygiene',
      title: 'Debugging, size, and hygiene',
      body: `# Debugging and hygiene

## Reading a dead container

A container's exit code is its main process's exit code, visible in \`docker ps -a\` and via inspect. The ones worth memorizing: **137** is 128+9, killed by SIGKILL — either the OOM killer or a \`docker stop\` whose grace period expired; **139** is a segfault; **143** is 128+15, a clean exit after SIGTERM; **126** means found-but-not-executable and **127** means command not found (usually a wrong ENTRYPOINT path, or a dynamically linked binary on a base missing its libc).

\`\`\`bash
docker inspect --format '{{.State.ExitCode}} {{.State.OOMKilled}}' app
docker inspect --format '{{.State.Error}}' app
docker logs --tail 200 app
\`\`\`

\`OOMKilled: true\` is the definitive answer to "was it the memory limit" — it distinguishes a cgroup kill from every other SIGKILL. Logs survive the container stopping, so a crashed container remains fully inspectable until you \`rm\` it. Debug first, remove second.

## Image size forensics

\`docker history myapp:latest\` prints every layer's size next to the instruction that created it — the first tool for "why is this 2GB". The classic trap: bytes deleted in a *later* layer are hidden, not removed. \`RUN apt-get install big-toolchain\` followed by a separate \`RUN rm -rf ...\` ships both layers at full size; cleanup must happen inside the same \`RUN\`, or the whole build should move to multi-stage. For interactive spelunking, **dive** (an open-source TUI) walks each layer's file tree and estimates wasted bytes.

\`\`\`bash
docker history --no-trunc myapp:latest
docker system df
docker system prune
\`\`\`

\`system df\` breaks disk usage into images, containers, volumes and build cache. \`system prune\` clears dangling images, stopped containers and unused networks; \`-a\` extends to *all* unreferenced images, and \`--volumes\` includes unused volumes — reread the volumes lesson before ever adding that one.

## Run as non-root

The default container user is root, and — user namespaces being off by default — uid 0 in the container is uid 0 on the host. One bind mount or one kernel bug away from mattering. Fix it in the Dockerfile:

\`\`\`dockerfile
RUN useradd --system --uid 10001 app
USER app
\`\`\`

Many official images ship a ready user (node has \`node\`; postgres drops privileges itself). Non-root plus a read-only root filesystem (\`docker run --read-only\` with a tmpfs for scratch) is cheap, real hardening.

## Pin your bases

\`FROM node:latest\` makes the build a function of the day you run it. Pin at least to a minor and variant — \`node:20.14-bookworm-slim\` — and pin the digest when reproducibility must be absolute. You met mutable tags in lesson one; base images are where they bite hardest, because a silently updated base invalidates the whole cache *and* can change runtime behavior in the same motion.

## Secrets

Two rules. Secrets do not go in ENV: \`docker inspect\` prints every environment variable, they leak into child processes and error reports, and an ENV set at build time is stored in the image config forever. And secrets do not go in layers: a COPY followed by a later \`rm\` still ships the bytes, as history just showed. Build-time secrets use BuildKit secret mounts — \`RUN --mount=type=secret,id=npmrc npm ci\` exposes the file only during that single RUN, never in a layer. Runtime secrets arrive as mounted files (Compose \`secrets:\`, or a bind/tmpfs mount) or from an actual secret manager.

## Minimal bases

- \`alpine\` — around 5MB, musl libc: excellent for most things, but musl's DNS behavior and glibc-compat gaps occasionally bite prebuilt native binaries.
- distroless — no shell, no package manager: minimal attack surface, but images you cannot \`exec\` a shell into; debugging needs ephemeral tooling.
- Debian \`-slim\` — glibc, apt available at build time: the pragmatic middle ground and a sane default.

Smaller buys faster pulls and less attack surface — but only after correctness. Pick the smallest base your runtime is actually happy on.`,
      questions: [
        {
          prompt: 'A container exited with code 137. What does that mean?',
          options: [
            'Segmentation fault',
            'Command not found',
            'Clean exit after handling SIGTERM',
            '128+9: killed by SIGKILL — the OOM killer, or a stop whose grace period ran out',
          ],
          correct: 3,
          explain: 'Exit codes above 128 encode a fatal signal as 128+N. 9 is SIGKILL; check OOMKilled in inspect to learn which sender it was.',
        },
        {
          prompt: 'Why does RUN rm -rf /big in a later layer not shrink the image?',
          options: [
            'Layers are append-only: a later layer only hides files, the bytes still ship in the earlier layer',
            'rm is not permitted inside RUN instructions',
            'The build cache restores deleted files on rebuild',
            'Deletion only works with ADD, not COPY',
          ],
          correct: 0,
          explain: 'Each layer is an immutable diff. Deletion records a whiteout on top; the original layer still travels with the image. Clean up in the same RUN or use multi-stage.',
        },
        {
          prompt: 'Why should secrets not be passed as ENV?',
          options: [
            'ENV values are encrypted and become unrecoverable',
            'ENV variables are limited to 128 bytes',
            'They show in docker inspect, leak to child processes, and build-time ENV persists in the image config',
            'Processes inside containers cannot read ENV at runtime',
          ],
          correct: 2,
          explain: 'Environment variables are plaintext, widely inherited, and (when baked at build) permanent image metadata. Secret mounts and runtime files avoid all three leaks.',
        },
        {
          prompt: 'What is the trade-off of a distroless base image?',
          options: [
            'It is larger than alpine but easier to debug',
            'Minimal attack surface, but no shell — you cannot simply exec in to poke around',
            'It only supports Go binaries',
            'It requires patches to the host kernel',
          ],
          correct: 1,
          explain: 'Distroless strips the shell and package manager. Great for production hardening, but interactive debugging needs ephemeral containers or extra tooling.',
        },
        {
          prompt: 'How do you confirm a container was killed by its memory limit?',
          options: [
            'docker inspect --format on .State.OOMKilled — true means the cgroup memory kill fired',
            'docker logs prints an out-of-memory banner',
            'docker ps -a shows the status OOM',
            'Only dmesg on the host can tell',
          ],
          correct: 0,
          explain: 'Docker records the OOM flag in the container state, cleanly separating a memory-limit kill from any other SIGKILL with the same 137 exit code.',
        },
      ],
    },
  ],
}
