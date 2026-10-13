import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'why-the-spanish-prevailed',
  about: ['event:spanish-conquest-of-the-aztec-empire', 'event:spanish-conquest-of-the-inca-empire'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'The political union of the several independent realms in the Iberian Peninsula and the final expulsion of the Moors after 700 years of intermittent warfare had instilled in Spaniards a sense of destiny and a militant religious zeal.',
    lang: 'en',
    cite: {
      source: 'loc-peru-country-study-1992',
      loc: { section: 'Pizarro and the Conquistadors', para: '1' }
    },
    provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
  },
  positions: [
    {
      id: 'weapons-and-native-allies',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Mexico: A Country Study' },
        { kind: 'organization', name: 'Library of Congress, Peru: A Country Study' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Superior firepower, resentment against the Aztec by conquered tribes in eastern Mexico, and considerable luck all aided the Spanish in their conquest of the Aztec.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        },
        {
          id: 'q3',
          text: 'The superior military technology of the Spaniards--cavalry, cannon, and above all Toledo steel--had proved unbeatable against a force, however large, armed only with stone-age battle axes, slings, and cotton-padded armor.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        }
      ]
    },
    {
      id: 'divided-empires',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Encyclopædia Britannica, 11th edition (article on Peru)'
        },
        { kind: 'organization', name: 'Library of Congress, Peru: A Country Study' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The civil war between Huascar and Atahualpa, the sons of Huayna Capac, had been fought out in the meanwhile, and the victorious Atahualpa was at Cajamarca on his way from Quito to Cuzco.',
          lang: 'en',
          cite: { source: 'britannica-1911-peru', loc: { section: 'Peru', para: '198' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peru'
          }
        },
        {
          id: 'q5',
          text: 'Atahualpa\'s capture not only deprived the empire of leadership at a crucial moment, but the hopes of his recently defeated opponents, the supporters of Huáscar, were revived by the prospect of an alliance with a powerful new Andean power contender, the Spaniards.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        }
      ]
    },
    {
      id: 'andean-voice-taki-onqoy',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'An adherent of Taki Onqoy, at an official inquiry in 1564'
        }
      ],
      statements: [
        {
          id: 'q6',
          text: 'An adherent to the sect declared at an official inquiry in 1564 that "the world has turned about, and this time God and the Spaniards [will be] defeated and all the Spaniards killed and their cities drowned; and the sea will rise and overwhelm them, so that there will remain no memory of them."',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Consolidation of Control', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'The native population, even those who had allied initially with the invaders against the Incas, had second thoughts about the arrival of the newcomers.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Consolidation of Control', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
