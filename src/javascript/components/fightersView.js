import { createElement } from '../helpers/domHelper';
import { createFightersSelector } from './fighterSelector';
import Script from "../helpers/tooltipHelper"
export function createFighters(fighters) {
  const selectFighter = createFightersSelector();
  const container = createElement({ tagName: 'div', className: 'fighters___root' });
  const preview = createElement({ tagName: 'div', className: 'preview-container___root' });
  const fightersList = createElement({ tagName: 'div', className: 'fighters___list' });
  const fighterElements = fighters.map((fighter) => createFighter(fighter, selectFighter));
  const regulations=createRegulations()
  fightersList.append(...fighterElements);
  container.append(regulations,preview, fightersList);

  return container;
}

function createRegulations() {
  const regulations=createElement({tagName:"div",className:"regulations",html:`<h2>Regulations</h2>
  <p>PlayerOneAttack: 'A', PlayerOneBlock: 'D', PlayerTwoAttack: 'J', PlayerTwoBlock: 'L'</p>
  <p>PlayerOneCriticalHitCombination: Q+W+E, PlayerTwoCriticalHitCombination: U+I+O</p>
  <p>No more than every 10 seconds and shield only once per second</p>
  `,Listeners:[{on:"click",action:(event)=>{event.currentTarget.classList.toggle("minimize")} }]})
  return regulations;
}


function createFighter(fighter, selectFighter) {
  const fighterElement = createElement({ tagName: 'div', className: 'fighters___fighter'});
  const imageElement = createImage(fighter);
  const onClick = (event) =>  selectFighter(event, fighter._id);
  

  fighterElement.append(imageElement);
  fighterElement.addEventListener('click', onClick, false);

  return fighterElement;
}

function createImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source,
    title: name,
    alt: name, 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter___fighter-image',
    attributes,
    data:'tooltip'
  });

  return imgElement;
}