const form = document.querySelector("#submit-form");
const ulAssigments = document.querySelector(".assigments");
const input = document.querySelector(".file-input");

document.addEventListener("DOMContentLoaded", function () {
  loadAssignments();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  function createAssignmentLink(item, name) {
    return `
    <li> <a href="${item}" target="_blank">${name}</a> </li>
  `;
  }
  const assigmentName = prompt("What is the name of your assignment?");
  ulAssigments.insertAdjacentHTML(
    "beforeend",
    createAssignmentLink(input.value, assigmentName)
  );
  saveAssignment(input.value, assigmentName);
  input.value = "";
  input.focus();
});

function saveAssignment(text) {
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  assignments.push(text);
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

function loadAssignments() {
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  assignments.forEach(createAssignmentLink);
}
