function startExperience(language) {
  // Handle language selection if necessary
  console.log('Selected language:', language);

  // Hide the start UI
  const startUI = document.getElementById('start-ui');
  startUI.style.display = 'none';

  // Show the A-Frame VR scene
  const vrScene = document.getElementById('vr-scene');
  vrScene.style.display = 'block';

 
}