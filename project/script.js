window.addEventListener('load', setList);
var ul = document.getElementById('list');
var popupBg = document.querySelector('.popup_bg');
var popup = document.querySelector('.popup');
var closePopupButton = document.querySelector('.close-popup');
var header = document.getElementById('header');
var birthYear = document.getElementById('birthYear');
var gender = document.getElementById('gender');
var films = document.getElementById('films');
var homeworld = document.getElementById('homeworld');
var species = document.getElementById('species');
var nextBtn = document.getElementById('next');
var prevBtn = document.getElementById('prev');
var url = 'https://swapi.dev/api/people/';
var urlNext;
var urlPrev;
var init = {method: 'GET'};

    function setList() {
        fetch(url, init)
        .then(function (resp) {return resp.json();})
            .then(function (data) {
            
                for(var i = 0; i < data.results.length; i++) {
                    ul.children[i].innerHTML = data.results[i].name;


                    //open popup
                    ul.children[i].addEventListener('click', function(e) {
                        var target = e.target;
                        if (target.tagName !== 'LI') {
                            return;
                        }
                
                        popupBg.classList.add('active');
                        popup.classList.add('active');
                        
                        //filling popup
                        for(var i = 0; i < data.results.length; i++) {
                            if(target.innerHTML == data.results[i].name) {
                                header.innerHTML = data.results[i].name;
                                birthYear.innerHTML = data.results[i].birth_year;
                
                                //gender
                                if(data.results[i].gender == 'n/a') {
                                    gender.innerHTML = 'unknown';
                                } else {
                                    gender.innerHTML = data.results[i].gender;
                                }
                                
                
                                //films
                                var filmsUrl = data.results[i].films;
                                films.innerHTML = '';
                                if(filmsUrl.length < 1) {
                                    films.innerHTML = 'unknown';
                                } else {
                                    for(var j = 0; j < filmsUrl.length; j++) {
                                        fetch(filmsUrl[j], init)
                                            .then(function (resp)
                                             {return resp.json();})
                                                .then(function (data) {
                                                    var a = data.title + '</br>';
                                                    films.innerHTML += a;
                                                    a = '';  
                                                })
                                            .catch(function (err) {console.error(err)});
                                    }                        
                                }
                
                                //homeworld
                                var homeworldUrl = data.results[i].homeworld;
                                if(homeworldUrl.length == 0) {
                                    homeworld.innerHTML = 'unknown';
                                } else {
                                    fetch(homeworldUrl, init)
                                    .then(function (resp) {return resp.json();})
                                        .then(function (data) {
                                            homeworld.innerHTML = data.name;
                                        })
                                    .catch(function (err) {console.error(err)});
                                }
                
                                //species
                                var speciesUrl = data.results[i].species;
                                if(speciesUrl.length == 0) {
                                    species.innerHTML = 'unknown';
                                } else {
                                    fetch(speciesUrl, init)
                                    .then(function (resp) {return resp.json();})
                                        .then(function (data) {
                                            species.innerHTML = data.name;
                                        })
                                    .catch(function (err) {console.error(err)});
                                }  
                            }
                        }                       
                    })
                }
    
                urlNext = data.next;
                if(urlNext !== null) {
                    nextBtn.style.display = 'block';
                } else {
                    nextBtn.style.display = 'none';
                }

                urlPrev = data.previous;
                if(urlPrev !== null) {
                    prevBtn.style.display = 'block';
                } else {
                    prevBtn.style.display = 'none';
                }
            })
        .catch(function (err) {console.error(err)});
    }
    

//button next
nextBtn.addEventListener('click', clickHandlerNext);

function clickHandlerNext() {
    url = urlNext;
    setList();
}

//button previous
prevBtn.addEventListener('click', clickHandlerPrev);

function clickHandlerPrev() {
    url = urlPrev;
    setList();
    
}

//button close popup
closePopupButton.addEventListener('click', function() {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
})


