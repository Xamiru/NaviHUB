import type { ProgQuestion } from './types'

type AppliedLesson = { practice: string; solution: string; questions: ProgQuestion[] }

const lines = (...parts: string[]) => parts.join('\n')
const q = (prompt: string, options: string[], correct: number, explain: string) =>
  ({ prompt, options, correct, explain })

export const FULL_STACK_WEB_APPLIED: Record<string, AppliedLesson> = {
  'web-platform': {
    practice: lines(
      'Create `server.mjs` from the complete solution below. Run `node server.mjs`, then in a second terminal run `curl -i "http://localhost:4173/library?status=watching#cast"`. Annotate the request target, status, content type, cache policy, and body.',
      'Expected result: the server prints `/library?status=watching`; the fragment never reaches it. Curl prints status 200, the declared HTML type and cache rule, then a complete HTML document.'
    ),
    solution: lines(
      '```js',
      "import { createServer } from 'node:http'",
      '',
      'const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Library</title></head><body><main><h1>Library</h1><p>Local response</p></main></body></html>`',
      'createServer((request, response) => {',
      '  console.log(request.url)',
      "  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' })",
      '  response.end(html)',
      '}).listen(4173, () => console.log("http://localhost:4173"))',
      '```',
      'Trace: `URL -> local address -> TCP connection -> GET target -> 200 headers -> HTML bytes -> DOM -> layout -> paint`. Stop with Ctrl+C. If the browser displays tags, compare the actual Content-Type with `text/html`; if the server omits `#cast`, that confirms the fragment is browser-only state.'
    ),
    questions: [
      q('A URL is `http://localhost:4173/a?q=cat#cast`. Which part is absent from the HTTP request target?', ['The fragment `cast`', 'The path `/a`', 'The query `q=cat`', 'The authority and port'], 0, 'Fragments are interpreted by the client and are not transmitted in the HTTP request.'),
      q('A response body contains HTML, but the browser displays the tags literally. Which header is the first useful check?', ['Cache policy', 'Content-Type', 'Accept-Language', 'Referrer-Policy'], 1, 'A text/plain content type tells the browser not to parse the body as HTML.'),
      q('The initial HTML loads, but one stylesheet is rejected as mixed content. What is the sound repair?', ['Disable certificate checks for the full browsing session', 'Inline every stylesheet regardless of its cache behavior', 'Serve that stylesheet from an HTTPS URL on the protected origin', 'Retry loading the insecure resource until one browser version accepts it'], 2, 'An HTTPS page must load active resources through an allowed secure origin.'),
      q('Which trace best isolates a blank-page failure?', ['Change the framework and rebuild every route before collecting evidence', 'Clear every browser and intermediary cache before inspecting evidence', 'Add random render delays throughout the component tree', 'Check response, console, DOM, and computed layout in order'], 3, 'Evidence at successive protocol and rendering boundaries identifies the earliest failure.'),
    ]
  },
  'semantic-html': {
    practice: lines(
      'Create a media detail document using only HTML: navigation, one page heading, cover, facts, cast links, and a progress form. Tab through it with CSS disabled.',
      'Expected result: focus reaches links and form controls in reading order; the cover has useful alternative text or an empty alternative when adjacent text already names it.'
    ),
    solution: lines(
      '```html',
      '<!doctype html>',
      '<html lang="en"><head><meta charset="utf-8"><title>Signal — Library</title></head>',
      '<body><header><nav aria-label="Primary"><a href="/library">Library</a></nav></header>',
      '<main><h1>Signal</h1>',
      '<img src="cover.jpg" alt="" width="160" height="240">',
      '<dl><dt>Year</dt><dd>2024</dd><dt>Status</dt><dd>Watching</dd></dl>',
      '<form><label for="progress">Episodes watched</label>',
      '<input id="progress" name="progress" type="number" min="0" max="12" aria-describedby="progress-help">',
      '<p id="progress-help">Enter 0 through 12.</p><button type="submit">Save progress</button></form>',
      '<section><h2>Cast</h2><ul><li><a href="/people/aya">Aya Mori</a></li></ul></section>',
      '<section><h2>Related titles</h2><ul><li><a href="/media/2">Signal Zero</a></li></ul></section>',
      '</main></body></html>',
      '```',
      'The empty alt avoids repeating the adjacent title; change it to meaningful text if the cover conveys unique information. Tab order follows source order. If the progress name is missing, verify that `for="progress"` exactly matches the input ID.'
    ),
    questions: [
      q('A card opens another page when activated. Which element supplies the correct behavior?', ['An anchor with a valid href', 'A div with a click handler and tabindex', 'A span with button role', 'A heading with tabindex'], 0, 'Navigation belongs to an anchor, which provides link semantics and keyboard behavior.'),
      q('A numeric input has nearby text reading Progress, but no programmatic association. What fixes its name?', ['Add a descriptive placeholder that vanishes after the user enters a value', 'Connect its visible label with matching `for` and `id` values', 'Increase the visible text weight and contrast', 'Put visible text after the complete form'], 1, 'A connected label gives the control a durable accessible name.'),
      q('A cover repeats the title printed immediately beside it and adds no information. Which alt is appropriate?', ['The filename', 'The words image of', 'An empty alt attribute', 'No alt attribute at all'], 2, 'An empty alternative marks a redundant image as decorative while preserving valid image semantics.'),
      q('A two-column cast layout reads in a confusing order with CSS removed. What should change?', ['Add an ARIA label to every cast member and surrounding container', 'Set positive tabindex values across all interactive cast elements', 'Duplicate the entire cast list and visually hide a second synchronized copy', 'Make the DOM source order logical before styling it into visual columns'], 3, 'Reading and focus order should follow meaningful DOM order independently of layout.'),
    ]
  },
  'css-cascade': {
    practice: lines(
      'Predict the color, then verify it in a local HTML file: `.card { color: var(--ink); }`, `.danger { color: crimson; }`, and `<p class="card danger">`. Put both rules in the same layer, then reverse their source order.',
      'Expected result: equal-specificity rules are resolved by source order; reversing them reverses the winning declaration.'
    ),
    solution: lines(
      'Both selectors have specificity 0-1-0. The later declaration wins within the same origin and layer. Inspect the crossed-out rule in computed styles. If adding `!important` appears necessary, first find an unexpected layer, specificity, or source-order boundary.'
    ),
    questions: [
      q('Two same-layer class rules set `color` with equal specificity. Which one wins?', ['The rule appearing later in source order', 'The alphabetically first class selector', 'The rule declaring the fewest properties', 'The class listed first in the HTML attribute'], 0, 'Source order breaks a tie after origin, layer, importance, and specificity match.'),
      q('A dark theme changes surfaces and text but preserves component structure. What is the cleanest design?', ['Duplicate every component style beneath a theme selector', 'Override the shared semantic custom-property values for the theme', 'Add explicit inline color declarations to every rendered component node', 'Increase all theme selector specificity with element IDs'], 1, 'Semantic tokens let a theme replace values without duplicating layout and state rules.'),
      q('A translated button label clips vertically. Which original choice is the likely cause?', ['Logical padding', 'Border-box sizing', 'A fixed component height', 'A low-specificity selector'], 2, 'Fixed heights often fail when text wraps or metrics change.'),
      q('Computed styles show an unexpected winning selector. What is the next useful action?', ['Add a global important rule that overrides every component declaration', 'Raise each component z-index until the visual result changes', 'Rename the component and all related class selectors', 'Inspect the declaration’s cascade layer, specificity, and source order'], 3, 'The cascade is diagnosable; identify the winning boundary before changing it.'),
    ]
  },
  'layout-responsive': {
    practice: lines(
      'Build a cover grid with `grid-template-columns: repeat(auto-fill, minmax(min(12rem, 100%), 1fr))`. Test widths of 180, 420, and 900 pixels and increase text zoom to 200 percent.',
      'Expected result: tracks collapse to one column when needed, expand without a device-name breakpoint, and titles wrap without pushing actions outside the card.'
    ),
    solution: lines(
      'The min expression prevents a 12rem minimum from overflowing a narrower container. Keep title and actions in DOM reading order and let them wrap. If horizontal scroll appears, inspect intrinsic image width and unbreakable text before adding overflow clipping.'
    ),
    questions: [
      q('Cards must fill rows and wrap as space permits. Which layout model fits the two-dimensional tracks?', ['CSS Grid with flexible auto-filling row and column tracks', 'Absolute positioning with fixed coordinates calculated for every card', 'Floats with manually calculated fixed widths', 'A transformed canvas with painted labels'], 0, 'Grid directly models coordinated rows and columns with flexible tracks.'),
      q('A component changes layout based on its sidebar width, not the viewport. Which query fits?', ['A print query', 'A container query', 'A hover query', 'A fixed user-agent check'], 1, 'Container queries respond to the component’s available containing space.'),
      q('CSS visually puts the last action first, but keyboard focus follows source order. What is the defect?', ['The image lacks a suitable responsive loading policy', 'The breakpoint activates at an unnecessarily wide container', 'The visual sequence and keyboard interaction sequence disagree', 'The grid declares more columns than its content requires'], 2, 'Large visual reordering can make keyboard and reading sequences misleading.'),
      q('A layout works at common widths but clips at 200 percent zoom. What is the best response?', ['Block browser zoom whenever the viewport becomes too narrow', 'Hide the clipped action whenever zoom changes the breakpoint', 'Reduce all text until every control fits on a single line', 'Let variable content wrap and choose a content-driven breakpoint'], 3, 'Responsive behavior must include text enlargement and actual content pressure.'),
    ]
  },
  'javascript-language': {
    practice: lines(
      'Implement `organizeMedia(items, query)` to filter case-insensitively by title or tag, sort by year with missing years last and title as a tie-breaker, and group results by status without mutating the input. Use the complete solution below, then add a record with a missing title to test its guard.',
      'Expected result for the supplied data and query `space`: the Watching group contains `Orbit`; the Planned group contains `Nova`; the original array still begins with Nova.'
    ),
    solution: lines(
      '```js',
      'function organizeMedia(items, query) {',
      '  const needle = query.trim().toLocaleLowerCase()',
      '  const matches = items.filter((item) => {',
      "    const title = typeof item.title === 'string' ? item.title : ''",
      '    const tags = Array.isArray(item.tags) ? item.tags : []',
      '    return title.toLocaleLowerCase().includes(needle) ||',
      '      tags.some((tag) => String(tag).toLocaleLowerCase().includes(needle))',
      '  })',
      '  const sorted = [...matches].sort((a, b) =>',
      '    (a.year ?? Infinity) - (b.year ?? Infinity) ||',
      "    String(a.title ?? '').localeCompare(String(b.title ?? ''))",
      '  )',
      '  const groups = new Map()',
      '  for (const item of sorted) {',
      "    const status = item.status ?? 'Unknown'",
      '    groups.set(status, [...(groups.get(status) ?? []), item])',
      '  }',
      '  return groups',
      '}',
      'const media = [',
      "  { title: 'Nova', year: null, status: 'Planned', tags: ['space'] },",
      "  { title: 'Orbit', year: 1999, status: 'Watching', tags: ['space'] },",
      "  { title: 'Garden', year: 2001, status: 'Watching', tags: ['drama'] },",
      ']',
      "console.log(organizeMedia(media, 'space'))",
      "console.log(media[0].title) // Nova",
      '```',
      'The copied array protects caller order; records remain shared because the function never mutates them. If Nova moves in the input, sorting happened on `items` or `matches` was aliased unexpectedly.'
    ),
    questions: [
      q('What does `const b = a; b.done = true` do when `a` is an object?', ['It changes the one shared object observed through both `a` and `b` bindings', 'It clones `a` before applying the property write to that clone', 'It changes only the local binding while preserving the object', 'It throws because const makes every referenced property immutable'], 0, 'Object values are references; const prevents rebinding, not object mutation.'),
      q('Which implementation preserves an input array before sorting?', ['`items.sort(compare)`', '`[...items].sort(compare)`', '`items.reverse().sort(compare)`', '`items.splice(0).sort(compare)`'], 1, 'Sorting a copied array avoids reordering the caller’s array.'),
      q('Why is `0.1 + 0.2` unsuitable as an exact currency calculation?', ['Numbers lose all ordering when used in arithmetic expressions', 'Addition converts both operands to decimal strings before combining them', 'Binary floating point cannot exactly represent many decimals', 'JavaScript rounds every arithmetic result to the nearest whole integer'], 2, 'Many decimal fractions have repeating binary representations and acquire rounding error.'),
      q('A catch block ignores every exception and returns an empty list. What is the main risk?', ['The module and every dependent importer execute twice after failure', 'The closure permanently loses access to all lexical bindings', 'The returned array becomes immutable and cannot accept later records', 'A real failure is misreported as valid empty data'], 3, 'Swallowing errors collapses failure and legitimate empty state into one misleading result.'),
    ]
  },
  'dom-events': {
    practice: lines(
      'Save the complete solution as `delegation.html`. Activate Remove on an original row, use Add row, then remove the new row. There must remain exactly one click listener on the list.',
      'Expected result: new row buttons work without new listeners, while clicks on the list background do nothing.'
    ),
    solution: lines(
      '```html',
      '<button id="add" type="button">Add row</button>',
      '<ul id="rows"><li>Row 1 <button type="button" data-remove>Remove</button></li></ul>',
      '<script>',
      'const rows = document.querySelector("#rows")',
      'let next = 2',
      'rows.addEventListener("click", (event) => {',
      '  const button = event.target.closest("button[data-remove]")',
      '  if (!button || !rows.contains(button)) return',
      '  button.closest("li").remove()',
      '})',
      'document.querySelector("#add").addEventListener("click", () => {',
      '  const row = document.createElement("li")',
      '  row.append(`Row ${next++} `)',
      '  const button = document.createElement("button")',
      '  button.type = "button"; button.dataset.remove = ""; button.textContent = "Remove"',
      '  row.append(button); rows.append(row)',
      '})',
      '</script>',
      '```',
      'If clicking nested button content fails, inspect whether the handler used `event.target` directly instead of `closest`. In a component, retain the handler reference and remove it during teardown.'
    ),
    questions: [
      q('A form should validate and save when its button or Enter submits it. Which event should own the logic?', ['The form submit event', 'A document keydown event', 'The button mousedown event', 'The input blur event'], 0, 'Submit covers native form activation paths without recreating keyboard behavior.'),
      q('Why does delegated handling work for rows appended later?', ['Events are copied and attached individually to every newly inserted node', 'Bubbling reaches the existing ancestor listener', 'The browser reruns every listener registered before the insertion', 'Mutation observers automatically synthesize click events for new controls'], 1, 'Bubbling lets one ancestor observe activation from current and future descendants.'),
      q('Which update safely displays untrusted user text?', ['Assigning outerHTML', 'Calling insertAdjacentHTML', 'Assigning textContent', 'Building an inline handler string'], 2, 'textContent does not interpret the value as markup.'),
      q('After a modal closes, where should focus normally return?', ['The beginning of the document regardless of the prior task', 'The browser toolbar outside the application content', 'The last input in the modal even though the surface is closed', 'The control that opened it, if it still exists'], 3, 'Restoring focus preserves the user’s interaction context.'),
    ]
  },
  'async-web-apis': {
    practice: lines(
      'Copy the complete `search` function below. Inject a fake fetch where request A resolves after request B, call search for A and then B, and record which result reaches render.',
      'Expected result: when request A starts first but finishes after request B, only B updates the visible results.'
    ),
    solution: lines(
      '```js',
      'let generation = 0',
      'let activeController = null',
      'async function search(query, fetchImpl = fetch, render = console.log) {',
      '  const mine = ++generation',
      '  activeController?.abort()',
      '  const controller = new AbortController()',
      '  activeController = controller',
      '  try {',
      '    const url = new URL("http://localhost:4173/search")',
      '    url.searchParams.set("q", query)',
      '    const response = await fetchImpl(url, { signal: controller.signal })',
      '    if (!response.ok) throw new Error(`HTTP ${response.status}`)',
      '    const data = await response.json()',
      '    if (mine === generation) render(data)',
      '  } catch (error) {',
      '    if (error.name !== "AbortError" && mine === generation) throw error',
      '  }',
      '}',
      '```',
      'Abort saves work, while the generation check handles a response that completed just before cancellation. If a 404 is rendered as data, the explicit `response.ok` check was removed.'
    ),
    questions: [
      q('What does fetch normally do for an HTTP 404 response?', ['It resolves with `ok` false', 'It always rejects the promise', 'It retries automatically', 'It returns an empty success body'], 0, 'Fetch rejects for network-level failure, while HTTP status must be checked explicitly.'),
      q('Search B finishes before older search A. What prevents A replacing B?', ['A longer debounce alone', 'A request generation check', 'Promise.all on both requests', 'A second render timeout'], 1, 'A generation or identity check prevents stale completion from committing state.'),
      q('Why can retrying a timed-out POST duplicate an operation?', ['Promises execute every request body twice whenever cancellation is enabled', 'Abort converts the original request method from POST into GET', 'The server may have committed before the client timed out', 'HTTP changes the request body order after a client-side deadline'], 2, 'A timeout can leave the remote outcome unknown, so retries need idempotency.'),
      q('Promise.all rejects after one task fails. What happens to already-started siblings?', ['They are rolled back by the runtime to their original application state', 'They become synchronous and wait for the rejected promise to recover', 'They pause automatically until a new aggregate promise observes them', 'They continue unless separately cancelled'], 3, 'Promise aggregation does not cancel underlying operations.'),
    ]
  },
  'typescript-tooling': {
    practice: lines(
      'Treat parsed JSON as `unknown` and write a guard for `{ id: string, count: number }`. Test an absent field, a numeric id, and an extra field.',
      'Expected result: only values with the required property types enter typed application code; choose and document whether extra fields are accepted.'
    ),
    solution: lines(
      '```ts',
      'type Result = { id: string; count: number }',
      'function isResult(value: unknown): value is Result {',
      '  if (typeof value !== "object" || value === null) return false',
      '  const record = value as Record<string, unknown>',
      '  return typeof record.id === "string" &&',
      '    typeof record.count === "number" && Number.isFinite(record.count)',
      '}',
      'function parseResult(value: unknown): Result {',
      '  if (!isResult(value)) throw new Error("Invalid result payload")',
      '  return value',
      '}',
      '```',
      'This contract accepts extra fields but rejects absent or wrongly typed required fields. An assertion such as `value as Result` runs no checks; if malformed data crashes later, the trust boundary remained open.'
    ),
    questions: [
      q('After `const data: unknown = await response.json()`, what establishes its shape?', ['A runtime guard or schema', 'A type-only import generated from the remote service contract', 'A source map containing the original TypeScript module', 'A non-null assertion applied before reading its properties'], 0, 'Unknown external data becomes trustworthy only after runtime validation.'),
      q('Which type best models `{state:"loading"}` versus `{state:"ready", data:T}`?', ['A class with optional fields', 'A discriminated union', 'A record of any values', 'A string array'], 1, 'A discriminant permits exhaustive narrowing and keeps variant-specific data together.'),
      q('What does `payload as User` do at runtime?', ['It converts and validates every field in the source value', 'It removes every property absent from the declared interface', 'It performs no validation', 'It freezes the payload and its nested referenced objects'], 2, 'A type assertion changes the checker’s view, not the runtime value.'),
      q('Where should a database password used by a server be placed?', ['A public client build variable embedded in the downloaded bundle', 'A rendered data attribute attached to the root HTML element', 'A source-map comment published beside the production script', 'A server-only configuration boundary'], 3, 'Values shipped in a browser bundle are available to users and cannot be server secrets.'),
    ]
  },
  'accessibility-forms': {
    practice: lines(
      'Build a registration form with persistent labels, password requirements, an error summary, and field errors linked through `aria-describedby`. Submit it empty using only the keyboard.',
      'Expected result: focus moves once to the summary, its links reach invalid fields, entered non-secret values remain, and every error is expressed in text.'
    ),
    solution: lines(
      'Return structured field error codes, render a titled summary with anchors or focus actions, and connect each message ID to its control. Clear the password after a server rejection. If errors are announced on every keypress, delay validation until blur or submit and avoid noisy live regions.'
    ),
    questions: [
      q('Which form text must remain visible after the user begins typing?', ['The control label', 'Only the placeholder', 'Only the browser tooltip', 'The submit button title'], 0, 'A persistent label continues to identify the field after its value replaces a placeholder.'),
      q('Where must authorization-grade validation occur?', ['Only in CSS before the form becomes visible to the user', 'At the trusted server boundary', 'Only in browser code bundled for every untrusted client', 'Inside placeholder text that disappears during data entry'], 1, 'Client checks improve feedback, but untrusted clients can bypass them.'),
      q('An error border is red with no text or icon. What principle is violated?', ['Every form needs autofocus', 'Every field needs autocomplete off', 'Color is the only error signal', 'Inputs must use custom roles'], 2, 'State must be perceivable without relying on color alone.'),
      q('After a long invalid submission, what focus target best supports recovery?', ['A random invalid control', 'The browser address bar', 'The submit button again', 'A linked error summary'], 3, 'A focused summary explains the result and provides an ordered route to each field.'),
    ]
  },
  'react-components': {
    practice: lines(
      'Implement a counter whose document title mirrors `count`. Derive the displayed doubled value during render and update only the title in an effect with `[count]`.',
      'Expected result: one state update produces one coherent render; no second state variable is needed for the doubled value.'
    ),
    solution: lines(
      'Use `const doubled = count * 2` in render and `useEffect(() => { document.title = String(count) }, [count])`. If the component loops, the effect is probably setting a dependency on every run. Effects synchronize external systems; ordinary derivation belongs in render.'
    ),
    questions: [
      q('A value is exactly `price * quantity`. Where should a component compute it?', ['During render from props or state', 'In a mount-only effect', 'In a second synchronized state', 'In a global mutable variable'], 0, 'Pure derived values need no independent lifecycle or synchronization.'),
      q('An effect subscribes to a socket. What must its cleanup do?', ['Reset every component state', 'Unsubscribe the same listener', 'Force another render', 'Delete the socket library'], 1, 'Cleanup must reverse the external subscription to prevent leaks and duplicate delivery.'),
      q('Why is calling `setState` unconditionally during render invalid?', ['Props become mutable across every parent and child render', 'JSX loses its static element and attribute type information', 'It triggers another render repeatedly', 'Browser events stop propagating through the component subtree'], 2, 'A render-time state write schedules more rendering and can create an infinite loop.'),
      q('List rows preserve local state after reordering only when keys are what?', ['Their current array indexes', 'Fresh random values', 'Their displayed positions', 'Stable identities for the records'], 3, 'Stable semantic keys let React associate prior component state with the same record.'),
    ]
  },
  'state-routing': {
    practice: lines(
      'Model `/library?status=watching&page=2` so a reload reconstructs the same filter. Parse missing or invalid page values to a documented default and update history when the user changes filters.',
      'Expected result: copied URLs reproduce the view, Back restores the earlier filter, and an invalid negative page cannot enter application state.'
    ),
    solution: lines(
      'Treat URL parameters as the shareable source, parse strings into a validated state object, and serialize changes canonically. Use replace for transient normalization and push for user navigation. If Back requires several clicks after typing, avoid pushing a history entry for every keystroke.'
    ),
    questions: [
      q('Which state belongs naturally in a URL query?', ['A shareable library filter', 'A database password', 'A DOM node reference', 'A pending AbortController'], 0, 'Shareable, reloadable view selection is appropriate URL state.'),
      q('What should a route loader do with `page=-9`?', ['Trust it as a number', 'Parse and reject or normalize it', 'Pass it directly to SQL', 'Store it as authentication state'], 1, 'URL input is untrusted text and must be validated against domain rules.'),
      q('Two components keep separate copies of the same selected media ID. What risk follows?', ['The bundle cannot compile', 'Routes lose all parameters', 'The copies can diverge', 'The browser disables events'], 2, 'Duplicated ownership creates synchronization work and contradictory views.'),
      q('A data route is left before its request completes. What should happen?', ['Commit its result to the new route', 'Block all later navigation', 'Retry it forever', 'Cancel or ignore the obsolete result'], 3, 'Route lifecycle must prevent stale work from writing into a different view.'),
    ]
  },
  'server-api': {
    practice: lines(
      'Design `POST /items` with a JSON size cap and `GET /items/:id`. Write exact success and failure examples, including malformed JSON, validation failure, missing item, and an unexpected internal failure.',
      'Expected result: each outcome has one status, stable machine-readable error code, and no stack trace or secret in the response.'
    ),
    solution: lines(
      'A defensible contract uses 201 with a location for creation, 400 for malformed syntax, 422 for valid JSON that violates the input schema, 404 for absence, and 500 with an opaque incident ID for unexpected failure. If huge bodies are parsed before rejection, enforce limits in the stream or server layer.'
    ),
    questions: [
      q('What status best describes a newly created resource?', ['201 Created', '204 No Content with a body', '301 Moved Permanently', '404 Not Found'], 0, '201 communicates successful creation and may identify the new resource location.'),
      q('Where should a request body size limit be enforced?', ['After writing to the database', 'Before or while consuming the body', 'Only in client JavaScript', 'Inside response serialization'], 1, 'Early bounded consumption prevents oversized input from exhausting server resources.'),
      q('A client sends valid JSON with an impossible negative duration. Which response is coherent?', ['A success with a warning', 'A transport redirect', 'A structured validation error', 'A leaked database exception'], 2, 'The syntax parsed, but the domain schema rejected the value.'),
      q('Which detail belongs in a public 500 response?', ['The SQL query and values', 'The full stack trace', 'Environment variables', 'An opaque incident identifier'], 3, 'Clients need correlation without receiving sensitive implementation details.'),
    ]
  },
  'auth-data': {
    practice: lines(
      'Trace a login session: hash a password with a slow salted password hash, set a Secure HttpOnly SameSite cookie, rotate the session after login, and check ownership on `DELETE /notes/:id`.',
      'Expected result: knowing a note ID is insufficient; the delete succeeds only when the authenticated subject is authorized for that record.'
    ),
    solution: lines(
      'Store a verifier, never recoverable plaintext; look up an opaque session token through a protected digest; rotate at privilege change; and query the note under both note ID and owner ID. If changing the URL deletes another user’s note, authentication exists but object authorization is missing.'
    ),
    questions: [
      q('What should a password store contain?', ['A salted slow password hash', 'Reversible encrypted plaintext', 'The original password in logs', 'A fast unsalted digest'], 0, 'Purpose-built slow salted hashing limits damage when stored verifiers are exposed.'),
      q('Why rotate a session identifier after login?', ['To change the user password', 'To prevent fixation of a pre-login session', 'To disable cookie flags', 'To skip authorization checks'], 1, 'Rotation prevents an attacker-selected anonymous session from becoming authenticated.'),
      q('A user changes `/notes/7` to `/notes/8` and reads another user’s record. What failed?', ['Password hashing failed to protect the stored credential verifier', 'TLS negotiation accepted an unsupported transport cipher suite', 'Object-level authorization', 'JSON parsing accepted an unknown optional response property'], 2, 'Every object action must verify that the authenticated subject may access that object.'),
      q('Which cookie property blocks ordinary client-side script from reading a session token?', ['Path', 'Max-Age', 'SameSite', 'HttpOnly'], 3, 'HttpOnly withholds the cookie value from normal document scripts.'),
    ]
  },
  'testing-quality': {
    practice: lines(
      'Test a `transfer(from, to, amount)` domain function with an in-memory fake repository and test the HTTP adapter separately. Include zero, negative, insufficient funds, and a repository failure.',
      'Expected result: domain tests name invariant outcomes without a server, while one adapter test proves status and error-code translation.'
    ),
    solution: lines(
      'Assert balances and error variants at the domain seam; inject a repository that can fail deterministically. Then test that insufficient funds becomes the documented client error and unexpected storage failure becomes an opaque server error. If every test starts a browser, the design lacks a fast behavioral seam.'
    ),
    questions: [
      q('Which test most directly proves a transfer cannot create money?', ['A domain test checking both balances', 'A snapshot of the button', 'A test of CSS colors', 'A server startup smoke only'], 0, 'The invariant is expressed in domain state before and after the operation.'),
      q('What makes a fake repository useful in a domain test?', ['It duplicates production SQL exactly', 'It controls outcomes without real I/O', 'It guarantees production performance', 'It replaces all integration tests'], 1, 'A fake supplies deterministic collaborator behavior while keeping the domain test focused.'),
      q('A test passes only after arbitrary sleeps are increased. What is the likely issue?', ['The assertion checks an implementation detail instead of the observable contract', 'The fixture contains too few records to exercise the intended data boundary', 'The test depends on timing instead of an observable condition', 'The type checker rejects a deliberately unsupported runtime state'], 2, 'Polling or awaiting a meaningful state transition is more reliable than elapsed-time guesses.'),
      q('Which failure should retain a regression test?', ['Only syntax errors rejected before the program can execute', 'Only production outages affecting every active user', 'Only failures reported by users after a released deployment', 'Every fixed defect with a reproducible trigger'], 3, 'A minimized trigger prevents the known behavior from silently returning.'),
    ]
  },
  'performance-delivery': {
    practice: lines(
      'Measure a page at cold start with a 200 ms local server delay. Record response time, largest content paint, transferred script bytes, and interaction delay; then lazy-load a noncritical chart.',
      'Expected result: the chart bytes leave the initial path while primary content remains available and the measured target improves or stays within its budget.'
    ),
    solution: lines(
      'Keep the same workload and collect several runs rather than one lucky sample. Verify that lazy loading did not create a layout jump or inaccessible loading state. If the metric improves only with warm caches, report cold and warm distributions separately.'
    ),
    questions: [
      q('Which measurement best represents user-visible slow loading?', ['A distribution of a defined page milestone', 'One local function microbenchmark', 'Total source file line count', 'The fastest cached reload'], 0, 'A repeated user-facing milestone connects performance work to the actual experience.'),
      q('A release needs safe rollback. What artifact property is essential?', ['Mutable latest-only files', 'An immutable versioned build', 'A rebuild during rollback', 'Unrecorded server edits'], 1, 'A known immutable artifact permits deployment or rollback to exact tested bytes.'),
      q('Lazy loading a chart improves bytes but shifts the page after reading begins. What was missed?', ['The DNS record', 'The database schema', 'Layout stability', 'Password rotation'], 2, 'Performance changes must preserve visual stability and interaction quality.'),
      q('What should a health check prove?', ['Every dependency is always perfect', 'The process has never logged an error', 'The newest code is fastest', 'The instance can safely serve its intended traffic'], 3, 'Readiness should reflect whether routing traffic to the instance is safe.'),
    ]
  },
  'capstone-fullstack': {
    practice: lines(
      'Build a local issue tracker with list, create, edit, and close flows. Write one acceptance trace: create “Broken cover”, reload, edit its priority, close it, and verify the audit row and keyboard focus after each route change.',
      'Expected result: the same trace passes against a clean local database, invalid requests produce stable errors, and a restart preserves committed work.'
    ),
    solution: lines(
      'Define the issue and audit schemas, API examples, authorization rule, page landmarks, focus transitions, and error states before implementation. Automate the acceptance trace plus unit checks for transitions and integration checks for persistence. Troubleshoot from the earliest failed boundary: request, validation, transaction, response, cache, render, or focus.'
    ),
    questions: [
      q('What is the strongest first capstone milestone?', ['One complete vertical create-and-read slice', 'Every database table with no UI', 'A polished empty dashboard', 'All dependencies installed globally'], 0, 'A thin vertical slice exposes contract and integration mistakes early.'),
      q('A retry follows a lost create response. What prevents duplicate issues?', ['A longer client timeout', 'An idempotency key with a stored result', 'A random delay before retry', 'A second submit button'], 1, 'The server can recognize the same logical request and return its prior outcome.'),
      q('Which capstone evidence demonstrates accessibility beyond an automated scan?', ['A detailed bundle-size report grouped by route and dependency', 'A complete database backup restored on a clean local machine', 'A keyboard and assistive-technology task trace', 'A server CPU profile captured during representative requests'], 2, 'Manual task completion covers focus, names, order, and announcements that scans miss.'),
      q('When is the capstone operationally complete?', ['After one happy-path demo performed by the original developer on their machine', 'When all application code has been combined into one source module', 'When compiler and runtime warnings are hidden from the operator', 'When another operator can build, diagnose, restore, and verify it'], 3, 'Operation and recovery evidence complete the system, not just feature behavior.'),
    ]
  }
}
