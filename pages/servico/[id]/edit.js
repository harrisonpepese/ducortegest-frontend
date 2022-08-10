import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../../../axios/axios";
import ServicoInput from "../create/index";

export default function FuncionarioEdit() {
  const router = useRouter();
  const [data, setData] = useState({ data: {}, loading: true });
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      http
        .get(`servico/${id}`)
        .then((res) => setData({ data: res.data, loading: false }))
        .catch((error) => toast("Não foi possivel carregar"));
    }
  }, [id]);
  return <ServicoInput data={data.data} loading={data.loading} />;
}
