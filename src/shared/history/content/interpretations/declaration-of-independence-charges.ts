import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'declaration-of-independence-charges',
  about: ['event:united-states-declaration-of-independence'],
  topic: 'legitimacy',
  framing: {
    id: 'q1',
    text: 'Viewed from one standpoint, the declaration of independence was apparently an act of the utmost recklessness.',
    lang: 'en',
    cite: {
      source: 'britannica-1911-united-states-history',
      loc: { section: 'United States, The: History', para: '76' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
    }
  },
  positions: [
    {
      id: 'congress-charges',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Second Continental Congress' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In every stage of these oppressions we have petitioned for redress in the most humble terms; our repeated petitions have been answered only by repeated injury. A prince, whose character is thus marked by every act which may define a tyrant, is unfit to be the ruler of a free people.',
          lang: 'en',
          cite: {
            source: 'avalon-declaration-of-independence-1776',
            loc: { section: 'Declaration of Independence, July 4, 1776', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://avalon.law.yale.edu/18th_century/declare.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'George III., who thought that the first duty of the Americans was to obey himself, had on his side the mass of unreflecting Englishmen who thought that the first duty of all colonists was to be useful and submissive to the mother-country.',
          lang: 'en',
          cite: { source: 'britannica-1911-george-iii', loc: { section: 'George III.', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/George_III.'
          }
        },
        {
          id: 'q4',
          text: 'The Declaration of Independence had been directed rather against the king than against a king.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-states-history',
            loc: { section: 'United States, The: History', para: '129' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
          }
        }
      ]
    },
    {
      id: 'danger-of-the-step',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica, 11th edition' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The United States, as yet, had no international status, and it would seem that that must be secured, if at all, by a series of victories which would ensure independence.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-states-history',
            loc: { section: 'United States, The: History', para: '76' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/History'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
