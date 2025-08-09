import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyles />
      <Row type="vertical">
        <Row type="horizontal">
          <Heading as="h1">The Wild Oasis</Heading>
          <div>
            <Heading as="h2">Check in and out</Heading>
            <Button
              variation="primary"
              size="medium"
              onClick={() => alert("check in")}
            >
              Check in
            </Button>
            <Button
              variation="secondary"
              size="small"
              onClick={() => alert("check out")}
            >
              Check out
            </Button>
          </div>
        </Row>
      </Row>
      <Row type="vertical">
        <Heading as="h3">Form</Heading>
        <form>
          <Input type="number" placeholder="Number of Guests" />
          <Input type="number" placeholder="Number of Guests" />
        </form>
      </Row>
    </>
  );
}

export default App;
