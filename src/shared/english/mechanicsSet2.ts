import type { EnMechanicsItem } from './types'

// Mechanics items, second set (+100, spread with set 1 in mechanics.ts) —
// weighted toward punctuation / boundaries / spelling / articles so every
// category clears 30 and a 20-question round never repeats. Keys FROZEN,
// numbering continues per category from set 1.
export const EN_MECHANICS_SET2: EnMechanicsItem[] = [
  // ---- articles ----
  {
    key: 'articles-25',
    category: 'articles',
    prompt: 'Complete the sentence: "Of the three submissions, this is ___ most persuasive."',
    options: ['the', 'a', 'no article', 'an'],
    correct: 0,
    explain:
      'A superlative that singles one item out of a known group takes the definite article, because only one thing can be the most persuasive.'
  },
  {
    key: 'articles-26',
    category: 'articles',
    prompt: 'Which sentence treats the uncountable noun correctly?',
    options: [
      'She gave me a very useful advice about the application.',
      'She gave me some very useful advices about the application.',
      'She gave me a very useful piece of advice about the application.',
      'She gave me an advice that was very useful about the application.'
    ],
    correct: 2,
    explain:
      'Advice, information, research and equipment are uncountable: they take no a or an and no plural s, so a single unit is counted with a piece of.'
  },
  {
    key: 'articles-27',
    category: 'articles',
    prompt:
      'Complete the sentence: "The findings were leaked to ___ press before ___ minister had seen them."',
    options: ['no article / a', 'the / the', 'a / the', 'the / no article'],
    correct: 1,
    explain:
      'Something unique in the context takes the definite article: the press, the government, and a minister already under discussion.'
  },
  {
    key: 'articles-28',
    category: 'articles',
    prompt: 'Complete the sentence: "He is at ___ work until six, so telephone him at ___ home."',
    options: ['the / the', 'a / a', 'the / no article', 'no article / no article'],
    correct: 3,
    explain:
      'Fixed prepositional phrases about routine drop the article: at work, at home, in bed, at sea. The article returns only when the building itself is meant.'
  },
  {
    key: 'articles-29',
    category: 'articles',
    prompt: 'Complete the sentence: "The reforms were intended to protect ___ vulnerable."',
    options: ['no article', 'a', 'the', 'some'],
    correct: 2,
    explain:
      'The plus an adjective names a whole class of people and takes a plural verb: the vulnerable, the unemployed, the elderly.'
  },
  {
    key: 'articles-30',
    category: 'articles',
    prompt: 'Which version of the double comparative is correct?',
    options: [
      'More evidence they gathered, less certain they became.',
      'The more evidence they gathered, the less certain they became.',
      'More the evidence they gathered, less the certain they became.',
      'The more evidence they gathered, less certain they became.'
    ],
    correct: 1,
    explain:
      'The double comparative is a fixed frame with the in front of both halves; neither one can be dropped.'
  },
  {
    key: 'articles-31',
    category: 'articles',
    prompt:
      'Complete the sentence: "Before entering politics she worked as ___ translator at the United Nations."',
    options: ['no article', 'the', 'an', 'a'],
    correct: 3,
    explain:
      'A singular countable noun naming a job after as or be takes a or an; only a unique office such as chair or treasurer drops the article.'
  },
  {
    key: 'articles-32',
    category: 'articles',
    prompt: 'Complete the sentence: "The guidance was issued by ___ WHO and endorsed by ___ NATO."',
    options: ['the / no article', 'no article / the', 'the / the', 'no article / no article'],
    correct: 0,
    explain:
      'Initialisms read letter by letter take the (the WHO, the BBC, the EU); acronyms pronounced as words do not (NATO, UNESCO, Unicef).'
  },
  {
    key: 'articles-33',
    category: 'articles',
    prompt: 'Complete the sentence: "The post requires ___ working knowledge of Portuguese."',
    options: ['no article', 'a', 'the', 'some'],
    correct: 1,
    explain:
      'Knowledge is uncountable on its own but takes a once it is qualified: a working knowledge, a thorough understanding, a real fear of failure.'
  },
  {
    key: 'articles-34',
    category: 'articles',
    prompt: 'Which version is correct when a following phrase pins the noun down?',
    options: [
      'Cost of the equipment has risen sharply since January.',
      'A cost of the equipment has risen sharply since January.',
      'Costs of equipment has risen sharply since January.',
      'The cost of the equipment has risen sharply since January.'
    ],
    correct: 3,
    explain:
      'An of-phrase that identifies one particular thing forces the definite article, even where the bare noun would be general.'
  },

  // ---- punctuation ----
  {
    key: 'punctuation-13',
    category: 'punctuation',
    prompt: 'Which sentence punctuates the introductory adverbial correctly?',
    options: [
      'After nearly a decade of litigation, the company settled out of court.',
      'After nearly a decade of litigation the company, settled out of court.',
      'After, nearly a decade of litigation, the company settled out of court.',
      'After nearly a decade, of litigation the company settled out of court.'
    ],
    correct: 0,
    explain:
      'A long adverbial in front of the main clause is closed off with a comma, and that comma falls where the main clause begins, never between a subject and its verb.'
  },
  {
    key: 'punctuation-14',
    category: 'punctuation',
    prompt:
      'Where does the comma belong in "Having read the minutes twice she still could not identify the decision"?',
    options: ['after Having', 'after read', 'no comma is needed', 'after twice'],
    correct: 3,
    explain:
      'An opening participial phrase is separated from the main clause by a comma at the point where the main clause starts.'
  },
  {
    key: 'punctuation-15',
    category: 'punctuation',
    prompt: 'Which sentence uses the semicolon correctly?',
    options: [
      'The audit found no fraud; although it did reveal careless record-keeping.',
      'The audit found no fraud; it did reveal a pattern of careless record-keeping.',
      'The audit found no fraud; and it did reveal careless record-keeping.',
      'The audit found; no fraud, but a pattern of careless record-keeping.'
    ],
    correct: 1,
    explain:
      'A semicolon joins two clauses that could each stand alone as a sentence; it does not stand before a conjunction, in front of a subordinate clause, or between a verb and its object.'
  },
  {
    key: 'punctuation-16',
    category: 'punctuation',
    prompt: 'Which sentence punctuates "nevertheless" correctly between two clauses?',
    options: [
      'The funding was cut, nevertheless the trial continued.',
      'The funding was cut nevertheless; the trial continued.',
      'The funding was cut; nevertheless, the trial continued.',
      'The funding was cut, nevertheless, the trial continued.'
    ],
    correct: 2,
    explain:
      'Nevertheless is a conjunctive adverb: a semicolon or full stop closes the first clause, and a comma follows the adverb.'
  },
  {
    key: 'punctuation-17',
    category: 'punctuation',
    prompt: 'Which sentence encloses the interrupting phrase correctly?',
    options: [
      'Some materials, graphene for example conduct heat exceptionally well.',
      'Some materials graphene for example, conduct heat exceptionally well.',
      'Some materials, graphene for example, conduct heat exceptionally well.',
      'Some materials graphene, for example conduct heat exceptionally well.'
    ],
    correct: 2,
    explain:
      'An interruption inside a clause needs a comma on both sides; fencing it on one side only leaves the sentence half-open.'
  },
  {
    key: 'punctuation-18',
    category: 'punctuation',
    prompt: 'Which sentence uses the apostrophe correctly?',
    options: [
      'The institute has published its findings, and it\'s now under review.',
      'The institute has published it\'s findings, and its now under review.',
      'The institute has published its\' findings, and it\'s now under review.',
      'The institute has published it\'s findings, and it\'s now under review.'
    ],
    correct: 0,
    explain:
      'Its is a possessive determiner and never takes an apostrophe; it\'s exists only as a contraction of it is or it has.'
  },
  {
    key: 'punctuation-19',
    category: 'punctuation',
    prompt: 'Which version writes the family name and the decade correctly?',
    options: [
      'the Kelly\'s in the 1970\'s',
      'the Kellys in the 1970\'s',
      'the Kelly\'s in the 1970s',
      'the Kellys in the 1970s'
    ],
    correct: 3,
    explain:
      'An apostrophe marks possession or omission, never a plural, so a family name and a decade both take a plain s.'
  },
  {
    key: 'punctuation-20',
    category: 'punctuation',
    prompt: 'Which phrase refers to an office shared by several managers?',
    options: [
      'the manager\'s office',
      'the managers\' office',
      'the managers office',
      'the manager office\'s'
    ],
    correct: 1,
    explain:
      'Form the plural first and then add the apostrophe after its s: manager\'s is one manager, managers\' is more than one.'
  },
  {
    key: 'punctuation-21',
    category: 'punctuation',
    prompt: 'Which sentence introduces the list correctly?',
    options: [
      'The kit contains: a compass, a whistle and a map.',
      'The kit contains three items: a compass, a whistle and a map.',
      'The kit contains three items; a compass, a whistle and a map.',
      'The kit contains three items, a compass a whistle and a map.'
    ],
    correct: 1,
    explain:
      'A colon follows a complete clause and then delivers the list it promises; it must not separate a verb from its objects, and a semicolon cannot introduce a list of simple items.'
  },
  {
    key: 'punctuation-22',
    category: 'punctuation',
    prompt: 'Which sentence uses a pair of dashes correctly?',
    options: [
      'The three witnesses — none of whom knew the others told the same story.',
      'The three witnesses none of whom knew the others — told the same story.',
      'The three witnesses — none of whom knew the others — told the same story.',
      'The three — witnesses none of whom knew the others — told the same story.'
    ],
    correct: 2,
    explain:
      'Dashes marking a parenthesis come in pairs, like brackets or commas; a single dash in the middle of a sentence leaves the interruption unclosed.'
  },
  {
    key: 'punctuation-23',
    category: 'punctuation',
    prompt: 'Which sentence uses a single dash correctly?',
    options: [
      'She had one ambition left — to see the bridge finished.',
      'She had — one ambition left to see the bridge finished.',
      'She had one — ambition left to see the bridge finished.',
      'She had one ambition — left to see — the bridge finished.'
    ],
    correct: 0,
    explain:
      'A single dash sets off an addition at the end of a sentence, where it does the work of a colon in a more abrupt tone.'
  },
  {
    key: 'punctuation-24',
    category: 'punctuation',
    prompt: 'Which sentence says that only some of the papers were peer-reviewed?',
    options: [
      'The papers, which were peer-reviewed, appear in the appendix.',
      'The papers which were peer-reviewed, appear in the appendix.',
      'The papers, which were peer-reviewed appear in the appendix.',
      'The papers that were peer-reviewed appear in the appendix.'
    ],
    correct: 3,
    explain:
      'A defining clause narrows the noun and takes no commas; with commas the sentence says that all the papers were peer-reviewed and adds the fact in passing.'
  },
  {
    key: 'punctuation-25',
    category: 'punctuation',
    prompt: 'Which sentence adds information about a person who is already identified?',
    options: [
      'Her supervisor who had retired in June agreed to sign the form.',
      'Her supervisor, who had retired in June agreed to sign the form.',
      'Her supervisor who had retired in June, agreed to sign the form.',
      'Her supervisor, who had retired in June, agreed to sign the form.'
    ],
    correct: 3,
    explain:
      'When the noun already points to one person, the relative clause is non-defining and must be enclosed by two commas.'
  },
  {
    key: 'punctuation-26',
    category: 'punctuation',
    prompt: 'Which sentence punctuates the two adjectives correctly?',
    options: [
      'It was a long tedious, meeting that settled nothing.',
      'It was a long, tedious meeting that settled nothing.',
      'It was a long, tedious, meeting that settled nothing.',
      'It was a, long tedious meeting that settled nothing.'
    ],
    correct: 1,
    explain:
      'Adjectives of the same kind are separated by a comma, but no comma ever stands between the final adjective and its noun.'
  },
  {
    key: 'punctuation-27',
    category: 'punctuation',
    prompt: 'Which sentence keeps the subject and the verb together correctly?',
    options: [
      'What the committee decided in March, was never minuted.',
      'What the committee, decided in March was never minuted.',
      'What the committee decided in March was never minuted.',
      'What the committee decided, in March, was never, minuted.'
    ],
    correct: 2,
    explain:
      'However long the subject grows, a single comma never separates it from its verb.'
  },
  {
    key: 'punctuation-28',
    category: 'punctuation',
    prompt: 'Which sentence punctuates "however" as an interrupter inside one clause?',
    options: [
      'The second trial, however, produced no such effect.',
      'The second trial however, produced no such effect.',
      'The second trial, however produced no such effect.',
      'The second, trial however produced no such effect.'
    ],
    correct: 0,
    explain:
      'Inside a single clause however is parenthetical and takes a comma on each side; only between two clauses does it need a semicolon in front of it.'
  },
  {
    key: 'punctuation-29',
    category: 'punctuation',
    prompt: 'Which sentence places the comma correctly with the conjunction?',
    options: [
      'The archive closed in 2019, and the collection was dispersed.',
      'The archive closed in 2019 and, the collection was dispersed.',
      'The archive closed in 2019, and, the collection was dispersed.',
      'The archive, closed in 2019 and the collection was dispersed.'
    ],
    correct: 0,
    explain:
      'When and joins two independent clauses, the comma goes before the conjunction and never after it.'
  },
  {
    key: 'punctuation-30',
    category: 'punctuation',
    prompt: 'Which sentence handles the reporting clause correctly?',
    options: [
      'The minister argued, that the figures had been misread.',
      'The minister argued that, the figures had been misread.',
      'The minister argued that the figures had been misread.',
      'The minister, argued that the figures had been misread.'
    ],
    correct: 2,
    explain:
      'No comma stands either side of that when it introduces a reported clause.'
  },
  {
    key: 'punctuation-31',
    category: 'punctuation',
    prompt: 'Which sentence spells both relative words correctly?',
    options: [
      'The witness who\'s statement was withdrawn is the one whose now under investigation.',
      'The witness whose statement was withdrawn is the one whose now under investigation.',
      'The witness who\'s statement was withdrawn is the one who\'s now under investigation.',
      'The witness whose statement was withdrawn is the one who\'s now under investigation.'
    ],
    correct: 3,
    explain:
      'Whose is the possessive; who\'s is only ever the contraction of who is or who has.'
  },
  {
    key: 'punctuation-32',
    category: 'punctuation',
    prompt: 'Which version writes the plural qualifications correctly?',
    options: [
      'Two PhD\'s and three MA\'s were awarded.',
      'Two PhDs and three MAs were awarded.',
      'Two PhDs\' and three MAs\' were awarded.',
      'Two PhD\'s and three MAs were awarded.'
    ],
    correct: 1,
    explain:
      'Abbreviations form their plural with a plain s; an apostrophe there would signal possession instead.'
  },
  {
    key: 'punctuation-33',
    category: 'punctuation',
    prompt: 'Which version shows that the flat belongs to Anna and Peter jointly?',
    options: [
      'Anna\'s and Peter\'s flat',
      'Anna and Peters flat',
      'Anna and Peter\'s flat',
      'Annas and Peter\'s flat'
    ],
    correct: 2,
    explain:
      'Joint ownership marks only the last name; giving each name an apostrophe would mean they own one flat each.'
  },
  {
    key: 'punctuation-34',
    category: 'punctuation',
    prompt: 'Which sentence punctuates the appositive correctly?',
    options: [
      'The keynote speaker a former central banker, avoided the question.',
      'The keynote speaker, a former central banker avoided the question.',
      'The keynote speaker a former central banker avoided the question.',
      'The keynote speaker, a former central banker, avoided the question.'
    ],
    correct: 3,
    explain:
      'A noun phrase that renames the subject is parenthetical and is enclosed by a pair of commas.'
  },
  {
    key: 'punctuation-35',
    category: 'punctuation',
    prompt: 'Which sentence is correct when one subject governs two verbs?',
    options: [
      'The committee met in June and reported in July.',
      'The committee met in June, and reported in July.',
      'The committee, met in June and reported in July.',
      'The committee met in June and, reported in July.'
    ],
    correct: 0,
    explain:
      'Two verbs sharing one subject form a compound predicate rather than two clauses, so no comma goes before and.'
  },
  {
    key: 'punctuation-36',
    category: 'punctuation',
    prompt: 'Which sentence punctuates the concessive phrase at the end correctly?',
    options: [
      'She agreed to the terms though not without protest.',
      'She agreed to the terms, though not without protest.',
      'She agreed, to the terms though not without protest.',
      'She agreed to the terms though, not without protest.'
    ],
    correct: 1,
    explain:
      'A contrasting afterthought at the end of a sentence is marked off by a comma, which shows that it qualifies what has just been said.'
  },

  // ---- boundaries ----
  {
    key: 'boundaries-13',
    category: 'boundaries',
    prompt: 'Which version fixes the run-on "The lecture overran nobody complained"?',
    options: [
      'The lecture overran, nobody complained.',
      'The lecture overran nobody complained about it.',
      'The lecture overran; nobody complained.',
      'The lecture overran nobody, complained.'
    ],
    correct: 2,
    explain:
      'Two independent clauses run together need a full stop or a semicolon between them; a comma alone merely turns the fusion into a splice.'
  },
  {
    key: 'boundaries-14',
    category: 'boundaries',
    prompt:
      'Which version repairs the comma splice "The archive is fully digitised, the originals remain sealed"?',
    options: [
      'The archive is fully digitised; the originals remain sealed.',
      'The archive is fully digitised, however the originals remain sealed.',
      'The archive is fully digitised the originals remain sealed.',
      'The archive is fully digitised, moreover, the originals remain sealed.'
    ],
    correct: 0,
    explain:
      'A semicolon is the shortest repair for a splice between two closely related clauses; an adverb such as however or moreover joins nothing and leaves the fault in place.'
  },
  {
    key: 'boundaries-15',
    category: 'boundaries',
    prompt: 'Which of these is a fused sentence?',
    options: [
      'The tender was reissued; the deadline moved to April.',
      'The tender was reissued, and the deadline moved to April.',
      'Because the tender was reissued, the deadline moved to April.',
      'The tender was reissued the deadline moved to April.'
    ],
    correct: 3,
    explain:
      'A fused or run-on sentence pushes two independent clauses together with no punctuation and no conjunction at all.'
  },
  {
    key: 'boundaries-16',
    category: 'boundaries',
    prompt: 'Which of these is a comma splice?',
    options: [
      'The estimate was optimistic, but the board approved it.',
      'The estimate was optimistic, the board approved it anyway.',
      'The estimate was optimistic; the board approved it anyway.',
      'Although the estimate was optimistic, the board approved it.'
    ],
    correct: 1,
    explain:
      'A comma splice joins two independent clauses with nothing but a comma; a coordinating conjunction or a subordinator makes the very same comma legitimate.'
  },
  {
    key: 'boundaries-17',
    category: 'boundaries',
    prompt: 'Which of these is a fragment rather than a sentence?',
    options: [
      'The results held up under reanalysis.',
      'Which the reviewers had not anticipated at all.',
      'Reanalysis confirmed them.',
      'They held up.'
    ],
    correct: 1,
    explain:
      'A relative clause has no main verb of its own to stand on, while a very short string is still a sentence if it has a subject and a finite verb.'
  },
  {
    key: 'boundaries-18',
    category: 'boundaries',
    prompt:
      'Which revision turns "Because the funding was withdrawn at short notice" into a complete sentence?',
    options: [
      'Because the funding was withdrawn at short notice, and the project team disbanded.',
      'Because of the funding withdrawn at short notice.',
      'The funding withdrawn at short notice, because of this.',
      'Because the funding was withdrawn at short notice, the project team disbanded.'
    ],
    correct: 3,
    explain:
      'A subordinate clause needs a main clause to attach to; adding and does not supply one.'
  },
  {
    key: 'boundaries-19',
    category: 'boundaries',
    prompt: 'Which version links the clauses with "moreover" correctly?',
    options: [
      'The scheme was underfunded; moreover, it lacked political support.',
      'The scheme was underfunded, moreover it lacked political support.',
      'The scheme was underfunded moreover, it lacked political support.',
      'The scheme was underfunded, moreover, it lacked political support.'
    ],
    correct: 0,
    explain:
      'Moreover is an adverb, not a conjunction: close the first clause with a semicolon or a full stop, then follow the adverb with a comma.'
  },
  {
    key: 'boundaries-20',
    category: 'boundaries',
    prompt: 'Which version links the clauses with "consequently" correctly?',
    options: [
      'The supplier went into administration, consequently the line stopped.',
      'The supplier went into administration consequently; the line stopped.',
      'The supplier went into administration. Consequently, the line stopped.',
      'The supplier went into administration, consequently, the line stopped.'
    ],
    correct: 2,
    explain:
      'Consequently cannot join two clauses, so beginning a new sentence with it and following it with a comma is always safe.'
  },
  {
    key: 'boundaries-21',
    category: 'boundaries',
    prompt:
      'Which revision of "The survey was voluntary, the response rate was low" subordinates one of the clauses?',
    options: [
      'The survey was voluntary; the response rate was low.',
      'The survey was voluntary, and the response rate was low.',
      'Because the survey was voluntary, the response rate was low.',
      'The survey was voluntary, the response rate, low.'
    ],
    correct: 2,
    explain:
      'Subordination both removes the splice and states the relationship between the clauses, which a semicolon leaves the reader to infer.'
  },
  {
    key: 'boundaries-22',
    category: 'boundaries',
    prompt:
      'Which revision of "The building is listed, the interior may still be altered" adds a coordinating conjunction?',
    options: [
      'The building is listed; the interior may still be altered.',
      'The building is listed, but the interior may still be altered.',
      'The building is listed, however the interior may still be altered.',
      'The building is listed, the interior, however, may still be altered.'
    ],
    correct: 1,
    explain:
      'Only the coordinating conjunctions — and, but, or, nor, for, so, yet — license a comma between two clauses. The semicolon version is correct English but uses no conjunction, and however leaves the splice untouched.'
  },
  {
    key: 'boundaries-23',
    category: 'boundaries',
    prompt: 'Which of these stands as a complete sentence on its own?',
    options: [
      'Despite the objections raised at the previous meeting by two members of the panel.',
      'A finding that no subsequent study has managed to replicate.',
      'Running to more than four hundred pages and citing every relevant judgment.',
      'The panel disagreed.'
    ],
    correct: 3,
    explain:
      'A sentence needs a subject and a finite verb in a main clause; length has nothing to do with it.'
  },
  {
    key: 'boundaries-24',
    category: 'boundaries',
    prompt: 'Which version repairs "The bridge reopened in May traffic returned within a week"?',
    options: [
      'The bridge reopened in May, and traffic returned within a week.',
      'The bridge reopened in May traffic, returned within a week.',
      'The bridge reopened in May, traffic returned within a week.',
      'The bridge reopened in May traffic returned, within a week.'
    ],
    correct: 0,
    explain:
      'A comma plus a coordinating conjunction is one of the three legitimate ways to join independent clauses; the bare comma is a splice.'
  },
  {
    key: 'boundaries-25',
    category: 'boundaries',
    prompt: 'Which pair of sentences is correctly separated?',
    options: [
      'The vote was postponed. No new date has been set.',
      'The vote was postponed. Although no new date has been set.',
      'The vote was postponed, no new date has been set.',
      'The vote was postponed no new date has been set.'
    ],
    correct: 0,
    explain:
      'Each sentence must contain a main clause, so a full stop in front of a subordinate clause leaves a fragment behind it.'
  },
  {
    key: 'boundaries-26',
    category: 'boundaries',
    prompt: 'Which version contains neither a splice nor a fragment?',
    options: [
      'The dig was abandoned in 1974. Because the site had flooded.',
      'The dig was abandoned in 1974, the site had flooded.',
      'The dig was abandoned in 1974 the site had flooded.',
      'The dig was abandoned in 1974 because the site had flooded.'
    ],
    correct: 3,
    explain:
      'A subordinating conjunction inside one sentence links the two ideas without splicing them or stranding either half.'
  },
  {
    key: 'boundaries-27',
    category: 'boundaries',
    prompt: 'Which revision repairs the fragment "Working through the night to meet the deadline"?',
    options: [
      'Working through the night to meet the deadline, which was Friday.',
      'The team worked through the night to meet the deadline.',
      'Working through the night, to meet the deadline.',
      'Although working through the night to meet the deadline.'
    ],
    correct: 1,
    explain:
      'An -ing form is not a finite verb, so the fragment needs a subject and a tensed verb rather than further modification.'
  },
  {
    key: 'boundaries-28',
    category: 'boundaries',
    prompt: 'Which version joins the clauses with "so" correctly?',
    options: [
      'The hall was double-booked so, the seminar moved online.',
      'The hall was double-booked, so, the seminar moved online.',
      'The hall was double-booked, so the seminar moved online.',
      'The hall was double-booked so the seminar, moved online.'
    ],
    correct: 2,
    explain:
      'So is a coordinating conjunction: the comma goes in front of it and nothing follows it.'
  },
  {
    key: 'boundaries-29',
    category: 'boundaries',
    prompt: 'Which version joins the two actions without a splice?',
    options: [
      'She checked the figures, then she signed the report.',
      'She checked the figures then, she signed the report.',
      'She checked the figures, then, she signed the report.',
      'She checked the figures and then signed the report.'
    ],
    correct: 3,
    explain:
      'Then is an adverb, not a conjunction, so it cannot hold two independent clauses together after a comma.'
  },
  {
    key: 'boundaries-30',
    category: 'boundaries',
    prompt: 'Which version punctuates "in fact" between two independent clauses correctly?',
    options: [
      'The delay was not the supplier\'s doing; in fact, the order was placed late.',
      'The delay was not the supplier\'s doing, in fact the order was placed late.',
      'The delay was not the supplier\'s doing in fact, the order was placed late.',
      'The delay was not the supplier\'s doing, in fact, the order was placed late.'
    ],
    correct: 0,
    explain:
      'A linking phrase such as in fact behaves exactly like however: where two whole clauses meet, it needs a semicolon or a full stop in front of it.'
  },
  {
    key: 'boundaries-31',
    category: 'boundaries',
    prompt: 'Which version is a single grammatical sentence?',
    options: [
      'Not only the cost rose but also the timetable slipped, which nobody predicted it.',
      'The cost rose, also the timetable slipped.',
      'Not only did the cost rise, but the timetable also slipped.',
      'The cost rose. Also the timetable slipping.'
    ],
    correct: 2,
    explain:
      'Not only at the front of a clause triggers inversion, and but keeps the two clauses properly joined; the others splice the clauses or leave a participle with no tensed verb.'
  },
  {
    key: 'boundaries-32',
    category: 'boundaries',
    prompt:
      'Which version breaks up the run-on "The trial began in March it ran for six weeks the verdict came in May"?',
    options: [
      'The trial began in March, it ran for six weeks, the verdict came in May.',
      'The trial began in March and ran for six weeks; the verdict came in May.',
      'The trial began in March it ran for six weeks, the verdict came in May.',
      'The trial began in March, running for six weeks, the verdict came in May.'
    ],
    correct: 1,
    explain:
      'Three fused clauses are best resolved by joining the closely related pair with a conjunction and separating the third with a semicolon or a full stop.'
  },
  {
    key: 'boundaries-33',
    category: 'boundaries',
    prompt: 'In which pair does a fragment follow a complete sentence?',
    options: [
      'The tape survived. It had been stored in a cellar.',
      'The tape survived. Having been stored in a cellar for forty years.',
      'The tape survived because it had been stored in a cellar.',
      'The tape survived; it had been stored in a cellar.'
    ],
    correct: 1,
    explain:
      'A participial phrase cannot stand as a sentence, however much information it carries.'
  },
  {
    key: 'boundaries-34',
    category: 'boundaries',
    prompt: 'Which version attaches the who-clause correctly?',
    options: [
      'The auditor resigned in June. Who had queried the figures twice.',
      'The auditor resigned in June, who had queried the figures twice.',
      'The auditor, who had queried the figures twice, resigned in June.',
      'The auditor resigned in June. And who had queried the figures twice.'
    ],
    correct: 2,
    explain:
      'A relative clause belongs beside the noun it describes and cannot be detached as a sentence of its own.'
  },
  {
    key: 'boundaries-35',
    category: 'boundaries',
    prompt:
      'Which repair of "The manuscript is undated, the watermark places it after 1720" leaves both statements equal in weight?',
    options: [
      'The manuscript is undated; the watermark places it after 1720.',
      'Although the manuscript is undated, the watermark places it after 1720.',
      'The manuscript is undated, the watermark placing it after 1720.',
      'The manuscript being undated, the watermark places it after 1720.'
    ],
    correct: 0,
    explain:
      'A semicolon removes the splice while keeping the two statements equal; subordination and participles both demote one of them.'
  },
  {
    key: 'boundaries-36',
    category: 'boundaries',
    prompt: 'Which version corrects the splice "Attendance has fallen, the society is not in danger"?',
    options: [
      'Attendance has fallen, the society is however not in danger.',
      'Attendance has fallen the society is not in danger.',
      'Attendance has fallen, nevertheless the society is not in danger.',
      'Attendance has fallen, but the society is not in danger.'
    ],
    correct: 3,
    explain:
      'But joins the clauses after the comma and states the contrast, which the adverbs however and nevertheless cannot do without a semicolon.'
  },

  // ---- confusables ----
  {
    key: 'confusables-25',
    category: 'confusables',
    prompt:
      'Complete the sentence: "She has been allowed to ___ again, though her ___ is much smaller than before."',
    options: ['practise / practice', 'practice / practise', 'practise / practise', 'practice / practice'],
    correct: 0,
    explain:
      'British English spells the verb practise and the noun practice; the noun is the one with the c, like ice.'
  },
  {
    key: 'confusables-26',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The council will ___ the premises once the new ___ has been paid for."',
    options: ['licence / license', 'license / license', 'licence / licence', 'license / licence'],
    correct: 3,
    explain:
      'British English writes the verb license and the noun licence, on the same pattern as practise and practice; American English uses license for both.'
  },
  {
    key: 'confusables-27',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The allowance is paid for each ___ child, and a further sum for every adult ___."',
    options: [
      'dependant / dependent',
      'dependent / dependant',
      'dependent / dependent',
      'dependant / dependant'
    ],
    correct: 1,
    explain:
      'In British English dependent is the adjective and dependant the noun naming the person who is supported.'
  },
  {
    key: 'confusables-28',
    category: 'confusables',
    prompt: 'Which sentence uses "comprise" as careful usage requires?',
    options: [
      'The federation is comprised of nine regional bodies.',
      'Nine regional bodies comprise into the federation.',
      'The federation comprises nine regional bodies.',
      'The federation is comprised by nine regional bodies.'
    ],
    correct: 2,
    explain:
      'The whole comprises the parts, so no of follows it; if the passive feels more natural, write is composed of or consists of.'
  },
  {
    key: 'confusables-29',
    category: 'confusables',
    prompt:
      'Complete the sentence: "Counsel will ___ the board tomorrow, but her ___ is unlikely to be welcome."',
    options: ['advice / advise', 'advise / advice', 'advise / advise', 'advice / advice'],
    correct: 1,
    explain:
      'Advise with an s is the verb and advice with a c the noun; unlike practise and practice, the two are also pronounced differently.'
  },
  {
    key: 'confusables-30',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The reform had wide ___ consequences, although the new boilers were merely more ___."',
    options: [
      'economic / economical',
      'economical / economic',
      'economic / economic',
      'economical / economical'
    ],
    correct: 0,
    explain:
      'Economic relates to the economy; economical means thrifty, sparing in its use of money or fuel.'
  },
  {
    key: 'confusables-31',
    category: 'confusables',
    prompt: 'Complete the sentence: "Those who ___ the regulations tend also to ___ their impunity."',
    options: ['flaunt / flout', 'flout / flout', 'flaunt / flaunt', 'flout / flaunt'],
    correct: 3,
    explain:
      'To flout a rule is to break it openly and deliberately; to flaunt something is to display it ostentatiously.'
  },
  {
    key: 'confusables-32',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The statute ___ the practice altogether, while the guidance ___ a safer alternative."',
    options: [
      'prescribes / proscribes',
      'proscribes / prescribed',
      'proscribes / prescribes',
      'prescribes / prescribed'
    ],
    correct: 2,
    explain:
      'Proscribe means to forbid; prescribe means to lay something down as a rule or a remedy.'
  },

  // ---- register ----
  {
    key: 'register-17',
    category: 'register',
    prompt: 'Which sentence suits a formal report while still reading clearly?',
    options: [
      'The team reviewed the contract and identified three risks.',
      'A review of the contract was undertaken by the team, with the identification of three risks resulting therefrom.',
      'We had a look at the contract and spotted three things that could go wrong.',
      'Contract reviewed, three risks, details below.'
    ],
    correct: 0,
    explain:
      'Formality does not require noun-heavy paraphrase: a concrete subject with a plain verb is both formal and readable, whereas nominalisation hides who did what.'
  },
  {
    key: 'register-18',
    category: 'register',
    prompt: 'Which sentence suits the methods section of a scientific paper?',
    options: [
      'We just took whatever samples we could get hold of.',
      'I went round collecting samples over about a month or so.',
      'Samples were collected at fortnightly intervals over three months.',
      'The present authors did proceed to the collection of samples on a fortnightly basis.'
    ],
    correct: 2,
    explain:
      'A methods section states the procedure precisely, and the passive keeps the focus on what was done rather than on who did it.'
  },
  {
    key: 'register-19',
    category: 'register',
    prompt: 'Which request is appropriately polite in an email to a senior official you have never met?',
    options: [
      'Send me the figures today please.',
      'I need those figures, can you sort that out?',
      'Would you be so extraordinarily kind as to see your way to forwarding the figures?',
      'I would be grateful if you could send me the figures by Friday.'
    ],
    correct: 3,
    explain:
      'A conditional request with a clear deadline is the standard formal pattern; a bare imperative reads as brusque and an elaborate flourish as insincere.'
  },
  {
    key: 'register-20',
    category: 'register',
    prompt: 'Which apology suits a formal letter to a customer?',
    options: [
      'Sorry about that, these things happen.',
      'We apologise for the delay and for the inconvenience it has caused.',
      'We are devastated beyond expression by this most regrettable of occurrences.',
      'The delay was not really our fault, but sorry anyway.'
    ],
    correct: 1,
    explain:
      'A formal apology names the fault, acknowledges its effect and stops there; exaggeration and self-justification both undermine it.'
  },
  {
    key: 'register-21',
    category: 'register',
    prompt: 'Which sentence suits the minutes of a committee meeting?',
    options: [
      'Everyone got rather annoyed about the budget again.',
      'The budget row rumbled on, as it always does.',
      'The committee discussed the budget and agreed to defer a decision until October.',
      'It was felt by those present that matters budgetary were of a contentious character.'
    ],
    correct: 2,
    explain:
      'Minutes record decisions and actions in neutral, factual language; commentary on the mood of the room has no place in them.'
  },
  {
    key: 'register-22',
    category: 'register',
    prompt: 'Which sentence suits a technical specification?',
    options: [
      'The housing must withstand temperatures of up to 80 degrees Celsius.',
      'The housing should be able to cope with things getting fairly hot.',
      'The housing must be really very heat-resistant indeed.',
      'It is envisaged that the housing will exhibit heat-resistant characteristics.'
    ],
    correct: 0,
    explain:
      'A specification is binding, so it needs a measurable requirement and the modal must; vague adjectives and hedged envisagement cannot be tested.'
  },
  {
    key: 'register-23',
    category: 'register',
    prompt: 'Which opening suits a covering letter to an employer you have never met?',
    options: [
      'Hi there, I saw your advert and thought I would give it a go.',
      'I am writing to apply for the post of research assistant advertised on your website.',
      'Pursuant to your esteemed advertisement, the undersigned hereby makes application.',
      'You are looking for a research assistant. Look no further.'
    ],
    correct: 1,
    explain:
      'A covering letter opens by naming the post and where it was advertised, in neutral formal English; archaic legalese and sales patter both misjudge the reader.'
  },
  {
    key: 'register-24',
    category: 'register',
    prompt: 'Which sentence suits a briefing note for ministers?',
    options: [
      'The scheme is a mess and the sooner it goes the better.',
      'The scheme has, if we are honest, been something of a catastrophe.',
      'The scheme is not, perhaps, entirely without a certain number of difficulties of some kind.',
      'The scheme has not met its targets, and three options for reform are set out below.'
    ],
    correct: 3,
    explain:
      'A briefing states the position and the available choices without editorialising; blunt opinion and layered hedging both leave the reader with no decision to take.'
  },
  {
    key: 'register-25',
    category: 'register',
    prompt: 'Which sentence reports a limitation appropriately in a dissertation?',
    options: [
      'Unfortunately the sample was hopeless, so take all of this with a pinch of salt.',
      'The sample was small, but the findings are certainly true anyway.',
      'The small sample limits the generalisability of these findings.',
      'It must be conceded with the deepest regret that the sample was of a limited extent.'
    ],
    correct: 2,
    explain:
      'A limitation is stated plainly, together with its consequence for the claims; neither apology nor bravado is required.'
  },
  {
    key: 'register-26',
    category: 'register',
    prompt: 'Which comment is appropriately measured in a peer review?',
    options: [
      'The argument in section three would be stronger if the counter-evidence were addressed.',
      'Section three is simply wrong and the author should know better.',
      'I did not really follow section three, sorry.',
      'Section three is, one might venture to suggest, conceivably open to some slight refinement.'
    ],
    correct: 0,
    explain:
      'Peer review criticises the work rather than the author and says what would improve it; hostility and evasive hedging are equally unhelpful.'
  },
  {
    key: 'register-27',
    category: 'register',
    prompt: 'Which sentence suits the abstract of a conference paper?',
    options: [
      'This paper is going to look at a few interesting things about migration.',
      'This paper examines how remittance flows respond to currency shocks in three economies.',
      'Ever wondered what happens to remittances when a currency collapses? Read on.',
      'The present contribution seeks to address itself to certain aspects of the remittance question.'
    ],
    correct: 1,
    explain:
      'An abstract states in one specific sentence what the paper does and on what evidence; teasers and vague self-reference waste the reader\'s attention.'
  },
  {
    key: 'register-28',
    category: 'register',
    prompt: 'Which sentence declines a supplier\'s offer appropriately in a formal email?',
    options: [
      'Thanks but no thanks, we are going elsewhere.',
      'We are not going ahead with you this time, nothing personal.',
      'It is with the profoundest regret imaginable that we find ourselves constrained to decline.',
      'After careful consideration we have decided not to proceed on this occasion.'
    ],
    correct: 3,
    explain:
      'A formal refusal is courteous, brief and impersonal; neither bluntness nor elaborate regret is called for.'
  },
  {
    key: 'register-29',
    category: 'register',
    prompt: 'Which sentence suits a formal notice to tenants?',
    options: [
      'The water supply will be interrupted between 09:00 and 13:00 on 14 March.',
      'Heads up, no water on the 14th for a while in the morning.',
      'Tenants are hereby notified that the aforesaid supply of water shall stand interrupted.',
      'There might be some sort of water issue at some point on the 14th.'
    ],
    correct: 0,
    explain:
      'A notice gives the fact, the times and the date without ornament: officialese adds length, and vagueness adds doubt.'
  },
  {
    key: 'register-30',
    category: 'register',
    prompt: 'You are messaging a close friend to cancel dinner. Which version fits?',
    options: [
      'I regret to inform you that I shall be unable to attend this evening\'s engagement.',
      'Cancel.',
      'Sorry, I have to cancel tonight. Could we do Thursday instead?',
      'It is with regret that the undersigned must cancel the arrangement previously agreed.'
    ],
    correct: 2,
    explain:
      'Register follows the relationship: with a close friend a warm, brief message with an alternative is right, while formal templates read as cold or sarcastic and one word reads as curt.'
  },

  // ---- spelling ----
  {
    key: 'spelling-13',
    category: 'spelling',
    prompt: 'Which spelling of the word meaning cooperation between groups is correct?',
    options: ['liason', 'liaison', 'liasion', 'liaision'],
    correct: 1,
    explain:
      'Liaison keeps an i on each side of the a: li-ai-son, from the French verb lier, to bind.'
  },
  {
    key: 'spelling-14',
    category: 'spelling',
    prompt: 'Which is the British spelling of the word meaning a carefully planned movement?',
    options: ['manouvre', 'maneouvre', 'manoeuvre', 'manoeuver'],
    correct: 2,
    explain:
      'British English keeps the French oe and the -re ending: man-oe-uvre. American English writes maneuver.'
  },
  {
    key: 'spelling-15',
    category: 'spelling',
    prompt: 'Which spelling of the verb meaning to subject someone to persistent pressure is correct?',
    options: ['harrass', 'harass', 'haras', 'harras'],
    correct: 1,
    explain:
      'Harass has a single r and a double s, unlike embarrass, which doubles both letters.'
  },
  {
    key: 'spelling-16',
    category: 'spelling',
    prompt: 'Which spelling of the word for a printed set of survey questions is correct?',
    options: ['questionaire', 'questionnaire', 'questionnair', 'questionarre'],
    correct: 1,
    explain:
      'Questionnaire doubles the n and keeps the French ending -aire.'
  },
  {
    key: 'spelling-17',
    category: 'spelling',
    prompt: 'Which spelling of the word meaning a special right or advantage is correct?',
    options: ['privelege', 'priviledge', 'privilege', 'privilage'],
    correct: 2,
    explain:
      'Privilege has two i letters, an e before the g and no d at all; it comes from Latin privus and lex.'
  },
  {
    key: 'spelling-18',
    category: 'spelling',
    prompt: 'Which spelling of the adjective meaning careful and diligent is correct?',
    options: ['concientious', 'conscientious', 'conscientous', 'consciencious'],
    correct: 1,
    explain:
      'Conscientious keeps the sc of conscience but ends in -tious rather than -cious.'
  },
  {
    key: 'spelling-19',
    category: 'spelling',
    prompt: 'Which spelling of the noun formed from "exist" is correct?',
    options: ['existence', 'existance', 'existense', 'existanse'],
    correct: 0,
    explain:
      'Existence ends in -ence, like persistence, insistence and independence.'
  },
  {
    key: 'spelling-20',
    category: 'spelling',
    prompt: 'Which spelling of the adjective meaning free from outside control is correct?',
    options: ['independant', 'indipendent', 'independend', 'independent'],
    correct: 3,
    explain:
      'The adjective ends in -ent and so does the noun independence; only a handful of words, such as attendant and defendant, take -ant.'
  },
  {
    key: 'spelling-21',
    category: 'spelling',
    prompt: 'Which spelling of the noun meaning persistence in the face of difficulty is correct?',
    options: ['perseverence', 'perserverance', 'perseverance', 'persaverance'],
    correct: 2,
    explain:
      'Perseverance ends in -ance and contains no extra r: per-se-ver-ance.'
  },
  {
    key: 'spelling-22',
    category: 'spelling',
    prompt: 'Which spelling of the adjective meaning able to be reached is correct?',
    options: ['accessable', 'acessible', 'accesible', 'accessible'],
    correct: 3,
    explain:
      'Accessible keeps its double c and double s and takes -ible, like responsible, permissible and legible.'
  },
  {
    key: 'spelling-23',
    category: 'spelling',
    prompt: 'Which spelling of the adjective meaning absolutely necessary is correct?',
    options: ['indispensable', 'indispensible', 'indespensable', 'indispenseable'],
    correct: 0,
    explain:
      'Indispensable takes -able even though the ear expects -ible; the -able and -ible endings sound identical, so the frequent exceptions have to be learned by sight.'
  },
  {
    key: 'spelling-24',
    category: 'spelling',
    prompt: 'Which spelling of the noun formed from "commit" is correct?',
    options: ['committment', 'commitment', 'comitment', 'commitement'],
    correct: 1,
    explain:
      'Commit doubles its t only before an ending that begins with a vowel: committed and committing, but commitment.'
  },
  {
    key: 'spelling-25',
    category: 'spelling',
    prompt: 'Which spelling of the noun formed from "argue" is correct?',
    options: ['arguement', 'argumment', 'arguemant', 'argument'],
    correct: 3,
    explain:
      'Argue drops its final e before -ment, as true does in truly; judgement is the well-known British word that may keep it.'
  },
  {
    key: 'spelling-26',
    category: 'spelling',
    prompt: 'Which spelling of the adverb formed from "public" is correct?',
    options: ['publicly', 'publically', 'publicaly', 'publiclly'],
    correct: 0,
    explain:
      'Public is the one common adjective in -ic that adds -ly directly; basically, tragically and dramatically all insert -al- first.'
  },
  {
    key: 'spelling-27',
    category: 'spelling',
    prompt:
      'British English allows both -ise and -ize in many verbs, but not in all of them. Which spelling is correct?',
    options: ['advertize', 'advertyse', 'advertise', 'adverstise'],
    correct: 2,
    explain:
      'Advertise, surprise, exercise and supervise never take a z, because their -ise belongs to the stem rather than being the Greek -ize suffix.'
  },
  {
    key: 'spelling-28',
    category: 'spelling',
    prompt: 'Which is the standard British spelling of the verb meaning to examine in detail?',
    options: ['analize', 'anelyse', 'analyze', 'analyse'],
    correct: 3,
    explain:
      'Analyse and paralyse come from a Greek stem in -lys-, so British English keeps the s even where it tolerates organize beside organise.'
  },
  {
    key: 'spelling-29',
    category: 'spelling',
    prompt: 'Which spelling of the verb meaning to overstate is correct?',
    options: ['exaggerate', 'exagerate', 'exhaggerate', 'exaggarate'],
    correct: 0,
    explain:
      'Exaggerate doubles the g, has no h after the ex- and ends in -ate.'
  },
  {
    key: 'spelling-30',
    category: 'spelling',
    prompt: 'Which spelling of the word for a period of a thousand years is correct?',
    options: ['milennium', 'millenium', 'millennium', 'millenneum'],
    correct: 2,
    explain:
      'Millennium doubles both the l and the n, from Latin mille, a thousand, and annus, a year.'
  },
  {
    key: 'spelling-31',
    category: 'spelling',
    prompt: 'Which spelling of the noun for someone you know only slightly is correct?',
    options: ['acquaintance', 'aquaintance', 'acquaintence', 'aquaintence'],
    correct: 0,
    explain:
      'Acquaintance keeps the cq of acquire and acquit, and ends in -ance.'
  },
  {
    key: 'spelling-32',
    category: 'spelling',
    prompt: 'Which spelling of the word meaning government by officials is correct?',
    options: ['beaurocracy', 'bureacracy', 'buerocracy', 'bureaucracy'],
    correct: 3,
    explain:
      'Bureaucracy is bureau plus -cracy, so the eau of the French bureau stays intact.'
  }
]
