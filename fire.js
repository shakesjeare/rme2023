window.addEventListener("DOMContentLoaded", function () {
  // Get the elements by their ID
  const fireTrigger = document.querySelector("#firetrigger");
  const breath = document.querySelector("#breath");
  const guide = document.querySelector("#guide");
  const touchFire = document.querySelector("#touchfire");
  const fire = document.querySelector("#fire");

  // Get a reference to the island component
  const island = document.querySelector("#island");

  // Store the original position of fireTrigger
  const fireTriggerOriginalPosition = fireTrigger.getAttribute("position");

  window.showAndEnableComponents = function () {
    // Make the elements visible
    fire.setAttribute("visible", true);
    touchFire.setAttribute("visible", true);

    // Make the fireTrigger grabbable and clickable
    fireTrigger.setAttribute("grabbable", "");
    fireTrigger.addEventListener("mousedown", handleActions);
    fireTrigger.addEventListener("click", handleActions);
    fireTrigger.addEventListener("grab-start", handleActions);
  };

  // Function to handle the desired actions
  function handleActions() {
    // Make breath visible
    breath.setAttribute("visible", true);

    // Store the visible state of the elements and the particle's visibility before the guide sound starts playing
    window.storeVisibleState();

    // Play guide sound
    guide.components.sound.playSound();

    // Hide elements
    window.hideElements();

    // Stop the ball sounds
    window.stopBallSounds();

    // Move fireTrigger to y = -5
    fireTrigger.setAttribute("position", { x: fireTriggerOriginalPosition.x, y: -5, z: fireTriggerOriginalPosition.z });

    // Hide touchFire
    touchFire.setAttribute("visible", false);

    // Pause the island sound
    if (island && island.components.sound) {
      island.components.sound.pauseSound();
    }
  }

  // Listen for the sound-ended event on the #guide element
  guide.addEventListener("sound-ended", function () {
    window.restoreVisibleState();

    
    // Make breath disappear gradually
    breath.setAttribute("animation", {
      property: "opacity",
      to: 0,
      dur: 2000,
      easing: "easeInOutQuad",
    });

    // Show touchFire
    touchFire.setAttribute("visible", true);

  
   // Move fireTrigger back to its original position
    fireTrigger.setAttribute("position", fireTriggerOriginalPosition);
  });
  
  // Create a custom event for the mousedown event
  fireTrigger.addEventListener("mousedown", handleActions);

  // Listen for the click event
  fireTrigger.addEventListener("click", handleActions);

  // Listen for the grab-start event
  fireTrigger.addEventListener("grab-start", handleActions);
});