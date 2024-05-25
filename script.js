const list = JSON.parse(localStorage.getItem("taskList")) || [];
const addBtn = document.querySelector(".add-btn");
const listContainer = document.querySelector(".list-container");
const input = document.querySelector(".input-text");

document.addEventListener("DOMContentLoaded", () => {
  updateList();
});

addBtn.addEventListener("click", addTask);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const text = input.value;

  if (text.trim() !== "") {
    list.push(text);
    updateList();
    input.value = "";
  }
}

function updateList() {
  localStorage.setItem("taskList", JSON.stringify(list));

  let taskList = "";

  for (let i = 0; i < list.length; i++) {
    taskList += `<div class="list-area" data-index="${i}">
      <p class="para"><i class="ri-arrow-right-wide-fill"></i>${list[i]}</p>
      <button class="del-btn">Delete <i class="ri-close-fill"></i></button>
    </div>`;
  }

  listContainer.innerHTML = taskList;

  const deleteButtons = document.querySelectorAll(".del-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.parentElement.getAttribute("data-index");
      list.splice(index, 1);
      updateList();
    });
  });
}
