import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'expulsion-of-jamal-al-din-afghani',
  names: [
    { text: 'Expulsion of Jamal al-Din al-Afghani', lang: 'en', role: 'primary' },
    { text: 'اخراج سید جمال‌الدین اسدآبادی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1891-01' },
        cites: [
          {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
          },
          {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:shah-abdol-azim-shrine',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:jamal-al-din-afghani',
      role: 'victim',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:tobacco-protest', rel: 'related' },
    { ref: 'event:assassination-of-naser-al-din-shah', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In both stays in Iran Jamāl-al-dīn attracted a small band of nationalists, who profited from his expertise in such matters as forming secret societies and issuing leaflets.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        },
        {
          id: 'q2',
          text: 'The shah may have feared Afḡānī’s activities, and in the summer of 1890 he made plans to expel him; Afḡānī got wind of them and took bast (sanctuary) at the shrine of Shah ʿAbd-al-ʿAẓīm, south of Tehran, where disciples continued to visit him.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'In January, 1891, the shah and Amīn-al-solṭān were enraged by a leaflet attacking the government for a series of concessions, including the tobacco monopoly given to a British subject in 1890. Attributing the leaflet, probably rightly, to Afḡānī and his followers, they had his sanctuary violated and him taken by forced march in the dead of winter to Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        },
        {
          id: 'q4',
          text: 'In the same month, Jamāl-al-dīn Asadābādī “al-Afḡānī” who, from July, 1890, preached opposition from his bast in the shrine of Shah ʿAbd-al-ʿaẓīm, was forcibly expelled and sent out of the country.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'While Afḡānī was in Iraq a mass movement against the British tobacco concession, led by the ʿolamāʾ and the merchants, broke out in Iran; a moǰtahed from Šīrāz, expelled from Iran for his participation in the movement, went to Afḡānī, who now wrote a famous letter against the shah and the concession to the leading moǰtahed at the ʿatabāt, Ḥāǰǰ Mīrzā Ḥasan Šīrāzī.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        },
        {
          id: 'q6',
          text: 'In 1891-92 Afḡānī spent several months in England, where he joined the Iranian modernist Malkom Khan in making public speeches against the shah and his policies and in writing for Malkom’s liberal newspaper, Qānūn.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Al_afghani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Al_afghani.jpg',
    credit: { institution: 'E. G. Browne, The Persian Revolution (Cambridge University Press, 1910)' },
    license: { id: 'public-domain' }
  }
})
