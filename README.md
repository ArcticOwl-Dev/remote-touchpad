# Remote Touchpad

Control mouse and keyboard from the webbrowser of a smartphone
(or any other device with a touchscreen).
To take control open the displayed URL or scan the QR code.

Supports Flatpak's RemoteDesktop portal (for Wayland), Windows and X11.

## Building

**Nix** (recommended): from the repo root, reproducible build with no local Go toolchain:

```sh
nix build
# ./result/bin/remote-touchpad
```

To hack with Go and libraries in your environment, use `nix develop` (or `direnv allow` with the included `.envrc`), then for example:

```sh
CGO_ENABLED=1 go build -tags portal,uinput,x11 -o ./remote-touchpad .
```

## Installation

* [Flatpak](https://flathub.org/apps/details/com.github.unrud.RemoteTouchpad)
* [Snap](https://snapcraft.io/remote-touchpad)
* [Windows](https://github.com/Unrud/remote-touchpad/releases/latest)
* Nix (Linux): reproducible dev environment and package. From the repo root:

  * **Develop**: `nix develop` (or `direnv allow` if using [direnv](https://direnv.net/) with the included `.envrc`), then build as in [Building](#building) (e.g. `go build`).
  * **Build**: `nix build` — binary at `result/bin/remote-touchpad` (see [Building](#building)).
  * **Install** (e.g. into your profile): `nix profile install .#`

* Golang:
  * Portal & uinput & X11:

    ```sh
    go install -tags portal,uinput,x11 github.com/unrud/remote-touchpad@latest
    ```
  * Windows:

    ```sh
    go install github.com/unrud/remote-touchpad@latest
    ```

## Custom buttons

You can define extra actions that appear in the web UI (📋 in the top-right on the touchpad screen). Each action runs a **shell command on the machine where remote-touchpad is running** (on Linux: `sh -c '…'`; on Windows: `cmd /c …`).

### Config file

The config is a **JSON array** of objects:

| Field     | Meaning |
|----------|---------|
| `label`  | Accessible name / tooltip (recommended). Shown as text only if `icon` is empty or invalid. |
| `icon`   | **SVG only:** inline `<svg …>…</svg>` markup, or a `data:image/svg+xml` data URL. Emoji or other text is ignored (button falls back to `label`). |
| `command`| Shell command to run when the button is pressed. |

**Order matters:** the first object is button index `0`, the second is `1`, and so on.

Use `stroke="currentColor"` / `fill="currentColor"` (or no `fill` on stroked icons) so icons match the UI theme.

Example (inline SVG, one line per `icon` for valid JSON):

```json
[
  {
    "label": "Lock screen",
    "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></svg>",
    "command": "xdg-screensaver lock"
  }
]
```

Icons follow the same stroke style as [Feather](https://feathericons.com/) (MIT license); only use SVG from sources you trust.

### Where the file lives

- **Default:** `$XDG_CONFIG_HOME/remote-touchpad/buttons.json` (usually `~/.config/remote-touchpad/buttons.json` on Linux). If that file does not exist, the app may create it with built-in examples (e.g. lock / poweroff) when it can write there.
- **Override:** pass `-buttons-config /path/to/buttons.json`.

If the file is missing or empty, the 📋 control stays hidden.

### Notes

- Commands inherit **remote-touchpad’s environment** (`PATH`, `DISPLAY`, D-Bus, etc.). If you start the app from **systemd** or another context without a full desktop session, shell commands may fail or behave differently than in a normal terminal.
- Failed commands are logged on the **server** (stderr); the web UI does not show command output.

## Screenshots

![screenshot 1](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/1.png)

![screenshot 2](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/2.png)

![screenshot 3](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/3.png)

![screenshot 4](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/4.png)
