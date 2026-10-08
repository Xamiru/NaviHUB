import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'saur-revolution-causes',
  about: ['event:saur-revolution'],
  topic: 'causes',
  positions: [
    {
      id: 'defensive-coup',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Daniel Balland', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After being named president of the republic by a lōya ǰerga (1355/1977), he abandoned his claims to be a defender of liberties and resumed the authoritarianism and conservatism of the royal era: The Liberty of the press was suppressed, clientalism and corruption flourished, and foreign affairs became more and more unbalanced in favor of the West with a growing demand for economic aid from Iran and Arab states. In this context the communist left managed to reunite in 1356 Š./1977; facing the threat of physical elimination, they defended themselves with a bloody coup d’état on 7 Ṯawr 1357 Š./27 April 1978, during which Dāʾūd and his family were killed.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history/'
          }
        }
      ]
    },
    {
      id: 'khalq-seizure-not-a-soviet-plot',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Khalq\'s victory was partially due to Daud\'s miscalculation that Parcham was the more serious threat. Parcham\'s leaders had enjoyed widespread connections within the senior bureaucracy and even the royal family and the most privileged elite.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q3',
          text: 'The coup was by far Khalq\'s most successful achievement.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q4',
          text: 'So much so, that a considerable literature has accumulated arguing that it must have been planned and executed by the KGB, or some special branch of the Soviet military. Given the friction that soon developed between Khalq and Soviet officials, especially over the purging of Parcham, Soviet control of the coup seems unlikely. Prior knowledge of it does appear to have been highly likely. Claims that Soviet pilots bombed the palace overlook the availability of seasoned Afghan pilots.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
