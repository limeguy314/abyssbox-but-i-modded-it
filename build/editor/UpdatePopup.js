import { HTML } from "imperative-html/dist/esm/elements-strict";
const { button, div, a } = HTML;
const theFunni = [
    "Okay",
    "Whatever",
    "Go Away",
    "Who asked",
    "Close",
    "Hush",
    "Exodia!! OBLITERATE!!!!",
    "滅びる",
    "Who cares",
    "Yep",
    "Uh huh",
    "Nobody asked",
    "X",
    "Shut up",
    "Thank you",
    "Thanks",
    "Alright"
];
var funnyText = Math.floor(Math.random() * theFunni.length);
export class UpdatePopup {
    constructor() {
        this.closeButton = button({}, theFunni[funnyText]);
        this.patchNotesLink = a({ href: "https://choptop84.github.io/abyssbox-app/patch-notes/", target: "_blank", }, "Patch Notes!");
        this.updatePopupDiv = div({ class: "updatePopup load" }, div({}, "Seems that AbyssBox has gotten an update. You can check it out what it adds in the ", this.patchNotesLink), this.closeButton);
        this._close = () => {
            window.localStorage.setItem("curVer", "1.5.1");
            this.updatePopupDiv.style.display = "none";
        };
        this.closeButton.addEventListener("click", this._close);
    }
}
//# sourceMappingURL=UpdatePopup.js.map