import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../../../axios/axios";
import AgendamentoInput from "../create";

export default function AtendimentoEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({ data: {}, loading: true });
  useEffect(() => {
    http.get(`atendimento/${id}`).then((res) => {
      setData({ data: res.data, loading: false });
    });
  }, [id]);
  return <AgendamentoInput data={data.data} loading={data.loading} />;
}
