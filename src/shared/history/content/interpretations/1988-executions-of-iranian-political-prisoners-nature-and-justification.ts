import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1988-executions-of-iranian-political-prisoners-nature-and-justification',
  about: ['event:1988-executions-of-iranian-political-prisoners'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'In the absence of any official acknowledgement of the 1988 prison massacre, the most credible account of these events comes from the memoirs of Ayatollah Hussein Ali Montazeri, who was at the time one of the highest ranking government officials in Iran and the designated successor of Ayatollah Khomeini, then the Supreme Leader.',
    lang: 'en',
    cite: {
      source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
      loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '4' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
    }
  },
  positions: [
    {
      id: 'extrajudicial-mass-executions',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Available evidence points to the fact that in July-September 1988, Iranian authorities executed thousands of prisoners in violation of their fundamental rights with no access to a fair judicial process and thus amounting to extrajudicial executions. The scale of these executions and their implementation as part of a policy also satisfy the widespread and systematic elements of crimes against humanity.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q3',
          text: 'The deliberate and systematic manner in which these extrajudicial executions took place constitutes a crime against humanity under international law.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        }
      ]
    },
    {
      id: 'khomeini-decree',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Ruhollah Khomeini', ref: 'person:ruhollah-khomeini' },
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Since the treacherous monafeqin [hypocrites, term Iranian officials use to refer to MKO members] do not believe in Islam and whatever they say stems from their deception and hypocrisy, and since, as per the admissions of their leaders, they have deserted Islam, and since they wage war against God and are engaging in classical warfare on the western, northern, and southern fronts with the collaboration of the Baathist Party of Iraq, and also they are spying for Saddam [Hussein, Iraq’s late president] against our Muslim nation, and since they are tied to the World Arrogance [US and Western powers] and have inflicted foul blows on the Islamic Republic since its inception, it follows that those who remain steadfast in their position of nefaq [hypocrisy] in prisons throughout the country are considered to be mohareb [waging war against God] and are condemned to execution.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q5',
          text: 'It is naive to show mercy to moharebs. The decisiveness of Islam before the enemies of God is among the unquestionable tenets of the Islamic system. I hope that you satisfy Almighty God with your revolutionary rage and rancor against the enemies of Islam. The gentlemen who are responsible for making the decisions must not hesitate, nor show any doubt or concerns and they must endeavor to be the ‘harshest on non-believers.’ To hesitate in the judicial process of revolutionary Islam is to ignore the pure and holy blood of the martyrs.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        }
      ],
      reception: [
        {
          id: 'q14',
          text: 'The memoirs of Ayatollah Hussein Ali Montazeri, published in 2000, offer the most credible account of the mass executions from a government perspective.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        }
      ]
    },
    {
      id: 'officials-defend-the-executions',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Abdulkarim Mousavi Ardebili' },
        { kind: 'participant', name: 'Mostafa Pourmohammadi' },
        { kind: 'participant', name: 'Ebrahim Raeesi' },
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q6',
          text: '“The judiciary is under very strong pressure from public opinion asking why we even put them [members and supporters of the MKO] on trial, why some of them are jailed, and why all are not executed.… The people say they should all be executed without exception.”',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q7',
          text: '“we are proud to have implemented God’s order.”',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '54' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q8',
          text: '“during that time, I was not the head of the court.… The head of the court issues sentences whereas the prosecutor represents the people.”',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q9',
          text: '“one of the proud achievements of the system”',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'During the executions, several Iranian officials who were in high-ranking positions at the time and were likely aware of these executions denied or downplayed the executions.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        },
        {
          id: 'q13',
          text: 'Many of those executed, especially those affiliated with leftist political parties, were not involved in the ongoing armed conflict between Iran and the MKO.',
          lang: 'en',
          cite: {
            source: 'hrw-2022-06-08-irans-1988-mass-executions',
            loc: { section: 'Iran’s 1988 Mass Executions', para: '80' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.hrw.org/news/2022/06/08/irans-1988-mass-executions'
          }
        }
      ]
    },
    {
      id: 'montazeris-protest',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Hossein-Ali Montazeri',
          ref: 'person:hossein-ali-montazeri'
        }
      ],
      statements: [
        {
          id: 'q11',
          text: 'Carrying out a massacre of prisoners and captives without due process or trail will certainly help our opponent’s cause in the long term. It will also encourage them to carry on armed resistance. The international community will condemn our actions.',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        },
        {
          id: 'q12',
          text: 'Visits to prisoners were suspended for a period of time and, according to people responsible for carrying out these orders, approximately two thousand and eight hundred or three thousand and eight hundred – I can not recall exactly – women and men were executed, relying on the authority of [Ayatollah Khomeini’s] letter. Even people who practiced religious rituals of prayer and fasting were asked to repent, and they would be offended and refuse. Then [the committee] would conclude that the prisoner is still a believer in his cause and ordered their executions!',
          lang: 'en',
          cite: {
            source: 'hrw-2005-ministers-of-murder-pour-mohammadi-and-the-1988-prison-massacres',
            loc: { section: 'Pour-Mohammadi and the 1988 Prison Massacres', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/legacy/backgrounder/mena/iran1205/2.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
