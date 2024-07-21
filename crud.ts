import axios, { AxiosResponse } from "axios"
const baseUrl = `${process.env.NEXT_BASE_API_URL ? process.env.NEXT_BASE_API_URL : 'http://localhost:4000'}` 


const get = async (route: string, params?: object) => {

    const response: AxiosResponse = await axios.get(`${baseUrl}/${route}`, params ? params : {}).catch((response)=>{
        return response
    })
    console.log(response);
    
    return response.data

}

const insert = async (route: string, object: object) => {
    const response: AxiosResponse = await axios.post(`${baseUrl}/${route}`, object).catch((response)=>{
        return response
    })
    return response.status
}

const update = async (route: string, object: object, id: string) => {
    const response: AxiosResponse = await axios.post(`${baseUrl}/${route}/${id}`, object).catch((response)=>{
        return response
    })
    return response.data
}

const remove =  async (route: string, id: string) => {
    const response: AxiosResponse = await axios.post(`${baseUrl}/${route}/${id}`).catch((response)=>{
        return response
    })
    return response.status
}

export  {
    get,
    insert,
    update,
    remove
}