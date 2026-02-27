async function fetchCameras() {
    try {
        const url = 'https://infocar.dgt.es/etraffic/BuscarElementos?latNS=37.0&longNS=-5.0&latWE=36.0&longWE=-6.5&zoom=11&elemautoruta=true&elemnieve=true&elementos=camaras';
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });

        const data = await response.text();
        console.log("Raw response length:", data.length);
        console.log("Starts with:", data.substring(0, 100));

        try {
            const json = JSON.parse(data);
            if (Array.isArray(json)) {
                json.forEach(item => {
                    if (item.tipo === 'camara') {
                        console.log(`- [${item.carretera}] PK ${item.pk}: ${item.descripcion} (URL: ${item.url})`);
                    }
                });
            }
        } catch (e) {
            console.log("Parse Error:", e.message);
        }
    } catch (err) {
        console.error(err);
    }
}
fetchCameras();
