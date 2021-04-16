    // Create a list to store the activities
    let activity = []; 

    // HTML elements
    const tableElement = document.getElementById("checkList");
    const tableElementTBodyRef = tableElement.getElementsByTagName('tbody')[0];
    const taskElement = document.getElementById("TASK")
    const descriptionElement = document.getElementById("DESCRIPTION")

    // Creating a checkbox
    function createCheckBox(item, index) {
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.checked = item.isComplete;

        checkBox.onclick = () => {
            clickedCheckBox(index);
        }

        return checkBox;
    }

    // Updating the isComplete state of the item (checked vs unchecked)
    function clickedCheckBox(index) {
        activity[index].isComplete = !activity[index].isComplete;
        updateLocalStorage();
    }

    // Creating the table. It creates a new table each time, deleting the old one
    function drawTable() {
        // reset table
        tableElementTBodyRef.innerHTML = "";
    
        //Go through each activity, and recreate each items on the list row by row
        activity.forEach((item, index) => {
            const row = tableElementTBodyRef.insertRow(index);
            const tableHeader = document.createElement("th");
            const checkBox = createCheckBox(item, index);
            tableHeader.scope = "row";
            tableHeader.appendChild(checkBox);
            row.appendChild(tableHeader)

            const taskDataColumn = document.createElement("td")
            taskDataColumn.innerHTML = item.task
            row.appendChild(taskDataColumn)

            const taskDescriptionColumn = document.createElement("td")
            taskDescriptionColumn.innerHTML = item.description
            row.appendChild(taskDescriptionColumn)
        });
    }
  
    // add Activity onto the list when it is clicked
    function addActivity() {
        // grab the value of the inputs
        const task = taskElement.value;
        const description = descriptionElement.value;
        activity.push({ isComplete: false, task: task, description: description })
        updateLocalStorage();
        // Create the new table
        drawTable();
    }

    // Update the local storage with updated data
    function updateLocalStorage() {
        localStorage.setItem("activity", JSON.stringify(activity));
    }

    // Sets up the project
    function init() {
        // Grab from local storage, and parse the JSON string
        const localStorageActivity = JSON.parse(localStorage.getItem("activity"));
        // If it exist, we update activity
        if (localStorageActivity !== null) {
            activity = localStorageActivity;
        }

        // Draw first instance of table
        drawTable();
    }


    init();