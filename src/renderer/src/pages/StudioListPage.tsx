import EntityListView from '../components/EntityListView'

export default function StudioListPage() {
  return (
    <EntityListView
      kind="company"
      title="Studio directory"
      basePath="/studios"
      mediaType="anime"
      contextLens
    />
  )
}
