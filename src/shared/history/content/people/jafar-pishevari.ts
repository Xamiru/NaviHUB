import { definePerson } from '../../schema'

export default definePerson({
  id: 'jafar-pishevari',
  names: [
    { text: 'Jafar Pishevari', lang: 'en', role: 'primary' },
    { text: 'جعفر پیشه‌وری', lang: 'fa', role: 'native' },
    {
      text: 'Jaʿfar Javādzāda',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['iran'],
  roles: ['revolutionary', 'journalist', 'politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ferqa-ye demokrāt-e Āḏarbāyjān (Democratic Party of Azarbaijan) is formed in Azarbaijan with Soviet backing, striving for self-government; the movement is headed by Jaʿfar Pišavari, an elected Majles deputy whose credentials had been rejected by the Majles.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1945' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'Jaʿfar Pīšavarī, the Democratic Party’s founder, was contemptuous of the Tūda Party and its Persian intellectuals whose Western European Marxism contrasted with the Leninism of his Azeri followers. His own party, however, was even more susceptible to Soviet manipulation',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The credentials of one of the victorious candidates, the journalist and seasoned revolutionary Jaʿfar Javādzāda (Pīšavarī), were rejected by the Majles, however, and the Tudeh parliamentary faction was thus reduced to eight.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        },
        {
          id: 'q4',
          text: 'Within Azarbaijan, Pīšavarī played down class differences, focused on communal conflict, and with Soviet backing instituted two reforms: redistribution of non-azerbaijani-owned land (which was confiscated in 687 out of a total of over 7,000 villages) and nationalization of the larger banks.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q5',
          text: 'With a police force modeled after the Soviet NKVD, Azarbaijan became a police state. Even those friendly to Pīšavarī’s rule denounced his abuse of power',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'Following agreement with the Soviets, the Persian army enters Azarbaijan, bringing it under control; Pišavari and his associates flee to the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1946' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Jafar_Pishevari_and_Bozorg_Alavi_in_Tehran.png',
    page: 'https://commons.wikimedia.org/wiki/File:Jafar_Pishevari_and_Bozorg_Alavi_in_Tehran.png',
    credit: { institution: 'Ettela\'at newspaper' },
    license: { id: 'public-domain' }
  }
})
