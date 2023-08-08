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
      if ($('#api_status').hasClass('available')) {
        $('#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'post',
    data: JSON.stringify({}),
    headers: {"Content-type": "application/json"},
    dataType: 'json',
    success: function (data) {
      for (let place of data) {
        $('<article></article>').html(`
	  <div class="title_box">
	    <h2>{$place.name}</h2>
	    <div class="price_by_night">${place.price_by_night}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? "s" : ""}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? "s" : "" }</div>
            <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom${place.number_bathrooms > 1 ? "s" : ""}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
          </div>
          <div class="description">
	    ${place.description}
	  </div>`).appendTo($('section.places'))
      }
    }
  });

  $('button').on("click", function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/:',
      method: 'POST',
      data: JSON.stringify({"amenities": checked})
      });
  });
});
