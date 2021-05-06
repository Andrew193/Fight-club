import { controls } from '../../constants/controls';

const firstFSA = 'KeyQKeyWKeyE', secondFSA = 'KeyUKeyIKeyO';
let codeLine = [], isfirstFSA = true, issecondFSA = true, PlayerOneBlock = false, PlayerTwoBlock = false,times=99;
export async function fight(firstFighter, secondFighter) {
  let firstFighterHealth = firstFighter.health, secondFighterHealth = secondFighter.health,
    firstFighterDem = 0, secondFighterDem = 0;
  function toZero() {
    firstFighterDem = 0;
    secondFighterDem = 0;
  }


  function comdoAttack(resolve) {
    if (codeLine.join("") === firstFSA && isfirstFSA) {
      lockComdo("FSA")
      secondFighterHealth -= 2 * +firstFighter.attack.toFixed(0)
      complex("#right-fighter-indicator", secondFighterHealth, secondFighter)
      isAlive(resolve, secondFighterHealth, "Second Fighter looser")
    } else if (codeLine.join("") === secondFSA && issecondFSA) {
      lockComdo("CSA")
      firstFighterHealth -= 2 * +secondFighter.attack.toFixed(0)
      complex("#left-fighter-indicator", firstFighterHealth, firstFighter)
      isAlive(resolve, firstFighterHealth, "First Fighter looser")
    }
    codeLine = []
  }

  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    onkeypress = (event) => {
      toZero()
      codeLine.push(event.code)
      //block
      if (event.code === controls.PlayerOneBlock) PlayerOneBlock = !PlayerOneBlock;
      if (event.code === controls.PlayerTwoBlock) PlayerTwoBlock = !PlayerTwoBlock;
      //attack common
      if (event.code === controls.PlayerOneAttack && !PlayerOneBlock) {
        if (!PlayerTwoBlock) {
          firstFighterDem = getDamage(firstFighter, secondFighter);
          secondFighterHealth -= firstFighterDem.toFixed(0)
          complex("#right-fighter-indicator", secondFighterHealth, secondFighter)
          isAlive(resolve, secondFighterHealth, "Second Fighter looser")
        } else PlayerTwoBlock = !PlayerTwoBlock
      }
      if (event.code === controls.PlayerTwoAttack && !PlayerTwoBlock) {
        if (!PlayerOneBlock) {
          secondFighterDem = getDamage(secondFighter, firstFighter);
          firstFighterHealth -= +secondFighterDem.toFixed(0)
          complex("#left-fighter-indicator", firstFighterHealth, firstFighter)
          isAlive(resolve, firstFighterHealth, "First Fighter looser")
        } else PlayerOneBlock = !PlayerOneBlock
      }
      //attack special
      if (codeLine.length === 3) comdoAttack(resolve)
    }
    updateTurn(resolve)
    showFighterIndicator("#left-fighter-indicator", firstFighterHealth)
    showFighterIndicator("#right-fighter-indicator", secondFighterHealth)
  });
}

function complex(type, firstFighterHealth, firstFighter) {
  showFighterIndicator(type, firstFighterHealth)
  showProg(type, firstFighterHealth, firstFighter)
}

function lockComdo(flag) {
  flag === "FSA" ? isfirstFSA = false : issecondFSA = false
  setTimeout(() => { flag === "FSA" ? isfirstFSA = true : issecondFSA = true }, 10000)
}

function updateTurn(resolve) {
  const interval=setInterval(()=>{
    --times;
    if(!times){
      clearInterval(interval)
      resolve(winInfo("Draw"))
    }
    document.body.querySelector(".arena___versus-sign").innerText=times;
  },1000)
}

const winInfo = (params) => ({ title: "The fight is over", bodyElement: params, onClose: () => window.location.reload() })

function showFighterIndicator(path, health) {
  const element = document.body.querySelector(path);
  element.innerText = health.toFixed(0) + "HP"
}
function showProg(path, health, fighter) {
  const element = document.body.querySelector(path);
  if (path === "#left-fighter-indicator") element.style.width = (health * 100) / fighter.health + '%'
  else element.style.width = (health * 100) / fighter.health + '%'
}
function isAlive(resolve, health, message) {
  health <= 0 ? resolve(winInfo(message)) : null
}
export function getDamage(attacker, defender) {
  // return damage
  const Damage = getHitPower(attacker) - getBlockPower(defender)
  return Damage < 0 ? 0 : Damage
}

export function getHitPower(fighter) {
  // return hit power
  return fighter.attack * (Math.random() + 1)
}

export function getBlockPower(fighter) {
  // return block power
  return fighter.defense * (Math.random() + 1)
}
