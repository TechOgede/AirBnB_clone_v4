const $ = window.$;

$(document).ready(function () {
  const checked = [];

  $('input').on('click', function () {
    if ($(this).prop('checked')) {
      checked.push($(this).attr('data-id'));
    } else {
      const index = checked.indexOf($(this).attr('data-id'));
      checked.splice(index, 1); // Use splice to remove an item from the array
    }

    let str = '';
    for (const id of checked) {
      str += $(`[data-id="${id}"]`).attr('data-name') + ', ';
    }
    $('.amenities > h4').text(str);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status  === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
