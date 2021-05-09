import { createElement } from '../helpers/domHelper';
export function createFighterPreview(fighter, position,selectedFighters) {
  if(!fighter) return ""
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
    html:`<h2>Fighter name: ${fighter.name}</h2>
    <h3>Fighter health: ${fighter.health}</h3>
    <h3>Fighter attack: ${fighter.attack}</h3>
    <h3>Fighter defense: ${fighter.defense}</h3>
  `,Listeners:[
    {on:"click",action:()=>{
      position==="right"?selectedFighters.pop():selectedFighters.shift();
      document.body.querySelector(`.fighter-preview___${position}`).remove();
    }}
  ]
  });

  fighter && fighterElement.append(createFighterImage(fighter))
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
