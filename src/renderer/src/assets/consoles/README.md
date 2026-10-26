# Console hardware photos

Bundled product photos for the Emulators hub (Games → Emulators): one per platform key in
`src/shared/emulation/platforms.ts`, used by `lib/consoleArt.ts`. Fetched from Wikimedia Commons on
2026-10-26, checked by eye for the right hardware, trimmed to the subject and saved as transparent
webp. Runtime never fetches them.

Each key has two files: `<key>-tile.webp` (at most 640 x 400, for hub tiles, chips and game-file rows)
and `<key>-banner.webp` (at most 1600 x 1000, for the console page banner). Landscape subjects are
1600 px wide; portrait subjects (handhelds, tower consoles, the arcade cabinet) are limited by the
1000 px height instead. The arcade source is 1000 px square, so its banner is 985 px tall; it is shown
as a cutout beside the banner text, never full-screen.

Background removal done here: `3ds`, `nes` and `gc` had white backgrounds (flood-filled from the
corners); `arcade` had a white floor glow (alpha thresholded). Every other source was already a
transparent cutout on Commons.

| Key | Commons file | Author | License |
| --- | --- | --- | --- |
| `nes` | [NES-Console-Set.png](https://commons.wikimedia.org/wiki/File:NES-Console-Set.png) | Evan-Amos | Public domain |
| `snes` | [SNES-Mod1-Console-Set.png](https://commons.wikimedia.org/wiki/File:SNES-Mod1-Console-Set.png) | Evan-Amos | CC BY-SA 3.0 |
| `n64` | [N64-Console-Set.png](https://commons.wikimedia.org/wiki/File:N64-Console-Set.png) | Evan-Amos | Public domain |
| `gb` | [Game-Boy-FL.png](https://commons.wikimedia.org/wiki/File:Game-Boy-FL.png) | Evan-Amos (background removed by a Commons editor) | Public domain |
| `gbc` | [Nintendo-Game-Boy-Color-FL.png](https://commons.wikimedia.org/wiki/File:Nintendo-Game-Boy-Color-FL.png) | Evan-Amos, modified by Gunnar.offel | Public domain |
| `gba` | [Nintendo-Game-Boy-Advance-Purple-FL.png](https://commons.wikimedia.org/wiki/File:Nintendo-Game-Boy-Advance-Purple-FL.png) | Evan-Amos | Public domain |
| `nds` | [Nintendo-DS-Lite-Black-Open.png](https://commons.wikimedia.org/wiki/File:Nintendo-DS-Lite-Black-Open.png) | Evan-Amos | Public domain |
| `3ds` | [Nintendo-3DS-AquaOpen.png](https://commons.wikimedia.org/wiki/File:Nintendo-3DS-AquaOpen.png) | Evan-Amos | Public domain |
| `gc` | [GameCube-Set.jpg](https://commons.wikimedia.org/wiki/File:GameCube-Set.jpg) | Evan-Amos | Public domain |
| `wii` | [Wii-Console.png](https://commons.wikimedia.org/wiki/File:Wii-Console.png) | Evan-Amos | Public domain |
| `wiiu` | [Wii U Console and Gamepad.png](https://commons.wikimedia.org/wiki/File:Wii_U_Console_and_Gamepad.png) | Takimata, edited by Tokyoship | CC BY-SA 3.0 |
| `switch` | [Nintendo-Switch-wJoyCons-BlRd-Standing-FL.png](https://commons.wikimedia.org/wiki/File:Nintendo-Switch-wJoyCons-BlRd-Standing-FL.png) | Evan-Amos, modified by Gunnar.offel | Public domain |
| `ps1` | [PSX-Console-wController.png](https://commons.wikimedia.org/wiki/File:PSX-Console-wController.png) | Evan-Amos | Public domain |
| `ps2` | [PS2-Fat-Console-Set.png](https://commons.wikimedia.org/wiki/File:PS2-Fat-Console-Set.png) | Evan-Amos | Public domain |
| `ps3` | [Sony-PlayStation-3-CECHA01-wController-L.png](https://commons.wikimedia.org/wiki/File:Sony-PlayStation-3-CECHA01-wController-L.png) | Evan-Amos | Public domain |
| `psp` | [PSP-1000.png](https://commons.wikimedia.org/wiki/File:PSP-1000.png) | Derivative of Evan-Amos's Psp-1000.jpg | CC BY-SA 3.0 |
| `vita` | [PlayStation-Vita-1101-FL.png](https://commons.wikimedia.org/wiki/File:PlayStation-Vita-1101-FL.png) | Evan-Amos | Public domain |
| `ps4` | [PS4-Console-wDS4.png](https://commons.wikimedia.org/wiki/File:PS4-Console-wDS4.png) | Evan-Amos | Public domain |
| `genesis` | [Sega-Genesis-Mod1-Set.png](https://commons.wikimedia.org/wiki/File:Sega-Genesis-Mod1-Set.png) | Evan-Amos | Public domain |
| `sms` | [Sega-Master-System-Set.png](https://commons.wikimedia.org/wiki/File:Sega-Master-System-Set.png) | Evan-Amos | Public domain |
| `saturn` | [Sega-Saturn-Console-Set-Mk1.png](https://commons.wikimedia.org/wiki/File:Sega-Saturn-Console-Set-Mk1.png) | Evan-Amos | Public domain |
| `dc` | [Dreamcast-Console-Set.png](https://commons.wikimedia.org/wiki/File:Dreamcast-Console-Set.png) | Evan-Amos | CC BY-SA 3.0 |
| `xbox` | [Xbox-Console-wDuke-L.png](https://commons.wikimedia.org/wiki/File:Xbox-Console-wDuke-L.png) | Evan-Amos (background removed by a Commons editor) | Public domain |
| `x360` | [Xbox-360-Pro-wController.png](https://commons.wikimedia.org/wiki/File:Xbox-360-Pro-wController.png) | Evan-Amos (background removed by a Commons editor) | Public domain |
| `arcade` | [Borne arcade Pacman.png](https://commons.wikimedia.org/wiki/File:Borne_arcade_Pacman.png) | Fan de Rétro | CC BY 4.0 |
| `pce` | [PC-Engine-Console-Set.png](https://commons.wikimedia.org/wiki/File:PC-Engine-Console-Set.png) | Evan-Amos | Public domain |
