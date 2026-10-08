import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'constitution-of-the-islamic-republic-1979-legitimacy',
  about: ['event:constitution-of-the-islamic-republic-1979'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'guardianship-of-the-jurist-as-islamic-government',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'During the Occultation of the Walial-\'Asr (may God hasten his reappearance), the wilayah and leadership of the Ummah devolve upon the just [\'adil] and pious [muttaqi] faqih, who is fully aware of the circumstances of his age; courageous, resourceful, and possessed of administrative ability, will assume the responsibilities of this office in accordance with Article 107.',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
          }
        },
        {
          id: 'q2',
          text: 'The plan of the Islamic government based upon wilayat al-faqih, as proposed by Imam Khumaynî at the height of the period of repression and strangulation practised by the despotic regime, produced a new specific, and streamlined motive for the Muslim people, opening up before them the true path of Islamic ideological struggle, and giving greater intensity to the struggle of militant and committed Muslims both within the country and abroad.',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'The stage was thus set for the defeat of the proponents of national sovereignty and the unveiling of Khomeini’s theocratic program.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    },
    {
      id: 'jurists-must-approve-the-majles',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Hosayn-Ali Montazeri' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'If we want to follow the Islamic law, we must say that the enactments of the Majles are not legal and enforceable without the approval of the jurists of the Council of guardians',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    },
    {
      id: 'fuhrer-principle',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q4',
          text: 'And what of the so-called Islamic Constitution which institutionalizes clerical supremacy? Its critical feature is the supreme power it gives to its leader, which parallels the “fuhrer” principle.',
          lang: 'en',
          cite: { source: 'pahlavi-1980-answer-to-history', loc: { section: 'The Terror' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'theocracy-instead-of-national-sovereignty',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Said Amir Arjomand' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The Assembly of experts had altered the draft submitted by the Bāzargān government beyond recognition. The new document was not a republican constitution made consistent with Shiʿite Islam but a constitution purporting to be fundamentally Islamic and to incorporate specifically Shiʿite principles of government.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q6',
          text: 'Neither national sovereignty nor parliamentary representation is mentioned as a defining feature of the Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    },
    {
      id: 'draft-gave-clerics-little-role',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Aside from substituting a strong president, on the Gaullist model, for the monarchy, the constitution did not differ markedly from the 1906 constitution and did not give the clerics an important role in the new state structure.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The New Constitution', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        },
        {
          id: 'q8',
          text: 'Clerics, and members and supporters of the IRP dominated the assembly, which revamped the constitution to establish the basis for a state dominated by the Shia clergy.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The New Constitution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        }
      ]
    },
    {
      id: 'bazargan-never-endorsed-welayat-e-faqih',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'Crucial, too, was the fact that Bāzargān had never endorsed the principle of welāyat-e faqih.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '69' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
