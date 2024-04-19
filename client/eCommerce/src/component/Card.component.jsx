
"use client";
import { Card } from "flowbite-react";
import axios from "axios";
import Swal from 'sweetalert2'


function CardComponent({ item }) {


    const handleMidtrans = async (totalAmount) => {
        try {
            const { data } = await axios({
                method: "POST",
                url: 'http://localhost:3000/orders/create',
                data: { totalAmount },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // console.log(data.token)

            // Panggil window.snap.pay setelah permintaan berhasil
            window.snap.pay(data.token, {
                onSuccess: async function (result) {
                            await Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Your status transaction Updated'
    
                            })

                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Card
            className="max-w-xs m-1 top"
            imgAlt="gambar"
            imgSrc={item.imageUrl}

        >
            <div className="mb-5 mt-2.5 flex items-center">

                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                    </h5>
                </a>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">Rp.{item.price}</span>
                <button
                    href="#"
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                    onClick={() => { handleMidtrans(item.price) }}
                >
                    Buy
                </button>
            </div>
        </Card>
    );
}

export default CardComponent;