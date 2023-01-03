// general variables
let searchGeneral = document.getElementById("searchGeneral");
let searchLocal = document.getElementById("searchLocal");
let Category = document.querySelectorAll("li");
let textBtn = document.getElementById("text-btn");
let userName = document.getElementById("userName");
let userAlert = document.getElementById("userAlert");
let userPhone = document.getElementById("userPhone");
let phoneAlert = document.getElementById("phoneAlert");
let userPassword = document.getElementById("userPassword");
let passwordAlert = document.getElementById("passwordAlert");
let userEmail = document.getElementById("userEmail");
let emailAlert = document.getElementById("emailAlert");
let userAge = document.getElementById("userAge");
let ageAlert = document.getElementById("ageAlert");
let userRePassword = document.getElementById("userRePassword");
let rePasswordAlert = document.getElementById("rePasswordAlert");
let submitBtn = document.getElementById('submitBtn');
//-----------------------------------------

// Data Container
let moviesContainer = [];


// Get Data

async function getMovies(type) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${type}?api_key=74052a12ed43d666ebfc2e802b1f07e2&language=en-US&page=1`
  );
  let data = await response.json();
  moviesContainer = data.results;
  disPlayMovies();
}

// Call Public Api
getMovies("now_playing");

async function getTrending() {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=74052a12ed43d666ebfc2e802b1f07e2`
  );
  let data = await response.json();
  moviesContainer = data.results;
  disPlayMovies();
}

for (let i = 0; i < Category.length - 1; i++) {
  Category[i].addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList[0] !== "trending") {
      getMovies(e.target.classList[0]);
    } else {
      getTrending();
    }
  });
}

// Search in DataBase

async function searchData() {
  let value = searchGeneral.value;
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=74052a12ed43d666ebfc2e802b1f07e2&language=en-US&query=${value}&page=1&include_adult=false`
  );
  let data = await response.json();
  moviesContainer = data.results;
  disPlayMovies();
}

searchGeneral.addEventListener("keyup", searchData);

// Display Data

function disPlayMovies() {
  let temp = "";
  for (let i = 0; i < moviesContainer.length; i++) {
    temp += `<div class="col-md-4 my-2">
    <div class="item text-center">
      <img src="https://image.tmdb.org/t/p/w500/${moviesContainer[i].poster_path}" class="w-100" alt="${moviesContainer[i].original_title}">
      <div class="cap p-2">
        <h3>${moviesContainer[i].original_title}</h3>
        <p>${moviesContainer[i].overview}</p>
        <p>rate: ${moviesContainer[i].vote_average}</p>
        <p>${moviesContainer[i].release_date}</p>
      </div>
    </div>
  </div>`;
  }
  document.getElementById("rowData").innerHTML = temp;
}

// Search in current movies

function search() {
  let temp = "";
  for (let i = 0; i < moviesContainer.length; i++) {
    if (
      moviesContainer[i].original_title
        .toLowerCase()
        .includes(searchLocal.value.trim().toLowerCase())
    ) {
      temp += `<div class="col-md-4 my-2">
      <div class="item text-center">
        <img src="https://image.tmdb.org/t/p/w500/${moviesContainer[i].poster_path}" class="w-100" alt="${moviesContainer[i].original_title}">
        <div class="cap p-2">
          <h3>${moviesContainer[i].original_title}</h3>
          <p>${moviesContainer[i].overview}</p>
          <p>rate: ${moviesContainer[i].vote_average}</p>
          <p>${moviesContainer[i].release_date}</p>
        </div>
      </div>
    </div>`;
    }
  }
  document.getElementById("rowData").innerHTML = temp;
}

searchLocal.addEventListener("keyup", search);

// validation inputs

textBtn.addEventListener("click", function () {
  ValidationInputs();
});

function ValidationInputs() {
  if (
    validationName() &&
    validationPhone() &&
    validationPassword() &&
    validationEmail()&&
    rePassword()
  ) {

    return true;
  } else {

    return false;
  }
}


// validation UserName
function validationName() {
  let regex = /^[A-Za-z]{1,}$/;
  if (regex.test(userName.value)) {
    userAlert.classList.replace("d-block", "d-none");
    submitBtn.removeAttribute('disabled')
    return true;
  } else {
    userAlert.classList.replace("d-none", "d-block");
    submitBtn.disabled = "true"
    return false;
  }
}
userName.addEventListener("keyup", validationName);



// validation Phone
function validationPhone() {
  let regex = /^[0-9]{10,11}$/;
  if (regex.test(userPhone.value)) {
    phoneAlert.classList.replace("d-block", "d-none");
    submitBtn.removeAttribute('disabled')
    return true;
  } else {
    phoneAlert.classList.replace("d-none", "d-block");
    submitBtn.disabled = "true"
    return false;
  }
}
userPhone.addEventListener("keyup", validationPhone);



// validation Password

function validationPassword() {
  let regex = /^[!@#$%\^\&*]{9}[a-zA-Z]{1}$/;
  if (regex.test(userPassword.value)) {
    passwordAlert.classList.replace("d-block", "d-none");
    submitBtn.removeAttribute('disabled')
    return true;
  } else {
    passwordAlert.classList.replace("d-none", "d-block");
    submitBtn.disabled = "true"
    return false;
  }
}
userPassword.addEventListener("keyup", validationPassword);



// validation Repassword

function rePassword() {
  if (userPassword.value === userRePassword.value) {
    rePasswordAlert.classList.replace("d-block", "d-none");
    submitBtn.removeAttribute('disabled')
    return true;
  } else {
    rePasswordAlert.classList.replace("d-none", "d-block");
    submitBtn.disabled = "true"
    return false;
  }
}
userRePassword.addEventListener("keyup", rePassword);




// validation Email

function validationEmail() {
  let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  if (regex.test(userEmail.value)) {
    emailAlert.classList.replace("d-block", "d-none");
    submitBtn.removeAttribute('disabled')
    return true;
  } else {
    emailAlert.classList.replace("d-none", "d-block");
    submitBtn.disabled = "true"
    return false;
  }
}
userEmail.addEventListener("keyup", validationEmail);



// validation Age

function validationAge() {
  let regex = /^([1-9][0-9]{0,1}|100)$/;
  if (regex.test(userAge.value)) {
    ageAlert.classList.replace("d-block", "d-none");
    submitBtn.removeAttribute('disabled')
    return true;
  } else {
    ageAlert.classList.replace("d-none", "d-block");
    submitBtn.disabled = "true"
    return false;
  }
}
userAge.addEventListener("keyup", validationAge);






// Side Bar

let sideBarWidth = $(".sideBar-container").innerWidth();

$("#btn").on("click", function () {
  if ($("#sideBar").css("left") === "0px") {
    $("#sideBar").animate({ left: -sideBarWidth }, 500);
    $('#btn').addClass('fa-bars')
    $("#btn").removeClass('fa-circle-xmark')
  } else {
    $("#sideBar").animate({ left: 0 }, 500);
    $("#btn").addClass('fa-circle-xmark')
    $('#btn').removeClass('fa-bars')
  }
});


$("#sideBar").css("left", -sideBarWidth);


