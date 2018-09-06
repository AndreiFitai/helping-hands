document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);

Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

$(document).ready( function() {
  let future = new Date
  
  $('#today').val(new Date().toDateInputValue());
  $("#future").val(new Date(future.setDate(future.getDate()+1)).toDateInputValue());
});