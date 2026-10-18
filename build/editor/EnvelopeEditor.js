import { Config } from "../synth/SynthConfig";
import { ChangeSetEnvelopeTarget, ChangeSetEnvelopeType, ChangeRemoveEnvelope, ChangeEnvelopePitchStart, ChangeEnvelopePitchEnd, ChangeEnvelopeInverse, ChangePerEnvelopeSpeed, ChangeEnvelopeLowerBound, ChangeEnvelopeUpperBound, ChangeRandomEnvelopeSteps, ChangeRandomEnvelopeSeed, PasteEnvelope, ChangeSetEnvelopeWaveform } from "./changes";
import { HTML, SVG } from "imperative-html/dist/esm/elements-strict";
import { prettyNumber } from "./EditorConfig";
export class EnvelopeEditor {
    constructor(_doc, _extraSettingsDropdown, _openPrompt) {
        this._doc = _doc;
        this._extraSettingsDropdown = _extraSettingsDropdown;
        this._openPrompt = _openPrompt;
        this.container = HTML.div({ class: "envelopeEditor" });
        this._rows = [];
        this._targetSelects = [];
        this._envelopeSelects = [];
        this._deleteButtons = [];
        this.extraSettingsDropdowns = [];
        this.extraPitchSettingsGroups = [];
        this.extraSettingsDropdownGroups = [];
        this.extraRandomSettingsGroups = [];
        this.extraLFODropdownGroups = [];
        this.openExtraSettingsDropdowns = [];
        this.perEnvelopeSpeedGroups = [];
        this._pitchStartSliders = [];
        this.pitchStartBoxes = [];
        this._pitchEndSliders = [];
        this.pitchEndBoxes = [];
        this._startNoteDisplays = [];
        this._endNoteDisplays = [];
        this._inverters = [];
        this._perEnvelopeSpeedSliders = [];
        this._perEnvelopeSpeedDisplays = [];
        this.perEnvelopeLowerBoundBoxes = [];
        this.perEnvelopeUpperBoundBoxes = [];
        this._perEnvelopeLowerBoundSliders = [];
        this._perEnvelopeUpperBoundSliders = [];
        this.randomStepsBoxes = [];
        this.randomSeedBoxes = [];
        this._randomStepsSliders = [];
        this._randomSeedSliders = [];
        this._randomEnvelopeTypeSelects = [];
        this._randomStepsWrappers = [];
        this._envelopeCopyButtons = [];
        this._envelopePasteButtons = [];
        this._waveformSelects = [];
        this.LFOStepsBoxes = [];
        this._LFOStepsSliders = [];
        this._LFOStepsWrappers = [];
        this._renderedEnvelopeCount = 0;
        this._renderedEqFilterCount = -1;
        this._renderedNoteFilterCount = -1;
        this._renderedEffects = 0;
        this._lastChange = null;
        this._onChange = (event) => {
            const targetSelectIndex = this._targetSelects.indexOf(event.target);
            const envelopeSelectIndex = this._envelopeSelects.indexOf(event.target);
            const inverterIndex = this._inverters.indexOf(event.target);
            const startBoxIndex = this.pitchStartBoxes.indexOf(event.target);
            const endBoxIndex = this.pitchEndBoxes.indexOf(event.target);
            const startSliderIndex = this._pitchStartSliders.indexOf(event.target);
            const endSliderIndex = this._pitchEndSliders.indexOf(event.target);
            const speedSliderIndex = this._perEnvelopeSpeedSliders.indexOf(event.target);
            const lowerBoundBoxIndex = this.perEnvelopeLowerBoundBoxes.indexOf(event.target);
            const upperBoundBoxIndex = this.perEnvelopeUpperBoundBoxes.indexOf(event.target);
            const lowerBoundSliderIndex = this._perEnvelopeLowerBoundSliders.indexOf(event.target);
            const upperBoundSliderIndex = this._perEnvelopeUpperBoundSliders.indexOf(event.target);
            const randomStepsBoxIndex = this.randomStepsBoxes.indexOf(event.target);
            const randomSeedBoxIndex = this.randomSeedBoxes.indexOf(event.target);
            const randomStepsSliderIndex = this._randomStepsSliders.indexOf(event.target);
            const randomSeedSliderIndex = this._randomSeedSliders.indexOf(event.target);
            const waveformSelectIndex = this._waveformSelects.indexOf(event.target);
            const randomTypeSelectIndex = this._randomEnvelopeTypeSelects.indexOf(event.target);
            const LFOStepsBoxIndex = this.LFOStepsBoxes.indexOf(event.target);
            const LFOStepsSliderIndex = this._LFOStepsSliders.indexOf(event.target);
            if (targetSelectIndex != -1) {
                const combinedValue = parseInt(this._targetSelects[targetSelectIndex].value);
                const target = combinedValue % Config.instrumentAutomationTargets.length;
                const index = (combinedValue / Config.instrumentAutomationTargets.length) >>> 0;
                this._doc.record(new ChangeSetEnvelopeTarget(this._doc, targetSelectIndex, target, index));
            }
            else if (envelopeSelectIndex != -1) {
                const envelopeIndex = this._envelopeSelects.indexOf(event.target);
                this._doc.record(new ChangeSetEnvelopeType(this._doc, envelopeIndex, this._envelopeSelects[envelopeIndex].selectedIndex));
                this.rerenderExtraSettings(envelopeSelectIndex);
                this.render();
            }
            else if (waveformSelectIndex != -1) {
                this._doc.record(new ChangeSetEnvelopeWaveform(this._doc, this._waveformSelects[waveformSelectIndex].value, waveformSelectIndex));
            }
            else if (randomTypeSelectIndex != -1) {
                this._doc.record(new ChangeSetEnvelopeWaveform(this._doc, this._randomEnvelopeTypeSelects[randomTypeSelectIndex].value, randomTypeSelectIndex));
            }
            else if (inverterIndex != -1) {
                this._doc.record(new ChangeEnvelopeInverse(this._doc, this._inverters[inverterIndex].checked, inverterIndex));
            }
            else if (startBoxIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (endBoxIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (startSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (endSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (speedSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (lowerBoundBoxIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (upperBoundBoxIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (lowerBoundSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (upperBoundSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (randomStepsBoxIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (randomSeedBoxIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (randomStepsSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (randomSeedSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (LFOStepsBoxIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
            else if (LFOStepsSliderIndex != -1) {
                if (this._lastChange != null) {
                    this._doc.record(this._lastChange);
                    this._lastChange = null;
                }
            }
        };
        this._onClick = (event) => {
            const deleteButtonIndex = this._deleteButtons.indexOf(event.target);
            const envelopeCopyButtonIndex = this._envelopeCopyButtons.indexOf(event.target);
            const envelopePasteButtonIndex = this._envelopePasteButtons.indexOf(event.target);
            if (deleteButtonIndex != -1) {
                this._doc.record(new ChangeRemoveEnvelope(this._doc, deleteButtonIndex));
                this.extraSettingsDropdownGroups[deleteButtonIndex].style.display = "none";
            }
            else if (envelopeCopyButtonIndex != -1) {
                const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
                window.localStorage.setItem("envelopeCopy", JSON.stringify(instrument.envelopes[envelopeCopyButtonIndex].toJsonObject()));
            }
            else if (envelopePasteButtonIndex != -1) {
                const envelopeCopy = window.localStorage.getItem("envelopeCopy");
                this._doc.record(new PasteEnvelope(this._doc, JSON.parse(String(envelopeCopy)), envelopePasteButtonIndex));
            }
        };
        this._onInput = (event) => {
            const startBoxIndex = this.pitchStartBoxes.indexOf(event.target);
            const endBoxIndex = this.pitchEndBoxes.indexOf(event.target);
            const startSliderIndex = this._pitchStartSliders.indexOf(event.target);
            const endSliderIndex = this._pitchEndSliders.indexOf(event.target);
            const speedSliderIndex = this._perEnvelopeSpeedSliders.indexOf(event.target);
            const lowerBoundBoxIndex = this.perEnvelopeLowerBoundBoxes.indexOf(event.target);
            const upperBoundBoxIndex = this.perEnvelopeUpperBoundBoxes.indexOf(event.target);
            const lowerBoundSliderIndex = this._perEnvelopeLowerBoundSliders.indexOf(event.target);
            const upperBoundSliderIndex = this._perEnvelopeUpperBoundSliders.indexOf(event.target);
            const randomStepsBoxIndex = this.randomStepsBoxes.indexOf(event.target);
            const randomSeedBoxIndex = this.randomSeedBoxes.indexOf(event.target);
            const randomStepsSliderIndex = this._randomStepsSliders.indexOf(event.target);
            const randomSeedSliderIndex = this._randomSeedSliders.indexOf(event.target);
            const LFOStepsBoxIndex = this.LFOStepsBoxes.indexOf(event.target);
            const LFOStepsSliderIndex = this._LFOStepsSliders.indexOf(event.target);
            if (startBoxIndex != -1) {
                this._lastChange = new ChangeEnvelopePitchStart(this._doc, parseInt(this.pitchStartBoxes[startBoxIndex].value), startBoxIndex);
            }
            else if (endBoxIndex != -1) {
                this._lastChange = new ChangeEnvelopePitchEnd(this._doc, parseInt(this.pitchEndBoxes[endBoxIndex].value), endBoxIndex);
            }
            else if (startSliderIndex != -1) {
                this._lastChange = new ChangeEnvelopePitchStart(this._doc, parseInt(this._pitchStartSliders[startSliderIndex].value), startSliderIndex);
            }
            else if (endSliderIndex != -1) {
                this._lastChange = new ChangeEnvelopePitchEnd(this._doc, parseInt(this._pitchEndSliders[endSliderIndex].value), endSliderIndex);
            }
            else if (speedSliderIndex != -1) {
                this._lastChange = new ChangePerEnvelopeSpeed(this._doc, this.convertIndexSpeed(parseFloat(this._perEnvelopeSpeedSliders[speedSliderIndex].value), "speed"), speedSliderIndex);
            }
            else if (lowerBoundBoxIndex != -1) {
                this._lastChange = new ChangeEnvelopeLowerBound(this._doc, parseFloat(this.perEnvelopeLowerBoundBoxes[lowerBoundBoxIndex].value), lowerBoundBoxIndex);
            }
            else if (upperBoundBoxIndex != -1) {
                this._lastChange = new ChangeEnvelopeUpperBound(this._doc, parseFloat(this.perEnvelopeUpperBoundBoxes[upperBoundBoxIndex].value), upperBoundBoxIndex);
            }
            else if (lowerBoundSliderIndex != -1) {
                this._lastChange = new ChangeEnvelopeLowerBound(this._doc, parseFloat(this._perEnvelopeLowerBoundSliders[lowerBoundSliderIndex].value), lowerBoundSliderIndex);
            }
            else if (upperBoundSliderIndex != -1) {
                this._lastChange = new ChangeEnvelopeUpperBound(this._doc, parseFloat(this._perEnvelopeUpperBoundSliders[upperBoundSliderIndex].value), upperBoundSliderIndex);
            }
            else if (randomStepsBoxIndex != -1) {
                this._lastChange = new ChangeRandomEnvelopeSteps(this._doc, parseFloat(this.randomStepsBoxes[randomStepsBoxIndex].value), randomStepsBoxIndex);
            }
            else if (randomSeedBoxIndex != -1) {
                this._lastChange = new ChangeRandomEnvelopeSeed(this._doc, parseFloat(this.randomSeedBoxes[randomSeedBoxIndex].value), randomSeedBoxIndex);
            }
            else if (randomStepsSliderIndex != -1) {
                this._lastChange = new ChangeRandomEnvelopeSteps(this._doc, parseFloat(this._randomStepsSliders[randomStepsSliderIndex].value), randomStepsSliderIndex);
            }
            else if (randomSeedSliderIndex != -1) {
                this._lastChange = new ChangeRandomEnvelopeSeed(this._doc, parseFloat(this._randomSeedSliders[randomSeedSliderIndex].value), randomSeedSliderIndex);
            }
            else if (LFOStepsBoxIndex != -1) {
                this._lastChange = new ChangeRandomEnvelopeSteps(this._doc, parseFloat(this.LFOStepsBoxes[LFOStepsBoxIndex].value), LFOStepsBoxIndex);
            }
            else if (LFOStepsSliderIndex != -1) {
                this._lastChange = new ChangeRandomEnvelopeSteps(this._doc, parseFloat(this._LFOStepsSliders[LFOStepsSliderIndex].value), LFOStepsSliderIndex);
            }
        };
        this.container.addEventListener("change", this._onChange);
        this.container.addEventListener("click", this._onClick);
        this.container.addEventListener("input", this._onInput);
    }
    _makeOption(target, index) {
        let displayName = Config.instrumentAutomationTargets[target].displayName;
        if (Config.instrumentAutomationTargets[target].maxCount > 1) {
            if (displayName.indexOf("#") != -1) {
                displayName = displayName.replace("#", String(index + 1));
            }
            else {
                displayName += " " + (index + 1);
            }
        }
        return HTML.option({ value: target + index * Config.instrumentAutomationTargets.length }, displayName);
    }
    _updateTargetOptionVisibility(menu, instrument) {
        for (let optionIndex = 0; optionIndex < menu.childElementCount; optionIndex++) {
            const option = menu.children[optionIndex];
            const combinedValue = parseInt(option.value);
            const target = combinedValue % Config.instrumentAutomationTargets.length;
            const index = (combinedValue / Config.instrumentAutomationTargets.length) >>> 0;
            option.hidden = !instrument.supportsEnvelopeTarget(target, index);
        }
    }
    _pitchToNote(value, isNoise) {
        let text = "";
        if (isNoise) {
            value = value * 6 + 12;
        }
        const offset = Config.keys[this._doc.song.key].basePitch % Config.pitchesPerOctave;
        const keyValue = (value + offset) % Config.pitchesPerOctave;
        if (Config.keys[keyValue].isWhiteKey) {
            text = Config.keys[keyValue].name;
        }
        else {
            const shiftDir = Config.blackKeyNameParents[value % Config.pitchesPerOctave];
            text = Config.keys[(keyValue + Config.pitchesPerOctave + shiftDir) % Config.pitchesPerOctave].name;
            if (shiftDir == 1) {
                text += "♭";
            }
            else if (shiftDir == -1) {
                text += "♯";
            }
        }
        return "[" + text + Math.floor((value + Config.pitchesPerOctave) / 12 + this._doc.song.octave - 1) + "]";
    }
    rerenderExtraSettings(index = 0) {
        const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
        for (let i = index; i < Config.maxEnvelopeCount; i++) {
            if (i >= instrument.envelopeCount) {
                if (this.extraSettingsDropdowns[i]) {
                    this.extraSettingsDropdowns[i].style.display = "none";
                }
                if (this.extraSettingsDropdownGroups[i]) {
                    this.extraSettingsDropdownGroups[i].style.display = "none";
                }
                if (this.extraPitchSettingsGroups[i]) {
                    this.extraPitchSettingsGroups[i].style.display = "none";
                }
                if (this.extraPitchSettingsGroups[i]) {
                    this.perEnvelopeSpeedGroups[i].style.display = "none";
                }
                if (this.extraLFODropdownGroups[i]) {
                    this.extraLFODropdownGroups[i].style.display = "none";
                }
            }
            else if (this.openExtraSettingsDropdowns[i]) {
                this.extraSettingsDropdownGroups[i].style.display = "flex";
                this.extraSettingsDropdowns[i].style.display = "inline";
                if (Config.newEnvelopes[instrument.envelopes[i].envelope].name == "pitch") {
                    this.extraPitchSettingsGroups[i].style.display = "flex";
                    this.pitchStartBoxes[i].value = instrument.envelopes[i].pitchEnvelopeStart.toString();
                    this.pitchEndBoxes[i].value = instrument.envelopes[i].pitchEnvelopeEnd.toString();
                    this._pitchStartSliders[i].max = (instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch).toString();
                    this.pitchStartBoxes[i].max = (instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch).toString();
                    this._pitchEndSliders[i].max = (instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch).toString();
                    this.pitchEndBoxes[i].max = (instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch).toString();
                    if (instrument.isNoiseInstrument && parseInt(this.pitchStartBoxes[i].value) > Config.drumCount - 1) {
                        this.pitchStartBoxes[i].value = (Config.drumCount - 1).toString();
                    }
                    if (instrument.isNoiseInstrument && parseInt(this.pitchEndBoxes[i].value) > Config.drumCount - 1) {
                        this.pitchEndBoxes[i].value = (Config.drumCount - 1).toString();
                    }
                    this._startNoteDisplays[i].textContent = "Start " + this._pitchToNote(parseInt(this.pitchStartBoxes[i].value), instrument.isNoiseInstrument) + ": ";
                    this._endNoteDisplays[i].textContent = "End " + this._pitchToNote(parseInt(this.pitchEndBoxes[i].value), instrument.isNoiseInstrument) + ": ";
                    this.perEnvelopeSpeedGroups[i].style.display = "none";
                    this.extraRandomSettingsGroups[i].style.display = "none";
                    this.extraLFODropdownGroups[i].style.display = "none";
                }
                else if (Config.newEnvelopes[instrument.envelopes[i].envelope].name == "random") {
                    const isRandomTime = instrument.envelopes[i].waveform == 0 || instrument.envelopes[i].waveform == 3;
                    this.randomStepsBoxes[i].value = instrument.envelopes[i].steps.toString();
                    this.randomSeedBoxes[i].value = instrument.envelopes[i].seed.toString();
                    this._randomStepsSliders[i].value = instrument.envelopes[i].steps.toString();
                    this._randomSeedSliders[i].value = instrument.envelopes[i].seed.toString();
                    this._perEnvelopeSpeedSliders[i].value = this.convertIndexSpeed(instrument.envelopes[i].perEnvelopeSpeed, "index").toString();
                    this._perEnvelopeSpeedDisplays[i].textContent = "Spd: x" + prettyNumber(this.convertIndexSpeed(parseFloat(this._perEnvelopeSpeedSliders[i].value), "speed"));
                    if (instrument.envelopes[i].waveform > 4)
                        instrument.envelopes[i].waveform = 0;
                    this._randomStepsWrappers[i].style.display = instrument.envelopes[i].waveform == 0 || instrument.envelopes[i].waveform == 2 ? "flex" : "none";
                    this._randomEnvelopeTypeSelects[i].selectedIndex = instrument.envelopes[i].waveform;
                    this.perEnvelopeSpeedGroups[i].style.display = isRandomTime ? "" : "none";
                    this.extraSettingsDropdownGroups[i].style.display = "flex";
                    this.extraSettingsDropdowns[i].style.display = "inline";
                    this.extraPitchSettingsGroups[i].style.display = "none";
                    this.extraRandomSettingsGroups[i].style.display = "";
                    this.extraLFODropdownGroups[i].style.display = "none";
                }
                else if (Config.newEnvelopes[instrument.envelopes[i].envelope].name == "lfo") {
                    this._waveformSelects[i].value = instrument.envelopes[i].waveform.toString();
                    this._perEnvelopeSpeedSliders[i].value = this.convertIndexSpeed(instrument.envelopes[i].perEnvelopeSpeed, "index").toString();
                    this._perEnvelopeSpeedDisplays[i].textContent = "Spd: x" + prettyNumber(this.convertIndexSpeed(parseFloat(this._perEnvelopeSpeedSliders[i].value), "speed"));
                    if (instrument.envelopes[i].waveform == 5 || instrument.envelopes[i].waveform == 6) {
                        this._LFOStepsWrappers[i].style.display = "flex";
                    }
                    else {
                        this._LFOStepsWrappers[i].style.display = "none";
                    }
                    this.extraLFODropdownGroups[i].style.display = "";
                    this.perEnvelopeSpeedGroups[i].style.display = "flex";
                    this.extraSettingsDropdownGroups[i].style.display = "flex";
                    this.extraSettingsDropdowns[i].style.display = "inline";
                    this.extraPitchSettingsGroups[i].style.display = "none";
                    this.extraRandomSettingsGroups[i].style.display = "none";
                }
                else {
                    this.extraPitchSettingsGroups[i].style.display = "none";
                    this.extraRandomSettingsGroups[i].style.display = "none";
                    this.extraLFODropdownGroups[i].style.display = "none";
                    if (Config.newEnvelopes[instrument.envelopes[i].envelope].name == "note size" || Config.newEnvelopes[instrument.envelopes[i].envelope].name == "punch" || Config.newEnvelopes[instrument.envelopes[i].envelope].name == "none") {
                        this.perEnvelopeSpeedGroups[i].style.display = "none";
                    }
                    else {
                        this.perEnvelopeSpeedGroups[i].style.display = "flex";
                        this._perEnvelopeSpeedSliders[i].value = this.convertIndexSpeed(instrument.envelopes[i].perEnvelopeSpeed, "index").toString();
                        this._perEnvelopeSpeedDisplays[i].textContent = "Spd: x" + prettyNumber(this.convertIndexSpeed(parseFloat(this._perEnvelopeSpeedSliders[i].value), "speed"));
                    }
                }
                this._inverters[i].checked = instrument.envelopes[i].inverse;
                this.perEnvelopeLowerBoundBoxes[i].value = instrument.envelopes[i].perEnvelopeLowerBound.toString();
                this.perEnvelopeUpperBoundBoxes[i].value = instrument.envelopes[i].perEnvelopeUpperBound.toString();
                this._perEnvelopeLowerBoundSliders[i].value = instrument.envelopes[i].perEnvelopeLowerBound.toString();
                this._perEnvelopeUpperBoundSliders[i].value = instrument.envelopes[i].perEnvelopeUpperBound.toString();
            }
            else if (this.openExtraSettingsDropdowns[i] == false) {
                this.extraSettingsDropdownGroups[i].style.display = "none";
                this.extraPitchSettingsGroups[i].style.display = "none";
                this.extraSettingsDropdowns[i].style.display = "inline";
                this.perEnvelopeSpeedGroups[i].style.display = "none";
            }
            else {
                if (this.extraSettingsDropdowns[i]) {
                    this.extraSettingsDropdowns[i].style.display = "none";
                }
                if (this.extraSettingsDropdownGroups[i]) {
                    this.extraSettingsDropdownGroups[i].style.display = "none";
                }
                if (this.extraPitchSettingsGroups[i]) {
                    this.extraPitchSettingsGroups[i].style.display = "none";
                }
                if (this.extraPitchSettingsGroups[i]) {
                    this.perEnvelopeSpeedGroups[i].style.display = "none";
                }
                if (this.extraLFODropdownGroups[i]) {
                    this.extraLFODropdownGroups[i].style.display = "none";
                }
                if (this.extraRandomSettingsGroups[i]) {
                    this.extraRandomSettingsGroups[i].style.display = "none";
                }
            }
        }
    }
    convertIndexSpeed(value, convertTo) {
        switch (convertTo) {
            case "index":
                return Config.perEnvelopeSpeedToIndices[value] != null ? Config.perEnvelopeSpeedToIndices[value] : 23;
            case "speed":
                return Config.perEnvelopeSpeedIndices[value] != null ? Config.perEnvelopeSpeedIndices[value] : 1;
        }
        return 0;
    }
    render() {
        const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()];
        for (let envelopeIndex = this._rows.length; envelopeIndex < instrument.envelopeCount; envelopeIndex++) {
            const targetSelect = HTML.select();
            for (let target = 0; target < Config.instrumentAutomationTargets.length; target++) {
                const interleaved = (Config.instrumentAutomationTargets[target].interleave);
                for (let index = 0; index < Config.instrumentAutomationTargets[target].maxCount; index++) {
                    targetSelect.appendChild(this._makeOption(target, index));
                    if (interleaved) {
                        targetSelect.appendChild(this._makeOption(target + 1, index));
                    }
                }
                if (interleaved)
                    target++;
            }
            const envelopeSelect = HTML.select({ id: "envelopeSelect" });
            for (let envelope = 0; envelope < Config.newEnvelopes.length; envelope++) {
                envelopeSelect.appendChild(HTML.option({ value: envelope }, Config.newEnvelopes[envelope].name));
            }
            const deleteButton = HTML.button({ type: "button", class: "delete-envelope", style: "flex: 0.2" });
            const pitchStartNoteSlider = HTML.input({ value: instrument.envelopes[envelopeIndex].pitchEnvelopeStart ? instrument.envelopes[envelopeIndex].pitchEnvelopeStart : 0, style: "width: 113px; margin-left: 0px;", type: "range", min: "0", max: instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch, step: "1" });
            const pitchStartNoteBox = HTML.input({ value: instrument.envelopes[envelopeIndex].pitchEnvelopeStart ? instrument.envelopes[envelopeIndex].pitchEnvelopeStart : 0, style: "width: 4em; font-size: 80%; ", id: "startNoteBox", type: "number", step: "1", min: "0", max: instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch });
            const pitchEndNoteSlider = HTML.input({ value: instrument.envelopes[envelopeIndex].pitchEnvelopeEnd ? instrument.envelopes[envelopeIndex].pitchEnvelopeEnd : instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch, style: "width: 113px; margin-left: 0px;", type: "range", min: "0", max: instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch, step: "1" });
            const pitchEndNoteBox = HTML.input({ value: instrument.envelopes[envelopeIndex].pitchEnvelopeEnd ? instrument.envelopes[envelopeIndex].pitchEnvelopeEnd : instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch, style: "width: 4em; font-size: 80%; ", id: "endNoteBox", type: "number", step: "1", min: "0", max: instrument.isNoiseInstrument ? Config.drumCount - 1 : Config.maxPitch });
            const pitchStartNoteDisplay = HTML.span({ class: "tip", style: `width:68px; flex:1; height:1em; font-size: smaller;`, onclick: () => this._openPrompt("pitchRange") }, "Start " + this._pitchToNote(parseInt(pitchStartNoteBox.value), instrument.isNoiseInstrument) + ": ");
            const pitchEndNoteDisplay = HTML.span({ class: "tip", style: `width:68px; flex:1; height:1em; font-size: smaller;`, onclick: () => this._openPrompt("pitchRange") }, "End " + this._pitchToNote(parseInt(pitchEndNoteBox.value), instrument.isNoiseInstrument) + ": ");
            const pitchStartBoxWrapper = HTML.div({ style: "flex: 1; display: flex; flex-direction: column; align-items: center;" }, pitchStartNoteDisplay, pitchStartNoteBox);
            const pitchEndBoxWrapper = HTML.div({ style: "flex: 1; display: flex; flex-direction: column; align-items: center;" }, pitchEndNoteDisplay, pitchEndNoteBox);
            const pitchStartNoteWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, pitchStartBoxWrapper, pitchStartNoteSlider);
            const pitchEndNoteWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, pitchEndBoxWrapper, pitchEndNoteSlider);
            const extraPitchSettingsGroup = HTML.div({ class: "editor-controls", style: "flex-direction:column; align-items:center;" }, pitchStartNoteWrapper, pitchEndNoteWrapper);
            extraPitchSettingsGroup.style.display = "none";
            const randomStepsBox = HTML.input({ value: instrument.envelopes[envelopeIndex].steps, type: "number", min: 1, max: Config.randomEnvelopeStepsMax, step: 1, style: "width: 4em; font-size: 80%; " });
            const randomStepsSlider = HTML.input({ value: instrument.envelopes[envelopeIndex].steps, type: "range", min: 1, max: Config.randomEnvelopeStepsMax, step: 1, style: "width: 113px; margin-left: 0px;" });
            const randomSeedBox = HTML.input({ value: instrument.envelopes[envelopeIndex].seed, type: "number", min: 1, max: Config.randomEnvelopeSeedMax, step: 1, style: "width: 4em; font-size: 80%; " });
            const randomSeedSlider = HTML.input({ value: instrument.envelopes[envelopeIndex].seed, type: "range", min: 1, max: Config.randomEnvelopeSeedMax, step: 1, style: "width: 113px; margin-left: 0px;" });
            const randomStepsBoxWrapper = HTML.div({ style: "flex: 1; display: flex; flex-direction: column; align-items: center;" }, HTML.span({ class: "tip", style: `width:68px; flex:1; height:1em; font-size: smaller;`, onclick: () => this._openPrompt("randomSteps") }, "Steps: "), randomStepsBox);
            const randomSeedBoxWrapper = HTML.div({ style: "flex: 1; display: flex; flex-direction: column; align-items: center;" }, HTML.span({ class: "tip", style: `width:68px; flex:1; height:1em; font-size: smaller;`, onclick: () => this._openPrompt("randomSeed") }, "Seed: "), randomSeedBox);
            const randomStepsWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, randomStepsBoxWrapper, randomStepsSlider);
            const randomSeedWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, randomSeedBoxWrapper, randomSeedSlider);
            const randomTypeSelect = HTML.select({ style: "width: 115px;" });
            const randomNames = ["time", "pitch", "note", "time smooth"];
            for (let waveform = 0; waveform < 4; waveform++) {
                randomTypeSelect.appendChild(HTML.option({ value: waveform }, randomNames[waveform]));
            }
            const randomTypeSelectWrapper = HTML.div({ class: "editor-controls selectContainer", style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, HTML.span({ style: "font-size: smaller; margin-right: 35px;", class: "tip", onclick: () => this._openPrompt("randomEnvelopeType") }, "Type: "), randomTypeSelect);
            const extraRandomSettingsGroup = HTML.div({ class: "editor-controls", style: "flex-direction:column; align-items:center;" }, randomTypeSelectWrapper, randomStepsWrapper, randomSeedWrapper);
            extraRandomSettingsGroup.style.display = "none";
            const waveformSelect = HTML.select({ style: "width: 115px;" });
            const LFOStepsBox = HTML.input({ value: instrument.envelopes[envelopeIndex].steps, type: "number", min: 1, max: Config.randomEnvelopeStepsMax, step: 1, style: "width: 4em; font-size: 80%; " });
            const LFOStepsSlider = HTML.input({ value: instrument.envelopes[envelopeIndex].steps, type: "range", min: 1, max: Config.randomEnvelopeStepsMax, step: 1, style: "width: 113px; margin-left: 0px;" });
            const LFOStepsBoxWrapper = HTML.div({ style: "flex: 1; display: flex; flex-direction: column; align-items: center;" }, HTML.span({ class: "tip", style: `width:68px; flex:1; height:1em; font-size: smaller;`, onclick: () => this._openPrompt("randomSteps") }, "Steps: "), LFOStepsBox);
            const LFOStepsWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, LFOStepsBoxWrapper, LFOStepsSlider);
            const wavenames = ["sine", "square", "triangle", "sawtooth", "trapezoid", "stepped saw", "stepped tri"];
            for (let waveform = 0; waveform < 7; waveform++) {
                waveformSelect.appendChild(HTML.option({ value: waveform }, wavenames[waveform]));
            }
            const waveformWrapper = HTML.div({ class: "editor-controls selectContainer", style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, HTML.span({ style: "font-size: smaller; margin-right: 10px;", class: "tip", onclick: () => this._openPrompt("lfoEnvelopeWaveform") }, "Waveform: "), waveformSelect);
            const extraLFOSettingsGroup = HTML.div({ class: "editor-controls", style: "margin-top: 3px; flex:1; display:flex; flex-direction: column; align-items:center; justify-content:right;" }, waveformWrapper, LFOStepsWrapper);
            extraLFOSettingsGroup.style.display = "none";
            const perEnvelopeSpeedSlider = HTML.input({ style: "margin: 0; width: 113px", type: "range", min: 0, max: Config.perEnvelopeSpeedIndices.length - 1, value: this.convertIndexSpeed(instrument.envelopes[envelopeIndex].perEnvelopeSpeed, "index"), step: "1" });
            const perEnvelopeSpeedDisplay = HTML.span({ class: "tip", style: `width:58px; flex:1; height:1em; font-size: smaller; margin-left: 10px;`, onclick: () => this._openPrompt("perEnvelopeSpeed") }, "Spd: x" + prettyNumber(this.convertIndexSpeed(parseFloat(perEnvelopeSpeedSlider.value), "speed")));
            const perEnvelopeSpeedWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, perEnvelopeSpeedDisplay, perEnvelopeSpeedSlider);
            const perEnvelopeSpeedGroup = HTML.div({ class: "editor-controls", style: "flex-direction:column; align-items:center;" }, perEnvelopeSpeedWrapper);
            const lowerBoundBox = HTML.input({ value: instrument.envelopes[envelopeIndex].perEnvelopeLowerBound, type: "number", min: Config.perEnvelopeBoundMin, max: Config.perEnvelopeBoundMax, step: 0.1, style: "width: 4em; font-size: 80%; " });
            const lowerBoundSlider = HTML.input({ value: instrument.envelopes[envelopeIndex].perEnvelopeLowerBound, type: "range", min: Config.perEnvelopeBoundMin, max: Config.perEnvelopeBoundMax, step: 0.1, style: "width: 113px; margin-left: 0px;" });
            const upperBoundBox = HTML.input({ value: instrument.envelopes[envelopeIndex].perEnvelopeUpperBound, type: "number", min: Config.perEnvelopeBoundMin, max: Config.perEnvelopeBoundMax, step: 0.1, style: "width: 4em; font-size: 80%; " });
            const upperBoundSlider = HTML.input({ value: instrument.envelopes[envelopeIndex].perEnvelopeUpperBound, type: "range", min: Config.perEnvelopeBoundMin, max: Config.perEnvelopeBoundMax, step: 0.1, style: "width: 113px; margin-left: 0px;" });
            const lowerBoundBoxWrapper = HTML.div({ style: "flex: 1; display: flex; flex-direction: column; align-items: center;" }, HTML.span({ class: "tip", style: `width:68px; flex:1; height:1em; font-size: smaller;`, onclick: () => this._openPrompt("envelopeRange") }, "Lwr bnd: "), lowerBoundBox);
            const upperBoundBoxWrapper = HTML.div({ style: "flex: 1; display: flex; flex-direction: column; align-items: center;" }, HTML.span({ class: "tip", style: `width:68px; flex:1; height:1em; font-size: smaller;`, onclick: () => this._openPrompt("envelopeRange") }, "Upr bnd: "), upperBoundBox);
            const lowerBoundWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, lowerBoundBoxWrapper, lowerBoundSlider);
            const upperBoundWrapper = HTML.div({ style: "margin-top: 3px; flex:1; display:flex; flex-direction: row; align-items:center; justify-content:right;" }, upperBoundBoxWrapper, upperBoundSlider);
            const invertBox = HTML.input({ "checked": instrument.envelopes[envelopeIndex].inverse, type: "checkbox", style: "width: 1em; padding: 0.5em; margin-left: 4em;", id: "invertBox" });
            const invertWrapper = HTML.div({ style: "margin: 0.5em; align-items:center; justify-content:right;" }, HTML.span({ class: "tip", onclick: () => this._openPrompt("envelopeInvert") }, "Invert: "), invertBox);
            const envelopeCopyButton = HTML.button({ style: "margin-left:0px; max-width:86px; width: 86px; height: 26px; padding-left: 22px", class: "copyButton", title: "Copy Envelope" }, [
                "Copy Env",
                SVG.svg({ style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;", width: "26px", height: "26px", viewBox: "-5 -21 26 26" }, [
                    SVG.path({ d: "M 0 -15 L 1 -15 L 1 0 L 13 0 L 13 1 L 0 1 L 0 -15 z M 2 -1 L 2 -17 L 10 -17 L 14 -13 L 14 -1 z M 3 -2 L 13 -2 L 13 -12 L 9 -12 L 9 -16 L 3 -16 z", fill: "currentColor" }),
                ]),
            ]);
            const envelopePasteButton = HTML.button({ style: "margin-left:2px; max-width:89px; width: 89px; height: 26px; padding-left: 22px", class: "pasteButton", title: "Paste Envelope" }, [
                "Paste Env",
                SVG.svg({ style: "flex-shrink: 0; position: absolute; left: 0; top: 50%; margin-top: -1em; pointer-events: none;", width: "26px", height: "26px", viewBox: "0 0 26 26" }, [
                    SVG.path({ d: "M 8 18 L 6 18 L 6 5 L 17 5 L 17 7 M 9 8 L 16 8 L 20 12 L 20 22 L 9 22 z", stroke: "currentColor", fill: "none" }),
                    SVG.path({ d: "M 9 3 L 14 3 L 14 6 L 9 6 L 9 3 z M 16 8 L 20 12 L 16 12 L 16 8 z", fill: "currentColor", }),
                ]),
            ]);
            const copyPasteContainer = HTML.div({ class: "editor-controls", style: "margin: 0.5em; display: flex; flex-direction:row; align-items:center;" }, envelopeCopyButton, envelopePasteButton);
            const extraSettingsDropdown = HTML.button({ style: "margin-left:0em; margin-right: 0.3em; height:1.5em; width: 10px; padding: 0px; font-size: 8px; align-self: center;", onclick: () => { const instrument = this._doc.song.channels[this._doc.channel].instruments[this._doc.getCurrentInstrument()]; this._extraSettingsDropdown(8, envelopeIndex, Config.newEnvelopes[instrument.envelopes[envelopeIndex].envelope].name); } }, "▼");
            extraSettingsDropdown.style.display = "inline";
            const extraSettingsDropdownGroup = HTML.div({ class: "editor-controls", style: "flex-direction:column; align-items:center;" }, extraRandomSettingsGroup, extraLFOSettingsGroup, extraPitchSettingsGroup, perEnvelopeSpeedGroup, lowerBoundWrapper, upperBoundWrapper, invertWrapper, copyPasteContainer);
            extraSettingsDropdownGroup.style.display = "none";
            const row = HTML.div({ class: "envelope-row" }, extraSettingsDropdown, HTML.div({ class: "selectContainer", style: "width: 0; flex: 1;" }, targetSelect), HTML.div({ class: "selectContainer", style: "width: 0; flex: 0.85" }, envelopeSelect), deleteButton);
            this.container.appendChild(row);
            this.container.appendChild(extraSettingsDropdownGroup);
            this._rows[envelopeIndex] = row;
            this._targetSelects[envelopeIndex] = targetSelect;
            this._envelopeSelects[envelopeIndex] = envelopeSelect;
            this._deleteButtons[envelopeIndex] = deleteButton;
            this.extraSettingsDropdowns[envelopeIndex] = extraSettingsDropdown;
            this.extraSettingsDropdownGroups[envelopeIndex] = extraSettingsDropdownGroup;
            this._inverters[envelopeIndex] = invertBox;
            this.perEnvelopeLowerBoundBoxes[envelopeIndex] = lowerBoundBox;
            this.perEnvelopeUpperBoundBoxes[envelopeIndex] = upperBoundBox;
            this._perEnvelopeLowerBoundSliders[envelopeIndex] = lowerBoundSlider;
            this._perEnvelopeUpperBoundSliders[envelopeIndex] = upperBoundSlider;
            this._perEnvelopeSpeedDisplays[envelopeIndex] = perEnvelopeSpeedDisplay;
            this._perEnvelopeSpeedSliders[envelopeIndex] = perEnvelopeSpeedSlider;
            this.perEnvelopeSpeedGroups[envelopeIndex] = perEnvelopeSpeedGroup;
            this.extraPitchSettingsGroups[envelopeIndex] = extraPitchSettingsGroup;
            this._pitchStartSliders[envelopeIndex] = pitchStartNoteSlider;
            this.pitchStartBoxes[envelopeIndex] = pitchStartNoteBox;
            this._pitchEndSliders[envelopeIndex] = pitchEndNoteSlider;
            this.pitchEndBoxes[envelopeIndex] = pitchEndNoteBox;
            this._startNoteDisplays[envelopeIndex] = pitchStartNoteDisplay;
            this._endNoteDisplays[envelopeIndex] = pitchEndNoteDisplay;
            this.extraRandomSettingsGroups[envelopeIndex] = extraRandomSettingsGroup;
            this.randomStepsBoxes[envelopeIndex] = randomStepsBox;
            this.randomSeedBoxes[envelopeIndex] = randomSeedBox;
            this._randomStepsSliders[envelopeIndex] = randomStepsSlider;
            this._randomSeedSliders[envelopeIndex] = randomSeedSlider;
            this._randomStepsWrappers[envelopeIndex] = randomStepsWrapper;
            this._randomEnvelopeTypeSelects[envelopeIndex] = randomTypeSelect;
            this.extraLFODropdownGroups[envelopeIndex] = extraLFOSettingsGroup;
            this._waveformSelects[envelopeIndex] = waveformSelect;
            this.LFOStepsBoxes[envelopeIndex] = LFOStepsBox;
            this._LFOStepsSliders[envelopeIndex] = LFOStepsSlider;
            this._LFOStepsWrappers[envelopeIndex] = LFOStepsWrapper;
            this._envelopeCopyButtons[envelopeIndex] = envelopeCopyButton;
            this._envelopePasteButtons[envelopeIndex] = envelopePasteButton;
        }
        for (let envelopeIndex = this._renderedEnvelopeCount; envelopeIndex < instrument.envelopeCount; envelopeIndex++) {
            this._rows[envelopeIndex].style.display = "";
            this._updateTargetOptionVisibility(this._targetSelects[envelopeIndex], instrument);
        }
        for (let envelopeIndex = instrument.envelopeCount; envelopeIndex < this._renderedEnvelopeCount; envelopeIndex++) {
            this._rows[envelopeIndex].style.display = "none";
        }
        let useControlPointCount = instrument.noteFilter.controlPointCount;
        if (instrument.noteFilterType)
            useControlPointCount = 1;
        if (this._renderedEqFilterCount != instrument.eqFilter.controlPointCount ||
            this._renderedNoteFilterCount != useControlPointCount ||
            this._renderedInstrumentType != instrument.type ||
            this._renderedEffects != instrument.effects) {
            for (let envelopeIndex = 0; envelopeIndex < this._renderedEnvelopeCount; envelopeIndex++) {
                this._updateTargetOptionVisibility(this._targetSelects[envelopeIndex], instrument);
            }
        }
        for (let envelopeIndex = 0; envelopeIndex < instrument.envelopeCount; envelopeIndex++) {
            this._targetSelects[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].target + instrument.envelopes[envelopeIndex].index * Config.instrumentAutomationTargets.length);
            this._envelopeSelects[envelopeIndex].selectedIndex = instrument.envelopes[envelopeIndex].envelope;
            this.pitchStartBoxes[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].pitchEnvelopeStart);
            this.pitchEndBoxes[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].pitchEnvelopeEnd);
            this._pitchStartSliders[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].pitchEnvelopeStart);
            this._pitchEndSliders[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].pitchEnvelopeEnd);
            this._inverters[envelopeIndex].checked = instrument.envelopes[envelopeIndex].inverse;
            this._perEnvelopeSpeedSliders[envelopeIndex].value = String(this.convertIndexSpeed(instrument.envelopes[envelopeIndex].perEnvelopeSpeed, "index"));
            this.perEnvelopeLowerBoundBoxes[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].perEnvelopeLowerBound);
            this.perEnvelopeUpperBoundBoxes[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].perEnvelopeUpperBound);
            this._perEnvelopeLowerBoundSliders[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].perEnvelopeLowerBound);
            this._perEnvelopeUpperBoundSliders[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].perEnvelopeUpperBound);
            this.randomStepsBoxes[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].steps);
            this.randomSeedBoxes[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].seed);
            this._randomStepsSliders[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].steps);
            this._randomSeedSliders[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].seed);
            this.LFOStepsBoxes[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].steps);
            this._LFOStepsSliders[envelopeIndex].value = String(instrument.envelopes[envelopeIndex].steps);
            this.openExtraSettingsDropdowns[envelopeIndex] = this.openExtraSettingsDropdowns[envelopeIndex] ? true : false;
        }
        this._renderedEnvelopeCount = instrument.envelopeCount;
        this._renderedEqFilterCount = instrument.eqFilter.controlPointCount;
        this._renderedNoteFilterCount = useControlPointCount;
        this._renderedInstrumentType = instrument.type;
        this._renderedEffects = instrument.effects;
    }
}
//# sourceMappingURL=EnvelopeEditor.js.map