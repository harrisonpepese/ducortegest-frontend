import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../../../axios/axios";
import FuncionarioInput from "../create/index";

export default function FuncionarioEdit() {
  const router = useRouter();
  const [data, setData] = useState({ data: {}, loading: true });
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      http
        .get(`funcionario/${id}`)
        .then((res) => setData({ data: res.data, loading: false }));
    }
  }, [id]);
  return <FuncionarioInput data={data.data} loading={data.loading} />;
}
