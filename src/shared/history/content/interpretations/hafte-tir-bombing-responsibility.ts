import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'hafte-tir-bombing-responsibility',
  about: ['event:hafte-tir-bombing'],
  topic: 'responsibility',
  positions: [
    {
      id: 'official-iranian-narrative',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'organization', name: 'Imam Khomeini website (en.imam-khomeini.ir)' },
        { kind: 'participant', name: 'Ruhollah Khomeini', ref: 'person:ruhollah-khomeini' },
        { kind: 'participant', name: 'Ali Khamenei', ref: 'person:ali-khamenei' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The bomber, who was as a young student and a Mujahedin operative named Mohammad Reza Kolahi, had long ago penetrated into the party. After planting the bomb inside the party building, Kolahi fled the scene before the explosion. Mujahedin-e khalq terrorist organization officially assumed responsibility for this terrorist operation.',
          lang: 'en',
          cite: {
            source: 'imam-khomeini-ir-2012-martyrdom-of-72-companions',
            loc: { section: 'Martyrdom of 72 Companions of the Imam and the Nation', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20240528074018/http://en.imam-khomeini.ir/en/news/2771/News/Martyrdom_of_72_Companions_of_the_Imam_and_the_Nation'
          }
        },
        {
          id: 'q2',
          text: 'The dear nation, these blind-hearted people who claim that they are fighting for the people (It refers to the hypocritical terrorist organization, which has called itself People Mujahidin Organization.), took the lives of active and friendly servants of the people.',
          lang: 'en',
          cite: {
            source: 'imam-khomeini-ir-2012-martyrdom-of-72-companions',
            loc: { section: 'Martyrdom of 72 Companions of the Imam and the Nation', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20240528074018/http://en.imam-khomeini.ir/en/news/2771/News/Martyrdom_of_72_Companions_of_the_Imam_and_the_Nation'
          }
        },
        {
          id: 'q3',
          text: 'Although supporters of Ayatollah Khomeini had never sympathized with MEK elements, MEK’s enmity became acute when the head of this group was banned from running for presidential elections, which was followed by a heavy MEK loss at parliamentary elections in 1981. It was then that MEK started its terrorist activitites in Iran; they bombed the headquarters of the Islamic Republic Party, which had won both the presidency and the parliament in landslide victories.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2015-11-04-mek-when-terrorists-are-armed',
            loc: { section: 'MEK: When terrorists are armed, funded and respected', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20250104135551/https://english.khamenei.ir/news/2160/MEK-When-terrorists-are-armed-funded-and-respected'
          }
        },
        {
          id: 'q4',
          text: 'Those who used to plan the assassinations were not focused on specific individuals. Their primary goal was to destroy the foundations of the Revolution and strip it of its elites.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2018-06-28-god-blessed-doctor-beheshti-with-martyrdom',
            loc: { section: 'God blessed doctor Beheshti with martyrdom', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20240930062006/https://english.khamenei.ir/news/5773/God-blessed-doctor-Beheshti-with-martyrdom'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'They assassinated the powerful head of the judicial system, Ayatollah Moḥammad Ḥosayni Behešti, Prime Minister Moḥammad-Jawād Bāhonar, and President Moḥammad-ʿAli Rajāʾi',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '30'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/islam-in-iran-xiii-islamic-political-movements-in-20th-century-iran/'
          }
        }
      ]
    },
    {
      id: 'attributed-to-the-mojahedin',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' },
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'the Mojāhedin-e ḵalq claim responsibility for the attack.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1981' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q6',
          text: 'Thereafter the Mojahedin-e Khalq turned to assassination as its modus operandi.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '80' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      id: 'no-group-claimed-responsibility',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Although no group claimed responsibility for the bombings that had killed Iran\'s political leadership, the government blamed the Mojahedin for both.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q8',
          text: 'The Mojahedin did, however, claim responsibility for a spate of other assassinations that followed the overthrow of Bani Sadr.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
