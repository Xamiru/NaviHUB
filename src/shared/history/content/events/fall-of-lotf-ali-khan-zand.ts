import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-lotf-ali-khan-zand',
  names: [
    { text: 'Fall of Loṭf-ʿAli Khan Zand', lang: 'en', role: 'primary' },
    {
      text: 'Siege of Kerman',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1794' },
        cites: [
          {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          },
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
          },
          {
            source: 'iranica-gustafson-kerman-afsharid-zand-period',
            loc: { section: 'KERMAN viii. HISTORY IN THE AFSHARID AND ZAND PERIOD', para: '9' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1795' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1117' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1794-11' },
        cites: [
          {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:kerman',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } }
      ]
    }
  ],
  sides: [
    {
      key: 'qajars',
      name: 'Qajars',
      polity: 'polity:qajar-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } }
      ]
    },
    {
      key: 'zands',
      name: 'Zands',
      polity: 'polity:zand-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:agha-mohammad-khan-qajar',
      role: 'leader',
      side: 'qajars',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } }
      ]
    },
    {
      ref: 'person:lotf-ali-khan-zand',
      role: 'leader',
      side: 'zands',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:agha-mohammad-khans-rise',
      rel: 'followed-by',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'As the Qajar dynasty consolidated its control over the north and west of Iran in the 1790s, Loṭf-ʿAli Khan Zand made his last stand at Kerman with the support of several local families, for which the city was largely destroyed and the population blinded and massacred by Āḡā Moḥammad Khan after a prolonged siege in 1794',
          lang: 'en',
          cite: {
            source: 'iranica-gustafson-kerman-afsharid-zand-period',
            loc: { section: 'KERMAN viii. HISTORY IN THE AFSHARID AND ZAND PERIOD', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kerman-08-afsharid-zand-period'
          }
        },
        {
          id: 'q2',
          text: 'Loṭf-ʿAli Khan surprised Kerman in 1794 and held it for four months before the Qajars were admitted by treachery.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q3',
          text: 'Loṭf-ʿAlī Khan fled eastwards and in 1209/1794 was besieged in Kermān, whence he fled to Bam.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Loṭf-ʿAli Khan, Jaʿfar Khan’s young son (b. 1182/1769), was the only one of Karim Khan’s successors to win admiration for his courage and integrity',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q5',
          text: 'On his way to attack Isfahan in 1206/1791, Loṭf-ʿAli Khan was deserted by most of his army on the instigation of Ḥāji Ebrāhim’s brother (commanding the infantry), and on racing back to Shiraz he found the city in the hands of Ḥāji Ebrāhim',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Āḡā Moḥammad’s conduct at Kermān has come down as an exemplar of brutality: Nearly 20,000 women and children were given as slaves to the soldiers, and all adult males were either put to death or blinded.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q7',
          text: 'Āḡā Moḥammad Khan Qājār had his last Zand enemy blinded and cruelly tortured before taking him back to Tehran for execution in Rabiʿ II 1209/November 1794.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/Defeat_of_Lutf_%E2%80%98Ali_Khan_Zand_by_%28Agha%29_Muhammad_Shah%3B_the_city_of_Shiraz_in_the_background._Folio_from_the_Shahinshahnama_of_Fath_%27Ali_Khan_Saba%2C_dated_1810.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Defeat_of_Lutf_%E2%80%98Ali_Khan_Zand_by_(Agha)_Muhammad_Shah;_the_city_of_Shiraz_in_the_background._Folio_from_the_Shahinshahnama_of_Fath_%27Ali_Khan_Saba,_dated_1810.jpg',
    credit: { institution: 'British Library', creator: 'Fath \'Ali Khan Saba' },
    license: { id: 'public-domain' }
  }
})
