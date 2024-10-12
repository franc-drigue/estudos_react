import { useState, useEffect } from "react";




// 4 - Custom hook
export const useFetch = (url) => {

    const [data, setData] = useState(null);

    // 5 - Refatorando Post
    const [config, setConfig] = useState(null);
    const [method, setMethod] = useState(null);
    const [callFetch, setCallFetch] = useState(false);

    // 6 - Estado de Loading
    const [loading, setLoading] = useState(false);

    // 7 - Tratamento de erros
    const [error, setError] = useState(null);

    // 8 - Request DELETE
    const [urlDelete, setUrlDelete] = useState(null);

    const httpConfig = (data, method) => {

        if(method === "POST"){
            setConfig({
                method,
                headers: {
                    "Content-type" : "application/json"
                },
                body:JSON.stringify(data)
            })

            setMethod(method);

        } else if (method === "DELETE") {
            setConfig({
                method,
                headers: {
                    "Content-type" : "application/json"
                },
            })
            setUrlDelete(`${url}/${data}`);
            setMethod(method);
        } 
    }

    // pegando os dados
    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);
           
            try{

               const res = await fetch(url);

               const json = await res.json();

               setData(json);

            }catch(error){

                setError("Erro ao carregar os dados.");

            }

            setLoading(false);

        }

    fetchData();

    }, [url, callFetch]);

    // essa parte vai fazer a requisição de POST 
    // Também vai fazer a requisição de DELETE
    useEffect(()=> {

        const httpRequest = async () => {
            
           if(method === "POST"){

              let fetchOpition = [url, config];

              const res = await fetch(...fetchOpition);

              setCallFetch(res);

           } else if (method === "DELETE") {

              let fetchOpition = [urlDelete, config];

              const res = await fetch(...fetchOpition);

              setCallFetch(res);
           }
        }

        httpRequest();

    },[url, method, config, urlDelete])


    return { data, httpConfig, loading, error}
}