function mostrar () {
	
    
    


    var nomePesquisa = document.getElementById('nomePesquisa');
    var pesquisar = document.getElementById('pesquisar');
    var pesquisa = nomePesquisa.value;
    


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //obter a resposta
                console.log(this.responseText);
                var response = JSON.parse(this.responseText); //response é o array para Pessoas
    
                response.forEach(info => {
                    var div = document.createElement("div");
    
                    div.classList.add("flexitem");
    
                    var pImage = document.createElement("img");
                    pImage.setAttribute("src", info.show.image.medium);
    
                    pImage.style.width = "210px";
                    pImage.style.height = "295px";
                    div.appendChild(pImage);
    
                    var nomeBold = document.createElement("b");
                    nomeBold.innerHTML = "Nome: ";
    
                    var pNome = document.createElement("p");
                    pNome.appendChild(nomeBold);
                    var textNome = document.createTextNode(info.show.name);
                    pNome.appendChild(textNome);
                    div.appendChild(pNome);


                    var estreiaBold = document.createElement("b");
                    estreiaBold.innerHTML = "Data Estreia: ";
                    var pEstreia = document.createElement("p");
                    pEstreia.appendChild(estreiaBold);
                    var textEstreia = document.createTextNode(info.show.premiered);
                    pEstreia.appendChild(textEstreia);
                    div.appendChild(pEstreia);

                    var generoBold = document.createElement("b");
                    generoBold.innerHTML = "Genero: ";
                    var pGenero = document.createElement("p");
                    pGenero.appendChild(generoBold);
                    var textGenero = document.createTextNode(info.show.genres);
                    pGenero.appendChild(textGenero);
                    div.appendChild(pGenero);
    
                    document.getElementById("search-results").appendChild(div);

                    div.addEventListener('click', function (){
                        window.location = "serie.html?id=" + info.show.id;
                    })
                });
            }
        };
    
        xhttp.open("GET", "https://api.tvmaze.com/search/shows?q=" + pesquisa, true);
        xhttp.send();
    
        console.log(pesquisa);
    }