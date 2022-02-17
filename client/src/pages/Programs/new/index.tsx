import { Button, Grid, Link, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Program } from "../../../../@types/program";
import PageWrapper from "../../../components/PageWrapper";
import ProgramForm, { Fields } from "../../../components/ProgramForm";
import { useToast } from "../../../hooks";
import { apiService } from "../../../services";

export default function NewProgram() {
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    async function create({ exercises, ...program }: Fields) {
        setSubmitting(true);
        const response = await apiService.request<Program<true>>("/programs", {
            method: "POST",
            data: { exercises, program },
        });
        setSubmitting(false);
        if (response.ok) {
            toast({ description: "Created program", status: "success" });
            navigate(`/program/${response.data.id}`);
        } else {
            toast({ description: "Error creating program", status: "error" });
        }
    }

    return (
        <PageWrapper>
            <ProgramForm
                onSubmit={create}
                submitting={submitting}
                controls={
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        boxShadow="elevate.top"
                        bgColor="gray.700"
                        pos="sticky"
                        bottom="var(--chakra-sizes-navbarHeight)"
                        mt="auto"
                        p={4}
                        gridGap={4}
                    >
                        <Button type="submit">Create</Button>
                        <Link as={ReactLink} to="/programs" display="flex">
                            <Text m="auto">Cancel</Text>
                        </Link>
                    </Grid>
                }
            />
        </PageWrapper>
    );
}
