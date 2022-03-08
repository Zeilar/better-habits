import { Button, Grid } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import ProgramForm, { Fields } from "../../components/ProgramForm";
import { useCSR, useToast } from "../../hooks";
import { apiService } from "../../services";

export default function SingleProgram() {
    const { id } = useParams<{ id: string }>();
    const { data, loading } = useCSR<Program<true>>(`/programs/${id}`);
    const [submitting, setSubmitting] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    if (loading) {
        return <h1>Not yet</h1>;
    }

    async function edit({ exercises, ...program }: Fields) {
        setSubmitting(true);
        const response = await apiService.request(`/programs/${id}`, { method: "PUT", data: { exercises, program } });
        setSubmitting(false);
        if (response.ok) {
            toast({ description: "Saved program", status: "success" });
        } else {
            toast({ description: "Error saving program", status: "error" });
        }
    }

    async function destroy() {
        setSubmitting(true);
        const response = await apiService.request(`/programs/${id}`, { method: "DELETE" });
        setSubmitting(false);
        if (response.ok) {
            toast({ description: "Deleted program", status: "success" });
            navigate("/programs");
        } else {
            toast({ description: "Error deleting program", status: "error" });
        }
    }

    return (
        <PageWrapper noScroll>
            <ProgramForm
                program={data}
                onSubmit={edit}
                submitting={submitting}
                controls={
                    <Grid
                        boxShadow="elevate.top"
                        bgColor="gray.700"
                        gridTemplateColumns="repeat(2, 1fr)"
                        h="controlsHeight"
                        gridGap={4}
                        p={4}
                        zIndex={20}
                    >
                        <Button type="submit">Save</Button>
                        <Button variant="danger" onClick={destroy} type="button">
                            Delete
                        </Button>
                    </Grid>
                }
            />
        </PageWrapper>
    );
}
