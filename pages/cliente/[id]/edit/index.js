import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import http from "../../../../axios/axios";
import ClienteInput from "../../create";

export default function ClienteEdit() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({ data: {}, loading: true });
  useEffect(() => {
    http.get(`cliente/${id}`).then((res) => {
      setData({ data: res.data, loading: false });
    });
  }, []);
  return (
    <ClienteInput key="cliente input" data={data.data} loading={data.loading} />
  );
}
