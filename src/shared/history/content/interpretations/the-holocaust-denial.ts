import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'the-holocaust-denial',
  about: ['event:the-holocaust'],
  topic: 'historiography',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Evans argued that the term is generally understood to denote "the attempt by Nazi Germany, led by Hitler, to exterminate the Jewish population in Europe, which attempt succeeded to the extent of murdering between 5 and 6 million Jews in a variety of ways, including mass gassings in camps built for the purpose". It follows that a "Holocaust denier" is someone who, for one reason or another or for a combination of reasons, repudiates the notion that the above definition of the Holocaust is apt to describe what was sought to be done to the European Jews by the Nazis during World War 2.',
    lang: 'en',
    cite: {
      source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
      loc: {
        section: 'VIII. JUSTIFICATION: THE CLAIM THAT IRVING IS A "HOLOCAUST DENIER"',
        para: '8.3'
      }
    },
    provenance: { via: 'web', at: '2026-10-06', url: 'https://www.hdot.org/judge/' }
  },
  positions: [
    {
      id: 'historical-record',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Authorities generally agree that about 6 million European Jews died in the Holocaust.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        }
      ],
      standing: {
        label: 'mainstream',
        quote: {
          id: 'q3',
          text: 'it is my conclusion that no objective, fair-minded historian would have serious cause to doubt that there were gas chambers at Auschwitz and that they were operated on a substantial scale to kill hundreds of thousands of Jews.',
          lang: 'en',
          cite: {
            source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
            loc: { section: 'XIII. FINDINGS ON JUSTIFICATION', para: '13.91' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.hdot.org/judge/' }
        }
      }
    },
    {
      id: 'holocaust-denial',
      category: 'fringe',
      holders: [
        { kind: 'school', name: 'Holocaust denial (David Irving)' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'And there are so many survivors of Auschwitz now, in fact, that I get very tasteless about all of this. I don\'t see any reason to be tasteful about Auschwitz. It\'s baloney, it\'s a legend. Once we admit the fact that it was a brutal slave labour camp and large numbers of people did die, as large numbers of innocent people died elsewhere in the War, why believe the rest of the baloney?',
          lang: 'en',
          cite: {
            source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
            loc: {
              section: 'VIII. JUSTIFICATION: THE CLAIM THAT IRVING IS A "HOLOCAUST DENIER"',
              para: '8.17'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.hdot.org/judge/' }
        },
        {
          id: 'q5',
          text: 'I call it a Holocaust legend because then it has something like the quality of a religion almost.',
          lang: 'en',
          cite: {
            source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
            loc: {
              section: 'VIII. JUSTIFICATION: THE CLAIM THAT IRVING IS A "HOLOCAUST DENIER"',
              para: '8.17'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.hdot.org/judge/' }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Even so, it appears to me to be incontrovertible that Irving qualifies as a Holocaust denier. Not only has he denied the existence of gas chambers at Auschwitz and asserted that no Jew was gassed there, he has done so on frequent occasions and sometimes in the most offensive terms.',
          lang: 'en',
          cite: {
            source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
            loc: { section: 'XIII. FINDINGS ON JUSTIFICATION', para: '13.95' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.hdot.org/judge/' }
        },
        {
          id: 'q7',
          text: 'In my opinion there is force in the opinion expressed by Evans that all Irving\'s historiographical "errors" converge, in the sense that they all tend to exonerate Hitler and to reflect Irving\'s partisanship for the Nazi leader.',
          lang: 'en',
          cite: {
            source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
            loc: { section: 'XIII. FINDINGS ON JUSTIFICATION', para: '13.142' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.hdot.org/judge/' }
        }
      ],
      standing: {
        label: 'discredited',
        quote: {
          id: 'q8',
          text: 'I accept the Defendants\' contention that this convergence is a cogent reason for supposing that the evidence has been deliberately slanted by Irving.',
          lang: 'en',
          cite: {
            source: 'hdot-irving-v-penguin-books-and-lipstadt-judgment-2000',
            loc: { section: 'XIII. FINDINGS ON JUSTIFICATION', para: '13.142' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.hdot.org/judge/' }
        }
      }
    }
  ]
})
