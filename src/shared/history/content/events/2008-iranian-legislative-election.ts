import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2008-iranian-legislative-election',
  names: [
    { text: '2008 Iranian legislative election', lang: 'en', role: 'primary' },
    { text: 'انتخابات هشتمین دوره مجلس شورای اسلامی', lang: 'fa', role: 'native' },
    { text: 'Eighth Majles election', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  type: 'election',
  start: {
    alts: [
      {
        value: { d: '2008-03-14' },
        cites: [
          {
            source: 'iran-data-portal-2008-parliamentary-election',
            loc: { section: '2008 Parliamentary Election' }
          },
          {
            source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
            loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
          loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
          loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '4' }
        }
      ]
    },
    {
      ref: 'person:mohammad-khatami',
      role: 'participant',
      cites: [
        {
          source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
          loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '11' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:2004-iranian-legislative-election',
      rel: 'preceded-by',
      cites: [
        {
          source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
          loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '4' }
        }
      ]
    },
    {
      ref: 'period:presidency-of-mahmoud-ahmadinejad',
      rel: 'related',
      cites: [
        {
          source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
          loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Candidates competing for 290 seats in the republic’s eighth parliament must submit to evaluations by both the Interior Ministry and an unelected body of 12 religious jurists known as the Guardian Council.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
            loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2008/03/12/iran-reformist-candidates-barred-election'
          }
        },
        {
          id: 'q2',
          text: 'Iran’s exclusionary process of vetting candidates for the March 14 parliamentary elections violates the principles of a free and fair election, Human Rights Watch said today.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
            loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2008/03/12/iran-reformist-candidates-barred-election'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The Guardian Council and members of the political elite then carried out a series of secret negotiations for over a month, leading to the reinstatement of some disqualified candidates and the exclusion of others.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
            loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2008/03/12/iran-reformist-candidates-barred-election'
          }
        },
        {
          id: 'q4',
          text: 'The slate of candidates approved for the election shows that reformists have been permitted to stand for only a minority of the seats and therefore factions close to Supreme Leader Ayatollah Khamenei will win a majority.',
          lang: 'en',
          cite: {
            source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
            loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/news/2008/03/12/iran-reformist-candidates-barred-election'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '2008-01' },
            cites: [
              {
                source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
                loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'In January 2008, the Ministry of Interior announced that it had rejected more than 2,000 out of 7,597 applicants, citing such reasons for disqualifying candidates as “having ill repute in their place of residency,” “insulting religious sanctities,” and “acting against the state.”',
        lang: 'en',
        cite: {
          source: 'hrw-2008-03-12-iran-reformist-candidates-barred-from-election',
          loc: { section: 'Iran: Reformist Candidates Barred From Election', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.hrw.org/news/2008/03/12/iran-reformist-candidates-barred-election'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/National_Consultative_Majlis.JPG/1280px-National_Consultative_Majlis.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:National_Consultative_Majlis.JPG',
    credit: { creator: 'Mahdifa33' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
