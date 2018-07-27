var topics = [
  "Baby Tiger",
  "Hamster",
  "Teacup Pig",
  "Penguin",
  "Monkey",
  "Panda",
  "Dolphin",
  "Cat",
  "Chinchilla",
  "Puppy",
  "Turtle",
  "Goldfish",
  "Pygmy Goat",
  "Baby Cow",
  "Ferret",
  "Bird",
  "Frog",
  "Tadpole",
  "Elephant",
  "Whale",
  "Crab",
  "Bunny"
];

var endpoint  = "https://api.giphy.com/v1/gifs/search";
var gifyAPI   = "n73kbh6h2RP0dSe99w2zRrbvXDEk91zQ";
var limit     = 10;
var rating    = "";


function renderButtons(renderLast) {
  $(".buttons").empty();
  for (var i = 0; i < topics.length; i++) {
    var b = $("<button>");
    $(b).addClass("topic btn btn-primary");
    $(b).html(topics[i]);
    $(".buttons").append(b);
  }

  $(".topic").click(function() {
    fetchGifs(this);
  });

  if (renderLast) {
    fetchGifs(".topic:last");
  }
}

function fetchGifs(topic) {
  $(".buttons .active").removeClass("active");
  $(topic).addClass("active");

  query = {
    "api_key"   : gifyAPI,
    "q"         : $(topic).html(),
    "limit"     : limit,
    "rating"    : rating
  };
  query = $.param(query);
  path = endpoint + "?" + query;

  $.ajax({
    url: path,
    type: 'GET',
  })
  .done(function(response) {

    $(".card-columns").empty();
    var gifArray = response.data;
    for (var i = 0; i < gifArray.length; i++) {
      var imgSrc = gifArray[i].images.downsized_still.url;
      var imgLink = gifArray[i].url;
      var card = [
        "<div class='card'>",
        "<div class='card-footer card-inverse'>Rating: "+gifArray[i].rating.toUpperCase(),
        "</div>",
        "<img class='card-img-top' src='"+imgSrc+"'>",
        "<div class='card-block'>",
        "<a href='"+imgLink+"' target='_blank' class=''><i class='fa fa-external-link' aria-hidden='true'></i>Download</a> ",
        "</div>",
        "</div>"
      ];
      $(".card-columns").prepend(card.join(''));
    }
  })
}

function togglePlay(card) {
  var imgPath = $(card).attr("src");
  if (imgPath.endsWith("_s.gif")) {
    imgPath = imgPath.replace("_s.gif", ".gif");
  } else {
    imgPath = imgPath.replace(".gif", "_s.gif");
  }
  $(card).attr("src", imgPath);

}


$(document).ready(function() {

  renderButtons();

  $(".rating label").change(function(event) {
    rating = $(this).text().trim().toLowerCase();
  });

  $("form").submit(function(event) {
    event.preventDefault();
    newTopic = $("#animals").val().trim();
    if(newTopic !== "") {
      topics.push($("#animals").val().trim());
      renderButtons(true);
    }
    this.reset();
  });

  $(".gifs").on("click", ".card-img-top", function() {
    togglePlay(this);
  });

  $(".gifs").on("click", ".clip", function(event) {
    event.preventDefault();
  });

  clipboard = new Clipboard('.clip');
  clipboard.on('success', function(e) {
      e.clearSelection();
      if(e.action === "copy") {
        $(e.trigger).tooltip("show");
      }
  });

});
