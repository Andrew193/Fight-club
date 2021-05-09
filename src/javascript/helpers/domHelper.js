export function createElement({ tagName, className, attributes = {},data,html,Listeners}) {
  const element = document.createElement(tagName);
  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    element.classList.add(...classNames);
  }
  data && element.setAttribute("data-tooltip","Select me");
  html && (element.innerHTML=html);
  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
  Listeners && Listeners.forEach((value)=>{element.addEventListener(value.on,value.action)})
  return element;
}
