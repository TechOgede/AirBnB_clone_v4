const $ = window.$;

$(document).ready(function () {
  const objectOfLists = {"states": [],
  		   	 "cities": [],
		   	 "amenities": [],
			 };

  $('input').on('click', function () {
    const kind = $(this).attr('kind');
    const dataId = $(this).attr('data-id');
    console.log(kind);
    console.log(dataId);
    if ($(this).prop('checked')) {
      objectOfLists[kind].push(dataId);
    } else {
      const index = objectOfLists[kind].indexOf(dataId);
      objectOfLists[kind].splice(index, 1);
    }

    let str = '';
    for (const id of objectOfLists[kind]) {
      str += $(`[data-id="${id}"]`).attr('data-name') + ', ';
    }
    if (kind === 'states' || kind === 'cities') {
      $('.locations > h4').text(str);
    } else {
      $('.amenities > h4').text(str);
    }

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
      data: JSON.stringify(objectOfLists)
      });
  });
});
