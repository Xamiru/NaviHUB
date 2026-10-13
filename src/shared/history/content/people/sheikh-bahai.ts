import { definePerson } from '../../schema'

export default definePerson({
  id: 'sheikh-bahai',
  names: [
    { text: 'Sheikh Bahai', lang: 'en', role: 'primary' },
    { text: 'شیخ بهایی', lang: 'fa', role: 'native', translit: 'Šaikh Bahāʾī' },
    {
      text: 'Bahāʾ-al-Dīn ʿĀmelī',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-kohlberg-bahai-al-din-ameli',
          loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '1' }
        }
      ]
    },
    {
      text: 'Shaikh Bahāʾī',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-kohlberg-bahai-al-din-ameli',
          loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1547-02-18' },
        cites: [
          {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1621-08-30' },
        cites: [
          {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '3' }
          }
        ]
      },
      {
        value: { d: '1622-08-20' },
        cites: [
          {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  roles: ['cleric', 'scholar', 'writer'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Statue_of_Sheikh_Bahai_in_Isfah%C3%A1n_%28Hasht_Behesht_parc%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Statue_of_Sheikh_Bahai_in_Isfah%C3%A1n_(Hasht_Behesht_parc).jpg',
    credit: { creator: 'Clemens Schmillen' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Bahāʾī was a prolific writer, composing perhaps as many as one hundred works in both Arabic and in Persian.',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        },
        {
          id: 'q2',
          text: 'BAHĀʾ-AL-DĪN ʿĀMELĪ, SHAIKH MOḤAMMAD B. ḤOSAYN BAHĀʾĪ, also known as Shaikh Bahāʾī, Imami scholar and author born near Baalbek on 27 Ḏu’l-ḥejja 953/18 February 1547 (other dates are also given).',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Bahāʾī’s father was appointed by Shah Ṭahmāsb I (r. 930/1524-984/1576) to serve as šayḵ-al-eslām in several important cities to propagate Twelver Shiʿism among the populace.',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Bahāʾī’s erudition won him the admiration of Shah ʿAbbās I (r. 996/1588-1038/1629), who appointed him šayḵ-al-eslām of Isfahan after the death of the previous incumbent, Bahāʾī’s father-in-law Zayn-al-Dīn ʿAlī Menšār ʿĀmelī (from whom Bahāʾī inherited a particularly rich library).',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        },
        {
          id: 'q5',
          text: 'Bahāʾī was active in the service of the Safavid state and advocated the expansion of the powers of the ʿolamāʾ.',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q6',
          text: 'Bahāʾī was also a poet, and is best remembered for his two allegorical maṯnawīs, Nān o ḥalwā and Šīr o šakar',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        },
        {
          id: 'q7',
          text: 'His interest in the sciences is evident in works such as the astronomical treatise Fī tašrīḥ al-aflāk (Anatomy of the heavens)',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'He spent his last years in Isfahan, and died there on 12 Šawwāl 1030/30 August 1621 (or 12 Šawwāl 1031/20 August 1622).',
          lang: 'en',
          cite: {
            source: 'iranica-kohlberg-bahai-al-din-ameli',
            loc: { section: 'ʿĀMELĪ, BAHĀʾ-AL-DĪN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%ca%bfameli-baha%ca%be-al-din'
          }
        }
      ]
    }
  ]
})
