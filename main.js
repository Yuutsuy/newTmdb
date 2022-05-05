var arraySalvos = JSON.parse(localStorage.getItem("salvos")) || [];

var results = document.getElementById("results");
var resultsSalvos = document.getElementById("results_save");
var resultTitle = document.getElementById("result_title");
var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");
var searchNumbers = document.getElementById("searchNumbers");
var clearButton = document.getElementById("clearButton");
var salvar = document.getElementById("salvar");
var excluir = document.getElementById("excluir");


var response = undefined;

var tmdb = {
  // atributos

  // métodos
  pesquisar: function () {
    if(searchInput.value !== ''){
      var xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        encodeURI(
          `https://api.themoviedb.org/3/search/movie?api_key=cb1577bb4988e064535e2a09713cc852&language=pt-br&include_adult=false&query=${searchInput.value}`
        )
      );
      xhr.send(null);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status == 200) {
            response = JSON.parse(xhr.responseText);
            //console.log(response);

            // limpar os resultados anteriores se houverem.
            results.innerHTML = "";
            // apagar o conteúdo da caixa de consulta
            searchInput.value = "";

            // mostrar a quantidade de resultados obtidos
            resultTitle.style.display = "block";

            for (i = 0; i < response.results.length; i++) {
              // console.log(response.results[i].poster_path);
              // criar um elemento li
              var liPesquisar = document.createElement("li");

              // criar um elemento img
              var imgPesquisar = document.createElement("img");
              imgPesquisar.setAttribute(
                "src",
                `https://image.tmdb.org/t/p/w500${response.results[i].poster_path}`
              );
              liPesquisar.appendChild(imgPesquisar);

              // span
              var spanPesquisar = document.createElement("span");
              var spanText = document.createTextNode(response.results[i].title);
              spanPesquisar.appendChild(spanText);
              liPesquisar.appendChild(spanPesquisar);

              // Paragrafo
              var description;
              if (response.results[i].overview == "") {
                description = "Sem descrição...";
              } else {
                description = response.results[i].overview;
              }

              var paragrafoPesquisar = document.createElement("p");
              var paragrafoText = document.createTextNode(description);
              paragrafoPesquisar.appendChild(paragrafoText);
              liPesquisar.appendChild(paragrafoPesquisar);

              // botão salvar
              var button = document.createElement("button");
              button.innerHTML = "Salvar";  
              button.setAttribute('onclick',`tmdb.salvar(${JSON.stringify(response.results[i])});`);    
              liPesquisar.appendChild(button);

              // não esquecer de appendar o liPesquisar
              results.appendChild(liPesquisar);
            } // fim do for

            // mostra valor dos resultados
            searchNumbers.innerText = `(${response.results.length})`;
          }
        }
      };
    }else{
      alert('Insira algo no campo de pesquisa');
    };
  }, // fim pesquisar

  salvar: function(data){
    
    console.log(data);
    arraySalvos.push(data);
    localStorage.setItem("salvos", JSON.stringify(arraySalvos));

    console.log(arraySalvos);

    resultsSalvos.innerHTML = '';
    for(item = 0; item < arraySalvos.length; item++) {
      // criar um elemento li
      var liSalvar = document.createElement("li");

      // criar um elemento img
      var imgSalvar = document.createElement("img");
        imgSalvar.setAttribute(
          "src",
          `https://image.tmdb.org/t/p/w500${arraySalvos[item].poster_path}`
        );
      liSalvar.appendChild(imgSalvar);

      // span
      var spanSalvar = document.createElement("span");
      var spanTextSalvar = document.createTextNode(arraySalvos[item].title);
      spanSalvar.appendChild(spanTextSalvar);
      liSalvar.appendChild(spanSalvar);

      // Paragrafo
      var descriptionSalvar;
      if (arraySalvos[item].overview == "") {
        descriptionSalvar = "Sem descrição...";
      } else {
        descriptionSalvar = arraySalvos[item].overview;
      }
      var paragrafSalvar = document.createElement("p");
      var paragrafTextSalvar = document.createTextNode(descriptionSalvar);
      paragrafSalvar.appendChild(paragrafTextSalvar);
      liSalvar.appendChild(paragrafSalvar);

      // botão excluir
      var btnExcluir = document.createElement("button");
      btnExcluir.innerHTML = "Excluir";  
      btnExcluir.setAttribute('onclick', `tmdb.excluir(${JSON.stringify(arraySalvos[item])})`);    
      liSalvar.appendChild(btnExcluir);

      resultsSalvos.appendChild(liSalvar);
    }
  },

  limpar: function(){
    // limpar os resultados anteriores se houverem.
    results.innerHTML = "";
    // apagar o conteúdo da caixa de consulta
    searchInput.value = "";
    // apagar valor dos resultados
    searchNumbers.innerText = ``;
    // esconder a quantidade de resultados obtidos
    resultTitle.style.display = "none";
    localStorage.clear();
  },

  excluir: function(data) {
    arraySalvos = arraySalvos.filter(function(item){
      return item.id !== data.id
    });
    tmdb.salvar();
    
    console.log(arraySalvos);
  },
};

