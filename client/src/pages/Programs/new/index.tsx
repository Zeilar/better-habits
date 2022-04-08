import { Button, Grid, Link, Text } from "@chakra-ui/react";
import { useTitle } from "@zeilar/hooks";
import { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { Program } from "../../../../@types/program";
import PageWrapper from "../../../components/PageWrapper";
import ProgramForm, { Fields } from "../../../components/ProgramForm";
import { useToast } from "../../../hooks";
import { apiService } from "../../../services";
import { BRAND_NAME } from "../../../utils/constants";

export default function NewProgram() {
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    useTitle(`Create program | ${BRAND_NAME}`);

    async function create({ exercises, ...program }: Fields) {
        setSubmitting(true);
        const response = await apiService.request<Program>("/programs", {
            method: "POST",
            data: { exercises, program },
        });
        setSubmitting(false);
        if (response.ok) {
            toast({ title: "Created program", status: "success" });
            navigate(`/program/${response.data.id}`);
        } else {
            toast({ title: "Error creating program", status: "error" });
        }
    }

    return (
        <PageWrapper noScroll>
            <Text textStyle="pageTitle" p={4}>
                Create program
            </Text>
            <ProgramForm
                onSubmit={create}
                submitting={submitting}
                controls={
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        boxShadow="elevate.top"
                        bgColor="gray.800"
                        p={4}
                        gridGap={4}
                        h="controlsHeight"
                    >
                        <Button type="submit">Create</Button>
                        <Link as={ReactLink} to="/programs" display="flex" w="100%">
                            <Text m="auto" color="text.default.main">
                                Cancel
                            </Text>
                        </Link>
                    </Grid>
                }
            />
        </PageWrapper>
    );
}
