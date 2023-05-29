import React, { useState } from 'react'

const useForm = ({form, additionalData, endpointUrl}) => {

    const [status, setStatus] = useState("");
    const [smessage, setMessage] = useState("");

    const handleSubmit = (e) => {
        if(form) {
            e.preventDefault();
            setStatus("loading");
            setMessage("");

            // const data = Array.from(form.elements).filter((input) => input.name).reduce(
            //         (obj, input) => Object.assign(obj, { [input.name]: input.value }),
            //         {}
            //     )


            const data = Array.from(form.elements).filter((input) => {
                if(input['required']) {
                    if(input.value === '') {
                        setMessage("Invalid" + input.name)
                    } else {
                        Object.assign(input, { [input.name]: input.value })
                    }
                }
            })


                console.log({data})
                    
            
            fetch("http://localhost/api/newsAPI/api/addCategory.php", {
                method: "POST",
                body: JSON.stringify(data)
            }).then((response) => {
                console.log({response})
            })
        }
    }

  return ( { handleSubmit, status, smessage } )
}

export default useForm
