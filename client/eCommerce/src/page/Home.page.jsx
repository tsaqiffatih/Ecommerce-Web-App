import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../component/Card.component";
import LocalRequest from "../utils/axios";
import axios from "axios";
import { fetchData } from "../store/homeSlice";


function HomePage() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.home.data);


    useEffect(() => {
        dispatch(fetchData(dispatch));
    }, [dispatch]);

    return (
        <>
            <div className="flex flex-wrap justify-around">
                {data &&
                    data.map((item) => {
                        return <CardComponent key={item.id} item={item} />;
                    })}
            </div>
        </>
    );
}

export default HomePage;