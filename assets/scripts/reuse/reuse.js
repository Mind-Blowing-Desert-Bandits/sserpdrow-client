'use strict'
// Generic Functions to be reused as needed.

const removeDisabledClassesNavArray = (stringArray) => {
  stringArray.forEach((id) => { $(id).removeClass('disabled') })
}

const addDisableClassNavArray = (stringArray) => {
  stringArray.forEach((id) => { $(id).addClass('disabled') })
}

const removeActiveClassesNavArray = (stringArray) => {
  stringArray.forEach((id) => { $(id).removeClass('active') })
}

const hideMultipleFields = (stringArray) => {
  stringArray.forEach((id) => { $(id).hide() })
}

const showMultipleFields = (stringArray) => {
  stringArray.forEach((id) => { $(id).show() })
}

const emptyMultipleTextFields = (stringArray) => {
  stringArray.forEach((id) => { $(id).text('') })
}

const removeValMultipleTextFields = (stringArray) => {
  stringArray.forEach((id) => { $(id).val('') })
}

const updateFieldAddRemoveClassMessage = (fieldIDStr, newTextStr, addClassStr, removeClassStr) => {
// Example Call: updateFieldAddRemoveClassMessage('#messageNew', 'Signed up successfully', 'alert-success', 'alert-danger')
  $(fieldIDStr).text(newTextStr)
  $(fieldIDStr).addClass(addClassStr)
  $(fieldIDStr).removeClass(removeClassStr)
  $(fieldIDStr).show()
}

const arrayComparison = (Array1, Array2) => {
  return Array1.filter(val => val.indexOf(Array2) < 0)
}

// Fisher-Yates (aka Knuth) Shuffle
// http://sedition.com/perl/javascript-fy.html
function shuffle (array) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function replaceNullUndefined (key, value) {
  return (value == null) ? '' : value
}
module.exports = {
  removeDisabledClassesNavArray,
  addDisableClassNavArray,
  removeActiveClassesNavArray,
  hideMultipleFields,
  emptyMultipleTextFields,
  updateFieldAddRemoveClassMessage,
  showMultipleFields,
  removeValMultipleTextFields,
  arrayComparison,
  shuffle,
  replaceNullUndefined
}
