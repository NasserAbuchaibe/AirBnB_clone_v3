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
});

const url = 'http://0.0.0.0:5001/api/v1/status/';

$.get(url, function (body) {
  console.log(body.status);
  if (body.status === 'OK') {
    $('DIV.api_status').addClass('available');
  } else {
    $('DIV.api_status').removeClass('available');
  }
}
);

const URL = 'http://0.0.0.0:5001/api/v1/places_search/';
$.ajax({
  type: 'POST',
  url: URL,
  data: JSON.stringify({}),
  dataType: 'json',
  contentType: 'application/json',
  success: function (data) {
    for (const i of data) {
      const html = `<article>
                        <div class="title_box">
                          <h2>${i.name}</h2>
                          <div class="price_by_night">${i.price_by_night}</div>
                        </div>
                        <div class="information">
                        <div class="max_guest">${i.max_guest} Guest</div>
                          <div class="number_rooms">${i.number_rooms} Bedroom</div>
                          <div class="number_bathrooms">${i.number_bathrooms} Bathroom</div>
                        </div>
                        
                        <div class="description">
                        ${i.description}
                        </div>
                    </article>`;
      $('.places').append(html);
    }
  }
});
