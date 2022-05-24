import React, {useState} from 'react'

export const useForm = (initialForm, validateForm) => {
  
    const [form, setForm] = useState(initialForm)
    const [error, setError] = useState({})
    const [errorSend, setErrorSend] = useState({msg:""})
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleBlur = (e)=>{
        e.stopPropagation()
        handleChange(e)
        setError(validateForm(form))
        setErrorSend({msg:""})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(Object.keys(error).length !== 0){
            setErrorSend({
                msg:"Checks error"
            })
        }
        else{
            let EnvioFormu = "Aca ejecutamos funcion de envio de formulario, usamos response y loading"
        }
    }

    return {
        form,
        error,
        loading,
        response,
        errorSend,
        handleChange,
        handleBlur,
        handleSubmit
    }
}