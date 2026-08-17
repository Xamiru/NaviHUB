import type { EnSpotErrorItem } from './types'

// Spot-the-error items: click the one wrong token (or "No error"). Tokens are
// words with their attached punctuation; `fix` replaces the token verbatim.
// Keys FROZEN. Gate: tests/englishGames.test.ts.
export const EN_SPOT_ERRORS: EnSpotErrorItem[] = [
  {
    key: 'spot-01',
    tokens: ['The', 'data', 'suggests', 'that', 'the', 'effect', 'is', 'smaller', 'then', 'we', 'assumed.'],
    wrongIndex: 8,
    fix: 'than',
    explain: 'Comparisons take "than"; "then" is a sequence word.',
    category: 'confusables'
  },
  {
    key: 'spot-02',
    tokens: ['Neither', 'of', 'the', 'proposals', 'was', 'accepted', 'by', 'the', 'board.'],
    wrongIndex: null,
    fix: null,
    explain: '"Neither of" takes a singular verb in formal English — the sentence is correct as written.',
    category: 'articles'
  },
  {
    key: 'spot-03',
    tokens: ['The', 'proposal', 'represents', 'a', 'unprecedented', 'shift', 'in', 'transport', 'policy.'],
    wrongIndex: 3,
    fix: 'an',
    explain: 'Use "an" before a vowel SOUND, and "unprecedented" begins with one.',
    category: 'articles'
  },
  {
    key: 'spot-04',
    tokens: ['The', 'agency', 'offered', 'her', 'an', 'one-year', 'contract', 'with', 'no', 'promise', 'of', 'renewal.'],
    wrongIndex: 4,
    fix: 'a',
    explain: '"One-" is pronounced "wun", a consonant sound, so the article is "a".',
    category: 'articles'
  },
  {
    key: 'spot-05',
    tokens: ['After', 'ten', 'years', 'in', 'banking,', 'she', 'decided', 'to', 'take', 'a', 'MBA', 'in', 'Rotterdam.'],
    wrongIndex: 9,
    fix: 'an',
    explain: 'The letter M is read "em", a vowel sound, so it takes "an MBA".',
    category: 'articles'
  },
  {
    key: 'spot-06',
    tokens: ['She', 'spent', 'a', 'year', 'working', 'for', 'an', 'European', 'broadcaster', 'in', 'Brussels.'],
    wrongIndex: 6,
    fix: 'a',
    explain: '"European" begins with a "y" sound, so it takes "a", not "an".',
    category: 'articles'
  },
  {
    key: 'spot-07',
    tokens: ['Since', 'graduating', 'she', 'has', 'worked', 'as', 'the', 'freelance', 'translator', 'for', 'several', 'publishers.'],
    wrongIndex: 6,
    fix: 'a',
    explain: 'A job named after "work as" is indefinite: one translator among many.',
    category: 'articles'
  },
  {
    key: 'spot-08',
    tokens: ['He', 'was', 'a', 'first', 'person', 'to', 'raise', 'concerns', 'about', 'the', 'contract.'],
    wrongIndex: 2,
    fix: 'the',
    explain: 'Ordinals such as "first" pick out a unique item, so they take "the".',
    category: 'articles'
  },
  {
    key: 'spot-09',
    tokens: ['The', 'flat', 'will', 'be', 'sold', 'to', 'a', 'highest', 'bidder', 'at', 'auction', 'next', 'Thursday.'],
    wrongIndex: 6,
    fix: 'the',
    explain: 'A superlative identifies one unique thing and therefore takes "the".',
    category: 'articles'
  },
  {
    key: 'spot-10',
    tokens: ['She', 'completed', 'an', 'university', 'course', 'in', 'translation', 'before', 'moving', 'abroad.'],
    wrongIndex: 2,
    fix: 'a',
    explain: '"University" begins with a "y" sound, so the article is "a".',
    category: 'articles'
  },
  {
    key: 'spot-11',
    tokens: ['The', 'consultant', 'charges', 'a', 'hourly', 'rate', 'that', 'most', 'small', 'charities', 'cannot', 'afford.'],
    wrongIndex: 3,
    fix: 'an',
    explain: 'The h in "hourly" is silent, so the word opens with a vowel sound: "an".',
    category: 'articles'
  },
  {
    key: 'spot-12',
    tokens: ['She', 'has', 'been', 'in', 'hospital', 'since', 'Tuesday', 'and', 'will', 'be', 'discharged', 'at', 'the', 'weekend.'],
    wrongIndex: null,
    fix: null,
    explain: 'British English uses "in hospital" and "at the weekend" with no extra article — correct as written.',
    category: 'articles'
  },
  {
    key: 'spot-13',
    tokens: ['He', 'was', 'appointed', 'head', 'of', 'department', 'at', 'the', 'age', 'of', 'thirty-four.'],
    wrongIndex: null,
    fix: null,
    explain: 'A unique post after "appointed" takes no article, so nothing is missing here.',
    category: 'articles'
  },
  {
    key: 'spot-14',
    tokens: ['Although', 'the', 'budget', 'was', 'approved', 'the', 'project', 'stalled', 'for', 'another', 'six', 'months.'],
    wrongIndex: 4,
    fix: 'approved,',
    explain: 'A fronted subordinate clause is separated from the main clause by a comma.',
    category: 'punctuation'
  },
  {
    key: 'spot-15',
    tokens: ['The', 'committee', 'identified', 'three', 'priorities,', 'funding,', 'staffing', 'and', 'premises.'],
    wrongIndex: 4,
    fix: 'priorities:',
    explain: 'A colon, not a comma, introduces a list that spells out the preceding clause.',
    category: 'punctuation'
  },
  {
    key: 'spot-16',
    tokens: ['My', 'colleague,', 'who', 'lives', 'in', 'Bristol', 'commutes', 'to', 'London', 'three', 'days', 'a', 'week.'],
    wrongIndex: 5,
    fix: 'Bristol,',
    explain: 'A non-defining relative clause needs a comma at BOTH ends, not just the first.',
    category: 'punctuation'
  },
  {
    key: 'spot-17',
    tokens: ['The', 'proposals', 'put', 'forward', 'by', 'the', 'working', 'group,', 'were', 'rejected', 'without', 'discussion.'],
    wrongIndex: 7,
    fix: 'group',
    explain: 'Never separate a subject from its verb with a single comma.',
    category: 'punctuation'
  },
  {
    key: 'spot-18',
    tokens: ['She', 'asked', 'whether', 'the', 'deadline', 'for', 'submissions', 'had', 'been', 'extended?'],
    wrongIndex: 9,
    fix: 'extended.',
    explain: 'A reported (indirect) question ends with a full stop, not a question mark.',
    category: 'punctuation'
  },
  {
    key: 'spot-19',
    tokens: ['The', 'companys', 'profits', 'fell', 'sharply', 'in', 'the', 'final', 'quarter', 'of', 'last', 'year.'],
    wrongIndex: 1,
    fix: 'company\'s',
    explain: 'A singular possessive is written with an apostrophe before the s.',
    category: 'punctuation'
  },
  {
    key: 'spot-20',
    tokens: ['Interest', 'in', 'the', 'subject', 'grew', 'steadily', 'throughout', 'the', '1990\'s', 'and', 'the', 'following', 'decade.'],
    wrongIndex: 8,
    fix: '1990s',
    explain: 'Decades are plural, not possessive, so they take no apostrophe.',
    category: 'punctuation'
  },
  {
    key: 'spot-21',
    tokens: ['Employees', 'are', 'entitled', 'to', 'three', 'weeks', 'notice', 'under', 'the', 'revised', 'contract.'],
    wrongIndex: 5,
    fix: 'weeks\'',
    explain: 'Time expressions of this type are possessive: three weeks\' notice, a day\'s delay.',
    category: 'punctuation'
  },
  {
    key: 'spot-22',
    tokens: ['The', 'manager\'s', 'are', 'meeting', 'on', 'Thursday', 'to', 'review', 'the', 'quarterly', 'figures.'],
    wrongIndex: 1,
    fix: 'managers',
    explain: 'A plain plural takes no apostrophe; "manager\'s" would be a possessive.',
    category: 'punctuation'
  },
  {
    key: 'spot-23',
    tokens: ['The', 'award', 'went', 'to', 'the', 'youngest', 'member', 'of', 'the', 'team', 'Priya', 'Raman.'],
    wrongIndex: 9,
    fix: 'team,',
    explain: 'A name in apposition at the end of a sentence is introduced by a comma.',
    category: 'punctuation'
  },
  {
    key: 'spot-24',
    tokens: ['The', 'scheme', 'has', 'been', 'extended', 'for', 'a', 'further', 'two', 'years,', 'hasnt', 'it?'],
    wrongIndex: 10,
    fix: 'hasn\'t',
    explain: 'The apostrophe stands for the letter missing from "has not".',
    category: 'punctuation'
  },
  {
    key: 'spot-25',
    tokens: ['The', 'report,', 'which', 'was', 'commissioned', 'in', '2019,', 'has', 'still', 'not', 'been', 'published.'],
    wrongIndex: null,
    fix: null,
    explain: 'The non-defining clause is correctly enclosed in a pair of commas — nothing to change.',
    category: 'punctuation'
  },
  {
    key: 'spot-26',
    tokens: ['The', 'talks', 'collapsed,', 'both', 'sides', 'agreed', 'to', 'meet', 'again', 'in', 'the', 'autumn.'],
    wrongIndex: 2,
    fix: 'collapsed;',
    explain: 'Two independent clauses cannot be joined by a comma alone; use a semicolon.',
    category: 'boundaries'
  },
  {
    key: 'spot-27',
    tokens: ['The', 'evidence', 'was', 'thin,', 'however,', 'the', 'claim', 'was', 'repeated', 'in', 'every', 'newspaper.'],
    wrongIndex: 3,
    fix: 'thin;',
    explain: '"However" is a conjunctive adverb, not a conjunction, so the clause before it closes with a semicolon.',
    category: 'boundaries'
  },
  {
    key: 'spot-28',
    tokens: ['Funding', 'was', 'withdrawn', 'in', 'March,', 'therefore', 'the', 'trial', 'ended', 'six', 'months', 'early.'],
    wrongIndex: 4,
    fix: 'March;',
    explain: '"Therefore" cannot splice two clauses together after a comma; a semicolon is needed.',
    category: 'boundaries'
  },
  {
    key: 'spot-29',
    tokens: ['She', 'missed', 'the', 'deadline', 'she', 'had', 'badly', 'underestimated', 'the', 'amount', 'of', 'reading.'],
    wrongIndex: 3,
    fix: 'deadline;',
    explain: 'Two full clauses run together with no punctuation at all — a run-on sentence.',
    category: 'boundaries'
  },
  {
    key: 'spot-30',
    tokens: ['The', 'scheme', 'is', 'expensive', 'and', 'unpopular,', 'it', 'should', 'be', 'abandoned.'],
    wrongIndex: 5,
    fix: 'unpopular;',
    explain: 'Comma splice: the second clause stands on its own and needs a semicolon.',
    category: 'boundaries'
  },
  {
    key: 'spot-31',
    tokens: ['We', 'interviewed', 'forty', 'candidates;', 'most', 'of', 'them', 'recent', 'graduates', 'from', 'overseas', 'universities.'],
    wrongIndex: 3,
    fix: 'candidates,',
    explain: 'A semicolon must link two full clauses; what follows here is a phrase, so a comma is right.',
    category: 'boundaries'
  },
  {
    key: 'spot-32',
    tokens: ['Having', 'reviewed', 'all', 'the', 'evidence', 'submitted', 'by', 'both', 'parties,', 'the', 'committee', 'reaching', 'a', 'unanimous', 'decision.'],
    wrongIndex: 11,
    fix: 'reached',
    explain: 'As written the sentence has no main verb; the participle must become a finite verb.',
    category: 'boundaries'
  },
  {
    key: 'spot-33',
    tokens: ['The', 'trial', 'was', 'abandoned', 'in', 'June;', 'the', 'main', 'reason', 'being', 'that', 'the', 'funding', 'had', 'been', 'withdrawn.'],
    wrongIndex: 9,
    fix: 'was',
    explain: 'What follows a semicolon must be a complete clause, so the participle becomes a finite verb.',
    category: 'boundaries'
  },
  {
    key: 'spot-34',
    tokens: ['The', 'report', 'runs', 'to', 'three', 'hundred', 'pages,', 'few', 'members', 'of', 'the', 'committee', 'have', 'read', 'it.'],
    wrongIndex: 6,
    fix: 'pages;',
    explain: 'Comma splice — the two statements are independent clauses.',
    category: 'boundaries'
  },
  {
    key: 'spot-35',
    tokens: ['The', 'trial', 'was', 'halted', 'early;', 'the', 'evidence', 'was', 'already', 'overwhelming.'],
    wrongIndex: null,
    fix: null,
    explain: 'A semicolon correctly joins two closely related independent clauses — no error here.',
    category: 'boundaries'
  },
  {
    key: 'spot-36',
    tokens: ['The', 'new', 'reporting', 'rules', 'will', 'effect', 'every', 'department', 'in', 'the', 'organisation.'],
    wrongIndex: 5,
    fix: 'affect',
    explain: '"Affect" is the ordinary verb (to influence); "effect" is normally the noun.',
    category: 'confusables'
  },
  {
    key: 'spot-37',
    tokens: ['The', 'company', 'published', 'it\'s', 'annual', 'report', 'three', 'weeks', 'behind', 'schedule.'],
    wrongIndex: 3,
    fix: 'its',
    explain: '"Its" is the possessive; "it\'s" is only ever a contraction of "it is" or "it has".',
    category: 'confusables'
  },
  {
    key: 'spot-38',
    tokens: ['The', 'candidate', 'who\'s', 'references', 'were', 'strongest', 'withdrew', 'at', 'the', 'last', 'minute.'],
    wrongIndex: 2,
    fix: 'whose',
    explain: '"Whose" is the possessive relative; "who\'s" means "who is".',
    category: 'confusables'
  },
  {
    key: 'spot-39',
    tokens: ['There', 'were', 'far', 'less', 'applicants', 'for', 'the', 'post', 'this', 'year', 'than', 'last.'],
    wrongIndex: 3,
    fix: 'fewer',
    explain: '"Fewer" goes with countable plural nouns, "less" with uncountable ones.',
    category: 'confusables'
  },
  {
    key: 'spot-40',
    tokens: ['The', 'documents', 'laid', 'on', 'his', 'desk', 'for', 'a', 'fortnight', 'before', 'anyone', 'read', 'them.'],
    wrongIndex: 2,
    fix: 'lay',
    explain: 'Intransitive "lie" has the past form "lay"; "laid" is the past of transitive "lay".',
    category: 'confusables'
  },
  {
    key: 'spot-41',
    tokens: ['From', 'the', 'tone', 'of', 'her', 'reply', 'I', 'implied', 'that', 'the', 'offer', 'had', 'been', 'withdrawn.'],
    wrongIndex: 7,
    fix: 'inferred',
    explain: 'A speaker implies something; a listener infers it.',
    category: 'confusables'
  },
  {
    key: 'spot-42',
    tokens: ['The', 'sharp', 'acidity', 'of', 'the', 'wine', 'complimented', 'the', 'richness', 'of', 'the', 'sauce.'],
    wrongIndex: 6,
    fix: 'complemented',
    explain: '"Complement" means to complete or balance; "compliment" means to praise.',
    category: 'confusables'
  },
  {
    key: 'spot-43',
    tokens: ['The', 'principle', 'reason', 'for', 'the', 'delay', 'was', 'a', 'shortage', 'of', 'qualified', 'staff.'],
    wrongIndex: 1,
    fix: 'principal',
    explain: '"Principal" means main or chief; a "principle" is a rule or belief.',
    category: 'confusables'
  },
  {
    key: 'spot-44',
    tokens: ['The', 'syllabus', 'is', 'divided', 'into', 'six', 'discreet', 'modules', 'assessed', 'by', 'coursework.'],
    wrongIndex: 6,
    fix: 'discrete',
    explain: '"Discrete" means separate and distinct; "discreet" means tactful.',
    category: 'confusables'
  },
  {
    key: 'spot-45',
    tokens: ['The', 'revised', 'procedure', 'insures', 'that', 'every', 'applicant', 'is', 'interviewed', 'by', 'two', 'assessors.'],
    wrongIndex: 3,
    fix: 'ensures',
    explain: '"Ensure" means to make certain; "insure" belongs to insurance policies.',
    category: 'confusables'
  },
  {
    key: 'spot-46',
    tokens: ['Outsourcing', 'customer', 'support', 'has', 'become', 'standard', 'practise', 'across', 'the', 'industry.'],
    wrongIndex: 6,
    fix: 'practice',
    explain: 'In British English the noun is "practice"; "practise" is only the verb.',
    category: 'confusables'
  },
  {
    key: 'spot-47',
    tokens: ['She', 'thanked', 'him', 'warmly', 'but', 'ignored', 'almost', 'all', 'of', 'his', 'advise.'],
    wrongIndex: 10,
    fix: 'advice.',
    explain: '"Advice" is the noun; "advise" is the verb.',
    category: 'confusables'
  },
  {
    key: 'spot-48',
    tokens: ['For', 'twenty', 'minutes', 'the', 'packed', 'commuter', 'train', 'remained', 'completely', 'stationery.'],
    wrongIndex: 9,
    fix: 'stationary.',
    explain: '"Stationary" means not moving; "stationery" means paper and pens.',
    category: 'confusables'
  },
  {
    key: 'spot-49',
    tokens: ['Reports', 'from', 'the', 'region', 'suggested', 'that', 'the', 'collapse', 'of', 'the', 'ceasefire', 'was', 'eminent.'],
    wrongIndex: 12,
    fix: 'imminent.',
    explain: '"Imminent" means about to happen; "eminent" means distinguished.',
    category: 'confusables'
  },
  {
    key: 'spot-50',
    tokens: ['Despite', 'three', 'reminders,', 'the', 'survey', 'failed', 'to', 'illicit', 'a', 'single', 'useful', 'response.'],
    wrongIndex: 7,
    fix: 'elicit',
    explain: '"Elicit" means to draw out a response; "illicit" means unlawful.',
    category: 'confusables'
  },
  {
    key: 'spot-51',
    tokens: ['After', 'the', 'merger', 'the', 'firm', 'could', 'not', 'afford', 'to', 'loose', 'another', 'senior', 'partner.'],
    wrongIndex: 9,
    fix: 'lose',
    explain: '"Lose" is the verb; "loose" is the adjective meaning not tight.',
    category: 'confusables'
  },
  {
    key: 'spot-52',
    tokens: ['The', 'single', 'most', 'important', 'criteria', 'for', 'selection', 'is', 'relevant', 'professional', 'experience.'],
    wrongIndex: 4,
    fix: 'criterion',
    explain: '"Criterion" is the singular; "criteria" is its plural, so it cannot follow "the single".',
    category: 'confusables'
  },
  {
    key: 'spot-53',
    tokens: ['The', 'candidate', 'whom', 'the', 'panel', 'shortlisted', 'has', 'since', 'withdrawn', 'her', 'application.'],
    wrongIndex: null,
    fix: null,
    explain: '"Whom" is correct as the object of "shortlisted" — the sentence needs no change.',
    category: 'confusables'
  },
  {
    key: 'spot-54',
    tokens: ['Fewer', 'than', 'forty', 'delegates', 'registered,', 'so', 'the', 'smaller', 'room', 'was', 'booked.'],
    wrongIndex: null,
    fix: null,
    explain: '"Fewer" is correct with the countable noun "delegates" — no error.',
    category: 'confusables'
  },
  {
    key: 'spot-55',
    tokens: ['The', 'data', 'are', 'inconsistent,', 'though', 'the', 'overall', 'trend', 'remains', 'clear.'],
    wrongIndex: null,
    fix: null,
    explain: 'Treating "data" as a plural is standard in formal and academic writing — no error.',
    category: 'confusables'
  },
  {
    key: 'spot-56',
    tokens: ['The', 'programme', 'was', 'designed', 'for', 'kids', 'aged', 'between', 'six', 'and', 'eleven.'],
    wrongIndex: 5,
    fix: 'children',
    explain: '"Kids" is informal; a written report uses "children".',
    category: 'register'
  },
  {
    key: 'spot-57',
    tokens: ['The', 'committee', 'got', 'the', 'auditor\'s', 'report', 'only', 'two', 'days', 'before', 'the', 'meeting.'],
    wrongIndex: 2,
    fix: 'received',
    explain: '"Get" is conversational; formal prose prefers "receive".',
    category: 'register'
  },
  {
    key: 'spot-58',
    tokens: ['I', 'raised', 'the', 'matter', 'with', 'my', 'boss', 'and', 'she', 'referred', 'it', 'upwards.'],
    wrongIndex: 6,
    fix: 'supervisor',
    explain: '"Boss" is informal in a written complaint; "supervisor" is the neutral term.',
    category: 'register'
  },
  {
    key: 'spot-59',
    tokens: ['Participants', 'should', 'bring', 'their', 'own', 'protective', 'stuff', 'to', 'the', 'laboratory', 'session.'],
    wrongIndex: 6,
    fix: 'equipment',
    explain: '"Stuff" is vague and informal; written instructions name the thing precisely.',
    category: 'register'
  },
  {
    key: 'spot-60',
    tokens: ['The', 'reforms', 'produced', 'a', 'big', 'improvement', 'in', 'patient', 'outcomes', 'across', 'the', 'region.'],
    wrongIndex: 4,
    fix: 'substantial',
    explain: '"Big" is informal in academic prose, where "substantial" or "marked" is expected.',
    category: 'register'
  },
  {
    key: 'spot-61',
    tokens: ['Apologies', 'for', 'the', 'delay', 'in', 'replying;', 'the', 'last', 'fortnight', 'has', 'been', 'super', 'busy.'],
    wrongIndex: 11,
    fix: 'extremely',
    explain: '"Super" as an intensifier is colloquial and out of place in professional correspondence.',
    category: 'register'
  },
  {
    key: 'spot-62',
    tokens: ['The', 'authors', 'reckon', 'that', 'the', 'effect', 'has', 'been', 'overstated.'],
    wrongIndex: 2,
    fix: 'believe',
    explain: '"Reckon" is conversational; academic writing uses "believe" or "argue".',
    category: 'register'
  },
  {
    key: 'spot-63',
    tokens: ['The', 'minister', 'was', 'slammed', 'by', 'opposition', 'MPs', 'for', 'withholding', 'the', 'findings.'],
    wrongIndex: 3,
    fix: 'criticised',
    explain: '"Slammed" is tabloid usage; neutral reporting uses "criticised".',
    category: 'register'
  },
  {
    key: 'spot-64',
    tokens: ['The', 'findings', 'were', 'totally', 'unexpected', 'and', 'prompted', 'a', 'second', 'study.'],
    wrongIndex: 3,
    fix: 'entirely',
    explain: '"Totally" is an informal intensifier; "entirely" or "wholly" suits formal prose.',
    category: 'register'
  },
  {
    key: 'spot-65',
    tokens: ['Profits', 'at', 'the', 'bank', 'rose', 'massively', 'during', 'the', 'first', 'half', 'of', 'the', 'year.'],
    wrongIndex: 5,
    fix: 'sharply',
    explain: '"Massively" is colloquial; financial writing uses "sharply" or "steeply".',
    category: 'register'
  },
  {
    key: 'spot-66',
    tokens: ['We', 'would', 'be', 'grateful', 'if', 'you', 'could', 'send', 'the', 'invoice', 'ASAP.'],
    wrongIndex: 10,
    fix: 'promptly.',
    explain: 'Abbreviations such as ASAP belong to quick messages, not to a formal letter.',
    category: 'register'
  },
  {
    key: 'spot-67',
    tokens: ['The', 'proposal', 'was', 'rejected', 'because', 'the', 'costings', 'were', 'clearly', 'dodgy.'],
    wrongIndex: 9,
    fix: 'unsound.',
    explain: '"Dodgy" is British slang; a formal judgement uses "unsound" or "unreliable".',
    category: 'register'
  },
  {
    key: 'spot-68',
    tokens: ['We', 'regret', 'to', 'inform', 'you', 'that', 'your', 'application', 'has', 'been', 'unsuccessful', 'on', 'this', 'occasion.'],
    wrongIndex: null,
    fix: null,
    explain: 'This is standard formal correspondence and the register is consistent throughout — no error.',
    category: 'register'
  },
  {
    key: 'spot-69',
    tokens: ['The', 'conference', 'centre', 'can', 'accomodate', 'up', 'to', 'two', 'hundred', 'delegates.'],
    wrongIndex: 4,
    fix: 'accommodate',
    explain: '"Accommodate" is spelt with double c and double m.',
    category: 'spelling'
  },
  {
    key: 'spot-70',
    tokens: ['There', 'has', 'been', 'a', 'marked', 'rise', 'in', 'the', 'occurence', 'of', 'such', 'complaints.'],
    wrongIndex: 8,
    fix: 'occurrence',
    explain: '"Occurrence" doubles the r and ends in -ence.',
    category: 'spelling'
  },
  {
    key: 'spot-71',
    tokens: ['Her', 'supervisor', 'praised', 'her', 'perseverence', 'throughout', 'an', 'unusually', 'difficult', 'year.'],
    wrongIndex: 4,
    fix: 'perseverance',
    explain: '"Perseverance" ends in -ance, not -ence.',
    category: 'spelling'
  },
  {
    key: 'spot-72',
    tokens: ['The', 'post', 'requires', 'close', 'liason', 'with', 'suppliers', 'in', 'three', 'different', 'countries.'],
    wrongIndex: 4,
    fix: 'liaison',
    explain: '"Liaison" keeps the i after the a: li-ai-son.',
    category: 'spelling'
  },
  {
    key: 'spot-73',
    tokens: ['The', 'findings', 'will', 'be', 'worthless', 'unless', 'every', 'student', 'returns', 'the', 'questionaire.'],
    wrongIndex: 10,
    fix: 'questionnaire.',
    explain: '"Questionnaire" is spelt with a double n.',
    category: 'spelling'
  },
  {
    key: 'spot-74',
    tokens: ['Maintainance', 'costs', 'for', 'the', 'building', 'have', 'doubled', 'since', 'the', 'refurbishment.'],
    wrongIndex: 0,
    fix: 'Maintenance',
    explain: '"Maintenance" drops the i of "maintain": -ten-, not -tain-.',
    category: 'spelling'
  },
  {
    key: 'spot-75',
    tokens: ['It', 'has', 'been', 'a', 'priviledge', 'to', 'work', 'alongside', 'such', 'a', 'dedicated', 'team.'],
    wrongIndex: 4,
    fix: 'privilege',
    explain: '"Privilege" contains no d.',
    category: 'spelling'
  },
  {
    key: 'spot-76',
    tokens: ['After', 'two', 'hours', 'of', 'argument', 'the', 'committee', 'finally', 'reached', 'a', 'concensus.'],
    wrongIndex: 10,
    fix: 'consensus.',
    explain: '"Consensus" is spelt with s throughout: it relates to consent, not to a census.',
    category: 'spelling'
  },
  {
    key: 'spot-77',
    tokens: ['He', 'is', 'a', 'concientious', 'editor', 'who', 'never', 'misses', 'an', 'inconsistency.'],
    wrongIndex: 3,
    fix: 'conscientious',
    explain: '"Conscientious" keeps the sc of "conscience".',
    category: 'spelling'
  },
  {
    key: 'spot-78',
    tokens: ['Until', 'the', 'merger', 'of', '2019', 'the', 'two', 'departments', 'had', 'remained', 'seperate.'],
    wrongIndex: 10,
    fix: 'separate.',
    explain: '"Separate" has an a in the middle: se-par-ate.',
    category: 'spelling'
  },
  {
    key: 'spot-79',
    tokens: ['The', 'new', 'guidance', 'will', 'supercede', 'the', 'code', 'of', 'practice', 'issued', 'in', '2018.'],
    wrongIndex: 4,
    fix: 'supersede',
    explain: '"Supersede" is the only English verb ending in -sede.',
    category: 'spelling'
  },
  {
    key: 'spot-80',
    tokens: ['The', 'findings', 'of', 'the', 'inquiry', 'were', 'published', 'publically', 'only', 'last', 'month.'],
    wrongIndex: 7,
    fix: 'publicly',
    explain: 'Most -ic adjectives add -ally, but "public" is the exception: "publicly".',
    category: 'spelling'
  },
  {
    key: 'spot-81',
    tokens: ['The', 'scheme', 'offers', 'grants', 'to', 'young', 'entrepeneurs', 'in', 'the', 'creative', 'industries.'],
    wrongIndex: 6,
    fix: 'entrepreneurs',
    explain: '"Entrepreneur" keeps the r of the French entre-pre-neur.',
    category: 'spelling'
  },
  {
    key: 'spot-82',
    tokens: ['The', 'tribunal', 'criticised', 'the', 'trust\'s', 'behavior', 'towards', 'its', 'junior', 'staff.'],
    wrongIndex: 5,
    fix: 'behaviour',
    explain: 'British spelling keeps the u: behaviour, colour, favour.',
    category: 'spelling'
  },
  {
    key: 'spot-83',
    tokens: ['Their', 'travelling', 'expenses', 'were', 'reimbursed', 'in', 'full', 'by', 'the', 'organisers.'],
    wrongIndex: null,
    fix: null,
    explain: 'British spelling doubles the l in "travelling" and takes -ise in "organisers" — correct as written.',
    category: 'spelling'
  },
  {
    key: 'spot-84',
    tokens: ['The', 'committee', 'recommended', 'that', 'the', 'licence', 'be', 'withdrawn', 'immediately.'],
    wrongIndex: null,
    fix: null,
    explain: 'In British English the noun is "licence", and the subjunctive "be" is right after "recommended" — no error.',
    category: 'spelling'
  }
]
