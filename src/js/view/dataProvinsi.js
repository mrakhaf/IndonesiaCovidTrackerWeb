// const ctx1 = document.getElementById("axes_pie_chart").getContext("2d");

const carousel_container = document.querySelector(".carousel-content");

fetch('https://indonesia-covid-19.mathdro.id/api/provinsi')
  .then(res => res.json())
  .then(data => {
    let valueProvinsi = data.data;
    let firstValueProvinsi = valueProvinsi[0];
    firstItemCarousel(firstValueProvinsi);
    let j = 1;
    for (j = 1; j < valueProvinsi.length - 1; j++) {
      let value = valueProvinsi[j];
      ItemsCarousel(value)
    }
  })
  .catch(err => alert(err))

function firstItemCarousel(firstValueProvinsi) {
  carousel_container.innerHTML = `
  <div class="slider bg pt-4 pb-4 pl-4 pr-4 carousel-item active">
            <div class="text-left">
              <h1 class="nama-provinsi white">${firstValueProvinsi.provinsi}</h1>
            </div>
            <div class="card-group">
              <div class="card d-flex slider-content">
                <div class="card-body text-center positif-provinsi">
                  <h5 class="text-left title">Total Kasus</h5>
                  <h2 class="card-text value">${firstValueProvinsi.kasusPosi}</h2>
                </div>
              </div>
              <div class="card d-flex slider-content">
                <div class="card-body text-center dirawat-provinsi">
                  <h5 class="text-left title">Dirawat</h5>
                  <h2 class="card-text value">${firstValueProvinsi.kasusPosi - firstValueProvinsi.kasusSemb}</h2>
                </div>
              </div>
              <div class="card d-flex slider-content">
                <div class="card-body text-center sembuh-provinsi">
                  <h5 class="text-left title">Sembuh</h5>
                  <h2 class="card-text value">${firstValueProvinsi.kasusSemb}</h2>
                </div>
              </div>
              <div class="card d-flex slider-content">
                <div class="card-body text-center meninggal-provinsi">
                  <h5 class="text-left title">Meninggal</h5>
                  <h2 class="card-text value">${firstValueProvinsi.kasusMeni}</h2>
                </div>
              </div>
            </div>
          </div>
  `;
}

function ItemsCarousel(value) {
  carousel_container.innerHTML += `
  <div class="slider bg pt-4 pb-4 pl-4 pr-4 carousel-item">
            <div class="text-left">
              <h1 class="nama-provinsi white">${value.provinsi}</h1>
            </div>
            <div class="card-group">
              <div class="card d-flex slider-content">
                <div class="card-body text-center positif-provinsi">
                  <h5 class="text-left title">Total Kasus</h5>
                  <h2 class="card-text value">${value.kasusPosi}</h2>
                </div>
              </div>
              <div class="card d-flex slider-content">
                <div class="card-body text-center dirawat-provinsi">
                  <h5 class="text-left title">Dirawat</h5>
                  <h2 class="card-text value">${value.kasusPosi - value.kasusSemb}</h2>
                </div>
              </div>
              <div class="card d-flex slider-content">
                <div class="card-body text-center sembuh-provinsi">
                  <h5 class="text-left title">Sembuh</h5>
                  <h2 class="card-text value">${value.kasusSemb}</h2>
                </div>
              </div>
              <div class="card d-flex slider-content">
                <div class="card-body text-center meninggal-provinsi">
                  <h5 class="text-left title">Meninggal</h5>
                  <h2 class="card-text value">${value.kasusMeni}</h2>
                </div>
              </div>
            </div>
          </div>
  `;
}