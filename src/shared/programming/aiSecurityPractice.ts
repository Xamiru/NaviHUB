import type { LearningUnit } from '../learningEvidence'

const lines = (...parts: string[]): string => parts.join('\n')

// Course keys are frozen because learning evidence is stored under these ids.
export const AI_SECURITY_PRACTICE: Record<string, LearningUnit> = {
  'ai-llm-engineering': {
    id: 'ai-llm-engineering',
    title: 'AI and LLM engineering evidence lab',
    body: lines(
      'Treat quality, coverage, cost, and safety as separate quantities. Suppose a retrieval assistant receives 200 questions, answers 150, and gives 132 fully supported answers. Coverage is 150 / 200 = 75%. Accuracy among answers is 132 / 150 = 88%. End-to-end supported-answer rate is 132 / 200 = 66%. Reporting only 88% hides the 50 abstentions; reporting only 66% hides how well answered cases perform.',
      '',
      'Budgets compose across calls. If one operation makes three calls using 800 input and 200 output tokens each, it consumes 3,000 tokens. At $0.002 per 1,000 tokens, that costs $0.006. A retry doubles only the retried call, not the completed calls, so one retry adds 1,000 tokens and $0.002. Write units beside every intermediate value; confusing per-call with per-operation cost is a common production error.',
      '',
      'For actions, use read -> propose -> approve -> commit -> reconcile. A timeout after commit is an unknown client outcome, not proof of failure. Reuse the proposal and operation ids, query durable status, and return the existing receipt. Never create a fresh mutation merely because the response was lost.'
    ),
    practice: [
      {
        id: 'ai-practice-selective-metrics',
        prompt: 'A system receives 240 questions, answers 180, and 153 answers are fully supported. Enter: COVERAGE%, ANSWERED-ACCURACY%, END-TO-END-SUPPORT%',
        answers: ['75%, 85%, 63.75%'],
        explanation: 'Coverage is 180/240 = 75%; answered accuracy is 153/180 = 85%; end-to-end support is 153/240 = 63.75%.'
      },
      {
        id: 'ai-practice-operation-budget',
        prompt: 'An operation makes two 1,200-token calls and one 600-token call. One 1,200-token call retries once. At $0.003 per 1,000 tokens, enter: TOTAL-TOKENS, $COST',
        answers: ['4200, $0.0126', '4,200, $0.0126'],
        explanation: 'Normal work uses 1,200 + 1,200 + 600 = 3,000 tokens. The retry adds 1,200, giving 4,200. Multiply 4.2 thousand by $0.003 to get $0.0126.'
      }
    ],
    transfer: [
      {
        id: 'ai-transfer-retrieval-funnel',
        prompt: 'On a fresh evaluation, 320 questions yield 256 answers and 224 supported answers. Enter: COVERAGE%, ANSWERED-ACCURACY%, END-TO-END-SUPPORT%',
        answers: ['80%, 87.5%, 70%'],
        explanation: 'The three denominators test different claims: 256/320, 224/256, and 224/320.'
      },
      {
        id: 'ai-transfer-timeout-decision',
        prompt: 'Proposal P9 uses operation O4. Its commit times out after the server may have committed. Which operation id must the client reconcile?',
        answers: ['O4'],
        explanation: 'Stable operation identity makes the uncertain durable result discoverable and prevents a duplicate action.'
      }
    ]
  },
  'cybersecurity-engineering': {
    id: 'cybersecurity-engineering',
    title: 'Cybersecurity engineering evidence lab',
    body: lines(
      'Risk and capacity decisions need explicit arithmetic. For an asset with 2,000 records, a plausible incident affecting 10% of them exposes 200 records. If a control reduces that affected fraction to 2%, residual exposure is 40 records, a reduction of 160. This is a scenario estimate with assumptions, not an objective probability.',
      '',
      'For authentication telemetry, distinguish totals. If 500 legitimate logins include 15 false rejections, the false-rejection rate is 15 / 500 = 3%. If 80 known attacks include 68 blocks, attack recall is 68 / 80 = 85%. One percentage cannot replace the other because stricter controls can improve blocking while harming legitimate users.',
      '',
      'Incident work follows a timed dependency order: declare and assign roles, contain active authority, preserve evidence, determine scope, eradicate access, recover from trusted sources, then review. Evidence collection can overlap containment, but never rotate or destroy the only copy before recording identity, timestamps, hashes, and access. A schedule should state which tasks can run in parallel and which require a predecessor.'
    ),
    practice: [
      {
        id: 'security-practice-control-effect',
        prompt: 'A scenario exposes 15% of 1,600 records before a control and 3% after it. Enter: ORIGINAL, RESIDUAL, REDUCTION',
        answers: ['240, 48, 192'],
        explanation: '1,600 × 0.15 = 240; 1,600 × 0.03 = 48; the estimated reduction is 192 records.'
      },
      {
        id: 'security-practice-response-schedule',
        prompt: 'A token incident starts at 09:00. Declaration takes 10 minutes; containment then takes 20; evidence preservation starts after declaration and takes 35; scoping needs containment and evidence. Enter the earliest scoping start as HH:MM.',
        answers: ['09:45', '9:45'],
        explanation: 'Declaration ends 09:10. Containment ends 09:30 while evidence ends 09:45; scoping waits for both, so it starts at 09:45.'
      }
    ],
    transfer: [
      {
        id: 'security-transfer-auth-rates',
        prompt: 'A fresh test has 800 legitimate attempts with 16 false rejections and 120 attacks with 102 blocks. Enter: FALSE-REJECTION%, ATTACK-RECALL%',
        answers: ['2%, 85%'],
        explanation: 'False rejection is 16/800 = 2%; attack recall is 102/120 = 85%.'
      },
      {
        id: 'security-transfer-recovery-order',
        prompt: 'A compromised identity has three independent active tokens: T1, T2 and T3. The response revokes only T1, then rebuilds the service without changing token validation. How many compromised tokens can still authorize requests? Enter one integer.',
        answers: ['2'],
        explanation: 'T2 and T3 remain active. Rebuilding software does not revoke credentials; recovery must remove the compromised authority as well as restore trusted artifacts.'
      }
    ]
  }
}
