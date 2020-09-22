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

  const webCheck = () => {
    $.ajax({
      url: '/websites',
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

  webCheck();

  // ////////////// DISPLAY WEBSITES \\\\\\\\\\\\\\\ \\
  /*
  const data = [
    {"id": 1,
    "user_id": 7,
    "url":'http://phpbb.com',
    "password":'xtzufPx6',
    "loginName": 'jsherrott0',
    "category_id": 9,
    "icon": 'http://dummyimage.com/50x50.jpg/cc0000/ffffff'},
    {"id": 2,
    "user_id": 8,
    "url": 'http://sfgate.com',
    "password": 'JKSPRs',
    "loginName": 'dcraddock1',
    "category_id": 8,
    "icon": 'http://dummyimage.com/50x50.png/5fa2dd/ffffff'}
  ]
  */

  $.ajax({
    url: '/websites/',
    method: 'GET',
    dataType: 'json',
    success: (websites) => {
      console.log('Checking websites',websites);
      displayWebsites(websites.websites);
    },
    error: (error) => {
      console.error(error);
    }
  });


  // Display Webiste Function

  const displayWebsites = function (websites) {
    for (const website of websites) {
      console.log (website)
      const item_created = createWebsiteElement(website);
      $('.websites-display').append(item_created);
    }
  }

  // escape function

  // Create Website Element
  const createWebsiteElement = function (websiteData) {
    const website =  `
    <div  class="col-lg-6">
      URL: ${websiteData.url}
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
        *************************************
        </div>
      </div>
    </div>`
    console.log(websiteData);

    return website
  }

  displayWebsites(data)


  // GET request for websites
  const loadWebsites = () => {
    $.get('/websites', (websites) => {
      displayWebsites(websites);
    });
  };
  loadWebsites()

});
