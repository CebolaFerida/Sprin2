const apiKey = '607fd0fbaee3b2eee57aa54e1e67a67a';

// Detectar localização pelo IP automaticamente
async function obterLocalizacao() {
    try {
        const resposta = await fetch('https://ipapi.co/json/');
        const dados = await resposta.json();
        const lat = dados.latitude;
        const lon = dados.longitude;
        console.log(`Localização detectada: ${lat}, ${lon}`);
        buscarClima(lat, lon);
    } catch (error) {
        mostrarMensagem("Erro ao detectar sua localização.");
        console.error(error);
    }
}

async function buscarClima(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro ao buscar clima");
        
        const dados = await resposta.json();
        const temperatura = Math.round(dados.main.temp);
        const descricao = dados.weather[0].description;
        const cidade = dados.name;
        
        mostrarMensagem(`${cidade}\n${temperatura}°C\n${descricao}`);
    } catch (error) {
        mostrarMensagem("Erro ao buscar a temperatura.");
        console.error(error);
    }
}

function mostrarMensagem(texto) {
    document.getElementById('clima').innerHTML = texto.replace(/\n/g, '<br>');
    document.getElementById('clima').classList.remove('loading');
}

// Iniciar automaticamente quando a página carregar
obterLocalizacao();