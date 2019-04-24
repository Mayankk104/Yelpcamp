// // $('document').ready(function(){
//     $("#comment").keypress(function (e) {
//         if(e.which == 13 && !e.shiftKey) {        
//             $(this).closest("form").submit();
//             e.preventDefault();
//             return false;
//         }
//     });

//     var map;

//     function createMap(){
//         var option = {
//             center: {lat:28.7041,lng:77.1025},
//             zoom:10
//         }

//         map = new google.maps.Map(document.getElementById('map'),option);

//         var infoWindow = new google.maps.InfoWindow;

//         if(navigator.geolocation){
//             navigator.geolocation.getCurrentPosition(function(p){
//                 var position={
//                     lat:p.coords.latitude,
//                     lng:p.coords.longitude
//                 }
//                 infoWindow.setPosition(position);
//                 infoWindow.setContent('hey');
//                 infoWindow.open(map);
//             },function(){
//                 handleLocationError('no',map.center())
//             })
//         }else{
//             handleLocationError("nooo...",map.center())
//         }

//         function handleLocationError(content,position){
//             infoWindow.setPosition(position);
//             infoWindow.setContent(content);
//             infoWindow.open(map); 
//         }

//         var input = getElementById('search');
//         var searchBox = new google.maps.places.SearchBox(input)

//         map.addListener('bounds_changed',function(){
//             searchBox.setBounds(map,getBounds());

//             if(places.length === 0)
//             return;

//             makers.forEach(function(m) {m.setMap(null)});
//         })

//     }

// // })

class a{
    b: class {
        prop: 5
    }
}

var A = new a();

console.log(A)