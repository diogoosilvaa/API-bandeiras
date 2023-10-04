const container = document.getElementById('container')
const inputFiltro = document.getElementById('filtro')

console.log(container, inputFiltro)

async function requisicaoApiRestCountries() {
    try {
        const fetcApiRestCountries = await fetch('https://restcountries.com/v3.1/all')
        const respostaConvertida = await fetcApiRestCountries.json()
        const arrayPaises = respostaConvertida
        return arrayPaises
    } catch (erro) {
        console.log(erro)
        return []
    }
}


async function filtraPaisesPorNome(nomePais) {
    const arrayPaises = await requisicaoApiRestCountries()
    if(nomePais == ""){
        return arrayPaises
    }else{
        const paisesFltrados = arrayPaises.filter((pais) =>
        pais.name.common.toLowerCase().includes(nomePais.toLowerCase()))
        return paisesFltrados
    }    
}    



async function renderizaPaises() {
    const arrayPaises = await filtraPaisesPorNome(inputFiltro.value)
    console.log(arrayPaises)
    const cardPaises = arrayPaises.map((pais) => {
        return `
                <div class="card-container ${pais.region}"> 
                    <img src="${pais.flags.png}" alt="">
                    <div class="card-texto ${pais.region}">
                        <h2>${pais.name.common}</h2>
                        <hr>
                        <div>
                            <h3>População:</h3>
                            <p>${pais.population}</p>
                        </div>
                        <div>
                            <h3>Capital:</h3>
                            <p>${pais.capital === undefined ? 'Não consta' : pais.capital}</p>
                        </div>
                        <div>
                            <h3>Continente:</h3>
                            <p>${pais.continents}</p>
                        </div>
                        <div>
                            <h3>Sigla:</h3>
                            <p>${pais.fifa === undefined ? 'Não consta' : pais.fifa}</p>
                        </div>
                    </div>
                </div>
            `
    })
    container.innerHTML = cardPaises.join(' ')
}
renderizaPaises()
inputFiltro.addEventListener('keyup', renderizaPaises)
