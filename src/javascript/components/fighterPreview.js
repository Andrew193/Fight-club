import { createElement } from '../helpers/domHelper';
export function createFighterPreview(fighter, position,selectedFighters) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  if (fighter) {
    fighterElement.innerHTML = `
    <h2>Fighter name: ${fighter.name}</h2>
    <h3>Fighter health: ${fighter.health}</h3>
    <h3>Fighter attack: ${fighter.attack}</h3>
    <h3>Fighter defense: ${fighter.defense}</h3>
  `
  fighterElement.addEventListener("click",()=>{
    if(position==="right"){
      selectedFighters.pop();
      document.body.querySelector(".fighter-preview___right").remove();
    } else {
      selectedFighters.shift();
      document.body.querySelector(".fighter-preview___left").remove();
    }
  })
  fighterElement.append(createFighterImage(fighter))
  }
  // todo: show fighter info (image, name, health, etc.)
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
