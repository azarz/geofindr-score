import { parseGameboardFile } from "./import.js";
import { gameboardHTML } from "./dom.js";
import { computeAllPlayerScores } from "./domScoring.js";

const inputElement = document.getElementById("import-gameboard");

inputElement.addEventListener("change", handleFiles, false);

window.addEventListener("dragenter", dragenter, false);
window.addEventListener("dragover", dragover, false);
window.addEventListener("drop", drop, false);

function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  var dt = e.dataTransfer;
  var files = dt.files;

  handleFilesDnd(files);
}

async function handleFilesDnd(files) {
  inputElement.files = files;
  inputElement.dispatchEvent(new Event("change", {bubbles:true}));
}

async function handleFiles() {
  const fileList = this.files;
  const gameboard = await parseGameboardFile(fileList[0]);
  if ( !gameboard ) {
    alert("Invalid JSON gameboard file");
    return
  }
  document.getElementById("gametable").innerHTML = gameboardHTML(gameboard);
  computeAllPlayerScores(document.getElementById("gametable"));
}
