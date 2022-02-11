import BaseLayout from "../../Components/Layout/BaseLayout";
import ListWithSearch from "../../Components/Lists/ListWithSearch";

export default function ServicosPage(){
    return (
        <BaseLayout title='Serviços'>
            <ListWithSearch path="servico"></ListWithSearch>
        </BaseLayout>
    )
}