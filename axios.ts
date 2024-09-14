import axios from 'axios'

const baseURL = `${process.env.NEXT_BASE_API_URL ? process.env.NEXT_BASE_API_URL : 'http://localhost:4000'}` 


const axiosInstance = axios.create({
    baseURL, 
    withCredentials: true, 
});



axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 401) {
                alert(
                    "Sessão expirada. Redirecionando para a página de login."
                );
                window.location.href = "/";
            } else {
                console.error(
                    "Erro HTTP:",
                    error.response.status,
                    error.response.data
                );
                alert(`Ocorreu um erro: ${error.response.status}`);
            }
        } else {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro de rede. Por favor, tente novamente.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
