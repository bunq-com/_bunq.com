// Override parent element
[...document.getElementsByClassName('override-parent')].forEach(function (e) {
  e.parentNode.classList.add(e.innerText.toLowerCase())
  // e.remove()
});

// Replace existing combo class of parent with override
[...document.getElementsByClassName('override-exist-parent')].forEach(function (e) {
  e.parentNode.classList.remove(e.parentNode.classList.item(1));
  e.parentNode.classList.add(e.innerText.toLowerCase())
  // e.remove()
});

// Override next sibling element
[...document.getElementsByClassName('override-next')].forEach(function (e) {
  e.nextSibling.classList.add(e.innerText.toLowerCase())
  // e.remove()
});

// Replace existing combo class of next sibling with override
[...document.getElementsByClassName('override-exist-next')].forEach(function (e) {
  e.nextSibling.classList.remove(e.nextSibling.classList.item(1));
  e.nextSibling.classList.add(e.innerText.toLowerCase())
  // e.remove()
});

// Override children elements
[...document.getElementsByClassName('override-children')].forEach(function (e) {
  e.childNodes.classList.add(e.innerText.toLowerCase())
});
