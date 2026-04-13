{
  description = "Remote Touchpad - control mouse and keyboard from a smartphone webbrowser";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs }: let
    supportedSystems = [ "x86_64-linux" "aarch64-linux" ];
    forAllSystems = nixpkgs.lib.genAttrs supportedSystems;
    pkgsFor = system: import nixpkgs { inherit system; };
  in {
    packages = forAllSystems (system: let
      pkgs = pkgsFor system;
    in {
      default = pkgs.buildGo125Module {
        pname = "remote-touchpad";
        version = "1.6.0";
        src = ./.;

        vendorHash = "sha256-aI1b63xBr685zU5C200H9IudP6GyBn5gio1srgY9llc=";

        buildInputs = with pkgs; [
          xorg.libX11
          xorg.libXrandr
          xorg.libXtst
          xorg.libXt
          xorg.libXi
        ];

        buildPhase = ''
          runHook preBuild
          export CGO_ENABLED=1
          go build -mod=vendor -tags portal,uinput,x11 -o $out/bin/remote-touchpad .
          runHook postBuild
        '';

        meta = with pkgs.lib; {
          description = "Control mouse and keyboard from the webbrowser of a smartphone";
          homepage = "https://github.com/Unrud/remote-touchpad";
          license = licenses.gpl3Plus;
          maintainers = [ ];
          platforms = platforms.linux;
        };
      };
    });

    devShells = forAllSystems (system: let
      pkgs = pkgsFor system;
    in {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [
          go
          xorg.libX11
          xorg.libXrandr
          xorg.libXtst
          xorg.libXt
          xorg.libXi
        ];
        CGO_ENABLED = "1";
      };
    });
  };
}
