$(document).ready(function () {
  const alist = [];
  const amenities = {};
  $('.amenities-list').change(function (event) {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if (event.target.checked) {
      amenities[amenityId] = amenityName;
      alist.push(amenityName);
    } else {
      delete amenities[amenityId];
      alist.splice(alist.indexOf(amenityName), 1);
    }
    $('.amenities h4').text(alist);
  });
});

const url = 'http://0.0.0.0:5001/api/v1/status/2';

$.get(url, function (body) {
  console.log(body.status);
  if (body.status === 'OK') {
    $('DIV.api_status').addClass('available');
  } else {
    $('DIV.api_status').removeClass('available');
  }
}
);
