import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Program } from "../../../../@types/program";
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
        <div>
            <ProgramForm
                onSubmit={create}
                submitting={submitting}
                controls={
                    <Box
                        boxShadow="elevate.top"
                        bgColor="gray.600"
                        pos="sticky"
                        bottom="var(--chakra-sizes-navbarHeight)"
                        mt="auto"
                        p={4}
                    >
                        <Button type="submit" w="100%">
                            Create
                        </Button>
                    </Box>
                }
            />
            ;
        </div>
    );
}
