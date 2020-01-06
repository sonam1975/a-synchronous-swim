(function() {
  const serverUrl = "http://127.0.0.1:3000";

  //
  // TODO: build the swim command fetcher here
  //

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxGetSwimDir = () => {
    $.ajax({
      type: "GET",
      url: serverUrl,
      success: str => {
        console.log("server:" + str);
        SwimTeam.move(str);
        // $('.background').css('background-image', str)
      }
    });
  };

  // const ajaxGetBackgroundImage = () => {
  //   $.ajax({
  //     type: 'GET',
  //     url: 'http://127.0.0.1:3000/background.jpg',
  //     success: (str) => {
  //       console.log('server:' + str)
  //       $('.background').css('background-image', str)

  //     }
  //   })
  // }

  setInterval(ajaxGetSwimDir, 1000);
  // ajaxGetBackgroundImage();

  const ajaxFileUplaod = file => {
    var formData = new FormData();
    formData.append("file", file);
    $.ajax({
      type: "POST",
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        window.location = window.location.href;
      }
    });
  };

  $("form").on("submit", function(e) {
    e.preventDefault();

    var form = $("form .file")[0];
    if (form.files.length === 0) {
      console.log("No file selected!");
      return;
    }

    var file = form.files[0];
    if (file.type !== "image/jpeg") {
      console.log("Not a jpg file!");
      return;
    }

    ajaxFileUplaod(file);
  });
})();
