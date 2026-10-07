import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'trial-of-mohammad-mosaddegh',
  names: [
    { text: 'Trial of Mohammad Mosaddegh', lang: 'en', role: 'primary' },
    { text: 'محاکمه محمد مصدق', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1953' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1953' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:ahmadabad-mosaddegh',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1953' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:mohammad-mosaddegh',
      role: 'victim',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1953' }
        }
      ]
    },
    {
      ref: 'person:hossein-fatemi',
      role: 'victim',
      cites: [
        {
          source: 'iranica-azimi-fatemi-hosayn',
          loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '5' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:1953-iranian-coup', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Mossadeq was sentenced to three years\' imprisonment for trying to overthrow the monarchy, but he was subsequently allowed to remain under house arrest in his village outside Tehran until his death in 1967.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        },
        {
          id: 'q2',
          text: '1953 Trial of Moḥammad Moṣaddeq by a military tribunal; the tribunal sentences him to three years’ imprisonement, but he is subsequently allowed to serve his time under house arrest in Aḥmadābād, a village he owned near Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1953' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Moṣaddeq was convicted of treason several months later and sentenced to three years in prison, after which he remained under house arrest until he died in 1346 Š./1967.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q4',
          text: 'In 1953, when Mossadegh was convicted of treason, I wrote to the court saying that I forgave him for all wrongs he had done to me. Because of this letter and of his advanced age, he escaped the death penalty which in this and most other countries is normal for proved traitors, and received only a light sentence of three years’ imprisonment.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1961-mission-for-my-country',
            loc: { section: 'Mission for My Country' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/mission-for-my-country-mohammad-reza-pahlavi_202605/Mission%20For%20My%20Country%20-%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'On 18 Mehr 1333 Š./10 October 1954, after twelve days of hearings, Fāṭemī was condemned to death by firing squad; an appeal was not successful, and the sentence was carried out a month later.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-fatemi-hosayn',
            loc: { section: 'FĀṬEMĪ, ḤOSAYN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/fatemi/'
          }
        },
        {
          id: 'q6',
          text: 'His minister of foreign affairs, Hosain Fatemi, was sentenced to death and executed.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Trial_of_Mosaddegh_by_Ettelaat_-_First_session_%285%29.jpg/1280px-Trial_of_Mosaddegh_by_Ettelaat_-_First_session_%285%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Trial_of_Mosaddegh_by_Ettelaat_-_First_session_(5).jpg',
    credit: { institution: 'Ettela\'at' },
    license: { id: 'public-domain' }
  }
})
