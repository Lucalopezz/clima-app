const apiKey = "";
const apiPais = "https://countryflagsapi.com/png/";

//elementos
const cidadeInput = document.querySelector("#input-cidade");
const searchBtn = document.querySelector("#pesquisar");

const elementoCidade = document.querySelector("#cidade");
const elementoTemperatura = document.querySelector("#temperatura span");
const elementoDescricao = document.querySelector("#descricao");
const elementoIconeTempo = document.querySelector("#icone-tempo");
const elementoPais = document.querySelector("#pais");
const containerClima = document.querySelector("#clima-data");

const containerErro = document.querySelector("#msg-erro");


searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    const cidade = cidadeInput.value;
    mostrarTempo(cidade);
})
cidadeInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const cidade = e.target.value;
  
      mostrarTempo(cidade);
    }
});

//funcoes
const pegarClima = async(cidade) =>{
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const res = await fetch(apiWeatherURL);
    const data = await res.json();
    return data;
}
const mostrarMsgErro = () => {
    containerErro.classList.remove("esconder");
};
const esconderInfo = () => {
    containerErro.classList.add("esconder");
    containerClima.classList.add('esconder');;
  };
const mostrarTempo = async (cidade) => {
    esconderInfo();

    const data = await pegarClima(cidade);
   
    if (data.cod === "404") {
        mostrarMsgErro();
        return;
    }

    elementoCidade.innerText = data.name;
    elementoTemperatura.innerText = parseInt(data.main.temp);
    elementoDescricao.innerText = data.weather[0].description;
    elementoIconeTempo.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    elementoPais.setAttribute("src", apiPais + data.sys.country);
    containerClima.classList.remove('esconder');
}

