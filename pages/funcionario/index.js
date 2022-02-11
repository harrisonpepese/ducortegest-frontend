import BaseLayout from "../../Components/Layout/BaseLayout"
import ListWithSearch from "../../Components/Lists/ListWithSearch"

export default function FuncionarioPage(){
    return(
        <BaseLayout title="Funcionários">
            <ListWithSearch path={'funcionario'}></ListWithSearch>
        </BaseLayout>
    )
}