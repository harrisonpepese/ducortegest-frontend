import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../../../axios/axios";
import AgendamentoInput from "../create";

export default function AtendimentoEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  useEffect(() => {
    http.get(`atendimento/${id}`).then((res) => {
      setData(res.data);
    });
  }, [id]);
  return <AgendamentoInput data={data} />;
}
