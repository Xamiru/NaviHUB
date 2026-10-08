import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iranian-revolution-causes',
  about: ['event:iranian-revolution'],
  topic: 'causes',
  positions: [
    {
      id: 'unholy-alliance-of-red-and-black',
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
          id: 'q1',
          text: 'How can communists, plutocratic bazaaris, and Islamic clergy join hands in the same revolution? One cannot imagine such divergent philosophies coalescing.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'Looking back, the uprisings in Tabriz marked the beginning of efforts to reduce my authority, to turn me into a weak and ineffectual “constitutional” monarch, and finally to oust me.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'If SAVAK had only been as effective as my enemies claimed, they would not have been out in the streets shouting vilifications. By November 1978 our total prison population was only 300—this in a nation of 35 million!',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ],
      reception: [
        {
          id: 'q14',
          text: 'In the 1980s Šojāʿ-al-Dīn Šafā, a former Persian deputy court minister for cultural affairs, developed another conspiracy theory, based on ideas in the deposed shah’s last book (M. R. Pahlavi, 1980, p. 145) that a “strange amalgam”—among the Shiʿite clergy, leftists, Western media, major oil companies, and the British and American governments',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'ideological-and-islamic-revolution',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The basic characteristic of this revolution, which distinguishes it from other movements that have taken place in Iran during the past hundred years, is its ideological and Islamic nature.',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
          }
        },
        {
          id: 'q5',
          text: 'The movement continued on this course until finally popular dissatisfaction and intense rage of the public caused by the constantly increasing repression at home, and the projection of the struggle at the international level after exposure of the regime by the \'ulama\' and militant students, shook the foundations of the regime violently. The regime and its sponsors were compelled to decrease the intensity of repression and to "liberalize" the political atmosphere of the country. This, they imagined, will serve as a safety valve, which would prevent their eventual downfall. But the people, aroused, conscious, and resolute under the decisive and unfaltering leadership of the Imam, embarked on a triumphant, unified, comprehensive, and countrywide uprising.',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
          }
        },
        {
          id: 'q6',
          text: 'This great movement, which attained victory through reliance upon faith, unity, and the decisiveness of its leadership at every critical and sensitive juncture, as well as the self-sacrificing spirit of the people,',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
          }
        }
      ],
      reception: [
        {
          id: 'q16',
          text: 'Clerics led by Ayatollah Mohammad Beheshti established the Islamic Republican Party (IRP). The party emerged as the organ of the clerics around Khomeini and the major political organization in the country.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE REVOLUTION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/23.htm' }
        }
      ]
    },
    {
      id: 'american-hand-behind-the-shah',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'For many years, our country would be trampled upon by the regime which had been installed by the US.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-us-enmity-against-the-iranian-nation',
            loc: {
              section: 'Does U.S. enmity against the Iranian nation stem from the 1979 Revolution?',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/7155/Does-U-S-enmity-against-the-Iranian-nation-stem-from-the-1979'
          }
        }
      ],
      reception: [
        {
          id: 'q15',
          text: 'After the C.I.A. had engineered the 1332 Š./1953 coup that overthrew the Moṣaddeq government, the dominant position of the United States in Persia began to be reflected in conspiracy theories',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'tensions-of-modernisation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'Such explosions of unrest as occurred during the 1951-53 oil nationalization crisis and the 1963 riots during the Muslim month of Moharram, indicated that there were major unresolved tensions in Iranian society, however. These stemmed from inequities in wealth distribution; the concentration of power in the hands of the crown and bureaucratic, military, and entrepreneurial elites; the demands for political participation by a growing middle class and members of upwardly mobile lower classes; a belief that Westernization posed a threat to Iran\'s national and Islamic identity; and a growing polarization between the religious classes and the state.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'History', para: '9' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/3.htm' }
        }
      ]
    },
    {
      id: 'oil-wealth-and-inequality',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'As a result, Persia’s oil revenue jumped from USD 1.1 billion in 1970 to 21 billion in 1977. The newly found riches promoted consumerism and stimulated a variety of industrial, entrepreneurial, and importing ventures that tended to clog the ports and the economy as well. The gap between the rich and the poor widened, and this lent further strength to the Islamic protest movement.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      id: 'hasty-expansion-after-the-oil-boom',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'M. Hashem Pesaran' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'The shah’s response, against expert and ministerial advice, was a further hasty expansion of the industrial sector with greater reliance on Western technology and cultural practices, foreign experts, and imported workers. Inevitably, these economic policies exacerbated already entrenched social and economic inequalities and helped create fertile grounds for the flourishing of social discontent and revolutionary upheavals.',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        }
      ]
    },
    {
      id: 'khomeini-and-the-converging-currents',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ahmad Ashraf' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'With the emergence of Ayatollah Khomeini as a militant populist in the 1960s-70s, combining personal charisma and the will to power with the spiritual charisma embedded in the office of the Shiʿite source of emulation, all variants of Islamic political currents gradually found a place under the canopy of his leadership. They were later joined by a large number of leftist and liberal political forces in the final years of the 1970s, contributing in various ways to the success of the 1977-79 Revolution',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-islamic-political-movements',
            loc: {
              section: 'ISLAM IN IRAN xiii. ISLAMIC POLITICAL MOVEMENTS IN 20TH CENTURY IRAN',
              para: '23'
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
      id: 'three-paradigms-of-the-coalition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mohsen M. Milani' }
      ],
      statements: [
        {
          id: 'q12',
          text: 'Behind these multiple centers of power within the new regime, three paradigms for Iran’s future collided. In the first paradigm, which Bāzargān symbolized, Iran was to become a democratic presidential system, with the Shiʿite ʿolamāʾ playing a supervisory role in the affairs of state. In the second paradigm, advocated by leftist Islamists, Iran was to become an Islamic society, defined by social and economic justice. The leftist Islamists sought economic self-sufficiency, limits on agricultural landholding, nationalization of major industries, progressive labor and social welfare legislation; and they opposed rapprochement with the West, especially the United States. These followers of ʿAli Šariʿati, the “ideologue” of the Islamic revolution, supported Khomeini because of his charismatic authority and not his “incumbency of the office of the supreme guide ‘wali-e faqih,’ “ (Ashraf and Banuazizi, 2001, pp. 240-41). In the third paradigm, which Ayatollah Khomeini championed, Iran was to become a puritanical Islamic theocracy, with the ʿolamāʾ as its rulers.',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      id: 'unforeseen-by-outside-observers',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q13',
          text: 'to the manifest dismay and astonishment of the United States and other outside powers, not to mention most Western scholars claiming expertise on Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
