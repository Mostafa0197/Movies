$(document).ready(function () {


  // Get Movies List FRom API
  let moviesList = [];
  (async function () {
    let myApi = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=3726a39284692f1e16cc69518031b651')
    let moviesApi = await myApi.json();
    moviesList = moviesApi.results;
    display();
    // console.log(moviesList);
  })();


  $('.nav-link').click(function () {
    let catgDisplay = $(this).attr('id');

    if ($(this).attr('href') != '#trending') {
      (async function () {
        let myApi = await fetch(`https://api.themoviedb.org/3/movie/${catgDisplay}?api_key=3726a39284692f1e16cc69518031b651`)
        let moviesApi = await myApi.json();
        moviesList = moviesApi.results;
        display();
      })()
    } else {
      (async function () {
        let myApi = await fetch(`https://api.themoviedb.org/3/${catgDisplay}?api_key=3726a39284692f1e16cc69518031b651`)
        let moviesApi = await myApi.json();
        moviesList = moviesApi.results;
        display();
      })()
    }
  });


  // Search In Current Movies
  $('#movieSearch').keyup(function () {
    let movieNameInput = $('#movieSearch').val().toLowerCase();
    let temp = ``;
    moviesList.forEach(element => {
      if (element.original_title.toLowerCase().includes(movieNameInput)) {
        temp += ` <div class="col-md-6 col-lg-4 my-1 shadow">
          <div class="item">
            <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" class="img-fluid rounded" />
            <div class="itemDetails d-flex align-items-center">
              <div class="details">
                <h2>${element.original_title}</h2>
                <p>${element.overview}</p>
                <p>rate: ${element.vote_average}</p>
                <p>${element.release_date}</p>
              </div>
            </div>
          </div>
        </div>`
      }
    });
    $('#moviesRow').html(temp)
  });


  // Search In DB Movies
  $('#movieByWord').keyup(function () {
    let movieNameInput = $('#movieByWord').val().toLowerCase();
    (async function () {
      let myApi = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieNameInput}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US`)
      let moviesApi = await myApi.json();
      moviesList = moviesApi.results;
      display();
    })();
  });


  // Display Movies
  function display() {
    let temp = ``;
    moviesList.forEach(element => {
      temp += ` <div class="col-md-6 col-lg-4 my-1 shadow">
      <div class="item">
        <img src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="" class="img-fluid rounded" />
        <div class="itemDetails d-flex align-items-center">
          <div class="details">
            <h2>${element.original_title}</h2>
            <p>${element.overview}</p>
            <p>rate: ${element.vote_average}</p>
            <p>${element.release_date}</p>
          </div>
        </div>
      </div>
    </div>`
    });
    $('#moviesRow').html(temp)
  };

  // RegExp for Contact
  let nameValidStatus,
    emailValidStatus,
    phoneValidStatus,
    ageValidStatus,
    passValidStatus,
    rePassValidStatus = false;

  // RegExp for Contact (Name)
  $('#name').keyup(function () {
    let regExp = /^[A-Z][a-z]{2,10}[A-Z]?[a-z]{2,10}?[0-9]?$/;
    let inputVal = $(this).val()
    if (regExp.test(inputVal)) {
      $('#nameAlert').css('display', 'none')
      nameValidStatus = true
    } else {
      $('#nameAlert').css('display', 'block')
      nameValidStatus = false
    }
  });

  // RegExp for Contact (Email)
  $('#email').keyup(function () {
    let regExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let inputVal = $(this).val()
    if (regExp.test(inputVal)) {
      $('#emailAlert').css('display', 'none')
      emailValidStatus = true
    } else {
      $('#emailAlert').css('display', 'block')
      emailValidStatus = false
    }
  });

  // RegExp for Contact (phoneNum)
  $('#phoneNum').keyup(function () {
    let regExp = /^(02)?(010|011|012|015)[0-9]{8}$/;
    let inputVal = $(this).val()
    if (regExp.test(inputVal)) {
      $('#phoneNumAlert').css('display', 'none')
      phoneValidStatus = true
    } else {
      $('#phoneNumAlert').css('display', 'block')
      phoneValidStatus = false
    }
  });

  // RegExp for Contact (ageNum)
  $('#ageNum').keyup(function () {
    let regExp = /^[1-9]{1}[0-9]{1}$/;
    let inputVal = $(this).val()
    if (regExp.test(inputVal)) {
      $('#ageNumAlert').css('display', 'none')
      ageValidStatus = true
    } else {
      $('#ageNumAlert').css('display', 'block')
      ageValidStatus = false
    }
  });

  // RegExp for Contact (password)
  let mainPassword = '';
  $('#password').keyup(function () {
    let regExp = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,16}$/;
    let inputVal = $(this).val()
    if (regExp.test(inputVal)) {
      $('#passwordAlert').css('display', 'none')
      passValidStatus = true;
      mainPassword = inputVal;
    } else {
      $('#passwordAlert').css('display', 'block')
      passValidStatus = false
    }
  });

  // RegExp for Contact (rePassword)
  $('#rePassword').keyup(function () {
    let inputVal = $(this).val()
    if (inputVal == mainPassword) {
      $('#rePasswordAlert').css('display', 'none')
      rePassValidStatus = true
    } else {
      $('#rePasswordAlert').css('display', 'block')
      rePassValidStatus = false
    }
  });

  // Show Submit
  $('#contact').click(function () {
    if (nameValidStatus && emailValidStatus && phoneValidStatus && ageValidStatus && passValidStatus && rePassValidStatus == true) {
      $('#submitBtn').removeAttr('disabled');
      // console.log('true');
    } else {
      $('#submitBtn').attr('disabled', 'true');
      // console.log('false');
    }
  });


  // Nav Toggler
  let navWidth = $('#navMenu').outerWidth();
  $('#menu_bars').click(function () {
    let navLeft = $('#sideNav').css('left');
    if (navLeft == '0px') {
      $('#sideNav').css('left', `${-navWidth}px`);
      $('.nav-link').css({ 'opacity': '0', 'padding-top': '400px' })
    } else {
      $('#sideNav').css('left', `0`);
      $('.nav-link').css({ 'opacity': '1', 'padding-top': '8px' })
    }
  });
  var $toggler = $("#menu_bars");
  if ($("#menu_bars").length) {
    $("#side-nav").addClass("side-nav-push");
    if ($toggler.hasClass("left")) {
      $toggler.on("click", function (e) {
        $(this).toggleClass("active");
      });
    }
    else {
      if ($toggler.hasClass("full")) {
        $toggler.on("click", function (e) {
          $(this).toggleClass("active");
          $menu_full.toggleClass("side-nav-open");
          e.stopPropagation();
        });
      }
    }
  }

});
