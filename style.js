
// Display only the intro page after page load
window.onload = () => {
  showElement('intro')
  hideElement('gamearea')
  hideElement('help')
}

// Show element by id
function showElement (id) {
  document.getElementById(id).style.display = 'block'
}

// Hide element by id
function hideElement (id) {
  document.getElementById(id).style.display = 'none'
}

// Hide current question and shows the next
function nextPage (hide, show) {
  hideElement(hide)
  showElement(show)
}
