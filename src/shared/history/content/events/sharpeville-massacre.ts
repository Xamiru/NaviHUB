import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sharpeville-massacre',
  names: [
    { text: 'Sharpeville massacre', lang: 'en', role: 'primary' },
    { text: 'Sharpeville-slagting', lang: 'af', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1960-03-21' },
        cites: [
          {
            source: 'hansard-commons-1960-04-08-union-of-south-africa-racialist-policies',
            loc: { section: 'HC Deb 08 April 1960 vol 621 cc774-843' }
          },
          {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Black Resistance in the 1950s', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  places: [
    {
      ref: 'place:sharpeville',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Robert Sobukwe',
      role: 'organizer',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '8' }
        }
      ]
    },
    {
      name: 'Pan-Africanist Congress',
      role: 'organizer',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '8' }
        }
      ]
    },
    {
      name: 'Hendrik F. Verwoerd',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '8' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 67 },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Black Resistance in the 1950s', para: '8' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 186 },
            cites: [
              {
                source: 'loc-south-africa-country-study-1996',
                loc: { section: 'Black Resistance in the 1950s', para: '8' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:introduction-of-apartheid',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-south-africa-country-study-1996',
          loc: { section: 'Black Resistance in the 1950s', para: '8' }
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
          text: 'One such demonstration outside the police station at Sharpeville, a "native" township in the industrial area of Vereeniging to the south of Johannesburg, ended in violence when the police fired on the demonstrators, killing at least sixty-seven of them and wounding 186. Most of the dead and wounded were shot in the back.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Black Resistance in the 1950s', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/26.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The failure to achieve any real success caused a major split in black resistance in 1959. Critics within the ANC argued that its alliance with other political groups, particularly the white Congress of Democrats, caused their organization to make too many compromises and to fail to represent African interests. Influenced by the writings of Lembede, the Africanists, led by Robert Sobukwe, called on the ANC to look to African interests first and to take more action to challenge the government. They were, however, forced out of the ANC, and they formed their own organization, the Pan-Africanist Congress (PAC). In March 1960, the PAC began a national campaign against the pass laws and called on Africans to assemble outside police stations without their passes and to challenge the police to arrest them.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Black Resistance in the 1950s', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/26.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Mr. Tyler strongly denies that the demonstrators were carrying arms, and he says: I never saw any such weapons, yet I looked very closely and with great attention. There were no weapons to be seen in the photographs taken of the tragic places. I merely saw a few shoes, some hats and a few bicycles scattered among the dead.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1960-04-08-union-of-south-africa-racialist-policies',
            loc: { section: 'HC Deb 08 April 1960 vol 621 cc774-843' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1960/apr/08/union-of-south-africa-racialist-policies'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Stoppages and demonstrations continued, including a peaceful march of 30,000 Africans on the Houses of Parliament in Cape Town. Verwoerd\'s government reacted by declaring a state of emergency, by arresting approximately 18,000 demonstrators, including the leaders of the ANC and the PAC, and by outlawing both organizations.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'Black Resistance in the 1950s', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/26.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Prohibited from operating peacefully or even having a legal existence in South Africa, both the ANC and the PAC established underground organizations in 1961 to carry out their struggle against the government. The militant wing of the ANC, Umkhonto we Sizwe (MK--Spear of the Nation, also known as Umkhonto), targeted strategic places such as police stations and power plants but carefully avoided taking any human lives.',
          lang: 'en',
          cite: {
            source: 'loc-south-africa-country-study-1996',
            loc: { section: 'The ANC and the PAC Turn to Violence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-africa/27.htm' }
        },
        {
          id: 'q6',
          text: 'I believe that something happened at Sharpeville which has made a dividing line in history such as we sometimes see. I do not think that things will ever be quite the same again.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1960-04-08-union-of-south-africa-racialist-policies',
            loc: { section: 'HC Deb 08 April 1960 vol 621 cc774-843' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1960/apr/08/union-of-south-africa-racialist-policies'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'frankel-2001-an-ordinary-atrocity', perspective: 'african' }
  ]
})
