import type { EnWordFormItem } from './types'

// Word formation (Use of English part 3 style): a sentence with a gap and a
// STEM in capitals; the learner types the derived form. Keys FROZEN. Gate:
// tests/englishUse.test.ts.
export const EN_WORD_FORMATION: EnWordFormItem[] = [
  {
    key: 'wf-01',
    text: 'The witness proved so ___ that the jury discounted her testimony entirely.',
    stem: 'RELY',
    answers: ['unreliable'],
    target: 'adjective',
    negative: true,
    explain: 'RELY to reliable (adjective) to unreliable: the sentence needs a negative quality that makes the jury discount her.'
  },

  // ---- nouns ----
  {
    key: 'wf-02',
    text: 'There is growing ___ that the two departments were never told to share their data.',
    stem: 'SUSPECT',
    answers: ['suspicion'],
    target: 'noun',
    explain: 'SUSPECT takes -ion with a stem change: growing suspicion is the standard collocation.'
  },
  {
    key: 'wf-03',
    text: 'The whole plan rests on the ___ that interest rates will fall.',
    stem: 'ASSUME',
    answers: ['assumption'],
    target: 'noun',
    explain: 'ASSUME to assumption: -ption replaces -me, and the noun is what a plan rests on.'
  },
  {
    key: 'wf-04',
    text: 'Her ___ to detail is what makes the work so persuasive.',
    stem: 'ATTEND',
    answers: ['attention'],
    target: 'noun',
    explain: 'ATTEND to attention, in the fixed collocation attention to detail.'
  },
  {
    key: 'wf-05',
    text: 'The scheme was abandoned after the ___ of its main sponsor.',
    stem: 'WITHDRAW',
    answers: ['withdrawal'],
    target: 'noun',
    explain: 'WITHDRAW takes the -al noun suffix, not -ment.'
  },
  {
    key: 'wf-06',
    text: "The report's chief ___ is that it ignores the cost of maintenance.",
    stem: 'WEAK',
    answers: ['weakness'],
    target: 'noun',
    explain: 'An adjective plus -ness gives the abstract quality noun required after chief.'
  },
  {
    key: 'wf-07',
    text: 'The committee expressed its ___ with the pace of reform.',
    stem: 'SATISFY',
    answers: ['dissatisfaction'],
    target: 'noun',
    negative: true,
    explain: 'SATISFY to satisfaction to dissatisfaction: with the pace of reform criticised, the negative prefix dis- is required.'
  },
  {
    key: 'wf-08',
    text: 'Public ___ to the new tax has been remarkably muted.',
    stem: 'RESIST',
    answers: ['resistance'],
    target: 'noun',
    explain: 'RESIST takes -ance, and the noun keeps the preposition to.'
  },
  {
    key: 'wf-09',
    text: 'There is no ___ that the drug works at all.',
    stem: 'EVIDENT',
    answers: ['evidence'],
    target: 'noun',
    explain: 'The -ent adjective gives an -ence noun, and evidence is uncountable, so no article follows no.'
  },
  {
    key: 'wf-10',
    text: "The company's ___ of the safety rules was, at best, patchy.",
    stem: 'OBSERVE',
    answers: ['observance'],
    target: 'noun',
    explain: 'Observance is the noun for keeping to rules; observation would mean watching.'
  },
  {
    key: 'wf-11',
    text: 'The ___ between the two accounts is too close to be a coincidence.',
    stem: 'RESEMBLE',
    answers: ['resemblance'],
    target: 'noun',
    explain: 'RESEMBLE drops -e and takes -ance; the noun takes between for two things.'
  },
  {
    key: 'wf-12',
    text: 'A degree of ___ is inevitable when the instructions are this vague.',
    stem: 'CONFUSE',
    answers: ['confusion'],
    target: 'noun',
    explain: 'CONFUSE to confusion: an uncountable state noun after a degree of.'
  },
  {
    key: 'wf-13',
    text: "The minister's ___ to answer the question was noted by every paper.",
    stem: 'REFUSE',
    answers: ['refusal'],
    target: 'noun',
    explain: 'REFUSE takes -al, and the noun keeps the infinitive pattern: refusal to do something.'
  },
  {
    key: 'wf-14',
    text: 'The scheme has brought measurable ___ to the whole neighbourhood.',
    stem: 'PROSPER',
    answers: ['prosperity'],
    target: 'noun',
    explain: 'PROSPER to prosperous to prosperity: the -ity noun names the state.'
  },
  {
    key: 'wf-15',
    text: 'His ___ was exposed as soon as the accounts were audited.',
    stem: 'HONEST',
    answers: ['dishonesty'],
    target: 'noun',
    negative: true,
    explain: 'HONEST to honesty to dishonesty: being exposed by an audit requires the negative noun.'
  },
  {
    key: 'wf-16',
    text: 'The ___ of the two systems makes any migration impossible.',
    stem: 'COMPATIBLE',
    answers: ['incompatibility'],
    target: 'noun',
    negative: true,
    explain: 'COMPATIBLE to compatibility to incompatibility: only the negative noun explains an impossible migration.'
  },
  {
    key: 'wf-17',
    text: 'Her ___ to take the job surprised everyone who knew her.',
    stem: 'RELUCTANT',
    answers: ['reluctance'],
    target: 'noun',
    explain: 'An -ant adjective gives an -ance noun, which keeps the infinitive pattern.'
  },
  {
    key: 'wf-18',
    text: 'The whole dispute arose from a simple ___ of the instructions.',
    stem: 'READ',
    answers: ['misreading'],
    target: 'noun',
    negative: true,
    explain: 'The prefix mis- plus the -ing noun gives the sense of reading something wrongly.'
  },

  // ---- adjectives ----
  {
    key: 'wf-19',
    text: 'The instructions were so ___ that nobody could follow them.',
    stem: 'COMPREHEND',
    answers: ['incomprehensible'],
    target: 'adjective',
    negative: true,
    explain: 'COMPREHEND to comprehensible to incomprehensible: before a b-stem the negative prefix is in-.'
  },
  {
    key: 'wf-20',
    text: 'The damage to the manuscript is sadly ___.',
    stem: 'REPAIR',
    answers: ['irreparable'],
    target: 'adjective',
    negative: true,
    explain: 'The prefix assimilates to ir- before r-, and the stem shortens: irreparable, not unrepairable.'
  },
  {
    key: 'wf-21',
    text: 'She has been unusually ___ about her plans for the summer.',
    stem: 'SECRET',
    answers: ['secretive'],
    target: 'adjective',
    explain: 'The -ive suffix turns the noun into an adjective describing a person who withholds information.'
  },
  {
    key: 'wf-22',
    text: 'The argument is ingenious but ultimately ___.',
    stem: 'PERSUADE',
    answers: ['unpersuasive'],
    target: 'adjective',
    negative: true,
    explain: 'PERSUADE to persuasive to unpersuasive: but signals that the second adjective reverses the first.'
  },
  {
    key: 'wf-23',
    text: 'The town has become increasingly ___ on tourism.',
    stem: 'DEPEND',
    answers: ['dependent'],
    target: 'adjective',
    explain: 'The adjective ends -ent (the noun is dependant in British English) and keeps the preposition on.'
  },
  {
    key: 'wf-24',
    text: 'The two sets of figures are simply not ___.',
    stem: 'COMPARE',
    answers: ['comparable'],
    target: 'adjective',
    explain: 'COMPARE drops -e and takes -able; the negation is already carried by not.'
  },
  {
    key: 'wf-25',
    text: 'He is far too ___ to admit in public that he was wrong.',
    stem: 'PRIDE',
    answers: ['proud'],
    target: 'adjective',
    explain: 'The adjective of the noun pride is the irregular form proud.'
  },
  {
    key: 'wf-26',
    text: 'The evidence for the theory remains ___ at best.',
    stem: 'CONVINCE',
    answers: ['unconvincing'],
    target: 'adjective',
    negative: true,
    explain: 'The participial adjective describes the evidence, and at best forces the negative form.'
  },
  {
    key: 'wf-27',
    text: 'The novel is, in my view, wildly ___.',
    stem: 'RATE',
    answers: ['overrated'],
    target: 'adjective',
    explain: 'The prefix over- plus the past participle gives the adjective meaning praised more than it deserves.'
  },
  {
    key: 'wf-28',
    text: 'The professor is famously ___ about the failings of her own discipline.',
    stem: 'SPEAK',
    answers: ['outspoken'],
    target: 'adjective',
    explain: 'A compound of out- and the past participle spoken: willing to say what others will not.'
  },
  {
    key: 'wf-29',
    text: 'Their objections were entirely ___, since the plan had already been approved.',
    stem: 'POINT',
    answers: ['pointless'],
    target: 'adjective',
    explain: 'The suffix -less turns the noun into an adjective meaning without any purpose.'
  },
  {
    key: 'wf-30',
    text: 'The new results are ___ with everything else we know about the disease, which is why they are being re-checked.',
    stem: 'CONSIST',
    answers: ['inconsistent'],
    target: 'adjective',
    negative: true,
    explain: 'CONSIST to consistent to inconsistent: the re-checking only makes sense if the results clash.'
  },
  {
    key: 'wf-31',
    text: 'His ___ remark caused considerable offence.',
    stem: 'THINK',
    answers: ['thoughtless'],
    target: 'adjective',
    explain: 'THINK to thought to thoughtless: offence follows from a remark made without thinking.'
  },
  {
    key: 'wf-32',
    text: 'The new rules are ___ on every member of staff.',
    stem: 'BIND',
    answers: ['binding'],
    target: 'adjective',
    explain: 'The -ing participle works as an adjective meaning legally obligatory, and takes on.'
  },
  {
    key: 'wf-33',
    text: 'The two witnesses gave ___ accounts of the same evening.',
    stem: 'CONTRADICT',
    answers: ['contradictory'],
    target: 'adjective',
    explain: 'The suffix -ory gives the adjective describing accounts that cannot both be true.'
  },
  {
    key: 'wf-34',
    text: 'The measures proved wholly ___ in stopping the spread of the disease.',
    stem: 'EFFECT',
    answers: ['ineffective'],
    target: 'adjective',
    negative: true,
    explain: 'EFFECT to effective to ineffective: wholly plus a negative adjective says the measures failed.'
  },
  {
    key: 'wf-35',
    text: 'In spite of the shock, she gave a perfectly ___ account of the accident.',
    stem: 'COHERE',
    answers: ['coherent'],
    target: 'adjective',
    explain: 'COHERE to coherent: in spite of the shock signals that the account did hang together.'
  },
  {
    key: 'wf-36',
    text: 'The signature on the second page turned out to be completely ___.',
    stem: 'LEGIBLE',
    answers: ['illegible'],
    target: 'adjective',
    negative: true,
    explain: 'The negative prefix assimilates to il- before l-.'
  },
  {
    key: 'wf-37',
    text: 'Support for the proposal was, in practice, ___.',
    stem: 'EXIST',
    answers: ['non-existent', 'nonexistent'],
    target: 'adjective',
    negative: true,
    explain: 'The prefix non- plus the -ent adjective; British English usually hyphenates it.'
  },
  {
    key: 'wf-38',
    text: 'He grew visibly ___ as the meeting dragged on.',
    stem: 'PATIENT',
    answers: ['impatient'],
    target: 'adjective',
    negative: true,
    explain: 'The negative prefix assimilates to im- before p-.'
  },

  // ---- adverbs ----
  {
    key: 'wf-39',
    text: 'The plan was ___ conceived, which is why it fell apart within a month.',
    stem: 'HASTE',
    answers: ['hastily'],
    target: 'adverb',
    explain: 'HASTE to hasty to hastily: -y becomes -ily before the adverb ending.'
  },
  {
    key: 'wf-40',
    text: 'The two events are only ___ related.',
    stem: 'LOOSE',
    answers: ['loosely'],
    target: 'adverb',
    explain: 'The adverb modifies the participle related and keeps the -se spelling of the adjective.'
  },
  {
    key: 'wf-41',
    text: '___, the letter arrived on the very day she had given up hope.',
    stem: 'IRONY',
    answers: ['ironically'],
    target: 'adverb',
    explain: 'IRONY to ironic to ironically: a sentence adverb commenting on the whole clause.'
  },
  {
    key: 'wf-42',
    text: 'The witness answered every question ___ and without hesitation.',
    stem: 'TRUTH',
    answers: ['truthfully'],
    target: 'adverb',
    explain: 'TRUTH to truthful to truthfully: -ful plus -ly, keeping both l sounds.'
  },
  {
    key: 'wf-43',
    text: 'The roof of the hall was ___ damaged in the storm.',
    stem: 'SEVERE',
    answers: ['severely'],
    target: 'adverb',
    explain: 'The adverb grades the participle damaged; -e is kept before -ly.'
  },
  {
    key: 'wf-44',
    text: 'The system has performed ___ well since the upgrade.',
    stem: 'SURPRISE',
    answers: ['surprisingly'],
    target: 'adverb',
    explain: 'The participial adjective surprising takes -ly to modify the adverb well.'
  },
  {
    key: 'wf-45',
    text: 'The proposal was ___ rejected by every member of the panel.',
    stem: 'UNANIMOUS',
    answers: ['unanimously'],
    target: 'adverb',
    explain: 'A plain -ly adverb from an -ous adjective, modifying the passive verb.'
  },
  {
    key: 'wf-46',
    text: '___ speaking, the two theories amount to much the same thing.',
    stem: 'BROAD',
    answers: ['broadly'],
    target: 'adverb',
    explain: 'The fixed hedging phrase broadly speaking opens the sentence.'
  },
  {
    key: 'wf-47',
    text: 'The figures have been ___ revised since publication.',
    stem: 'REPEAT',
    answers: ['repeatedly'],
    target: 'adverb',
    explain: 'REPEAT to repeated to repeatedly: the adverb is built on the past participle.'
  },
  {
    key: 'wf-48',
    text: 'He answered ___, as though he had rehearsed the words a hundred times.',
    stem: 'MECHANIC',
    answers: ['mechanically'],
    target: 'adverb',
    explain: 'An -ic adjective takes -ally, not just -ly.'
  },
  {
    key: 'wf-49',
    text: 'The two accounts differ ___ on one crucial point.',
    stem: 'MARK',
    answers: ['markedly'],
    target: 'adverb',
    explain: 'MARK to marked to markedly: the adverb from the participial adjective means noticeably.'
  },
  {
    key: 'wf-50',
    text: 'The regulator acted ___ of the minister and his advisers.',
    stem: 'DEPEND',
    answers: ['independently'],
    target: 'adverb',
    negative: true,
    explain: 'DEPEND to dependent to independent to independently, keeping the preposition of.'
  },
  {
    key: 'wf-51',
    text: 'The two editions of the report are ___ different.',
    stem: 'SUBTLE',
    answers: ['subtly'],
    target: 'adverb',
    explain: 'Adjectives in -le drop the e and take -y: subtle becomes subtly.'
  },

  // ---- verbs ----
  {
    key: 'wf-52',
    text: 'Analysts have consistently ___ the cost of the project.',
    stem: 'ESTIMATE',
    answers: ['underestimated'],
    target: 'verb',
    explain: 'The prefix under- gives the verb meaning to judge something as smaller than it is; the perfect needs the -ed form.'
  },
  {
    key: 'wf-53',
    text: 'The new evidence does nothing to ___ his account of that night.',
    stem: 'STRONG',
    answers: ['strengthen'],
    target: 'verb',
    explain: 'The suffix -en turns an adjective into a causative verb.'
  },
  {
    key: 'wf-54',
    text: 'The government has promised to ___ the licensing rules.',
    stem: 'SIMPLE',
    answers: ['simplify'],
    target: 'verb',
    explain: 'The suffix -ify makes a verb meaning to render something simple.'
  },
  {
    key: 'wf-55',
    text: 'It is difficult to ___ a decision taken behind closed doors.',
    stem: 'JUST',
    answers: ['justify'],
    target: 'verb',
    explain: 'JUST plus -ify gives the verb meaning to show that something is right.'
  },
  {
    key: 'wf-56',
    text: 'The court may yet ___ the earlier ruling.',
    stem: 'TURN',
    answers: ['overturn'],
    target: 'verb',
    explain: 'The prefix over- gives the legal verb meaning to reverse a decision.'
  },
  {
    key: 'wf-57',
    text: 'The new figures ___ everything the committee was told last year.',
    stem: 'VALID',
    answers: ['invalidate'],
    target: 'verb',
    negative: true,
    explain: 'VALID to validate to invalidate: the negative prefix gives the sense of making earlier claims worthless.'
  },
  {
    key: 'wf-58',
    text: 'A single leak could ___ the entire negotiation.',
    stem: 'JEOPARDY',
    answers: ['jeopardise', 'jeopardize'],
    target: 'verb',
    explain: 'The noun takes -ise (or the -ize spelling, also used in British English) to make the verb meaning to put at risk.'
  },
  {
    key: 'wf-59',
    text: 'Ministers moved quickly to ___ the significance of the leaked memo.',
    stem: 'PLAY',
    answers: ['downplay'],
    target: 'verb',
    explain: 'The compound with down- means to present something as less important than it is.'
  },
  {
    key: 'wf-60',
    text: 'The spokesman was asked to ___ what exactly the minister had meant.',
    stem: 'CLEAR',
    answers: ['clarify'],
    target: 'verb',
    explain: 'CLEAR plus -ify (with the stem shortened) gives the verb meaning to make clear.'
  },
  {
    key: 'wf-61',
    text: 'Critics say the changes ___ the qualification.',
    stem: 'VALUE',
    answers: ['devalue'],
    target: 'verb',
    negative: true,
    explain: 'The prefix de- reverses the noun-verb: to reduce the worth of something.'
  },
  {
    key: 'wf-62',
    text: 'The article does not ___ any of the claims it makes.',
    stem: 'SUBSTANCE',
    answers: ['substantiate'],
    target: 'verb',
    explain: 'The -iate suffix gives the formal verb meaning to support a claim with evidence.'
  },
  {
    key: 'wf-63',
    text: 'It would be wrong to ___ the significance of a single study.',
    stem: 'STATE',
    answers: ['overstate'],
    target: 'verb',
    explain: 'The prefix over- gives the verb meaning to express something too strongly.'
  },
  {
    key: 'wf-64',
    text: 'The two departments have failed to ___ their record-keeping.',
    stem: 'STANDARD',
    answers: ['standardise', 'standardize'],
    target: 'verb',
    explain: 'The suffix -ise (or -ize) turns the noun into a verb meaning to make uniform.'
  },
  {
    key: 'wf-65',
    text: "The press had ___ the minister's remarks, as the recording later made clear.",
    stem: 'QUOTE',
    answers: ['misquoted'],
    target: 'verb',
    negative: true,
    explain: 'The prefix mis- means wrongly, and the past perfect needs the -ed form.'
  }
]
