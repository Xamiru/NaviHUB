import type { LearningUnit } from '../learningEvidence'

export const WEB_SYSTEMS_PRACTICE: Record<string, LearningUnit> = {
  'full-stack-web': {
    id: 'full-stack-web',
    title: 'Full-stack web: applied evidence check',
    body: `# Before you begin

Complete the course lessons through server APIs, state, and testing. These exercises check whether you can trace data across browser and server boundaries. Enter only the exact short output requested; capitalization and punctuation matter.

## Worked example

Given a route \`/items?page=2#reviews\`, an HTTP server receives the path and query but not the fragment. If asked for the request target, enter:

\`/items?page=2\`

The fragment belongs to browser navigation state. A wrong answer containing \`#reviews\` shows that the client/server boundary needs review.`,
    practice: [
      {
        id: 'web-practice-stale-result',
        prompt: 'Two searches increment a generation counter. Cat starts with generation 1; Dog starts with generation 2. Dog resolves first, then Cat resolves. The UI commits a result only when its captured generation equals the current generation. Enter the one word rendered: `Cat` or `Dog`.',
        answers: ['Dog'],
        explanation: 'The current generation is 2. Dog captured 2 and commits; Cat captured 1 and is discarded as stale.'
      },
      {
        id: 'web-practice-http-trace',
        prompt: 'A local API receives valid JSON for `POST /issues`, creates issue 41, and exposes it at `/issues/41`. Enter the status and Location value in exactly this format: `STATUS PATH`.',
        answers: ['201 /issues/41'],
        explanation: '201 Created communicates resource creation, and Location identifies the created resource.'
      }
    ],
    transfer: [
      {
        id: 'web-transfer-layout-result',
        prompt: 'A grid uses `repeat(auto-fill, minmax(150px, 1fr))` in a 470px content box with no gap. What is the greatest whole number of 150px minimum tracks that fit? Enter only the integer.',
        answers: ['3'],
        explanation: 'Three minimum tracks need 450px and fit; four would need 600px.'
      },
      {
        id: 'web-transfer-auth-result',
        prompt: 'This API contract uses 403 for an authenticated subject who lacks ownership. User A requests `DELETE /notes/9`; note 9 belongs to user B. Enter the response exactly as `STATUS WORD`.',
        answers: ['403 Forbidden'],
        explanation: 'The subject is authenticated but is not authorized for that protected action, and this exercise explicitly defines the API contract as 403.'
      }
    ]
  },
  'computer-systems-c': {
    id: 'computer-systems-c',
    title: 'Computer systems and C: applied evidence check',
    body: `# Before you begin

Complete the lessons through pointers, robust I/O, concurrency, and protocols. Work with the exact widths and assumptions stated in each exercise; C behavior cannot be inferred safely when a precondition is missing. Enter only the requested output.

## Worked example

For unsigned 8-bit arithmetic, \`254 + 3\` is reduced modulo 256. The mathematical sum is 257, so the stored result is:

\`1\`

This rule applies to unsigned values of the specified width. Do not generalize it to signed overflow, which is not a wrapping contract in C.`,
    practice: [
      {
        id: 'systems-practice-endian-bytes',
        prompt: 'Store the 16-bit value `0x4A2B` at addresses 100 and 101 on a little-endian machine. Enter the two bytes in increasing-address order exactly as `HH HH`.',
        answers: ['2B 4A'],
        explanation: 'Little endian places the least-significant byte 2B at the lower address, followed by 4A.'
      },
      {
        id: 'systems-practice-short-write',
        prompt: 'A `write_all` loop must send 9 bytes. Its first write returns 4 and its second returns 3. Enter the remaining byte count as one integer.',
        answers: ['2'],
        explanation: 'Seven bytes have transferred successfully, so the loop advances its offset and still owes two bytes.'
      }
    ],
    transfer: [
      {
        id: 'systems-transfer-pointer-trace',
        prompt: 'Given `int a[4] = {3, 6, 9, 12}; int *p = a + 2;`, enter `p - a` followed by `*p` exactly as `INDEX VALUE`.',
        answers: ['2 9'],
        explanation: 'Pointer subtraction within the same array counts elements. a+2 selects the third element, whose value is 9.'
      },
      {
        id: 'systems-transfer-frame-trace',
        prompt: 'A protocol frame begins with a two-byte big-endian payload length. The header bytes are `00 05`, and the receiver currently has 3 payload bytes. Enter the number of additional payload bytes required as one integer.',
        answers: ['2'],
        explanation: 'The header declares five payload bytes. Three are buffered, so the parser must wait for two more without treating the receive boundary as a frame boundary.'
      }
    ]
  }
}
