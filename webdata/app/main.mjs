/*
 *    Copyright (c) 2018-2019, 2023 Unrud <unrud@outlook.com>
 *
 *    This file is part of Remote-Touchpad.
 *
 *    Remote-Touchpad is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    Remote-Touchpad is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with Remote-Touchpad.  If not, see <http://www.gnu.org/licenses/>.
 */

import InputController, * as inputcontrollerModule from "./inputcontroller.mjs";
import Socket from "./socket.mjs";
import UI from "./ui.mjs";

const STORAGE_KEY = "remoteTouchpadUrl";

// Samsung (and some other browsers) open "Add to Home screen" without the hash, so the secret is lost.
// Save the full URL when we have a hash; when opened without a hash, redirect to the saved URL.
if (!window.location.hash || window.location.hash === "#") {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && saved.startsWith("http")) {
            window.location.replace(saved);
        }
    } catch (_) {}
} else {
    try {
        localStorage.setItem(STORAGE_KEY, window.location.href);
    } catch (_) {}
}

const url = new URL("ws", location.href);
url.protocol = url.protocol == "http:" ? "ws:" : "wss:";

const socket = new Socket(url, window.location.hash.substr(1));
const inputController = new InputController(socket);
const ui = new UI(inputController);

socket.addEventListener("config", (event) => {
    const config = event.detail;
    inputController.configure(config);
    ui.configure(config);
});

socket.addEventListener("close", () => {
    ui.close();
});

window.app = {
    key: inputController.keyboardKey.bind(inputController),
    text: inputController.keyboardText.bind(inputController),
    runCommand: inputController.runCommand.bind(inputController),
    toggleFullscreen: ui.toggleFullscreen.bind(ui),
    showTextInput: ui.showTextInput.bind(ui),
    showKeys: ui.showKeys.bind(ui),
    setKeysPage: ui.setKeysPage.bind(ui),
    showCustomCommands: ui.showCustomCommands.bind(ui),
};
for (const name in inputcontrollerModule) {
    if (name.startsWith("KEY_")) {
        window.app[name] = inputcontrollerModule[name];
    }
}
