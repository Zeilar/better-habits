import { Button, Grid, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { useCSR } from "../../hooks";
import { apiService } from "../../services";

export default function SingleProgram() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, success, error } = useCSR<Program<true>>(
        `/programs/${id}`
    );
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    console.log(data);

    async function destroy() {
        if (!data || !id || error) {
            return;
        }
        setSubmitting(true);
        const response = await apiService.request(`/programs/${id}`, {
            method: "DELETE",
        });
        setSubmitting(false);
        if (response.ok) {
            navigate("/programs");
        }
    }

    if (loading) {
        return null;
    }

    return (
        <>
            <PageWrapper>
                <Text>{data.name}</Text>
                <Grid
                    boxShadow="elevate.top"
                    bgColor="gray.600"
                    gridTemplateColumns="repeat(2, 1fr)"
                    pos="sticky"
                    bottom="var(--chakra-sizes-navbarHeight)"
                    mt="auto"
                    gridGap={4}
                    p={4}
                >
                    <Button>Save</Button>
                    <Button variant="danger" onClick={destroy}>
                        Delete
                    </Button>
                </Grid>
            </PageWrapper>
        </>
    );
}
