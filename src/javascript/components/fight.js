import { controls } from '../../constants/controls';

const firstFSA = 'KeyQKeyWKeyE', secondFSA = 'KeyUKeyIKeyO';
let codeLine = [], isfirstFSA = true, issecondFSA = true, PlayerOneBlock = false, PlayerTwoBlock = false, times = 99;
export async function fight(firstFighter, secondFighter) {
  let firstFighterHealth = firstFighter.health, secondFighterHealth = secondFighter.health;

  function comdoAttackCover(flag, dem, health, position, fighter, resolve) {
    lockComdo(flag)
    health === "second" ? secondFighterHealth -= dem : firstFighterHealth -= dem
    control(position, health, fighter, resolve)
  }
  function comdoAttack(resolve) {
    if (codeLine.join("") === firstFSA && isfirstFSA) {
      comdoAttackCover("FSA", 2 * +firstFighter.attack.toFixed(0), "second", "right", secondFighter, resolve)
    } else if (codeLine.join("") === secondFSA && issecondFSA) {
      comdoAttackCover("CSA", 2 * +secondFighter.attack.toFixed(0), "first", "left", firstFighter, resolve)
    }
    codeLine = []
  }
  function control(position, health, fighter, resolve) {
    makeAttackPosition(position)
    complex(`#${position}-fighter-indicator`, health === "second" ? secondFighterHealth : firstFighterHealth, fighter)
    isAlive(resolve, health === "second" ? secondFighterHealth : firstFighterHealth, health === "second" ? "Second Fighter looser" : "First Fighter looser",
      health === "second" ? firstFighter.source : secondFighter.source)
    setTimeout(() => makeAttackPosition(position), 100)
  }
  function normalAttack(dem, health, position, fighter, resolve) {
    health === "second" ? secondFighterHealth -= (dem > 0 ? dem : 0) : firstFighterHealth -= (dem > 0 ? dem : 0)
    control(position, health, fighter, resolve)
  }
  function Shield(Pblock) {
    Pblock==="Two"?PlayerTwoBlock=!PlayerTwoBlock:PlayerOneBlock=!PlayerOneBlock
    setTimeout(() => Pblock==="Two"?PlayerTwoBlock=!PlayerTwoBlock:PlayerOneBlock=!PlayerOneBlock, 1000)
  }
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const listener = (event) => {
      codeLine.push(event.code)
      //block
      if (event.code === controls.PlayerOneBlock) Shield("One")
      if (event.code === controls.PlayerTwoBlock) Shield("Two")
      //attack common
      if (event.code === controls.PlayerOneAttack && !PlayerOneBlock)
        !PlayerTwoBlock ? normalAttack(+getDamage(firstFighter, secondFighter).toFixed(0), "second", "right", secondFighter, resolve) : PlayerTwoBlock = !PlayerTwoBlock
      if (event.code === controls.PlayerTwoAttack && !PlayerTwoBlock)
        !PlayerOneBlock ? normalAttack(+getDamage(secondFighter, firstFighter).toFixed(0), "first", "left", firstFighter, resolve) : PlayerOneBlock = !PlayerOneBlock
      //attack special
      if (codeLine.length === 3) comdoAttack(resolve)
    }
    document.addEventListener("keydown", listener)
    updateTurn(resolve)
    showFighterIndicator("#left-fighter-indicator", firstFighterHealth)
    showFighterIndicator("#right-fighter-indicator", secondFighterHealth)
  });
}

function makeAttackPosition(position) {
  document.querySelector(`.arena___${position}-fighter`).classList.toggle("arena___attack")
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
  const interval = setInterval(() => {
    --times;
    if (!times) {
      clearInterval(interval)
      resolve(winInfo("Draw"))
    }
    document.body.querySelector(".arena___versus-sign").innerText = times;
  }, 1000)
}

const winInfo = (params) => ({ title: "The fight is over. Winner: ", bodyElement: params, onClose: () => window.location.reload() })

function showFighterIndicator(path, health) {
  document.body.querySelector(path).innerText = health.toFixed(0) + "HP"
}
function showProg(path, health, fighter) {
  const element = document.body.querySelector(path),
    pr = (health * 100) / fighter.health;
  element.style.width = pr + '%'
  pr <= 70 ? element.style.backgroundColor = "#6db100" : null
  pr <= 40 ? element.style.backgroundColor = "#b15000" : null
  pr <= 10 ? element.style.backgroundColor = "#eb0505" : null
}
function isAlive(resolve, health, message, source) {
  health <= 0 ? resolve({ ...winInfo(message), source: source }) : null
}
export function getDamage(attacker, defender) {
  // return damage
  return (getHitPower(attacker) - getBlockPower(defender)) < 0 ? 0 : (getHitPower(attacker) - getBlockPower(defender))
}

export function getHitPower(fighter) {
  // return hit power
  return fighter.attack * (Math.random() + 1)
}

export function getBlockPower(fighter) {
  // return block power
  return fighter.defense * (Math.random() + 1)
}
