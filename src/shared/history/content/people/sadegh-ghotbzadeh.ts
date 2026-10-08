import { definePerson } from '../../schema'

export default definePerson({
  id: 'sadegh-ghotbzadeh',
  names: [
    { text: 'Sadegh Ghotbzadeh', lang: 'en', role: 'primary' },
    { text: 'صادق قطب‌زاده', lang: 'fa', role: 'native', translit: 'Ṣādeq Qoṭbzāda' }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '1982' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1982' }
          }
        ]
      }
    ]
  },
  born: {
    alts: [
      {
        value: { d: '1936' },
        cites: [
          {
            source: 'gnd-118964739',
            loc: { section: 'Lebensdaten: 1936-1982' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'revolutionary'],
  offices: [
    {
      title: 'foreign minister',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '1979-11-28' },
            cites: [
              {
                source: 'iranica-mohsen-milani-hostage-crisis',
                loc: { section: 'HOSTAGE CRISIS', para: '32' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '32' }
        },
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1982' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Sadegh_Ghotbzadeh_and_Ruhollah_Khomeini%2C_Neauphle-le-Ch%C3%A2teau_-_1978.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sadegh_Ghotbzadeh_and_Ruhollah_Khomeini,_Neauphle-le-Ch%C3%A2teau_-_1978.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies (iichs.ir)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On 28 November 1979, Ṣādeq Qoṭbzādeh, another close advisor to Ayatollah Khomeini, replaced Bani Ṣadr as Foreign Minister. An Islamic nationalist, Qoṭbzādeh became more engaged in the hostage crisis than his predecessor, but he also failed to resolve the crisis.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        },
        {
          id: 'q1',
          text: '1982 Ṣādeq Qoṭbzādeh, a former foreign minister of the Islamic Republic and head of the radio and television network, is executed, having been convicted of plotting a coup d’état against the regime.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1982' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'After a series of delays, including the military occupation of Mehrābād airport from 24-30 January, Khomeini, accompanied by Ebrāhim Yazdi, Ṣādeq Qoṭbzāda, and Bani-Ṣadr, embarked on a chartered Air France airliner on the evening of 31 January and arrived in Tehran the following morning.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ]
})
