export function createElement({ tagName, className, attributes = {},data }) {
  const element = document.createElement(tagName);

  if (className) {
    const classNames = className.split(' ').filter(Boolean);
    element.classList.add(...classNames);
  }
  if(data){
    element.setAttribute("data-tooltip","Select me")
  }
  Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));

  return element;
}
