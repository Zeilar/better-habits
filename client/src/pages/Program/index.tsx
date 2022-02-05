import { useParams } from "react-router-dom";
import { Program } from "../../../@types/program";
import Navbar from "../../components/Navbar";
import PageWrapper from "../../components/PageWrapper";
import { useCSR } from "../../hooks";

export default function SingleProgram() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, success } = useCSR<Program<true>>(`/programs/${id}`);

    console.log(data);

    return (
        <PageWrapper>
            <Navbar />
        </PageWrapper>
    );
}
