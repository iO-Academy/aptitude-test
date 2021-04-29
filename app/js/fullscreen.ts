function enterFullscreen() {
  if (!document.fullscreen) {
    document.documentElement.requestFullscreen();
    document.onfullscreenchange = function () {
      document.documentElement.removeEventListener(
        "mousemove",
        enterFullscreen
      );
    };
  }
}

document.documentElement.addEventListener("mousemove", enterFullscreen);