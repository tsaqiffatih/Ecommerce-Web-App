import { useEffect, useState } from "react";
import FormItemComponent from "../../components/FormItem";
import Swal from "sweetalert2";
import { LocalRequest } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

// title = nambah
// price = 20000
// imageUrl = https://www.highmowingseeds.com/media/catalog/product/cache/47e325b677851f562e223168f21f4516/7/0/7096.jpg
// tag = flowers

function AddItem() {
    const [input, setInput] = useState({
        title: '',
        price: '',
        tag: '',
        imageUrl: ''
    })

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault()

        const isConfirmed = await Swal.fire({
            title: `Apakah anda yakin akan menambahkan data ini?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'TIDAK'
        })

        if (isConfirmed.value) {
            try {
                await LocalRequest({
                    method: 'post',
                    url: '/groceries',
                    data: input,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                })

                Swal.fire({
                    icon: 'success',
                    title: 'Sukses',
                    text: 'Data berhasil ditambahkan.',
                    timer: 2000
                });

                navigate("/")
                console.log("berhasil");

            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'oops...',
                    text: error.response.data.message
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

export default AddItem;