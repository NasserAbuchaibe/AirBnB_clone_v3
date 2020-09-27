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
