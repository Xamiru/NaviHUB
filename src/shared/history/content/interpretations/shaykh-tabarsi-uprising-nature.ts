import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'shaykh-tabarsi-uprising-nature',
  about: ['event:shaykh-tabarsi-uprising'],
  topic: 'nature',
  researched: '2026-10-08',
  positions: [
    {
      id: 'messianic-struggle',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Denis M. MacEoin' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Two features of this incident stand out: the messianic overtones of the struggle, emphasized by the roles of Bošrūʾī and Bārforūšī as qāʾem, the carrying of a black standard, the identification of the fort with Karbalāʾ, its defenders with Ḥosayn and his followers, and their enemies with the Omayyad forces; and the related belief in the supreme authority of the Bāb and his lieutenants as against the illegitimacy of Qajar rule.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q2',
          text: 'Thus Bošrūʾī and Mollā Moḥammad-ʿAlī Bārforūšī Qoddūs were regarded by their followers at Ṭabarsī shrine as the “Qāʾem-e Ḵorāsānī” and “Qāʾem-e Jīlānī” respectively, while quasi-divine honors were paid to the latter (such as the circumambulation of his house and the direction of prayers towards him as the qebla).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-i',
            loc: { section: 'BABISM i. The Babi movement', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism'
          }
        },
        {
          id: 'q3',
          text: 'Our emphasis must at present remain on the outwardly religious character of Babism, while recognizing the value of religious motifs as a means of socio-political expression in a society such as Qajar Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    },
    {
      id: 'social-discontent',
      category: 'scholarly',
      holders: [
        {
          kind: 'school',
          name: 'Commentators reading the Babi uprisings as social and political protest (as reported by Denis M. MacEoin)'
        }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The character of these struggles in particular has suggested to some commentators that they were more of an expression of social and political discontent than of religious fervor, and there is undoubtedly a measure of truth in this, particularly in the case of Zanjān.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Nevertheless, in a recent study (“The Social Basis of the Bābī Upheavals”), Momen has shown that it is difficult to reach clear conclusions as to the social composition of these outbreaks or of the Babi movement as a whole.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    }
  ]
})
