import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'continental-system',
  names: [
    { text: 'Continental System', lang: 'en', role: 'primary' },
    {
      text: 'Continental Blockade',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1806' },
        cites: [
          {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '6' }
          },
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1806 – TOWARDS THE GRAND EMPIRE'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-napoleonic-wars',
          loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:peninsular-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1808 – THE SPANISH CAMPAIGN' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1806, Napoleon issued the Berlin Decree, which forbade trade with Britain, and the British Government responded the next year with Orders in Council, which instituted a blockade of French-controlled Europe, and authorized the British navy to seize ships violating the blockade. Napoleon responded with further trade restrictions in the Milan Decree of 1807.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/napoleonic-wars'
          }
        },
        {
          id: 'q2',
          text: 'A decree obliged all French and allied ports (including Holland and Spain) to refuse entry to British ships.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1806 – TOWARDS THE GRAND EMPIRE'
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
          text: 'The British declared a naval blockade of France, and, in retaliation, Napoleon decreed that all nations of Europe should break relations with Britain.',
          lang: 'en',
          cite: {
            source: 'loc-portugal-country-study-1993',
            loc: { section: 'Peninsular Wars', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/portugal/33.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'However, some of the allies were reluctant to apply the blockade with any real conviction for fear that their own trade would suffer, and smuggling increased. On top of this, Napoleon was forced to mobilise a lot of men to oversee the blockade, many of whom were taken from army contingents.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: {
              section: 'Timeline: Consulate/1st French Empire, 1806 – TOWARDS THE GRAND EMPIRE'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q5',
          text: 'The requirement of joining France\'s Continental Blockade against Britain was a serious disruption of Russian commerce, and in 1810 Alexander repudiated the obligation.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ]
})
