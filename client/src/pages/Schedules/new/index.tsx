import { Link, Text } from "@chakra-ui/react";
import PageBanner from "../../../components/PageBanner";
import PageWrapper from "../../../components/PageWrapper";
import { Link as ReactLink } from "react-router-dom";
import { ArrowLeftShort } from "styled-icons/bootstrap";
import Icon from "../../../components/Icon";

export default function NewSchedule() {
    return (
        <PageWrapper>
            <PageBanner mb={4}>
                <Link as={ReactLink} to="/schedule" mr={2}>
                    <Icon icon={ArrowLeftShort} size={8} />
                </Link>
                <Text textStyle="h3" as="h3">
                    Create event
                </Text>
            </PageBanner>
        </PageWrapper>
    );
}
