import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-savak',
  names: [
    { text: 'Founding of SAVAK', lang: 'en', role: 'primary' },
    { text: 'تأسیس ساواک', lang: 'fa', role: 'native' },
    {
      text: 'Sazman-e Ettelaat va Amniyat-e Keshvar',
      lang: 'fa-Latn',
      role: 'official',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '1' }
        }
      ]
    },
    {
      text: 'State Security and Intelligence Organization',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-azimi-great-britain-v',
          loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '43' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1957' },
        cites: [
          {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '43' }
          },
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1957' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:1953-iranian-coup', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The creation of the State Security and Intelligence Organization (SAVAK) in late 1335 Š./1957, and its expansion was a further development detrimental to traditional modes of foreign influence.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q2',
          text: '1957 The formation of SAVAK, the Iranian secret police, with advice from the United States.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1957' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Internally, a period of political repression followed the overthrow of Mossadeq, as the shah concentrated power in his own hands. He banned or suppressed the Tudeh, the National Front, and other parties; muzzled the press; and strengthened the secret police, SAVAK (Sazman-e Ettelaat va Amniyat-e Keshvar. Elections to the Majlis in 1954 and 1956 were closely controlled.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        },
        {
          id: 'q4',
          text: 'The first of these farmāns was delivered to Moṣaddeq on the night of 24 Mordād 1332 Š./15 August 1953 by Colonel Neʿmat-­Allāh Naṣīrī, commander of the shah’s imperial guard and later director of the internal-security force SAVAK.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The organization was used, inter alia, to monitor and limit the activities of foreign embassies. “I have no doubt,” wrote Ambassador Stevens, “that our movements and contacts are being carefully watched” (PRO, FO 371/133009, Stevens to Riches, 25 March 1958). Not surprisingly, British help in training SAVAK members was viewed by some Persian officials as likely to add to Britain’s unpopularity, particularly since “Savak, in the process of controlling subversion, was working off a lot of private grudges” (PRO, FO 371/140787, minute by West, 23 February 1959).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Shapoor_Reporter_and_Teymour_Bakhtiar_with_RAF_officers.jpg/1280px-Shapoor_Reporter_and_Teymour_Bakhtiar_with_RAF_officers.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shapoor_Reporter_and_Teymour_Bakhtiar_with_RAF_officers.jpg',
    credit: { institution: 'historydocuments.ir' },
    license: { id: 'public-domain' }
  }
})
