function getPlayer(idVideo){
  return player = new MediastreamPlayer("mdstrm-player", { 
    width: 640, // Width in pixels 
    height: 360, // Height in pixels 
    type: "media", // Video type. Possible values: "media", "live" 
    id: idVideo, // Video ID 
    autoplay: true, // Enable autoplay. Possible values: true, false 
    events: { // Callbacks to be triggered when certain actions are executed by the player. All optional. 
      onPlayerReady: function() { // Optional callback to be triggered as soon as the player has finished loading 
      console.log("Player is ready");
      },
      onVideoEnd: function() { // Optional callback to be triggered when the video ends playing 
        console.log("Video just ended");
      },
      onVideoStop: function() { // Optional callback to be triggered when the user stops or pauses the video 
        console.log("User stopped or paused the video");
      },
      onVideoError: function() { // Optional callback to be triggered when there's a playback error 
        console.log("There was an error while loading the video");
      }
    }
  });
}