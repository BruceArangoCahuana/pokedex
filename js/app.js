document.addEventListener("DOMContentLoaded",listo)

let cant = 9;
let ultima;
let observador = new IntersectionObserver((entrada,observador) =>{
    //comprobacion de elemanto en pantalla
    entrada.forEach(ent =>{
        if(ent.isIntersecting){
            
            setTimeout(() => {
               
               leer(cant +=6)
            }, 200);
            
            
        }
    })
},{
    rootMargin:"0px 0px 0px 0px",
    threshold:1.0
})
//consumir la data de la API
const leer = (cant) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${cant}/`)
    .then(data => data.json())
    .then(resp =>{
        tarjetas(resp)
        //console.log(resp)
    })
}

//recorremos el Id para poder traer cierta cantidad de pokemon
const traerCantPokemon = (number) =>{
    for (let i = 1; i <= number; i++) {
        leer(i)
        
    }
}

const tarjetas = (pokemon) =>{
    
    document.querySelector("#pokedex").innerHTML +=`
        <div class="col-3 full me-1 bg-white p-2 mb-3 d-flex justify-content-center align-items-cemter flex-column  shadow-sm" id="card-podex">
       
        <div class=" full d-flex justify-content-center align-items-cemter">
            <div class="fondo full">
                
                    
                <div id="${pokemon.name}" class="carousel slide">
                <button class="carousel-control-prev" type="button" data-bs-target="#${pokemon.name}" data-bs-slide="prev">
                    <i class="fa-solid fa-angle-left icon__left"></i>
                </button>

                    <div class="carousel-inner p-4 w-100">
                        <div class="carousel-item active">
                            <img src="${pokemon.sprites.front_default}" class="img-fluid full" loading="lazy"/>
                        </div>
                        <div class="carousel-item">
                            <img src="${pokemon.sprites.front_shiny}" class="img-fluid full" loading="lazy"/>
                        </div>
                    </div>
                    
                    <button class="carousel-control-next" type="button" data-bs-target="#${pokemon.name}" data-bs-slide="next">
                        <i class="fa-solid fa-chevron-right icon__left"></i>
                    </button>
                </div>

            </div>
        </div>
            <p class="text-center text-black text-capitalize">${pokemon.name}</p>
            <div class="p-1 d-flex justify-content-center align-items-cemter flex-column">
            <span class="text-center border__puntos text-danger">${ pokemon.types.map(elem =>(
                (elem.type.name)
               ))}</span>

           
            <small class="text-center">Experiencia: <span class="badge rounded-pill bg-danger mt-2">${pokemon.base_experience}</span></small>
            
            
            <button type="button" data-bs-toggle="modal" data-bs-target="#${pokemon.name}-1" class="btn btn-info mt-2">ver más</button>
        </div>
        
                
    <div class="modal fade" id="${pokemon.name}-1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel" class="text-capitalize text-white">${pokemon.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="d-flex justify-content-center align-items-cemter">
                    <div class="bg-white">
                        <img src="${pokemon.sprites.front_default}" width="200px"/>
                        
                    </div>
                    <ul>
                        <li>
                            <h6 class="text-white">Habilidades</h6>
                            <span>
                            ${ pokemon.abilities.map(elem =>(
                                (elem.ability.name)
                            ))}
                            </span>
                        </li>
                        <li>
                            <h6 class="text-white">Tipo</h6>
                            <span>${ pokemon.types.map(elem =>(
                                (elem.type.name)
                               ))}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
               
            </div>
            </div>
        </div>
    </div>
    `
    
    

    if(ultima){
        observador.unobserve(ultima);
    }

    const ultimaCard = document.querySelectorAll("#pokedex #card-podex")
    ultima = ultimaCard[ultimaCard.length -1]
    observador.observe(ultima)
}




function listo(){
    
     traerCantPokemon(cant)
    
    
}


