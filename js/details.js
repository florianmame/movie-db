const apiKey = 'f33cd318f5135dba306176c13104506a';
const DETAILS_TV = "details-tv";

let poster = document.getElementById('poster');
let infos = document.getElementById('infos');

let url_string = window.location.href;
let url = new URL(url_string);
let id = url.searchParams.get('id');

window.fetch('http://api.themoviedb.org/3/tv/' + id + '?language=fr&api_key=' + apiKey)
    .then(function (httpResponse) {
        return httpResponse.json();
    })
    .then(function (response) {

        stringContent = response.name + '<br>';
        response.genres.forEach(element => {
            stringContent += element.name + '<br>';
        });

        response.seasons.forEach(season => {
            stringContent += "<div class=\"p-3 border alert alert-secondary titleSeason\" data-id=\"" + season.season_number + "\" data-tvid=\"" +id+ "\" >" + season.name + "</div>";
            stringContent += "<div class=\"episodeList\" id=\"season" + season.season_number + "\">Contenu</div>";
        });

        infos.innerHTML = stringContent;

        poster.innerHTML = '<img class="img-fluid" width="200" height="250" src="https://www.themoviedb.org/t/p/w1280/' + response.poster_path + '">';

        detectButton();
    });


function detectButton(){
    let btn = document.querySelectorAll('.titleSeason');
    btn.forEach(element => {
        element.addEventListener('click', showDetailSaison)
    });
}



function showDetailSaison(event){
    let tvid = event.currentTarget.dataset.tvid;
    let seasonNumber = event.currentTarget.dataset.id;
    
    window.fetch('http://api.themoviedb.org/3/tv/' + tvid + '/season/'+seasonNumber+'?language=fr&api_key=' + apiKey)
    .then(function(httpResponse){
        return httpResponse.json();
    })
    .then(function(response){
        let stringContent = "";
        response.episodes.forEach(element => {
            stringContent += "<div class=\"form-check\">";
            stringContent += "<input class=\"form-check-input\" type=\"checkbox\" id=\""+id+"\">";
            stringContent += "<label class=\"form-check-label\" for=\""+id+"\">"+ element.name +"</label>";
            stringContent += "</div>";
        })

        let divDestination = document.getElementById('season'+seasonNumber);
        divDestination.innerHTML = stringContent;
        divDestination.classList.toggle('episodeList');
        detectCheckbox();
        
    })
}

function detectCheckbox(){
  let formCheck = document.querySelectorAll('.form-check');
  formCheck.forEach(element => {
      element.addEventListener('change', e => {
        
        let btn = document.getElementById('data-id');
      
           episode.push (id.seasons);
           console.log(id.seasons);
        });
    saveToLocalStorage(DETAILS_TV, episode);
  }
)}