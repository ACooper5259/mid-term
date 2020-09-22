
$(document).ready(function() {
  var copied = document.getElementById('copied');
var clipboard = new ClipboardJS(copied);

clipboard.on('success', function(e) {
    console.log(e);
});

clipboard.on('error', function(e) {
    console.log(e);
});
});
