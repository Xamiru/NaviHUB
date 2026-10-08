import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sistan-arbitration-1872',
  names: [
    { text: 'Sistan arbitration of 1872', lang: 'en', role: 'primary' },
    { text: 'حکمیت گلداسمید در سیستان', lang: 'fa', role: 'native' },
    {
      text: 'Seistan Border Commission',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bosworth-sistan-islamic-period',
          loc: { section: 'SISTĀN ii. In the Islamic period', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1872' },
        cites: [
          {
            source: 'iranica-bosworth-sistan-islamic-period',
            loc: { section: 'SISTĀN ii. In the Islamic period', para: '6' }
          },
          {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          },
          {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '19' }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1872' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1873' },
        cites: [
          {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:sistan',
      cites: [
        {
          source: 'iranica-bosworth-sistan-islamic-period',
          loc: { section: 'SISTĀN ii. In the Islamic period', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  related: [
    { ref: 'event:indo-european-telegraph-line', rel: 'related' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' },
    { ref: 'polity:emirate-of-afghanistan' }
  ],
  participants: [
    {
      ref: 'person:frederic-goldsmid',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-wright-goldsmid',
          loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
        }
      ]
    },
    {
      name: 'Beresford Lovett',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '8' }
        }
      ]
    },
    {
      ref: 'person:sher-ali-khan',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '13' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In the mid-19th century there were disputes between the Durrani kings of Afghanistan and the Qajars of Persia over control of the region, with a Persian invasion in 1865 and the installation of a Persian governor, the Hešmat-al-Molk, Border disputes nevertheless continued, and in 1872 a Seistan Border Commission was set up, awarding much of Sistān to the Persians, but the frontier was not definitively demarcated until a further Boundary Commission of 1903-05 (see Tait, 1909, and the work arising out of these demarcation proceedings, Tait, 1910-12).',
          lang: 'en',
          cite: {
            source: 'iranica-bosworth-sistan-islamic-period',
            loc: { section: 'SISTĀN ii. In the Islamic period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/sistan-ii-islamic-period'
          }
        },
        {
          id: 'q3',
          text: '1872 Boundary between Persia and Afghanistan defined.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1872' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Frederic_John_Goldsmid_-_Fradelle_%26_Marshall_-_btv1b8449777x_%283_of_4%29.jpg/1280px-Frederic_John_Goldsmid_-_Fradelle_%26_Marshall_-_btv1b8449777x_%283_of_4%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Frederic_John_Goldsmid_-_Fradelle_%26_Marshall_-_btv1b8449777x_(3_of_4).jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Fradelle & Marshall' },
    license: { id: 'public-domain' }
  }
})
