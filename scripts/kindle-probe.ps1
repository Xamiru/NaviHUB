# NaviHUB Kindle probe (read-only). Run it once on the Windows PC with the Kindle
# plugged in and unlocked, then give NaviHUB's agent the path of the JSON file it
# prints at the end. It decides whether NaviHUB can read the Kindle on Windows
# directly, and how CopyHere behaves over MTP.
#
#   powershell -NoProfile -ExecutionPolicy Bypass -File kindle-probe.ps1
#
# What it does, and only this:
#   - finds the Kindle under This PC through the Windows shell (Shell.Application);
#   - lists the top level of documents\ and koreader\ (names, sizes, dates);
#   - copies ONE small KOReader sidecar (metadata.*.lua) FROM the Kindle TO a new
#     folder under %TEMP%, and times it;
#   - writes probe.json beside that copy.
# It never writes, moves, renames or deletes anything on the Kindle: CopyHere is
# called only on the local temp folder. The JSON holds your device's file names;
# it stays on this PC unless you share it.

$ErrorActionPreference = 'Stop'
$started = Get-Date
$result = [ordered]@{
  probe        = 'navihub-kindle-probe'
  version      = 1
  startedAt    = $started.ToString('o')
  powershell   = $PSVersionTable.PSVersion.ToString()
  os           = [System.Environment]::OSVersion.VersionString
  devices      = @()
  copyTest     = $null
  errors       = @()
}

function Item-Info($item) {
  $size = $null
  try { $size = [int64]$item.ExtendedProperty('System.Size') } catch { }
  $modified = $null
  try { $modified = ([datetime]$item.ModifyDate).ToString('o') } catch { }
  [ordered]@{
    name     = $item.Name
    isFolder = [bool]$item.IsFolder
    size     = $size
    modified = $modified
    type     = $item.Type
  }
}

function Child($folder, [string]$name) {
  foreach ($i in $folder.Items()) { if ($i.Name -ieq $name) { return $i } }
  return $null
}

function Find-Sidecar($folder) {
  foreach ($e in $folder.Items()) {
    if (-not ($e.IsFolder -and $e.Name -like '*.sdr')) { continue }
    foreach ($f in $e.GetFolder.Items()) {
      if (-not $f.IsFolder -and $f.Name -like 'metadata.*.lua') { return $f }
    }
  }
  return $null
}

function List-Folder($folder, [int]$limit) {
  $out = @()
  $count = 0
  foreach ($i in $folder.Items()) {
    $count++
    if ($out.Count -lt $limit) { $out += ,(Item-Info $i) }
  }
  [ordered]@{ count = $count; entries = $out }
}

$shell = New-Object -ComObject Shell.Application
$thisPc = $shell.Namespace(17)
$sidecar = $null

foreach ($dev in $thisPc.Items()) {
  if ($dev.Name -notmatch 'kindle') { continue }
  $devInfo = [ordered]@{ name = $dev.Name; type = $dev.Type; path = $dev.Path; storages = @() }
  try {
    $devFolder = $dev.GetFolder
    foreach ($storage in $devFolder.Items()) {
      $st = [ordered]@{ name = $storage.Name; free = $null; total = $null; documents = $null; koreader = $null }
      try { $st.free = [int64]$storage.ExtendedProperty('System.FreeSpace') } catch { }
      try { $st.total = [int64]$storage.ExtendedProperty('System.Capacity') } catch { }
      $root = $storage.GetFolder
      $docs = Child $root 'documents'
      if ($docs -and $docs.IsFolder) {
        $docsFolder = $docs.GetFolder
        $st.documents = List-Folder $docsFolder 200
        # The first KOReader sidecar: documents\<x>.sdr\metadata.*.lua, else one
        # series folder deeper (manga sit in documents\<Series>\).
        if (-not $sidecar) { $sidecar = Find-Sidecar $docsFolder }
        if (-not $sidecar) {
          $looked = 0
          foreach ($e in $docsFolder.Items()) {
            if (-not $e.IsFolder -or $e.Name -like '*.sdr') { continue }
            $sidecar = Find-Sidecar $e.GetFolder
            $looked++
            if ($sidecar -or $looked -ge 20) { break }
          }
        }
      }
      $ko = Child $root 'koreader'
      if ($ko -and $ko.IsFolder) { $st.koreader = List-Folder $ko.GetFolder 200 }
      $devInfo.storages += ,$st
    }
  } catch {
    $result.errors += "reading $($dev.Name): $($_.Exception.Message)"
  }
  $result.devices += ,$devInfo
}

# The copy test: device -> a new local temp folder. Only the local folder's
# namespace receives CopyHere.
$tempDir = Join-Path $env:TEMP ('navihub-kindle-probe-' + $started.ToString('yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $tempDir | Out-Null
if ($sidecar) {
  $test = [ordered]@{ source = $sidecar.Name; sourceSize = $null; ok = $false; ms = $null; bytes = $null; firstLine = $null }
  try { $test.sourceSize = [int64]$sidecar.ExtendedProperty('System.Size') } catch { }
  try {
    $localFolder = $shell.Namespace($tempDir)
    $clock = [System.Diagnostics.Stopwatch]::StartNew()
    # 4 = no progress dialog, 16 = yes to all, 1024 = no error UI. MTP may ignore them.
    $localFolder.CopyHere($sidecar, 4 + 16 + 1024)
    $target = Join-Path $tempDir $sidecar.Name
    # CopyHere returns before the copy ends: wait for the file to stop growing.
    $last = -1
    while ($clock.ElapsedMilliseconds -lt 30000) {
      Start-Sleep -Milliseconds 200
      if (Test-Path -LiteralPath $target) {
        $len = (Get-Item -LiteralPath $target).Length
        if ($len -gt 0 -and $len -eq $last) { break }
        $last = $len
      }
    }
    $test.ms = $clock.ElapsedMilliseconds
    if (Test-Path -LiteralPath $target) {
      $test.ok = $true
      $test.bytes = (Get-Item -LiteralPath $target).Length
      $test.firstLine = (Get-Content -LiteralPath $target -TotalCount 1)
    }
  } catch {
    $result.errors += "copy test: $($_.Exception.Message)"
  }
  $result.copyTest = $test
} else {
  $result.errors += 'no KOReader sidecar found directly under documents\ to copy'
}

$result.finishedAt = (Get-Date).ToString('o')
$out = Join-Path $tempDir 'probe.json'
$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $out -Encoding UTF8
Write-Host ''
Write-Host "Done. Nothing on the Kindle was changed. The result is in:"
Write-Host "  $out"
