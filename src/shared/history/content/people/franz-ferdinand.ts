import { definePerson } from '../../schema'

export default definePerson({
  id: 'franz-ferdinand',
  names: [
    { text: 'Franz Ferdinand', lang: 'en', role: 'primary' },
    { text: 'Franz Ferdinand von Österreich-Este', lang: 'de', role: 'native' },
    {
      text: 'Archduke Franz Ferdinand Austria-Este',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-miller-franz-ferdinand',
          loc: { section: 'Franz Ferdinand, Archduke of Austria-Este' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1863-12-18' },
        cites: [
          {
            source: 'eo1418-miller-franz-ferdinand',
            loc: { section: 'Franz Ferdinand, Archduke of Austria-Este' }
          },
          {
            source: 'eo1418-miller-franz-ferdinand',
            loc: { section: 'Youth and Personality', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1914-06-28' },
        cites: [
          {
            source: 'eo1418-miller-franz-ferdinand',
            loc: { section: 'Franz Ferdinand, Archduke of Austria-Este' }
          },
          { source: 'eo1418-foster-sarajevo-incident', loc: { section: 'Sarajevo Incident' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:sarajevo',
    cites: [
      {
        source: 'eo1418-miller-franz-ferdinand',
        loc: { section: 'Franz Ferdinand, Archduke of Austria-Este' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch', 'military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Franz Ferdinand, Archduke of Austria-Este’s (1863-1914) life has been largely overshadowed by his assassination in Sarajevo on 28 June 1914.',
          lang: 'en',
          cite: {
            source: 'eo1418-miller-franz-ferdinand',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/franz-ferdinand-archduke-of-austria-este/'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'Herein lies a key question for historiography surrounding Franz Ferdinand: How would he have reformed the empire’s political structure in an effort to prevent national dissolution? The archduke well understood the multinational empire’s need for reform. Indeed in his “Program for the Change of Dynasty,” he modeled himself on Francis I, Emperor of Austria (1768-1835), who reconsolidated the regime after Emperor Napoleon I, Emperor of the French’s (1769-1821) dismemberment. Yet while he flirted with trialism (converting the dualist state into a three-pronged Austro-Hungarian-South Slav state) and other forms of federalism, the archduke never settled on a specific program. And his plan to increase the power of Slavs (nearly half the empire’s inhabitants) at the expense of Hungarians (and with force if need be) only added to the anxiety over his reign. Scholars, like contemporaries, are divided over whether the heir had the personal and political skills to hold the empire together.',
          lang: 'en',
          cite: {
            source: 'eo1418-miller-franz-ferdinand',
            loc: { section: 'Public Sphere and Politics', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/franz-ferdinand-archduke-of-austria-este/'
          }
        },
        {
          id: 'q3',
          text: 'As scholars note, the archduke’s death removed the one voice that would have spoken out forcefully against war with Serbia during the July Crisis.',
          lang: 'en',
          cite: {
            source: 'eo1418-miller-franz-ferdinand',
            loc: { section: 'Public Sphere and Politics', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/franz-ferdinand-archduke-of-austria-este/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Drawing his pistol, the assassin fired twice, hitting the Archduke in the throat, and his wife in the abdomen; Princip would later state that Potiorek was the intended second target.',
          lang: 'en',
          cite: {
            source: 'eo1418-foster-sarajevo-incident',
            loc: { section: 'The Assassination', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/sarajevo-incident/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'It is a tragic irony that the war Franz Ferdinand strived to prevent and the collapse of the empire he lived to reform resulted from decisions made directly in response to his death.',
          lang: 'en',
          cite: {
            source: 'eo1418-miller-franz-ferdinand',
            loc: { section: 'Sarajevo Assassination and Legacy', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/franz-ferdinand-archduke-of-austria-este/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Archduke_Franz_Ferdinand_%2848059749968%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Archduke_Franz_Ferdinand_(48059749968).jpg',
    credit: { creator: 'Carl Pietzner' },
    license: { id: 'public-domain' }
  }
})
