import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'rushdie-fatwa-legitimacy',
  about: ['event:rushdie-fatwa'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'khomeini-and-the-islamic-republic',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ruhollah Khomeini', ref: 'person:ruhollah-khomeini' },
        { kind: 'participant', name: 'Ali Khamenei', ref: 'person:ali-khamenei' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'I am informing all brave Muslims of the world that the author of The Satanic Verses , a text written, edited, and published against Islam, the Prophet of Islam, and the Qu’ran, along with all the editors and publishers aware of its contents, are condemned to death. I call on all valiant Muslims wherever they may be in the world to kill them without delay, so that no one will dare insult the sacred beliefs of Muslims henceforth. Whoever is killed in this cause will be a martyr, God Willing. Meanwhile if someone has access to the author of the book but is incapable of carrying out the execution, he should inform the people so that [Rushdie] is punished for his actions.',
          lang: 'en',
          cite: {
            source: 'iran-data-portal-fatwa-against-salman-rushdie',
            loc: { section: 'Fatwa against Salman Rushdie', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://irandataportal.syr.edu/fatwa-against-salman-rushdie'
          }
        },
        {
          id: 'q2',
          text: 'Though Rushdie publicly apologized, the fatwa was not revoked, Imam Khomeini explaining that "even if Salman Rushdie repents and becomes the most pious man of all time, it is incumbent on every Muslim to employ everything he has got, his life and wealth, to send him to Hell."',
          lang: 'en',
          cite: {
            source: 'imam-khomeini-ir-2019-02-18-imam-khomeini-exposed-rushdies-blasphemy',
            loc: { section: 'Imam Khomeini exposed Rushdie\'s blasphemy', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230610111729/http://en.imam-khomeini.ir/en/n29996/Imam-Khomeini-exposed-Rushdie-s-blasphemy'
          }
        },
        {
          id: 'q3',
          text: 'Both Shi‘a and Sunni Muslim jurisprudents have concession and decrees on the issue of heresy. From this perspective, an apostate is the one who renounces a religious or political belief or principle, not a person who is doubtful about principles of religion.',
          lang: 'en',
          cite: {
            source: 'imam-khomeini-ir-2019-02-18-imam-khomeini-exposed-rushdies-blasphemy',
            loc: { section: 'Imam Khomeini exposed Rushdie\'s blasphemy', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230610111729/http://en.imam-khomeini.ir/en/n29996/Imam-Khomeini-exposed-Rushdie-s-blasphemy'
          }
        },
        {
          id: 'q4',
          text: 'Imam’s decree on Rushdie was supported from many of the Islamic scholars either in UK or in the entire Muslim world. It was regarded as a sign of protest and opposition to those who had fostered in mind to degrade the position of the Holy Prophet of Islam (pbuh) and show disrespect for the Muslim world sanctities.',
          lang: 'en',
          cite: {
            source: 'imam-khomeini-ir-2019-02-18-imam-khomeini-exposed-rushdies-blasphemy',
            loc: { section: 'Imam Khomeini exposed Rushdie\'s blasphemy', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20230610111729/http://en.imam-khomeini.ir/en/n29996/Imam-Khomeini-exposed-Rushdie-s-blasphemy'
          }
        },
        {
          id: 'q5',
          text: 'The decree is as Imam Khomeini (ra) issued.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2017-02-13-fatwa-on-salman-rushdie',
            loc: {
              section: 'Ayatollah Khamenei\'s fatwa on Salman Rushdie\'s apostasy from Islam',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20250111180921/https://english.khamenei.ir/news/4634/Ayatollah-Khamenei-s-fatwa-on-Salman-Rushdie-s-apostasy-from'
          }
        }
      ],
      reception: [
        {
          id: 'q12',
          text: 'In strictly juristic terms, the fatwā was not particularly remarkable or innovative; even its call for the summary execution of Rushdie without any judicial process was firmly grounded in the existing provisions of Shiʿite (as well as Sunni) jurisprudence. What lent the fatwā particular prominence and impact was its issuance by Ḵomeynī, who was a head of state as well as a marjaʿ, and the context of increasing antagonism between the Islamic and western worlds that surrounded it.',
          lang: 'en',
          cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/fatwa' }
        }
      ]
    },
    {
      id: 'british-government',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'United Kingdom' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'On 14 February, Ayatollah Khomeini made a statement inciting Moslems to violence against Mr. Salman Rushdie, the author, and the publishers of "The Satanic Verses". That was totally incompatible with Iran\'s obligations under the United Nations charter, and with respect for our sovereignty and the rule of law.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        },
        {
          id: 'q7',
          text: 'It was an attack, not only on the author and publishers of the book, but on the fundamental freedoms for which our society stands: the freedom of expression, religious tolerance and the rule of law.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        },
        {
          id: 'q8',
          text: 'Iran has disregarded those standards in the most flagrant and menacing way. The response of the Government and of the other member countries of the European Community is firm and clear. Before normal relations can be restored, Iran must meet her international obligations—in particular, by renouncing the use or threat of violence against citizens of other countries.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        }
      ]
    },
    {
      id: 'opposition-and-british-muslim-voices',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Labour Party' },
        { kind: 'participant', name: 'Zaki Badawi' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'In this free democracy, authors must have the right, within the law, to write and publish freely. In this free democracy, Moslems offended and affronted by what has been published have the right, within the law, to give full expression to their concern, their distress and their sense of serious affront to their religious convictions.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        },
        {
          id: 'q10',
          text: 'Any incitement to violence would be contrary to our faith. It would be slander to imply that Ayatollah Khomeini is an accepted and recognised voice of Moslem opinion. Throughout wide areas of the Islamic world he and his regime are regarded with fear and loathing.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        },
        {
          id: 'q11',
          text: 'Does the Foreign Secretary share our satisfaction that, apart from Libya, no Government of a Moslem country has endorsed the death threat?',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1989-03-08-iran-diplomatic-relations',
            loc: { section: 'Iran (Diplomatic Relations)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/mar/08/iran-diplomatic-relations'
          }
        }
      ]
    },
    {
      id: 'juristic-assessment',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q13',
          text: 'The fatwā was acclaimed throughout the Muslim world and never rescinded.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '104' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
