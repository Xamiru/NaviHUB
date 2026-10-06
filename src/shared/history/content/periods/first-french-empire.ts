import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'first-french-empire',
  names: [
    { text: 'First French Empire', lang: 'en', role: 'primary' },
    { text: 'Premier Empire', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1804-05-18' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1814-04-06' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Almost a month later, a new constitution was created: the First Empire was proclaimed by the senatus-consulte (vote of the Senate by law) of 28 Floreal, Year XII (18 May 1804). This senatus-consulte was approved on 6 November later the same year.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1804 – A YEAR OF CONTRASTS' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q2',
          text: 'In 1806, Napoleon appeared invincible. Emperor of the French since 1804, he also became King of Italy in 1805, Protector of the German Confederation in 1806 and had been Mediator of the Helvetian Confederation since 1803.',
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
          text: 'Little by little he installed family members on the European thrones: his stepson Eugene de Beauharnais was made Viceroy of Italy in 1805, his brothers Louis and Joseph became Kings in Holland and Naples respectively in 1806, and later on, in 1807, Jerome was named to Westphalia.',
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
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'On 2 April, the Senate voted in favour of deposing the Emperor, and at Fontainebleau Napoleon abdicated, in favour of his son, Napoleon II. But by 6 April, the abdication was unconditional. He was exiled to the island of Elba and Louis XVIII was restored to the Bourbon throne.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1814 – THE FRENCH CAMPAIGN' }
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1e/Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg/1280px-Jacques-Louis_David_-_The_Coronation_of_Napoleon_%281805-1807%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Coronation_of_Napoleon_(1805-1807).jpg',
    credit: { creator: 'Jacques-Louis David' },
    license: { id: 'public-domain' }
  }
})
