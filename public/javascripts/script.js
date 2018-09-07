document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

Date.prototype.toDateInputValue = function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
};

$(document).ready(function() {
  let future = new Date();

  $("#today").val(new Date().toDateInputValue());
  $("#future").val(
    new Date(future.setDate(future.getDate() + 30)).toDateInputValue()
  );

$("#flip-to-signup").click(function() {
  $("#login-box").attr("style", "display: none;");
  $("#signup-box").removeAttr(`style`);
});

$("#flip-to-login").click(function() {
  console.log("test");
  $("#signup-box").attr("style", "display: none;");
  $("#login-box").removeAttr(`style`);
});

$("#moved_org").append($(".Organizer"))

});
