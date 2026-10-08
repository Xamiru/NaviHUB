import { definePerson } from '../../schema'

export default definePerson({
  id: 'fazlollah-zahedi',
  names: [
    { text: 'Fazlollah Zahedi', lang: 'en', role: 'primary' },
    { text: 'فضل‌الله زاهدی', lang: 'fa', role: 'native' },
    { text: 'Fażl-Allāh Zāhedi', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  regions: ['iran'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1953-08-19' },
            cites: [
              {
                source: 'iranica-gasiorowski-coup-detat-1953',
                loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mark J. Gasiorowski' }
            ]
          },
          {
            value: { d: '1953-08-15' },
            cites: [
              { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Office of the Historian, U.S. Department of State'
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1955-04-06' },
            cites: [
              { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-gasiorowski-coup-detat-1953',
          loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '1' }
        },
        { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
      ]
    },
    {
      title: 'Minister of the Interior',
      polity: 'polity:pahlavi-iran',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1953-08-15' },
            cites: [
              { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1955-04-06' },
            cites: [
              { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
      ]
    },
    {
      title: 'Member of the Iranian Senate',
      polity: 'polity:pahlavi-iran',
      lang: 'en',
      end: {
        alts: [
          {
            value: { d: '1953-08' },
            cites: [
              { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Persons' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Fazlollah_Zahedi_-_20_August_1953_%282%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Fazlollah_Zahedi_-_20_August_1953_(2).jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'General Fażl-Allāh Zāhedi, then a senator, was eventually chosen as a successor to Moṣaddeq because, inter alia, he was not commonly reputed to be pro-British, as he had been arrested and exiled by the British during World War II because of his pro-German activities.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Kāšāni, Šams Qanātābādi, and General Fażl-Allāh Zāhedi are reported to have been closely affiliated with the Azure Party',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q4',
          text: 'As a result, these men aligned themselves with Zāhedī, who had joined the brothers Sayf-Allāh and Asad-Allāh Rašīdīān, well-known British agents, in agitating against Moṣaddeq',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q3',
          text: 'I should record that General Zahedi had been a close associate of Mossadegh, and had in fact served for awhile as his Minister of the Interior. Earlier he had been Chief of Police in Razmara’s Government and had helped re-elect Mossadegh to Parliament.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1961-mission-for-my-country',
            loc: { section: 'Mission for My Country' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/mission-for-my-country-mohammad-reza-pahlavi_202605/Mission%20For%20My%20Country%20-%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'The shah appointed Hosain Ala to replace Zahedi as prime minister in April 1955 and thereafter named a succession of prime ministers who were willing to do his bidding.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        }
      ]
    }
  ]
})
