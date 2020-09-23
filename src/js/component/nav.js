const navBar = document.querySelector('.navigasi')

navBar.innerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top" id="myNav">
<div class="container-fluid navigasi">
  <a class="navbar-brand text-light" href="#page-top""><img src="/src/img/logo.png" style="width: 35px; margin-top:-7px;">CoronaIndo</a>
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onclick="hamburgerClick()">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link js-scroll-trigger text-light" href="index.html">HOME
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link js-scroll-trigger text-light" href="#provinsi">PROVINSI</a>
      </li>
      <li class="nav-item">
      <a class="nav-link js-scroll-trigger text-light" href="#sekitar">SEKITAR</a>
      </li>
      <li class="nav-item">
        <a class="nav-link js-scroll-trigger text-light" href="#edukasi">EDUKASI</a>
      </li>
      <li class="nav-item">
        <a class="nav-link js-scroll-trigger text-light" href="#berita">BERITA</a>
      </li>
    </ul>
  </div>
</div>
</nav>
`

//changecolor
var myNavbar = document.querySelector('nav')
window.onscroll = function () {
  // pageYOffset or scrollY
  if (window.pageYOffset > 0) {
    myNavbar.classList.add('bg-danger')
    myNavbar.classList.remove('bg-transparent')
  } else {
    myNavbar.classList.remove('bg-danger')
    myNavbar.classList.add('bg-transparent')
  }
}

function hamburgerClick() {
  if ($('.navbar-toggler').attr('aria-expanded') === 'false') {
    myNavbar.classList.add('bg-danger')
    myNavbar.classList.remove('bg-transparent')
  } else {
    myNavbar.classList.add('bg-transparent')
    myNavbar.classList.remove('bg-danger')
  }
}