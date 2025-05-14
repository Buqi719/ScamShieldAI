// Fjalët dhe shprehjet e rrezikshme
const fjaleTeRrezikshme = [
    "fitove", "fitim", "kliko", "klikoni", "urgjent", "dërgo kodin", "fjalëkalim",
    "konfirmo", "paguaj", "pagesë", "çmim", "iPhone falas", "verifiko", "llogari e bllokuar"
];

const manipulim = [
    "vepro menjëherë", "nëse nuk e bën tani", "vetëm sot", "ke një minutë", "do humbasësh",
    "mos ja trego askujt", "sekret", "shans i fundit", "ti je përzgjedhur", "vetëm për ty", "mos vono"
];

// Funksioni që kontrollon linket
function kontrolloLinkun(text) {
    const urlPattern = /https?:\/\/[^\s]+/g;
    const urls = text.match(urlPattern);
    if (!urls) return [];

    return urls.map(link => {
        if (link.includes("bit.ly") || link.includes("tinyurl") || link.includes("ow.ly")) {
            return { url: link, rrezik: true };
        }
        return { url: link, rrezik: false };
    });
}

// Funksioni kryesor që analizon mesazhin
function analizoMesazhin(mesazhi) {
    const rezultat = {
        rreziku: "I sigurt",
        arsye: [],
        sugjerime: []
    };

    const mesazhiLower = mesazhi.toLowerCase();
    let countRrezik = 0;

    fjaleTeRrezikshme.forEach(fj => {
        if (mesazhiLower.includes(fj)) {
            rezultat.arsye.push(`Përmban fjalë të rrezikshme: "${fj}"`);
            countRrezik++;
        }
    });

    manipulim.forEach(shp => {
        if (mesazhiLower.includes(shp)) {
            rezultat.arsye.push(`Përdor presion psikologjik: "${shp}"`);
            countRrezik++;
        }
    });

    const links = kontrolloLinkun(mesazhi);
    if (links.length > 0) {
        links.forEach(link => {
            if (link.rrezik) {
                rezultat.arsye.push(`Link i shkurtuar i dyshimtë: ${link.url}`);
                countRrezik++;
            } else {
                rezultat.arsye.push(`Përmban link: ${link.url}`);
            }
        });
    }

    if (countRrezik === 0) {
        rezultat.rreziku = "I sigurt";
    } else if (countRrezik <= 2) {
        rezultat.rreziku = "I dyshimtë";
    } else {
        rezultat.rreziku = "Mashtrim i mundshëm";
    }

    if (countRrezik > 0) {
        rezultat.sugjerime.push("Mos kliko në linke të panjohura.");
        rezultat.sugjerime.push("Mos dërgo të dhëna personale.");
        rezultat.sugjerime.push("Raporto mesazhin si mashtrim në platformë.");
    }

    return rezultat;
}

// Aktivizimi kur shtypet butoni
document.getElementById("analizoBtn").addEventListener("click", () => {
    const mesazhi = document.getElementById("inputMesazhi").value;
    const analizuar = analizoMesazhin(mesazhi);

    let icon = "";
    let klasat = "";

    if (analizuar.rreziku === "I sigurt") {
        icon = "✅";
        klasat = "rrezik-sigurt";
    } else if (analizuar.rreziku === "I dyshimtë") {
        icon = "🔶";
        klasat = "rrezik-dyshimt";
    } else {
        icon = "❌";
        klasat = "rrezik-mashtrim";
    }

    let output = `<div class="${klasat}">`;
    output += `<strong>Rezultati:</strong> ${icon} ${analizuar.rreziku}<br><br>`;

    if (analizuar.arsye.length > 0) {
        output += `<strong>Arsyet:</strong><ul>`;
        analizuar.arsye.forEach(a => {
            output += `<li>${a}</li>`;
        });
        output += `</ul>`;
    }

    if (analizuar.sugjerime.length > 0) {
        output += `<strong>Sugjerime:</strong><ul>`;
        analizuar.sugjerime.forEach(s => {
            output += `<li>${s}</li>`;
        });
        output += `</ul>`;
    }

    output += `</div>`;
    document.getElementById("rezultati").innerHTML = output;
});
update script.js
 
