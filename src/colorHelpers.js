import chroma from 'chroma-js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePalette(starterPalette) {
  let newPalette = {...starterPalette, colors: {}};

  for (let level of levels) {
    newPalette.colors[level] = [];
  };

  for (let colorObj of starterPalette.colors) {
    let scale = getScale(colorObj.color);

    scale.forEach((el, index) => (
      newPalette.colors[levels[index]].push(
        {
          name: `${colorObj.name} ${levels[index]}`,
          id: colorObj.name.toLowerCase().replace(/\s/g, '-'),
          hex: el,
          rgb: chroma(el).css(),
          rgba: chroma(el).css().replace('rgb', 'rgba').replace(')',',1.0)'),
        }
      )
    ));
  };
  return newPalette;
}

function getRange(hexColor) {
  return ['white', hexColor, chroma(hexColor).darken(1.6).hex()];
}

function getScale(hexColor, numColors = 10) {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numColors);
}

export { generatePalette };