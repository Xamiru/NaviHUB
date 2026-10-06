import { definePerson } from '../../schema'

export default definePerson({
  id: 'aga-khan-i',
  names: [
    { text: 'Aga Khan I', lang: 'en', role: 'primary' },
    { text: 'آقاخان محلاتی', lang: 'fa', role: 'native' },
    { text: 'Ḥasan-ʿAlī Šāh Āqā Khan Maḥallātī', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1804' },
        cites: [
          {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1881-04' },
        cites: [
          {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '11' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:mumbai',
    cites: [
      {
        source: 'iranica-algar-aqa-khan-mahallati',
        loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '11' }
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  roles: ['cleric', 'military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Sayyed Ḥasan-ʿAlī Šāh Āqā Khan Maḥallātī (1219-1300/1804-81) was the last imam of the Nezārī Ismaʿilis to reside in Iran and the first to bear the title of Āqā Khan.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q2',
          text: 'Soon after he arrived in Moḥarram, 1262/January, 1846, the Iranian government demanded his extradition, citing article fourteen of the Anglo-Iranian Treaty of 1299/1814.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        },
        {
          id: 'q3',
          text: 'When the Iranian government proved obdurate, the Āqā Khan was finally sent to Calcutta in April, 1847.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        },
        {
          id: 'q4',
          text: 'Following the disastrous rout of the British army by the Afghans, Aga Khan and his followers settled in India, where in 1843 he abetted the British annexation of Sind in present-day Pakistan (See also Daftary, pp. 196-99; Algar, 1991, p. 729).',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-relations-qajar-19th-century',
            loc: { section: 'INDIA viii. Relations: Qajar Period, the 19th Century', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/india-viii-relations-qajar-period-the-19th-century'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Āqā Khan Maḥallātī died in April, 1881, and was buried in a lavish shrine at Ḥasanābād in the Mazagon area of Bombay.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-aqa-khan-mahallati',
            loc: { section: 'ĀQĀ KHAN i. Āqā Khan I Maḥallātī', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqa-khan/aqa-khan-i-aqa-khan-i-ma%e1%b8%a5allati'
          }
        }
      ]
    }
  ]
})
