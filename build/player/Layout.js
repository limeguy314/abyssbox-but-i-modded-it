import { HTML } from "imperative-html/dist/esm/elements-strict";
export class SongPlayerLayout {
    static setLayout(layout) {
        this._styleElement.textContent = this._spLayoutMap[layout];
    }
}
SongPlayerLayout.layoutLookup = new Map();
SongPlayerLayout._spLayoutMap = {
    "classic": `
        .songPlayerContainer {
            display:grid; 
            grid-template-areas: 'visualizer visualizer' 'control-center control-center'; 
            grid-template-rows: 92.6vh 7.4vh; 
            grid-template-columns: minmax(0px,0px);
        }
        
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        } 
        `,
    "top": `
        .songPlayerContainer {
            display:grid; 
            grid-template-areas: 'control-center control-center' 'visualizer visualizer'; 
            grid-template-rows: 7.4vh 92.6vh; 
            grid-template-columns: minmax(0px,0px);
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        }    
        `,
    "shitbox4": `
        .songPlayerContainer {
            display:grid; 
            grid-template-areas: 'visualizer visualizer' 'control-center control-center'; 
            grid-template-rows: 92.6vh 7.4vh; 
            grid-template-columns: minmax(0px,0px);
        }
        div.visualizer {
            transform: skew(30deg,20deg) scale(0.5);
            }
        .timelineContainer {
            transform: translateX(0);
        }    
        `,
    "boxbeep": `
        .songPlayerContainer {
            display:grid; 
            grid-template-areas: 'visualizer visualizer' 'control-center control-center'; 
            grid-template-rows: 92.6vh 7.4vh; 
            grid-template-columns: minmax(0px,0px);
        }
        div.visualizer {
            transform: scale(-1);
            }
        .timelineContainer {
            transform: translateX(0);
        }
        `,
    "piano": `
        .songPlayerContainer {
            display:grid; 
            grid-template-areas: 'visualizer visualizer' 'control-center control-center'; 
            grid-template-rows: 92.6vh 7.4vh; 
            grid-template-columns: minmax(0px,0px);
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        }
        `,
    "vertical": `
        .songPlayerContainer {
            display:grid; 
            grid-template-areas: 'visualizer visualizer' 'piano piano' 'control-center control-center'; 
            grid-template-rows: 82.6vh 10vh 7.4vh; 
            grid-template-columns: minmax(0px,0px);
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(0);
        }
        `,
    "middle": `
        .songPlayerContainer {
            display:grid; 
            grid-template-areas: 'visualizer visualizer' 'control-center control-center'; 
            grid-template-rows: 92.6vh 7.4vh; 
            grid-template-columns: minmax(0px,0px);
        }
        div.visualizer {
            transform: scale(1);
            }
        .timelineContainer {
            transform: translateX(50vw);
        }
        `,
};
SongPlayerLayout._styleElement = document.head.appendChild(HTML.style({ type: "text/css" }));
//# sourceMappingURL=Layout.js.map