import type { EnPunctuateItem } from './types'

// Punctuate-it items. Keys FROZEN. Authoring rules live on EnPunctuateItem
// (types.ts) and are enforced by tests/englishPunctuate.test.ts — in short:
// internal marks , ; : and spaced —, terminals . ? !, apostrophes only from
// what apostropheVariants() can produce, `[,]` for an optional comma, no
// quotes/brackets/abbreviations, 12-50 words, at least two graded targets.
export const EN_PUNCTUATE: EnPunctuateItem[] = [
  {
    key: 'punct-01',
    answer:
      "The report was late; nobody had noticed the deadline, and the client's patience was running out.",
    focus: 'splice',
    note: 'Two independent clauses need a semicolon or a full stop between them — a bare comma is a splice. The possessive client’s takes an apostrophe.'
  },
  {
    key: 'punct-02',
    answer:
      "Although the forecast promised sun, it rained all afternoon, so we didn't leave the house until six o'clock.",
    focus: 'introductory',
    note: 'A fronted subordinate clause is followed by a comma; so joining two independent clauses takes one too.'
  },

  // ---- splice ----
  {
    key: 'punct-03',
    answer:
      "The lecture ran forty minutes over; half the room had already packed up, and the speaker didn't seem to notice.",
    focus: 'splice',
    note: 'Two full clauses cannot be welded together with a comma: use a semicolon, or a comma plus a conjunction as in the second join.'
  },
  {
    key: 'punct-04',
    answer:
      'I meant to finish the novel last night — the ending kept slipping away from me, and I gave up at two.',
    focus: 'splice',
    note: 'An em dash can replace the semicolon when the second clause lands as an afterthought or a reversal. The later join has and, so a comma is enough.'
  },
  {
    key: 'punct-05',
    answer:
      "Her supervisor's argument had one obvious flaw: she had never checked whether the figures came from the same survey.",
    focus: 'splice',
    note: 'A colon joins two clauses when the second explains or delivers what the first promised. Supervisor’s is a singular possessive.'
  },
  {
    key: 'punct-06',
    answer:
      'The train was cancelled without warning; nobody at the station could explain why, and the app kept insisting it was running.',
    focus: 'splice',
    note: 'Semicolon between two independent clauses; comma before and when it links a third one. Neither slot takes a bare comma alone.'
  },
  {
    key: 'punct-07',
    answer:
      "He isn't lazy; he simply refuses to work on anything that doesn't interest him, which his manager finds baffling.",
    focus: 'splice',
    note: 'The semicolon fixes the splice; the final which clause comments on the whole sentence, so it is set off by a comma.'
  },
  {
    key: 'punct-08',
    answer:
      'The flat looked perfect online — the photographs had been taken years earlier, before the damp reached the ceiling.',
    focus: 'splice',
    note: 'The dash marks the turn from claim to correction. The comma before before separates a trailing time clause, not two main clauses.'
  },
  {
    key: 'punct-09',
    answer:
      "We can't keep rewriting the brief every fortnight; the team's morale is thin enough already, and the deadline hasn't moved.",
    focus: 'splice',
    note: 'Semicolon for the unjoined clauses, comma before and for the joined one. Team’s is possessive; can’t and hasn’t are contractions.'
  },
  {
    key: 'punct-10',
    answer:
      'The film runs three hours: nothing happens for the first forty minutes, and then everything happens at once.',
    focus: 'splice',
    note: 'A colon works where the second clause spells out the first. The comma before and then separates the two halves of that explanation.'
  },

  // ---- apostrophe ----
  {
    key: 'punct-11',
    answer:
      "The students' results arrived on Friday, and the department's website couldn't cope with the traffic they generated.",
    focus: 'apostrophe',
    note: 'Plural possessive students’ takes the apostrophe after the s; singular department’s takes it before. Couldn’t contracts could not.'
  },
  {
    key: 'punct-12',
    answer:
      "It's the reader's job to notice the trick, and it isn't obvious until the novel's final chapter.",
    focus: 'apostrophe',
    note: 'It’s is it is; reader’s and novel’s are singular possessives. The comma before and joins two independent clauses.'
  },
  {
    key: 'punct-13',
    answer:
      "My neighbours' cat sleeps on our doorstep every afternoon; it's decided the flat's front step belongs to it.",
    focus: 'apostrophe',
    note: 'Neighbours’ is plural possessive; it’s is it has here, while the final it is a pronoun and never takes an apostrophe.'
  },
  {
    key: 'punct-14',
    answer:
      "The company's directors haven't read the auditors' report, and they're already briefing the press about its findings.",
    focus: 'apostrophe',
    note: 'Company’s singular, auditors’ plural, they’re for they are — and its as a possessive pronoun stays bare.'
  },
  {
    key: 'punct-15',
    answer:
      "You're welcome to borrow my brother's bike, but it's been sitting in the shed since last winter.",
    focus: 'apostrophe',
    note: 'You’re is you are, brother’s is a possessive, it’s is it has. The comma before but joins two independent clauses.'
  },
  {
    key: 'punct-16',
    answer:
      "The children's ward closes at eight o'clock, so we shouldn't arrive before the doctors' round has finished.",
    focus: 'apostrophe',
    note: 'Children is already plural, so the possessive is children’s; doctors’ adds only the apostrophe. O’clock keeps its historic apostrophe.'
  },
  {
    key: 'punct-17',
    answer:
      "Everyone's convinced the manager's leaving, though nobody's seen the letter and the club hasn't confirmed anything.",
    focus: 'apostrophe',
    note: 'All three ’s forms here are contractions of is or has, not possessives, and hasn’t contracts has not.'
  },
  {
    key: 'punct-18',
    answer:
      "Two weeks' notice is all the landlord's agent needs, but we haven't decided whether we're staying another year.",
    focus: 'apostrophe',
    note: 'Time expressions take a possessive: two weeks’ notice. Landlord’s is singular; we’re is we are, not the past tense were.'
  },

  // ---- introductory ----
  {
    key: 'punct-19',
    answer:
      'After three years of evening classes, she finally sat the exam, and the result surprised nobody who knew her.',
    focus: 'introductory',
    note: 'A long fronted phrase is closed by a comma; the second comma marks the join before and. Who knew her is defining, so it stays bare.'
  },
  {
    key: 'punct-20',
    answer:
      'Once the credits had rolled, nobody moved; the whole cinema seemed unwilling to admit the film was over.',
    focus: 'introductory',
    note: 'A fronted time clause takes a comma, and the two main clauses that follow need a semicolon rather than a comma.'
  },
  {
    key: 'punct-21',
    answer:
      "In the first week of term[,] the library stays open until midnight, which suits anyone who can't work at home.",
    focus: 'introductory',
    note: 'A short introductory adverbial may take a comma or not; the comma before which is compulsory because that clause is non-defining.'
  },
  {
    key: 'punct-22',
    answer:
      "Because the flight had been delayed twice, we missed the connection, and the airline's desk had already closed.",
    focus: 'introductory',
    note: 'A fronted because clause is followed by a comma. Airline’s is a singular possessive.'
  },
  {
    key: 'punct-23',
    answer:
      "Having read the same chapter three times, I gave up; the argument simply wouldn't hold still.",
    focus: 'introductory',
    note: 'A fronted participle clause takes a comma, and the two independent clauses after it need a semicolon.'
  },
  {
    key: 'punct-24',
    answer:
      "Whenever the office is quiet[,] I get more done in an hour than in a whole afternoon of meetings, and I don't take work home.",
    focus: 'introductory',
    note: 'The comma after a short fronted clause is optional; the one before and, joining two independent clauses, is not.'
  },
  {
    key: 'punct-25',
    answer:
      "To be honest, the second season lost me halfway through; the first had set a standard it couldn't keep.",
    focus: 'introductory',
    note: 'A comment adverbial at the front is set off by a comma, and the two clauses that follow are separated by a semicolon.'
  },
  {
    key: 'punct-26',
    answer:
      'By the time the last train reached the terminus, the carriage was empty, and the cleaners were waiting on the platform.',
    focus: 'introductory',
    note: 'The fronted time clause runs to terminus, so the comma goes there; the second comma precedes and before a new independent clause.'
  },

  // ---- list ----
  {
    key: 'punct-27',
    answer:
      'The recipe needs flour, butter, two eggs[,] and a spoonful of the cheapest honey you can find.',
    focus: 'list',
    note: 'Items in a series are separated by commas; the final comma before and is the optional Oxford comma.'
  },
  {
    key: 'punct-28',
    answer:
      'The course covers grammar, register, note-taking[,] and the sort of pronunciation work that most textbooks ignore.',
    focus: 'list',
    note: 'Three or more items take commas between them. The closing that clause is defining and takes none.'
  },
  {
    key: 'punct-29',
    answer:
      'My flat has three rules: no shoes indoors, no arguments about the washing-up[,] and no phone calls before nine.',
    focus: 'list',
    note: 'A colon introduces a list announced by the clause before it, and the items are then separated by commas.'
  },
  {
    key: 'punct-30',
    answer:
      'The shortlist included a Korean thriller, a Polish documentary, an animated feature nobody had heard of[,] and a silent comedy.',
    focus: 'list',
    note: 'Long list items still take plain commas; the Oxford comma before and is a matter of house style.'
  },
  {
    key: 'punct-31',
    answer:
      'Bring a coat, something to read[,] and a little patience: the queue outside the gallery moves slowly on Sundays.',
    focus: 'list',
    note: 'The list uses commas, and the colon introduces the explanation of why the last item is needed.'
  },
  {
    key: 'punct-32',
    answer:
      "The students' union runs a film club, a debating society[,] and a choir that rehearses in the old chapel.",
    focus: 'list',
    note: 'Students’ is a plural possessive. The final that clause identifies which choir, so it is defining and takes no comma.'
  },
  {
    key: 'punct-33',
    answer:
      'For the winter trip[,] we needed visas, vaccinations, an absurd amount of insurance[,] and somebody to feed the cat.',
    focus: 'list',
    note: 'The comma after a short fronted phrase is optional, as is the Oxford comma; the commas inside the series are not.'
  },
  {
    key: 'punct-34',
    answer:
      "The museum's new wing holds prints, photographs, a room of glass cases[,] and a café that isn't worth the queue.",
    focus: 'list',
    note: 'Museum’s is possessive and isn’t is a contraction; the series takes commas, with the Oxford one optional.'
  },

  // ---- relative ----
  {
    key: 'punct-35',
    answer:
      'My cousin, who has never once been on time, arrived at the restaurant before anyone else had ordered.',
    focus: 'relative',
    note: 'A non-defining relative clause is extra information about an already identified person, so it is fenced by a comma at each end.'
  },
  {
    key: 'punct-36',
    answer:
      "The novel that everyone recommended left me cold, whereas my sister's favourite, which nobody mentions, has stayed with me.",
    focus: 'relative',
    note: 'The that clause defines which novel and takes no commas; the which clause is non-defining and takes two.'
  },
  {
    key: 'punct-37',
    answer:
      "Tokyo, which I visited for the first time last spring, is easier to navigate than any city I've lived in.",
    focus: 'relative',
    note: 'A proper noun is already identified, so any relative clause on it is non-defining and needs commas both sides.'
  },
  {
    key: 'punct-38',
    answer:
      "The manager who interviewed me has since left, which explains why nobody's answered my emails for a month.",
    focus: 'relative',
    note: 'The first who clause picks out which manager, so no commas; the which clause comments on the whole statement and takes one.'
  },
  {
    key: 'punct-39',
    answer:
      'Her latest book, which took eight years to write, is shorter than the essay that made her name.',
    focus: 'relative',
    note: 'Non-defining clauses are bracketed by commas; the defining that clause at the end is not.'
  },
  {
    key: 'punct-40',
    answer:
      "The building, whose lift hasn't worked since March, houses the only dentist in the district who takes new patients.",
    focus: 'relative',
    note: 'A whose clause can be non-defining too, and then it needs its pair of commas; the final who clause is defining.'
  },
  {
    key: 'punct-41',
    answer:
      "My flatmate's brother, who works nights at the hospital, sleeps through the afternoon, so the flat stays quiet.",
    focus: 'relative',
    note: 'The relative clause is fenced by commas; a third comma comes before so, which joins two independent clauses.'
  },
  {
    key: 'punct-42',
    answer:
      "The seminar, which I'd signed up for months earlier, turned out to be the one thing that changed my mind.",
    focus: 'relative',
    note: 'Commas on both sides of the non-defining clause. I’d is a contraction, and the defining that clause takes nothing.'
  },

  // ---- mixed ----
  {
    key: 'punct-43',
    answer:
      "Although the exhibition closed early, we saw the main rooms: the drawings, the letters[,] and a model of the bridge; the queue outside hadn't shortened.",
    focus: 'mixed',
    note: 'Fronted clause comma, colon before the list, commas inside it, and a semicolon before the last independent clause.'
  },
  {
    key: 'punct-44',
    answer:
      "When the results came out, my sister's phone didn't stop; her friends, who had all sat the same exam, wanted every detail.",
    focus: 'mixed',
    note: 'A fronted time clause, a possessive and a contraction, a semicolon between clauses, and a non-defining relative fenced by commas.'
  },
  {
    key: 'punct-45',
    answer:
      "The course I'm taking covers three things: pronunciation, listening[,] and the kind of writing nobody teaches; it's harder than I expected.",
    focus: 'mixed',
    note: 'Colon to announce the list, commas inside it, semicolon before the closing clause. I’m and it’s are contractions.'
  },
  {
    key: 'punct-46',
    answer:
      'After the film finished, nobody spoke for a minute; the ending, which most reviews had spoiled, still worked on everyone in the room.',
    focus: 'mixed',
    note: 'Comma after the fronted clause, semicolon between the two main clauses, and a comma pair around the non-defining relative.'
  },
  {
    key: 'punct-47',
    answer:
      "My landlord, who never answers emails, replied within an hour this time: the boiler's broken, the tenants' patience has gone[,] and the plumber can't come until Thursday.",
    focus: 'mixed',
    note: 'A fenced relative clause, a colon before the explanation, a series of clauses in commas, and singular and plural possessives.'
  },
  {
    key: 'punct-48',
    answer:
      "Once we'd moved the sofa, the room felt twice the size — the flat hadn't changed, but our sense of it had.",
    focus: 'mixed',
    note: 'A fronted clause takes a comma, the dash replaces a semicolon before the contrast, and the comma before but joins two clauses.'
  }
]
