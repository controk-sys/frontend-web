(() => {
  angular
    .module("controk", [
      "ngAnimate",
      "ui.router",
      "toastr",
      "ngMask"
    ])
    // Set socket listeners
    .run(run)

  run.$inject = ["socket", "toastr"]

  function run(socket, toastr) {
    // Socket events
    socket.on("create ok", toastr.success)
    socket.on("create failed", toastr.error)
    socket.on("update ok", toastr.success)
    socket.on("update failed", toastr.error)
  }
})()
