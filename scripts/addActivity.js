    // Add your activity to this list
    let activity = [];
    // Find the table to interact with
    const table = document.getElementById("checkList");
    // Creating a checkbox
    function drawCheckBox(item, index) {
        let checked = ""
        if (item.isComplete) {
          checked = "checked";
        }
        // Inserting the checkbox with its asigned index to differienate new ones, creating it with clickedCheckBox function in mind
        // Create checkbox, name the id with the index, and updating the checked status in the list
        return `<input type='checkbox' id=${`check-${index}`} ${checked} onclick="clickedCheckBox(${index})"></input>`;
        // if activity[index].isComplete = 'checked' {
        //     return `<div class='completed></div>`
        // }
    }
    // Updating the isComplete state of the item (checked vs unchecked)
    function clickedCheckBox(index) {
        activity[index].isComplete = !activity[index].isComplete;
    }
    // add a feature to change the style for completed task
    // function checkedCheckBox(index) {
    //     if activity[index].isComplete = 'checked' {
    //         innerHTML += `<div class='completed></div>`
    //     }
    // }
    // Creating the table. It creates a new table each time, deleting the old one
    function drawTable() {
        let tbodyRef = table.getElementsByTagName('tbody')[0];
        // reset table
        tbodyRef.innerHTML = "";
        //Go through each activity, and recreate each items on the list row by row
        activity.forEach((item, index) => {
            const row = tbodyRef.insertRow(index);
            let innerHTML = "";
            innerHTML += `<th scope='row'>${drawCheckBox(item, index)}</th>`;
            innerHTML += `<td>${item.task}</td>`;
            innerHTML += `<td>${item.description}</td>`;
            row.innerHTML = innerHTML;
        });
    }
  
    // add Activity onto the list when it is clicked
    function addActivity() {
        // grab the value of the inputs
        const task = document.getElementById("TASK").value;
        const description = document.getElementById("DESCRIPTION").value;
        activity.push({ isComplete: false, task: task, description: description })
        // Create the new table
        drawTable();
    }
    // Create the table at start
    drawTable();