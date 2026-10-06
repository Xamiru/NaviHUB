import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'goharshad-mosque-uprising-causes',
  about: ['event:goharshad-mosque-uprising'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'against-unveiling',
      category: 'official',
      holders: [
        {
          kind: 'state',
          name: 'Islamic Republic of Iran (Office of the Supreme Leader, Khamenei.ir)'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Goharshad Mosque Massacre occurred on July 13, 1935, when the people of Mashhad protested in Goharshad Mosque against an order issued by Reza Khan forcibly removing and banning the hijab of all women. The military and police attacked the peaceful demonstrators leading to the martyrdom of a large number of people.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2017-03-28-goharshad-mosque-speech',
            loc: { section: 'Speech of 28 March 2017', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20240930004224id_/https://english.khamenei.ir/news/5803/The-massacre-of-Goharshad-Mosque-by-Pahlavi-should-be-narrated'
          }
        },
        {
          id: 'q2',
          text: 'When the issue of "kashf-e hijab" [the forcible removal and banning of hijab by Reza Khan] arose, the late Hajj Aqa Hussein Qomi said that he would go speak to Reza Shah, making him listen.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2017-03-28-goharshad-mosque-speech',
            loc: { section: 'Speech of 28 March 2017', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20240930004224id_/https://english.khamenei.ir/news/5803/The-massacre-of-Goharshad-Mosque-by-Pahlavi-should-be-narrated'
          }
        }
      ]
    },
    {
      id: 'against-dress-code',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' },
        { kind: 'scholar', name: 'ʿAlī-Akbar Saʿīdī Sīrjānī' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Uprising in the Gowharšād Mosque of Mashad against the Western-style uniform dress code results in heavy casualties after government troops fire on clerical elements and the general public in the shrine of the eighth Imam; Moḥammad-Wali Asadi, the superintendent of the Shrine, is executed as the culprit, for dereliction of duty.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1935' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q4',
          text: 'The change, which was rigorously enforced, aroused considerable resistance, particularly in the provinces.',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        },
        {
          id: 'q5',
          text: 'In a famous incident a group of Muslims, led by an outspoken mullah named Shaikh Taqī Bohlūl, took refuge (bast) in the Gowharšād mosque in Mašhad, where they were attacked by security forces and a number of people were killed',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        }
      ]
    }
  ]
})
