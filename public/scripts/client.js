$(document).ready(function() {
  // submit the foam for the password generate function
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
  $.ajax({
    url: '/websites/',
    method: 'GET',
    dataType: 'json',
    success: (websites) => {
      displayWebsites(websites.websites);
    },
    error: (error) => {
      console.error(error);
    }
  });

  // Display Webiste Function

  const displayWebsites = function (websites) {
    for (const website of websites) {
      const item_created = createWebsiteElement(website);
      $('.websites-display').append(item_created);
    }
  }

  // escape function

  // Create Website Element
  const createWebsiteElement = function (websiteData) {
    const website =  `
    <div  class="col-lg-6">
      URL: <a href= 'http://${websiteData.url}'> ${websiteData.url} </a>
      <div class="row">
        <div class="col-lg-3">
          Login id:
        </div>
        <div class="col-lg-3">
          ${websiteData.loginname}
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          Password:
        </div>
        <div class="col-lg-3">
          ${websiteData.password}
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          Category:
        </div>
        <div class="col-lg-3">
        ${websiteData.category}
        <br>
        <form method="POST" action="/new/:id">
            <td>
              <button type="submit" class="btn btn-info">EDIT</button>
            </td>
          </form>
          <form method="POST" action="/new/:id" class="delete-site">
            <td>
              <button type="submit" class="btn btn-danger">Delete</button>
            </td>
          </form>
        *************************************
        </div>
      </div>
    </div>`

    return website
  }

  $('.delete-site').click(function () {

    const url_id = $(this).val();
    console.log('what is url_id',url_id)

    $.ajax({
        type: "DELETE",
        url: '/url/' + url_id,
        data: {_method: 'delete', _token :token},
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log('Error:', data);
        }
    });
  })

});
