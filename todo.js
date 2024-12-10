// You have to use DomContentLoaded or You have to put script at the lower bottom near the body to first fully load the DOM before the script executed
document.addEventListener("DOMContentLoaded", function () {
  //Select the html elements with ID
  const input = document.getElementById("input-box");
  const add_button = document.getElementById("btn");
  const list = document.getElementById("list-todos");
  const error = document.getElementById("error");

  //Function to add a task
  function addTask() {
    //Check if the input box is empty
    if (input.value == "") {
      error.textContent = "Please Add Todo!";
    } else {
      error.textContent = "";

      //Create li element with javascript and append it to list or ol
      const li = document.createElement("li");
      li.textContent = input.value;
      list.appendChild(li);

      //Create delete button with javascript and append it to li
      const button_delete = document.createElement("button");
      button_delete.textContent = "X";
      button_delete.classList.add("deleteButton");
      li.appendChild(button_delete);

      //Add eventListener to delete the todo, it calls the deleteTask() function and give li parameter, You used it here because you can't access button_delete outside
      button_delete.addEventListener("click", function () {
        deleteTask(li);
      });
      input.value = "";

      //Create edit button with javascript and append it to li
      const button_edit = document.createElement("button");
      button_edit.textContent = "Edit";
      li.appendChild(button_edit);

      //Add eventListener to edit the todo, it has its own function embedded
      button_edit.addEventListener("click", function () {
        //Select the firstchild means the text because it has thre childs the text, the delete and edit
        input.value = li.firstChild.textContent;

        //First the add button task was to addTask so u have to remove tentaively
        add_button.removeEventListener("click", addTask);
        add_button.textContent = "Update";

        //Add eventListener to updateTask
        add_button.addEventListener("click", function updateTask() {
          if (input.value !== "") {
            li.firstChild.textContent = input.value;
            input.value = "";

            //After the update finishes getback the eventListener to addtask by removing the updateTask
            add_button.removeEventListener("click", updateTask);
            add_button.addEventListener("click", addTask);
            add_button.textContent = "Add";
            save();
          } else {
            error.textContent = "Please Add Todo!";
          }
        });
      });
    }

    save();
  }

  //Function for deleteTask
  function deleteTask(taskItem) {
    if (list.contains(taskItem)) {
      list.removeChild(taskItem);
      save();
    }
  }

  //Function for saving to localStorage
  const save = () => {
    localStorage.setItem("data", list.innerHTML);
  };

  //Function to retrive from localStorage and display it
  const show = () => {
    list.innerHTML = localStorage.getItem("data") || "";

    // Reattach event listeners to delete buttons
    const deleteButtons = list.querySelectorAll(".deleteButton");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function () {
        deleteTask(button.parentElement);
        save();
      });
    });

    // Reattach event listeners to edit buttons
    const editButtons = list.querySelectorAll("li button:nth-child(2)"); // Assuming edit button is the third child
    editButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const li = button.parentElement;
        input.value = li.firstChild.textContent;

        add_button.removeEventListener("click", addTask);
        add_button.textContent = "Update";

        add_button.addEventListener("click", function updateTask() {
          if (input.value !== "") {
            li.firstChild.textContent = input.value;
            input.value = "";
            error.textContent = "";
            save();

            add_button.removeEventListener("click", updateTask);
            add_button.addEventListener("click", addTask);
            add_button.textContent = "Add";
          } else {
            error.textContent = "Please Add Todo!";
          }
        });
      });
    });
  };

  add_button.addEventListener("click", addTask);

  show();
});
