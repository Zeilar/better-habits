import { Button, Grid, Text } from "@chakra-ui/react";
import PageWrapper from "../../components/PageWrapper";
import { useAuth } from "../../hooks";
import { useTitle } from "@zeilar/hooks";
import { BRAND_NAME } from "../../utils/constants";

export default function Settings() {
    const { logout } = useAuth();
    useTitle(`Settings | ${BRAND_NAME}`);
    return (
        <PageWrapper>
            <Text textStyle="pageTitle" p={4}>
                Settings
            </Text>
            <Grid
                h="calc(100vh - var(--chakra-sizes-navbarHeight) - 4.25rem)"
                overflowY="auto"
                gridTemplateRows="repeat(1, 4rem)"
            >
                <Button
                    textAlign="left"
                    variant="unstyled"
                    paddingInline={4}
                    _hover={{ bgColor: "gray.800" }}
                    h="auto"
                    onClick={logout}
                    _notFirst={{
                        borderBottom: "1px solid",
                        borderBottomColor: "border.default",
                        borderRadius: 0,
                    }}
                >
                    Logout
                </Button>
            </Grid>
        </PageWrapper>
    );
}
