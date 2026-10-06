import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'paris-commune-nature',
  about: ['event:paris-commune'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'working-class-government',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Karl Marx', ref: 'person:karl-marx' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It was essentially a working class government, the product of the struggle of the producing against the appropriating class, the political form at last discovered under which to work out the economical emancipation of labor.',
          lang: 'en',
          cite: {
            source: 'marx-1871-civil-war-in-france',
            loc: { section: 'The Third Address, [The Paris Commune]', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.marxists.org/archive/marx/works/1871/civil-war-france/ch05.htm'
          }
        },
        {
          id: 'q2',
          text: 'On the dawn of March 18, Paris arose to the thunder-burst of “Vive la Commune!”',
          lang: 'en',
          cite: {
            source: 'marx-1871-civil-war-in-france',
            loc: { section: 'The Third Address, [The Paris Commune]', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.marxists.org/archive/marx/works/1871/civil-war-france/ch05.htm'
          }
        }
      ]
    },
    {
      id: 'revolt-repressed',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Présidence de la République' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Il conclut la paix avec la Prusse au prix de la perte de l\'Alsace-Lorraine et réprime sévèrement la révolte de la Commune de mai 1871.',
          lang: 'fr',
          cite: { source: 'elysee-adolphe-thiers', loc: { section: 'Adolphe Thiers' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.elysee.fr/la-presidence/adolphe-thiers'
          }
        }
      ]
    }
  ]
})
