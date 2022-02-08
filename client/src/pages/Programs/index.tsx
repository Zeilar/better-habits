import { Link, Grid, Text, Skeleton, Box } from "@chakra-ui/react";
import { useCSR } from "../../hooks";
import { Program } from "../../../@types/program";
import PageWrapper from "../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import Icon from "../../components/Icon";

export default function Programs() {
    const { data, success, loading } = useCSR<Program[]>("/programs");

    return (
        <PageWrapper>
            <Text textStyle="h1" py={4} px={8} color="primary.400" as="h1">
                Programs
            </Text>
            {loading && (
                <Grid p={4} gridGap={2}>
                    {Array(5)
                        .fill(null)
                        .map((_, i) => (
                            <Skeleton height="3.5rem" key={i} />
                        ))}
                </Grid>
            )}
            <Grid p={4} gridGap={2}>
                {success &&
                    data.map(program => (
                        <Link
                            transition="none"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            as={ReactLink}
                            key={program.id}
                            bgColor="gray.600"
                            p={4}
                            rounded="md"
                            to={`/program/${program.id}`}
                            _hover={{
                                bgColor: "gray.400",
                                "> svg": {
                                    opacity: 1,
                                    transform: "translateX(0)",
                                },
                            }}
                        >
                            <Text>{program.name}</Text>
                            <Icon
                                transform="translateX(-0.25rem)"
                                transition="transform 0.25s"
                                icon="mdiArrowRight"
                                size="1.5rem"
                                opacity={0}
                            />
                        </Link>
                    ))}
            </Grid>
            <Box
                as={ReactLink}
                bottom="calc(var(--chakra-sizes-navbarHeight) + 2rem)"
                pos="fixed"
                transform="translateX(-50%)"
                left="50%"
                rounded="full"
                bgColor="primary.400"
                to="/programs/new"
                p={1}
            >
                <Icon icon="mdiPlus" w="2rem" h="2rem" color="black" />
            </Box>
        </PageWrapper>
    );
}
