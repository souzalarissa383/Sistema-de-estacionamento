
import React,{useState,useRef} from 'react'
//import { useForm } from "react-hook-form";

 
function Form() {
        //armazena as variaveis
        const [carro , setCarro ] = useState({
            nome:'',
            placa: '',
            dataEntrada: ''
        })
        
        const placaRef = useRef(null)
        const nomeRef = useRef(null)

        const [listaCarro, setListaCarro] = useState([])

        // verifica se esta preenchido 
       
        
        //const [temErro, formState: {errors}] = useForm();
        
        const [statusErro, setStatusErro] = useState({
            temErro: false,
            mensagem: ''
        })


        //metodo para manipular botao
        const handleSubmit = (e) =>{
            e.preventDefault()
            // setTemErro(validate(carro))
            
            
           
           

            // verificar se campo esta preenchido
           
        if ( !carro.nome) {
             setStatusErro({
                temErro: true ,
                mensagem: 'O nome do carro nao esta preenchido'
             })
              return
            }

          if (!carro.placa ) {
          setStatusErro({
            temErro: true,
            mensagem: 'O nome da placa nao esta preenchido!!'
          })
              return
        }
           
            
            
          

           
            
            //buscar carros repetidos
            const carroEncontrado = listaCarro.find( car => 
                
                 carro.placa === car.placa
       
            )
            if(!carroEncontrado){
                formatDate(new Date())
                setListaCarro(prevState => ([...prevState, {nome: carro.nome, placa: carro.placa, dataEntrada: formatDate(new Date())}]))
                setCarro( 
                    {
                        nome:'',
                        placa: '',
                        dataEntrada: ''})
                        nomeRef.current.value = ''
                        placaRef.current.value = ''
                        setStatusErro ({
                            temErro: false ,
                            mensagem: 'O nome do carro nao esta preenchido'
                        }) 
                        return
                        
            } 
            setStatusErro ({
                temErro: true,
                mensagem: 'Já existe um carro com esta placa!!'
            })
            
        }
        const formatDate = (date) => {
            return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}H`

            
            
        }


        //metodo para armazenar evento no input 
        //armazena dados do form
        const handleInputChange = (e) =>{
          
            // setTemErro({...carro, [e.target.name] : e.target.value
            
            // })
            //Receber os dados do formulário
           // const valueInput = e => setCarro({ ...carro, [e.target.carro]: e.target.value })

            

            if (e.target.name === 'name' ){
               setCarro(prevState => ({...prevState, nome: e.target.value}) )
               
            }
            if (e.target.name === 'placa'){
                setCarro(prevState => ({...prevState, placa: e.target.value}) )
               
            }
            
          
        }
        // const validate(temErro) {
        //     const temErro = {}
        //     if (!carro.nome || carro.placa) {
        //         temErro.carro = "Nao preenchido!!"
        //     }
        //     return temErro
        // }
        return(
            <section>
                <form onSubmit={handleSubmit}  >
                    <label>
                      {statusErro.temErro && (<p className="error-input">{statusErro.mensagem}</p>)}
                        Nome:
                        <input onChange={handleInputChange} className='input' ref={nomeRef} type="text" name="name"  placeholder="Digital o nome do Veiculo: "/>
                        Placa:
                        <input onChange={handleInputChange} className='input' ref={placaRef} type="text" name="placa"    placeholder="Digite o número da Placa: "/>
                    </label>
                    <button type="submit" className='button' value="Cadastrar">Cadastrar</button>
                    
                </form>
                <table className='tabela' >

                <tr>
                    <th>Nome do carro </th>
                    <th>Placa </th>
                    <th>Data de Entrada </th>
                </tr> 
                

                  {listaCarro?.map((carro,index)=> (
                    <tr>
                      <td key={`nome-${index}`}>{carro.nome}</td>
                        <td key={`placa-${index}`}>{carro.placa}</td>
                        <td key={`data-${index}`}>{carro.dataEntrada}</td>
                    </tr>
                      
                    ))} 
                </table>

            </section>
        )
    }


export default Form