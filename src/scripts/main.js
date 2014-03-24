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
        console.log(res.total, status);
        if (res.total){
          self.displayResult(res, query, 0);
        } else {
          alert('Search for "'+query+'" had no results. Please search again.')
        }
      }
    });
  },
  displayResult: function(apiCallBack, query, index){
    var response = apiCallBack,
        i = index,
        template = $('#result-display').html(),
        compiled = _.template(template, response.movies[i]);

    $('.results').html(compiled);

    this.registerDiffResult(response, query, i);
  },
  registerDiffResult: function(response, query, index){
    var self = this,
        i = index;

    $('#next').on('click', function(e){
      i = ++index;
      if(i > response.total-1) {
        e.preventDefault();
        i = --index;
      } else {
        self.displayResult(response, query, i);
      }
    });

    $('#prev').on('click', function(e){
      if(i <= 0){
        e.preventDefault();
      } else {
        i = --index;
        self.displayResult(response, query, i);
      }
    });

  },
  ratingSuggest: function(){

  }

};


$formControl.on('submit', function(e){
  var $inputVal = $movieInput.val();

  suggestion.processQuery($inputVal);


  $movieInput.val('');
  e.preventDefault();
});

