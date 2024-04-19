import { useEffect, useState } from "react";
import CardComponent from "../component/Card.component";
import LocalRequest from "../utils/axios";
import axios from "axios";



function HomePage() {
    const [items, setItems] = useState(null)

    const fetchData = async () => {
        try {
            const {data} = await axios({
                method: 'get',
                url: 'http://localhost:3000/products/getAll'
            })

            setItems(data)
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    // console.log(items, '<<<<<')
    return (
        <>
            <div className="flex flex-wrap justify-around">
                {items &&
                    items.map((item) => {
                        return <CardComponent
                            key={item.id}
                            item={item}
                        />
                    })
                }
            </div>
        </>
    )
}

export default HomePage;