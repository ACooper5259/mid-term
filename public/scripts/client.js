$(document).ready(function () {
  // submit the foam for the password generate function
  $("#generate-password").on('submit', function (e) {
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
  })

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

  // Create Website Element
  const createWebsiteElement = function (websiteData) {
    const website =`
      <div class="row row-cols-6">
        <div class="col credentials"><a href="http://${websiteData.url}">${websiteData.url}</a></div>
        <div class="col credentials">${websiteData.loginname}</div>
        <div class="col credentials">${websiteData.password}</div>
        <div class="col credentials">${websiteData.category}</div>
        <div class="col credentials"><button type="button"><img src="./assets/edit-icon.png"></button></div>
        <div class="col credentials"><button type="button"><img src="./assets/delete-icon.png"></button></div>
      </div>`
    console.log(websiteData);
    return website
  }

  displayWebsites(websites)

  // GET request for websites
  const loadWebsites = () => {
    $.get('/websites', (websites) => {
    displayWebsites(websites);
  });
  };
  loadWebsites()



    $('.delete-site').click(function () {
    const url_id = $(this).val();
    console.log('what is url_id', url_id)

    $.ajax({
      type: "DELETE",
      url: '/url/' + url_id,
      data: { _method: 'delete', _token: token },
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  })

  $('#new-website').submit(function (ev) {
    ev.preventDefault();
    const formData = $('#new-website').serialize();
    $.ajax({
      url: '/websites',
      type: 'POST',
      cache: false,
      data: formData,
      success: function (data) {
        window.location='/new'
        alert('Success!')
      }
      , error: function (textStatus, err) {
        alert('text status ' + textStatus + ', err ' + err)
      }
    })
  })

  $('#register-form').submit(function (ev) {
    ev.preventDefault();
    const formData = $('#register-form').serialize();
    $.ajax({
      url: '/user',
      type: 'POST',
      cache: false,
      data: formData,
      success: function (data) {
        window.location='/new'
        alert('Success!')
      }
      , error: function (textStatus, err) {
        alert('text status ' + textStatus + ', err ' + err)
      }
    })
  })

  $('#login-form').submit(function (ev) {
    ev.preventDefault();
    const formData = $('#login-form').serialize();
    $.ajax({
      url: '/user/login',
      type: 'POST',
      cache: false,
      data: formData,
      success: function (data) {
        window.location='/new'
      }
      , error: function (textStatus, err) {
        alert('text status ' + textStatus + ', err ' + err)
      }
    })
  })
});

