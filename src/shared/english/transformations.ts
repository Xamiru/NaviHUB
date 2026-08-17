import type { EnTransformItem } from './types'

// Key-word transformations (Use of English part 4 style): rewrite the
// original using the KEYWORD, filling the gap with 3-6 words. Keys FROZEN.
// List contraction and word-order variants in `answers`. Gate:
// tests/englishUse.test.ts.
export const EN_TRANSFORMATIONS: EnTransformItem[] = [
  // ---- wish / regret ----
  {
    key: 'tr-01',
    original: 'I regret not taking the job in Lisbon.',
    keyword: 'WISH',
    gapped: 'I ___ the job in Lisbon.',
    answers: ['wish I had taken', 'wish that I had taken', "wish I'd taken"],
    focus: 'wish-regret',
    explain: 'Regret about the past to wish + past perfect.'
  },
  {
    key: 'tr-02',
    original: 'I am sorry I did not book the tickets earlier.',
    keyword: 'ONLY',
    gapped: 'If ___ the tickets earlier.',
    answers: ['only I had booked', "only I'd booked"],
    focus: 'wish-regret',
    explain: '"If only" + past perfect expresses regret about a past action.'
  },
  {
    key: 'tr-03',
    original: 'It is a pity you cannot come with us.',
    keyword: 'WISH',
    gapped: 'I ___ come with us.',
    answers: ['wish you could', 'wish that you could'],
    focus: 'wish-regret',
    explain: 'Wish + could for a present ability that is missing.'
  },
  {
    key: 'tr-04',
    original: 'I regret telling her what I thought of the plan.',
    keyword: 'KEPT',
    gapped: 'I wish ___ to myself.',
    answers: ['I had kept my opinion', "I'd kept my opinion"],
    focus: 'wish-regret',
    explain: 'Wish + past perfect, with the idiom keep something to yourself.'
  },

  // ---- passive ----
  {
    key: 'tr-05',
    original: 'Someone is repairing the roof this week.',
    keyword: 'BEING',
    gapped: 'The roof ___ this week.',
    answers: ['is being repaired'],
    focus: 'passive',
    explain: 'Present continuous passive: is/are + being + past participle.'
  },
  {
    key: 'tr-06',
    original: 'They believe the manuscript to be a forgery.',
    keyword: 'BELIEVED',
    gapped: 'The manuscript ___ a forgery.',
    answers: ['is believed to be'],
    focus: 'passive',
    explain: 'Impersonal passive reporting: subject + is believed + to-infinitive.'
  },
  {
    key: 'tr-07',
    original: 'Nobody has cleaned this office for weeks.',
    keyword: 'BEEN',
    gapped: 'This office ___ for weeks.',
    answers: ['has not been cleaned', "hasn't been cleaned"],
    focus: 'passive',
    explain: 'Present perfect passive, with the negative carried by the auxiliary.'
  },
  {
    key: 'tr-08',
    original: 'The council will announce the decision tomorrow.',
    keyword: 'ANNOUNCED',
    gapped: 'The decision ___ tomorrow.',
    answers: ['will be announced'],
    focus: 'passive',
    explain: 'Future passive: will + be + past participle.'
  },
  {
    key: 'tr-09',
    original: 'People say the castle is haunted.',
    keyword: 'SAID',
    gapped: 'The castle ___ haunted.',
    answers: ['is said to be'],
    focus: 'passive',
    explain: 'Impersonal passive with say: the object of the report becomes the subject.'
  },

  // ---- reported speech ----
  {
    key: 'tr-10',
    original: "'I will call you on Friday,' he said.",
    keyword: 'WOULD',
    gapped: 'He said that ___ on Friday.',
    answers: ['he would call me'],
    focus: 'reported',
    explain: 'Backshift in reported speech: will becomes would, and the pronouns shift.'
  },
  {
    key: 'tr-11',
    original: "'You should see a doctor,' she told me.",
    keyword: 'ADVISED',
    gapped: 'She ___ a doctor.',
    answers: ['advised me to see'],
    focus: 'reported',
    explain: 'Advise takes an object plus a to-infinitive when reporting a recommendation.'
  },
  {
    key: 'tr-12',
    original: "'I did not touch the report,' he insisted.",
    keyword: 'DENIED',
    gapped: 'He ___ the report.',
    answers: ['denied having touched', 'denied that he had touched', 'denied ever touching'],
    focus: 'reported',
    explain: 'Deny is followed by a gerund (or a that-clause), never by a to-infinitive.'
  },
  {
    key: 'tr-13',
    original: "'Do not sign anything yet,' the lawyer told us.",
    keyword: 'AGAINST',
    gapped: 'The lawyer ___ anything yet.',
    answers: ['warned us against signing'],
    focus: 'reported',
    explain: 'Warn somebody against + -ing reports a negative instruction.'
  },

  // ---- conditionals ----
  {
    key: 'tr-14',
    original: 'I did not know about the strike, so I took the car.',
    keyword: 'HAD',
    gapped: 'If ___ about the strike, I would not have taken the car.',
    answers: ['I had known'],
    focus: 'conditional',
    explain: 'Third conditional: if + past perfect for an unreal past cause.'
  },
  {
    key: 'tr-15',
    original: 'Without your help, we would have missed the deadline.',
    keyword: 'NOT',
    gapped: 'If ___ your help, we would have missed the deadline.',
    answers: ['it had not been for'],
    focus: 'conditional',
    explain: '"If it had not been for" is the full third-conditional equivalent of without.'
  },
  {
    key: 'tr-16',
    original: 'You can borrow the car as long as you fill it up.',
    keyword: 'PROVIDED',
    gapped: 'You can borrow the car ___ it up.',
    answers: ['provided that you fill', 'provided you fill'],
    focus: 'conditional',
    explain: 'Provided (that) is a formal conditional conjunction meaning on condition that.'
  },
  {
    key: 'tr-17',
    original: 'Unless you leave now, you will miss the train.',
    keyword: "DON'T",
    gapped: 'You will miss the train ___ now.',
    answers: ["if you don't leave"],
    focus: 'conditional',
    explain: 'Unless is equivalent to a negative if-clause.'
  },
  {
    key: 'tr-18',
    original: 'You will only pass the exam if you revise.',
    keyword: 'UNLESS',
    gapped: 'You ___ revise.',
    answers: ['will not pass unless you', "won't pass unless you"],
    focus: 'conditional',
    explain: 'A negative main clause plus unless replaces the restrictive only if.'
  },

  // ---- inversion ----
  {
    key: 'tr-19',
    original: 'I had never seen such a mess.',
    keyword: 'HAD',
    gapped: 'Never ___ such a mess.',
    answers: ['had I seen'],
    focus: 'inversion',
    explain: 'A fronted negative adverbial forces subject-auxiliary inversion.'
  },
  {
    key: 'tr-20',
    original: 'The film had only just started when the fire alarm went off.',
    keyword: 'SOONER',
    gapped: 'No ___ started than the fire alarm went off.',
    answers: ['sooner had the film'],
    focus: 'inversion',
    explain: '"No sooner ... than" with inversion of the past perfect.'
  },
  {
    key: 'tr-21',
    original: 'If you should need any help, just ring the bell.',
    keyword: 'SHOULD',
    gapped: '___ any help, just ring the bell.',
    answers: ['should you need'],
    focus: 'inversion',
    explain: 'Inverted should replaces if in a formal conditional.'
  },
  {
    key: 'tr-22',
    original: 'She not only missed the deadline but also lost the file.',
    keyword: 'DID',
    gapped: 'Not only ___ the deadline, but she also lost the file.',
    answers: ['did she miss'],
    focus: 'inversion',
    explain: 'Fronted "not only" takes the dummy auxiliary did before the subject.'
  },

  // ---- comparison ----
  {
    key: 'tr-23',
    original: 'I have never eaten a better meal.',
    keyword: 'BEST',
    gapped: 'That is ___ ever eaten.',
    answers: ['the best meal I have', "the best meal I've"],
    focus: 'comparison',
    explain: 'A never + comparative sentence becomes a superlative with a present perfect relative clause.'
  },
  {
    key: 'tr-24',
    original: 'The second lecture was more interesting than the first.',
    keyword: 'AS',
    gapped: 'The first lecture ___ the second.',
    answers: ['was not as interesting as', "wasn't as interesting as"],
    focus: 'comparison',
    explain: 'A comparative reverses into a negative equative: not as + adjective + as.'
  },
  {
    key: 'tr-25',
    original: "This year's results are much worse than last year's.",
    keyword: 'NEARLY',
    gapped: "This year's results are ___ last year's.",
    answers: ['not nearly as good as'],
    focus: 'comparison',
    explain: '"Not nearly as ... as" expresses a large gap in the opposite direction.'
  },
  {
    key: 'tr-26',
    original: 'Everyone had expected the exam to be harder than it actually was.',
    keyword: 'DIFFICULT',
    gapped: 'The exam was not ___ everyone had expected.',
    answers: ['as difficult as', 'so difficult as'],
    focus: 'comparison',
    explain: 'Negative equative; after a negative, so is an accepted alternative to the first as.'
  },

  // ---- modals ----
  {
    key: 'tr-27',
    original: 'I am sure she has forgotten about the meeting.',
    keyword: 'MUST',
    gapped: 'She ___ about the meeting.',
    answers: ['must have forgotten'],
    focus: 'modal',
    explain: 'Must + perfect infinitive for a confident deduction about the past.'
  },
  {
    key: 'tr-28',
    original: 'It was wrong of you to read her letters.',
    keyword: 'NOT',
    gapped: 'You ___ her letters.',
    answers: ['should not have read'],
    focus: 'modal',
    explain: 'Should not + perfect infinitive criticises a past action.'
  },
  {
    key: 'tr-29',
    original: 'It is possible that the parcel was delivered to the wrong house.',
    keyword: 'MIGHT',
    gapped: 'The parcel ___ to the wrong house.',
    answers: ['might have been delivered'],
    focus: 'modal',
    explain: 'Might + perfect passive infinitive for a past possibility.'
  },
  {
    key: 'tr-30',
    original: 'It was not necessary for you to wait.',
    keyword: 'NEED',
    gapped: 'You ___ waited.',
    answers: ['need not have'],
    focus: 'modal',
    explain: 'Need not + perfect infinitive: the action was done but was unnecessary.'
  },
  {
    key: 'tr-31',
    original: 'Perhaps he left the keys in the door.',
    keyword: 'MAY',
    gapped: 'He ___ the keys in the door.',
    answers: ['may have left'],
    focus: 'modal',
    explain: 'May + perfect infinitive expresses a past possibility.'
  },

  // ---- causative ----
  {
    key: 'tr-32',
    original: 'A local firm is painting our house at the moment.',
    keyword: 'HAVING',
    gapped: 'We ___ at the moment.',
    answers: ['are having our house painted'],
    focus: 'causative',
    explain: 'Have something done, here in the present continuous.'
  },
  {
    key: 'tr-33',
    original: "Someone stole Anna's bike last night.",
    keyword: 'HAD',
    gapped: 'Anna ___ last night.',
    answers: ['had her bike stolen'],
    focus: 'causative',
    explain: 'Have something done also reports something unpleasant that happened to the subject.'
  },
  {
    key: 'tr-34',
    original: 'I must arrange for someone to service the boiler before winter.',
    keyword: 'GET',
    gapped: 'I must ___ before winter.',
    answers: ['get the boiler serviced'],
    focus: 'causative',
    explain: 'Get something done is the less formal causative.'
  },
  {
    key: 'tr-35',
    original: 'I am going to ask the garage to check the brakes.',
    keyword: 'CHECKED',
    gapped: 'I am going to ___ at the garage.',
    answers: ['have the brakes checked', 'get the brakes checked'],
    focus: 'causative',
    explain: 'Causative have or get + object + past participle.'
  },

  // ---- phrasal verbs ----
  {
    key: 'tr-36',
    original: 'The organisers cancelled the meeting because of the storm.',
    keyword: 'OFF',
    gapped: 'The organisers ___ because of the storm.',
    answers: ['called off the meeting', 'called the meeting off'],
    focus: 'phrasal',
    explain: 'Call off is separable, so the noun object can go on either side of the particle.'
  },
  {
    key: 'tr-37',
    original: 'I cannot tolerate his rudeness any longer.',
    keyword: 'UP',
    gapped: 'I cannot ___ any longer.',
    answers: ['put up with his rudeness'],
    focus: 'phrasal',
    explain: 'Put up with is a three-part phrasal verb and cannot be split.'
  },
  {
    key: 'tr-38',
    original: 'The police are investigating the complaint.',
    keyword: 'LOOKING',
    gapped: 'The police ___ the complaint.',
    answers: ['are looking into'],
    focus: 'phrasal',
    explain: 'Look into is the phrasal equivalent of investigate and takes a direct object.'
  },
  {
    key: 'tr-39',
    original: 'Nobody was deceived by his excuse.',
    keyword: 'TAKEN',
    gapped: 'Nobody ___ his excuse.',
    answers: ['was taken in by'],
    focus: 'phrasal',
    explain: 'The passive of take somebody in keeps the particle and adds by before the agent.'
  },
  {
    key: 'tr-40',
    original: 'She resembles her mother more with every passing year.',
    keyword: 'AFTER',
    gapped: 'She ___ more with every passing year.',
    answers: ['takes after her mother'],
    focus: 'phrasal',
    explain: 'Take after somebody means to resemble an older relative.'
  },

  // ---- linking ----
  {
    key: 'tr-41',
    original: 'Although it rained all day, the festival was a success.',
    keyword: 'SPITE',
    gapped: '___ the rain, the festival was a success.',
    answers: ['in spite of'],
    focus: 'linking',
    explain: 'A concessive clause becomes the prepositional phrase in spite of + noun.'
  },
  {
    key: 'tr-42',
    original: 'Neither side would compromise, so the talks failed.',
    keyword: 'RESULT',
    gapped: 'The talks failed ___ the refusal of either side to compromise.',
    answers: ['as a result of'],
    focus: 'linking',
    explain: 'As a result of is a complex preposition of cause and is followed by a noun phrase.'
  },
  {
    key: 'tr-43',
    original: 'He is very young, but he is an excellent negotiator.',
    keyword: 'DESPITE',
    gapped: 'He is an excellent negotiator ___.',
    answers: ['despite his youth', 'despite being so young', 'despite his young age'],
    focus: 'linking',
    explain: 'Despite is a preposition, so it takes a noun phrase or a gerund, never a clause.'
  },
  {
    key: 'tr-44',
    original: 'We took a taxi because we did not want to be late.',
    keyword: 'ORDER',
    gapped: 'We took a taxi ___ late.',
    answers: ['in order not to be'],
    focus: 'linking',
    explain: 'A negative purpose clause: in order not to + bare infinitive.'
  },
  {
    key: 'tr-45',
    original: 'The road was closed, so we had to take a long detour.',
    keyword: 'CONSEQUENCE',
    gapped: '___ the road closure, we had to take a long detour.',
    answers: ['as a consequence of'],
    focus: 'linking',
    explain: 'As a consequence of introduces the cause as a noun phrase.'
  },

  // ---- verb patterns ----
  {
    key: 'tr-46',
    original: "'You really must come to dinner,' he said to us.",
    keyword: 'INSISTED',
    gapped: 'He ___ to dinner.',
    answers: ['insisted on our coming', 'insisted on us coming', 'insisted that we come'],
    focus: 'verb-pattern',
    explain: 'Insist takes on + gerund (with a possessive or object pronoun) or a that-clause.'
  },
  {
    key: 'tr-47',
    original: 'She apologised for arriving late.',
    keyword: 'SORRY',
    gapped: 'She said that ___ late.',
    answers: ['she was sorry for arriving'],
    focus: 'verb-pattern',
    explain: 'Be sorry for + gerund is the adjective pattern matching apologise for.'
  },
  {
    key: 'tr-48',
    original: 'He finally admitted that he had lied to the committee.',
    keyword: 'TO',
    gapped: 'He finally ___ to the committee.',
    answers: ['admitted to lying'],
    focus: 'verb-pattern',
    explain: 'Admit to + gerund, where to is a preposition and not part of an infinitive.'
  },
  {
    key: 'tr-49',
    original: 'I do not mind if you use my laptop.',
    keyword: 'OBJECTION',
    gapped: 'I ___ my laptop.',
    answers: ['have no objection to your using', 'have no objection to you using'],
    focus: 'verb-pattern',
    explain: 'Have no objection to + gerund; the possessive form is the more formal option.'
  },
  {
    key: 'tr-50',
    original: 'She succeeded in persuading them to wait.',
    keyword: 'MANAGED',
    gapped: 'She ___ them to wait.',
    answers: ['managed to persuade'],
    focus: 'verb-pattern',
    explain: 'Succeed in + gerund becomes manage + to-infinitive.'
  },

  // ---- emphasis ----
  {
    key: 'tr-51',
    original: 'The delay annoyed me, not the cost.',
    keyword: 'WHAT',
    gapped: '___ was the delay, not the cost.',
    answers: ['what annoyed me'],
    focus: 'emphasis',
    explain: 'A wh-cleft puts the emphasised element after the verb be.'
  },
  {
    key: 'tr-52',
    original: 'We only realised the mistake the next morning.',
    keyword: 'UNTIL',
    gapped: 'It was not ___ realised the mistake.',
    answers: ['until the next morning that we'],
    focus: 'emphasis',
    explain: 'The "it was not until ... that" cleft emphasises how late something happened.'
  },
  {
    key: 'tr-53',
    original: 'The noise, not the heat, kept me awake.',
    keyword: 'WAS',
    gapped: '___ that kept me awake, not the heat.',
    answers: ['it was the noise'],
    focus: 'emphasis',
    explain: 'An it-cleft fronts the emphasised subject before a that-clause.'
  },
  {
    key: 'tr-54',
    original: 'She really made an effort to help.',
    keyword: 'DID',
    gapped: 'She ___ to help.',
    answers: ['did make an effort'],
    focus: 'emphasis',
    explain: 'Emphatic do + bare infinitive stresses that the action really happened.'
  }
]
