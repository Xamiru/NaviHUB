import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-varna',
  names: [
    { text: 'Battle of Varna', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1444-11-10' },
        cites: [
          {
            source: 'britannica-1911-hunyadi-janos',
            loc: { section: 'Hunyadi, János', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:varna',
      cites: [
        {
          source: 'loc-romania-country-study-1989',
          loc: { section: 'The Ottoman Invasions', para: '2' }
        },
        { source: 'britannica-1911-varna', loc: { section: 'Varna', para: '2' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-romania-country-study-1989',
          loc: { section: 'The Ottoman Invasions', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-romania-country-study-1989',
          loc: { section: 'The Ottoman Invasions', para: '2' }
        }
      ]
    },
    {
      key: 'crusaders',
      name: 'European forces',
      cites: [
        {
          source: 'loc-romania-country-study-1989',
          loc: { section: 'The Ottoman Invasions', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Murad II',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'britannica-1911-hunyadi-janos',
          loc: { section: 'Hunyadi, János', para: '2' }
        }
      ]
    },
    {
      name: 'János Hunyadi',
      role: 'commander',
      side: 'crusaders',
      cites: [
        {
          source: 'britannica-1911-hunyadi-janos',
          loc: { section: 'Hunyadi, János', para: '2' }
        }
      ]
    },
    {
      name: 'Wladislaus III',
      role: 'leader',
      side: 'crusaders',
      cites: [
        {
          source: 'britannica-1911-hunyadi-janos',
          loc: { section: 'Hunyadi, János', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:fall-of-constantinople',
      rel: 'followed-by',
      cites: [
        { source: 'britannica-1911-varna', loc: { section: 'Varna', para: '2' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1444 the Ottomans routed European forces at Varna in contemporary Bulgaria.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Ottoman Invasions', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/romania/8.htm' }
        },
        {
          id: 'q2',
          text: 'It figures largely in the history of more recent times, and close by was fought in 1444 the battle in which Murad II. slew Wladislaus III. of Poland and Hungary, and routed his forces commanded by Hunyadi Janos.',
          lang: 'en',
          cite: { source: 'britannica-1911-varna', loc: { section: 'Varna', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Varna'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Hunyadi, at the head of the vanguard, crossed the Balkans through the Gate of Trajan, captured Nish, defeated three Turkish pashas, and, after taking Sofia, united with the royal army and defeated Murad II. at Snaim.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hunyadi-janos',
            loc: { section: 'Hunyadi, János', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hunyadi%2C_J%C3%A1nos'
          }
        },
        {
          id: 'q4',
          text: 'These victories made Hunyadi’s name terrible to the Turks and renowned throughout Christendom, and stimulated him in 1443 to undertake, along with King Wladislaus, the famous expedition known as the hosszu háboru or “long campaign.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hunyadi-janos',
            loc: { section: 'Hunyadi, János', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hunyadi%2C_J%C3%A1nos'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'All the preparations had been made, when Murad’s envoys arrived in the royal camp at Szeged and offered a ten years’ truce on advantageous terms.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hunyadi-janos',
            loc: { section: 'Hunyadi, János', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hunyadi%2C_J%C3%A1nos'
          }
        },
        {
          id: 'q6',
          text: 'Branković, however, fearful of the sultan’s vengeance in case of disaster, privately informed Murad of the advance of the Christian host, and prevented Castriota from joining it.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hunyadi-janos',
            loc: { section: 'Hunyadi, János', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hunyadi%2C_J%C3%A1nos'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'At the diet which met in February 1445 a provisional government, consisting of five Magyar captain-generals, was formed, Hunyadi receiving Transylvania and the ultra-Theissian counties as his district; but the resulting anarchy became unendurable, and on the 5th of June 1446 Hunyadi was unanimously elected governor of Hungary in the name of Ladislaus V., with regal powers.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hunyadi-janos',
            loc: { section: 'Hunyadi, János', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hunyadi%2C_J%C3%A1nos'
          }
        },
        {
          id: 'q8',
          text: 'When Constantinople succumbed in 1453, the Ottomans cut off Genoese and Venetian galleys from Black Sea ports, trade ceased, and the Romanian principalities\' isolation deepened.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Ottoman Invasions', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/romania/8.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1444-07-12' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1350' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On the 12th of July 1444 a ten years\' peace was signed with Hungary, whereby Walachia was placed under the suzerainty of that country; and, wearied by constant warfare and afflicted by the death of his eldest son, Prince Ala-ud-din, Murad abdicated in favour of his son Mahommed, then only fourteen years of age, and retired to Magnesia (1444).',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1350' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1444-11-10' },
            cites: [
              {
                source: 'britannica-1911-hunyadi-janos',
                loc: { section: 'Hunyadi, János', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On reaching Varna, the Hungarians found that the Venetian galleys had failed to prevent the transit of the sultan, who now confronted them with fourfold odds, and on the 10th of November 1444 they were utterly routed, Wladislaus falling on the field and Hunyadi narrowly escaping.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-hunyadi-janos',
          loc: { section: 'Hunyadi, János', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hunyadi%2C_J%C3%A1nos'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Battle_of_Varna%2C_Jan_Matejko.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Varna,_Jan_Matejko.jpg',
    credit: { creator: 'Jan Matejko' },
    license: { id: 'public-domain' }
  }
})
