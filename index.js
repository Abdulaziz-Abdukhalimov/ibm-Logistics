const form = document.querySelector("#submit-form");
const ulAssigments = document.querySelector(".assigments");
const input = document.querySelector(".file-input");

document.addEventListener("DOMContentLoaded", function () {
  loadAssignments(); // Load saved assignments when page loads
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // function createAssignmentLink(url, name) {
  //   return `
  //     <li> <a href="${url}" target="_blank">${name}</a> </li>
  //   `;
  // }

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
  assignments.push({ url, name }); // Save as object
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

function loadAssignments() {
  let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  assignments.forEach(({ url, name }) => {
    ulAssigments.insertAdjacentHTML(
      "beforeend",
      createAssignmentLink(url, name)
    );
  });
}
// Fix createAssignmentLink function (move it outside event listener)
function createAssignmentLink(url, name) {
  return `
   <li>
     <a href="${url}" target="_blank">${name}</a>
   </li>
  `;
}
