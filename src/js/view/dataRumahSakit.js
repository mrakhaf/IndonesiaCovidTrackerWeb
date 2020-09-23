const urlRS = "../../src/data/rumah-sakit.json"

var x = document.querySelector(".kasus-sekitar");
var y = document.querySelector(".table-sekitar")


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    x.innerHTML = "Geolocation is not supported by this browser.";
}


function showPosition(position) {
    let lat = position.coords.latitude
    let long = position.coords.longitude
    callAPI(lat, long)
}

function callAPI(lat, long) {
    let url =
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=id`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            callData(data.principalSubdivision)
            kasusAPI(data.principalSubdivision)
        })
        .catch(err => console.warn(err.message));
}

function callData(provinsi) {

    table()
    let rs = []
    let i = 0;
    fetch(urlRS)
        .then(res => res.json())
        .then(data => {
            const value = data.data;
            value.forEach(isi => {
                if (isi.province == provinsi) {
                    rs.push(isi)
                    i += 1
                    y.innerHTML += `
                        <tr>
                            <th scope="row">${i}</th>
                            <td>${isi.name}</td>
                            <td>${isi.address}, ${isi.region}</td>
                            <td>${isi.phone}</td>
                        </tr>
                    `
                }
            });
        })
        .catch(err => alert(err))


}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "Anda tidak mengaktifkan lokasi."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Lokasi tidak tersedia."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function kasusAPI(provinsi) {
    fetch('https://indonesia-covid-19.mathdro.id/api/provinsi')
        .then(res => res.json())
        .then(data => {
            let valueProvinsi = data.data;
            valueProvinsi.forEach(isi => {
                if (isi.provinsi == provinsi) {
                    x.innerHTML += `
                    <div class="text-left">
                    <h1 class="nama-provinsi blue">
                      Kasus di ${isi.provinsi}
                    </h1>
                  </div>
                  <div class="card-group">
                    <div class="card d-flex">
                      <div class="card-body text-center positif-provinsi">
                        <h5 class="text-left title">Total Kasus</h5>
                        <h2 class="card-text value">
                          ${isi.kasusPosi}
                        </h2>
                      </div>
                    </div>
                    <div class="card d-flex">
                      <div class="card-body text-center dirawat-provinsi">
                        <h5 class="text-left title">Dirawat</h5>
                        <h2 class="card-text value">
                          ${isi.kasusPosi -
                          isi.kasusSemb}
                        </h2>
                      </div>
                    </div>
                    <div class="card d-flex">
                      <div class="card-body text-center sembuh-provinsi">
                        <h5 class="text-left title">Sembuh</h5>
                        <h2 class="card-text value">
                          ${isi.kasusSemb}
                        </h2>
                      </div>
                    </div>
                    <div class="card d-flex">
                      <div class="card-body text-center meninggal-provinsi">
                        <h5 class="text-left title">Meninggal</h5>
                        <h2 class="card-text value">
                          ${isi.kasusMeni}
                        </h2>
                      </div>
                    </div>
                  </div>
                            </br> </br>
                    <div class="text-left">
                        <h1 class="nama-provinsi blue">
                            Rumah Sakit di ${isi.provinsi}
                        </h1>
                    </div>
                    `
                }
            });
        })
        .catch(err => alert(err))
}

function table() {
    y.innerHTML += `
      <tr>
        <th scope="col">No.</th>
        <th scope="col">Rumah Sakit</th>
        <th scope="col">Alamat</th>
        <th scope="col">No. Telepon</th>
      </tr>
    `
}