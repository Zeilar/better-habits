import { Button, Grid, Text } from "@chakra-ui/react";
import PageBanner from "../../components/PageBanner";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks";

export default function Settings() {
    const { logout } = useAuth();

    return (
        <PageWrapper>
            <PageBanner zIndex={10} h={16}>
                <Text textStyle="h3" as="h3">
                    Settings
                </Text>
            </PageBanner>
            <Grid
                bgColor="gray.700"
                h="calc(100vh - var(--chakra-sizes-navbarHeight) - 4rem)"
                overflowY="auto"
                gridTemplateRows="repeat(1, 4rem)"
            >
                <Button
                    textAlign="left"
                    variant="unstyled"
                    borderBottom="1px solid"
                    borderBottomColor="border.default"
                    borderRadius={0}
                    paddingInline={4}
                    _hover={{ bgColor: "gray.600" }}
                    h="auto"
                    onClick={logout}
                >
                    Logout
                </Button>
            </Grid>
        </PageWrapper>
    );
}
