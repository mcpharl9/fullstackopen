import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll= () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const update = newPerson => {
    return axios.put(baseUrl+'/'+(newPerson.id), {"name": newPerson.name, "number": newPerson.number})
}

const deleteRec = id => {
    return axios.delete(baseUrl+'/'+(id))
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    deleteRec: deleteRec
}