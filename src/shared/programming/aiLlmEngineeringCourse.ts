import type { ProgCourseDef } from './types'
import { masteryLesson as baseLesson } from './masteryCourse'
import type { ProgQuestion } from './types'

const q = (
  prompt: string,
  options: string[],
  correct: number,
  explain: string
): ProgQuestion => ({ prompt, options, correct, explain })

const correctOptions: Record<string, [string, string, string, string]> = {
  'AI system framing': [
    'Define the user task and fallback',
    'Measure user task success',
    'Future outcome data leaked',
    'When ordinary software suffices'
  ],
  'machine-learning foundations': [
    'Match the future population',
    'Compare weighted validation loss',
    'Accuracy hid zero recall',
    'Use a new sequestered test set'
  ],
  'transformer architecture': [
    'Fitted vector transformations',
    'About four times more values',
    'Only greater internal weight',
    'Trace every tensor shape'
  ],
  'tokens and embeddings': [
    'Measure the deployed tokenizer',
    'Store source and scope metadata',
    'Neither agreement nor permission',
    'A frozen judged query set'
  ],
  'model inference': [
    'Candidates reaching cumulative p',
    'Task-specific frozen evaluation',
    'No cross-version guarantee',
    'A truncated result, invalid for structured publication'
  ],
  'prompt and context design': [
    'A probabilistic task and evidence specification',
    'Reject it or use the bounded repair policy',
    'Delimiters clarify roles but cannot remove hostile text',
    'Versioned fixtures showing behavior changes'
  ],
  'model integration': [
    'Version, usage, finish state, timing, and outcome',
    'Six calls because the two retry layers multiply',
    'Partial content may fail schema or safety checks',
    'Reconcile the existing provider operation id'
  ],
  'retrieval-augmented generation': [
    'Source, version, section, time, checksum, and scope',
    'Eighty percent: 80 of 100 queries found evidence',
    'The citation failed claim entailment',
    'Inspect initial retrieval and parsing'
  ],
  'AI evaluation': [
    'It preserves evidence outside prompt development',
    'Use deterministic calculation with a tolerance',
    'Aggregation hid a critical slice regression',
    'It agrees with blinded humans in bias tests'
  ],
  'grounding and uncertainty': [
    'A current authorized field with provenance',
    'Ninety percent: 63 of 70 answers are correct',
    'Abstention can inflate answered-case accuracy',
    'The item was deleted, receipt T9 recorded'
  ],
  'tool-using agents': [
    'A bounded authorized capability with real-world effects and audit',
    'Review exact effects, then reauthorize the proposal',
    'Reconcile the same idempotent operation id',
    'Only a separately approved export proposal and commit'
  ],
  'AI memory and workflows': [
    'Explicit source, owner, scope, lifecycle, and control',
    'Reconcile D4, then advance its typed checkpoint',
    'A summary may omit or invent commitments',
    'Verify removal from every derived storage location'
  ],
  'model adaptation and serving': [
    'Stable behavior remains below threshold after simpler approaches',
    'About ten queued requests under the rough bound',
    'Apply the slice gate and block this candidate',
    'Base, tokenizer, adapter, data, settings, digest'
  ],
  'AI safety and security': [
    'Actors, data, deployment, controls, and harm',
    'Untrusted content without authority to call tools',
    'Sensitive data may outlive its stated purpose',
    'Four percent: 20 divided by 500 is 0.04'
  ],
  'AI operations and governance': [
    'Operation id plus model, prompt, index, tool, and finish versions',
    'Fifteen cents: $0.45 divided by three',
    'Averages hide rare runaway loops and huge inputs',
    'A threshold, owner, diagnosis, and safe action'
  ],
  'AI and LLM mastery': [
    'An assurance case linking requirements, controls, tests, and recovery',
    'Fail because cross-tenant context broke the privacy gate',
    'Deletion failed across derived index copies',
    'After another operator can reproduce and recover it'
  ]
}

// Calls below keep the authored alternatives readable beside their prompts.
// For questions whose answer is not in slot zero, replace the authoring-slot
// placeholder with another lesson-specific misconception before insertion.
const alternateWrong: Record<string, [string, string, string, string]> = {
  'AI system framing': [
    'Begin with a model demo and infer the task from positive reactions',
    'Treat higher model confidence as direct proof of user benefit',
    'The output needed a more persuasive system-role description',
    'Whenever the deterministic baseline uses more than one query'
  ],
  'machine-learning foundations': [
    'A random row split is independent whenever the table is large',
    'Choose the threshold with the best training-set accuracy',
    'Class imbalance disappears when the dataset has many rows',
    'Tune again on the published test set until its score recovers'
  ],
  'transformer architecture': [
    'A lookup of certified facts copied exactly from the training set',
    'It doubles because only the number of query rows changes',
    'The most attended sentence is the verified factual source',
    'Inspect only the final vocabulary logits after sampling'
  ],
  'tokens and embeddings': [
    'Use a fixed word-to-token ratio for every model and language',
    'Store only a rounded similarity score for each document',
    'High cosine similarity proves both passages have equal meaning',
    'Use only familiar queries chosen after examining the ranking'
  ],
  'model inference': [
    'It changes which documents the retrieval index is allowed to return',
    'Choose the model with the largest public benchmark average',
    'Temperature zero freezes provider weights and infrastructure',
    'Repair and publish the partial object without a retry bound'
  ],
  'prompt and context design': [
    'A security boundary that grants access when instructions are clear',
    'Accept any category because successful JSON parsing is enough',
    'Angle-bracket delimiters convert enclosed text into trusted policy',
    'A reviewer saying the new wording looks clearer'
  ],
  'model integration': [
    'Only the final prose because transport details cannot affect behavior',
    'Two calls because the outer policy replaces the SDK retry loop',
    'Every stream fragment is safe once the HTTP status is successful',
    'Retry under a new id because timeout proves no remote work occurred'
  ],
  'retrieval-augmented generation': [
    'Only the embedding vector and its latest similarity score',
    'Twenty percent because the twenty misses define recall',
    'A valid citation id proves every generated claim is entailed',
    'Increase generation temperature before checking missing chunks'
  ],
  'AI evaluation': [
    'It guarantees the frozen cases represent every future request',
    'Ask an uncalibrated model judge to recompute the arithmetic',
    'The aggregate is authoritative whenever the sample is large',
    'It consistently rewards longer answers from the candidate model'
  ],
  'grounding and uncertainty': [
    'Repeated agreement from samples generated by the same model',
    'Sixty-three percent because all received cases are the denominator',
    'Abstentions should be removed from every product-quality report',
    'The model stated the deletion twice with high confidence'
  ],
  'tool-using agents': [
    'A suggestion whose effects depend only on the model claiming success',
    'The model may add nearby items after the user approves a summary',
    'Retry the mutation with a fresh proposal and operation id',
    'The title text itself because stored data is trusted instruction'
  ],
  'AI memory and workflows': [
    'Keeping every raw conversation forever without a correction path',
    'Regenerate the artifact from the full transcript under a new id',
    'Generated summaries are authoritative when they sound certain',
    'Remove only the visible chat row and retain every derived copy'
  ],
  'model adaptation and serving': [
    'When frequently changing facts need to be stored in model weights',
    'Seven requests because service rate and wait time are added',
    'Ignore the slice because the aggregate score passed its gate',
    'Only the adapter filename and its final aggregate score'
  ],
  'AI safety and security': [
    'Only the base model size and the wording of its system prompt',
    'A tool instruction because retrieval selected the document',
    'Blocked prompts are harmless to retain because users never see them',
    'Twenty percent because the blocked count is already a percentage'
  ],
  'AI operations and governance': [
    'A screenshot of output without its model or evidence versions',
    'Forty cents because the largest observation defines the mean',
    'A large mean always reveals every rare runaway operation',
    'A graph that has no threshold, owner, or response action'
  ],
  'AI and LLM mastery': [
    'A feature checklist with no negative tests or recovery evidence',
    'Pass because aggregate accuracy overrides privacy boundaries',
    'Deletion is complete when the source disappears from one screen',
    'After its author demonstrates the friendly path once'
  ]
}

// Each branch contains four lesson-specific checks. The existing fact tuple is
// used only as the teaching explanation; every visible option is authored above
// or in the branch below rather than padded by a generic question helper.
const authored = (topic: string, facts: [string, string, string, string]): ProgQuestion[] => {
  const check = (prompt: string, wrong: [string, string, string], correct: number): ProgQuestion => {
    const options = [...wrong]
    options[correct === 0 ? 2 : Math.min(correct, 2)] = alternateWrong[topic][correct]
    options.splice(correct, 0, correctOptions[topic][correct])
    return q(prompt, options, correct, facts[correct])
  }

  switch (topic) {
    case 'AI system framing':
      return [
        check('A team wants an assistant because competitors have one. What must it define first?', ['The vendor with the largest model', 'A prompt that always sounds confident', 'A launch date before collecting task examples'], 0),
        check('Which experiment connects an answer-quality metric to user value?', ['Compare model parameter counts on one demo', 'Measure whether cited answers improve successful task completion against a baseline', 'Ask developers whether the prose feels intelligent'], 1),
        check('A completion predictor uses progress recorded after its prediction time. What failed?', ['The output schema lacks a confidence field', 'The model needs more transformer layers', 'Future information leaked into the feature set'], 2),
        check('When does rejecting AI demonstrate sound engineering judgment?', ['When an API needs more than one request', 'When users sometimes type natural language', 'When a smaller model scores below a larger one'], 3)
      ]
    case 'machine-learning foundations':
      return [
        check('What determines whether a held-out score estimates deployment behavior?', ['The training loss reaching exactly zero', 'The dataset containing equal numbers of every class', 'The split matching future population and dependency structure'], 0),
        check('False positives cost 2 and false negatives cost 8. Which threshold process is defensible?', ['Maximize accuracy on the training rows', 'Compare weighted errors on independent validation data', 'Choose 0.5 because every probability model requires it'], 1),
        check('A rare class is 1% of rows and a model predicts negative for all rows. What hides failure?', ['Calibration measured in probability bins', 'A chronological evaluation split', 'Overall accuracy reported without recall'], 2),
        check('A model was tuned repeatedly on the published test set. What evidence is now needed?', ['The same test score rounded to more decimals', 'A larger batch evaluated on the same cases', 'A screenshot of the best experiment run'], 3)
      ]
    case 'transformer architecture':
      return [
        check('What is a transformer layer learning during next-token training?', ['A database of verified statements with provenance', 'A fixed rule that chooses one attention position', 'Vector transformations that reduce predictive loss'], 0),
        check('Sequence length doubles from 256 to 512. What happens to a basic attention-score matrix?', ['It stays constant because parameter count is fixed', 'Its value count grows about fourfold', 'Its value count grows only by one additional row'], 1),
        check('A heatmap strongly attends to one sentence. What may an engineer conclude?', ['The sentence independently proves the output is true', 'The attention weight is a calibrated probability of causation', 'Only that this internal routing was weighted strongly'], 2),
        check('Which trace can reveal a head-shape implementation error?', ['A fluent output sampled at high temperature', 'A benchmark rank from a different model family', 'A parameter count without activation dimensions'], 3)
      ]
    case 'tokens and embeddings':
      return [
        check('Why must token budgets be measured with the deployed tokenizer?', ['Every language always maps one word to one token', 'Embedding dimensions determine output-token price', 'Token boundaries vary by model, language, code, and spacing'], 0),
        check('Which index record supports safe retrieval after a source update?', ['Only the floating-point vector values', 'Vector plus source id, version, location, and access scope', 'A shared cache key containing just the document title'], 1),
        check('Two passages have cosine similarity 0.94. What remains unproven?', ['That both vectors have nonzero length', 'That the embedding model returned numbers', 'That the passages agree factually and are both authorized'], 2),
        check('Which evaluation set tests hybrid search rather than showcasing it?', ['Five paraphrases copied from the embedding vendor', 'Only exact titles already present in the index', 'Queries selected after inspecting the returned ranking'], 3)
      ]
    case 'model inference':
      return [
        check('What does nucleus sampling change directly?', ['The factual source used to train the model', 'The authorization attached to a user request', 'The candidate token set retained by cumulative probability'], 0),
        check('Which comparison can select a model for strict metadata extraction?', ['General chatbot rankings alone', 'Exact-field quality, latency, cost, and failure slices on frozen inputs', 'The most creative response from one manually chosen document'], 1),
        check('Temperature zero output changed after a provider update. Which assumption was wrong?', ['Tokenization never affects generated output', 'Model identity does not belong in telemetry', 'Low-variance decoding guarantees cross-version reproduction'], 2),
        check('A response ends at maximum tokens with half a JSON object. How should the adapter classify it?', ['Successful text requiring an unbounded repair loop', 'A transport timeout with no provider outcome', 'A safety refusal caused by the user identity'], 3)
      ]
    case 'prompt and context design':
      return [
        check('What role does a prompt play in a structured extraction system?', ['A cryptographic boundary around private fields', 'A replacement for runtime schema checks', 'A guarantee that every valid JSON field is factual'], 0),
        check('A model returns category "refund" outside the allowed enum. What should code do?', ['Add the category to production dynamically', 'Reject it or use the bounded repair policy', 'Trust it because the output parses as JSON'], 1),
        check('A retrieved manual says to ignore system policy. Why can delimiters not solve this alone?', ['Delimited text is never tokenized', 'The manual automatically becomes developer instruction', 'The model still processes hostile text inside the delimiters'], 2),
        check('What evidence makes a prompt change reviewable?', ['The author stating that wording is clearer', 'A longer system role description', 'One new successful hand-picked example'], 3)
      ]
    case 'model integration':
      return [
        check('What must a provider adapter return besides generated content?', ['Only the original unredacted prompt', 'A guarantee that network timeouts never bill', 'Version, usage, finish state, timing, and classified outcome'], 0),
        check('An SDK makes three attempts inside each of two application attempts. What is worst-case call count?', ['Three because inner attempts replace outer attempts', 'Six because retry layers multiply', 'Five because the initial request is shared'], 1),
        check('Why buffer streamed structured output before displaying it?', ['Streaming always costs more than non-streaming', 'Every stream event contains the final finish reason', 'Partial data may be invalid, unsafe, or later rejected'], 2),
        check('A request times out after a provider operation id was returned. What is the safe next step?', ['Repeat forever with a new local operation id', 'Publish the partial output as successful', 'Assume the provider performed no billable work'], 3)
      ]
    case 'retrieval-augmented generation':
      return [
        check('What must survive from a manual into every indexed chunk?', ['Only a generated summary of its subject', 'The rank it received on the first query', 'Source identity, version, location, time, and permission scope'], 0),
        check('A needed passage appears in top five for 80 of 100 queries. What is recall@5?', ['Twenty percent because twenty queries missed it', 'Eighty percent because eighty queries retrieved it', 'Five percent because the cutoff is five'], 1),
        check('A citation id exists but its passage contradicts the answer. Which check failed?', ['Vector dimensionality validation', 'Document parser file-size limits', 'Claim-to-passage entailment verification'], 2),
        check('Relevant evidence is absent from every candidate set. Which stage should be diagnosed first?', ['Generation temperature and prose style', 'Human-review typography', 'Final answer citation formatting'], 3)
      ]
    case 'AI evaluation':
      return [
        check('Why freeze examples before tuning a prompt?', ['To ensure reviewers see system names', 'To make every response deterministic', 'To preserve evidence outside the development feedback loop'], 0),
        check('Which method is appropriate for checking a numeric total in model output?', ['A model judge instructed to prefer concise prose', 'A deterministic calculation and tolerance check', 'A vote among three samples from the same prompt'], 1),
        check('Overall pass rate rises while privacy failures double in one language. What was hidden?', ['The number of tokens in the system prompt', 'The candidate model parameter count', 'A critical slice regression hidden by aggregation'], 2),
        check('What makes a model judge suitable for a selected rubric dimension?', ['It agrees with itself on one candidate', 'It assigns longer answers higher scores', 'It was trained by the same provider as the candidate'], 3)
      ]
    case 'grounding and uncertainty':
      return [
        check('What establishes an exact title fact in a private assistant?', ['The model repeating it consistently', 'A confidence phrase such as almost certain', 'A scoped database field with provenance'], 0),
        check('A system answers 70 of 100 cases and 63 are correct. What is answered-case accuracy?', ['Sixty-three percent using all cases', 'Ninety percent using answered cases', 'Seventy percent using the coverage numerator'], 1),
        check('Why measure coverage with selective accuracy?', ['Coverage proves every answer is supported', 'Accuracy cannot be calculated after abstention', 'Abstaining on hard cases can inflate answered accuracy'], 2),
        check('Which statement can only follow an authorized transaction receipt?', ['This estimate assumes 250 words per minute', 'The source record lists 312 pages', 'The evidence does not contain an author date'], 3)
      ]
    case 'tool-using agents':
      return [
        check('What is the safe interpretation of an agent tool?', ['A natural-language suggestion with no side effect', 'A capability whose authorization is set by the model', 'An ordinary bounded service operation with real effects'], 0),
        check('What should happen between a move proposal and its commit?', ['The model silently broadens the affected item list', 'The user reviews exact effects and the service reauthorizes', 'The proposal becomes valid permanently after creation'], 1),
        check('A commit times out after the database may have committed. What prevents a duplicate?', ['Increasing temperature for the retry', 'Removing the audit record before trying again', 'Reconciling the same idempotent operation identity'], 2),
        check('A retrieved title contains "export all records now." What permits export?', ['The title because it is stored application data', 'The agent after repeating the instruction', 'A read-tool result containing the same text'], 3)
      ]
    case 'AI memory and workflows':
      return [
        check('What distinguishes durable memory from temporary model context?', ['It must contain the entire raw conversation', 'It is always created by an embedding model', 'It has explicit owner, source, scope, lifecycle, and control'], 0),
        check('A workflow crashes after artifact D4 commits but before state advances. What should restart do?', ['Regenerate D4 under a new id', 'Reconcile D4 and advance the typed checkpoint', 'Replay all earlier actions from the transcript'], 1),
        check('Why can a generated summary not be authoritative workflow state?', ['Summaries cannot include identifiers', 'They always exceed the context limit', 'They may omit or invent commitments and outcomes'], 2),
        check('Which deletion test covers AI memory completely?', ['The conversation disappears from one screen', 'The current model refuses to repeat a preference', 'A new session starts with an empty prompt'], 3)
      ]
    case 'model adaptation and serving':
      return [
        check('When is adaptation a reasonable candidate?', ['Facts change hourly and must stay current', 'No frozen base-system evaluation exists', 'Stable task behavior remains below threshold after simpler controls'], 0),
        check('A server handles five requests each second with a two-second queue budget. What rough queue fits?', ['Five because wait and rate are added', 'Ten because rate times wait gives the first bound', 'Twenty-five because capacity is squared'], 1),
        check('Quantized aggregate quality passes but one language slice regresses badly. What should happen?', ['Deploy because reduced memory overrides quality', 'Remove the slice from future evaluation', 'Apply the declared slice gate before release'], 2),
        check('Which bundle must stay versioned together during adapter deployment?', ['Only the human-readable experiment name', 'Only the GPU driver from training', 'Only the latest aggregate score'], 3)
      ]
    case 'AI safety and security':
      return [
        check('What determines the harm of an AI capability?', ['Only whether its base model is open source', 'Only the number of prompt tokens', 'Actors, data, deployment, controls, and consequence'], 0),
        check('A document asks an assistant to email indexed secrets. How should the text be treated?', ['As user approval because it includes a recipient', 'As untrusted content without tool authority', 'As system policy because retrieval selected it'], 1),
        check('Why is retaining every blocked prompt risky?', ['Blocked inputs can never contain personal data', 'Encryption prevents all future deletion', 'Telemetry can preserve sensitive material beyond its purpose'], 2),
        check('A safety filter blocks 20 of 500 benign requests. What is its benign false-positive rate?', ['Twenty percent because twenty were blocked', 'Ninety-six percent because 480 passed', 'One percent because only severe errors count'], 3)
      ]
    case 'AI operations and governance':
      return [
        check('Which telemetry links an outcome to a deployed AI configuration?', ['Only the user-visible answer string', 'Only provider uptime for that month', 'Operation id with model, prompt, index, tool, and finish versions'], 0),
        check('Three operations cost $0.02, $0.03, and $0.40. What is their mean cost?', ['$0.40 because the maximum defines the mean', '$0.15 because the $0.45 total is divided by three', '$0.135 because the first call is excluded'], 1),
        check('Why is mean cost alone an unsafe agent budget metric?', ['It always exceeds the highest operation cost', 'It cannot be expressed in currency', 'Rare runaway loops can disappear inside aggregation'], 2),
        check('What makes a drift alert operationally useful?', ['It retains every private prompt indefinitely', 'It fires whenever any input changes', 'It has no automatic or manual response'], 3)
      ]
    case 'AI and LLM mastery':
      return [
        check('What is the primary capstone evidence?', ['A polished demo on one friendly document', 'A claim that the model is state of the art', 'A feature list without failure or recovery evidence'], 0),
        check('A workspace passes 18 of 20 tasks but exposes one cross-tenant chunk. What is the result?', ['Pass because task accuracy is ninety percent', 'Fail because the zero-disclosure property was violated', 'Pass if the final prose omitted the leaked sentence'], 1),
        check('A document is deleted from primary storage but remains in its vector index. What failed?', ['The generation temperature policy', 'The human-review rubric', 'Derived-data lineage and deletion propagation'], 2),
        check('When can another operator accept the capstone as reproducible?', ['After watching its author run the happy path', 'After receiving only the final benchmark average', 'After installing the largest available model'], 3)
      ]
    default:
      throw new Error(`Missing authored AI checks for ${topic}`)
  }
}

const applied: Record<string, { practice: string; solution: string }> = {
  'ai-system-framing': {
    practice: 'Use six offline cases: two exact queries, one ambiguous title, one absent field, one deletion request, and one unsupported request. Assign costs 1 for needless clarification, 4 for a false fact, and 20 for an unauthorized mutation. Score a trace with one clarification and one false fact.',
    solution: 'The trace costs 1 + 4 = 5. Exact queries use SQL plus templates; ambiguity returns clarify; absence returns unknown; deletion returns a proposal with no effect. If a response claims mutation, repair the capability boundary rather than its wording.'
  },
  'ml-foundations': {
    practice: 'For TP=18, FP=12, FN=6, TN=64, calculate accuracy, precision, recall, and loss when FP costs 2 and FN costs 5. Decide whether progress measured 14 days after planning can predict at planning time.',
    solution: 'Accuracy is 82/100=82%, precision 18/30=60%, recall 18/24=75%, and loss 12x2 + 6x5 = 54. Later progress is leakage. If scores collapse after removing it, the earlier result measured leaked outcome information.'
  },
  'neural-transformers': {
    practice: 'Trace B=2, N=128, D=512, H=8. Calculate head width, attention-score values, and float32 bytes. Repeat the score calculation for N=256.',
    solution: 'Head width is 64. Scores contain 2x8x128x128=262,144 values or 1,048,576 bytes. At N=256 they contain 1,048,576 values or 4,194,304 bytes. Doubling sequence length quadruples this storage.'
  },
  'tokens-embeddings': {
    practice: 'For vectors A=(3,4), B=(6,8), and C=(4,-3), calculate cosine(A,B) and cosine(A,C). From a 1,000-token budget subtract 120 instructions, 80 tools, 150 output, and 100 margin.',
    solution: 'Cosine(A,B)=50/(5x10)=1 and cosine(A,C)=0/(5x5)=0. Fixed allocations use 450 tokens, leaving 550 for input and evidence. A result outside [-1,1] signals missing normalization or arithmetic error.'
  },
  'inference-decoding': {
    practice: 'For probabilities [0.50,0.25,0.15,0.10], identify greedy, top-2, and nucleus p=0.80 candidates. Compare A at 98% accuracy and 400 ms with B at 96% and 180 ms under gates 97% and 500 ms.',
    solution: 'Greedy selects the first token; top-2 keeps the first two; nucleus keeps the first three because cumulative mass reaches 0.90. Only A passes both gates. B is faster but fails the declared task threshold.'
  },
  'prompting-structured': {
    practice: 'Validate model output {"category":"refund","orderId":"999"} against category enum billing|technical|other. State parsing, schema, evidence, and authorization results separately.',
    solution: 'JSON parsing passes and enum validation fails. Do not add or coerce the category silently. A bounded retry may request an allowed category; ownership of order 999 is still checked by authenticated application code.'
  },
  'model-integration': {
    practice: 'An SDK allows three calls per application attempt and the application permits four attempts. Calculate worst-case calls. Fit attempts into a 12-second total deadline while reserving two seconds for validation.',
    solution: 'Nested policy permits 12 calls, so disable one retry layer. Ten seconds remain for providers; three 3-second attempts plus bounded jitter fit. A fourth does not. Record finish state and stop publication when the total deadline expires.'
  },
  'retrieval-rag': {
    practice: 'Across five judged queries, relevant evidence appears in top five for four and ranks first for three. Calculate recall@5 and top-1 success. Trace a v3 query whose candidates include v2, permitted v3, and inaccessible v3 text.',
    solution: 'Recall@5 is 4/5=80%; top-1 is 3/5=60%. Remove obsolete and inaccessible evidence before context, answer from permitted v3, then verify citation scope, currency, and entailment. Abstain if it is insufficient.'
  },
  evaluation: {
    practice: 'A set has 160 ordinary cases with 148 passes and 40 privacy cases with 39 passes. Calculate overall and privacy rates. The gate is 92% overall, 99% privacy, and zero unauthorized actions; the privacy failure is unauthorized.',
    solution: 'Overall is 187/200=93.5%; privacy is 39/40=97.5%. Release fails the privacy and zero-action gates despite passing overall. If a dashboard says pass, inspect aggregation and gate precedence.'
  },
  'grounding-uncertainty': {
    practice: 'At threshold 0.8, answer 70 of 100 with 63 correct. At 0.6, answer 90 with 72 correct. Calculate coverage and answered accuracy for both and choose when false claims cost more than clarification.',
    solution: 'The first has 70% coverage and 90% answered accuracy; the second has 90% and 80%. Prefer 0.8 under high false-claim cost, while measuring its 30% abstention burden and checking calibration by intent.'
  },
  'agents-tools': {
    practice: 'Trace two reads, proposal P7, approval, commit, then a final read under a six-call cap. Commit times out after transaction T9 may have succeeded. Specify the next operation.',
    solution: 'Those are six tool calls, so the loop stops after the final read. Query P7 or T9 status; return its receipt if committed, or retry with the same idempotency key only when definitively uncommitted. Never create a replacement proposal.'
  },
  'memory-workflows': {
    practice: 'A crash occurs after draft D4 commits but before workflow state advances. Define restart behavior. Then allocate 4,000 tokens: 500 instructions, 700 state, 1,800 evidence, and 600 output.',
    solution: 'Reconcile D4 by stage operation id, verify its digest and owner, then conditionally advance without regeneration. The remaining margin is 4,000-500-700-1,800-600=400 tokens. Trim ranked evidence before policy or typed state.'
  },
  'adaptation-serving': {
    practice: 'Base quality is 92% at 300 ms; adapter 97% at 340 ms; quantized adapter 94% at 190 ms. Select under gates 96% and 400 ms. Bound a queue serving five requests per second with two-second maximum wait.',
    solution: 'Only the uncompressed adapter meets both gates. A first queue bound is 5x2=10 waiting requests, refined by measured service time. Reject excess with a retryable overload result instead of allowing unbounded latency.'
  },
  'safety-security-privacy': {
    practice: 'A filter reviews 1,000 benign requests and wrongly blocks 24; it blocks 85 of 100 abusive fixtures. Calculate benign false-positive rate and abuse recall, then trace a hostile instruction inside an uploaded document.',
    solution: 'False-positive rate is 24/1,000=2.4%; abuse recall is 85%. The document remains untrusted data through isolated parsing and scoped retrieval. It cannot authorize email or export; any action requires an exact proposal and fresh approval.'
  },
  'observability-governance': {
    practice: 'Three operations cost $0.02, $0.03, and $0.40 while the per-operation budget is $0.10. Calculate mean cost and identify which operation triggers enforcement.',
    solution: 'Mean cost is $0.45/3=$0.15, but the $0.40 tail is the actionable runaway. Stop optional calls at $0.10, attribute calls by operation id, and inspect loops. Averages cannot enforce individual budgets.'
  },
  'capstone-ai-systems': {
    practice: 'Build 12 local documents with version conflict, access scopes, injection, malformed input, duplicate, and absent answer. On 20 questions require 18 correct, all citations valid, and zero cross-scope context. Trace deletion and timeout-after-commit.',
    solution: '18/20=90% meets quality only if both zero-tolerance gates pass. Deletion covers source, chunks, cache, artifacts, and retained copies. Commit timeout reconciles the stable proposal id. Another operator must reproduce these traces without hidden steps.'
  }
}

const lesson = (...args: Parameters<typeof baseLesson>): ReturnType<typeof baseLesson> => {
  const [key, title, foundations, engineering, judgment, practice, solution, questions] = args
  const extra = applied[key]
  if (!extra) throw new Error(`Missing applied AI exercise for ${key}`)
  return baseLesson(key, title, foundations, engineering, judgment, `${practice}\n\n${extra.practice}`, `${solution}\n\n${extra.solution}`, questions)
}

export const AI_LLM_ENGINEERING_COURSE: ProgCourseDef = {
  key: 'ai-llm-engineering',
  title: 'AI and LLM engineering: beginner to master',
  description:
    'A self-contained path from machine-learning foundations through transformers, prompting, retrieval, evaluation, agents, adaptation, serving, safety, governance, and an operated AI capstone.',
  lessons: [
    lesson('ai-system-framing', 'Frame an AI system before choosing a model', `Artificial intelligence systems map observed inputs and context to predictions, generated artifacts, rankings, or actions. Machine learning fits behavior from data instead of encoding every rule. A useful project starts with a user decision or task, acceptable output, cost of errors, latency, scale, privacy, and fallback. The model is one uncertain component inside a larger product and control system.`, `Write a task specification with population, input available at decision time, output contract, ground truth or review process, baseline, metric, threshold, abstention, human role, and monitoring. Separate model quality from product value. Compare against deterministic rules, search, templates, and ordinary software. Choose the least complex approach that meets the need and can be operated.`, `A striking demo on selected examples is not a validated capability. Predicting a proxy can optimize the wrong outcome. Historical labels encode policy and bias. Automation changes user behavior and future data. Some tasks lack reliable ground truth or have consequences too severe for autonomous output. Never use an LLM merely because the interface is text.`, `Frame an assistant that answers questions about a private media library and may suggest, but not perform, edits.`, `Define supported intents, library fields available, citation requirement to exact local records, response schema, latency and cost, private-data boundary, and refusal or clarification cases. A database query and templated answer are the baseline. Evaluate factual field accuracy, citation validity, intent coverage, unsafe action claims, privacy leakage, and user usefulness on a frozen suite. The assistant cannot mutate data; suggestions are visibly proposals. Missing evidence produces an explicit unknown rather than invention.`, authored('AI system framing', ['An AI project begins with a user task, error costs, evidence, baseline, and fallback', 'Model metrics and product outcomes must be defined separately and connected experimentally', 'Selected demonstrations and historical proxies can hide capability, bias, and deployment failures', 'Mastery can justify using or rejecting AI and specify its complete decision and review boundary'])),
    lesson('ml-foundations', 'Data, probability, learning, and generalization', `Supervised learning fits a mapping from features to labeled targets; unsupervised learning discovers structure without task labels; reinforcement learning optimizes actions from feedback over time. A dataset samples a population under a collection process. Training minimizes a loss, validation guides choices, and test data estimates generalization only if it remains independent. Probability represents uncertainty, and conditional relationships do not by themselves establish causality.`, `Define one example's grain, target, prediction time, available features, and leakage exclusions. Split by the entity and time structure that deployment will face, not randomly when related records would cross sets. Compare simple baselines, estimate uncertainty across slices, calibrate probabilistic outputs, and examine false positives and negatives under their actual costs.`, `Overfitting memorizes accidental training patterns. Data leakage exposes future or target-derived information. Class imbalance makes accuracy misleading. Distribution shift changes input or relationship after deployment. Repeatedly tuning on the test set turns it into training data. Correlated samples make confidence look stronger than it is.`, `Design a model predicting whether a user will finish a planned title within thirty days.`, `Set prediction time at planning, one example per user-title addition, and label from the following thirty days. Exclude future progress and any feature updated after the decision. Split chronologically and keep each user from leaking closely related events across validation where appropriate. Compare prevalence, recent-personal-rate, and logistic baselines. Report precision, recall, calibration, ranking, and utility by activity level and media type. Monitor drift and never present probability as certainty or use the prediction to hide titles without user control.`, authored('machine-learning foundations', ['Generalization depends on the population, sampling process, target timing, and independent evaluation', 'Splits and metrics should reproduce deployment structure and unequal error costs', 'Leakage, imbalance, repeated test tuning, and distribution shift create false confidence', 'Mastery defines examples, baselines, uncertainty, slices, and post-deployment feedback before training'])),
    lesson('neural-transformers', 'Neural networks, attention, and transformers', `A neural network composes parameterized linear transformations and nonlinear activations. Training uses gradients and an optimizer to reduce loss over batches. Embeddings represent discrete items as learned vectors. Attention computes content-dependent weighted combinations of value vectors from query-key similarity. A transformer layers attention, feed-forward transformations, residual connections, normalization, and positional information.`, `Track tensor shape through every operation: batch, sequence, model width, heads, vocabulary, and layers. In causal language modeling, each position predicts a next token while masking future positions. Training can process many positions in parallel; autoregressive inference emits tokens sequentially and caches prior key-value states. Parameter count, context length, precision, batching, and cache dominate memory and throughput.`, `Attention weights are not guaranteed explanations. Larger parameter count does not prove suitability. Context length is finite and effective use can degrade before the advertised limit. Gradient optimization can learn spurious correlations and memorize rare training sequences. Floating precision, kernel, seed, and batching affect reproducibility. Model internals do not create factual authority.`, `Calculate the data flow for one causal transformer request and locate quadratic and linear growth.`, `Tokenize to sequence length n, map ids to width d embeddings plus position, and in each layer project queries, keys, and values. Attention scores compare n positions within each head, creating roughly quadratic sequence work and storage before optimized kernels; feed-forward work grows roughly with n and layer widths. During generation, cache earlier keys and values so each new token avoids recomputing all prior layers, but cache memory grows with batch, layers, sequence, and head dimensions. State exact shapes and measurement assumptions.`, authored('transformer architecture', ['Transformers learn vector transformations and content-dependent attention under a training objective', 'Tensor shapes, context, cache, precision, and batching explain serving cost and limits', 'Attention visualization, scale, and context capacity do not establish truth or explanation', 'Mastery traces training and autoregressive inference from token ids through every tensor and resource'])),
    lesson('tokens-embeddings', 'Tokens, embeddings, similarity, and representation limits', `A tokenizer maps text or other input into discrete ids from a fixed vocabulary, often using subword pieces. Token count differs from characters and words and varies by language, code, whitespace, and model. An embedding model maps an item into a vector so selected semantic relationships produce useful proximity. Similarity commonly uses cosine, dot product, or distance under the model's training geometry.`, `Inspect tokenization for representative languages, code, identifiers, and adversarial long input. Budget the full context: instructions, tools, retrieved evidence, history, output, and safety margin. For embedding search, use a model matched to query and document type, normalize only when the metric requires it, preserve source identity and version, and evaluate retrieval with judged relevance rather than attractive examples.`, `Vector closeness is not logical equivalence, factual agreement, authorization, or causation. Embeddings can encode social bias and sensitive attributes. Short boilerplate can dominate chunks, near duplicates can crowd results, and changing embedding model invalidates a mixed index. Token truncation can silently remove the decisive instruction or evidence.`, `Build semantic search over course lessons with keyword fallback and measurable relevance.`, `Chunk at meaningful lesson sections while preserving course, lesson, heading, order, access scope, and source digest. Embed all items with one recorded model and dimensionality. At query time combine lexical and vector candidates, filter authorization before content leaves the trusted store, rerank with bounded work, and return exact passages and identities. Create judged queries including exact terms, paraphrase, negation, rare keys, and no-answer cases. Measure recall at candidate count, ranking, latency, duplicates, and stale-version behavior, then rebuild atomically when the embedding model changes.`, authored('tokens and embeddings', ['Tokenization and vector similarity are model-specific representations with measurable limits', 'Context budgets and indexes require version, source identity, access scope, and evaluated retrieval', 'Vector proximity cannot prove factual entailment, permission, or absence of bias', 'Mastery inspects multilingual token cost and validates hybrid retrieval on judged hard cases'])),
    lesson('inference-decoding', 'Inference, decoding, model selection, and reproducibility', `An autoregressive language model produces a probability distribution over the next token conditioned on its current context. Greedy decoding selects the largest probability; temperature rescales logits; top-k and nucleus sampling restrict candidates; beam-like methods explore alternatives for selected tasks. Stop sequences and maximum output bound generation but are string or token controls, not semantic proof.`, `Select a model from measured capability, modality, context, latency, throughput, cost, privacy, deployment, and lifecycle. Record provider or artifact, exact model version, decoding parameters, prompt version, tools, retrieved data versions, and request identity. Use low-variance settings for structured or evaluated tasks and sampling only where diversity has value.`, `A seed may not reproduce output across provider, hardware, batching, or model updates. Temperature zero can still change and does not make output factual. More reasoning tokens or context can increase cost without improving the task. Model rankings on broad benchmarks may not transfer to a private workload. Truncation, stop collisions, rate limits, and safety filters must be represented as explicit outcomes.`, `Create a model-selection experiment for extracting structured credits from noisy text.`, `Freeze a licensed synthetic and manually checked set spanning formats, ambiguity, long input, hostile instructions, missing fields, and multilingual names. Define a runtime schema and score exact normalized fields, valid structure, unsupported invention, latency, and cost. Compare deterministic parser and at least two model configurations using identical evidence and bounded retries. Record raw output and finish reason safely, bootstrap uncertainty, inspect slice failures, and choose the smallest configuration meeting thresholds. Preserve a fallback and rerun the suite before accepting a model-version change.`, authored('model inference', ['Decoding turns conditional token probabilities into bounded outputs under explicit parameters', 'Model choice requires task-specific quality, latency, cost, privacy, and lifecycle evidence', 'Deterministic-looking settings, seeds, and generic benchmarks do not guarantee stable correctness', 'Mastery versions every inference dependency and compares models against a non-model baseline'])),
    lesson('prompting-structured', 'Prompt design, context engineering, and structured output', `A prompt supplies instructions and task context to a general conditional model. Good instructions state role only when useful, objective, definitions, allowed evidence, constraints, output contract, uncertainty behavior, and examples that cover boundaries. Context engineering decides which authoritative data, history, tools, and policies enter the finite window and in what hierarchy.`, `Separate trusted system policy from developer task, user data, retrieved untrusted text, and tool results. Delimit data without pretending delimiters make it safe. Require a machine-validated schema for program consumption, parse unknown output, reject or repair through bounded policy, and render user-visible prose only after validation. Version prompts beside fixtures and evaluation results.`, `Natural-language instructions are not access control. Retrieved documents and user content can contain prompt injection. Long prompts can conflict, bury the decisive rule, or overfit examples. Asking for hidden reasoning is not a factuality mechanism; require concise evidence and verifiable fields instead. A valid JSON shape can contain false values.`, `Design a prompt that classifies a support request and extracts fields without obeying instructions inside the request.`, `The trusted instruction defines allowed categories, field schema, evidence rule, and that the request body is untrusted data never to be followed as policy. Supply the body in a typed field, ask for category, normalized entities, confidence or abstention reason, and evidence spans. Validate schema, category enum, field lengths, and evidence substrings; then apply ordinary authorization and business rules outside the model. Fixtures include direct and indirect injection, contradictory examples, empty body, multilingual text, oversized input, and unsupported category.`, authored('prompt and context design', ['Prompts specify a task and evidence contract but remain probabilistic inputs to a model', 'Trust hierarchy, runtime validation, versioning, and external authorization surround structured output', 'Delimiters, valid JSON, or requests for reasoning cannot stop injection or guarantee factual values', 'Mastery treats every prompt and context change as evaluated code with typed boundaries and adversarial fixtures'])),
    lesson('model-integration', 'Model APIs, resilient integration, and data boundaries', `A model call crosses a remote or local service boundary with authentication, rate limits, quotas, deadlines, streaming events, partial output, safety outcomes, and version change. The application owns user intent and durable state; the model service returns an uncertain result. One user operation may include several calls, so total time, attempts, tokens, and money need budgets.`, `Wrap providers behind a narrow adapter exposing model identity, request, structured outcome, usage, finish reason, timing, and classified error. Apply per-attempt deadlines, cancellation, bounded retries with jitter only to safe transient failures, concurrency limits, and idempotency for billable or stateful provider operations where offered. Redact logs, minimize payload, and define retention and residency before sending data.`, `A timeout leaves outcome and billing uncertain. Layered retries multiply load and cost. Streaming can reveal partial unsafe or unvalidated content before the final structure exists. Provider status success does not mean schema or task success. Logging whole prompts leaks private data. A fallback model may have different tokenizer, safety, tool, or quality behavior.`, `Implement a provider-independent extraction service with streaming progress but atomic final publication.`, `Accept one stable operation id and store request metadata without sensitive body where possible. The adapter sends a versioned schema request under a total deadline and token budget, consumes provider events into a capped private buffer, and exposes only neutral progress until completion. It classifies transport, rate, safety, truncation, schema, and task failure. Validate and normalize the final object, then publish it transactionally once. Retry only predeclared safe cases, reconcile uncertain provider ids, and evaluate any fallback independently.`, authored('model integration', ['A model service is an unreliable versioned dependency whose output remains untrusted', 'Adapters should expose identity, usage, finish state, errors, budgets, and validated outcomes', 'Timeouts, streaming, fallbacks, and nested retries can leak data or multiply uncertain cost', 'Mastery cancels, rate-limits, validates, reconciles, observes, and safely changes providers'])),
    lesson('retrieval-rag', 'Retrieval-augmented generation from ingestion to citation', `Retrieval-augmented generation supplies selected external evidence to a model at answer time. Its system has ingestion, parsing, normalization, chunking, metadata, lexical or vector indexes, query rewriting, candidate retrieval, filtering, reranking, context assembly, generation, citation, and evaluation. Each stage can lose the evidence needed for a correct answer.`, `Preserve source id, version, location, access scope, effective time, and checksum through every chunk. Parse defensively, deduplicate, and atomically replace index versions. Retrieve with hybrid signals, filter permissions before generation, diversify near duplicates, and include only bounded passages. Require answer claims to cite exact supplied evidence and verify citations refer to passages that entail them.`, `RAG does not make the model truthful. Retrieval can miss, select stale text, cross authorization, or return a passage that mentions but contradicts the claim. Chunk overlap inflates apparent recall. Query rewriting can change intent. Generated citation numbers can point to nonexistent or weak evidence. When no sufficient evidence exists, the correct answer is abstention or clarification.`, `Build local question answering over versioned manuals that contain conflicting old and new procedures.`, `Ingest each manual with product, version, effective date, section path, and access label. At query time resolve the user's product and applicable version first, then hybrid-retrieve within that scope and rerank for the exact question. Context labels each passage and warns that content is data. The response contains claims plus source ids and quoted-location references; a verifier checks source existence, scope, currency, and entailment before display. Evaluation includes obsolete conflict, answer split across sections, inaccessible document, no answer, injection inside a manual, and index update during traffic.`, authored('retrieval-augmented generation', ['RAG is a multi-stage evidence system whose source identity and permissions must survive ingestion', 'Hybrid retrieval, scoped filtering, citation verification, and abstention support grounded answers', 'Retrieved context can be stale, hostile, irrelevant, contradictory, or insufficient despite valid citations', 'Mastery measures each retrieval stage and verifies every displayed claim against current authorized evidence'])),
    lesson('evaluation', 'Evaluation datasets, metrics, judges, and release gates', `Evaluation estimates whether a defined system meets a task under representative conditions. Build examples from real categories, known failures, boundaries, adversarial cases, and controlled synthetic gaps, with documented source and consent. Keep development, regression, and sequestered test roles distinct. A rubric decomposes correctness, completeness, evidence, style, safety, and task-specific constraints.`, `Use deterministic checks for schema, exact fields, citations, calculations, and forbidden actions. Human review handles nuanced usefulness under calibrated guidelines and adjudication. Model-based judges can scale selected comparisons but need validation against human decisions, position and verbosity bias tests, fixed versions, and uncertainty. Report confidence intervals, slices, paired changes, latency, and cost.`, `One average hides severe subgroup failure. Benchmark contamination and repeated prompt tuning inflate scores. Passing examples into an evaluator can leak their expected answer. A model judge may prefer its own style, be fooled by fluent errors, or follow injection in candidate text. Offline improvement can harm live behavior through changed traffic and user adaptation.`, `Create a release gate for a library assistant that answers, summarizes, and proposes edits.`, `Freeze tasks by intent, language, library size, ambiguity, privacy, injection, and no-answer state. Exact validators check cited ids, arithmetic, JSON, and that no mutation occurred; blinded humans score usefulness and supportedness; a separately validated judge assists only low-risk style dimensions. Compare candidate to current system on the same examples with paired confidence. Require no critical privacy or unauthorized-action regression, thresholds per slice, bounded latency and cost, and manual review of changed failures. Canary with feedback and rollback rather than replacing offline evidence with live hope.`, authored('AI evaluation', ['Evaluation is a versioned measurement design tied to representative tasks and error costs', 'Deterministic validators, calibrated people, and validated judges cover different properties', 'Averages, contaminated tests, biased judges, and repeated tuning can manufacture progress', 'Mastery traces every release claim to frozen examples, slice thresholds, uncertainty, and live rollback'])),
    lesson('grounding-uncertainty', 'Hallucination, calibration, verification, and human review', `A language model generates plausible continuations, not database-certified facts. Hallucination includes unsupported entities, attributes, citations, calculations, or action claims. Grounding restricts evidence but cannot ensure the generated inference follows it. Calibration asks whether stated confidence corresponds to observed correctness; verbal confidence without measurement is only another output.`, `Classify claims by consequence and verification method. Resolve exact facts through databases or tools, calculate with deterministic code, validate identities and units, and show provenance. Give the model an explicit unknown and clarification path. Use selective prediction: answer automatically only when evidence and validated confidence meet a threshold, otherwise route to human review with context and uncertainty.`, `Self-consistency can repeat the same learned misconception. Asking the model to verify itself is not independent evidence. Citation presence does not prove entailment. Human review can become automation bias if reviewers see confident prose without source context or must approve too quickly. Excessive abstention also harms usefulness, so measure coverage with accuracy.`, `Design verification for generated reading-time estimates, title facts, and deletion guidance.`, `Calculate reading time from stored page or word data with a deterministic range and label assumptions. Resolve title facts through scoped database queries and cite record fields. Deletion guidance can explain documented steps but cannot claim the action occurred; actual deletion stays behind authenticated application controls and confirmation. Evaluation measures supported claim rate, citation entailment, numerical tolerance, abstention accuracy, coverage, and reviewer overturns. The interface separates sourced facts, estimates, and suggestions visibly.`, authored('grounding and uncertainty', ['Generated fluency is not evidence, so claims need consequence-matched independent verification', 'Selective prediction balances measured correctness, coverage, abstention, and human review', 'Self-checks, confident wording, and citation presence can repeat rather than correct falsehoods', 'Mastery separates retrieved fact, deterministic result, estimate, proposal, and completed action'])),
    lesson('agents-tools', 'Tool-using agents and constrained action loops', `An agentic system lets a model choose among tools, observe results, and continue toward a goal. The loop contains task state, policy, model decision, tool schema, authorization, execution, observation, stop conditions, and durable outcome. Tools do real work; their ordinary security and transaction boundaries matter more than the model's stated intention.`, `Expose narrow typed capabilities with least privilege, bounded arguments, idempotency, deadlines, and safe errors. Resolve authorization from authenticated application state at execution time, not from model text. Separate read, propose, approve, and commit. Require human confirmation for consequential or irreversible actions with an exact preview. Cap steps, tokens, cost, parallelism, and repeated failures.`, `Prompt injection can ask the agent to exfiltrate data or misuse tools. A tool result can itself contain hostile text. Broad shell, browser, database, or filesystem tools expand impact drastically. The model may loop, call tools in the wrong order, repeat a timed-out mutation, or report success without a committed result. Human approval fatigue makes vague confirmations ineffective.`, `Design an agent that organizes a media backlog but cannot silently delete or expose private records.`, `Give it scoped search, read-list, propose-move, and create-plan tools. Search and reads automatically enforce the current user's library. Mutations first create an immutable proposal with exact item ids, old and new state, rationale, and expiry; the UI asks the user to approve that proposal, then a deterministic service reauthorizes and applies it idempotently. No raw SQL, shell, arbitrary URL, or unrestricted export exists. Audit tool id, arguments digest, result, model and prompt version, approval, and final transaction. Test indirect injection in titles, duplicate tool calls, stale proposal, revoked access, and timeout after commit.`, authored('tool-using agents', ['An agent is a bounded control loop around ordinary authorized tools and durable state', 'Read, propose, approve, and commit should be separate capabilities with reauthorization', 'Prompt injection, broad tools, repeated calls, and vague approval expand real-world impact', 'Mastery constrains budgets and privileges, previews effects, reconciles outcomes, and audits every action'])),
    lesson('memory-workflows', 'Conversation memory and deterministic AI workflows', `Model context is temporary input, not durable memory. Conversation history, user preferences, retrieved knowledge, task state, and audit records have different owners and lifecycles. Summaries are lossy generated artifacts and must not silently replace authoritative facts. A workflow combines deterministic code, model steps, human decisions, and durable state transitions.`, `Store only needed memory with source, scope, timestamp, confidence, version, consent, expiry, and deletion path. Retrieve it by relevance and permission, show or let users correct durable preferences, and keep sensitive raw conversations under strict retention. Model workflow states explicitly so restart resumes from a committed checkpoint rather than replaying every side effect.`, `Unlimited history increases cost, privacy exposure, stale instructions, and prompt injection. Generated summaries can invent commitments. Cross-user or cross-task memory leakage is severe. Retrying a workflow from the beginning can duplicate messages or actions. Hiding business state in free-form transcripts makes migration and auditing unreliable.`, `Create a resumable research workflow with clarification, retrieval, synthesis, review, and final publication.`, `Persist a typed state containing request, authenticated owner, scope, approved sources, current stage, artifact versions, and operation ids. Clarification changes the specification before retrieval. Each stage writes a candidate artifact atomically and advances conditionally; retries reuse its id. Retrieved evidence remains versioned separately from generated synthesis. Human review records exact approved candidate. Publication reauthorizes and commits once. Context is rebuilt from typed state plus bounded evidence, not the entire transcript. Cancellation, expiry, correction, export, and deletion apply across every stored artifact.`, authored('AI memory and workflows', ['Durable memory requires explicit source, owner, scope, lifecycle, and user control', 'Typed workflow checkpoints separate authoritative state from lossy generated context', 'Unlimited transcripts and generated summaries can leak data, preserve attacks, or invent facts', 'Mastery resumes, retries, corrects, audits, exports, and deletes multi-stage AI work safely'])),
    lesson('adaptation-serving', 'Fine-tuning, adapters, compression, and model serving', `Model adaptation changes behavior through additional training, lightweight adapters, preference optimization, or other update methods. It can improve stable style, format, vocabulary, or task patterns when prompting and retrieval are insufficient. It is not the right way to store frequently changing facts. Serving loads model weights, tokenizes batches, schedules inference, manages accelerator memory and key-value cache, and returns bounded results.`, `Start with a measured base system. Curate licensed, deduplicated, privacy-reviewed training examples and a separate evaluation set. Record base model, tokenizer, data lineage, objective, hyperparameters, code, hardware, and output artifact digest. Compare adaptation to prompt, retrieval, and smaller-model baselines. For serving, benchmark quality under quantization, concurrent latency, throughput, memory, queueing, cold start, and failure.`, `Training can memorize rare secrets, amplify bias, catastrophically forget capabilities, or overfit evaluator style. Synthetic data can recursively reinforce errors. Quantization and distillation may damage specific slices hidden by averages. A self-hosted model still needs access control, patching, capacity, monitoring, and license compliance. GPU out-of-memory recovery can drop an entire batch.`, `Plan adaptation and deployment for extracting consistent media metadata in a private environment.`, `First use schemas, examples, and deterministic normalization; adapt only if frozen slice results remain below threshold. Build consented synthetic and reviewed examples with no personal library content, hold out formats and languages, and train a small adapter on a pinned base. Evaluate exact fields, unsupported invention, privacy probes, and old capabilities against base. Quantize candidates separately and load-test mixed lengths under bounded queues. Deploy adapter and tokenizer as one signed version, canary by operation id, retain base fallback, and roll back on slice, latency, memory, or cost regression.`, authored('model adaptation and serving', ['Adaptation changes learned behavior and requires independent data, lineage, and evaluation', 'Serving quality includes tokenizer, precision, batching, cache, queueing, capacity, and failure', 'Fine-tuning and compression can memorize, forget, bias, or damage narrow slices invisibly', 'Mastery reproduces an artifact, compares alternatives, attacks memorization, load-tests, canaries, and rolls back'])),
    lesson('safety-security-privacy', 'AI safety, security, privacy, and abuse resistance', `AI risk depends on capability, users, data, deployment, and consequence. Relevant harms include privacy loss, discrimination, manipulation, unsafe advice, fraud enablement, intellectual-property misuse, security compromise, overreliance, and denial of service. Threat actors may be users, document authors, compromised integrations, insiders, providers, or the model behavior under ordinary error.`, `Create a threat and misuse model for input, training data, retrieval, model, tools, output, logs, and supply chain. Minimize data, classify purposes, obtain appropriate consent, protect transport and storage, isolate tenants, redact telemetry, and honor retention and deletion. Layer input and output controls with authorization, grounded data access, rate limits, abuse monitoring, human escalation, and incident response.`, `A content filter is not complete safety and can be evaded or overblock. Prompt injection is not solved by a stronger prompt. Sensitive attributes can be inferred from proxies. Red-team examples become another overfit set. Safety can regress with model, prompt, tool, or retrieval changes. Logging blocked content may retain the very material policy intended to protect.`, `Threat-model a document assistant that summarizes uploaded files and can send an approved result by email.`, `Treat every file as untrusted, scan and parse in isolation with size and format caps, and scope storage and retrieval to the owner. Document text cannot change tool policy. Summarization has citation and no-answer behavior; private values are redacted from telemetry. Email is propose-only until the user sees recipients, subject, body, attachments, and data warning; execution reauthorizes a one-time proposal. Test malicious document instructions, archive bombs, parser exploits, cross-tenant retrieval, recipient injection, secret extraction, unsafe content, provider retention, and deletion after backup restore.`, authored('AI safety and security', ['AI risk combines system capability, data, actors, deployment context, and consequence', 'Defense spans authorization, minimization, isolation, evidence, approval, monitoring, and response', 'Filters and stronger prompts cannot independently stop injection, privacy loss, or tool misuse', 'Mastery threat-models every data and action boundary, red-teams controls, and rehearses incidents'])),
    lesson('observability-governance', 'AI observability, cost, governance, and lifecycle', `An operated AI feature needs signals for user success, task quality, groundedness, abstention, safety, latency, availability, token and tool use, cost, data drift, model change, and human overrides. Observability must preserve enough identity to reproduce an outcome without collecting unnecessary private content. Governance assigns owners, intended use, risk class, approval, documentation, monitoring, incident, and retirement.`, `Log operation id, safe task class, model and prompt versions, retrieval index, tool versions, finish reason, token counts, timing, cost, validation result, and outcome labels under retention policy. Sample or encrypt sensitive traces separately. Set budgets per user operation, cache only with correct identity and freshness, batch appropriate work, route tasks by measured need, and cap loops. Maintain a system card and change ledger.`, `Provider dashboards do not measure product correctness. Token reduction can harm evidence. Caching personalized prompts can cross users. Cost averages hide runaway agents and adversarial large inputs. Drift alarms without an action become noise. Retaining every prompt for debugging conflicts with privacy. A model retirement can break reproducibility unless artifacts or decision records remain.`, `Create an operations review and release process for the private library assistant.`, `The review shows task success and unsupported-claim rate by intent, citation validity, abstention and coverage, critical safety failures, user corrections, p50 and tail latency, availability, tokens, tools, and cost per successful task. It checks data and output retention, access, deletion, and provider terms. A candidate runs the frozen gate, shadow or canary, and explicit abort thresholds. Owners can disable tools or the whole feature independently. Incident procedure preserves safe metadata, contains credentials and indexes, notifies affected users when required, and feeds regression fixtures without retaining unnecessary private content.`, authored('AI operations and governance', ['AI observability connects versioned system inputs to quality, safety, latency, cost, and user outcome', 'Governance assigns intended use, owners, controls, change gates, incidents, and retirement', 'Provider uptime, average tokens, and complete prompt logging can hide failure or create privacy harm', 'Mastery can reproduce, budget, canary, disable, investigate, correct, and retire an AI capability'])),
    lesson('capstone-ai-systems', 'Capstone: build an evaluated private AI workspace', `Build a private workspace that answers questions over local documents, extracts structured metadata, drafts a plan, and proposes narrowly scoped actions. It must support exact evidence citations, unknown and clarification, user correction, export and deletion, and operation without sending private content outside the selected deployment boundary. Write intended use, non-goals, user journeys, threat model, data map, and acceptance thresholds first.`, `Implement defensive ingestion, versioned hybrid retrieval, typed model adapter, prompt hierarchy, schema validation, deterministic calculators, claim and citation verification, a bounded workflow state machine, read-only tools plus propose-approve-commit actions, tenant authorization, privacy controls, telemetry, budgets, and a reproducible model or provider configuration. Include deterministic and model baselines.`, `Evaluate ambiguous, multilingual, conflicting, obsolete, absent, adversarial, sensitive, long, and malformed inputs. Inject parser failure, poisoned document, retrieval outage, model timeout, truncated output, invalid schema, unsafe proposal, duplicate tool call, stale approval, provider change, cost surge, and deletion restored from backup. Red-team data exfiltration and cross-user access. Rehearse disabling tools, restoring indexes, rotating credentials, and notifying users.`, `Write a single assurance case connecting every promised capability and forbidden behavior to evidence.`, `For each claim list requirement, data source, implementation boundary, deterministic validator, frozen evaluation slice, live metric, owner, failure response, and residual risk. Trace one operation through ingestion version, retrieval passages, prompt, model, validation, citation, proposal, approval, transaction, audit, and deletion. Record quality with uncertainty, cost per successful task, privacy retention, and rollback. The workspace passes when another operator can reproduce it, compare it to the baseline, attack every trust boundary, inspect why an answer or action occurred, recover from injected failure, and retire all stored user data using only the included course.`, authored('AI and LLM mastery', ['AI mastery integrates task framing, data, models, evidence, software controls, people, and operations', 'Every uncertain output and consequential action needs independent validation and bounded authority', 'A fluent demo cannot prove generalization, grounding, privacy, safety, recoverability, or value', 'Mastery frames, builds, evaluates, red-teams, canaries, operates, audits, recovers, and retires the system']))
  ]
}
