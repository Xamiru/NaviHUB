import { definePerson } from '../../schema'

export default definePerson({
  id: 'lotf-ali-khan-zand',
  names: [
    { text: 'Lotf Ali Khan Zand', lang: 'en', role: 'primary' },
    { text: 'لطفعلی‌خان زند', lang: 'fa', role: 'native', translit: 'Loṭf-ʿAli Khan Zand' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1769' },
        cites: [
          { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '9' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1783', approx: true },
        cites: [
          {
            source: 'lc-names-n89136016',
            loc: { section: 'Luṭf ʻAlī Khān Zand, Shah of Iran, 1783?-1794' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  died: {
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
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Zand ruler',
      polity: 'polity:zand-iran',
      start: {
        alts: [
          {
            value: { d: '1789' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '9' }
              }
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
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '9' } },
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Lotf_Ali_Khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lotf_Ali_Khan.jpg',
    credit: { creator: 'Percy Molesworth Sykes (A History of Persia, 1915)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Loṭf-ʿAli Khan, Jaʿfar Khan’s young son (b. 1182/1769), was the only one of Karim Khan’s successors to win admiration for his courage and integrity',
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
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'At the time of his accession Lutf ʽAli Khan was only in his twentieth year, very handsome, tall, graceful, and an excellent horseman.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1115' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q3',
          text: 'On his way to attack Isfahan in 1206/1791, Loṭf-ʿAli Khan was deserted by most of his army on the instigation of Ḥāji Ebrāhim’s brother (commanding the infantry), and on racing back to Shiraz he found the city in the hands of Ḥāji Ebrāhim.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q4',
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
        },
        {
          id: 'q5',
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
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
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
  ]
})
