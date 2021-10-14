import { Button } from "@chakra-ui/button";
import { Flex, Heading } from "@chakra-ui/layout";

const Header = (): JSX.Element => {

    return <Flex as="nav" align="center" justify="space-around" wrap="wrap" p={6} bg="teal.500" w="100%" color="white">
        <Heading as="h1" size="lg">
            Dev-Su
        </Heading>
        <Button colorScheme="blue">Login</Button>
    </Flex>
}

export default Header;