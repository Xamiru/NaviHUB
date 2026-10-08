import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-world-war-responsibility',
  about: ['event:first-world-war'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'Historians have argued over the origins of the First World War for over a hundred years, and the July Crisis is a particularly controversial aspect of this long debate. The fact that in 1919 the victorious allies took the unusual step to attribute “war guilt” to Germany and its allies has resulted in a debate about the origins of the war that was from the start based on arguments over truth and lies.',
    lang: 'en',
    cite: { source: 'eo1418-mombauer-july-crisis-1914', loc: { section: 'Conclusion', para: '1' } },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
    }
  },
  researched: '2026-10-07',
  positions: [
    {
      id: 'war-guilt-clause',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Allied and Associated Powers' },
        { kind: 'participant', name: 'Georges Clemenceau' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'The Allied and Associated Governments affirm and Germany accepts the responsibility of Germany and her allies for causing all the loss and damage to which the Allied and Associated Governments and their nationals have been subjected as a consequence of the war imposed upon them by the aggression of Germany and her allies.',
          lang: 'en',
          cite: {
            source: 'avalon-versailles-treaty-part-viii',
            loc: { section: 'Part VIII, Section I, Article 231' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/partviii.asp' }
        },
        {
          id: 'q9',
          text: 'You see before you the accredited Representatives of the Allied and Associated Powers, both small and great, which have waged without intermission for more than four years the pitiless war which was imposed on them.',
          lang: 'en',
          cite: {
            source: 'frus-1919-paris-v03-plenary-session-1919-05-07',
            loc: { section: 'Address of the President of the Conference' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1919Parisv03/d11'
          }
        }
      ]
    },
    {
      id: 'not-germany-alone',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'German Reich (Weimar government)' },
        { kind: 'participant', name: 'Ulrich von Brockdorff-Rantzau' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'We are required to admit that we alone are war-guilty; such an admission on my lips would be a lie. We are far from seeking to exonerate Germany from all responsibility for the fact that this world war broke out and was waged as it was. The attitude of the former German Government at the Hague Peace Conferences, their actions and omissions in the tragic twelve days of July, may have contributed to the calamity, but we emphatically combat the idea that Germany, whose people were convinced that they were waging a defensive war, should alone be laden with the guilt.',
          lang: 'en',
          cite: {
            source: 'frus-1919-paris-v03-plenary-session-1919-05-07',
            loc: { section: 'Statement of Count Brockdorff-Rantzau' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1919Parisv03/d11'
          }
        },
        {
          id: 'q12',
          text: 'During the last fifty years the imperialism of all European States has chronically poisoned the international situation. The policy of retaliation and that of expansion as well as disregard of the rights of peoples to self-determination, contributed to the disease of Europe, which reached its crisis in the world war. The Russian mobilization deprived statesmen of the possibility of effecting a cure and placed the decision in the hands of the military authorities.',
          lang: 'en',
          cite: {
            source: 'frus-1919-paris-v03-plenary-session-1919-05-07',
            loc: { section: 'Statement of Count Brockdorff-Rantzau' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/historicaldocuments/frus1919Parisv03/d11'
          }
        }
      ],
      reception: [
        {
          id: 'q13',
          text: 'The German Foreign Office established a specialist section (Referat) to attack the “war guilt” clause, as part of its efforts to revise the Treaty of Versailles.',
          lang: 'en',
          cite: {
            source: 'eo1418-mulligan-historiography-of-the-origins-of-the-first-world-war',
            loc: { section: 'Between Politics and History: The Interwar Years', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-historiography-of-the-origins-of-the-first-world-war/'
          }
        },
        {
          id: 'q14',
          text: 'A concern to downplay German acts of aggression influenced the selection and editing of documents. Some of Wilhelm II’s revealing marginal comments on diplomatic traffic were omitted, while other documents were falsified.',
          lang: 'en',
          cite: {
            source: 'eo1418-mulligan-historiography-of-the-origins-of-the-first-world-war',
            loc: { section: 'Between Politics and History: The Interwar Years', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-historiography-of-the-origins-of-the-first-world-war/'
          }
        }
      ]
    },
    {
      id: 'imperialist-war',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Vladimir Lenin' },
        { kind: 'party', name: 'Russian Social-Democratic Labour Party (Bolsheviks)' }
      ],
      statements: [
        {
          id: 'q15',
          text: 'The Anglo-French bourgeoisie are deceiving the people when they say that they are waging war for the freedom of nations and for Belgium; actually they are waging war for the purpose of retaining the colonies they have inordinately grabbed. The German imperialists would free Belgium, etc., at once if the British and French would agree "fairly" to share their colonies with them.',
          lang: 'en',
          cite: {
            source: 'lenin-1915-socialism-and-war',
            loc: {
              section: 'War Between the Biggest Slave-Owners for Preserving and Fortifying Slavery'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/archive/lenin/works/1915/s-w/ch01.htm'
          }
        },
        {
          id: 'q16',
          text: 'It is not the business of Socialists to help the younger and stronger robber (Germany) to rob the older and overgorged robbers. Socialists must take advantage of the struggle between the robbers to overthrow them all. To be able to do this, the Socialists must first of all tell the people the truth, namely, that this war is in a treble sense a war between slave-owners to fortify slavery.',
          lang: 'en',
          cite: {
            source: 'lenin-1915-socialism-and-war',
            loc: {
              section: 'War Between the Biggest Slave-Owners for Preserving and Fortifying Slavery'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/archive/lenin/works/1915/s-w/ch01.htm'
          }
        }
      ]
    },
    {
      id: 'fischer-thesis',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Fritz Fischer' },
        { kind: 'scholar', name: 'William Mulligan' }
      ],
      statements: [
        {
          id: 'q17',
          text: 'From the time of the infamous War Council meeting in December 1912, he argued, German leaders planned a war of aggression. The drive to war resulted from increasing anxiety amongst German elites about the deterioration of the domestic and international stability of the Empire. Crucially, Fischer argued, German leaders had brought this situation upon themselves. At home, they stalled on constitutional changes, while German isolation in international politics was the result of menacing moves over Morocco and the Balkans after the turn of the century. It was a case of self-encirclement.',
          lang: 'en',
          cite: {
            source: 'eo1418-mulligan-historiography-of-the-origins-of-the-first-world-war',
            loc: { section: 'The Fischer Debate', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-historiography-of-the-origins-of-the-first-world-war/'
          }
        }
      ],
      reception: [
        {
          id: 'q18',
          text: 'Conservative historians, notably Ritter and Egmont Zechlin (1896-1992), criticised Fischer’s use of sources, his methodological assumptions, and the political consequences of this revisionist account of the origins of the war. They argued that many of the documents could be interpreted in alternative ways.',
          lang: 'en',
          cite: {
            source: 'eo1418-mulligan-historiography-of-the-origins-of-the-first-world-war',
            loc: { section: 'The Fischer Debate', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-historiography-of-the-origins-of-the-first-world-war/'
          }
        }
      ],
      standing: {
        label: 'majority',
        quote: {
          id: 'q11',
          text: 'By the 1970s, Fischer’s thesis had become the new orthodoxy.',
          lang: 'en',
          cite: {
            source: 'eo1418-mulligan-historiography-of-the-origins-of-the-first-world-war',
            loc: { section: 'The Fischer Debate', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-historiography-of-the-origins-of-the-first-world-war/'
          }
        }
      }
    },
    {
      id: 'central-powers-chiefly-responsible',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Annika Mombauer' },
        { kind: 'scholar', name: 'Richard Hamilton' },
        { kind: 'scholar', name: 'Holger Herwig' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In 2003, Richard Hamilton and Holger Herwig contended: “Lloyd George’s notion of the innocent or unintended ‘slide’ stands sharply opposed to the evidence now available”.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        },
        {
          id: 'q4',
          text: 'If all leaders are considered responsible, then arguably they were not equally so. In the governments of the Central Powers, a deliberate decision was taken to use the “golden opportunity” of the Sarajevo crime as a trigger for a war that they had long wanted to fight, and that they considered unavoidable in the long run.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ]
    },
    {
      id: 'shared-responsibility',
      category: 'revisionist',
      holders: [
        { kind: 'scholar', name: 'Christopher Clark' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'There is no smoking gun in this story; or, rather, there is one in the hands of every major character,',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Eschewing to place any blame or responsibility harks back to David Lloyd George (1863-1945), whereas most accounts of the origins of the war since the 1960s have sought to advance arguments which foreground the culpability of some governments over those of others whilst weighing up evidence for all.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'Conclusion', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ]
    },
    {
      id: 'russian-mobilisation',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Historians who attribute responsibility to Russia' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Much has been made of this early decision by historians who attribute responsibility for the war to Russia.',
          lang: 'en',
          cite: {
            source: 'eo1418-mombauer-july-crisis-1914',
            loc: { section: 'The Ultimatum and Mediation Attempts', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/july-crisis-1914/'
          }
        }
      ]
    }
  ]
})
