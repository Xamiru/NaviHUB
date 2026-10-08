import { definePerson } from '../../schema'

export default definePerson({
  id: 'ali-shariati',
  names: [
    { text: 'Ali Shariati', lang: 'en', role: 'primary' },
    { text: 'علی شریعتی', lang: 'fa', role: 'native', translit: 'ʿAli Šariʿati' }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1933' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1977' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1977' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1977' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['scholar', 'writer', 'activist'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Dr_Ali_Shariati.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Dr_Ali_Shariati.jpg',
    credit: { institution: 'drshariati.org' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ʿAli Šariʿati (b. 1933), religious thinker, writer, and activist with popular appeal whose work combined Islamic and Western thought into a radical analysis of Islam and Shiʿism',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1977' }
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
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'Beginning in the mid-1960s, Ali Shari’ati (ʿAli Šariʿati), influenced in part by Naḵšab’s ideas, became a source of inspiration to many religious-minded students and, more specifically, the members of the guerrilla organization, People’s Mojahedin of Iran',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        },
        {
          id: 'q3',
          text: 'Shari’ati made many bold innovations in the interpretation of Shiʿite doctrines, particularly as it applied to the relationship between religion and politics, and he supported the use of violence in transforming society into an Islamic utopia.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        },
        {
          id: 'q4',
          text: 'Among the best known thinkers associated with the IFM was Ali Shariati, who argued for an Islam committed to political struggle, social justice, and the cause of the deprived classes.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Opposition Movements', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/20.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Ayatollah Mortaza Motahhari (Mortażā Moṭahhari), who, along with Shari’ati, is considered as the ideologue of the Islamic Revolution,',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '50'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'rahnema-1998-an-islamic-utopian', perspective: 'iranian' }
  ]
})
