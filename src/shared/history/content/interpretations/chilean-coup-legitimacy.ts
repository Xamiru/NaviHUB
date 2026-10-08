import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'chilean-coup-legitimacy',
  about: ['event:1973-chilean-coup'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'junta-bando-5',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Military junta of Chile (Bando N°5)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Que el Gobierno de Allende ha incurrido en grave ilegitimidad demostrada al quebrantar los derechos fundamentales de libertad de expresión, libertad de enseñanza, derecho de huelga, derecho de petición, derecho de propiedad, y derecho en general, a una digna y segura subsistencia;',
          lang: 'es',
          cite: { source: 'junta-1973-bando-5', loc: { section: 'Bando N°5' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://es.wikisource.org/wiki/Bando_N%C2%B05_del_Golpe_de_Estado_del_11_de_septiembre_de_1973'
          }
        },
        {
          id: 'q2',
          text: 'Que estos mismos antecedentes son, a la luz de la doctrina clásica que caracteriza nuestro pensamiento histórico, suficientes para justificar nuestra intervención para deponer al gobierno ilegítimo, inmoral y no representativo del gran sentir nacional, evitando así los mayores males que el actual vacío del poder pueda producir, pues para lograr esto no hay otros medios de razonamiento exitosos, siendo nuestro propósito restablecer la normalidad económica y social del país, la paz, tranquilidad y seguridad perdidas.',
          lang: 'es',
          cite: { source: 'junta-1973-bando-5', loc: { section: 'Bando N°5' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://es.wikisource.org/wiki/Bando_N%C2%B05_del_Golpe_de_Estado_del_11_de_septiembre_de_1973'
          }
        },
        {
          id: 'q3',
          text: 'Por todas las razones someramente expuestas, las Fuerzas Armadas han asumido el deber moral que la Patria les impone de destituir al Gobierno que aunque inicialmente legítimo ha caído en la ilegitimidad flagrante, asumiendo el Poder por el solo lapso en que las circunstancias lo exijan, apoyado en la evidencia del sentir de la gran mayoría nacional, lo cual de por sí, ante Dios y ante la Historia, hace justo su actuar y por ende, las resoluciones, normas e instrucciones que se dicten para la consecución de la tarea de bien común y de alto interés patriótico que se dispone cumplir.',
          lang: 'es',
          cite: { source: 'junta-1973-bando-5', loc: { section: 'Bando N°5' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://es.wikisource.org/wiki/Bando_N%C2%B05_del_Golpe_de_Estado_del_11_de_septiembre_de_1973'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'The armed forces justified the coup as necessary to stamp out Marxism, avert class warfare, restore order, and salvage the economy.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Military Rule', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/31.htm' }
        }
      ]
    },
    {
      id: 'allende-last-words',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Salvador Allende', ref: 'person:salvador-allende' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Estas son mis últimas palabras y tengo la certeza de que mi sacrificio no será en vano, tengo la certeza de que, por lo menos, será una lección moral que castigará la felonía, la cobardía y la traición.',
          lang: 'es',
          cite: { source: 'allende-1973-ultimas-palabras', loc: { section: 'Últimas palabras' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/espanol/allende/1973/11-09-73.htm'
          },
          translation: {
            text: 'These are my last words, and I am certain that my sacrifice will not be in vain, I am certain that, at the very least, it will be a moral lesson that will punish felony, cowardice, and treason.',
            lang: 'en',
            cite: {
              source: 'allende-1973-last-words-to-the-nation-furuhashi',
              loc: { section: 'Last Words to the Nation' }
            },
            provenance: {
              via: 'web',
              at: '2026-10-09',
              url: 'https://www.marxists.org/archive/allende/1973/september/11.htm'
            }
          }
        },
        {
          id: 'q5',
          text: 'El pueblo debe defenderse, pero no sacrificarse.',
          lang: 'es',
          cite: { source: 'allende-1973-ultimas-palabras', loc: { section: 'Últimas palabras' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/espanol/allende/1973/11-09-73.htm'
          },
          translation: {
            text: 'The people must defend themselves, but they must not sacrifice themselves.',
            lang: 'en',
            cite: {
              source: 'allende-1973-last-words-to-the-nation-furuhashi',
              loc: { section: 'Last Words to the Nation' }
            },
            provenance: {
              via: 'web',
              at: '2026-10-09',
              url: 'https://www.marxists.org/archive/allende/1973/september/11.htm'
            }
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
