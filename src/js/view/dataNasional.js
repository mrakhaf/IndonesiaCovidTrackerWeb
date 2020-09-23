// SELECT ALL ELEMENTS
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const treated_element = document.querySelector(".treated .value");
const new_treated_element = document.querySelector(".treated .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");
const ctx = document.getElementById("axes_line_chart").getContext("2d");


// APP VARIABLES
let app_data = [],
	cases_list = [],
	treated_list = [],
	recovered_list = [],
	deaths_list = [],
	formatedDates = [];

//FETCH EXTERNAL API
fetch('https://indonesia-covid-19.mathdro.id/api/harian')
	.then(res => res.json())
	.then(data => {
		let valueData = data.data;
		valueData.forEach(value => {
			formatedDates.push(formatDate(value.tanggal))
			app_data.push(value)
			cases_list.push(value.jumlahKasusKumulatif)
			treated_list.push(value.jumlahpasiendalamperawatan)
			recovered_list.push(value.jumlahPasienSembuh)
			deaths_list.push(value.jumlahPasienMeninggal)
		})
		updateUI()
	})
	.catch(err => alert(err))

// UPDATE UI FUNCTION
function updateUI() {
	updateStats();
	axesLinearChart();
}

//UPDATE STATS FUNCTION
function updateStats() {
	let last_entry = app_data[app_data.length - 1]
	let j = 2;

	while (last_entry.jumlahKasusDiperiksa === null) {
		last_entry = app_data[app_data.length - j]
		j++
	}


	total_cases_element.innerHTML = last_entry.jumlahKasusKumulatif || 0;
	new_cases_element.innerHTML = `+${last_entry.jumlahKasusBaruperHari || 0 }`;

	treated_element.innerHTML = last_entry.jumlahpasiendalamperawatan || 0;
	new_treated_element.innerHTML = `+${last_entry.jumlahKasusDirawatperHari || 0 }`;

	recovered_element.innerHTML = last_entry.jumlahPasienSembuh || 0;
	new_recovered_element.innerHTML = `+${last_entry.jumlahKasusSembuhperHari}`;

	deaths_element.innerHTML = last_entry.jumlahPasienMeninggal;
	new_deaths_element.innerHTML = `+${last_entry.jumlahKasusMeninggalperHari || 0}`;
}

// UPDATE CHART
let my_chart;

function axesLinearChart() {
	my_chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Kasus',
				data: cases_list,
				fill: false,
				borderColor: '#FFF',
				backgroundColor: '#FFF',
				borderWidth: 1
			}, {
				label: 'Dirawat',
				data: treated_list,
				fill: false,
				borderColor: 'yellow',
				backgroundColor: 'yellow',
				borderWidth: 1
			}, {
				label: 'Sembuh',
				data: recovered_list,
				fill: false,
				borderColor: '#009688',
				backgroundColor: '#009688',
				borderWidth: 1
			}, {
				label: 'Meninggal',
				data: deaths_list,
				fill: false,
				borderColor: '#f44336',
				backgroundColor: '#f44336',
				borderWidth: 1
			}],
			labels: formatedDates
		},
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});
}

// FORMAT DATES
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateString) {
	let date = new Date(dateString);
	return `${date.getDate()} ${monthsNames[date.getMonth()]} ${date.getFullYear()}`;
}