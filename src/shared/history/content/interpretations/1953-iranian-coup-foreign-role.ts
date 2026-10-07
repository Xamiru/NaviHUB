import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1953-iranian-coup-foreign-role',
  about: ['event:1953-iranian-coup'],
  topic: 'foreign-role',
  framing: {
    id: 'q1',
    text: 'The 1953 coup remains a topic of global interest because so much about it is still under intense debate. Even fundamental questions — who hatched the plot, who ultimately carried it out, who supported it inside Iran, and how did it succeed — are in dispute.[1]',
    lang: 'en',
    cite: {
      source: 'nsarchive-ebb-435-cia-confirms-role-in-1953-iran-coup',
      loc: { section: 'CIA Confirms Role in 1953 Iran Coup' }
    },
    provenance: { via: 'web', at: '2026-10-07', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB435/' }
  },
  positions: [
    {
      id: 'anglo-american-operation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mark J. Gasiorowski' },
        { kind: 'scholar', name: 'Fakhreddin Azimi' },
        { kind: 'scholar', name: 'Ervand Abrahamian', discipline: 'historian' },
        { kind: 'scholar', name: 'Christopher de Bellaigue' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'It was agreed to develop and implement a plan, code-named AJAX, to overthrow Moṣaddeq and install Zāhedī as prime minister. AJAX was to be carried out by the C.I.A. under the direction of Kermit Roosevelt. The British were to help plan AJAX and to make the services of the Rašīdīān brothers and other intelligence agents available to Roosevelt’s team.',
          lang: 'en',
          cite: {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/coup-detat-1953/'
          }
        },
        {
          id: 'q3',
          text: 'Following the Republican victory in the US presidential elections in November 1952, joint CIA-MI6 operations to unseat Moṣaddeq were launched, culminating in the intensive campaign of the final weeks of his premiership (see CIA; COUP D’ÉTAT OF 1953).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q4',
          text: '“The new documents firmly reinforce the standard view that the coup would not have occurred without the active participation of the Americans — especially the CIA and the embassy.”',
          lang: 'en',
          cite: {
            source: 'responsible-statecraft-2021-larison-revisionists-1953-coup',
            loc: {
              section: 'Revisionists want to downplay U.S. role in 1953 Iran coup',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://responsiblestatecraft.org/2021/07/02/revisionists-want-to-downplay-u-s-role-in-1953-iran-coup-dont-listen/'
          }
        },
        {
          id: 'q5',
          text: 'In fact, Roosevelt and his fellow plotters were as integral to the second coup attempt as they had been to the first; indeed, the two attempts were separate phases of the same operation.',
          lang: 'en',
          cite: { source: 'foreign-affairs-2014-coupdunnit', loc: { section: 'Coupdunnit' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.foreignaffairs.com/articles/middle-east/2014-08-11/coupdunnit'
          }
        }
      ],
      standing: {
        label: 'mainstream',
        quote: {
          id: 'q6',
          text: 'According to a recent surge of revisionist accounts, the U.S. role was not that great, but hundreds of documents released by the U.S. government in 2017 have confirmed the standard view that the U.S. role was significant and indeed crucial to the toppling of the popular prime minister, Mohammed Mossadegh.',
          lang: 'en',
          cite: {
            source: 'responsible-statecraft-2021-larison-revisionists-1953-coup',
            loc: { section: 'Revisionists want to downplay U.S. role in 1953 Iran coup', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://responsiblestatecraft.org/2021/07/02/revisionists-want-to-downplay-u-s-role-in-1953-iran-coup-dont-listen/'
          }
        }
      }
    },
    {
      id: 'us-government-acknowledgement',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'However, it did not provide any documentation on the role of the Central Intelligence Agency (CIA) in the formulation of U.S. policy toward Iran or documentation on the covert action that led to the overthrow of Iranian Prime Minister Dr. Mohammad Mosadeq on August 19, 1953.',
          lang: 'en',
          cite: { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Preface', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1951-54Iran/preface'
          }
        },
        {
          id: 'q8',
          text: 'This Foreign Relations retrospective volume focuses on the use of covert operations by the Truman and Eisenhower administrations as an adjunct to their respective policies toward Iran, culminating in the overthrow of the Mosadeq government in August 1953.',
          lang: 'en',
          cite: { source: 'frus-1952-1954-iran-1951-1954', loc: { section: 'Preface', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1951-54Iran/preface'
          }
        },
        {
          id: 'q9',
          text: 'In 1953 the United States played a significant role in orchestrating the overthrow of Iran\'s popular Prime Minister, Mohammed Massadegh. The Eisenhower Administration believed its actions were justified for strategic reasons; but the coup was clearly a setback for Iran\'s political development. And it is easy to see now why many Iranians continue to resent this intervention by America in their internal affairs.',
          lang: 'en',
          cite: {
            source: 'albright-2000-03-17-remarks-on-american-iranian-relations',
            loc: { section: 'Remarks on American-Iranian Relations' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2000/http://secretary.state.gov/www/statements/2000/000317.html'
          }
        },
        {
          id: 'q10',
          text: 'In the middle of the Cold War, the United States played a role in the overthrow of a democratically elected Iranian government.',
          lang: 'en',
          cite: {
            source: 'obama-2009-06-04-remarks-at-cairo-university',
            loc: { section: 'Remarks by the President at Cairo University', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://obamawhitehouse.archives.gov/the-press-office/remarks-president-cairo-university-6-04-09'
          }
        }
      ]
    },
    {
      id: 'islamic-republic-narrative',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'This is the event: the Mosaddeq administration – that had managed to release oil, the national wealth of the country, from the claws and hands of the English with the help of other people who existed in those days such as the late Ayatollah Kashani and others – made a historical mistake which was relying on America. He thought that he would have a supporter in international arenas against the enmity of the English. On that day, he believed that that supporter was America. He trusted the Americans and his hopes were pinned on them. The Americans used this optimism and naivety and staged the coup d’état of the 28th of Mordad.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-the-unforgettable-coup-detat',
            loc: { section: 'The unforgettable coup d’état', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/6978/The-unforgettable-coup-d-%C3%A9tat'
          }
        },
        {
          id: 'q12',
          text: 'The differences between the Iranian nation and the US began on the 28th of Mordad[19 August 1953] and even before that. On the 28th of Mordad, the differences reached their peak. It was they who behaved in a treacherous and malicious way by making the Iranian nation suffer from a corrupt and dependent regime as a result of a coup d’état. That was not a minor event!',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-us-enmity-against-the-iranian-nation',
            loc: {
              section: 'Does U.S. enmity against the Iranian nation stem from the 1979 Revolution?',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/7155/Does-U-S-enmity-against-the-Iranian-nation-stem-from-the-1979'
          }
        }
      ],
      reception: [
        {
          id: 'q13',
          text: 'The issue is more than academic. Political partisans on all sides, including the Iranian government, regularly invoke the coup to argue whether Iran or foreign powers are primarily responsible for the country\'s historical trajectory, whether the United States can be trusted to respect Iran\'s sovereignty, or whether Washington needs to apologize for its prior interference before better relations can occur.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-435-cia-confirms-role-in-1953-iran-coup',
            loc: { section: 'CIA Confirms Role in 1953 Iran Coup' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB435/' }
        }
      ]
    },
    {
      id: 'pahlavi-national-rising',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Imperial State of Iran' },
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q14',
          text: 'I think the American authorities were fully aware of these inconsistencies, but naturally felt that it was up to us Persians to solve our political problems.',
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
        },
        {
          id: 'q15',
          text: 'That is exactly what we proceeded to do.',
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
        },
        {
          id: 'q16',
          text: 'The people, the ordinary people of my country — unarmed or carrying only sticks — had stormed the prison.',
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
      ],
      reception: [
        {
          id: 'q17',
          text: 'So regarding the events of August 1953, when the shah fled his country after unsuccessfully challenging its constitutionally elected prime minister, only to be restored a few days later after a military coup, both sides stuck to the story that the shah’s loyal subjects were responsible for his salvation.',
          lang: 'en',
          cite: { source: 'foreign-affairs-2014-coupdunnit', loc: { section: 'Coupdunnit' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.foreignaffairs.com/articles/middle-east/2014-08-11/coupdunnit'
          }
        },
        {
          id: 'q18',
          text: '1953 With American and British backing, prime minister Moṣaddeq is dismissed by the Shah after Moṣaddeq dissolves the Majles, inadvertently giving the Shah a free hand to choose another premier; Moṣaddeq’s resistance to this move fails and General Fażl-Allāh Zāhedi takes over as prime minister; the move is generally conceived as a coup d’état by the Shah and his foreign allies.',
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
      id: 'second-coup-an-iranian-initiative',
      category: 'revisionist',
      holders: [
        { kind: 'scholar', name: 'Ray Takeyh' }
      ],
      statements: [
        {
          id: 'q19',
          text: 'In the heady days of August 1953, Iran witnessed not one but two coup attempts. It is indisputable that the United States was complicit in the first one, which failed when Mosaddeq refused to accept the shah’s order to step down. At that point, Washington gave up on the idea of ousting Mosaddeq and even considered mending fences with him. For that reason, the second coup was very much an Iranian initiative; Iranian royalists had more at stake and more to lose than the Americans. When the shah triumphantly returned to Tehran, a bewildered White House was overjoyed by its unexpected good fortune.',
          lang: 'en',
          cite: { source: 'foreign-affairs-2014-coupdunnit', loc: { section: 'Coupdunnit' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.foreignaffairs.com/articles/middle-east/2014-08-11/coupdunnit'
          }
        },
        {
          id: 'q20',
          text: 'The fact is that Iranian military officers had their own reasons for plotting against Mosaddeq, and they required neither instigation nor instruction from Roosevelt.',
          lang: 'en',
          cite: { source: 'foreign-affairs-2014-coupdunnit', loc: { section: 'Coupdunnit' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.foreignaffairs.com/articles/middle-east/2014-08-11/coupdunnit'
          }
        }
      ],
      reception: [
        {
          id: 'q21',
          text: 'Now, Ray Takeyh (“What Really Happened in Iran,” July/August 2014) has tried to rehabilitate the same discredited myths that prevailed during the shah’s time.',
          lang: 'en',
          cite: { source: 'foreign-affairs-2014-coupdunnit', loc: { section: 'Coupdunnit' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.foreignaffairs.com/articles/middle-east/2014-08-11/coupdunnit'
          }
        },
        {
          id: 'q22',
          text: 'At the same time, Takeyh adduces no evidence to support his claim that without the CIAs involvement, the events of 1953 would have ended in the same result.',
          lang: 'en',
          cite: { source: 'foreign-affairs-2014-coupdunnit', loc: { section: 'Coupdunnit' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.foreignaffairs.com/articles/middle-east/2014-08-11/coupdunnit'
          }
        },
        {
          id: 'q23',
          text: 'At the end of the book, Abrahamian takes on the revisionists directly, and notes that the new documents “do not bolster” their case at all.',
          lang: 'en',
          cite: {
            source: 'responsible-statecraft-2021-larison-revisionists-1953-coup',
            loc: {
              section: 'Revisionists want to downplay U.S. role in 1953 Iran coup',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://responsiblestatecraft.org/2021/07/02/revisionists-want-to-downplay-u-s-role-in-1953-iran-coup-dont-listen/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
