import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-navarino',
  names: [
    { text: 'Battle of Navarino', lang: 'en', role: 'primary' },
    { text: 'Ναυμαχία του Ναυαρίνου', lang: 'el', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1827-10' },
        cites: [
          {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:navarino-bay',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:greek-war-of-independence' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  sides: [
    {
      key: 'allies',
      name: 'the European fleet',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
        }
      ]
    },
    {
      key: 'ottoman-egyptian',
      name: 'the Ottoman and Egyptian fleets',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Britain',
      role: 'combatant',
      side: 'allies',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
        },
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '3' }
        }
      ]
    },
    {
      name: 'France',
      role: 'combatant',
      side: 'allies',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
        },
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '3' }
        }
      ]
    },
    {
      name: 'Russia',
      role: 'combatant',
      side: 'allies',
      cites: [
        {
          source: 'sowards-msu-balkan-lectures-greek-revolution',
          loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
        }
      ]
    },
    {
      ref: 'person:muhammad-ali-of-egypt',
      role: 'participant',
      side: 'ottoman-egyptian',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
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
          text: 'In 1827 an Anglo-French fleet destroyed the Ottoman and Egyptian fleets at the Battle of Navarino, while the Russian army advanced as far as Edirne before a cease-fire was called in 1829.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q2',
          text: 'In 1827 the British, French and Russians agreed to seek a mediated peace and backed up their demands by sending a combined three-Power fleet of 27 ships to Navarino Bay in October to observe the Egyptian navy.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q3',
          text: 'In the crowded bay, a musket shot escalated into a battle and the European fleet sank 60 of the 89 Egyptian ships.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The Great Powers would not accept a powerful Mehmet Ali who controlled both Egypt and Greece.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q5',
          text: 'The Egyptian invasion of Syria was provoked ostensibly by the sultan\'s refusal to give Syria and Morea (Peloponnesus) to Muhammad Ali in return for his assistance in opposing the Greek war for independence in the late 1820s.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The sultan was now without any armed force that could reclaim the Morea or resist the Great Powers.',
          lang: 'en',
          cite: {
            source: 'sowards-msu-balkan-lectures-greek-revolution',
            loc: { section: 'Lecture 6: The Greek Revolution and the Greek State', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20080510143919/http://www.lib.msu.edu/sowards/balkan/lecture6.html'
          }
        },
        {
          id: 'q7',
          text: 'This resulted in Turkey and Egypt being forced out of the eastern Mediterranean by the destruction of their combined naval strength at Navarino on the southern coast of Greece.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Navarino.jpg/1280px-Navarino.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Navarino.jpg',
    credit: { institution: 'Château de Versailles', creator: 'Ambroise Louis Garneray' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'trikoupis-1860-historia-tes-hellenikes-epanastaseos', perspective: 'european' }
  ]
})
