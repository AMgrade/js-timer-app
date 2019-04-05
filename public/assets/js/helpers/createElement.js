export function createEl(element, classes, child, attr) {
  const el = document.createElement(element);

  if (classes) {
    el.classList = classes;
  }

  if (attr) {
    if (attr.name && attr.value) {
      el.setAttribute(attr.name, attr.value);
    }
  }

  if (typeof(child) === 'string') {
    el.innerText = child;
  } else if (typeof(child) === 'object' && !Array.isArray(child)) {
    el.appendChild(child);
  } else if (Array.isArray(child)) {
    child.forEach(cur => el.appendChild(cur));
  }

  return el
}
