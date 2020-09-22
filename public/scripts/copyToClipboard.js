
$(document).ready(function() {
  $('#copied').click(function(){
    let element = document.getElementById('output'); //select the element
    let elementText = element.textContent; //get the text content from the element
    copyText(elementText); //use the copyText function below
});
  function copyText(text) {
    navigator.clipboard.writeText(text);
}

});
