import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'recovery-of-qandahar-1648',
  names: [
    { text: 'Recovery of Qandahar', lang: 'en', role: 'primary' },
    {
      text: 'Kandahar expedition of Abbas II',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1648' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } },
          {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '18'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1649-02-11' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1649-02-22' },
        cites: [
          {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '18'
            }
          }
        ],
        heldBy: [
          {
            kind: 'scholar',
            name: 'Rudi Matthee and Hiroyuki Mashita',
            discipline: 'historian'
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:kandahar',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
      ]
    },
    {
      ref: 'polity:mughal-empire',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
      ]
    },
    {
      key: 'mughal',
      name: 'Mughals',
      polity: 'polity:mughal-empire',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-ii',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
      ]
    },
    {
      name: 'Shah Jahān',
      role: 'head-of-state',
      side: 'mughal',
      cites: [
        {
          source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
          loc: {
            section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
            para: '18'
          }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'safavid',
      value: {
        alts: [
          {
            value: { min: 50000, qualifier: 'about' },
            cites: [
              { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          },
          {
            value: { min: 40000 },
            cites: [
              {
                source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
                loc: {
                  section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
                  para: '18'
                }
              }
            ],
            heldBy: [
              {
                kind: 'scholar',
                name: 'Rudi Matthee and Hiroyuki Mashita',
                discipline: 'historian'
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-zuhab',
      rel: 'related',
      cites: [
        {
          source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
          loc: {
            section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
            para: '17'
          }
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
          text: 'The expedition to Kandahar, which had been lost to the Mughals under Shah Ṣafi I, counts as Shah ʿAbbās II’s main military venture and as the last significant military campaign of the Safavids.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q14',
          text: 'In the summer of 1058/1648, an army of some 50,000 headed east.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q15',
          text: 'After taking Bost, near present-day Laškargāh, in January 1649, he marched on Kandahar and after a brief siege took the city on 22 February',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1641 Shah Ṣafi, apparently more galled by the loss of Kandahar than that of Baghdad in 1638, was ready to mount an expedition against the Mughals, but until the late summer of that year it remained unclear whether the Ottomans would ratify the Peace of Zohāb',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '17'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
          }
        },
        {
          id: 'q4',
          text: 'Only in late 1645, when ʿAbbas II finally took control, were the Safavids ready to resume their drive to retake Kandahar, with its fortress that was generally known as the strongest in Persia',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
          }
        },
        {
          id: 'q5',
          text: 'ʿAbbas II agreed to remain neutral, yet in effect decided to proceed with his advance against Kandahar, taking advantage of the disastrous defeat Shah Jahān had just suffered in Badaḵšān',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q8',
          text: 'During the siege, the Iranians suffered great losses, and as many as 6,000 kezelbāš soldiers are said to have defected to the enemy, due to the demoralizing effect of oppressive commanders, lack of pay, and substandard accommodation',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '18'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Despite Mughal attempts to recover Kandahar, the city and its province would remain in Safavid hands for the duration of the dynasty',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q10',
          text: 'The Kandahar expedition showed up the weak state of the Safavid army and the woeful lack of money resulting from underlying economic problems.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q11',
          text: 'The Iranians may have owed their victory above all to the disarray in the Mughal command structure, which was torn by factional fighting between Shah Jahān’s sons Dārā Šokōh and Awrangzēb',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
            loc: {
              section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
              para: '19'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
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
            value: { d: '1645' },
            cites: [
              {
                source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
                loc: {
                  section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
                  para: '18'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Safavid military received some of its back pay, an army was mobilized, and provisions in the form of wheat, lead, and gunpowder were secured in the eastern provinces and transported to Kandahar',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
          loc: {
            section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
            para: '18'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/kandahar-from-the-mongol-invasion-through-the-safavid-era'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1649-02-11' },
            cites: [
              { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1649-02-22' },
            cites: [
              {
                source: 'iranica-matthee-mashita-kandahar-mongol-safavid',
                loc: {
                  section: 'KANDAHAR iv. From The Mongol Invasion Through the Safavid Era',
                  para: '18'
                }
              }
            ],
            heldBy: [
              {
                kind: 'scholar',
                name: 'Rudi Matthee and Hiroyuki Mashita',
                discipline: 'historian'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Traveling via Mashad, Herat, and Bost the Iranians laid siege to Kandahar in January 1649 and, after a brief siege, took the city on 11 February 1649.',
        lang: 'en',
        cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/abbas-ii'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/80/The_Surrender_of_Kandahar_%281638%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Surrender_of_Kandahar_(1638).jpg',
    credit: { institution: 'Padshahnama' },
    license: { id: 'public-domain' }
  }
})
