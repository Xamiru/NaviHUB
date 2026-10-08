import { definePlace } from '../../schema'

export default definePlace({
  id: 'falkland-islands',
  names: [
    { text: 'Falkland Islands', lang: 'en', role: 'primary' },
    {
      text: 'Islas Malvinas',
      lang: 'es',
      role: 'contested',
      cites: [
        {
          source: 'state-dept-milestones-crisis-in-the-south-atlantic',
          loc: {
            section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
            para: '1'
          }
        }
      ],
      usedBy: [
        { kind: 'state', name: 'Argentina' }
      ]
    }
  ],
  researched: '2026-10-08',
  placeType: 'region',
  regions: ['latin-america'],
  modernCountry: 'FK'
})
