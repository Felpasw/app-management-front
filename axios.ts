import axios from 'axios'

const baseURL = `http://localhost:4000` 


const axiosInstance = axios.create({
    baseURL, 
});



axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 401) { 
                window.location.href = "/";
            } 
        } else {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro de rede. Por favor, tente novamente.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
