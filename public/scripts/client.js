$(document).ready(function() {
  const workCheck = () => {
    $.ajax({
      url: '/',
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

  $("#my_form").on('submit',function(e) {
    console.log(e);
    e.preventDefault();
  } )

});
