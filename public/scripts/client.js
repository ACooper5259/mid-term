$(document).ready(function () {

  $("#password-copy-button").click(function(){
    $('#new-site-password-input').val($('#new-password-output').text())
  })
  // submit the foam for the password generate function
  $("#generate-password").on('submit', function (e) {
    e.preventDefault();
    let numCheck = $(".number").is(":checked") ? true : false;
    let lowercaseCheck = $(".lowercase").is(":checked") ? true : false;
    let uppercaseCheck = $(".uppercase").is(":checked") ? true : false;
    let specialCheck = $(".special-characters").is(":checked") ? true : false;
    const totalLength = $(this).find('.length').val();
    console.log('check generetor', numCheck, lowercaseCheck, uppercaseCheck, specialCheck)
    const result = generatedPassword(totalLength, numCheck, lowercaseCheck, uppercaseCheck, specialCheck);
    console.log(result);
    $(".password").text(result);
    $(".length").val('');
    $(".number").prop("checked", false);
    $(".lowercase").prop("checked", false);
    $(".uppercase").prop("checked", false);
    $(".special-characters").prop("checked", false);
  });

  // ////////////// DISPLAY WEBSITES \\\\\\\\\\\\\\\ \\
  $.ajax({
    url: '/websites/',
    method: 'GET',
    dataType: 'json',
    success: (websites) => {
      console.log(websites)

      displayWebsites(websites.websites);
    },
    error: (error) => {
      console.error(error);
    }
  });

  const enableClipboards = (websiteID) => {
    const usernameButton = document.getElementById(`copy-login-button-${websiteID}`);
    const passwordButton = document.getElementById(`copy-password-button-${websiteID}`);
    console.log(usernameButton)
    new ClipboardJS(passwordButton);
    new ClipboardJS(usernameButton);
  }

  // Display Webiste Function
  const displayWebsites = function (websites) {
    for (const website of websites) {
      const item_created = createWebsiteElement(website);

      $('.websites-display').append(item_created);
      enableClipboards(website.site_id)
    }
  };



  // Create Website Element
  const createWebsiteElement = function (websiteData) {
    const website =`
      <div class="row row-cols-6">
        <div class="col credentials"><a id="url-${websiteData.site_id}" href="http://${websiteData.url}">${websiteData.url}</a></div>
        <div class="col credentials">
          <output id="login-output-${websiteData.site_id}">${websiteData.loginname}</output>
          <button type="button" id="copy-login-button-${websiteData.site_id}" data-clipboard-target="#login-output-${websiteData.site_id}" >
            <img src="./assets/copyClipboard@33.33x.png" class="copiedToClipboard">
          </button>
         </div>
        <div class="col credentials">
          <output id="password-output-${websiteData.site_id}">${websiteData.password}</output>
          <button type="button" id="copy-password-button-${websiteData.site_id}" data-clipboard-target="#password-output-${websiteData.site_id}" class="clipboard-button" >
            <img src="./assets/copyClipboard@33.33x.png" class="copiedToClipboard">
          </button>
        </div>
        <div id="category-${websiteData.site_id}" class="col credentials">${websiteData.category}</div>
        <div class="col credentials"><input type="hidden" id="websiteId" name="websiteId" value="${websiteData.site_id}" />
        <button type="button" class="btn btn-info" onClick="createEdit(${websiteData.site_id})" ><img src="./assets/edit-icon.png"></button></div>
        <div class="col credentials"><button type="button" class="btn btn-danger" onClick="deleteWebsite(${websiteData.site_id})" id="website-${websiteData.site_id}" ><img src="./assets/delete-icon.png"></button></div>
      </div>`
    console.log(websiteData);

    return website
  };

  // Edit feature for website
  createEdit = function(id) {
    if ($('.edit-container').find('#edit-website-button')) {
      $('#edit-form').empty();
    }
    console.log('website id is',id)
    const editScript = `
    <form id="edit-website-button" class="mx-auto">
        <h4>Edit Website Form</h4>
        <p class= >Fill-in the fields and click update to save your new credentials for a new site. You can use the pasword generator, and the copy to clipboard button</p>
        <div class="form-group">
          <input type="hidden" id="websiteId" name="websiteId" value="${id}" />
          <label>Change site URL</label>
          <input id="edit-form-url" type="text" class="form-control" name="url">
        </div>
        <div class="form-group">
          <label>User Login Details</label>
          <input id="edit-form-username" type="text" class="form-control" name="loginname">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input id="edit-form-password" type="text" class="form-control" name="password">
        </div>
        <div class="form-group">
          <label>Website Category</label>
          <input id="edit-form-category" type="text" class="form-control" name="category">
        </div>
        <button type="submit" class="btn btn-danger" id="edit-submit-button"> Update </button>
      </form>`;

      $('#edit-form').append(editScript);

      $("#edit-website-button").submit(function (e) {
        e.preventDefault();
        const formData = $('#edit-website-button').serialize();
        console.log('what is form Data', formData);
        $.ajax({
          url: '/websites/' + id,
          type: 'PATCH',
          cache: false,
          data: formData,
          success: function (data) {
            console.log('success',data);
            $('#edit-form').empty();
            window.location='/new'
          }
          , error: function (textStatus, err) {
            alert('text status ' + textStatus + ', err ' + err)
          }
        })
      })
      $('#edit-form-url').val($(`#url-${id}`).text())
      $('#edit-form-username').val($(`#login-output-${id}`).text())
      $('#edit-form-password').val($(`#password-output-${id}`).text())
      $('#edit-form-category').val($(`#category-${id}`).text())

  };

  // Delete Website
  deleteWebsite = function(url_id) {
    $.ajax({
      type: "DELETE",
      url: '/websites/' + url_id,
      data: { _method: 'delete' },
      success: function (data) {
        console.log(data);
        window.location='/new';
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });
  };

  // Filter category
  $('#category-filter').submit(function (e) {
    e.preventDefault();
    const formData = $('#category-filter').serialize();
    const category = (formData.split("="))[1];
    const categoryUrl = '/websites/' + category;
    console.log('working?', categoryUrl);
    $.ajax({
      url: categoryUrl,
      type: 'GET',
      datatype: JSON,
      success: function (websites) {
        $(".row-cols-6").empty();
        displayWebsites(websites.websites);
      }
      , error: function (textStatus, err) {
        alert(textStatus.responseJSON.error)
      }
    })

  });

  // Add new website for user
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
      }
      , error: function (textStatus, err) {
        alert(textStatus.responseJSON.error)
      }
    })
  });

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
        alert(textStatus.responseJSON.error)
      }
    })
  });

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
        alert(textStatus.responseJSON.message)
      }
    })
  });

  $('#logout-btn').click(function () {
    $.ajax({
      url: '/user/logout',
      type: 'POST',
      cache: false,
      success: function (data) {
        window.location='/'
      }
      , error: function (textStatus, err) {
        alert('text status ' + textStatus + ', err ' + err)
      }
    })  })

    $('#login-btn-dynamic').click(function(){
      window.location='/';
   })

});

