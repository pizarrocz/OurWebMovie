var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get('id');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.tvmaze.com/shows/' + id);
xhr.send();
xhr.onload = function () {
    if (xhr.status != 200) { // verificar o estado do http response
        console.log(`Error ${xhr.status}: ${xhr.statusText}`); // Ver codigo estado http se for 400 é mau
    } else {
        const info = JSON.parse(xhr.response); //informaçoes serie vão ser guardadas na variavel INFO

        document.getElementById('title').innerHTML = info.name;
        document.getElementById('imagem').src = info.image.medium;

        document.getElementById('nome').innerHTML = info.name;
        document.getElementById('genero').innerHTML = info.genres;
        document.getElementById('lancamento').innerHTML = info.premiered;
        document.getElementById('sinopse').innerHTML = info.summary;
        console.log(info.summary);
        document.getElementById('pais').innerHTML = info.network.country.name;
        document.getElementById('estado').innerHTML = info.status;
        document.getElementById('nota').innerHTML = info.rating.average + " /10";
    }
};


//ATORES
var atores = new XMLHttpRequest();
atores.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //obter a resposta
        console.log(this.responseText);
        var response = JSON.parse(this.responseText); //response é o array para os atores

        for (var i = 0; i < 4; i++){
            console.log(response[i].person.name);
            const ator = document.createElement('span');
            ator.innerText = response[i].person.name + ", ";

            document.getElementById("atores").appendChild(ator);
        }

    }
};

atores.open("GET", "https://api.tvmaze.com/shows/" + id + "/cast", true);
atores.send();


//EPISODIOS
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        //obter a resposta
        console.log(this.responseText);
        var response = JSON.parse(this.responseText); //response é o array para todos os episodios
        var contator = response.length;
        document.getElementById("contaepisodios").innerHTML = contator;
        response.forEach(eps => {
            console.log(eps.season);
            var divEp = document.createElement('div');
            divEp.className = "divep";

            const epInfo = document.createElement('p');
            epInfo.innerText = "Temporada: " + eps.season + " Ep: " + eps.number + " - " + eps.name;

            const hora = document.createElement('p');
            hora.innerText = eps.airdate + " " + eps.airtime;


            const capa = document.createElement('img');
            capa.src = (eps.image.medium);


            divEp.appendChild(epInfo);
            divEp.appendChild(hora);
            divEp.appendChild(capa);
            document.getElementById("episodios").appendChild(divEp);
        });
        
    }
};

xhttp.open("GET", "https://api.tvmaze.com/shows/" + id + "/episodes", true);
xhttp.send();
