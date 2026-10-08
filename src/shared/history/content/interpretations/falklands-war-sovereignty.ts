import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'falklands-war-sovereignty',
  about: ['event:falklands-war'],
  topic: 'legitimacy',
  framing: {
    id: 'q1',
    text: 'The issue of the islands’ future sovereignty had been the subject of intermittent and inconclusive negotiations between the two countries since the 1960s.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-crisis-in-the-south-atlantic',
      loc: {
        section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
        para: '1'
      }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
    }
  },
  positions: [
    {
      id: 'united-kingdom-self-determination',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Argentina has, of course, long disputed British sovereignty over the islands. We have absolutely no doubt about our sovereignty, which has been continuous since 1833. Nor have we any doubt about the unequivocal wishes of the Falkland Islanders, who are British in stock 634 and tradition, and they wish to remain British in allegiance. We cannot allow the democratic rights of the islanders to be denied by the territorial ambitions of Argentina.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-04-03-falkland-islands',
            loc: { section: 'Falkland Islands (3 April 1982)', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/apr/03/falkland-islands'
          }
        },
        {
          id: 'q3',
          text: 'There will be no negotiations on the sovereignty of the Falkland Islands unless and until the islanders decide.',
          lang: 'en',
          cite: {
            source: 'gov-uk-falkland-islanders-right-to-self-determination-2010-2015',
            loc: { section: 'Falkland Islanders\' right to self-determination', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/publications/2010-to-2015-government-policy-falkland-islanders-right-to-self-determination/2010-to-2015-government-policy-falkland-islanders-right-to-self-determination'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'In 1964 the UN, in response to an Argentine appeal, classified the Islands as a non-self-governing territory administered by the UK and called on both parties to initiate talks towards peaceful resolution of their conflicting sovereignty claims.',
          lang: 'en',
          cite: {
            source: 'frus-1981-88-v13-d1-embassy-buenos-aires-malvinas-political-and-social-review',
            loc: {
              section: '1. Airgram From the Embassy in Argentina to the Department of State: The Malvinas (Falkland) Islands: A Political and Social Review'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1981-88v13/d1'
          }
        }
      ]
    },
    {
      id: 'argentina-recovery-of-sovereignty',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Argentina' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'La Nación Argentina ratifica su legítima e imprescriptible soberanía sobre las Islas Malvinas, Georgias del Sur y Sandwich del Sur y los espacios marítimos e insulares correspondientes, por ser parte integrante del territorio nacional. La recuperación de dichos territorios y el ejercicio pleno de la soberanía, respetando el modo de vida de sus habitantes y conforme a los principios del Derecho Internacional, constituyen un objetivo permanente e irrenunciable del pueblo argentino.',
          lang: 'es',
          cite: {
            source: 'argentina-cancilleria-cuestion-islas-malvinas',
            loc: { section: 'Cuestión Islas Malvinas', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.cancilleria.gob.ar/es/politica-exterior/cuestion-malvinas'
          }
        },
        {
          id: 'q5',
          text: 'El alegato de Ruda sostuvo que no existe en las islas una población sojuzgada, subyugada o sometida al colonialismo, siendo ésta una de las razones por las cuales no corresponde a dicha población el derecho a la libre determinación de los pueblos que alega la Parte británica',
          lang: 'es',
          cite: {
            source: 'argentina-cancilleria-malvinas-en-naciones-unidas',
            loc: { section: 'La Cuestión de las Islas Malvinas en las Naciones Unidas', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.cancilleria.gob.ar/es/politica-exterior/cuestion-malvinas/malvinas-en-naciones-unidas'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'The Argentine Junta held its own suspicions about U.S. impartiality, refused to make concessions that might prejudice its claims to sovereignty over the islands, and viewed the dispute as a matter national honor.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
