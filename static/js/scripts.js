// ----- CLOSE BUTTON : DEFINING : TASK LIST ----- //
function addCloseButton(li) {
    var span = document.createElement("SPAN");
    span.className = "close";
    span.textContent = "\u00D7";
    li.appendChild(span);
    console.log("Close button added to:", li.textContent); // Debugging
  }
  
  // ----- CLOSE BUTTON : ENSURING ONLY CALLS FOR #taskListUI ITEMS ----- //
  document.querySelectorAll("#taskListUL li").forEach(li => {
    addCloseButton(li);
  });
  
  // ----- CLOSE BUTTON : FUNCTIONALITY / EVENT DELEGATION ----- //
  document.addEventListener("DOMContentLoaded", function () {
      var taskList = document.getElementById("taskListUL");
  
      if (taskList) {
          console.log("Task list found! Adding event listener."); // Debugging
  
          taskList.addEventListener("click", function (ev) {
              if (ev.target.classList.contains("close")) {
                  console.log("Close button clicked:", ev.target.parentElement.textContent); // Debugging
                  ev.target.parentElement.style.display = "none";
              }
          });
      } else {
          console.log("No task list found on this page. Skipping event listener setup.");
      }
  });
  
  // ----- CHECK MARK : TASK LIST ----- //
  
  document.addEventListener("DOMContentLoaded", function () {
    var taskList = document.getElementById("taskListUL");
  
    if (taskList) {
      console.log("Task list found! Adding event listener."); // Debugging
  
      document.getElementById("taskListUL").addEventListener("click", function (ev) {
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle("checked");
        }
      }, false);
    } else {
      console.log("No task list found on this page. Skipping event listener setup.");
    }
  });
  
  
  
  // ----- ADDING LI : TASK LIST ----- //
  
    function newElement() {
      var li = document.createElement("li");
      var inputValue = document.getElementById("taskListInput").value;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
  
      if (inputValue === "") {
          alert("You must write something!");
      } else {
          document.getElementById("taskListUL").appendChild(li);
      }
      document.getElementById("taskListInput").value = "";
  
      // Add close button
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);
  
      // Add event listener to close button
      span.onclick = function () {
          this.parentElement.style.display = "none";
      };
    }
  
  // ----- ACTIVE CLASS : NAVIGATION BAR ----- //
    const navLinkEls = document.querySelectorAll('.nav__link');
  
    navLinkEls.forEach(navLinkEl => {
      navLinkEl.addEventListener('click', () => {
        navLinkEl.classList.add('active');
      })
    })
  
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
  