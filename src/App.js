import './App.css';
import { useState } from 'react';
import { useFetch } from './hooks/useFetch';

const url = "http://localhost:3000/product";

function App() {

  //const [products, setProducts] = useState([]);

    
  // 4 - Resgatando dados com Custom hook
  const { data: items, httpConfig, loading, error} = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");


  // 1- Resgatando dados
  /*useEffect(() => {
   
    async function fetchData(){
      try {
        const res = await fetch(url);

        if(!res.ok){
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setProducts(data);

      }catch (error){
        console.log("Error ao buscar os produtos:",  error);
      }
    }
    
    fetchData();
  }, []);*/

  const product = {
    name,
    price,
  }


  // 2 - adição de produtos
  const handleSubmit = async (e) => {
     e.preventDefault();

     //const res = await fetch(url, {
     // method: "POST",
      //headers: {
       // "Content-Type": "application/json"
     // },
      //body: JSON.stringify(product)
    // });

        // 3 - Carregamento dinâmico
        //const addProduct = await res.json();

        //setProducts((prevProducts) => [...prevProducts, addProduct]);
      

    //método vindo do custom hook useFetch
     httpConfig(product, "POST")
     setName("");
     setPrice("");
  }

  
  const http_delete = async (id) => {
    httpConfig(id , "DELETE");
  }

  return (
    <div className="App">
       <h1>Lista de Produtos</h1>
       {/*6 - Estado de loading*/}
       {loading && <p>carregando os dados...</p>}
       {/*7 - Tratamento de erro */}
       {error && <p>{error}</p>}
       {!error && <ul>
        {items && items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} <button onClick={() => http_delete(item.id)}>Deletar</button>
          </li>
        ))}
       </ul>}

       <div className="add-product">
         <form onSubmit={handleSubmit}>

           <label>
              Nome:
              <input 
                type="text"
                value={name}
                name= "name"
                onChange={(e) => setName(e.target.value)}
                />
           </label>
           <label>
              Preço:
              <input 
                type="number"
                value={price}
                name= "price"
                onChange={(e) => setPrice(e.target.value)}
                />
           </label>

           {loading && <input type="submit" disabled value="aguarde"/>}
           {!loading && <input type="submit" value="criar"/>}
         </form>
       </div>
    </div>
  );
}

export default App;
