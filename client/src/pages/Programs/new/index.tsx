import { Button, Grid, Link, Text } from "@chakra-ui/react";
import { useTitle } from "@zeilar/hooks";
import { useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { ArrowLeftShort } from "@styled-icons/bootstrap/ArrowLeftShort";
import { Program } from "../../../../@types/program";
import Icon from "../../../components/Icon";
import PageBanner from "../../../components/PageBanner";
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
            <PageBanner mb={4}>
                <Link as={ReactLink} to="/programs" mr={4}>
                    <Icon icon={ArrowLeftShort} size={8} />
                </Link>
                <Text textStyle="h3" as="h3">
                    Create program
                </Text>
            </PageBanner>
            <ProgramForm
                onSubmit={create}
                submitting={submitting}
                controls={
                    <Grid
                        gridTemplateColumns="repeat(2, 1fr)"
                        boxShadow="elevate.top"
                        bgColor="gray.600"
                        p={4}
                        gridGap={4}
                        h="controlsHeight"
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
