export async function searchPokemon (pokemon){

    const pokeFounded = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(res=>{
        if(res.ok){
           const result = res.json().then(responseJson => {
            return responseJson
           })
           return result
        }else{
            return "erro"
        }
    })
    return pokeFounded
}

export async function get20Pokemons (){

    const pokesFounded = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`).then(res=>{
        if(res.ok){
           const result = res.json().then(responseJson => {
            return responseJson
           })
           return result
        }else{
            return "erro"
        }
    })
    return pokesFounded
}

export async function pokeInfo (url){

    const pokeFounded = await fetch(`${url}`).then(res=>{
        if(res.ok){
           const result = res.json().then(responseJson => {
            return responseJson
           })
           return result
        }else{
            return "erro"
        }
    })
    return pokeFounded
}