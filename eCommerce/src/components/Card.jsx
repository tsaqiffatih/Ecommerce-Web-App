import React from "react";
import { LocalRequest } from "../utils/axios";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

function CardComponent({ item, fetchData }) {

    const HandleDelete = async () => {
        const isConfirmed = await Swal.fire({
            title: `Apakah Anda yakin ingin menghapus item "${item.title}"?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        });

        if (isConfirmed.value) {
            try {
                await LocalRequest({
                    method: 'delete',
                    url: `/groceries/${item.id}`,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`
                    }
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: `Item ${item.title} berhasil dihapus.`,
                    timer: 2000,
                    timerProgressBar: true
                });

                fetchData()
            } catch (error) {
                console.log(error);

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message
                });
            }
        } else {
            console.log("gak jadi");
        }
    }


    return (

        <div className="card" style={{ width: "12rem", margin: '10px', border: '1px solid black', display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
                <img src={item.imageUrl} className="card-img-top" alt="imageUrl" style={{ width: "100%", height: "10rem", objectFit: "cover" }} />
            </div>
            <div className="card-body" style={{ display: "grid", gridTemplateRows: "auto auto auto" }}>
                <h5 className="card-title" style={{ marginBottom: 0 }}>
                    {item.title}
                </h5>
            </div>
            <div className="card-body" style={{ display: "grid", gridTemplateRows: "auto auto auto" }}>
                <p className="card-text" style={{ marginTop: 0 }}>
                    Rp.{item.price}
                </p>
            </div>
            <div className="d-flex justify-content-center" style={{ margin: '5px' }}>
                <button onClick={HandleDelete} href="#" className="btn btn-dark me-2" style={{ width: '50%' }}>
                    Delete
                </button>
                <Link to={`/update-grocery/${item.id}`} className="btn btn-dark" style={{ width: '50%' }}>
                    Edit
                </Link>
                {/* <link></link> */}
            </div>
        </div>
    )
}

export default CardComponent;