import CardComponent from "../../components/Card";
import { useEffect, useState } from 'react'
import { LocalRequest } from "../../utils/axios";


function HomePage() {

    const [item, setItem] = useState([])

    const fetchData = async () => {

        try {
            const { data } = await LocalRequest({
                method: 'get',
                url: '/groceries',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })

            // console.log(data);
            setItem(data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div className="d-flex flex-wrap justify-content-around">
                {item &&
                    item.map((item) => {
                        return <CardComponent
                            key={item.id} item={item} fetchData={fetchData}
                        />
                    })}
            </div>
        </>
    )
}

export default HomePage;