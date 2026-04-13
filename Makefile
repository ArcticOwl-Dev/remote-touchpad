# Local builds write here (ignored by git). Nix: use `nix build` as usual.
RESULTS_DIR := result
BIN := $(RESULTS_DIR)/remote-touchpad

.PHONY: all build clean

all: build

build:
	mkdir -p $(RESULTS_DIR)
	CGO_ENABLED=1 go build -tags portal,uinput,x11 -o $(BIN) .

clean:
	rm -f $(BIN)
