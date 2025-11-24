import { useEffect,useState } from "react"
import { getStatus } from "../service/Status"
import ListStatus from "../components/Status/list"
const Status=()=>{
    const [listStatus,setListStatus]=useState([])
     useEffect(() => {
            const fetchData = async () => {
                try {
                    const profeciones = await getStatus();
                    setListStatus(profeciones);
    
                    
                } catch (error) {
                    console.error("Error al obtener datos:", error);
                }
            };
    
            fetchData();
        }, []);
    return(
        <div>
            <ListStatus listStatus={listStatus} setListStatus={setListStatus}/>
        </div>
    )
}

export default Status;