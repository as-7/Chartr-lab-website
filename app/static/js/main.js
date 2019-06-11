$(document).ready(function () {
    // This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

    var autocomplete1, autocomplete2, current;

    function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        const options = {
            componentRestrictions: {country: 'in'}
        };
        autocomplete1 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete1')),
            options);
        autocomplete2 = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */(document.getElementById('autocomplete2')),
            options);

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
        autocomplete1.addListener('place_changed', fillInAddress1);
        autocomplete2.addListener('place_changed', fillInAddress2);
    }

    function fillInAddress1() {
        // Get the place details from the autocomplete object.
        var place = autocomplete1.getPlace();
        $('#lat1').val(place.geometry.location.lat());
        $('#lng1').val(place.geometry.location.lng());
    }

    function fillInAddress2() {
        // Get the place details from the autocomplete object.
        var place = autocomplete2.getPlace();
        $('#lat2').val(place.geometry.location.lat());
        $('#lng2').val(place.geometry.location.lng());
    }

    initAutocomplete();
    // hide message bar
    $(".success-alert").fadeTo(1500, 300).slideUp(300, function () {
        $(".success-alert").slideUp(300);
    });
});
