import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-zuhab',
  names: [
    { text: 'Treaty of Zuhab', lang: 'en', role: 'primary' },
    {
      text: 'Peace of Qaṣr-e Širin',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        },
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '46' }
        }
      ]
    },
    {
      text: 'Treaty of Zohāb',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1639-05-17' },
        cites: [
          {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:zohab',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:shah-safi',
      role: 'signatory',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    },
    {
      name: 'Sultan Morād IV',
      role: 'head-of-state',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:ottoman-safavid-war-1623-1639',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        }
      ]
    },
    {
      ref: 'event:peace-of-amasya',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
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
          text: 'Qaṣr-e Širin by and large reaffirmed the boundaries that had been stipulated by the Treaty of Amasya and that would mark the borders between Persia and the Ottoman Empire and the modern border with Iraq and Turkey.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'This accord reaffirmed the Treaty of Amasya and until the demise of the Safavid dynasty determined the course of the border.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Sultan Morād IV, angered at reports of Safavid destruction of Sunnite property in Iraq, personally led a campaign to retake Baghdad.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q12',
          text: 'The Ottomans made a brief attempt to regain Iraq in 1625, and in 1629, taking advantage of Shah ʿAbbās’s death, organized a campaign led by newly appointed grand vizier Husrev/Ḵosrow Pasha.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'By terminating the wars with the Ottomans, Qaṣr-e Širin also put an end to the most imminent threat to Persia’s survival, thus further contributing to the decline of the Safavid army.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q7',
          text: 'Safavid shahs never took any serious initiatives to break the peace, even at times when the Ottomans were engaged in war in southeastern Europe, such as between 1660 and 1664 and again between 1683 and 1699, though at various time they were tempted by circumstances to try and regain Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q8',
          text: 'The arrangements made at Zohāb were therefore reasonably flexible',
          lang: 'en',
          cite: {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/boundaries-i'
          }
        },
        {
          id: 'q9',
          text: 'In terms of military matters, Solaymān’s reign was uneventful, mostly because the shah was scrupulous in observing the Treaty of Qaṣr-e Širin.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
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
            value: { d: '1638' },
            cites: [
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Assisted by what appears to have been a careless Safavid defense strategy, the Ottomans occupied the city in 1638',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1639' },
            cites: [
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Following this, the Safavids, aware of their military weakness, in 1639 concluded the Peace of Qaṣr-e Širin or Ḏohāb',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/04/Private_Diwan_%28Court_building%29_of_Shah_Safi_I_of_Persia.jpg/1280px-Private_Diwan_%28Court_building%29_of_Shah_Safi_I_of_Persia.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Private_Diwan_(Court_building)_of_Shah_Safi_I_of_Persia.jpg',
    credit: { institution: 'Rijksmuseum' },
    license: { id: 'public-domain' }
  }
})
