import { definePerson } from '../../schema'

export default definePerson({
  id: 'karageorge',
  names: [
    { text: 'Karađorđe', lang: 'en', role: 'primary' },
    { text: 'Карађорђе', lang: 'sr', role: 'native' },
    {
      text: 'Karageorge',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '1' } }
      ]
    },
    {
      text: 'George Petrovich',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-servia', loc: { section: 'SERVIA', para: '101' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1766', approx: true },
        cites: [
          { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1817-08-08', julian: true },
        cites: [
          { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '3' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['revolutionary', 'military'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/21/Portrait_of_Kara%C4%91or%C4%91e_Petrovi%C4%87_by_Uro%C5%A1_Kne%C5%BEevi%C4%87_after_Borovikovsky_%281854%29.jpg/1280px-Portrait_of_Kara%C4%91or%C4%91e_Petrovi%C4%87_by_Uro%C5%A1_Kne%C5%BEevi%C4%87_after_Borovikovsky_%281854%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Kara%C4%91or%C4%91e_Petrovi%C4%87_by_Uro%C5%A1_Kne%C5%BEevi%C4%87_after_Borovikovsky_(1854).jpg',
    credit: { institution: 'National Museum of Serbia', creator: 'Uroš Knežević' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'KARAGEORGE (in Servian, Karadyordye) (c. 1766–1817), the leader of the Servians during their first revolution against the Turks (1804–13), and founder of the Servian dynasty Karageorgevich.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'He was born in 1766 (according to some in 1768), the son of an extremely poor Servian peasant, Petroniye Petrovich.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The leaders of the insurgents’ bands and other men of influence met about the middle of February 1804 at the village of Orashatz, and there elected Karageorge as the supreme leader (Vrhovni Vozd) of the nation.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        },
        {
          id: 'q4',
          text: 'Karageorge’s hasty and uncompromising temper and imperious habits, as well as his want of political tact, soon made him many enemies amongst the more prominent Servians (voyvodes and senators).',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Karageorge was killed (July 27, O.S., 1817) while he was asleep, and his head was sent to the pasha for transmission to Constantinople.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        },
        {
          id: 'q6',
          text: 'It is impossible to exonerate Milosh Obrenovich from responsibility for the murder, which became the starting-point for a series of tragedies in the modern history of Servia.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Karageorge was one of the most remarkable Servians of the 19th century.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        },
        {
          id: 'q8',
          text: 'No other man could have led the bands of undisciplined and badly-armed Servian peasants to such decisive victories against the Turks.',
          lang: 'en',
          cite: { source: 'britannica-1911-karageorge', loc: { section: 'KARAGEORGE', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Karageorge'
          }
        }
      ]
    }
  ]
})
