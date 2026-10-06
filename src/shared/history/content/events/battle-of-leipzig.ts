import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-leipzig',
  names: [
    { text: 'Battle of Leipzig', lang: 'en', role: 'primary' },
    { text: 'Völkerschlacht bei Leipzig', lang: 'de', role: 'native' },
    {
      text: 'Battle of the Nations',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1813-10-16' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1813-10-19' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:leipzig',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'commander',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
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
          text: 'Despite two victories at Lützen on 2 May and at Bautzen on 20 May, Napoleon was defeated on 16 and 19 October at the Battle of Leipzig (known as the “Battle of the Nations” because of the number of nationalities involved – French, allied with Poles, Neapolitans, Saxons (the Kingdom of Saxony changed sides) against the Russians, Austrians, Prussians and Swedes – as well as the number of soldiers present – nearly 200,000 men on the French side, and more than 300,000 on the coalition side).',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q2',
          text: 'A revitalized Prussia joined with Austria and Russia to defeat Napoleon at the Battle of Leipzig in late 1813 and drove him out of Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1813 Napoleon\'s position began to weaken. His invasion of Russia had failed, and Britain was scoring victories in the Iberian Peninsula. Both sides of the conflict began bidding for Austria\'s support. In August of that year, Austria broke its alliance with France and declared war.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: {
              section: 'THE HABSBURG EMPIRE AND THE FRENCH REVOLUTION: The Napoleonic Wars',
              para: '7'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/19.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Upon hearing the news of this defeat, Belgium and Holland rebelled while Austria, with the support of Murat, began re-establishing itself in Italy. And with Spain lost, France was all that remained for Napoleon.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1813 – THE BATTLE OF LEIPZIG' }
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/Karl_von_Blaas_-_Die_Schlacht_bei_Leipzig_1813_-_2747_-_Kunsthistorisches_Museum.jpg/1280px-Karl_von_Blaas_-_Die_Schlacht_bei_Leipzig_1813_-_2747_-_Kunsthistorisches_Museum.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Karl_von_Blaas_-_Die_Schlacht_bei_Leipzig_1813_-_2747_-_Kunsthistorisches_Museum.jpg',
    credit: { creator: 'Karl von Blaas' },
    license: { id: 'public-domain' }
  }
})
