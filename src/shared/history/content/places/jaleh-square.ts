import { definePlace } from '../../schema'

export default definePlace({
  id: 'jaleh-square',
  names: [
    { text: 'Jaleh Square', lang: 'en', role: 'primary' },
    { text: 'میدان ژاله', lang: 'fa', role: 'native', translit: 'Meydān-e Žāla' },
    {
      text: 'Shohada Square',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  placeType: 'site',
  regions: ['iran'],
  modernCountry: 'IR',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A mass demonstration took place on 8 September (“Black Friday”) at the Meydān-e Žāla (renamed Meydān-e Šohadāʾ after the revolution); it was attacked by government forces, resulting in the reported slaughter of some 2,000 people; more were probably killed in other parts of the city.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ]
})
