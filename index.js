const axios = require("axios");
const fs = require("fs/promises");

async function readFile() {
	try {
		const texto = await fs.readFile("./random.txt", "utf8");
		const random = texto.split("\n");
		return random;
	} catch (err) {
		console.log(err);
	}
}

//* Probe con Promise.All pero no lo aplique bien en esta situacion... 
//* Vuelta a lo tipico
async function buscar() {
	const arrayUrl = await readFile();
	const arrayJson = [];
	for (let i = 0; i < arrayUrl.length; i++) {
		//arrayJson[i] = axios.get(arrayUrl[i]);
		axios
			.get(arrayUrl[i])
			.then((respuesta) => {
				const { data } = respuesta;
				console.log("\n");
				console.log(arrayUrl[i]);
				console.log(data);
			})
			.catch((err) => console.log(err));
	}
	// Promise.all(arrayJson).then((values) => {
	// 	const { data } = values;
	// 	console.log(values)
	// 	console.log(data);
	// })
}

// async function getData() {
// 	let { data } = await axios.get("http://randomuser.me/api/");
//     nombre = data.results[0].name.first + " " + data.results[0].name.last;
//     fecha = data.results[0].dob.date.slice(0, 10);

buscar();
