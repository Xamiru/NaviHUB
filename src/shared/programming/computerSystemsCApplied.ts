import type { ProgQuestion } from './types'

type AppliedLesson = { practice: string; solution: string; questions: ProgQuestion[] }
const lines = (...parts: string[]) => parts.join('\n')
const q = (prompt: string, options: string[], correct: number, explain: string) =>
  ({ prompt, options, correct, explain })

export const COMPUTER_SYSTEMS_C_APPLIED: Record<string, AppliedLesson> = {
  'machine-model': {
    practice: lines('Trace `0x12345678` stored at addresses 100 through 103 on a little-endian machine. Then compute the unsigned 8-bit result of `250 + 10`.', 'Expected result: bytes are `78 56 34 12`; modulo 256 arithmetic produces `4`.'),
    solution: lines('Least-significant byte occupies the lowest address on little-endian systems. Unsigned N-bit arithmetic reduces modulo 2^N. If you get 260, you calculated with unbounded integers rather than the stated 8-bit representation.'),
    questions: [
      q('What byte is at the lowest address for little-endian `uint16_t x = 0x1234`?', ['0x34', '0x12', '0x00', 'The host pointer size'], 0, 'Little endian stores the least-significant byte first.'),
      q('What is `(uint8_t)255 + (uint8_t)2` after conversion back to uint8_t?', ['257', '1', '-1', '0'], 1, 'Unsigned 8-bit conversion reduces the value modulo 256.'),
      q('Which value is exactly representable in a typical binary floating format?', ['0.1 decimal', 'One third', '0.5 decimal', 'Pi'], 2, 'One half is a finite power-of-two fraction in binary.'),
      q('A protocol writes a native struct directly to disk. What threatens portability?', ['Only source variable names', 'Comment encoding selected by the editor and source-control client', 'Function declaration order within unrelated translation units', 'Padding, width, and byte order'], 3, 'Native object representation can vary across ABI and architecture.'),
    ]
  },
  'c-toolchain': {
    practice: lines('Compile `main.c` with `cc -std=c17 -Wall -Wextra -Wpedantic -O0 -g main.c -o demo`, run it, then inspect the exit status with `printf "%s\\n" "$?"`.', 'Expected result: warnings identify questionable source, `-g` supplies debug information, and the shell status reflects `main` or termination.'),
    solution: lines(
      'Create a plain text file named main.c with this complete program:',
      '```c',
      '#include <stdio.h>',
      'int main(void) {',
      '    puts("Hello, C");',
      '    return 0;',
      '}',
      '```',
      'Run the compile command above, then ./demo. Expect Hello, C on its own line and exit status 0. The include makes the puts declaration available; main is the entry function; braces enclose its body; a semicolon ends a statement. puts writes text followed by a newline, and returning zero reports success.',
      'Preprocessing expands directives, compilation translates source, assembly emits object code, and linking resolves symbols into the executable. If the compiler reports an undefined reference, declaration succeeded but no compatible definition reached the linker. A missing cc command means a C compiler must first be installed; all source and explanations for the exercise are included here.'
    ),
    questions: [
      q('Which phase expands `#include` and macros?', ['Preprocessing', 'Linking', 'Program loading', 'Dynamic execution'], 0, 'The preprocessor handles directives before C translation.'),
      q('A function is declared and called, but no object defines it. Which phase normally reports this?', ['Lexing', 'Linking', 'Header inclusion', 'Runtime allocation'], 1, 'The linker resolves external symbol references across object files and libraries.'),
      q('What does `-g` primarily add?', ['Stronger optimization', 'Automatic tests', 'Debug information', 'Memory safety'], 2, 'Debug information connects machine locations to source-level names and lines.'),
      q('Why should warnings be enabled in the first build?', ['They make every generated machine instruction execute faster on every supported target', 'They replace runtime sanitizers and all behavioral tests', 'They define a private C language standard for this executable', 'They expose suspicious source constructs before runtime execution'], 3, 'Compiler diagnostics catch many conversions, declarations, and control-flow mistakes early.'),
    ]
  },
  'types-control-functions': {
    practice: lines('Trace `sum_to(4)` implemented with a loop from 1 through n. Write the value of the accumulator after each iteration and define behavior for a negative n.', 'Expected result: accumulator states are `1, 3, 6, 10`; a stated precondition or explicit error handles negative input.'),
    solution: lines(
      '```c',
      'int sum_to(int n) {',
      '    if (n < 0 || n > 100) return -1;',
      '    int sum = 0;',
      '    for (int i = 1; i <= n; ++i) sum += i;',
      '    return sum;',
      '}',
      '```',
      'The function accepts only 0 through 100; -1 reports an invalid argument. sum_to(4) returns 10, sum_to(0) returns 0, and sum_to(-1) returns -1. The maximum accepted result is 5050, within even the minimum range required for C int. A return exits the function immediately. The loop initializes i once, tests i <= n before each iteration, and increments i afterward. If 4 is omitted, inspect < versus <=.'
    ),
    questions: [
      q('How many iterations run for `for (int i=0; i<3; ++i)`?', ['Three', 'Two', 'Four', 'Unbounded'], 0, 'The body runs for i equal to 0, 1, and 2.'),
      q('What is passed to a C function parameter declared `int x`?', ['The caller variable itself', 'A copy of its integer value', 'A hidden reference', 'A dynamically allocated copy'], 1, 'Ordinary scalar parameters receive values; changing x does not change the caller variable.'),
      q('A non-void function reaches its closing brace without returning. What is the problem?', ['The implementation returns zero after printing a diagnostic message to standard error', 'The function restarts automatically with its previous argument values and local state', 'Using the missing result produces behavior that the C contract does not define', 'The compiler throws and catches a language-level runtime exception'], 2, 'A required return value was not produced, except for the special main rule.'),
      q('Which switch practice prevents accidental fallthrough?', ['Omit every break and rely on indentation to stop execution', 'Repeat the original switch condition within every case body', 'Use an unconditional goto from every case to the next case label', 'End every case explicitly or mark its intentional fallthrough'], 3, 'Each branch should make transfer of control clear and intentional.'),
    ]
  },
  'pointers-arrays': {
    practice: lines('For `int a[3] = {7,8,9}; int *p = a + 1;`, trace `p`, `*p`, `p-a`, and the one-past pointer `a+3`.', 'Expected result: `*p` is 8, `p-a` is 1, and `a+3` may be formed or compared but not dereferenced.'),
    solution: lines('Pointer arithmetic advances in units of the pointed-to type within one array object. `a[i]` means `*(a+i)`. If an address moves outside the array other than one-past, the program has left the defined pointer-arithmetic domain.'),
    questions: [
      q('With `int a[4]`, what does `a + 2` designate?', ['The third int element', 'Two raw bytes after a', 'A complete copy of all four array elements in new storage', 'The array length converted into a pointer value'], 0, 'Pointer arithmetic scales by sizeof the pointed-to element.'),
      q('Which operation is permitted on `a + 4` for an array of four elements?', ['Dereference it to read an element reserved beyond the array', 'Compare it with another pointer in that array range', 'Write through it after a null check', 'Increment it again before subtracting the original address'], 1, 'The one-past pointer supports comparison and subtraction in range but not access.'),
      q('Inside `void f(int a[])`, what is `a`?', ['A complete local array', 'A variable-length array object', 'An adjusted pointer parameter', 'A compile-time element count'], 2, 'Array parameter syntax adjusts to a pointer and loses the caller’s bound.'),
      q('Two pointers refer to unrelated arrays. Which subtraction is defined?', ['Subtract after integer casts', 'Subtract whichever pointer happens to have the larger address', 'Subtract only in an unoptimized debug build on the same machine', 'No pointer difference is defined between them'], 3, 'Pointer subtraction is defined only within the same array object and its one-past position.'),
    ]
  },
  'memory-ownership': {
    practice: lines('Implement `char *copy_name(const char *src)` with the complete solution below. Call it with `Ada`, verify equal text and distinct addresses, then free the result. Treat NULL input or allocation failure as failure.', 'Expected result: src remains borrowed, the caller owns a distinct returned allocation, and NULL reports failure without leaking partial state.'),
    solution: lines(
      '```c',
      '#include <stdint.h>',
      '#include <stdlib.h>',
      '#include <string.h>',
      'char *copy_name(const char *src) {',
      '    if (src == NULL) return NULL;',
      '    size_t length = strlen(src);',
      '    if (length == SIZE_MAX) return NULL;',
      '    char *copy = malloc(length + 1);',
      '    if (copy == NULL) return NULL;',
      '    memcpy(copy, src, length + 1);',
      '    return copy;',
      '}',
      '```',
      'The caller invokes free exactly once. The SIZE_MAX guard documents the addition boundary, though strlen cannot return SIZE_MAX for a real accessible object. If ownership is unclear at the call site, improve the API name or contract.'
    ),
    questions: [
      q('After successful `malloc`, who releases the block under a caller-owns contract?', ['The receiving caller', 'The compiler', 'The operating system immediately', 'The source pointer'], 0, 'The API contract transfers ownership of the allocation to the caller.'),
      q('What must happen when `realloc(p, n)` returns NULL for `n > 0`?', ['Free the original allocation and report that resizing succeeded', 'Keep using or release the still-valid p', 'Assume p was already freed', 'Read bytes through the failed null result to recover the allocation'], 1, 'On failure, realloc leaves the original allocation unchanged.'),
      q('A pointer is used after its allocation is freed. Which defect is this?', ['Integer overflow', 'Memory leak', 'Use after free', 'Stack recursion'], 2, 'The object lifetime ended, so the retained pointer no longer designates a live object.'),
      q('Which pattern safely updates a reallocating pointer?', ['Assign the result directly to p before checking whether allocation succeeded', 'Free p, then reuse its old value', 'Call realloc with null and increment the returned pointer before checking it', 'Assign to a temporary, then replace p on success'], 3, 'A temporary preserves the original pointer when allocation fails.'),
    ]
  },
  'strings-buffers': {
    practice: lines('Implement `bool join(char *dst, size_t cap, const char *a, const char *b)` with an exact capacity check. The destination must not overlap either source; all pointers must designate accessible objects of the stated sizes. Test cap equal to required bytes and one byte smaller.', 'Expected result: required bytes are `strlen(a)+strlen(b)+1`; exact capacity succeeds and the smaller buffer fails without a partial unterminated result.'),
    solution: lines(
      '```c',
      '#include <stdbool.h>',
      '#include <stdint.h>',
      '#include <string.h>',
      'bool join(char *dst, size_t cap, const char *a, const char *b) {',
      '    if (dst == NULL || a == NULL || b == NULL) return false;',
      '    size_t la = strlen(a), lb = strlen(b);',
      '    if (la > SIZE_MAX - lb || la + lb == SIZE_MAX) return false;',
      '    size_t need = la + lb + 1;',
      '    if (need > cap) return false;',
      '    memcpy(dst, a, la);',
      '    memcpy(dst + la, b, lb);',
      '    dst[la + lb] = 0;',
      '    return true;',
      '}',
      '```',
      'Test `char out[5]`: joining `ab` and `cd` succeeds, while capacity 4 fails before changing dst. If the boundary test fails, check whether the terminator byte was included.'
    ),
    questions: [
      q('How many bytes store the C string `cat`?', ['Four including the terminator', 'Three with no terminator', 'Five including length', 'It depends on pointer size'], 0, 'A C string representation includes a trailing zero byte.'),
      q('Before adding two size_t lengths, what must be checked?', ['Their textual encoding', 'That addition cannot overflow', 'Whether either pointer is odd', 'The stack frame address'], 1, 'Wrapped size arithmetic can make an undersized allocation appear sufficient.'),
      q('What does `sizeof p` report when `p` is a `char *` parameter?', ['The source string length', 'The destination capacity', 'The pointer object size', 'The remaining buffer bytes'], 2, 'A pointer carries no array bound, and sizeof measures the pointer itself.'),
      q('Which copy contract is easiest to validate?', ['Copy until unrelated memory happens to contain a zero byte', 'Assume every source fits because callers know the destination size', 'Truncate silently and return the destination without any status', 'Pass destination capacity and report truncation or failure'], 3, 'Explicit bounds and outcomes let callers preserve correctness.'),
    ]
  },
  'structs-bits-abi': {
    practice: lines('Given fields `char tag; uint32_t count; char state;`, sketch likely padding on a 4-byte-aligned ABI, then design a six-byte wire encoding independent of the struct.', 'Expected result: the native struct may include padding; the wire form writes one tag byte, four count bytes in specified order, and one state byte.'),
    solution: lines('Never infer wire layout from `sizeof(struct)`. Serialize each field into bytes with fixed widths and chosen endianness, then parse with bounds checks. If a file changes across compilers, raw struct dumping leaked ABI layout.'),
    questions: [
      q('Why can `sizeof(struct S)` exceed the sum of field sizes?', ['Alignment padding', 'Comments occupy bytes', 'Function prototypes are embedded', 'The linker adds source names'], 0, 'The ABI may insert padding so members and arrays of the struct meet alignment rules.'),
      q('What is the portable way to encode a 32-bit protocol field?', ['Write the complete native struct including its compiler-selected padding', 'Serialize a fixed-width value in specified byte order', 'Cast its address to text and transmit the resulting pointer characters', 'Enable compiler packing and rely on every peer using identical flags'], 1, 'Explicit field encoding removes host layout and endian dependencies.'),
      q('What does a bit mask such as `flags & 0x04` test?', ['Whether every flag bit is zero after an implicit signed conversion', 'Whether the complete integer uses a signed representation on this target', 'Whether that selected bit is set', 'Whether the containing object begins at a suitably aligned address'], 2, 'AND isolates the bit positions present in both operands.'),
      q('When may code safely call through a function pointer?', ['After converting any data pointer and assuming the calling convention matches', 'After guessing its parameter list from the number of supplied arguments', 'After loading arbitrary executable bytes into writable process memory', 'When its type matches the target function contract'], 3, 'Calling conventions and parameter types must match the function definition.'),
    ]
  },
  'compilation-linking': {
    practice: lines('Create `counter.h`, `counter.c`, and `main.c`. Put the declaration in the header, one external definition in counter.c, and compile each source before linking.', 'Expected result: both translation units share the declaration and the linker finds exactly one external definition.'),
    solution: lines('Use include guards, include the owning header in counter.c, and run `cc -c counter.c`, `cc -c main.c`, then `cc counter.o main.o -o demo`. Multiple-definition errors mean a non-inline definition probably lived in the header.'),
    questions: [
      q('Where should a public function declaration normally live?', ['Its module header', 'Every caller as handwritten text', 'A runtime configuration file', 'Only in the linker command'], 0, 'One owning header keeps declarations consistent across translation units.'),
      q('What does `static` on a file-scope helper provide?', ['Dynamic allocation', 'Internal linkage', 'Thread safety', 'Runtime polymorphism'], 1, 'Internal linkage keeps that name private to its translation unit.'),
      q('Why include a module header in its own implementation file?', ['To force every public call to be inlined into its caller', 'To allocate all external objects before the program loader starts', 'To check definition and declaration compatibility', 'To bypass preprocessing for quoted include directives in that file'], 2, 'The compiler can diagnose drift between the public declaration and implementation.'),
      q('A global variable is defined in a header included twice. What likely occurs?', ['The value becomes atomic', 'The header is ignored', 'The variable moves to the stack', 'The linker reports multiple definitions'], 3, 'Headers normally declare external objects; one source file owns the definition.'),
    ]
  },
  'debugging-testing': {
    practice: lines('Compile a five-line heap overflow under AddressSanitizer, run it, and identify the first invalid access, allocation site, and violated bound. Then reduce the input to the smallest reproducer.', 'Expected result: diagnosis points to the write beyond the allocation, not a later crash location.'),
    solution: lines('Build with `-O1 -g -fsanitize=address,undefined -fno-omit-frame-pointer`. Read the first sanitizer report and stack, repair the length invariant, and retain the reduced input as a regression. If behavior disappears, compare optimization and environment while preserving the artifact.'),
    questions: [
      q('Which location should a memory-corruption investigation prioritize?', ['The earliest demonstrated invalid access', 'The final unrelated log line', 'The largest source file', 'The last successful allocation'], 0, 'Delayed corruption often crashes far from the operation that violated the invariant.'),
      q('What does input minimization provide?', ['A production deployment', 'A focused reproducible trigger', 'A replacement debugger', 'Proof that no other bug exists'], 1, 'A small reproducer clarifies causality and becomes durable regression evidence.'),
      q('Which tool directly reports many out-of-bounds heap accesses?', ['A formatter', 'A package manager', 'AddressSanitizer', 'A linker map alone'], 2, 'AddressSanitizer instruments accesses and tracks allocation boundaries.'),
      q('A fix makes one crash disappear. What completes the repair?', ['Delete the failing artifact so future executions cannot reproduce it', 'Turn off optimization in every release build and stop investigation', 'Catch every operating-system signal and return a successful exit status', 'Add a regression and rerun relevant analyzers'], 3, 'Durable evidence guards the invariant and checks for related undefined behavior.'),
    ]
  },
  'files-syscalls': {
    practice: lines('Implement `write_all(fd, buf, n)` from the complete solution and trace mocked write returns of 3, -1/EINTR, and 2 for a five-byte buffer.', 'Expected result: offset advances to 3, remains 3 after EINTR, then reaches 5; success is reported only after all bytes transfer.'),
    solution: lines(
      '```c',
      '#include <errno.h>',
      '#include <stddef.h>',
      '#include <unistd.h>',
      'int write_all(int fd, const void *buffer, size_t length) {',
      '    const unsigned char *bytes = buffer;',
      '    size_t offset = 0;',
      '    while (offset < length) {',
      '        ssize_t written = write(fd, bytes + offset, length - offset);',
      '        if (written > 0) { offset += (size_t)written; continue; }',
      '        if (written < 0 && errno == EINTR) continue;',
      '        return -1;',
      '    }',
      '    return 0;',
      '}',
      '```',
      'The next call uses `length - offset`, preventing a read beyond the source. This contract treats a zero write before completion as failure rather than spinning forever.'
    ),
    questions: [
      q('A write of 100 requested bytes returns 40. What should robust stream code do?', ['Continue with the remaining 60 bytes', 'Assume all bytes arrived', 'Repeat the original 100 bytes', 'Close and report success'], 0, 'A positive short write is progress, not completion.'),
      q('Why create a replacement file in the target directory?', ['To increase the process pointer width while the file is open', 'To permit same-filesystem atomic rename', 'To disable all filesystem permission checks during replacement', 'To avoid checking short writes and close failures on the new file'], 1, 'Atomic rename requires compatible filesystem semantics and the same filesystem.'),
      q('A child unexpectedly retains a sensitive descriptor. What control was missing?', ['A larger I/O buffer sized to the underlying filesystem block', 'A filename extension identifying the descriptor as private state', 'Close-on-exec or explicit descriptor closure', 'A second directory entry pointing at the same open file description'], 2, 'Descriptor inheritance must be deliberately restricted across execution.'),
      q('After fsyncing a new file and renaming it, what may strict crash durability also require?', ['Reopening standard input before the process reports success', 'Changing the process priority so the kernel flush thread runs first', 'Clearing every filesystem cache page through an unrelated mapping', 'Synchronizing the containing directory'], 3, 'The directory entry change may need its own durability barrier.'),
    ]
  },
  'processes-signals': {
    practice: lines('Trace `producer | consumer`: list every pipe end held by parent and children after creation, then cross out each unused end. Explain when consumer sees EOF.', 'Expected result: consumer sees EOF only after every descriptor referring to the write end is closed.'),
    solution: lines('Producer keeps write, consumer keeps read, and the parent closes both after spawning. Reap both children. If consumer waits forever after producer exits, find a retained writer in the parent or another child.'),
    questions: [
      q('When does a pipe reader observe EOF?', ['After all write-end references close', 'After one writer flushes', 'When its buffer becomes briefly empty', 'Immediately after fork'], 0, 'An empty pipe is not EOF while any writer descriptor remains open.'),
      q('What prevents a terminated child becoming a zombie?', ['Closing stdin', 'Collecting its status with wait', 'Ignoring its exit code', 'Sending another signal'], 1, 'The parent must reap child status from the kernel.'),
      q('Why pass an executable and argv without a shell?', ['It allocates less stack always', 'It makes signals synchronous', 'It avoids shell interpretation of untrusted text', 'It guarantees the child succeeds'], 2, 'Direct argv construction removes a command-injection parser from the boundary.'),
      q('Which signal-handler strategy is generally safe?', ['Allocate a report object', 'Lock the application mutex', 'Format a detailed log', 'Set a flag or write to a self-pipe'], 3, 'Signal context permits only a restricted async-signal-safe operation set.'),
    ]
  },
  'threads-sync': {
    practice: lines('Trace a capacity-one queue with producer P and consumer C. P waits while full; C removes the item, signals not-full, and releases the mutex; P rechecks the predicate before inserting.', 'Expected result: every condition wait is inside a while loop protected by the same mutex as queue state.'),
    solution: lines('The predicate, not the wakeup, authorizes progress. A wake can be spurious or another producer can win first. If `if` replaces `while`, a woken producer may write into a still-full queue.'),
    questions: [
      q('What makes two unsynchronized accesses a C data race?', ['They conflict, overlap, and at least one writes', 'They occur in different functions', 'They use the same variable name', 'They run on separate CPUs only'], 0, 'Conflicting concurrent access without required synchronization is a data race and undefined behavior.'),
      q('Why wait on a condition variable inside a loop?', ['To consume more CPU', 'To recheck the protected predicate', 'To make the mutex recursive', 'To impose thread priority'], 1, 'Wakeups do not guarantee that the condition remains true when the waiter reacquires the lock.'),
      q('Does volatile make a shared counter thread-safe?', ['Yes, whenever the program design promises exactly one writer thread', 'Yes, whenever every participating thread executes on the same CPU', 'No, it supplies neither atomicity nor synchronization', 'Only when the compiler enables an optimized release configuration'], 2, 'Volatile has special observation roles but does not establish inter-thread ordering.'),
      q('What reduces multi-lock deadlock risk?', ['Acquire the required locks in a fresh random order on each operation', 'Sleep between acquisitions so other threads can eventually make progress', 'Hold every acquired lock across blocking network and filesystem calls', 'Define and enforce one global lock order'], 3, 'A consistent acyclic acquisition order removes circular wait among those locks.'),
    ]
  },
  'atomics-memory-model': {
    practice: lines('Trace publication: writer initializes `config.x=7`, then release-stores `ready=true`; reader acquire-loads ready, then reads x. Draw the synchronizes-with and happens-before edges.', 'Expected result: observing the release through the acquire makes the preceding initialization visible to that reader.'),
    solution: lines('The release operation publishes prior writes; the matching acquire that reads it imports them. A relaxed ready load would keep the flag atomic but would not establish this visibility edge.'),
    questions: [
      q('What does an atomic relaxed increment guarantee?', ['Atomic modification of that counter', 'Publication of nearby objects', 'A global order for all memory', 'Fair access among threads'], 0, 'Relaxed order preserves atomicity for the object without ordering unrelated data.'),
      q('Which pairing can publish initialized immutable data?', ['Relaxed store and plain load', 'Release store and observing acquire load', 'Two volatile accesses', 'A sleep and a compiler barrier'], 1, 'The observing acquire synchronizes with the release and imports prior initialization.'),
      q('Why is lock-free not equivalent to safe reclamation?', ['Atomic objects cannot hold or exchange any pointer representation', 'Threads using lock-free structures cannot dynamically allocate nodes', 'Readers may retain a node after another thread frees it', 'Mutex destruction automatically reclaims every protected heap object'], 2, 'Object lifetime requires a separate protocol such as epochs or hazard pointers.'),
      q('When is a mutex the preferable starting point?', ['Only when a program can prove that it will execute on one thread', 'When performance requirements explicitly allow every operation to block forever', 'When the selected C compiler does not provide any integer types', 'When the protocol lacks a proven atomic ordering argument'], 3, 'Mutexes express ownership and ordering more directly than an improvised atomic protocol.'),
    ]
  },
  'os-memory-filesystems': {
    practice: lines('Compare a 1 GiB mapped file with a process that touches only 4 KiB. Record virtual mapping size and resident bytes, then predict the first access behavior.', 'Expected result: virtual size can be 1 GiB while resident growth is near the touched pages; first access may fault pages into memory.'),
    solution: lines('Address-space reservation and resident physical pages are different measures. Read process maps and fault counters. If monitoring calls this a 1 GiB physical leak, it has confused virtual range with residency.'),
    questions: [
      q('A process maps a large file but reads one page. Which metric can remain much smaller?', ['Resident memory', 'Virtual address range', 'File length', 'Mapping length'], 0, 'Only touched or otherwise resident pages need physical memory.'),
      q('What can happen on the first access to a valid lazy mapping?', ['The file is deleted', 'A page fault populates the mapping', 'The pointer changes type', 'The process forks'], 1, 'The kernel services the fault by resolving the mapping to a page.'),
      q('An open file is unlinked. What commonly remains true until close?', ['Its removed path continues resolving to that file for every new opener', 'Its deleted directory entry grows to store the retained file data', 'The open description can access its data', 'Every other hard link to the same inode disappears at the same time'], 2, 'Removing one name does not invalidate an existing open file description.'),
      q('Why benchmark cold and warm file access separately?', ['To change the integer width used by the benchmark counters', 'To validate transport identity for every local file operation', 'To avoid recording any page faults in either benchmark distribution', 'Cache state can dominate observed latency'], 3, 'Warm-cache results can hide storage and fault costs seen by cold workloads.'),
    ]
  },
  'sockets-protocols': {
    practice: lines('Parse a frame with a two-byte big-endian length followed by payload. Trace chunks `00`, then `03 61`, then `62 63` without treating receive calls as messages.', 'Expected result: buffer until the two-byte header and then three payload bytes are complete; emit exactly `abc`.'),
    solution: lines('Maintain parser state and byte counts across reads. Decode length as 3, reject it above a fixed cap, and consume exactly one frame before parsing any remaining bytes. If the first chunk is rejected as truncated, the parser confused temporary partial input with EOF.'),
    questions: [
      q('What boundary does a TCP receive preserve?', ['Only an ordered byte stream', 'Each sender call as one message', 'Every application record', 'A fixed packet size'], 0, 'Stream transport does not expose application message boundaries.'),
      q('What should happen before allocating a received length?', ['Trust authenticated peers fully', 'Validate it against a hard maximum', 'Convert it to signed and continue', 'Wait without a deadline'], 1, 'A bounded field prevents attacker-controlled memory use.'),
      q('TLS encryption is active but the hostname is not verified. What is missing?', ['Application payload compression negotiated after the secure connection', 'Length-prefix framing for every message carried by the byte stream', 'Peer identity authentication', 'Network byte ordering for each fixed-width integer field'], 2, 'Encryption without verifying the intended peer can protect a connection to an attacker.'),
      q('A PUT times out after the server may have committed. What supports safe retry?', ['A new random payload', 'A larger socket buffer', 'A different hostname', 'A durable idempotency key'], 3, 'The server can return the stored outcome for the same logical operation.'),
    ]
  },
  'performance-security': {
    practice: lines('Benchmark lookup latency over 1, 10,000, and 1,000,000 records, then fuzz the binary length parser under sanitizers. Record median, p99, allocations, and any invalid access.', 'Expected result: performance evidence includes scale and tails, while malformed lengths never bypass overflow and bounds checks.'),
    solution: lines('Hold workload and build flags constant, collect distributions, and profile the slow scale before changing code. Keep checked arithmetic and parser caps during optimization. If throughput rises only after removing validation, the change violated the security contract.'),
    questions: [
      q('Which result can reveal rare slow requests?', ['A tail percentile such as p99', 'Only the fastest request', 'Source line count', 'Compiler elapsed time'], 0, 'Tail percentiles describe the slower portion hidden by a median.'),
      q('What should precede a low-level optimization?', ['Removing all checks', 'A measured bottleneck and hypothesis', 'Changing many variables together', 'Disabling regression tests'], 1, 'Measurement identifies where work matters and supplies a comparison.'),
      q('What does address-space randomization primarily do?', ['Correct a buffer overflow', 'Validate length fields', 'Raise exploitation difficulty', 'Prove constant-time behavior'], 2, 'A mitigation can impede exploitation but does not remove the memory bug.'),
      q('Which parser operation needs an overflow check?', ['Writing a source comment that describes the selected wire format', 'Naming a local variable after the parsed protocol field', 'Closing standard output after an unrelated diagnostic command', 'Adding header and attacker-provided payload lengths'], 3, 'Wrapped size calculations can defeat later bounds and allocation checks.'),
    ]
  },
  'capstone-systems': {
    practice: lines('Create one failure matrix row for each capstone: shell pipeline retains a writer, allocator size addition overflows, and server crashes after commit before acknowledgement. State trigger, evidence, cleanup, and regression.', 'Expected result: each failure has a deterministic injection and an observable invariant, not merely “does not crash”.'),
    solution: lines('For the shell, assert EOF after parent closure; for the allocator, reject overflowing size before mutation; for the server, restart and replay the idempotency key to recover the committed result. If a case cannot be triggered on demand, add an injectable seam before claiming recovery.'),
    questions: [
      q('What should every capstone resource ledger identify?', ['Owner, lifetime, release, and failure evidence', 'Only the local variable name used by the first implementation', 'Only the allocation size observed in one successful execution', 'Only the happy-path caller that first acquires the resource'], 0, 'Resource correctness requires explicit creation, ownership, valid states, and cleanup.'),
      q('How should an allocator capstone test allocation failure?', ['Wait for real memory exhaustion', 'Inject failure at chosen allocation counts', 'Disable all allocations', 'Assume malloc succeeds'], 1, 'Deterministic injection reaches each cleanup path reproducibly.'),
      q('Which server case tests unknown remote outcome?', ['A malformed request before parsing', 'A clean connection close before send', 'Commit followed by lost acknowledgement', 'A successful cached read'], 2, 'The client times out without knowing whether the mutation committed.'),
      q('What is persuasive final evidence for the toolkit?', ['One successful demonstration performed by its original developer', 'No visible compiler output after suppressing every warning category', 'A large executable containing all optional debugging information', 'Reproducible build, injected failures, recovery, and regression results'], 3, 'Integrated evidence shows the projects survive their defined operational boundaries.'),
    ]
  }
}
