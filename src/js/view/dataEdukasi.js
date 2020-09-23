const contentEdukasi = document.querySelector(".content-edukasi");
const urlEdukasi = "../../src/data/edukasi.json"

fetch(urlEdukasi)
  .then(res => res.json())
  .then(data => {
    const value = data.data;
    value.forEach(valueEdukasi => {
      valueContentEdukasi(valueEdukasi);
    });
  })
  .catch(err => alert(err))

function valueContentEdukasi(item) {
  contentEdukasi.innerHTML += `
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img
        src="${item.gambarEdukasi}"
        class="card-img-top" role="img">
      </img>
      <div class="card-body">
        <p class="card-text">${item.judulEdukasi}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a href="${item.alamatEdukasi}"
              class="btn btn-danger">Lihat</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
}