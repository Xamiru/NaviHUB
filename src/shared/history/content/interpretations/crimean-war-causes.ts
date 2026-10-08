import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'crimean-war-causes',
  about: ['event:crimean-war'],
  topic: 'causes',
  researched: '2026-10-09',
  positions: [
    {
      id: 'resisting-russian-aggression',
      category: 'official',
      holders: [
        { kind: 'state', name: 'British government' },
        { kind: 'participant', name: 'Earl of Clarendon' },
        { kind: 'participant', name: 'Lord John Russell' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'We enter on the war for a definite object; it is to check and repel the unjust aggression of Russia.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1854-03-31-war-with-russia',
            loc: { section: 'HL Deb 31 March 1854 vol 132 cc140-98', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1854/mar/31/war-with-russia-her-majestys-message'
          }
        },
        {
          id: 'q2',
          text: 'It is not merely the protection of Turkey against the aggressions of Russia that is concerned in the Eastern question, as it is commonly called, but it is the battle of civilisation against barbarism, for the maintenance of the independence of Europe.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1854-03-31-war-with-russia',
            loc: { section: 'HL Deb 31 March 1854 vol 132 cc140-98', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1854/mar/31/war-with-russia-her-majestys-message'
          }
        },
        {
          id: 'q3',
          text: 'I may as well, however, just say first, that in treating of this subject I shall keep wholly out of view the dispute which has furnished, not a cause but a pretext for the interference of the Emperor of Russia.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1854-03-31-war-with-russia',
            loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1854/mar/31/war-with-russia-the-queens-message'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'The primary object of the war had thus easily been obtained. But Great Britain and France were by no means content with a triumph that left untouched the vast resources of an enemy who was certain to employ them at the next opportunity.',
          lang: 'en',
          cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
          }
        }
      ]
    },
    {
      id: 'balance-of-power',
      category: 'official',
      holders: [
        { kind: 'state', name: 'British government' },
        { kind: 'participant', name: 'Viscount Palmerston' }
      ],
      statements: [
        {
          id: 'q4',
          text: '"Balance of power" means only this—that a number of weaker States may unite to prevent a stronger one from acquiring a power which should be dangerous to them, and which should overthrow their independence, their liberty, and their freedom of action.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1854-03-31-war-with-russia',
            loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1854/mar/31/war-with-russia-the-queens-message'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'The two nations felt that Sevastopol, the home of the Black Sea fleet, the port whence Admiral Nachimov had sailed for Sinope, must be crippled for some years at least',
          lang: 'en',
          cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
          }
        }
      ]
    },
    {
      id: 'mischievous-delusion',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Bright' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'This whole notion of "the balance of power" is a mischievous delusion which has come down to us from past times; we ought to drive it from our minds, and to consider the solemn question of peace or war on more clear, more definite, and on far higher principles than any that are involved in the phrase, "the balance of power."',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1854-03-31-war-with-russia',
            loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1854/mar/31/war-with-russia-the-queens-message'
          }
        },
        {
          id: 'q6',
          text: 'The United States may profit to a large extent by the calamities which will befall us; whilst we, under the miserable and lunatic idea that we are about to set the worn-out Turkish empire on its legs, and permanently to sustain it against the aggressions of Russia, are entangled in a war.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1854-03-31-war-with-russia',
            loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1854/mar/31/war-with-russia-the-queens-message'
          }
        }
      ]
    },
    {
      id: 'eastern-question',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The implications of the decline of Ottoman power, the vulnerability and attractiveness of the empire\'s vast holdings, the stirrings of nationalism among its subject peoples, and the periodic crises resulting from these and other factors became collectively known to European diplomats in the nineteenth century as "the Eastern Question."',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q8',
          text: 'The problem from the viewpoint of European diplomacy was how to dispose of the empire in such a manner that no one power would gain an advantage at the expense of the others and upset the political balance of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      id: 'nicholas-misjudgment',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'Based on his role in suppressing the revolutions of 1848 and his mistaken belief that he had British diplomatic support, Nicholas moved against the Ottomans, who declared war on Russia in 1853.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ]
})
