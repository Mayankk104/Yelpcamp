// $(document).ready(function(){
    $("#comment").keypress(function (e) {
        if(e.which == 13 && !e.shiftKey) {        
            $(this).closest("form").submit();
            e.preventDefault();
            return false;
        }
    });

    function createMap(){
        var lat = parseFloat($('#lat').val());
        var lng = parseFloat($('#lng').val());
        var option = {
            center: {lat:lat,lng:lng},
            zoom:10
        }
        var map = new google.maps.Map(document.getElementById('map'),option);
        var infoWindow = new google.maps.InfoWindow;
        
        infoWindow.setPosition({lat:lat,lng:lng});
        infoWindow.setContent('hey');
        infoWindow.open(map);
        // if(navigator.geolocation){
        //     navigator.geolocation.getCurrentPosition(function(p){
        //         var position={
        //             lat:p.coords.latitude,
        //             lng:p.coords.longitude
        //         }
        //     },function(){
        //         handleLocationError('no',map.center())
        //     })
        // }else{
        //     handleLocationError("nooo...",map.center())
        // }
        // function handleLocationError(content,position){
        //     infoWindow.setPosition(position);
        //     infoWindow.setContent(content);
        //     infoWindow.open(map); 
        // }

        // var input = getElementById('search');
        // var searchBox = new google.maps.places.SearchBox(input)

        // map.addListener('bounds_changed',function(){
        //     searchBox.setBounds(map,getBounds());

        //     if(places.length === 0)
        //     return;

        //     makers.forEach(function(m) {m.setMap(null)});
        // })
    }
    createMap()
// })