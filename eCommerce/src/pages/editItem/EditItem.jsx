import { useNavigate, useParams } from "react-router-dom";
import FormItemComponent from "../../components/FormItem";
import { useEffect, useState } from "react";
import { LocalRequest } from "../../utils/axios";
import Swal from "sweetalert2";



function EditItem() {

    const [input, setInput] = useState({
        title: '',
        price: '',
        tag: '',
        imageUrl: ''
    })
    const { id } = useParams()

    const fetchData = async () => {
        try {
            const { data } = await LocalRequest({
                method: 'put',
                url: `/groceries/${id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            console.log(data, "di tryCatch");
            setInput(data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault()

        const isConfirmed = await Swal.fire({
            title: 'Apakah Anda yakin akan melakukan perubahan data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        })

        if (isConfirmed.value) {
            try {
                await LocalRequest({
                    method: 'put',
                    url: `/groceries/${id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    },
                    data: input
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                    text: 'Data berhasil di update',
                    timer: 2000
                })

                navigate('/')
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message,
                })
            }
        } else {
            console.log('gak jadi');
        }
    }

    return (
        <>
            <FormItemComponent
                input={input}
                handleInput={handleInput}
                handleForm={handleForm}
            />
        </>
    )
}

export default EditItem;