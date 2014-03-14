var $movieInput = $('#search-movie'),
    $formControl = $('#form-control');


var suggestion = {
  processQuery: function(query){
    var self = this;
    $.ajax({
      dataType: "jsonp",
      url: "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=45dp7uw93kngwssyt55hfvez",
      data: {
        q: query
      },
      success: function(res, status){
        self.displayResult(res);
      }
    });
  },
  displayResult: function(apiCallBack){
    var response = apiCallBack,
        i = 0,
        template = $('#result-display').html(),
        compiled = _.template(template, response.movies[i]);

    $('.results').html(compiled);
    console.log(compiled, response.movies[i]);
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

