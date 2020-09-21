$(document).ready(function() {
  console.log('test')

  const workCheck = () => {
    $.ajax({
      url: '/new',
      method: 'GET',
      dataType: 'json',
      success: (posts) => {
        console.log(posts);
      },
      error: (error) => {
        console.error(error);
      }
    });
  };

  workCheck();

  $("#generate-password").on('submit',function(e) {
    e.preventDefault();
    let numCheck = $(".number").is(":checked") ? "true" : "false";
    let lowercaseCheck = $(".lowercase").is(":checked") ? "true" : "false";
    let uppercaseCheck = $(".uppercase").is(":checked") ? "true" : "false";
    let specialCheck = $(".special-characters").is(":checked") ? "true" : "false";
    const totalLength = $(this).find('.length').val();
    const result = generatedPassword(totalLength, numCheck, lowercaseCheck, uppercaseCheck, specialCheck);
    console.log(result);
    $(".password").text(result);
    $(".length").val('');
    $(".number").prop("checked", false);
    $(".lowercase").prop("checked", false);
    $(".uppercase").prop("checked", false);
    $(".special-characters").prop("checked", false);
  } )

// ////////////// DISPLAY WEBSITES \\\\\\\\\\\\\\\ \\

// Display Webiste Function
const displayWebsites = function (websites) {
  for (const website of websites) {
    const item_created = createWebsiteElement(website);
    $('#websites-display').append(item_created);
  }
}

// escape function

// Create Website Element
const createWebsiteElement = function (website) {
  const website =  `
  <div id="websites-display" class="col-lg-6">
    ${website.url}
    <div class="row">
      <div class="col-lg-3">
        Login id:
      </div>
      <div class="col-lg-3">
        ${website.loginName}
      </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          Password:
        </div>
        <div class="col-lg-3">
        ${website.password}
        </div>
      </div>
    <div class="row">
      <div class="col-lg-3">
        Category:
      </div>
      <div class="col-lg-3">
      ${website.category_id}
      </div>
    </div>
  </div>`
}


// GET request for websites
const loadWebsites = () => {
  $.get('/websites', (websites) => {
    displayWebsites(websites);
  });
};
loadWebsites()

});
