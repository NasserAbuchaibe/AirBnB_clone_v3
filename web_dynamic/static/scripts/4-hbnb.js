$(document).ready(function () {
  const aList = [];
  const amenities = {};
  $('.amenities-list').change(function (event) {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if (event.target.checked) {
      amenities[amenityId] = amenityName;
      aList.push(amenityName);
    } else {
      delete amenities[amenityId];
      aList.splice(aList.indexOf(amenityName), 1);
    }
    $('.amenities h4').text(aList);
  });

  search_places();
  $('button').click(function (e) {
    const list = Object.keys(amenities);
    search_places({ amenities: list });
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (body) {
    console.log(body.status);
    if (body.status === 'OK') {
      $('DIV.api_status').addClass('available');
    } else {
      $('DIV.api_status').removeClass('available');
    }
  }
  );

  function search_places (Dict = {}) {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(Dict),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          $('section.places').append('<article><div class="title_box"><h2></h2><div class="price_by_night"></div></div><div class="information"><div class="max_guest"></div><div class="number_rooms"></div><div class="number_bathrooms"></div></div><div class="user"></div><div class="description"></div></article>');
       
          $('div.title_box h2').last().text(place.name);
          $('.price_by_night').last().text('$' + place.price_by_night);
          // number of Guests
          if (place.max_guest !== 1) {
            $('.max_guest').last().text(`${place.max_guest} Guests`);
          } else {
            $('.max_guest').last().text(`${place.max_guest} Guest`);
          }
          // number of Rooms
          if (place.number_rooms !== 1) {
            $('.number_rooms').last().text(`${place.number_rooms} Bedrooms`);
          } else {
            $('.number_rooms').last().text(`${place.number_rooms} Bedroom`);
          }
          // number of Bathrooms
          if (place.number_bathrooms !== 1) {
            $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
          } else {
            $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
          }
          // place Description
          $('.description').last().html(place.description);
        }
      }
    });
  }
});
