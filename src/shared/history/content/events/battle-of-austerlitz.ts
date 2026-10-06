import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-austerlitz',
  names: [
    { text: 'Battle of Austerlitz', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1805-12-02' },
        cites: [
          {
            source: 'fondation-napoleon-close-up-austerlitz',
            loc: { section: 'A close-up on: the epoch-making Battle of Austerlitz' }
          },
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1805 – VICTORY AT AUSTERLITZ' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:austerlitz' }
  ],
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  sides: [
    {
      key: 'france',
      name: 'French',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The French Revolution and Germany', para: '2' }
        }
      ]
    },
    {
      key: 'coalition',
      name: 'Russians fought alongside Austrians',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The French Revolution and Germany', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1805 – VICTORY AT AUSTERLITZ' }
        }
      ]
    },
    {
      ref: 'person:alexander-i-of-russia',
      role: 'head-of-state',
      side: 'coalition',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '6' }
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
          text: 'On 2 December 1805, north of Vienna in the present-day Czech Republic, the Austro-Russian army was completely destroyed and the Russians were made to retreat to the East. This great victory closed the German campaign.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-close-up-austerlitz',
            loc: { section: 'A close-up on: the epoch-making Battle of Austerlitz' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-the-epoch-making-battle-of-austerlitz/'
          }
        },
        {
          id: 'q2',
          text: 'At this battle, Russians fought alongside Austrians against the French, who were aided by forces from several south German states, including Bavaria, Baden, and Württemberg.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Noticing as the morning mist cleared that the allies had significantly weakened the centre on the Pratzen heights in order to support the attacks upon Telnitz and Sokolnitz, Napoleon sent Soult to take the heights; he completed his mission in a mere half-an-hour.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-austerlitz-timeline',
            loc: { section: 'Austerlitz, 2 December, 1805: a timeline' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/timelines/austerlitz-2-december-1805-a-timeline/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q4',
          text: 'Soldiers! I am pleased with you. On the day of Austerlitz, you lived up to all my expectations of your bravery and boldness; you have decked your eagles with a glory that shall never die. In less than four hours, an army of one hundred thousand men, commanded by the emperors of Russia and Austria, has either been cut to pieces or dispersed.',
          lang: 'en',
          cite: {
            source: 'napoleon-1805-proclamation-after-austerlitz',
            loc: { section: 'Proclamation after Austerlitz', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/napo_proclamation_afterausterlitz.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Austrians signed the peace treaty at Presbourg on 26 December.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1805 – VICTORY AT AUSTERLITZ' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        },
        {
          id: 'q6',
          text: 'In the otherwise unfavorable settlement after the defeat in 1805, however, Austria did receive Salzburg, a territory formerly ruled by an archbishop, in compensation for the loss of various Italian and German possessions.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Napoleonic Wars', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/19.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/La_bataille_d%27Austerlitz._2_decembre_1805_%28Fran%C3%A7ois_G%C3%A9rard%29.jpg/1280px-La_bataille_d%27Austerlitz._2_decembre_1805_%28Fran%C3%A7ois_G%C3%A9rard%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:La_bataille_d%27Austerlitz._2_decembre_1805_(Fran%C3%A7ois_G%C3%A9rard).jpg',
    credit: { creator: 'François Gérard' },
    license: { id: 'public-domain' }
  }
})
