const form = document.querySelector("#submit-form");
const ulAssigments = document.querySelector(".assigments");
const input = document.querySelector(".file-input");

document.addEventListener("DOMContentLoaded", function () {
  loadAssignments();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // function createAssignmentLink(item, name) {
  //   return `
  //   <li> <a href="${item}" target="_blank">${name}</a> </li>
  // `;
  //}
  const assigmentName = prompt("What is the name of your assignment?");
  ulAssigments.insertAdjacentHTML(
    "beforeend",
    createAssignmentLink(input.value, assigmentName)
  );
  saveAssignment(input.value, assigmentName);
  input.value = "";
  input.focus();
});

function saveAssignment(url, name) {
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  assignments.push({ url, name });
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

function loadAssignments() {
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  assignments.forEach(({ url, name }) => {
    const assignmentLink = createAssignmentLink(url, name);
    ulAssigments.insertAdjacentHTML("beforeend", assignmentLink);
  });
}

ulAssigments.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete-btn")) {
    const listItem = e.target.closest("li");
    const url = listItem.querySelector("a").href;
    const name = listItem.querySelector("a").textContent;

    // Remove the assignment from localStorage
    removeAssignmentFromStorage(url, name);

    // Remove the assignment from the DOM
    listItem.remove();
  }
});

function createAssignmentLink(item, name) {
  return `
  <li>
     <a href="${item}" target="_blank">${name}</a>
     <button class="delete-btn">Delete</button>
  </li>
`;
}

function removeAssignmentFromStorage(url, name) {
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  // Filter out the assignment that matches the url and name
  assignments = assignments.filter(
    (assignment) => assignment.url !== url || assignment.name !== name
  );

  // Update localStorage with the new filtered assignments array
  localStorage.setItem("assignments", JSON.stringify(assignments));
}
