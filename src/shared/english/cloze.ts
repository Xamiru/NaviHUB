import type { EnClozeItem } from './types'

// Open cloze (Use of English part 2 style), one sentence per item; the gap is
// always a FUNCTION word. Keys FROZEN. Every defensible fill goes in `answers`
// (matched through @shared/english/answers.ts). Gate: tests/englishUse.test.ts.
export const EN_CLOZE: EnClozeItem[] = [
  // ---- prepositions (dependent prepositions, fixed phrases) ----
  {
    key: 'cloze-01',
    text: 'The committee postponed the vote, ___ which point most of the delegates had already left.',
    answers: ['at', 'by'],
    focus: 'preposition',
    explain: '"At which point" is the fixed relative phrase for a moment in a sequence; "by which point" is also idiomatic when the emphasis is on the deadline.'
  },
  {
    key: 'cloze-02',
    text: 'The success of the scheme depends largely ___ whether local councils are willing to fund it.',
    answers: ['on', 'upon'],
    focus: 'preposition',
    explain: 'Depend takes on (formally upon); no other preposition follows the verb.'
  },
  {
    key: 'cloze-03',
    text: 'Contrary ___ popular belief, the law was never actually repealed.',
    answers: ['to'],
    focus: 'preposition',
    explain: 'Contrary is followed by to in the fixed sentence adverbial "contrary to popular belief".'
  },
  {
    key: 'cloze-04',
    text: 'The minister was praised ___ her handling of the crisis, though few knew how close it had come to disaster.',
    answers: ['for'],
    focus: 'preposition',
    explain: 'Praise, blame and criticise all take for before the thing being judged.'
  },
  {
    key: 'cloze-05',
    text: 'There is little to be gained ___ arguing about it at this stage.',
    answers: ['from', 'by'],
    focus: 'preposition',
    explain: 'Both are standard after gain: from marks the source of the benefit, by the means.'
  },
  {
    key: 'cloze-06',
    text: 'The negotiations collapsed ___ account of a disagreement over pay.',
    answers: ['on'],
    focus: 'preposition',
    explain: '"On account of" is a fixed complex preposition meaning because of.'
  },
  {
    key: 'cloze-07',
    text: 'The report makes no reference ___ the earlier findings.',
    answers: ['to'],
    focus: 'preposition',
    explain: 'The noun reference keeps the preposition of the verb refer: reference to.'
  },
  {
    key: 'cloze-08',
    text: 'Nothing could be further ___ the truth.',
    answers: ['from'],
    focus: 'preposition',
    explain: 'Far and further take from when they express distance from a point, here a fixed idiom.'
  },
  {
    key: 'cloze-09',
    text: 'She has a reputation ___ getting things done, whatever the obstacles.',
    answers: ['for'],
    focus: 'preposition',
    explain: 'Reputation is followed by for + gerund when it names what somebody is known for doing.'
  },
  {
    key: 'cloze-10',
    text: 'The project was abandoned ___ lack of funding.',
    answers: ['for', 'through'],
    focus: 'preposition',
    explain: 'Both introduce the cause with an uncountable noun: "for lack of" is the fixed phrase, "through lack of" stresses the failing.'
  },
  {
    key: 'cloze-11',
    text: 'The new evidence casts doubt ___ the original verdict.',
    answers: ['on', 'upon'],
    focus: 'preposition',
    explain: 'The collocation is cast doubt on (or the more formal upon) something.'
  },

  // ---- articles ----
  {
    key: 'cloze-12',
    text: 'He has ___ tendency to interrupt whenever the discussion becomes technical.',
    answers: ['a'],
    focus: 'article',
    explain: 'Tendency is a singular countable noun being introduced for the first time, so it needs the indefinite article.'
  },
  {
    key: 'cloze-13',
    text: 'It was by far ___ most convincing argument of the evening.',
    answers: ['the'],
    focus: 'article',
    explain: 'A superlative identifies a unique member of a set, so it takes the definite article.'
  },
  {
    key: 'cloze-14',
    text: 'The book was ___ instant success when it first appeared.',
    answers: ['an'],
    focus: 'article',
    explain: 'Success is countable here (one particular success) and instant begins with a vowel sound, so an.'
  },
  {
    key: 'cloze-15',
    text: 'To ___ certain extent, the criticism is justified.',
    answers: ['a'],
    focus: 'article',
    explain: '"To a certain extent" is a fixed hedging phrase and always takes the indefinite article.'
  },
  {
    key: 'cloze-16',
    text: 'The staff were kept in ___ dark about the merger until the day it was announced.',
    answers: ['the'],
    focus: 'article',
    explain: 'The idiom "keep somebody in the dark" is fixed with the definite article.'
  },
  {
    key: 'cloze-17',
    text: 'There is ___ growing sense that the reforms have stalled.',
    answers: ['a'],
    focus: 'article',
    explain: 'Sense is countable when it means an impression, and this one is being introduced, so a.'
  },

  // ---- conjunctions ----
  {
    key: 'cloze-18',
    text: '___ the evidence is largely circumstantial, it is difficult to ignore.',
    answers: ['although', 'though', 'while', 'whilst'],
    focus: 'conjunction',
    explain: 'A concessive subordinator is needed to set the weakness of the evidence against its force.'
  },
  {
    key: 'cloze-19',
    text: 'We will not proceed ___ the funding has been confirmed in writing.',
    answers: ['until', 'unless'],
    focus: 'conjunction',
    explain: 'Both work after a negative main clause: until sets the time limit, unless the condition.'
  },
  {
    key: 'cloze-20',
    text: 'He went on talking, ___ nobody in the room was listening.',
    answers: ['although', 'though', 'but', 'while', 'whilst'],
    focus: 'conjunction',
    explain: 'The second clause contrasts with the first, so either a coordinating but or a concessive subordinator fits.'
  },
  {
    key: 'cloze-21',
    text: '___ for the intervention of a neighbour, the fire would have spread to the next house.',
    answers: ['but'],
    focus: 'conjunction',
    explain: '"But for" is the fixed formal equivalent of "if it had not been for".'
  },
  {
    key: 'cloze-22',
    text: '___ he arrived, the meeting had already been under way for an hour.',
    answers: ['when', 'before'],
    focus: 'conjunction',
    explain: 'A time subordinator is needed to fix the past perfect against a later point.'
  },
  {
    key: 'cloze-23',
    text: 'The design is elegant ___ wholly impractical.',
    answers: ['but', 'yet', 'though'],
    focus: 'conjunction',
    explain: 'All three link two contrasting adjectives without repeating the subject and verb.'
  },

  // ---- relatives ----
  {
    key: 'cloze-24',
    text: 'The report, ___ conclusions were leaked last week, has now been published in full.',
    answers: ['whose'],
    focus: 'relative',
    explain: 'A possessive relative is needed before the bare noun conclusions, and whose is used for things as well as people.'
  },
  {
    key: 'cloze-25',
    text: 'This is precisely the kind of argument ___ tends to collapse under scrutiny.',
    answers: ['that', 'which'],
    focus: 'relative',
    explain: 'A subject relative pronoun for a thing: that is the usual choice in a defining clause, which is also correct.'
  },
  {
    key: 'cloze-26',
    text: 'There were forty applicants, none of ___ had the experience required.',
    answers: ['whom'],
    focus: 'relative',
    explain: 'After a quantifier + of in a non-defining clause about people, the relative must be the object form whom.'
  },
  {
    key: 'cloze-27',
    text: 'The town in ___ she grew up has long since been swallowed by the suburbs.',
    answers: ['which'],
    focus: 'relative',
    explain: 'After a fronted preposition only which (or whom for people) is possible, never that.'
  },
  {
    key: 'cloze-28',
    text: 'The candidate ___ the committee finally appointed had the least experience of the three.',
    answers: ['whom', 'who', 'that'],
    focus: 'relative',
    explain: 'This is the object of appointed: whom is the formal choice, who and that are both accepted in a defining clause.'
  },
  {
    key: 'cloze-29',
    text: 'She left in 2011, since ___ time the department has been reorganised twice.',
    answers: ['which'],
    focus: 'relative',
    explain: '"Since which time" is the formal relative link back to a whole date or event.'
  },

  // ---- auxiliaries and modals ----
  {
    key: 'cloze-30',
    text: 'Little ___ she know that the decision had already been taken.',
    answers: ['did'],
    focus: 'auxiliary',
    explain: 'A fronted negative adverbial forces subject-auxiliary inversion, and a present-simple-style lexical verb needs the dummy auxiliary did.'
  },
  {
    key: 'cloze-31',
    text: 'Not only ___ the price risen, but the service has become noticeably worse.',
    answers: ['has'],
    focus: 'auxiliary',
    explain: 'After the fronted "not only" the perfect auxiliary moves in front of the subject.'
  },
  {
    key: 'cloze-32',
    text: '___ you require further assistance, please contact the office directly.',
    answers: ['should'],
    focus: 'auxiliary',
    explain: 'Inverted should replaces "if" in a formal first conditional.'
  },
  {
    key: 'cloze-33',
    text: 'Rarely ___ a first novel attracted so much attention.',
    answers: ['has'],
    focus: 'auxiliary',
    explain: 'The fronted frequency adverb rarely triggers inversion, and "attracted" needs the perfect auxiliary.'
  },
  {
    key: 'cloze-34',
    text: '___ it not been for her insistence, the project would have been shelved.',
    answers: ['had'],
    focus: 'auxiliary',
    explain: 'Inverted had replaces "if" in a third conditional.'
  },
  {
    key: 'cloze-35',
    text: 'He denied any knowledge of the payments, and so ___ his deputy.',
    answers: ['did'],
    focus: 'auxiliary',
    explain: 'The additive "so + auxiliary + subject" pattern echoes a past simple lexical verb with did.'
  },

  // ---- quantifiers ----
  {
    key: 'cloze-36',
    text: 'Under ___ circumstances should the alarm be switched off.',
    answers: ['no'],
    focus: 'quantifier',
    explain: '"Under no circumstances" is the fixed negative adverbial that produces the inversion after it.'
  },
  {
    key: 'cloze-37',
    text: 'Very ___ of the delegates had read the document in advance.',
    answers: ['few'],
    focus: 'quantifier',
    explain: 'Delegates is countable and the sense is negative, so few, which alone takes very.'
  },
  {
    key: 'cloze-38',
    text: 'There was hardly ___ evidence to support the allegation.',
    answers: ['any'],
    focus: 'quantifier',
    explain: 'Hardly is negative in meaning, so the quantifier that follows is any, not some.'
  },
  {
    key: 'cloze-39',
    text: 'There is ___ point in complaining now that the contract has been signed.',
    answers: ['little', 'no'],
    focus: 'quantifier',
    explain: 'Point is uncountable here; both little and no give the required negative sense.'
  },
  {
    key: 'cloze-40',
    text: 'Few, if ___, of the original buildings survive.',
    answers: ['any'],
    focus: 'quantifier',
    explain: '"Few, if any" is a fixed parenthetical in which any stands for the whole quantifier phrase.'
  },
  {
    key: 'cloze-41',
    text: '___ of the two proposals is entirely satisfactory, which is why the vote was postponed.',
    answers: ['neither'],
    focus: 'quantifier',
    explain: 'Neither is the negative quantifier used for exactly two things, and it takes a singular verb.'
  },

  // ---- pronouns ----
  {
    key: 'cloze-42',
    text: 'The building had stood empty for years and was beginning to show ___ age.',
    answers: ['its'],
    focus: 'pronoun',
    explain: 'A possessive determiner referring back to a thing: its, with no apostrophe.'
  },
  {
    key: 'cloze-43',
    text: 'She prides ___ on never having missed a deadline.',
    answers: ['herself'],
    focus: 'pronoun',
    explain: 'Pride is obligatorily reflexive: pride oneself on something.'
  },
  {
    key: 'cloze-44',
    text: '___ is no use complaining at this stage.',
    answers: ['it', 'there'],
    focus: 'pronoun',
    explain: '"It is no use + -ing" is the standard pattern; existential there is also possible before "is no use".'
  },
  {
    key: 'cloze-45',
    text: 'The committee could not agree among ___ on how to proceed.',
    answers: ['themselves', 'itself'],
    focus: 'pronoun',
    explain: 'A collective noun takes either a plural or a singular reflexive in British English.'
  },
  {
    key: 'cloze-46',
    text: 'There is little to choose between the two candidates; ___ would do the job well.',
    answers: ['either', 'both'],
    focus: 'pronoun',
    explain: 'Either treats the two singly, both treats them together; the verb form suits each.'
  },

  // ---- discourse linkers ----
  {
    key: 'cloze-47',
    context: 'The early results were promising.',
    text: '___, the sample was far too small for any firm conclusion to be drawn.',
    answers: ['however', 'nevertheless', 'nonetheless', 'yet', 'still'],
    focus: 'linker',
    explain: 'The second sentence undercuts the first, so it opens with a contrastive linker.'
  },
  {
    key: 'cloze-48',
    context: 'Sales have fallen for the third year running.',
    text: '___, the board has decided to close the northern branch.',
    answers: ['accordingly', 'consequently', 'therefore', 'thus', 'hence', 'so'],
    focus: 'linker',
    explain: 'The second sentence states the consequence of the first, so a resultative linker is required.'
  },
  {
    key: 'cloze-49',
    context: 'The scheme is undeniably expensive.',
    text: 'It is, ___, the only option with any real chance of working.',
    answers: ['however', 'nevertheless', 'nonetheless', 'though'],
    focus: 'linker',
    explain: 'A concessive linker in mid-position, between commas, concedes the cost and then overrides it.'
  },
  {
    key: 'cloze-50',
    text: 'The proposal was rejected on cost grounds; ___ other words, nobody was prepared to pay for it.',
    answers: ['in'],
    focus: 'linker',
    explain: '"In other words" is the fixed reformulating linker.'
  },
  {
    key: 'cloze-51',
    text: '___ from a handful of complaints, the response has been overwhelmingly positive.',
    answers: ['apart', 'aside'],
    focus: 'linker',
    explain: 'Both "apart from" and "aside from" introduce an exception; only these two take from here.'
  },
  {
    key: 'cloze-52',
    text: '___ than complain, she wrote a detailed proposal for reform.',
    answers: ['rather'],
    focus: 'linker',
    explain: '"Rather than" contrasts two courses of action and takes a bare infinitive after it.'
  },
  {
    key: 'cloze-53',
    text: 'The two accounts differ ___ only in detail but in substance.',
    answers: ['not'],
    focus: 'linker',
    explain: 'The correlative pair is "not only ... but (also)".'
  },
  {
    key: 'cloze-54',
    context: 'Everyone involved had predicted the delay months ago.',
    text: 'The announcement was, ___ all, hardly a surprise.',
    answers: ['after'],
    focus: 'linker',
    explain: '"After all" appeals to something the reader already knows, which is exactly what the previous sentence supplies.'
  },

  // ---- comparatives ----
  {
    key: 'cloze-55',
    text: 'The sooner we start, ___ better.',
    answers: ['the'],
    focus: 'comparative',
    explain: 'The double comparative pattern needs the in both halves: "the sooner ..., the better".'
  },
  {
    key: 'cloze-56',
    text: 'The situation is far ___ serious than the minister was prepared to admit.',
    answers: ['more', 'less'],
    focus: 'comparative',
    explain: 'Serious is a long adjective, so the comparative is periphrastic; either direction fits the than-clause.'
  },
  {
    key: 'cloze-57',
    text: 'It was not so ___ a mistake as a deliberate choice.',
    answers: ['much'],
    focus: 'comparative',
    explain: '"Not so much X as Y" is a fixed corrective comparison.'
  },
  {
    key: 'cloze-58',
    text: 'She is by ___ the most experienced member of the team.',
    answers: ['far'],
    focus: 'comparative',
    explain: '"By far" is the fixed intensifier used before a superlative.'
  },
  {
    key: 'cloze-59',
    text: "This year's figures are twice ___ high as last year's.",
    answers: ['as'],
    focus: 'comparative',
    explain: 'A multiple takes the equative frame "twice as ... as".'
  },
  {
    key: 'cloze-60',
    text: 'The more he explained, ___ less anyone seemed to understand.',
    answers: ['the'],
    focus: 'comparative',
    explain: 'The second half of a double comparative also begins with the.'
  },

  // ---- other fixed items ----
  {
    key: 'cloze-61',
    text: 'The film is worth seeing, if ___ for the photography.',
    answers: ['only'],
    focus: 'other',
    explain: '"If only for" concedes a single reason and is fixed with only.'
  },
  {
    key: 'cloze-62',
    text: 'He is no ___ with the company, having resigned in June.',
    answers: ['longer'],
    focus: 'other',
    explain: '"No longer" is the standard formal way of saying not any more.'
  },
  {
    key: 'cloze-63',
    text: 'As ___ as I am aware, no decision has yet been taken.',
    answers: ['far'],
    focus: 'other',
    explain: '"As far as I am aware" is a fixed hedging phrase.'
  }
]
