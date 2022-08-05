import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../../../axios/axios";
import ServicoInput from "../create/index";

export default function FuncionarioEdit() {
  const router = useRouter();
  const [data, setData] = useState({});
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      http
        .get(`servico/${id}`)
        .then((res) => setData(res.data))
        .catch((error) => toast("Não foi possivel carregar"));
    }
  }, [id]);
  return <ServicoInput data={data} />;
}
