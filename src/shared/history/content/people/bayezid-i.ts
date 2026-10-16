import { definePerson } from '../../schema'

export default definePerson({
  id: 'bayezid-i',
  names: [
    { text: 'Bayezid I', lang: 'en', role: 'primary' },
    {
      text: 'Bayezid Yildirim',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1347' },
        cites: [
          { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1360', approx: true },
        cites: [
          {
            source: 'loc-name-authority-bayezid-i',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1403-03' },
        cites: [
          { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Sultan of the Ottoman Empire',
      polity: 'polity:ottoman-empire',
      start: {
        alts: [
          {
            value: { d: '1389' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'The Ottoman Empire', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1402' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'The Ottoman Empire', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '2' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Sultan_Bayezid_I%2C_c._1579%2C_by_a_follower_of_Paolo_Veronese._Staatsgalerie%2C_Bayerische_Staatsgem%C3%A4ldesammlungen%2C_Residenz%2C_Wuerzburg.jpg/1280px-Sultan_Bayezid_I%2C_c._1579%2C_by_a_follower_of_Paolo_Veronese._Staatsgalerie%2C_Bayerische_Staatsgem%C3%A4ldesammlungen%2C_Residenz%2C_Wuerzburg.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sultan_Bayezid_I,_c._1579,_by_a_follower_of_Paolo_Veronese._Staatsgalerie,_Bayerische_Staatsgem%C3%A4ldesammlungen,_Residenz,_Wuerzburg.jpg',
    credit: {
      institution: 'Bayerische Staatsgemäldesammlungen',
      creator: 'Follower of Paolo Veronese'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The steady stream of Ottoman victories in the Balkans continued under Bayezid I (r. 1389-1402).',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q2',
          text: 'BAYEZID I. (1347–1403), Ottoman sultan, surnamed Yilderim or “Lightning,” from the great rapidity of his movements, succeeded his father Murad I. on the latter’s assassination on the field of Kossovo, 1389, and signalized his accession by ordering at once the execution of his brother Yakub, who had distinguished himself in the battle.',
          lang: 'en',
          cite: { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bayezid_I.'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Bulgaria was subdued in 1393, and in 1396 a French-led force of crusaders that had crossed the Danube from Hungary was annihilated at Nicopolis',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q4',
          text: 'His arms were successful both in Europe and Asia, and he was the first Ottoman sovereign to be styled “sultan,” which title he induced the titular Abbasid caliph to confer on him.',
          lang: 'en',
          cite: { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bayezid_I.'
          }
        },
        {
          id: 'q5',
          text: 'After routing the chivalry of Christendom at the battle of Nikopoli in 1396, he pursued his victorious career in Greece, and Constantinople would doubtless have fallen before his attack, had not the emperor Manuel Palaeologus bought him off by timely concessions which reduced him practically to the position of Bayezid’s vassal.',
          lang: 'en',
          cite: { source: 'britannica-1911-bayezid-i', loc: { section: 'BAYEZID I.', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bayezid_I.'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'The unfortunate sultan died in captivity the next year, leaving four heirs, who for a decade competed for control of what remained of Ottoman Anatolia.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q9',
          text: 'The name of this Turk, who was conquered by Timour Beg, was Uderim Bayazid, which means " lightning."',
          lang: 'en',
          cite: {
            source: 'clavijo-1859-narrative-of-the-embassy',
            loc: { page: '77', section: 'Narrative of the Embassy' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://archive.org/stream/narrativeembass00markgoog/narrativeembass00markgoog_djvu.txt'
          }
        }
      ]
    }
  ]
})
