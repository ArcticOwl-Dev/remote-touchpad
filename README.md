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

## Screenshots

![screenshot 1](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/1.png)

![screenshot 2](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/2.png)

![screenshot 3](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/3.png)

![screenshot 4](https://raw.githubusercontent.com/Unrud/remote-touchpad/master/screenshots/4.png)
