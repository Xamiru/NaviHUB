import type { EnMechanicsItem } from './types'
import { EN_MECHANICS_SET2 } from './mechanicsSet2'

// Mechanics drill bank for the English test section: articles, punctuation,
// sentence boundaries, confusables, register and spelling, pitched at C1/C2.
// Item keys are FROZEN ('<category>-<nn>'); prompts and options may be edited.

const SET1: EnMechanicsItem[] = [
  // ---- articles ----
  {
    key: 'articles-01',
    category: 'articles',
    prompt: 'Complete the sentence: "She holds ___ MSc in molecular biology."',
    options: ['an', 'a', 'the', 'no article'],
    correct: 0,
    explain:
      'The choice between a and an follows the sound that comes next, not the letter: MSc is read em-ess-see, which opens with a vowel sound.'
  },
  {
    key: 'articles-02',
    category: 'articles',
    prompt: 'Complete the sentence: "He read law at ___ university in the north of England."',
    options: ['an', 'a', 'the', 'no article'],
    correct: 1,
    explain:
      'University opens with a consonant sound, the y-glide of "you", so it takes a; the written vowel is irrelevant.'
  },
  {
    key: 'articles-03',
    category: 'articles',
    prompt: 'Complete the sentence: "Chairing the inquiry was ___ honour she had not expected."',
    options: ['a', 'the', 'an', 'no article'],
    correct: 2,
    explain:
      'The h of honour is silent, so the word begins with a vowel sound and takes an, as do hour, heir and honest.'
  },
  {
    key: 'articles-04',
    category: 'articles',
    prompt:
      'Complete the sentence: "The grant was ___ one-off payment, not an annual commitment."',
    options: ['an', 'the', 'no article', 'a'],
    correct: 3,
    explain:
      'One is pronounced as though it began with w, so it takes a; compare a European partner and a united front.'
  },
  {
    key: 'articles-05',
    category: 'articles',
    prompt: 'Which sentence is correct?',
    options: [
      'The patience is a virtue that few negotiators possess.',
      'A patience is a virtue that few negotiators possess.',
      'Patience is virtue that few negotiators possess.',
      'Patience is a virtue that few negotiators possess.'
    ],
    correct: 3,
    explain:
      'An abstract noun used in a general sense takes no article, but the singular countable noun virtue still needs one.'
  },
  {
    key: 'articles-06',
    category: 'articles',
    prompt:
      'Complete the sentence: "Historians still debate ___ collapse of the Bronze Age trading system."',
    options: ['a', 'the', 'no article', 'an'],
    correct: 1,
    explain:
      'An abstract noun takes no article when general ("collapse is common in ancient trade networks"), but an of-phrase makes it specific ("the collapse of the Bronze Age trading system") and the definite article becomes obligatory.'
  },
  {
    key: 'articles-07',
    category: 'articles',
    prompt: 'Complete the sentence: "After his conviction he spent four years in ___ prison."',
    options: ['the', 'a', 'no article', 'some'],
    correct: 2,
    explain:
      'Institutions such as prison, school, hospital and church take no article when the reference is to their function; the prison would name a building.'
  },
  {
    key: 'articles-08',
    category: 'articles',
    prompt: 'Which sentence refers to the building rather than to being a patient?',
    options: [
      'She was in hospital for three weeks.',
      'She went to hospital on Tuesday morning.',
      'She was taken into hospital overnight.',
      'She spent the morning at the hospital, rewiring the theatre lights.'
    ],
    correct: 3,
    explain:
      'With the article, hospital names the physical place; without it, the phrase means undergoing treatment. British usage keeps the contrast throughout.'
  },
  {
    key: 'articles-09',
    category: 'articles',
    prompt:
      'Which sentence follows the standard rule for a superlative that compares one thing with itself?',
    options: [
      'The lake is the deepest at its northern end.',
      'The lake is deepest at its northern end.',
      'The lake is a deepest at its northern end.',
      'Lake is deepest at its northern end.'
    ],
    correct: 1,
    explain:
      'When a superlative compares one thing with itself under different conditions rather than with other things, the article is normally dropped.'
  },
  {
    key: 'articles-10',
    category: 'articles',
    prompt: 'Complete the sentence: "Before agreeing to surgery she sought ___ second opinion."',
    options: ['a', 'the', 'an', 'no article'],
    correct: 0,
    explain:
      'A second means one more or another; the second would identify a particular item in a sequence already known to the reader.'
  },
  {
    key: 'articles-11',
    category: 'articles',
    prompt: 'Which sentence is correct?',
    options: [
      'This is third time the committee has deferred the decision.',
      'This is a third time the committee has deferred the decision.',
      'This is the third time the committee has deferred the decision.',
      'This is third time that the committee defers the decision.'
    ],
    correct: 2,
    explain:
      'An ordinal identifying a position in a defined sequence takes the definite article.'
  },
  {
    key: 'articles-12',
    category: 'articles',
    prompt: 'Which sentence makes a general statement about the species?',
    options: [
      'The tigers are solitary hunters.',
      'A tigers are solitary hunters.',
      'The tiger are solitary hunters.',
      'Tigers are solitary hunters.'
    ],
    correct: 3,
    explain:
      'A bare plural states a generic truth, while the plus a plural points to particular animals already known. The generic singular, the tiger is a solitary hunter, is also possible.'
  },
  {
    key: 'articles-13',
    category: 'articles',
    prompt:
      'Complete the sentence: "___ Dutch have been investing in flood defences for four centuries."',
    options: ['A', 'The', 'No article', 'Some'],
    correct: 1,
    explain:
      'The plus a nationality adjective denotes the people as a whole; without the article the word can only be an adjective or the language.'
  },
  {
    key: 'articles-14',
    category: 'articles',
    prompt: 'Which sentence is correct?',
    options: [
      'She has worked in the Norway and the Netherlands.',
      'She has worked in the Norway and Netherlands.',
      'She has worked in Norway and the Netherlands.',
      'She has worked in Norway and Netherlands.'
    ],
    correct: 2,
    explain:
      'Most country names take no article, but plural and compound names do: the Netherlands, the Philippines, the United Kingdom.'
  },
  {
    key: 'articles-15',
    category: 'articles',
    prompt: 'Complete the sentence: "The expedition followed ___ Danube as far as Budapest."',
    options: ['no article', 'a', 'an', 'the'],
    correct: 3,
    explain:
      'Rivers, seas, oceans and canals take the definite article; individual lakes do not (Lake Geneva, Lake Biwa).'
  },
  {
    key: 'articles-16',
    category: 'articles',
    prompt: 'Which sentence is correct?',
    options: [
      'They crossed the Pyrenees before climbing the Mont Blanc.',
      'They crossed Pyrenees before climbing Mont Blanc.',
      'They crossed the Pyrenees before climbing Mont Blanc.',
      'They crossed Pyrenees before climbing the Mont Blanc.'
    ],
    correct: 2,
    explain:
      'Mountain ranges take the (the Alps, the Andes); single peaks do not (Everest, Mont Blanc, Kilimanjaro).'
  },
  {
    key: 'articles-17',
    category: 'articles',
    prompt: 'Complete the sentence: "The whole question was settled over ___ dinner at the embassy."',
    options: ['a', 'no article', 'the', 'some'],
    correct: 1,
    explain:
      'Names of meals take no article when they refer to the occasion in general; an article appears only when the meal is specified, as in a dinner given in her honour.'
  },
  {
    key: 'articles-18',
    category: 'articles',
    prompt:
      'Complete the sentence: "In her capacity as ___ chair of the committee, she declined to vote."',
    options: ['a', 'an', 'no article', 'the'],
    correct: 2,
    explain:
      'A unique office after as, or after verbs such as appoint and elect, normally takes no article: elected president, appointed treasurer.'
  },
  {
    key: 'articles-19',
    category: 'articles',
    prompt:
      'Complete the sentence: "The report identifies ___ flaw in the methodology; ___ flaw is not, however, fatal to its conclusions."',
    options: ['a / the', 'the / a', 'a / a', 'the / the'],
    correct: 0,
    explain:
      'The indefinite article introduces something new to the reader; the definite article marks it as already identified on the second mention.'
  },
  {
    key: 'articles-20',
    category: 'articles',
    prompt: 'Which sentence is correct?',
    options: [
      'She learned the violin at seven and now plays the football on Sundays.',
      'She learned violin at seven and now plays football on Sundays.',
      'She learned a violin at seven and now plays the football on Sundays.',
      'She learned the violin at seven and now plays football on Sundays.'
    ],
    correct: 3,
    explain:
      'Musical instruments take the after verbs such as play and learn; sports and games take no article.'
  },
  {
    key: 'articles-21',
    category: 'articles',
    prompt: 'Complete the sentence: "Rents in the district rose steadily throughout ___ 1990s."',
    options: ['the', 'no article', 'a', 'an'],
    correct: 0,
    explain:
      'Decades and centuries are treated as unique periods and take the definite article: the 1990s, the nineteenth century.'
  },
  {
    key: 'articles-22',
    category: 'articles',
    prompt: 'Which sentence is correct?',
    options: [
      'Most of students failed the module.',
      'Most the students failed the module.',
      'The most students failed the module.',
      'Most of the students failed the module.'
    ],
    correct: 3,
    explain:
      'Most plus a bare plural is general (most students dislike exams); most of requires a determiner such as the, my or these.'
  },
  {
    key: 'articles-23',
    category: 'articles',
    prompt:
      'Complete the sentence: "This kind of ___ argument rarely persuades a sceptical audience."',
    options: ['an', 'a', 'the', 'no article'],
    correct: 3,
    explain:
      'After kind of, sort of and type of, a singular countable noun normally takes no article in careful written English.'
  },
  {
    key: 'articles-24',
    category: 'articles',
    prompt: 'Which sentence is correct as a general statement?',
    options: [
      'Advances in artificial intelligence have outpaced regulation.',
      'Advances in the artificial intelligence have outpaced the regulation.',
      'Advances in an artificial intelligence have outpaced a regulation.',
      'Advances in artificial intelligence have outpaced the regulation.'
    ],
    correct: 0,
    explain:
      'Fields of study and uncountable abstractions take no article when the reference is general; the would point to one particular body of regulation.'
  },

  // ---- punctuation ----
  {
    key: 'punctuation-01',
    category: 'punctuation',
    prompt: 'Which sentence correctly punctuates a non-defining relative clause?',
    options: [
      'The report which was published in March, has been withdrawn.',
      'The report, which was published in March has been withdrawn.',
      'The report which was published in March has been withdrawn.',
      'The report, which was published in March, has been withdrawn.'
    ],
    correct: 3,
    explain:
      'A non-defining clause adds information about an already identified noun and must be enclosed by a pair of commas. The version with no commas is a defining clause and means something different; a clause fenced on one side only is always wrong.'
  },
  {
    key: 'punctuation-02',
    category: 'punctuation',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      'Any candidate who fails the written test will be re-examined in September.',
      'Any candidate, who fails the written test, will be re-examined in September.',
      'Any candidate who fails the written test, will be re-examined in September.',
      'Any candidate, who fails the written test will be re-examined in September.'
    ],
    correct: 0,
    explain:
      'The clause identifies which candidates are meant, so it is defining and takes no commas; commas would imply that every candidate had failed.'
  },
  {
    key: 'punctuation-03',
    category: 'punctuation',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      'The trial was inconclusive, however a second study is planned.',
      'The trial was inconclusive, a second study is planned.',
      'The trial was inconclusive; however, a second study is planned.',
      'The trial was inconclusive however; a second study is planned.'
    ],
    correct: 2,
    explain:
      'However is a conjunctive adverb, not a conjunction, so it cannot join two independent clauses with a comma: put a semicolon before it and a comma after it.'
  },
  {
    key: 'punctuation-04',
    category: 'punctuation',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      'Delegates came from Lima, Peru, Quito, Ecuador, and La Paz, Bolivia.',
      'Delegates came from Lima, Peru; Quito, Ecuador; and La Paz, Bolivia.',
      'Delegates came from Lima; Peru, Quito; Ecuador, and La Paz; Bolivia.',
      'Delegates came from Lima Peru, Quito Ecuador and La Paz Bolivia.'
    ],
    correct: 1,
    explain:
      'When the items of a list already contain commas, semicolons separate the items so that the reader can see where each one ends.'
  },
  {
    key: 'punctuation-05',
    category: 'punctuation',
    prompt: 'Which sentence uses the colon correctly?',
    options: [
      'The committee needs: a chair, a budget and a deadline.',
      'The committee reached one conclusion: the data were unreliable.',
      'The committee reached one conclusion, the data were unreliable.',
      'The committee: reached one conclusion, the data were unreliable.'
    ],
    correct: 1,
    explain:
      'A colon follows a complete independent clause and then delivers what that clause promises; it should never be dropped between a verb and its objects.'
  },
  {
    key: 'punctuation-06',
    category: 'punctuation',
    prompt:
      'Which mark best fits here: "The delay had a single cause ___ the supplier had not been paid."',
    options: ['a comma', 'a semicolon', 'no mark at all', 'a colon'],
    correct: 3,
    explain:
      'A colon is right when the second clause supplies what the first announces; a semicolon would merely link two equal statements and lose the sense of explanation.'
  },
  {
    key: 'punctuation-07',
    category: 'punctuation',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      'The scheme protects all the employees\' pensions.',
      'The scheme protects all the employee\'s pensions.',
      'The scheme protects all the employees pensions.',
      'The scheme protects all the employees\'s pensions.'
    ],
    correct: 0,
    explain:
      'For a regular plural already ending in s, the possessive adds an apostrophe only, after the plural s.'
  },
  {
    key: 'punctuation-08',
    category: 'punctuation',
    prompt: 'How should you write "the house belonging to the Jones family"?',
    options: [
      'the Jones\' house',
      'the Joneses\' house',
      'the Jones\'s house',
      'the Joneses\'s house'
    ],
    correct: 1,
    explain:
      'Form the plural first (Jones becomes Joneses), then add the apostrophe after its final s.'
  },
  {
    key: 'punctuation-09',
    category: 'punctuation',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      'The CD\'s of the 1990\'s are back in the charts.',
      'The CDs of the 1990\'s are back in the charts.',
      'The CD\'s of the 1990s are back in the charts.',
      'The CDs of the 1990s are back in the charts.'
    ],
    correct: 3,
    explain:
      'An apostrophe marks possession or omission, never a plain plural, and that includes abbreviations and decades.'
  },
  {
    key: 'punctuation-10',
    category: 'punctuation',
    prompt: 'Which sentence hyphenates the compound modifier correctly?',
    options: [
      'It is a well-documented pattern, and the pattern is well documented in the literature.',
      'It is a well documented pattern, and the pattern is well-documented in the literature.',
      'It is a well-documented pattern, and the pattern is well-documented in the literature.',
      'It is a well documented pattern, and the pattern is well documented in the literature.'
    ],
    correct: 0,
    explain:
      'A compound modifier is hyphenated before the noun it modifies and left open after the verb, where no misreading is possible.'
  },
  {
    key: 'punctuation-11',
    category: 'punctuation',
    prompt: 'Which phrasing is hyphenated correctly?',
    options: [
      'a highly-regarded scholar and a twenty-year-old policy',
      'a highly regarded scholar and a twenty year old policy',
      'a highly regarded scholar and a twenty-year-old policy',
      'a highly-regarded scholar and a twenty year old policy'
    ],
    correct: 2,
    explain:
      'An adverb ending in -ly is never hyphenated to the adjective that follows it, since no ambiguity is possible; a numerical compound modifier before a noun does take hyphens.'
  },
  {
    key: 'punctuation-12',
    category: 'punctuation',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      'Although the evidence was thin the committee proceeded to a vote.',
      'Although, the evidence was thin, the committee proceeded to a vote.',
      'Although the evidence was thin, the committee proceeded to a vote.',
      'The committee proceeded to a vote, although, the evidence was thin.'
    ],
    correct: 2,
    explain:
      'A subordinate clause placed before the main clause is followed by a comma; the comma is normally dropped when that clause comes second.'
  },

  // ---- boundaries ----
  {
    key: 'boundaries-01',
    category: 'boundaries',
    prompt: 'Which version is correctly written?',
    options: [
      'The results were promising the sample however was small.',
      'The results were promising, the sample was small.',
      'Although the results were promising and the sample small.',
      'The results were promising; the sample, however, was small.'
    ],
    correct: 3,
    explain:
      'Two independent clauses need a semicolon, a full stop, or a comma plus a coordinating conjunction. A comma alone splices them, no mark at all fuses them, and a subordinated clause left by itself is a fragment.'
  },
  {
    key: 'boundaries-02',
    category: 'boundaries',
    prompt:
      'The sentence "The deadline was extended, the team still missed it" is a comma splice. Which revision repairs it?',
    options: [
      'The deadline was extended the team still missed it.',
      'The deadline was extended, however the team still missed it.',
      'Although the deadline was extended, the team still missed it.',
      'The deadline was extended, the team, still missed it.'
    ],
    correct: 2,
    explain:
      'Subordinating one of the clauses removes the splice. Adding however leaves two independent clauses joined by a comma, which is the same fault as before.'
  },
  {
    key: 'boundaries-03',
    category: 'boundaries',
    prompt: 'Which version is correct?',
    options: [
      'Sales fell in the first quarter, they recovered by September.',
      'Sales fell in the first quarter but, they recovered by September.',
      'Sales fell in the first quarter. Recovering by September.',
      'Sales fell in the first quarter, but they recovered by September.'
    ],
    correct: 3,
    explain:
      'A comma is correct before a coordinating conjunction that joins two independent clauses, and it goes before the conjunction rather than after it.'
  },
  {
    key: 'boundaries-04',
    category: 'boundaries',
    prompt: 'Which of these is a complete sentence?',
    options: [
      'Which is why the committee postponed the vote until the following term.',
      'Having reviewed the submissions in detail and consulted two external referees.',
      'The committee postponed the vote.',
      'Because the submissions arrived after the published deadline.'
    ],
    correct: 2,
    explain:
      'A sentence needs a subject and a finite verb in a main clause; relative, participial and subordinate clauses cannot stand alone, however long they are.'
  },
  {
    key: 'boundaries-05',
    category: 'boundaries',
    prompt: 'Which version is correct?',
    options: [
      'The archive is open to researchers. It closes for two weeks in August.',
      'The archive is open to researchers it closes for two weeks in August.',
      'The archive is open to researchers, it closes for two weeks in August.',
      'The archive is open to researchers, closing for two weeks in August it is not accessible.'
    ],
    correct: 0,
    explain:
      'Two complete statements with no linking word must be separated by a full stop or a semicolon: running them together fuses them, and a comma between them is a splice.'
  },
  {
    key: 'boundaries-06',
    category: 'boundaries',
    prompt: 'Which sentence is punctuated correctly?',
    options: [
      'The funding was withdrawn, therefore the project closed.',
      'The funding was withdrawn therefore, the project closed.',
      'The funding was withdrawn, therefore, the project closed.',
      'The funding was withdrawn; therefore, the project closed.'
    ],
    correct: 3,
    explain:
      'Therefore is an adverb and cannot join clauses on its own: use a semicolon or a full stop before it and a comma after it.'
  },
  {
    key: 'boundaries-07',
    category: 'boundaries',
    prompt:
      'Which revision turns the fragment "A decision that nobody on the panel was willing to defend in public" into a sentence?',
    options: [
      'A decision that nobody on the panel was willing to defend in public, and which was unpopular.',
      'It was a decision that nobody on the panel was willing to defend in public.',
      'A decision that nobody on the panel, willing to defend it in public.',
      'Although a decision that nobody on the panel was willing to defend in public.'
    ],
    correct: 1,
    explain:
      'The original is a noun phrase with a relative clause attached to it; supplying a subject and a main verb makes it a sentence. Adding more subordination only lengthens the fragment.'
  },
  {
    key: 'boundaries-08',
    category: 'boundaries',
    prompt: 'Which version is correct?',
    options: [
      'Prices rose sharply in March; in April they fell back again.',
      'Prices rose sharply in March, in April they fell back again.',
      'Prices rose sharply in March in April they fell back again.',
      'Prices rising sharply in March, and falling back again in April.'
    ],
    correct: 0,
    explain:
      'A semicolon links two closely related independent clauses without a conjunction. A comma alone splices them, no mark fuses them, and a pair of participles produces a fragment.'
  },
  {
    key: 'boundaries-09',
    category: 'boundaries',
    prompt: 'Which of these contains a sentence fragment?',
    options: [
      'The minutes were circulated late. Nobody objected.',
      'The minutes were circulated late, but nobody objected.',
      'The minutes were circulated late. Although nobody objected at the time.',
      'The minutes were circulated late; nobody objected.'
    ],
    correct: 2,
    explain:
      'A clause beginning with although is subordinate and cannot stand as a sentence: it has to be attached to the main clause it qualifies.'
  },
  {
    key: 'boundaries-10',
    category: 'boundaries',
    prompt:
      'Which version joins the two ideas correctly: the interview lasted an hour, and very little was learned?',
    options: [
      'Although the interview lasted an hour, very little was learned.',
      'The interview lasted an hour, very little was learned.',
      'The interview lasted an hour, very little was learned from it, the panel adjourned.',
      'The interview lasted an hour. Very little learned.'
    ],
    correct: 0,
    explain:
      'A subordinating conjunction plus a comma joins the clauses and marks the concessive relation between them. The others splice, ramble on, or omit the verb altogether.'
  },
  {
    key: 'boundaries-11',
    category: 'boundaries',
    prompt:
      'The sentence "The scheme was popular, it was also expensive" is a comma splice. Which is the best correction?',
    options: [
      'The scheme was popular it was also expensive.',
      'The scheme was popular, but it was also expensive.',
      'The scheme was popular, also it was expensive.',
      'The scheme was popular, expensive too.'
    ],
    correct: 1,
    explain:
      'A comma is legitimate before a coordinating conjunction such as and, but, or or so; inserting an adverb such as also leaves the splice exactly where it was.'
  },
  {
    key: 'boundaries-12',
    category: 'boundaries',
    prompt: 'Which version is correct?',
    options: [
      'The proposal was rejected. Which surprised nobody who had read it.',
      'The proposal was rejected, which surprised nobody who had read it.',
      'The proposal was rejected which, surprised nobody who had read it.',
      'The proposal was rejected, this surprised nobody who had read it.'
    ],
    correct: 1,
    explain:
      'A which-clause commenting on a whole clause stays attached to it after a comma; beginning a new sentence with which leaves a fragment, and this produces a comma splice.'
  },

  // ---- confusables ----
  {
    key: 'confusables-01',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The new chair hopes to ___ a lasting change in the culture of the department."',
    options: ['affect', 'affected', 'effects', 'effect'],
    correct: 3,
    explain:
      'Affect is normally the verb meaning to influence and effect the noun meaning a result; used as a verb, effect means to bring about, which is the sense needed here.'
  },
  {
    key: 'confusables-02',
    category: 'confusables',
    prompt: 'Complete the sentence: "From her silence the committee ___ that she disagreed."',
    options: ['implied', 'inferred', 'imputed', 'insinuated'],
    correct: 1,
    explain:
      'A speaker implies, putting a meaning in; a listener infers, drawing a meaning out. The committee is the audience here.'
  },
  {
    key: 'confusables-03',
    category: 'confusables',
    prompt: 'Which sentence uses the word correctly?',
    options: [
      'The sommelier chose a white wine to compliment the fish.',
      'She paid him the complement of reading his draft twice.',
      'The sommelier chose a white wine to complement the fish.',
      'The report was full of complementary remarks about the outgoing chair.'
    ],
    correct: 2,
    explain:
      'Complement means to complete or go well with; compliment means praise. The last sentence needs complimentary, meaning full of praise.'
  },
  {
    key: 'confusables-04',
    category: 'confusables',
    prompt: 'Complete the sentence: "The manual divides the procedure into five ___ stages."',
    options: ['discrete', 'discreet', 'discretionary', 'indiscreet'],
    correct: 0,
    explain:
      'Discrete means separate and distinct; discreet means tactful or unobtrusive.'
  },
  {
    key: 'confusables-05',
    category: 'confusables',
    prompt: 'Complete the sentence: "The questionnaire failed to ___ a single usable response."',
    options: ['illicit', 'elicit', 'elicited', 'illicitly'],
    correct: 1,
    explain:
      'Elicit is a verb meaning to draw out a response; illicit is an adjective meaning unlawful.'
  },
  {
    key: 'confusables-06',
    category: 'confusables',
    prompt: 'Which sentence is correct?',
    options: [
      'He lay the documents on the table and left.',
      'The papers had laid on the desk for weeks.',
      'He laid the documents on the table and left.',
      'She had lain the child down for a nap.'
    ],
    correct: 2,
    explain:
      'Lay is transitive and takes an object (lay, laid, laid); lie is intransitive (lie, lay, lain). Papers lie on a desk, and a child is laid down.'
  },
  {
    key: 'confusables-07',
    category: 'confusables',
    prompt: 'Complete the sentence: "There were ___ objections this year than last."',
    options: ['less', 'lesser', 'fewer', 'fewer of'],
    correct: 2,
    explain:
      'Fewer goes with countable plurals and less with uncountables, though measurements of time, money and distance take less even in the plural: less than five miles.'
  },
  {
    key: 'confusables-08',
    category: 'confusables',
    prompt: 'Complete the sentence: "She is the candidate ___ we believe is best qualified."',
    options: ['whom', 'whomever', 'whose', 'who'],
    correct: 3,
    explain:
      'We believe is parenthetical, so the pronoun is the subject of is best qualified and must be who. Whom would be right only if the pronoun were an object: the candidate whom we chose.'
  },
  {
    key: 'confusables-09',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The scheme proved more expensive ___ anyone had anticipated, and it was ___ quietly abandoned."',
    options: ['than / then', 'then / than', 'than / than', 'then / then'],
    correct: 0,
    explain: 'Than makes comparisons; then refers to time or sequence.'
  },
  {
    key: 'confusables-10',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The organisation has lost ___ way, and ___ not obvious how it will recover."',
    options: ['its / its', 'it\'s / it\'s', 'its / it\'s', 'it\'s / its'],
    correct: 2,
    explain:
      'Its is the possessive determiner, and it\'s is only ever a contraction of it is or it has.'
  },
  {
    key: 'confusables-11',
    category: 'confusables',
    prompt: 'Complete the sentence: "The proposal is far ___ vague ___ be costed."',
    options: ['too / to', 'to / too', 'too / too', 'to / to'],
    correct: 0,
    explain:
      'Too means excessively; to is the preposition, or the infinitive marker in front of a verb.'
  },
  {
    key: 'confusables-12',
    category: 'confusables',
    prompt:
      'Complete the sentence: "She resigned on a matter of ___, not because of any quarrel with the ___ of the college."',
    options: [
      'principle / principal',
      'principal / principle',
      'principle / principle',
      'principal / principal'
    ],
    correct: 0,
    explain:
      'Principle is a noun meaning a rule or belief; principal means chief, or the head of an institution.'
  },
  {
    key: 'confusables-13',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The clerk was asked to ___ that every delegate received a copy of the agenda."',
    options: ['assure', 'insure', 'ensure', 'reassure'],
    correct: 2,
    explain:
      'Ensure means to make certain that something happens; assure means to tell someone something confidently, and insure means to arrange financial cover.'
  },
  {
    key: 'confusables-14',
    category: 'confusables',
    prompt:
      'Complete the sentence: "He is not ___ to publicity, despite the ___ coverage of last year."',
    options: [
      'adverse / averse',
      'averse / averse',
      'adverse / adverse',
      'averse / adverse'
    ],
    correct: 3,
    explain:
      'Averse describes a person who dislikes something (averse to publicity); adverse describes unfavourable conditions or effects.'
  },
  {
    key: 'confusables-15',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The speech contained an ___ to Thucydides that most of the audience missed."',
    options: ['illusion', 'delusion', 'allusion', 'elusion'],
    correct: 2,
    explain: 'An allusion is an indirect reference; an illusion is a false impression.'
  },
  {
    key: 'confusables-16',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The ___ interruptions made work impossible, although the machine itself had been running ___ for six days."',
    options: [
      'continuous / continually',
      'continual / continually',
      'continuous / continuously',
      'continual / continuously'
    ],
    correct: 3,
    explain:
      'Continual means repeated with breaks in between; continuous means unbroken. The interruptions recur, while the machine never stops.'
  },
  {
    key: 'confusables-17',
    category: 'confusables',
    prompt:
      'Complete the sentence: "An arbitrator must be ___: she has no stake whatever in the outcome."',
    options: ['disinterested', 'uninterested', 'disinteresting', 'uninteresting'],
    correct: 0,
    explain:
      'Disinterested means impartial, with nothing to gain; uninterested means bored or indifferent.'
  },
  {
    key: 'confusables-18',
    category: 'confusables',
    prompt:
      'Complete the sentence: "The vote was a ___ moment, though the ___ record suggests earlier parliaments did much the same."',
    options: [
      'historical / historic',
      'historic / historical',
      'historic / historic',
      'historical / historical'
    ],
    correct: 1,
    explain:
      'Historic means momentous, important in history; historical means relating to the past or to its study.'
  },
  {
    key: 'confusables-19',
    category: 'confusables',
    prompt:
      'Complete the sentence: "She was ___ to admit it, but she did not ___ the work itself."',
    options: ['loathe / loath', 'loathe / loathe', 'loath / loathe', 'loath / loath'],
    correct: 2,
    explain:
      'Loath is an adjective meaning reluctant (loath to admit); loathe is a verb meaning to detest.'
  },
  {
    key: 'confusables-20',
    category: 'confusables',
    prompt:
      'Complete the sentence: "A short preamble ___ the main clause, after which the parties may ___ to arbitration."',
    options: [
      'proceeds / precede',
      'precedes / proceed',
      'precedes / precede',
      'proceeds / proceed'
    ],
    correct: 1,
    explain: 'Precede means to come before; proceed means to go forward or carry on.'
  },
  {
    key: 'confusables-21',
    category: 'confusables',
    prompt: 'Complete the sentence: "The van remained ___ while the ___ was unloaded."',
    options: [
      'stationery / stationary',
      'stationary / stationary',
      'stationery / stationery',
      'stationary / stationery'
    ],
    correct: 3,
    explain:
      'Stationary with an a means motionless; stationery with an e means envelopes, paper and pens.'
  },
  {
    key: 'confusables-22',
    category: 'confusables',
    prompt:
      'Complete the sentence: "Only one ___ remains to be agreed; the other ___ were settled last week."',
    options: [
      'criteria / criterion',
      'criterion / criteria',
      'criterion / criterions',
      'criteria / criterias'
    ],
    correct: 1,
    explain:
      'Criterion is the singular and criteria the plural, on the Greek pattern that also gives phenomenon and phenomena.'
  },
  {
    key: 'confusables-23',
    category: 'confusables',
    prompt:
      'Complete the sentence: "Two of the bolts had worked ___, and the crew feared they would ___ the mast."',
    options: ['loose / lose', 'lose / loose', 'loose / loose', 'lose / lose'],
    correct: 0,
    explain:
      'Loose rhymes with goose and means not tight; lose rhymes with news and means to mislay or to be defeated.'
  },
  {
    key: 'confusables-24',
    category: 'confusables',
    prompt:
      'Complete the sentence: "___, the archive receives requests of the most ___ kind."',
    options: [
      'Everyday / every day',
      'Every day / everyday',
      'Everyday / everyday',
      'Every day / every day'
    ],
    correct: 1,
    explain:
      'Every day is an adverbial phrase meaning daily; everyday is an adjective meaning ordinary and stands in front of a noun.'
  },

  // ---- register ----
  {
    key: 'register-01',
    category: 'register',
    prompt: 'Which version is most appropriate in a formal report to the board?',
    options: [
      'We found out that the delays were down to a supplier issue.',
      'Turns out the supplier messed up, which is why everything was late.',
      'We ascertained the aforesaid delays to have been consequent upon supplier-side matters.',
      'It was established that the delays were attributable to a fault at the supplier.'
    ],
    correct: 3,
    explain:
      'Formal register favours precise, often impersonal wording. Padding such as aforesaid and consequent upon is stilted rather than formal, and the first two versions are conversational.'
  },
  {
    key: 'register-02',
    category: 'register',
    prompt: 'Which version is most appropriate in a letter to a client?',
    options: [
      'We have had to put the launch off until March.',
      'The launch has been shoved back to March.',
      'We have decided to postpone the launch until March.',
      'We are compelled by circumstance to defer the said launch to the month of March.'
    ],
    correct: 2,
    explain:
      'A single latinate verb such as postpone suits formal correspondence, where phrasal verbs read as informal and legalistic padding reads as pompous.'
  },
  {
    key: 'register-03',
    category: 'register',
    prompt: 'Which sentence is appropriate in a formal letter?',
    options: [
      'We will not be able to meet the deadline you have proposed.',
      'We won\'t be able to meet the deadline you\'ve proposed.',
      'We can\'t do that deadline, sorry.',
      'It shall not be possible for this company to meet with the deadline as proposed by yourselves.'
    ],
    correct: 0,
    explain:
      'Formal written English avoids contractions. Yourselves used as an ordinary object pronoun is commercial cliche, not correct formality.'
  },
  {
    key: 'register-04',
    category: 'register',
    prompt:
      'A study reports a correlation between screen time and sleep quality. Which claim is appropriate in an academic article?',
    options: [
      'These data prove that screen time causes poor sleep.',
      'These data suggest that screen time may contribute to poorer sleep.',
      'These data show beyond any doubt that screens are ruining sleep.',
      'These data possibly might perhaps indicate some sort of link with sleep.'
    ],
    correct: 1,
    explain:
      'Academic register hedges a claim in proportion to the evidence: correlational data support suggest and may, while proof language overstates and stacked hedges sound evasive.'
  },
  {
    key: 'register-05',
    category: 'register',
    prompt: 'Which version is most appropriate in a formal email to an external partner?',
    options: [
      'Give us a shout if anything comes up.',
      'Get in touch with us if stuff goes wrong.',
      'Kindly be advised to make contact with the undersigned in the event of any difficulties whatsoever arising.',
      'Please contact us should any difficulty arise.'
    ],
    correct: 3,
    explain:
      'Neutral formal English replaces the phrasal verb with contact and keeps the sentence short; kindly be advised and the undersigned are archaic officialese.'
  },
  {
    key: 'register-06',
    category: 'register',
    prompt:
      'Complete the formal sentence: "The department will ___ the discrepancy before the audit."',
    options: ['sort out', 'resolve', 'sort', 'get to the bottom of'],
    correct: 1,
    explain:
      'Resolve is the neutral formal verb here; the phrasal alternatives belong to speech and informal writing.'
  },
  {
    key: 'register-07',
    category: 'register',
    prompt: 'Which phrasing suits a formal financial report?',
    options: [
      'Revenue took a big drop in the second quarter.',
      'Revenue fell off a cliff in the second quarter.',
      'Revenue declined markedly in the second quarter.',
      'Revenue experienced a downward-tending movement of significance in the second quarter.'
    ],
    correct: 2,
    explain:
      'Formal writing prefers a precise verb with an adverb to vague nouns, idioms, or inflated paraphrase that says less in more words.'
  },
  {
    key: 'register-08',
    category: 'register',
    prompt: 'Which sentence is most appropriate in a project report?',
    options: [
      'Several items in the consignment were damaged or missing.',
      'A few things went wrong with the stuff we ordered.',
      'The order was a bit of a disaster, to be honest.',
      'Certain matters pertaining to the ordered goods were of a problematic nature.'
    ],
    correct: 0,
    explain:
      'Formal register is specific: name the items and the problem instead of relying on vague nouns or on abstract padding.'
  },
  {
    key: 'register-09',
    category: 'register',
    prompt: 'Which sentence is appropriate in an academic essay?',
    options: [
      'I reckon the policy was a mistake.',
      'Everyone knows the policy was a disaster.',
      'The policy was, in my view, misconceived.',
      'It is submitted by the present author that the policy was of an erroneous character.'
    ],
    correct: 2,
    explain:
      'A measured first-person opinion is acceptable in an essay; colloquial reckon, an appeal to what everyone knows, and third-person legalese are all out of place.'
  },
  {
    key: 'register-10',
    category: 'register',
    prompt: 'You are messaging a colleague you work with daily. Which version is most natural?',
    options: [
      'Please find attached herewith the slides for tomorrow\'s session.',
      'The undersigned encloses the aforementioned presentation materials.',
      'Slides. Attached. Tomorrow.',
      'I have attached the slides for tomorrow.'
    ],
    correct: 3,
    explain:
      'Register should match the relationship: a plain complete sentence suits a familiar colleague, while herewith and the undersigned import a legal formality that reads as cold or sarcastic.'
  },
  {
    key: 'register-11',
    category: 'register',
    prompt:
      'A teammate asks by message whether you can join a call at short notice. Which reply fits the situation best?',
    options: [
      'I regret to inform you that I shall be unable to attend the aforementioned call.',
      'Sorry, I cannot make it, I am in a workshop until four.',
      'Negative.',
      'It is with considerable regret that the present writer must decline your kind invitation.'
    ],
    correct: 1,
    explain:
      'An informal exchange calls for a brief, friendly refusal with a reason. The formal templates are disproportionate, and a one-word answer reads as curt.'
  },
  {
    key: 'register-12',
    category: 'register',
    prompt: 'Which phrasing suits a formal survey report?',
    options: [
      'A considerable number of respondents raised concerns about the timetable.',
      'Loads of respondents raised concerns about the timetable.',
      'Respondents raised a whole bunch of concerns about the timetable.',
      'A not inconsiderable quantity of respondents raised concerns of a timetabling nature.'
    ],
    correct: 0,
    explain:
      'A considerable number of is the neutral formal quantifier; loads of and a bunch of are colloquial, and the double-negative version is needlessly convoluted.'
  },
  {
    key: 'register-13',
    category: 'register',
    prompt: 'Which sentence is appropriate in the conclusion of an academic paper?',
    options: [
      'So what does all this mean? Quite a lot, actually!',
      'Isn\'t it obvious by now that the earlier studies were simply wrong?',
      'The upshot, then, is that the old studies were rubbish.',
      'The evidence therefore indicates a more limited effect than earlier work had assumed.'
    ],
    correct: 3,
    explain:
      'An academic conclusion states the finding directly; rhetorical questions, exclamation marks and dismissive slang belong to speech or journalism.'
  },
  {
    key: 'register-14',
    category: 'register',
    prompt: 'Which sentence is most appropriate in a research paper?',
    options: [
      'If you look at Table 3, you can see the effect disappears.',
      'As Table 3 shows, the effect disappears once income is controlled for.',
      'You would never guess it from Table 3, but the effect disappears.',
      'Table 3 is where the reader will find out that the effect goes away.'
    ],
    correct: 1,
    explain:
      'Academic prose addresses the argument rather than the reader: make the evidence the subject of the sentence instead of using the second person.'
  },
  {
    key: 'register-15',
    category: 'register',
    prompt: 'Which sentence is most appropriate in a formal evaluation?',
    options: [
      'The results were very very good indeed.',
      'The results were really quite amazing.',
      'The results were markedly better than those of the pilot study.',
      'The results were of an extremely superior quality relative to the pilot.'
    ],
    correct: 2,
    explain:
      'Formal writing replaces stacked intensifiers with a precise comparative; inflated adjectives add emphasis without adding information.'
  },
  {
    key: 'register-16',
    category: 'register',
    prompt: 'Which sentence is most effective in a formal letter of complaint?',
    options: [
      'Your engineer never turned up and nobody bothered to call.',
      'This is completely unacceptable and I demand compensation immediately!',
      'The engineer did not attend the appointment, and no notice of the cancellation was given.',
      'It would appear that possibly some slight issue may perhaps have arisen with the visit.'
    ],
    correct: 2,
    explain:
      'A complaint is strongest when the facts are stated plainly and unemotionally; both aggression and excessive hedging weaken the case.'
  },

  // ---- spelling ----
  {
    key: 'spelling-01',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['occurence', 'occurrance', 'ocurrence', 'occurrence'],
    correct: 3,
    explain:
      'Occurrence doubles the c and the r and then ends in -ence: oc-cur-rence. The r doubles because the stress falls on the second syllable.'
  },
  {
    key: 'spelling-02',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['accomodate', 'acommodate', 'accommodate', 'accomadate'],
    correct: 2,
    explain: 'Accommodate is large enough to accommodate two c letters and two m letters.'
  },
  {
    key: 'spelling-03',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['seperate', 'separate', 'sepparate', 'seperete'],
    correct: 1,
    explain: 'Separate has an a in the middle: there is a rat in separate.'
  },
  {
    key: 'spelling-04',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['definately', 'definitly', 'definitely', 'defiantly'],
    correct: 2,
    explain:
      'Definitely is built on finite, so there is no a anywhere in it; defiantly is a different word, meaning in a rebellious manner.'
  },
  {
    key: 'spelling-05',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['embarass', 'embaras', 'emberrass', 'embarrass'],
    correct: 3,
    explain:
      'Embarrass doubles both the r and the s, unlike harass, which doubles only the s.'
  },
  {
    key: 'spelling-06',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['maintainance', 'maintanence', 'maintenence', 'maintenance'],
    correct: 3,
    explain:
      'The verb maintain loses its i in the noun, which is spelled main-ten-ance.'
  },
  {
    key: 'spelling-07',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['rythm', 'rhythm', 'rhythem', 'rythem'],
    correct: 1,
    explain:
      'Rhythm keeps the Greek rh- and has no vowel letter after the th; the y does all the work.'
  },
  {
    key: 'spelling-08',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['reccurring', 'recuring', 'recurring', 'reccuring'],
    correct: 2,
    explain:
      'Recur has a single c; the final r doubles before -ing because the stress falls on the last syllable of the root.'
  },
  {
    key: 'spelling-09',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['necessary', 'neccessary', 'necesary', 'neccesary'],
    correct: 0,
    explain: 'Necessary has one c and a double s: one collar and two sleeves.'
  },
  {
    key: 'spelling-10',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['receive', 'recieve', 'reccieve', 'receve'],
    correct: 0,
    explain:
      'The i-before-e habit reverses after c: receive, deceive, ceiling, perceive.'
  },
  {
    key: 'spelling-11',
    category: 'spelling',
    prompt: 'Which spelling is correct?',
    options: ['acheivement', 'achievment', 'achievement', 'acheivment'],
    correct: 2,
    explain:
      'Achieve keeps i before e (there is no c in front of it) and keeps its final e before -ment.'
  },
  {
    key: 'spelling-12',
    category: 'spelling',
    prompt: 'Which is correct in "___, the committee may still disagree"?',
    options: ['Ofcourse', 'Off course', 'Of coarse', 'Of course'],
    correct: 3,
    explain:
      'Of course is always two words. Off course means straying from a route, and coarse means rough or crude.'
  }
]

// Set 1 + set 2 (added 2026-08-15); order is authoring order, the pages shuffle.
export const EN_MECHANICS = [...SET1, ...EN_MECHANICS_SET2]
