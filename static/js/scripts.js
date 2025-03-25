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
