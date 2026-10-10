import { api } from '../../lib/api'
import StorageFolderSetting from '../../components/StorageFolderSetting'
import { type SaveFn, TextSetting } from './shared'

// ---- Local folders ----------------------------------------------------------

export function FoldersSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  return (
    <>
      <TextSetting
        folder
        settingKey="audio.dir"
        data={data}
        onSave={onSave}
        title="Anime music folder"
        placeholder="/media/you/Drive/Music/Anime"
        description="Where downloaded opening/ending audio is stored. Point it at a roomier drive to save space — songs are a few MB each and add up. Leave blank to use the default app folder. Changing this only affects newly-downloaded songs; existing files stay where they were saved."
      />
      <TextSetting
        folder
        settingKey="manga.dir"
        data={data}
        onSave={onSave}
        title="Manga library folder"
        placeholder="/home/you/Manga"
        description="The root folder your manga lives in. Set automatically the first time you link a series folder from a manga page; chapter paths are stored relative to this root, so if you move the library, just update this to the new location."
      />
      <TextSetting
        folder
        settingKey="books.dir"
        data={data}
        onSave={onSave}
        title="Books library folder"
        placeholder="/home/you/Books"
        description="The root folder your books (EPUBs) live in. Set automatically the first time you link a book's folder from a book page; volume paths are stored relative to this root, so if you move the library, just update this to the new location."
      />
      <TextSetting
        folder
        settingKey="video.dir"
        data={data}
        onSave={onSave}
        title="Video library folder"
        placeholder="/home/you/Videos"
        description="The root folder your anime, movie and TV episodes live in. Set automatically the first time you attach a folder from a title page; file paths are stored relative to this root, so if you move the library, just update this and rescan."
      />
      <TextSetting
        folder
        settingKey="wrestling.dir"
        data={data}
        onSave={onSave}
        title="Wrestling library folder"
        placeholder="/home/you/Wrestling"
        description="The root folder your PPV and match rips live in. Set automatically the first time you attach a folder from an event page; file paths are stored relative to this root, so if you move the library, just update this and rescan."
      />
      <TextSetting
        folder
        settingKey="football.dir"
        data={data}
        onSave={onSave}
        title="Football media folder"
        placeholder="/home/you/Football"
        description="The root containing Football clips, highlights, full matches, interviews and documentaries. Attachments stay in place and are opened in the OS player; NaviHUB never scans, copies, moves or deletes these files."
      />
      <TextSetting
        folder
        settingKey="music.dir"
        data={data}
        onSave={onSave}
        title="Music library folder"
        placeholder="/home/you/Music"
        description="The root folder your music lives in (artists as folders, albums inside them). Set automatically when you pick a folder on the Music page; tracks are stored relative to this root, so if you move the library, just update this and rescan."
      />
      <StorageFolderSetting
        root="pictures"
        title="Pictures folder"
        description={
          <>
            Wallpapers and fan art from the Art tab, one folder per title (e.g.{' '}
            <span className="text-gray-400">Berserk (manga)/wallpapers</span>). Move… copies
            everything to the new folder, then removes the old copies.
          </>
        }
      />
      <StorageFolderSetting
        root="media"
        title="Media folder"
        description={
          <>
            Imported covers, photos and character images, plus images you picked by hand (in its{' '}
            <span className="text-gray-400">picked</span> folder). It grows with your library, so
            it can live on another drive.
          </>
        }
      />
      <StorageFolderSetting
        root="history"
        title="History archive folder"
        description="Where files you attach to History pages, and public-domain recordings you download from research suggestions, are copied (one folder per page). Defaults to the app's data folder. Move… copies everything to the new folder, then removes the old copies."
      />
      <TextSetting
        folder
        settingKey="slideshow.dir"
        data={data}
        onSave={onSave}
        title="Slideshow folder"
        placeholder="/home/you/Pictures/NaviHUB/Slideshow"
        description={
          <>
            Right-click any image on a title&apos;s Art tab and choose{' '}
            <span className="text-gray-400">Add to slideshow</span> to copy it here. Point Windows
            Settings &gt; Personalization &gt; Background &gt; Slideshow at this folder once and the
            desktop cycles through them — NaviHUB does not need to be running. Leave blank to use{' '}
            <span className="text-gray-400">&lt;Pictures folder&gt;/Slideshow</span>. Changing this
            only affects newly added images.
          </>
        }
        actions={
          <button
            className="btn-ghost shrink-0"
            onClick={() => void api.pictures.openSlideshowFolder()}
          >
            Open folder
          </button>
        }
      />
    </>
  )
}
