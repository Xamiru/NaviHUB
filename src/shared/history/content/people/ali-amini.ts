import { definePerson } from '../../schema'

export default definePerson({
  id: 'ali-amini',
  names: [
    { text: 'Ali Amini', lang: 'en', role: 'primary' },
    { text: 'علی امینی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1961-05-06' },
            cites: [
              {
                source: 'iranica-azimi-bakhash-kakar-elections',
                loc: {
                  section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1962-07' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: {
            section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
            para: '22'
          }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1961-62' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Mpaminiarsanjani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mpaminiarsanjani.jpg',
    credit: {
      institution: 'Reproduced in Catherine and Jacques Legrand, Shah-i Iran (Creative Publishing International, Minnetonka MN, 1999 Farsi ed.), p.90'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Yielding both to domestic demands for change and to pressure for reform from President John F. Kennedy\'s administration, the shah named Ali Amini, a wealthy landlord and senior civil servant, as prime minister. Amini was known as an advocate of reform.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Amini was known as an advocate of reform. He received a mandate from the shah to dissolve parliament and rule for six months by cabinet decree. Amini loosened controls on the press, permitted the National Front and other political parties to resume activity, and ordered the arrest of a number of former senior officials on charges of corruption.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/18.htm' }
        },
        {
          id: 'q3',
          text: 'Amini was unable to meet a large budget deficit; the shah refused to cut the military budget, and the United States, which had previously supported Amini, refused further aid. As a result, Amini resigned in July 1962.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        }
      ]
    }
  ]
})
