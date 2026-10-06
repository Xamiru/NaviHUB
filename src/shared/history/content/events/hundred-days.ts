import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hundred-days',
  names: [
    { text: 'Hundred Days', lang: 'en', role: 'primary' },
    { text: 'Cent-Jours', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1815-03-01' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1815-06-22' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          },
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1821 – THE DEATH OF NAPOLEON AT ST HELENA'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'head-of-state',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:abdication-of-napoleon-1814', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 1 March 1815, Napoleon landed at Golfe Juan, crossed the Alps and arrived in Grenoble where an army commanded by Ney awaited him. On 20 March, Napoleon took back possession of the Palais des Tuileries, abandoned the previous day by Louis XVIII, who had fled to Belgium. Napoleon decided to pre-empt the allied forces and invaded Belgium with a force of 130,000 soldiers.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q2',
          text: 'On 22 June 1815, four days after the defeat at Waterloo, Napoleon abdicated for the second time in his reign.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1821 – THE DEATH OF NAPOLEON AT ST HELENA'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q3',
          text: 'He eventually surrendered to British forces on 14 July; he soon learned that his captors had decided to exile him to the island of St Helena, a small isolated island in the middle of the South Atlantic Ocean.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1821 – THE DEATH OF NAPOLEON AT ST HELENA'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q4',
          text: 'On 17 October 1815, after a voyage of more than two months, Napoleon landed at St Helena: accessible only via a small port surrounded by tall cliffs, it was the perfect natural prison.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1821 – THE DEATH OF NAPOLEON AT ST HELENA'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Retour_de_l%27Ile_d%27Elbe_%287_Mars_1815%29_-_%28estampe%29_%28%C3%89tat_avec_la_lettre%29_-_Grav%C3%A9_par_Jazet_%3B_Peint_par_Steuben_-_btv1b532931736.jpg/1280px-Retour_de_l%27Ile_d%27Elbe_%287_Mars_1815%29_-_%28estampe%29_%28%C3%89tat_avec_la_lettre%29_-_Grav%C3%A9_par_Jazet_%3B_Peint_par_Steuben_-_btv1b532931736.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Retour_de_l%27Ile_d%27Elbe_(7_Mars_1815)_-_(estampe)_(%C3%89tat_avec_la_lettre)_-_Grav%C3%A9_par_Jazet_;_Peint_par_Steuben_-_btv1b532931736.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Jean-Pierre-Marie Jazet' },
    license: { id: 'public-domain' }
  }
})
