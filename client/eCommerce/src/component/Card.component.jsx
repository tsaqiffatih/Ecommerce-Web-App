
"use client";
import { Card } from "flowbite-react";
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


function CardComponent({ item }) {
    const navigate = useNavigate()

    const handleMidtrans = async (totalAmount) => {
        try {
            if (!localStorage.getItem('access_token')) {
                Swal.fire({
                    icon: 'info',
                    title: 'Warning',
                    text: `You haven't registered yet`
                }).then(() => {
                    navigate('/login')
                })
            }
            // console.log(localStorage.getItem('access_token'));
            const { data } = await axios({
                method: "POST",
                url: 'http://localhost:3000/orders/create',
                data: { totalAmount },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            window.snap.pay(data.token, {
                onSuccess: async function (result) {
                    try {
                        const orderId = item.id;
                        const { data } = await axios.post(`http://localhost:3000/orders/update-status`, { order_id: orderId });
                        await Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Your status transaction Updated'
                        });
                    } catch (error) {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to update order status'
                        });
                    }
                },
                onPending: async function (result) {
                    const orderId = item.id
                    const confirmCancel = await Swal.fire({
                        icon: 'warning',
                        title: 'Cancel Order?',
                        text: 'Are you sure you want to cancel your order?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, cancel order',
                        cancelButtonText: 'No, continue with payment'
                    });
                    if (confirmCancel.isConfirmed) {
                        try {
                            // await axios.delete(`http://localhost:3000/orders/destroy/${orderId}`);
                            await axios({
                                method: 'delete',
                                url: `http://localhost:3000/orders/destroy/${orderId}`,
                                headers:{
                                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                                }
                            })
                            Swal.fire({
                                icon: 'info',
                                title: 'Order Canceled',
                                text: 'Your order has been canceled successfully'
                            });
                        } catch (error) {
                            console.log(error);
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Failed to cancel order'
                            });
                        }
                    }
                },
                onClose: async function (result) {
                    const orderId = item.id
                    const confirmCancel = await Swal.fire({
                        icon: 'warning',
                        title: 'Cancel Order?',
                        text: 'Are you sure you want to cancel your order?',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, cancel order',
                        cancelButtonText: 'No, continue with payment'
                    });

                }
            });
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: error.response.data.message
            })
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