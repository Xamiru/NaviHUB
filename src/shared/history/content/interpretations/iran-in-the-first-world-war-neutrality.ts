import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-in-the-first-world-war-neutrality',
  about: ['event:iran-in-the-first-world-war'],
  topic: 'foreign-role',
  researched: '2026-10-06',
  positions: [
    {
      id: 'neutrality-violated-on-a-pretext',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansour Bonakdarian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After the outbreak of the First World War, Britain and Russia abandoned all pretense of respect for Persia’s sovereignty, jointly occupying that country under the pretext of countering German and Ottoman anti-Allied operations in Persia, despite Tehran’s declaration of neutrality in the war.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        }
      ]
    },
    {
      id: 'neutrality-meaningless-under-occupation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Touraj Atabaki' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'For Iranians, the declaration of war in Europe and among its imperial neighbours meant more foreign pressure to take sides in a conflict in which Iran had no national interest.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        }
      ]
    },
    {
      id: 'russian-refusal-and-ottoman-invasion',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'the real reason for his loss of support was his failure to persuade the Russians to withdraw from Azarbaijan, which had given the Turks an excuse to invade Persia (see below; Olson, pp. 65-70).',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-constitutional-revolution-aftermath',
            loc: { section: 'CONSTITUTIONAL REVOLUTION iv. The aftermath', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iv/'
          }
        }
      ]
    },
    {
      id: 'germany-as-counterweight',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Touraj Atabaki' },
        { kind: 'scholar', name: 'Stephanie Cronin' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In the absence of a powerful central government in Iran to resist the Russian and British burden, some Iranians came to the conclusion that aligning with Germany was the best option to guarantee Iran’s national sovereignty and territorial integrity. The powerful neighbouring empires of the Russians, the Ottomans, and the British (whose Indian dominion bordered Iran) had interests which automatically led them to meddle and intervene in Iran. By contrast, Germany, a powerful but geographically remote power, seemed at first sight to present no direct threat to Iran.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q5',
          text: 'Persian nationalists became interested in a German victory in so far as it would restrain Russia and Britain and promote the cause of Persia’s independence.',
          lang: 'en',
          cite: { source: 'iranica-cronin-gendarmerie', loc: { section: 'GENDARMERIE', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gendarmerie'
          }
        }
      ]
    }
  ]
})
