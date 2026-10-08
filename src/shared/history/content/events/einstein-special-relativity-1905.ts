import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'einstein-special-relativity-1905',
  names: [
    { text: 'Einstein’s special theory of relativity', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1905' },
        cites: [
          {
            source: 'aip-stachel-einstein-relativity',
            loc: { section: 'Einstein\'s Discovery of Relativity', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  participants: [
    {
      name: 'Albert Einstein',
      role: 'participant',
      cites: [
        {
          source: 'aip-stachel-einstein-relativity',
          loc: { section: 'Einstein\'s Discovery of Relativity', para: '4' }
        }
      ]
    },
    {
      name: 'Michele Besso',
      role: 'participant',
      cites: [
        {
          source: 'aip-stachel-einstein-relativity',
          loc: { section: 'Einstein\'s Discovery of Relativity', para: '28' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'Einstein had long been convinced that the Principle of Relativity must apply to all phenomena, mechanical or not. Now he found a way to show that this principle was compatible with electromagnetic theory after all. As Einstein later remarked, reconciling these seemingly incompatible ideas required "only" a new and more careful consideration of the concept of time. His new theory, later called the special theory of relativity, was based on a novel analysis of space and time',
          lang: 'en',
          cite: { source: 'aip-einstein-exhibit-great-works', loc: { section: 'Great Works' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.aip.org/exhibits/einstein/great1.htm'
          }
        },
        {
          id: 'q1',
          text: 'For SRT we have the paper On the Electrodynamics of Moving Bodies, in which the theory was first set forth in 1905 in its finished form',
          lang: 'en',
          cite: {
            source: 'aip-stachel-einstein-relativity',
            loc: { section: 'Einstein\'s Discovery of Relativity', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.aip.org/exhibits/einstein/essay-einstein-relativity.htm'
          }
        },
        {
          id: 'q2',
          text: 'A twenty-six year old patent expert (third class), largely self-taught in physics, who had never seen a theoretical physicist (as he later put it), let alone worked with one, author of several competent but not particularly distinguished papers, Einstein produced four extraordinary works in the year 1905, only one of which (not the relativity paper) seemed obviously related to his earlier papers. These works exerted the most profound influence on the development of physics in the 20th Century.',
          lang: 'en',
          cite: {
            source: 'aip-stachel-einstein-relativity',
            loc: { section: 'Einstein\'s Discovery of Relativity', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.aip.org/exhibits/einstein/essay-einstein-relativity.htm'
          }
        },
        {
          id: 'q3',
          text: 'In this paper, as in almost all subsequent accounts, Einstein bases SRT on two fundamental principles: the principle of relativity and the principle of the constancy of the velocity of light.',
          lang: 'en',
          cite: {
            source: 'aip-stachel-einstein-relativity',
            loc: { section: 'Einstein\'s Discovery of Relativity', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.aip.org/exhibits/einstein/essay-einstein-relativity.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Finally, after a day spent wrestling once more with the problem in the company of his friend and patent office colleague Michele Besso, the only person thanked in the 1905 SRT paper, there came a moment of crucial insight.',
          lang: 'en',
          cite: {
            source: 'aip-stachel-einstein-relativity',
            loc: { section: 'Einstein\'s Discovery of Relativity', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.aip.org/exhibits/einstein/essay-einstein-relativity.htm'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/87/Einstein_patentoffice_full.jpg/1280px-Einstein_patentoffice_full.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Einstein_patentoffice_full.jpg',
    credit: { institution: 'Bernisches Historisches Museum', creator: 'Lucien Chavan' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'folsing-1993-albert-einstein', perspective: 'european' }
  ]
})
