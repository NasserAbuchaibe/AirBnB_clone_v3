$(document).ready(function () {
    let a_list = [];
    let amenities = {};
    $('.amenities-list').change(function (event) {
      let amenityId = $(this).attr('data-id');
      let amenityName = $(this).attr('data-name');
  
      if (event['target']['checked']) {
        amenities[amenityId] = amenityName;
        a_list.push(amenityName);
      } else {
        delete amenities[amenityId];
        a_list.splice(a_list.indexOf(amenityName), 1);
      }
      $('.amenities h4').text(a_list);
    });
  });


const url = 'http://0.0.0.0:5001/api/v1/status/2';


$.get(url, function (body) {
        console.log(body.status);
        if (body.status === 'OK'){
            $('DIV.api_status').addClass('available');
        } else {
            $('DIV.api_status').removeClass('available');
        }
    }
);