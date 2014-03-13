
var $movieInput = $('#search-movie'),
    $formControl = $('#form-control');


var suggestion = {
  processQuery: function(query){
    $.ajax({
      dataType: "jsonp",
      url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=45dp7uw93kngwssyt55hfvez",
      data: {
        q: query
      },
      success: function(res, status){
        console.log(res);
      }
    });
  },
  ratingSuggest: function(){

  }

};


$formControl.on('submit', function(e){
  var inputVal = $movieInput.val();

  suggestion.processQuery(inputVal);


  $movieInput.val('');
  e.preventDefault();
});
