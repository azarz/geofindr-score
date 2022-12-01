/**
 *
 * @param {File} file gameboard json file
 * @returns gameboard object, false if import failed
 */

async function parseGameboardFile(file) {
  const fileText = await file.text();
  let gameboard;
  try {
     gameboard = JSON.parse(fileText);
  } catch(error) {
    return false
  }
  const Ajv = window.ajv7;
  const ajv = new Ajv();
  const schema = await (await fetch("model/gameboard_schema.json")).json();

  if ( ajv.compile(schema)(gameboard) ) {
    return gameboard
  }
  return false
}

export { parseGameboardFile };
