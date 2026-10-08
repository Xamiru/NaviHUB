import { defineTheme } from '../../schema'

export default defineTheme({
  id: 'iran-and-russia',
  names: [
    { text: 'Iran and Russia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  regions: ['iran', 'russia-central-asia'],
  thread: [
    { ref: 'polity:russian-empire' },
    { ref: 'event:russian-annexation-of-georgia' },
    {
      ref: 'event:russo-persian-war-1804-1813',
      quote: {
        id: 'q5',
        text: 'Hoping to receive assistance against the Russian aggression, Fatḥ-ʿAli Shah became caught in diplomatic intrigues resulting in several agreements with the British, the French, and European diplomatic and military missions sent to Iran, as well as involved in attempts at military reforms in Iran at first under French, and later under British military instructors.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '18'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      ref: 'person:abbas-mirza',
      quote: {
        id: 'q6',
        text: 'ʿAbbās Mirzā was preparing to refight the war and, ignoring the reality of overwhelming Russian military and economic power, hoped to win back all the ceded Caucasian territories.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '21'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    { ref: 'event:treaty-of-golestan' },
    { ref: 'event:russo-persian-war-1826-1828' },
    { ref: 'event:treaty-of-turkmenchay' },
    { ref: 'event:murder-of-alexander-griboedov' },
    { ref: 'event:russian-conquest-of-central-asia' },
    {
      ref: 'event:reuter-concession',
      quote: {
        id: 'q7',
        text: 'Russian opposition, augmented by British government indifference, led to the cancellation of a broad concession for industrial development granted to a British subject, Baron Julius de Reuter, in the early 1870s',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '37'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      ref: 'event:founding-of-the-persian-cossack-brigade',
      quote: {
        id: 'q8',
        text: 'In 1879, the Russians helped Nāṣer-al-Din Shah to form a Cossack Brigade (berigād-e qazāq; q.v.), which was led by Russian officers.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '39'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      ref: 'event:accession-of-mozaffar-al-din-shah',
      quote: {
        id: 'q9',
        text: 'When Nāṣer-al-Din Shah was assassinated in 1896, the Cossack Brigade commanded by Colonel Kosogovskiĭ maintained order and secured Moẓaffar-al-Din’s succession',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '41'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      ref: 'event:anglo-russian-convention-of-1907',
      quote: {
        id: 'q10',
        text: 'On 31 August 1907, the most extraordinary and humiliating event in Iran’s relations with Russia and Britain took place.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '44'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    {
      ref: 'event:bombardment-of-the-majles',
      quote: {
        id: 'q11',
        text: 'Russia was strongly opposed to the Constitutional Revolution from its very beginning.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '45'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    { ref: 'event:shuster-mission' },
    {
      ref: 'event:russian-bombardment-of-the-imam-reza-shrine',
      quote: {
        id: 'q12',
        text: 'In the years between the signing of the Anglo-Russian Convention of 1907 and the outbreak of World War I, Russia played the master in northern Iran, keeping troops in Gilan, Azarbaijan, and Khorasan.',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '48'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    },
    { ref: 'event:iran-in-the-first-world-war' },
    {
      ref: 'event:russian-revolution-of-1917',
      quote: {
        id: 'q13',
        text: 'From the outset, the very first international resolutions of the young Soviet state had an immediate impact on relations with Iran.',
        lang: 'en',
        cite: {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
        }
      }
    },
    { ref: 'event:soviet-socialist-republic-of-iran' },
    { ref: 'event:soviet-persian-treaty-of-1921' },
    { ref: 'polity:soviet-union' },
    {
      ref: 'period:reign-of-reza-shah',
      quote: {
        id: 'q14',
        text: 'The further development of the Soviet-Iranian relations was influenced by changes in the power structure in the two states as they both increasingly gravitated towards dictatorship, as well as by the world economic crisis.',
        lang: 'en',
        cite: {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
        }
      }
    },
    { ref: 'event:anglo-soviet-invasion-of-iran' },
    { ref: 'event:azerbaijan-peoples-government' },
    { ref: 'event:iran-crisis-of-1946' },
    {
      ref: 'event:baghdad-pact',
      quote: {
        id: 'q15',
        text: 'The strengthening of the influence of the USA in Iran had a negative impact on the bilateral relations, especially after the US-initiated coup of 1953, which deposed the government of Moṣaddeq (see COUP D’ETAT OF 1332/1953), and after Iran joined the Baghdad Pact in 1955.',
        lang: 'en',
        cite: {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
        }
      }
    },
    {
      ref: 'event:white-revolution',
      quote: {
        id: 'q16',
        text: 'The White Revolution (enqelāb-e sefid) of 1963, heralding a series of reforms from above, was preceded by a new stage in the normalization and expansion of the relations with the USSR.',
        lang: 'en',
        cite: {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
        }
      }
    }
  ],
  related: [
    { ref: 'theme:iran-and-britain' },
    { ref: 'theme:constitutionalism-in-iran' },
    { ref: 'theme:the-cold-war' },
    { ref: 'theme:the-two-world-wars' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Siege_of_Erivan_Fortress_on_1_October_1827.jpg/1280px-Siege_of_Erivan_Fortress_on_1_October_1827.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Siege_of_Erivan_Fortress_on_1_October_1827.jpg',
    credit: { institution: 'History Museum of Armenia', creator: 'Franz Roubaud' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The relationship between Iran and Russia extends back more than a millennium. Prior to the 18th century, Iran and Russia treated each other as equal in their sporadic trade and diplomatic contacts. During the reign of Peter the Great (r. 1682-1725), Russia started to pursue expansionist designs against Iran, which culminated in the 19th century with the annexation of Iranian lands and aggressive interference in Iranian internal affairs.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'By the late 19th century, while successfully competing with Britain, Russia was winning concessions in Iran, providing loans to its monarchs, occupying Iranian lands, and manipulating Iranian rulers to satisfy its aspiration for domination of Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q3',
          text: 'Throughout the 19th century, Russians treated Iran as an inferior “Orient,” looking down at its people and ridiculing every aspect of their culture.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q4',
          text: 'Iran’s geographical position on the borders of Russia, India, and the Persian Gulf turned it into a natural target in the political struggle between Russia and Britain, one of “the pieces on a chessboard upon which is being played out a game for the domination of the world”',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '34'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'sheikholeslami-1991-elal-e-afzayesh-e-nofuz', perspective: 'iranian' },
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' },
    {
      source: 'kuznetsova-1983-iran-v-pervoi-polovine-xix-veka',
      perspective: 'russian-soviet'
    },
    { source: 'ivanov-1952-ocherk-istorii-irana', perspective: 'russian-soviet' }
  ]
})
