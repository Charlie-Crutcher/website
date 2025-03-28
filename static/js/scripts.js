// ----- ACTIVE CLASS : NAVIGATION BAR ----- //
const navLinkEls = document.querySelectorAll('.nav__link');

navLinkEls.forEach(navLinkEl => {
  navLinkEl.addEventListener('click', () => {
    navLinkEl.classList.add('active');
  })
})
// ----- ACTIVE CLASS : NAVIGATION BAR ----- //
  


// ----- MISC DESKTOP DROPDOWN (MOREBAR) ----- // 
  // -- DROPDOWN MENU TOGGLE FOR DESKTOP MOREBAR (MISC) -- //
  function toggleMorebar() {
    var morebar = document.querySelector(".morebar");
    if (getComputedStyle(morebar).visibility === "hidden") {
      morebar.style.visibility= "visible";  // Show the menu
    } else {
      morebar.style.visibility = "hidden";  // Hide the menu
    }
  }
  // -- HIDING MOREBAR UPON RESIZING CLIENT -- //
  function hideMorebarOnResize(x) {
    var morebar = document.querySelector(".morebar");
    if (x.matches) { // If media query matches
      morebar.style.visibility = "hidden";
    } else {
      // Nothing needs to execute here //
    }
  }
  // Maximum width variable, if less than this, function will execute
  var x = window.matchMedia("(max-width: 800px)")
  // Calling the function on runtime
  hideMorebarOnResize(x);
  // Attaching a listener function on state changes
  x.addEventListener("change", function() {
    hideMorebarOnResize(x);
  });

// -- SIDEBAR MENU FOR MOBILE WEBSITE MODE -- //
  function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    const mobileMorebar = document.querySelector('.mobileMorebar');
    sidebar.style.visibility = 'visible'
  }
  function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    const mobileMorebar = document.querySelector('.mobileMorebar');
    sidebar.style.visibility = 'hidden'
  }

  // -- HIDING SIDEBAR UPON RESIZING CLIENT -- //
  function hideSidebarOnResize(y) {
    var sidebar = document.querySelector(".sidebar");
    var mobileMorebar = document.querySelector('.mobileMorebar');
    if (y.matches) {
      sidebar.style.visibility = "hidden";
    } else {
      // Nothing needs to execute here //
    }
  }
  // Maximum width variable //
  var y = window.matchMedia("(min-width: 800px)")
  // Calling the function on runtime //
  hideSidebarOnResize(y);
  // Attaching a listener function on state changes //
  y.addEventListener("change", function() {
    hideSidebarOnResize(y);
  });
// ----- MISC DESKTOP DROPDOWN (MOREBAR) ----- // 
// ----- WORKOUT FORM SUBMISSION ----- //
document.addEventListener('DOMContentLoaded', function () {
  // Ensure the 'Add Another Exercise' button works
  document.getElementById('addExercise').addEventListener('click', function() {
      console.log("Add Exercise button clicked"); // Debugging step

      // Find the exercise container
      let exerciseContainer = document.getElementById('exerciseInputs');
      if (!exerciseContainer) {
          console.error("exerciseInputs div not found!");
          return;
      }

      // Create a new exercise div
      let newExercise = document.createElement('div');
      newExercise.classList.add('exercise');

      // Add the HTML for the new exercise inputs
      newExercise.innerHTML = `
          <label for="exerciseName">Exercise Name:</label>
          <input type="text" name="exerciseName[]" required><br>
          
          <label for="set1_reps">Set 1 - Reps:</label>
          <input type="number" name="set1_reps[]" required><br>
          
          <label for="set1_weight">Set 1 - Weight:</label>
          <input type="number" name="set1_weight[]" required><br>

          <label for="set2_reps">Set 2 - Reps:</label>
          <input type="number" name="set2_reps[]" required><br>
          
          <label for="set2_weight">Set 2 - Weight:</label>
          <input type="number" name="set2_weight[]" required><br>

          <label for="set3_reps">Set 3 - Reps:</label>
          <input type="number" name="set3_reps[]" required><br>
          
          <label for="set3_weight">Set 3 - Weight:</label>
          <input type="number" name="set3_weight[]" required><br>
      `;

      // Append the new exercise div to the container
      exerciseContainer.appendChild(newExercise);
  });
});




// -- SUBMIT FORM -- //
document.getElementById('workoutForm').addEventListener('submit', function(event) {
  event.preventDefault();

  let workoutDay = document.getElementById('workoutDay').value;
  let exerciseNames = document.querySelectorAll('[name="exerciseName[]"]');
  let set1Reps = document.querySelectorAll('[name="set1_reps[]"]');
  let set1Weights = document.querySelectorAll('[name="set1_weight[]"]');
  let set2Reps = document.querySelectorAll('[name="set2_reps[]"]');
  let set2Weights = document.querySelectorAll('[name="set2_weight[]"]');
  let set3Reps = document.querySelectorAll('[name="set3_reps[]"]');
  let set3Weights = document.querySelectorAll('[name="set3_weight[]"]');

  let exercises = [];
  for (let i = 0; i < exerciseNames.length; i++) {
    exercises.push({
      name: exerciseNames[i].value,
      sets: [
        { set_number: 1, reps: set1Reps[i].value, weight: set1Weights[i].value },
        { set_number: 2, reps: set2Reps[i].value, weight: set2Weights[i].value },
        { set_number: 3, reps: set3Reps[i].value, weight: set3Weights[i].value }
      ]
    });
  }

  let data = {
    workoutDay: workoutDay,
    exercises: exercises
  };

  fetch('/upload_workout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => alert('Workout data uploaded successfully!'))
  .catch(error => alert('Error: ' + error));
});

