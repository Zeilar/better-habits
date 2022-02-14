import { useParams } from "react-router-dom";
import { Program } from "../../../@types/program";
import ProgramForm from "../../components/ProgramForm";
import { useCSR } from "../../hooks";

export default function SingleProgram() {
    const { id } = useParams<{ id: string }>();
    const { data, loading } = useCSR<Program<true>>(`/programs/${id}`);
    if (loading) {
        return <h1>Not yet</h1>;
    }
    return (
        <div>
            <ProgramForm program={data} />
        </div>
    );
}
