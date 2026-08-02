import type { EnWritingPrompt } from './types'

// Writing tasks for the English test section, graded by an examiner model.
// Prompt keys are FROZEN (en_writing rows store them); summary tasks point at
// an EnPassage through passageKey, so those keys must stay in step.

export const EN_WRITING_PROMPTS: EnWritingPrompt[] = [
  // ---- opinion ----
  {
    key: 'opinion-machine-assisted-authorship',
    kind: 'opinion',
    title: 'Credit for machine-assisted work',
    instructions:
      'Several literary and academic prizes now require entrants to declare whether generative software was used in preparing a submission, and a few refuse such entries outright. Write an argumentative essay taking a clear position on this question: should work produced with substantial help from generative software be eligible for prizes awarded to individual authors? State your position in the opening paragraph. Develop at least two distinct supporting arguments, each illustrated with a concrete example or a plausible case. Devote one paragraph to the strongest objection to your view and answer it rather than dismissing it. Use formal academic register throughout: no contractions, no rhetorical questions, and hedge any claim you cannot support. End with a conclusion that goes beyond restating the introduction.',
    minWords: 180,
    maxWords: 300
  },
  {
    key: 'opinion-minimum-age-for-social-media',
    kind: 'opinion',
    title: 'A minimum age for social media',
    instructions:
      'Some governments have legislated a minimum age of sixteen for social media accounts and placed the burden of enforcement on the platforms. Write an argumentative essay arguing either for or against such a law. Your essay must do three things: state and defend your position; address how the rule would actually be enforced and what that enforcement would cost in privacy or practicality; and consider whether the harm at issue is caused by the platforms themselves or merely amplified by them. Acknowledge the strongest argument against your position and respond to it. Write in formal register, avoid contractions and slogans, and support generalisations with reasoning rather than assertion.',
    minWords: 180,
    maxWords: 300
  },
  {
    key: 'opinion-museum-restitution',
    kind: 'opinion',
    title: 'Returning objects to their countries of origin',
    instructions:
      'National museums holding objects removed during colonial rule are under growing pressure to return them to the countries they came from. Write an argumentative essay taking a position on whether a large national museum should return such objects when a formal request is made. Include at least one argument concerning the interests of a wide international public and at least one concerning the claims of the community the objects came from, and make clear which you consider to weigh more heavily and why. Concede the strongest point on the opposing side before answering it. Formal register: no contractions, no emotive overstatement, and no unsupported claims about what "everyone" believes.',
    minWords: 180,
    maxWords: 300
  },

  // ---- summary ----
  {
    key: 'summary-the-tyranny-of-metrics',
    kind: 'summary',
    title: 'Summarise: The Tyranny of Metrics',
    passageKey: 'the-tyranny-of-metrics',
    instructions:
      'Read the passage and summarise its argument in your own words. Your summary must cover, in this order: the writer\'s central claim about what institutional metrics are and what targets do to the people measured; the concession the writer makes to the defenders of measurement; and the conclusion the passage finally reaches. Do not quote more than three consecutive words from the passage, do not reproduce its examples unless one is essential to the argument, and do not add any opinion of your own. Write continuous prose, not notes or bullet points.',
    minWords: 70,
    maxWords: 120
  },
  {
    key: 'summary-the-return-of-the-wolves',
    kind: 'summary',
    title: 'Summarise: The Return of the Wolves',
    passageKey: 'the-return-of-the-wolves',
    instructions:
      'Read the passage and summarise it in your own words. Cover the popular account of what the wolves did, what the writer accepts as established, the reasons the evidence is difficult to interpret, and why the writer thinks the qualifications matter. Use your own vocabulary rather than the writer\'s: paraphrase technical or figurative wording instead of borrowing it, and quote no more than three consecutive words. Include no examples that are not needed to make the argument clear, and add no opinion of your own. Write continuous prose.',
    minWords: 70,
    maxWords: 120
  },
  {
    key: 'summary-the-grammar-of-forgetting',
    kind: 'summary',
    title: 'Summarise: The Grammar of Forgetting',
    passageKey: 'the-grammar-of-forgetting',
    instructions:
      'Read the passage and summarise it in your own words. Your summary must make clear what assumption the storage metaphors carry, what the reconsolidation research suggests instead, why the writer argues that this may be a feature rather than a fault, and what follows for institutions that rely on testimony. Preserve the writer\'s hedging: where the passage says the evidence is uncertain, your summary must not state it as settled fact. Quote no more than three consecutive words, add no opinion of your own, and write continuous prose rather than notes.',
    minWords: 70,
    maxWords: 120
  },

  // ---- formal-rewrite ----
  {
    key: 'rewrite-project-delay',
    kind: 'formal-rewrite',
    title: 'Rewrite: a delayed project',
    instructions:
      'Rewrite the following message as a formal written update from a project manager to an external client. The original reads: "Hi! So the build is running late, sorry about that. The thing is, our supplier messed us about over the panels and we couldn\'t get hold of anyone there for about two weeks. We reckon we\'ll be back on track by the end of April, fingers crossed. Give me a shout if you want to chat it through." Keep every fact, including the cause of the delay, the length of the interruption and the expected recovery date. Remove all contractions, phrasal verbs and colloquial expressions, and replace the casual reassurance with a properly hedged commitment. Add an appropriate opening and closing line for business correspondence. Do not invent facts that are not in the original.',
    minWords: 60,
    maxWords: 140
  },
  {
    key: 'rewrite-faulty-equipment',
    kind: 'formal-rewrite',
    title: 'Rewrite: a faulty laptop',
    instructions:
      'Rewrite the following message as a formal letter of complaint to the supplier\'s customer relations department. The original reads: "Hey, that laptop you sent over last month is a total nightmare. It keeps conking out whenever anything is plugged into the side ports, and your help desk basically ignored my last two emails. I want my money back or a new one, whichever is quicker. Cheers." Preserve every fact: the delivery date, the nature of the fault, the two unanswered emails and the remedy sought. Replace the aggressive and colloquial wording with plain, unemotional formal English, state the remedy as a clear request rather than a demand, and add a suitable opening and closing. Do not add facts that are not in the original.',
    minWords: 60,
    maxWords: 140
  },
  {
    key: 'rewrite-extension-request',
    kind: 'formal-rewrite',
    title: 'Rewrite: asking for an extension',
    instructions:
      'Rewrite the following message as a formal email from a student to a course tutor. The original reads: "Hi Prof, really sorry but I\'m not going to get the essay in on Friday. I\'ve been ill on and off for a couple of weeks and I\'ve got two other deadlines that same week, which is a nightmare. Any chance of an extension to like the 20th? Thanks a million." Keep the facts: the missed deadline, the illness, the competing deadlines and the date requested. Remove contractions, vague quantifiers and pleading, use an appropriate salutation and sign-off, and phrase the request so that it is polite without being apologetic to the point of weakness. You may offer to supply evidence, but invent nothing else.',
    minWords: 60,
    maxWords: 140
  },

  // ---- email ----
  {
    key: 'email-conference-complaint',
    kind: 'email',
    title: 'Email: a conference booking gone wrong',
    instructions:
      'You attended a three-day professional conference last week. The single room you booked and paid for in advance was reallocated and you were moved to a shared room on the first night; two sessions you had registered for were rescheduled without notice and clashed with each other; and the printed programme listed your name and affiliation incorrectly. Write a formal email to the conference organiser. State clearly who you are and what you booked, set out the three problems in a logical order with the relevant dates, explain briefly what impact they had, and state the specific remedy you are seeking. Keep the tone measured and factual, avoid contractions and exclamation marks, and end with an appropriate closing.',
    minWords: 100,
    maxWords: 180
  },
  {
    key: 'email-data-access-request',
    kind: 'email',
    title: 'Email: requesting access to a dataset',
    instructions:
      'You are a researcher who needs access to a dataset held by another institution in order to replicate a published analysis. Write a formal email to the researcher who holds the data. Introduce yourself and your institutional position, explain precisely what you are asking for and why, say how the data would be used and protected, indicate what credit or co-authorship you would offer if that is appropriate, and propose a realistic timescale. Anticipate one concern the recipient is likely to have and address it before it is raised. Use formal but not stilted register, avoid contractions, and finish with a clear next step.',
    minWords: 100,
    maxWords: 180
  },
  {
    key: 'email-interview-follow-up',
    kind: 'email',
    title: 'Email: following up after an interview',
    instructions:
      'Two weeks ago you were interviewed for a post and were told a decision would follow within ten working days. You have heard nothing. Write a formal follow-up email to the person who interviewed you. Thank them for the interview, refer to the post and the date specifically, ask about the current position without implying blame, add one short paragraph that reinforces your suitability by referring to something discussed at the interview, and mention that you would be glad to supply any further information. Keep the message brief and confident rather than anxious, avoid contractions, and close appropriately.',
    minWords: 100,
    maxWords: 180
  },

  // ---- report ----
  {
    key: 'report-library-usage',
    kind: 'report',
    title: 'Report: departmental library usage',
    instructions:
      'Write a formal report for a faculty board on the use of the departmental library over the last academic year, based on the following findings. The library recorded 41,000 visits, twelve per cent fewer than the year before. Loans of printed books fell by a third, while use of the electronic collection rose by fifty-eight per cent. The two group study rooms were fully booked on eighty-four per cent of weekdays. In a survey of 220 students, "somewhere quiet to work" was the most requested improvement, ahead of longer opening hours and a wider selection of ebooks. Organise the report with a short statement of purpose, a description of the findings that groups related figures rather than listing them in the order given, an interpretation of what the pattern suggests, and two or three specific recommendations that follow from the evidence. Use formal impersonal register, report the figures accurately, and do not invent data.',
    minWords: 140,
    maxWords: 250
  },
  {
    key: 'report-remote-working-pilot',
    kind: 'report',
    title: 'Report: a remote working pilot',
    instructions:
      'Write a formal report for a senior management team evaluating a six-month pilot of remote working, based on the following findings. Forty staff across four teams worked remotely for three days a week. Measured output was unchanged in three teams and fell slightly in the fourth, which had the largest number of new recruits. Time spent in scheduled meetings rose by twenty-two per cent. Two team leaders reported that training new staff had become noticeably harder. Seventy-eight per cent of participants said they wanted the arrangement made permanent, and desk requirements fell by roughly a third, implying a possible reduction in office costs. Structure the report with a statement of purpose, a summary of the findings that distinguishes what the pilot shows from what it merely suggests, a short discussion of the risks, and clear recommendations about whether and how the arrangement should continue. Use formal impersonal register, hedge any causal claim the data do not establish, and do not invent figures.',
    minWords: 140,
    maxWords: 250
  }
]
