export const getAll=(setCont)=> {
    fetch('http://templateapiort.azurewebsites.net/api/persona/')
    .then(resp => resp.json())
    .then(respJson => setCont(respJson))
    .catch(err=> console.log("Error:" , err))
}