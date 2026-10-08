import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'spanish-civil-war-nature',
  about: ['event:spanish-civil-war'],
  topic: 'nature',
  researched: '2026-10-08',
  positions: [
    {
      id: 'national-movement-in-defence-of-civilisation',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Spanish Catholic episcopate (1937)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'La guerra es, pues, como un plebiscito armado.',
          lang: 'es',
          cite: {
            source: 'spanish-episcopate-1937-collective-letter',
            loc: { section: 'El alzamiento militar y la revolución comunista' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://es.wikisource.org/wiki/Carta_colectiva_de_los_obispos_espa%C3%B1oles_a_los_obispos_de_todo_el_mundo_con_motivo_de_la_guerra_en_Espa%C3%B1a'
          }
        },
        {
          id: 'q2',
          text: 'El alzamiento cívico-militar fue en su origen un movimiento nacional de defensa de los principios fundamentales de toda sociedad civilizada; en su desarrollo, lo ha sido contra la anarquía coaligada con las fuerzas al servicio de un gobierno que no supo o no quiso tutelar aquellos principios.',
          lang: 'es',
          cite: {
            source: 'spanish-episcopate-1937-collective-letter',
            loc: { section: 'El alzamiento militar y la revolución comunista' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://es.wikisource.org/wiki/Carta_colectiva_de_los_obispos_espa%C3%B1oles_a_los_obispos_de_todo_el_mundo_con_motivo_de_la_guerra_en_Espa%C3%B1a'
          }
        }
      ]
    },
    {
      id: 'coup-against-the-republic',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Kingdom of Spain (Ley 20/2022 de Memoria Democrática)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'La memoria de las víctimas del golpe de Estado, la Guerra de España y la dictadura franquista, su reconocimiento, reparación y dignificación, representan, por tanto, un inexcusable deber moral en la vida política y es signo de la calidad de la democracia.',
          lang: 'es',
          cite: { source: 'boe-ley-20-2022-memoria-democratica', loc: { section: 'Preámbulo, II' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-17099'
          }
        }
      ]
    }
  ]
})
