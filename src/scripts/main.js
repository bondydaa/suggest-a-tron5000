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
        template = _.template('<img src="<%= posters.detailed %>"><dl><dt>Title</dt><dd><%= title %></dd><dt>Characters</dt><dd><dl><% _.each( this.abridge_cast, function(el, i, list){ %><dt><%= el %></dt><dt><%= i %></dt><dt><%= list %></dt><% }) %></dd></dl>');

    $('.results').append(template(response.movies[i]));
    console.log(response.movies[i]);
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

