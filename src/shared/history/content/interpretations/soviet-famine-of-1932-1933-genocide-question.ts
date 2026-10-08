import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'soviet-famine-of-1932-1933-genocide-question',
  about: ['event:soviet-famine-of-1932-1933'],
  topic: 'nature',
  researched: '2026-10-09',
  framing: {
    id: 'q1',
    text: 'There is general agreement among scholars that the Holodomor resulted from the actions of Soviet authorities and was thus man-made and avoidable.',
    lang: 'en',
    cite: {
      source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
      loc: { section: 'Was the Holodomor a Genocide?', para: '11' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
    }
  },
  positions: [
    {
      id: 'ukraine-genocide',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Ukraine (Ministry of Foreign Affairs)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Today marks the 90th anniversary of one of the worst Soviet crimes, the Holodomor-Genocide of 1932–1933, organized by Stalin\'s totalitarian regime in Ukraine.',
          lang: 'en',
          cite: {
            source: 'ukraine-mfa-2023-11-25-holodomor-90th-anniversary',
            loc: { section: 'Comment of the MFA of Ukraine', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20250118111845/https://mfa.gov.ua/en/news/komentar-mzs-ukrayini-do-90-h-rokovin-golodomoru-1932-1933-rokiv-v-ukrayini'
          }
        },
        {
          id: 'q3',
          text: 'Since Ukraine\'s independence, 28 states and 3 international organizations, including the European Parliament and the Parliamentary Assembly of the Council of Europe, have recognized the Holodomor of 1932–1933 as genocide against the Ukrainian people.',
          lang: 'en',
          cite: {
            source: 'ukraine-mfa-2023-11-25-holodomor-90th-anniversary',
            loc: { section: 'Comment of the MFA of Ukraine', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20250118111845/https://mfa.gov.ua/en/news/komentar-mzs-ukrayini-do-90-h-rokovin-golodomoru-1932-1933-rokiv-v-ukrayini'
          }
        }
      ],
      reception: [
        {
          id: 'q18',
          text: 'The decisions made to ratchet up repressions against those who failed to meet the grain-delivery quotas, who were usually also accused of sabotage and counterrevolutionary activities, and the expansion of the list of those to be sought out and punished to include ‘nationalists’ highlights the national dimension to the new repressive policies.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        },
        {
          id: 'q19',
          text: 'Stalin’s response was catastrophic for Ukraine. Under his urging',
          lang: 'en',
          cite: {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
          }
        }
      ]
    },
    {
      id: 'european-parliament-genocide',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'European Parliament' }
      ],
      statements: [
        {
          id: 'q4',
          text: '1. Recognises the Holodomor, the artificial famine of 1932-1933 in Ukraine caused by a deliberate policy of the Soviet regime, as a genocide against the Ukrainian people, as it was committed with the intent to destroy a group of people by deliberately inflicting conditions of life calculated to bring about its physical destruction;',
          lang: 'en',
          cite: {
            source: 'european-parliament-2022-12-15-holodomor-resolution',
            loc: { section: 'Paragraph 1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20241229203021/https://www.europarl.europa.eu/doceo/document/TA-9-2022-0449_EN.html'
          }
        },
        {
          id: 'q5',
          text: 'calls on the Russian Federation, as the primary successor of the Soviet Union, to officially recognise the Holodomor and to apologise for those crimes;',
          lang: 'en',
          cite: {
            source: 'european-parliament-2022-12-15-holodomor-resolution',
            loc: { section: 'Paragraph 5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20241229203021/https://www.europarl.europa.eu/doceo/document/TA-9-2022-0449_EN.html'
          }
        }
      ],
      reception: [
        {
          id: 'q15',
          text: 'Grain exports continued during the worst months of the famine, and Soviet government reserves contained enough grain to feed the starving. When aid was first authorized in February 1933, it was selective, and not nearly enough grain was released to save millions from starvation.',
          lang: 'en',
          cite: {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
          }
        }
      ]
    },
    {
      id: 'us-commission-genocide',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'United States Commission on the Ukraine Famine' }
      ],
      statements: [
        {
          id: 'q6',
          text: '16) Joseph Stalin and those around him committed genocide against Ukrainians in 1932-1933.',
          lang: 'en',
          cite: {
            source: 'us-commission-ukraine-famine-1988-report',
            loc: { section: 'Executive Summary: Findings' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/investigationofu00unit_0/investigationofu00unit_0_djvu.txt'
          }
        }
      ],
      reception: [
        {
          id: 'q17',
          text: 'It appears that Stalin viewed the CP(B)U leaders’ reluctance to support the centrally imposed grain procurements unconditionally, and lower-level Soviet Ukrainian officials’ widespread reluctance and resistance to carrying out procurements as a threat to the unity of the Soviet state. He therefore determined that a preventive strike was needed to repress and destroy those he believed would support Ukrainian autonomy or independence.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        }
      ]
    },
    {
      id: 'russia-no-genocide',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Russian Federation (State Duma)' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'В 1932–1933 голод и болезни, связанные с недоеданием, унесли жизни миллионов человек — граждан СССР, представителей различных народов и национальностей, проживавших преимущественно в сельскохозяйственных районах страны.',
          lang: 'ru',
          cite: {
            source: 'state-duma-2008-04-02-famine-statement',
            loc: {
              section: 'Заявление «Памяти жертв голода 30-х годов на территории СССР»',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://duma.gov.ru/news/1293/' }
        },
        {
          id: 'q8',
          text: '«Эта трагедия не имеет и не может иметь международно установленных признаков геноцида и не должна быль предметом современных политических спекуляций», — говорится в Заявлении.',
          lang: 'ru',
          cite: {
            source: 'state-duma-2008-04-02-famine-statement',
            loc: {
              section: 'Заявление «Памяти жертв голода 30-х годов на территории СССР»',
              para: '4'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://duma.gov.ru/news/1293/' }
        }
      ],
      reception: [
        {
          id: 'q16',
          text: 'The most affected regions in the Russian SFSR were the Northern Caucasia, including the Kuban, which bordered on the Ukrainian SSR, and the Lower Volga.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        }
      ]
    },
    {
      id: 'genocide-scholarship',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Bohdan Klid' },
        { kind: 'scholar', name: 'Andrij Makuch' },
        { kind: 'scholar', name: 'Andrea Graziosi' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'The deliberate destruction of a significant part of the Ukrainian nation—peasants, urban-based intellectuals, and other cultural and political figures—in 1932 and 1933 constitutes genocide by the Stalinist regime',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        },
        {
          id: 'q10',
          text: 'The Italian scholar Andrea Graziosi, in support of the genocide interpretation, has argued that in assessing the issue one must take into account the extremely high mortality rate in Ukraine—triple the mortality rate in Russia. This was caused by the additional measures taken by Soviet authorities that intensified the famine in Ukraine. Graziosi also stresses Stalin’s understanding of the peasant and national questions as closely linked in largely peasant-based countries like Ukraine. He thus concludes that the Ukrainian villages were “indeed targeted to break the peasants, but with the full awareness that the village represented the nation’s spine.”',
          lang: 'en',
          cite: {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
          }
        }
      ]
    },
    {
      id: 'terror-famine',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Robert Conquest' },
        { kind: 'scholar', name: 'Stanislav Kulchytsky' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'In his 1986 study The Harvest of Sorrow, Robert Conquest was the first scholar to describe the Holodomor as a terror-famine.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        },
        {
          id: 'q12',
          text: 'In his thirty years of studying the Holodomor, the Ukrainian historian Stanislav Kulchytsky has added to the evidence and further refined Conquest’s thesis, arguing that the Stalinist terror operation that caused the Holodomor was conducted under the guise of grain collections.',
          lang: 'en',
          cite: {
            source: 'ieu-klid-makuch-famine-genocide-of-1932-3',
            loc: { section: 'Famine-Genocide of 1932–3', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CF%5CA%5CFamine6Genocideof1932hD73.htm'
          }
        }
      ]
    },
    {
      id: 'not-genocide-scholarship',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'R. W. Davies' },
        { kind: 'scholar', name: 'Stephen G. Wheatcroft' }
      ],
      statements: [
        {
          id: 'q13',
          text: 'However, some scholars as well as political figures have argued that the charge of genocide in Ukraine cannot be substantiated because famine occurred at the same time in other republics of the Soviet Union, including Russia.',
          lang: 'en',
          cite: {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
          }
        },
        {
          id: 'q14',
          text: 'Two scholars of the Soviet Union, Robert E. Davies and Stephen G. Wheatcroft, have argued that the Soviet leadership caused the famine partly through “wrongheaded policies,” but that it was “unexpected and undesirable.” The famine, they argue, was “a consequence of the decision to industrialise this peasant country [the Soviet Union] at breakneck speed.”',
          lang: 'en',
          cite: {
            source: 'klid-2013-holodomor-and-un-genocide-convention-criteria',
            loc: { section: 'Was the Holodomor a Genocide?', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://holodomor.ca/resource/was-the-holodomor-a-genocide/'
          }
        }
      ]
    }
  ]
})
