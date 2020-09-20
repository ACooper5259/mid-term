$(document).ready(function() {
  console.log('test')

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

  console.log('before sumbit');
  $("#generate-password").on('submit',function(e) {
    console.log('inside the function')
    console.log(e);
    e.preventDefault();
  } )

  console.log('after submit')
});
