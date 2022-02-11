import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from '../../../src/axios'
import FuncionarioInput from '../create/index'

export default function FuncionarioEdit(){
    const router = useRouter()
    const [data,setData] = useState({})
    const { id } = router.query;
    useEffect(()=>{
        if(id){
            http.get(`funcionario/${id}`)
            .then((res)=>setData(res.data))
        }
    },[id])
    return <FuncionarioInput data={data} />
}