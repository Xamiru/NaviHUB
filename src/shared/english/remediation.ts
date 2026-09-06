import type { LearningUnit } from '../learningEvidence'
import type { EnMechanicsCategory, EnMechanicsItem } from './types'

export interface EnglishRepairUnit extends LearningUnit {
  category: EnMechanicsCategory
  writingTask: string
  writingChecklist: string[]
}

const exercise = (id: string, prompt: string, answers: string[], explanation: string) => ({ id, prompt, answers, explanation })

export const ENGLISH_REPAIR_UNITS: EnglishRepairUnit[] = [
  {
    id: 'articles-sound', category: 'articles', title: 'Choose a or an by sound',
    body: 'Use **a** before a consonant sound and **an** before a vowel sound. Say the next word aloud, including an adjective or the spoken name of an abbreviation. Written letters do not decide: a university starts with the consonant /j/, while an hour starts with a vowel because h is silent.\n\nWorked example: “She joined ___ European team.” European begins with the sound in “you”, so the answer is **a**. In “___ exceptionally useful tool”, exceptionally is the next sound, so use **an**, even though useful itself would take a.',
    practice: [
      exercise('articles-sound-p1', 'Fill only the gap: It was ___ unusual request.', ['an'], 'Unusual begins with a vowel sound.'),
      exercise('articles-sound-p2', 'Fill only the gap: We need ___ useful example.', ['a'], 'Useful begins with the consonant /j/, as in you.')
    ],
    transfer: [
      exercise('articles-sound-t1', 'Fill only the gap: She works for ___ NGO. Read the abbreviation as separate letters.', ['an'], 'The letter N is pronounced en, beginning with a vowel sound.'),
      exercise('articles-sound-t2', 'Fill only the gap: It was ___ one-year contract.', ['a'], 'One begins with /w/, a consonant sound.')
    ],
    writingTask: 'Describe a tool and an unexpected problem in two sentences. Include an abbreviation read as letters and an adjective before a singular countable noun.',
    writingChecklist: ['I chose a/an from the immediately following sound.', 'I can explain the abbreviation pronunciation.', 'Each singular countable noun has an appropriate determiner.']
  },
  {
    id: 'articles-reference', category: 'articles', title: 'Separate general and identifiable reference',
    body: 'A singular countable noun normally needs a determiner: a report, the report, my report. Use **a/an** to introduce one member, and **the** when the reader can identify which one. General plural and uncountable nouns often take no article. Do not assume every noun followed by an of-phrase automatically requires the.\n\nWorked example: “I received a report. The report contains useful information.” The first report is introduced; the second is already identifiable. Information is uncountable, so “an information” is not an alternative. Count a piece of information when a unit matters.',
    practice: [
      exercise('articles-reference-p1', 'Fill only the gap: I bought a notebook. ___ notebook is blue.', ['The'], 'The second mention identifies the notebook just introduced.'),
      exercise('articles-reference-p2', 'Fill with a, an, the, or none: ___ information is useful when making decisions in general.', ['none'], 'Information here is an uncountable noun used generally.')
    ],
    transfer: [
      exercise('articles-reference-t1', 'Fill only the gap: We interviewed a candidate yesterday. ___ candidate accepted our offer.', ['The'], 'The prior sentence establishes which candidate is meant.'),
      exercise('articles-reference-t2', 'Fill with a, an, the, or none: We need ___ equipment for the experiment; any suitable set will do.', ['none'], 'Equipment is uncountable and not yet an identified set; no indefinite article is used.')
    ],
    writingTask: 'Introduce an object, refer to it again, and make one general statement about knowledge or equipment.',
    writingChecklist: ['First and later mentions reflect what the reader can identify.', 'I have not pluralized an uncountable noun.', 'My general statement does not accidentally identify a specific instance.']
  },
  {
    id: 'punctuation-possessives', category: 'punctuation', title: 'Place possessive apostrophes',
    body: 'For a singular owner, add apostrophe-s: the editor’s desk. For a regular plural already ending in s, add only an apostrophe: the editors’ desks. Irregular plurals use apostrophe-s: children’s books. Ordinary plurals need no apostrophe.\n\nWorked example: “the notes belonging to two students” becomes “the students’ notes”. First form the owner students, then add the possessive mark. Compare “the student’s notes”, which names one student. Establish the intended meaning before changing punctuation.',
    practice: [
      exercise('punctuation-possessives-p1', 'Rewrite using a possessive: the desk belonging to one teacher', ["the teacher's desk", 'the teacher’s desk'], 'The owner teacher is singular, so add apostrophe-s.'),
      exercise('punctuation-possessives-p2', 'Rewrite using a possessive: the room belonging to several teachers', ["the teachers' room", 'the teachers’ room'], 'The plural teachers already ends in s; the apostrophe follows it.')
    ],
    transfer: [
      exercise('punctuation-possessives-t1', 'Rewrite using a possessive: the coats belonging to the children', ["the children's coats", 'the children’s coats'], 'Children is an irregular plural without final s, so use apostrophe-s.'),
      exercise('punctuation-possessives-t2', 'Rewrite using a possessive: the lounge belonging to several pilots', ["the pilots' lounge", 'the pilots’ lounge'], 'Form plural pilots before adding the possessive apostrophe.')
    ],
    writingTask: 'Describe one shared space and one person’s possession. Make the number of owners clear from context.',
    writingChecklist: ['The owner is singular or plural as intended.', 'The apostrophe follows the completed owner noun.', 'No ordinary plural has a possessive apostrophe.']
  },
  {
    id: 'punctuation-nonessential', category: 'punctuation', title: 'Distinguish defining and extra information',
    body: 'A defining relative clause identifies which member you mean and normally has no enclosing commas. A non-defining clause adds information about an already identified referent and is set off by commas. Removing an essential clause changes who the sentence refers to.\n\nWorked example: “My only brother, who lives in Leeds, is visiting.” Only brother identifies him already. “The colleague who lives in Leeds is visiting” selects one colleague from several. A comma is a meaning choice here, not simply a place to breathe.',
    practice: [
      exercise('punctuation-nonessential-p1', 'Answer defining or extra: Of five runners, the runner who wore red won.', ['defining'], 'Who wore red identifies which of the five runners is meant.'),
      exercise('punctuation-nonessential-p2', 'Answer defining or extra: My only sister, who lives abroad, called.', ['extra'], 'Only sister identifies the person before the relative clause.')
    ],
    transfer: [
      exercise('punctuation-nonessential-t1', 'Answer defining or extra: The key that opens the garage is missing; the other keys are here.', ['defining'], 'The clause selects the garage key rather than another key.'),
      exercise('punctuation-nonessential-t2', 'Answer defining or extra: Mount Fuji, which is in Japan, attracts visitors.', ['extra'], 'The proper name identifies the mountain; the clause adds a fact.')
    ],
    writingTask: 'Write two sentences about colleagues: one selecting a particular colleague, another adding information about an already named colleague.',
    writingChecklist: ['I can say whether the clause identifies or adds.', 'Extra information has both opening and closing commas when needed.', 'Removing the clause preserves the intended referent only in the extra-information example.']
  },
  {
    id: 'boundaries-clauses', category: 'boundaries', title: 'Repair comma splices and fragments',
    body: 'An independent clause has a subject and a finite verb and can stand as a sentence. A dependent clause such as “because the train was late” leaves a relationship unfinished. Two independent clauses need a full stop, a semicolon, or a comma plus a coordinating conjunction such as but. A comma alone usually creates a splice in formal prose.\n\nWorked example: “The data arrived, we checked it.” Both halves stand alone. “The data arrived; we checked it” joins related clauses. “Because the data arrived late, we postponed the check” instead makes one clause dependent.',
    practice: [
      exercise('boundaries-clauses-p1', 'Answer independent or dependent: Although the evidence was limited', ['dependent'], 'Although introduces a contrast that needs a main clause.'),
      exercise('boundaries-clauses-p2', 'Repair using a semicolon only: The alarm rang, everyone left.', ['The alarm rang; everyone left.'], 'Both clauses are independent, so the semicolon can connect them.')
    ],
    transfer: [
      exercise('boundaries-clauses-t1', 'Answer independent or dependent: The technician who repaired it returned', ['independent'], 'The technician returned is the main clause; who repaired it modifies the subject.'),
      exercise('boundaries-clauses-t2', 'Repair using a semicolon only: Demand rose, supply remained unchanged.', ['Demand rose; supply remained unchanged.'], 'The clauses each have a subject and finite verb; a comma alone is insufficient here.')
    ],
    writingTask: 'Write a three-sentence incident report containing one because-clause and one pair of independent clauses joined with but.',
    writingChecklist: ['Every standalone sentence contains a main clause.', 'No two independent clauses are joined by a comma alone.', 'The conjunction describes the actual relationship between events.']
  },
  {
    id: 'boundaries-linkers', category: 'boundaries', title: 'Use however without creating a splice',
    body: 'However and therefore connect ideas but do not act like the coordinating conjunctions but and so. Between complete clauses, use a full stop or semicolon before however/therefore; a comma commonly follows the linking adverb.\n\nWorked example: “It was cheap; however, it was unreliable.” Compare “It was cheap, but it was unreliable.” The first needs a stronger clause boundary because however does not grammatically join the clauses. Meaning also matters: however signals contrast; therefore signals a conclusion.',
    practice: [
      exercise('boundaries-linkers-p1', 'Replace the first comma with the required stronger mark: It rained, however, we continued.', ['It rained; however, we continued.'], 'A semicolon separates the independent clauses before however.'),
      exercise('boundaries-linkers-p2', 'Fill with however or therefore: The deadline passed; ___, late entries were rejected. The rule requires rejection.', ['therefore'], 'The second clause is a consequence of the rule and timing.')
    ],
    transfer: [
      exercise('boundaries-linkers-t1', 'Replace the first comma with the required stronger mark: The file was valid, nevertheless, the upload failed.', ['The file was valid; nevertheless, the upload failed.'], 'Nevertheless is a linking adverb, so the preceding independent clause needs a proper boundary.'),
      exercise('boundaries-linkers-t2', 'Fill with however or therefore: The route was longer; ___, it was faster because traffic was light.', ['however'], 'Faster contrasts with what longer would lead the reader to expect.')
    ],
    writingTask: 'Explain a decision with therefore, then qualify it with however in the next sentence.',
    writingChecklist: ['Linking adverbs follow a real clause boundary.', 'Consequence and contrast are not interchangeable.', 'Each sentence is complete without its linking adverb.']
  },
  {
    id: 'confusables-effect', category: 'confusables', title: 'Choose affect and effect from the intended meaning',
    body: 'In common usage, **affect** is a verb meaning influence and **effect** is a noun meaning result. Find the grammatical job first, then test the meaning. Exceptions exist: to effect a change means to bring it about; affect can name an emotional presentation in specialist usage.\n\nWorked example: “Noise can affect concentration. Its effect is measurable.” After can, we need a base-form verb meaning influence. After its, we need a noun meaning result. Memorizing only the first letter cannot explain either choice.',
    practice: [
      exercise('confusables-effect-p1', 'Fill with affect or effect: The closure may ___ travel times.', ['affect'], 'The modal may takes a verb; the meaning is influence.'),
      exercise('confusables-effect-p2', 'Fill with affect or effect: We measured the ___ of the closure.', ['effect'], 'The noun names the result of the closure.')
    ],
    transfer: [
      exercise('confusables-effect-t1', 'Fill with affect or effect: Sleep can ___ recall.', ['affect'], 'Recall is influenced by sleep; affect is the needed verb.'),
      exercise('confusables-effect-t2', 'Fill with affect or effect: The reform had little ___ on demand.', ['effect'], 'Little modifies the noun naming the result.')
    ],
    writingTask: 'Explain a change using affect as a verb and effect as a noun in different sentences.',
    writingChecklist: ['I can replace affect with influence.', 'I can replace effect with result.', 'The selected word has the required grammatical role.']
  },
  {
    id: 'confusables-possessive', category: 'confusables', title: 'Separate contractions from possessives',
    body: 'It’s expands to it is or it has. Its is possessive. They’re expands to they are; their is possessive; there indicates a place or introduces existence. Test the full expansion before choosing punctuation.\n\nWorked example: “The device lost its settings because it’s old.” The settings belong to the device, so its is possessive. The second clause means it is old, so the contraction is it’s. Possessive pronouns such as yours and theirs also take no apostrophe.',
    practice: [
      exercise('confusables-possessive-p1', 'Fill with its or it\'s: The company changed ___ name.', ['its'], 'The name belongs to the company; it is name would not work.'),
      exercise('confusables-possessive-p2', 'Fill with their, there, or they\'re: The engineers said ___ ready.', ["they're", 'they’re'], 'They are ready is the expanded form.')
    ],
    transfer: [
      exercise('confusables-possessive-t1', 'Fill with its or it\'s: I think ___ been repaired.', ["it's", 'it’s'], 'Here the contraction expands to it has been repaired.'),
      exercise('confusables-possessive-t2', 'Fill with their, there, or they\'re: Please return ___ coats.', ['their'], 'The possessive identifies whose coats to return.')
    ],
    writingTask: 'Describe a team and its equipment. Include a possessive pronoun and a contraction, then expand the contraction aloud.',
    writingChecklist: ['Each contraction expands grammatically.', 'Each possessive expresses ownership without an apostrophe.', 'There is used only where location or existence is intended.']
  },
  {
    id: 'register-requests', category: 'register', title: 'Make requests clear and appropriately polite',
    body: 'Register depends on audience, relationship, purpose, and consequences. A professional request names the action, gives necessary context, and provides a usable deadline. Politeness does not require burying the action under ceremonial words. Could you and please can soften a request without making it vague.\n\nWorked example: “Send it ASAP” becomes “Could you send the revised budget by 3 pm on Tuesday?” The revision identifies both the deliverable and deadline. It does not invent a reason or imply a threat.',
    practice: [
      exercise('register-requests-p1', 'Which deadline is actionable? Answer A or B. A: at your earliest convenience. B: by noon on Friday.', ['B'], 'B gives a concrete point at which sender and reader can assess completion.'),
      exercise('register-requests-p2', 'Fill only the gap: Could you ___ the revised invoice by Monday?', ['send'], 'Could is followed by the base verb, and the sentence names both action and deadline.')
    ],
    transfer: [
      exercise('register-requests-t1', 'Which request names its deliverable? Answer A or B. A: Please upload the signed consent form. B: Please deal with this.', ['A'], 'A tells the recipient what successful action produces.'),
      exercise('register-requests-t2', 'Fill only the gap: Would you be able ___ confirm the appointment?', ['to'], 'Be able takes a to-infinitive; this provides a polite request form.')
    ],
    writingTask: 'Write a three-sentence request to a colleague you do not know well. Supply the task, enough context, and a concrete deadline without inventing urgency.',
    writingChecklist: ['The recipient knows exactly what to do.', 'The deadline is specific and justified by the scenario.', 'The tone is respectful without blame or excessive ceremony.']
  },
  {
    id: 'register-precision', category: 'register', title: 'Match claims to evidence',
    body: 'Formal writing should distinguish an observation, an inference, and a recommendation. Avoid converting a small sample into a universal claim. Quantify when you have numbers; qualify only the uncertainty that actually exists. Hedges such as may and in this sample are useful when they preserve the limits of evidence.\n\nWorked example: “Everyone hates the update” becomes “Six of the ten respondents reported difficulty finding the export button.” This names the sample and issue rather than asserting an unsupported feeling across all users. A recommendation can follow separately.',
    practice: [
      exercise('register-precision-p1', 'Answer observation or inference: Three participants clicked the wrong button.', ['observation'], 'This states a recorded action rather than its unobserved cause.'),
      exercise('register-precision-p2', 'Answer supported or unsupported: Two of five testers struggled, so every customer will struggle.', ['unsupported'], 'The universal prediction exceeds the sample evidence.')
    ],
    transfer: [
      exercise('register-precision-t1', 'Answer observation or inference: The delay probably reflects confusion about the labels.', ['inference'], 'Probably and the causal explanation go beyond the observed delay.'),
      exercise('register-precision-t2', 'Answer supported or unsupported: Eight of twelve respondents preferred A; in this sample, A was preferred by a majority.', ['supported'], 'The claim is limited to the measured sample, where eight exceeds half of twelve.')
    ],
    writingTask: 'Report that four of seven testers failed to find a setting. Add one possible explanation and one recommendation, keeping all three distinct.',
    writingChecklist: ['The observation preserves the exact sample.', 'The explanation is labelled as a possibility.', 'The recommendation is an action rather than another unsupported factual claim.']
  },
  {
    id: 'spelling-suffixes', category: 'spelling', title: 'Build inflected forms deliberately',
    body: 'For many words ending consonant + y, change y to i before -ed or -es: carry becomes carried or carries. Keep y before -ing: carrying. Vowel + y normally keeps y: played. Many final silent-e verbs drop e before -ing: making. These are patterns with exceptions, not a reason to invent a spelling from sound alone.\n\nWorked example: try + ed becomes tried; try + ing becomes trying. Say the base, identify the ending, then apply the pattern. Compare copied and copying to check that the rule transfers.',
    practice: [
      exercise('spelling-suffixes-p1', 'Write the past tense of carry.', ['carried'], 'Consonant + y changes to i before ed.'),
      exercise('spelling-suffixes-p2', 'Write the -ing form of make.', ['making'], 'Drop the final silent e before ing.')
    ],
    transfer: [
      exercise('spelling-suffixes-t1', 'Write the past tense of reply.', ['replied'], 'Consonant + y changes to i before ed.'),
      exercise('spelling-suffixes-t2', 'Write the -ing form of copy.', ['copying'], 'Keep y before ing, even though copied changes it before ed.')
    ],
    writingTask: 'Write a short account of yesterday and what you are doing now, using two consonant+y verbs and one silent-e verb.',
    writingChecklist: ['The tense matches the time reference.', 'I checked the base word before adding the suffix.', 'I did not apply the y-to-i rule before ing.']
  },
  {
    id: 'spelling-retrieval', category: 'spelling', title: 'Retrieve difficult spellings without copying',
    body: 'For a persistent spelling error, inspect the exact mismatch, divide the word into memorable chunks, cover it, write it from memory, and compare. Copying a visible word repeatedly does not test retrieval. Keep accepted regional variants separate from genuine spelling mistakes.\n\nWorked example: necessary has one c and two s letters. Look at ne-ces-sary, cover it, write it, and check those letters. Accommodation has double c and double m. These are memory cues for these words, not general spelling laws.',
    practice: [
      exercise('spelling-retrieval-p1', 'Correct this spelling: neccessary', ['necessary'], 'Necessary has one c and two s letters.'),
      exercise('spelling-retrieval-p2', 'Correct this spelling: accomodation', ['accommodation'], 'Accommodation has double c and double m.')
    ],
    transfer: [
      exercise('spelling-retrieval-t1', 'Write the word meaning a place to stay, beginning acc-.', ['accommodation'], 'Retrieve both doubled consonants rather than copying a visible correction.'),
      exercise('spelling-retrieval-t2', 'Write the word meaning required, beginning nec-.', ['necessary'], 'The word has one c and two s letters. This tests delayed spelling recall, not an unseen vocabulary item.')
    ],
    writingTask: 'Use necessary and accommodation in a short travel request, then proofread after hiding the model spellings.',
    writingChecklist: ['I wrote before looking at the model.', 'I checked the exact previously confused letters.', 'My sentence uses each word naturally rather than listing it.']
  }
]

// Suggestions are intentionally labelled as such: a category cannot establish
// the learner's misconception. The original failed item remains visible.
export function suggestedRepair(item: EnMechanicsItem): EnglishRepairUnit {
  const text = `${item.prompt} ${item.explain}`.toLowerCase()
  const suffix = item.category === 'articles' ? (/sound|pronounc|silent/.test(text) ? 'sound' : 'reference')
    : item.category === 'punctuation' ? (/possess|apostrophe/.test(text) ? 'possessives' : 'nonessential')
    : item.category === 'boundaries' ? (/however|therefore|nevertheless/.test(text) ? 'linkers' : 'clauses')
    : item.category === 'confusables' ? (/affect|effect/.test(text) ? 'effect' : 'possessive')
    : item.category === 'register' ? (/request|polite|email/.test(text) ? 'requests' : 'precision')
    : /suffix|silent|ending/.test(text) ? 'suffixes' : 'retrieval'
  return ENGLISH_REPAIR_UNITS.find((unit) => unit.id === `${item.category}-${suffix}`)!
}
