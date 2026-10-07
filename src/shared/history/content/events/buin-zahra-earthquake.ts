import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'buin-zahra-earthquake',
  names: [
    { text: 'Buin Zahra earthquake', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1962-09-01' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1962' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:buin-zahra',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1962' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 12000, qualifier: 'over' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1962' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7f/SC565222_%282721469529%29.jpg/1280px-SC565222_%282721469529%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SC565222_(2721469529).jpg',
    credit: {
      institution: 'Otis Historical Archives, National Museum of Health and Medicine (SC565222)'
    },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'An earthquake on September 1, measuring 7.2 on the Richter scale causes extensive damage and results in over 12,000 fatalities in Buʾin-Zahrā, southeast of Qazvin.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1962' }
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q2',
          text: 'In August 1962 he gained much popular sympathy when he organized a successful relief operation for the victims of the Boʾin Zahrā earthquake near Qazvin.',
          lang: 'en',
          cite: {
            source: 'iranica-chehabi-takhti',
            loc: { section: 'TAḴTI, Ḡolām-Reżā', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260810074327/https://www.iranicaonline.org/articles/takti-golam-reza/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'Strict adherence to building codes during the past decades in California undoubtedly saved many lives and kept thousands of buildings from collapsing in the Loma Prieta earthquake; no similar step was seriously undertaken in Iran during the 42 years time interval between the 1962 Buyin Zahrā and the 2003 Bam earthquakes.',
          lang: 'en',
          cite: {
            source: 'iranica-berberian-bam-earthquake',
            loc: { section: 'BAM EARTHQUAKE', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260129211138/https://www.iranicaonline.org/articles/bam-earthquake-2003/'
          }
        }
      ]
    }
  ]
})
