import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'french-consulate',
  names: [
    { text: 'French Consulate', lang: 'en', role: 'primary' },
    { text: 'Consulat', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1799' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, THE COUP D’ETAT OF 18 BRUMAIRE YEAR VIII'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1804' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, THE COUP D’ETAT OF 18 BRUMAIRE YEAR VIII'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Consulate (1799-1804) oversaw the modernisation of France: the Banque de France was created and the currency stabilised, France underwent an administrative organisation (the creation of “départments” and “préfets”), the “Code Civil” was written, the “Légion d’honneur” was instituted, and canals, roads and tunnels were built throughout French territory.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, THE COUP D’ETAT OF 18 BRUMAIRE YEAR VIII'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q2',
          text: 'Napoleon Bonaparte seized power in 1799 after overthrowing the French revolutionary government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/napoleonic-wars'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Couder_-_Installation_du_Conseil_d%27Etat.png/1280px-Couder_-_Installation_du_Conseil_d%27Etat.png',
    page: 'https://commons.wikimedia.org/wiki/File:Couder_-_Installation_du_Conseil_d%27Etat.png',
    credit: { institution: 'Joconde database, French Ministry of Culture', creator: 'Auguste Couder' },
    license: { id: 'public-domain' }
  }
})
