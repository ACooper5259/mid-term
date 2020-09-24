$(document).ready(function () {
  // submit the foam for the password generate function
  $("#generate-password").on('submit', function (e) {
    e.preventDefault();
    let numCheck = $("#number").is(":checked") ? true : false;
    let lowercaseCheck = $("#lowercase").is(":checked") ? true : false;
    let uppercaseCheck = $("#uppercase").is(":checked") ? true : false;
    let specialCheck = $("#special-characters").is(":checked") ? true : false;
    const totalLength = $(this).find('.length').val();
    console.log('check generetor', numCheck, lowercaseCheck, uppercaseCheck, specialCheck)
    const result = generatedPassword(totalLength, numCheck, lowercaseCheck, uppercaseCheck, specialCheck);
    console.log(result);
    $(".password").text(result);
    $(".length").val('');
    $("#number").prop("checked", false);
    $("#lowercase").prop("checked", false);
    $("#uppercase").prop("checked", false);
    $("#special-characters").prop("checked", false);
  });

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
  };

  // Create Website Element
  const createWebsiteElement = function (websiteData) {
    const website = `
      <div class="row row-cols-4">
        <div class="col credentials">${websiteData.url}</div>
        <div class="col credentials">${websiteData.loginname}</div>
        <div class="col credentials">${websiteData.password}</div>
        <div class="col credentials">${websiteData.category}</div>
        <div>
        <input type="hidden" id="websiteId" name="websiteId" value="${websiteData.id}" />
        <button type="button" class="btn btn-info" onClick="createEdit(${websiteData.id})" >Edit</button>
        </div>
        <div>
            <input type="hidden" id="websiteId" name="websiteId" value="${websiteData.id}" />
            <button type="button" class="btn btn-danger" onClick="deleteWebsite(${websiteData.id})" id="website-${websiteData.id}" >Delete</button>
        </div>
      </div>`

    return website
  };

  // Create edit form


  createEdit = function(id) {
    if ($('.edit-container').find('#edit-website-button')) {
      $('#edit-form').empty();
    }
    console.log('website id is',id)
    const editScript = `
      <form id="edit-website-button">
        <h4>Edit Website Form</h4>
        <p class= >Fill-in the fields and submit to save your credentials for a new site. You can use the pasword generator on the right, and the copy to clipboard button</p>
        <div class="form-group">
          <input type="hidden" id="websiteId" name="websiteId" value="${id}" />
          <label>Change site URL</label>
          <input type="text" class="form-control" name="url">
        </div>
        <div class="form-group">
          <label>User Login Details</label>
          <input type="text" class="form-control" name="loginname">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="text" class="form-control" name="password">
        </div>
        <div class="form-group">
          <label>Website Category</label>
          <input type="text" class="form-control" name="category">
        </div>
        <button type="submit" class="btn btn-danger" id="edit-submit-button"> UPDATE </button>
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

            const $websitesDisplay = $('.row-cols-4');
            $websitesDisplay.empty();

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
          }
          , error: function (textStatus, err) {
            alert('text status ' + textStatus + ', err ' + err)
          }
        })
      })


  };





  // Delete Website
  deleteWebsite = function(url_id) {
    $.ajax({
      type: "DELETE",
      url: '/websites/' + url_id,
      data: { _method: 'delete' },
      success: function (data) {
        console.log(data);
      },
      error: function (data) {
        console.log('Error:', data);
      }
    });

    const $websitesDisplay = $('.row-cols-4');
    $websitesDisplay.empty();

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

    return false;

  };




      // POST the form for the new webistes
//  $("#new-website").on('submit', function (event) {
//   event.preventDefault();
//   console.log(event)
//   const serializedWebsiteForm= $(this).serialize();
//   $.post('/websites/', serializedWebsiteForm)
//     .then ((response) => {
//     console.log(response)
//       loadWebsites()
//     })
//   });

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

