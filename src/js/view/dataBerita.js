const contentBerita = document.querySelector(".content-berita");
const urlBerita = "../../src/data/berita.json"

fetch(urlBerita)
  .then(res => res.json())
  .then(data => {
    const value = data.data;
    value.forEach(valueBerita => {
      valueContentBerita(valueBerita);
    });
  })
  .catch(err => alert(err))

function valueContentBerita(item) {
  contentBerita.innerHTML += `
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img
        src="${item.gambarberita}"
        class="card-img-top" role="img">
      </img>
      <div class="card-body">
        <p class="card-text">${item.judulBerita}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <a href="${item.alamatBerita}"
              class="btn btn-danger">Lihat</a>
          </div>
          <small class="text-muted">${item.sumber}</small>
        </div>
      </div>
    </div>
  </div>
    `
}