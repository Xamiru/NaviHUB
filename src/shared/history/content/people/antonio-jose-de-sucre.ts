import { definePerson } from '../../schema'

export default definePerson({
  id: 'antonio-jose-de-sucre',
  names: [
    { text: 'Antonio José de Sucre', lang: 'en', role: 'primary' },
    {
      text: 'Antonio José de Sucre Alcalá',
      lang: 'es',
      role: 'alternative',
      cites: [
        {
          source: 'loc-ecuador-country-study-1989',
          loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Antonio José de Sucre Alcalá, the brilliant young lieutenant of Bolívar who arrived in Guayaquil in May 1821, was to become the key figure in the ensuing military struggle against the royalist forces.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'They were years in which warfare dominated the affairs of Ecuador.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        },
        {
          id: 'q3',
          text: 'First, the country found itself on the front lines of Bolívar\'s war to liberate Peru from Spanish rule between 1822 and 1825; afterward, in 1828 and 1829, Ecuador was in the middle of an armed struggle between Peru and Gran Colombia over the location of their common border.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        },
        {
          id: 'q4',
          text: 'After a campaign that included the near destruction of Guayaquil, the forces of Gran Colombia, under the leadership of Sucre and Venezuelan General Juan José Flores, proved victorious.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b1/Antonio_Jos%C3%A9_de_Sucre._Michelena%2C_Arturo._1895%2C_Legislative_Palace%2C_La_Paz.png/1280px-Antonio_Jos%C3%A9_de_Sucre._Michelena%2C_Arturo._1895%2C_Legislative_Palace%2C_La_Paz.png',
    page: 'https://commons.wikimedia.org/wiki/File:Antonio_Jos%C3%A9_de_Sucre._Michelena,_Arturo._1895,_Legislative_Palace,_La_Paz.png',
    credit: { institution: 'Palacio Legislativo, La Paz', creator: 'Arturo Michelena' },
    license: { id: 'public-domain' }
  }
})
