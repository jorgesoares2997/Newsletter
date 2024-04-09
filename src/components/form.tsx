import { User } from "../types/User"
import { useState,FormEvent } from "react"
import { validate } from "../utils/validate";
import emailjs from '@emailjs/browser';

const form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState<User|null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrors(null);

    const templateParams = {
      from_name: name,
      email: email,      
    }
    if (agree === true){
      emailjs.send("service_gwctcy4", "template_vfuzt3f", templateParams, "Da8SFaIxNe3yq2uoM")
      .then((response) =>{
        
        console.log("Email enviado", response.status, response.text)
      }, (err) => {
        console.log("ERRO: ", err)
      } )
    }
   
    const data: User = {
      name,
      email,
      agree,
    };

    const validateErrors = validate(data);

    if (Object.keys(validateErrors).length > 0){
      setErrors(validateErrors)
      return;
    }

    setName("")
    setEmail("")
    setAgree(false)
    alert("Obrigado por se inscrever!");
  }
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-sm" htmlFor="name">Nome</label>
        < input 
          value = {name} 
          onChange={(e) => setName(e.target.value)} 
          className="rounded-lg py-2 py-2 text-sm placeholder:text-sm placeholder:text-stone-400 text-center" 
          type="text" 
          placeholder="Digite o seu nome" />
          {errors?.name && (
            <small className="text-xs text-red-500 mt-1">{errors?.name}</small>
          )}
      </div>
       <div className="flex flex-col">
       <label className="text-sm" htmlFor="email">Email</label>
       < input 
          value = {email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="rounded-lg py-2 py-2 text-sm placeholder:text-sm placeholder:text-stone-400 text-center" 
          type="email" 
          placeholder="Insira o seu melhor e-mail" />
           {errors?.email && (
            <small className="text-xs text-red-500 mt-1">{errors?.email}</small>
          )}
         </div>
      <div className="flex flex-col"> 
        <a href="https://github.com/jorgesoares2997" className="text-xs underline mb-2">Leia os termos</a>
        <div className="flex gap-2 items-center">
          < input 
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            type="checkbox" /> 
             
          <label className="text-sm" htmlFor="agree">Concordo com os termos</label>
       </div>
       {errors?.agree && (
            <small className="text-xs text-red-500 mt-1">{errors?.agree}</small>
          )}
      </div>
      <button type="submit" className="bg-slate-600 hover:bg-slate-500 font-medium text-sm py-2 px-4 rounded-lg text-white">Cadastrar</button>
    </form>
  )
}

export default form
