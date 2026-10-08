import { definePerson } from '../../schema'

export default definePerson({
  id: 'giuseppe-garibaldi',
  names: [
    { text: 'Giuseppe Garibaldi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1807-07-04' },
        cites: [
          {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1882-06-02' },
        cites: [
          {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '5' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:nice',
    cites: [
      {
        source: 'britannica-1911-garibaldi-giuseppe',
        loc: { section: 'GARIBALDI, GIUSEPPE', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:caprera',
    cites: [
      {
        source: 'britannica-1911-garibaldi-giuseppe',
        loc: { section: 'GARIBALDI, GIUSEPPE', para: '5' }
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  roles: ['military', 'revolutionary'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Giuseppe_Garibaldi_portrait.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Giuseppe_Garibaldi_portrait.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'GARIBALDI, GIUSEPPE (1807–1882), Italian patriot, was born at Nice on the 4th of July 1807.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'As a youth he fled from home to escape a clerical education, but afterwards joined his father in the coasting trade.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        },
        {
          id: 'q3',
          text: 'Escaping to South America in 1836, he was given letters of marque by the state of Rio Grande do Sul, which had revolted against Brazil.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Landing at Nice on the 24th of June 1848, he placed his sword at the disposal of Charles Albert, and, after various difficulties with the Piedmontese war office, formed a volunteer army 3000 strong, but shortly after taking the field was obliged, by the defeat of Custozza, to flee to Switzerland. Proceeding thence to Rome, he was entrusted by the Roman republic with the defence of San Pancrazio against the French, where he gained the victory of the 30th of April 1849, remaining all day in the saddle, although wounded in the side at the beginning of the fight.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        },
        {
          id: 'q5',
          text: 'On the 7th of September Garibaldi entered Naples, while Francesco fled to Gaeta.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        },
        {
          id: 'q6',
          text: 'On the 29th of June 1862 he landed at Palermo and gathered an army under the banner “Roma o morte.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        },
        {
          id: 'q7',
          text: 'His famous reply “Obbedisco” (“I obey”) has often been cited as a classical example of military obedience to a command destructive of a successful leader’s hopes',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'On the 2nd of June 1882 his death at Caprera plunged Italy into mourning.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-garibaldi-giuseppe',
            loc: { section: 'GARIBALDI, GIUSEPPE', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Garibaldi,_Giuseppe'
          }
        }
      ]
    }
  ]
})
