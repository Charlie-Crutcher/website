// ----- SECTION 0 : NAVIGATION & THEMES ----- //

  // ----- SECTION 0.1 : ACTIVE CLASS : NAVIGATION BAR ----- //
    const navLinkEls = document.querySelectorAll('.nav__link');

    navLinkEls.forEach(navLinkEl => {
      navLinkEl.addEventListener('click', () => {
        navLinkEl.classList.add('active');
      })
    })
  // ----- END ----- //

  // ----- SECTION 0.2 : DARK MODE / LIGHT MODE TOGGLE ----- //
    let darkmode = localStorage.getItem('darkmode');
    const themeSwitch = document.getElementById('theme-switch');

    const enableDarkmode = () => {
      document.body.classList.add('darkmode');
      localStorage.setItem('darkmode', 'active');
    };

    const disableDarkmode = () => {
      document.body.classList.remove('darkmode');
      localStorage.setItem('darkmode', 'null');
    };

    // Toggle dark mode based on current state
    themeSwitch.addEventListener('click', () => {
      darkmode = localStorage.getItem('darkmode');
      if (darkmode !== 'active') {
        enableDarkmode();
      } else {
        disableDarkmode();
      }
    });
    // Apply the theme on page load based on localStorage value
    if (darkmode === 'active') {
      enableDarkmode();
    }
  // ----- END ----- //
// ----- END OF SECTION 0 ----- //



// ----- SECTION 1 : PHOTOGRAPHY / DISCORD BOT ----- //

  // ----- SECTION 1.1 PHOTOGRAPHY : MODAL ----- //
    // Get the modal
    let modal = document.getElementById("myModal");
    // Get the image and insert it inside the modal
    let modalImg = document.getElementsByClassName("modal-content")[0];
    // Get all the images in the gallery
    let images = document.querySelectorAll(".photoItem img");
    // Loop through all images
    images.forEach(image => {
        image.addEventListener("click", function() {
            // Set the modal content to the clicked image
            modalImg.src = this.src;
            
            // Show the modal
            modal.style.display = "block";
        });
    });

    // Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // Close the modal if the user clicks anywhere outside the image
    modal.onclick = function(event) {
        // Check if the click is on the modal background, not on the image
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
  // ----- END OF SECTION 1 ----- //


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


// ----- Code Coddy Panels ----- //
function showCoddyPanel01() {
  page = document.getElementById("coddyPanel01");
  if (page.style.visibility == "hidden") {
    page.style.visibility = "visible";
  } else {
    page.style.visibility = "hidden";
  }
}

function showCoddyPanel02() {
  page2 = document.getElementById("coddyPanel02");
  if (page2.style.visibility == "hidden") {
    page2.style.visibility = "visible";
  } else {
    page2.style.visibility = "hidden";
  }
}


// ----- Coding Timer ----- //
function startTimer() {

  startButton = document.getElementById("codeTimeStartButton");
  startButton.style.visibility = "hidden";

  stopButton = document.getElementById("codeTimeStopButton");
  stopButton.style.visibility = "visible";

  htmlSeconds = document.getElementById("codeTimeSeconds"); // Text within the timer on HTML.
  htmlMinutes = document.getElementById("codeTimeMinutes");
  htmlHours = document.getElementById("codeTimeHours");

  debugSeconds = document.getElementById("debugSeconds");

  var totalTime = 0;
  var timeSeconds = 0; // Default time value upon loading page.
  var timeMinutes = 0;
  var timeHours = 0;

  var timer = setInterval(() => {
    totalTime++;

    // Adds a '0' before seconds if less than 10
    if (timeSeconds < 10) {
      htmlSeconds.innerHTML = "0" + timeSeconds;
    }
    else {
      htmlSeconds.innerHTML = timeSeconds;
    }

    // Adds a '0' before minutes if less than 10
    if (timeMinutes < 10) {
      htmlMinutes.innerHTML = "0" + timeMinutes + ":"
    }
    else {
      htmlMinutes.innerHTML = timeMinutes + ":";
    }

    // Adds a '0' before hours if less than 10
    if (timeHours < 10) {
      htmlHours.innerHTML = "0" + timeHours + ":";
    }
    else {
      htmlHours.innerHTML = timeHours + ":";
    }
  }, 1000) // Time value increases every 1000ms (1 second).  


  // Increases variable timeSeconds by 1 every second.
  var intervalSeconds = setInterval(() => {
    timeSeconds++;
  }, 1000)

  // Resets timeSeconds variable to 0 once reaching 60 seconds.
  var timeoutSeconds= setInterval(() => {
    timeSeconds = 0;
    timeMinutes++;
  }, 60000)

  // Resets timeMinutes variable to 0 once reaching 60 minutes.
  var intervalMinutes = setInterval(() => {
    timeMinutes = 0;
    timeHours++
  }, 3600000)

}