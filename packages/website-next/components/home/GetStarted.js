import { Title, Row, Col, Text, Monospace, Link } from '@borrow-ui/ui';
import { Terminal } from '../common/Terminal';

export function GetStarted() {
    return (
        <div>
            <Title>Get Started</Title>
            <Row>
                <Col colClassName="col-xs-12 col-sm-12 col-md-6 last-xs first-md">
                    <div className="flex-center-center">
                        <Terminal
                            className="m-b-20 w-400 m-r-20 m-l-20"
                            title="Get started"
                            code={getStartedCode}
                            language="bash"
                        />
                    </div>
                </Col>
                <Col colClassName="col-xs-12 col-sm-12 col-md-6">
                    <Text>
                        Start developing your website/blog now is as simple as running two simple
                        commands.
                    </Text>
                    <Text>Enter the website package and run the development server!</Text>
                </Col>
            </Row>
            <Row style={{ marginTop: 50, marginBottom: 50 }}>
                <Col colClassName="col-xs-12 col-sm-12 col-md-6">
                    <Text>
                        Building the website only requires to change the command from
                        <Monospace>dev</Monospace> to <Monospace>build</Monospace>.
                    </Text>
                    <Text>
                        The build can then be hosted by yourself or using one of the many available
                        services. For example, this website is hosted using{' '}
                        <Link tag="a" href="https://www.netlify.com/">
                            Netlify
                        </Link>
                        .
                    </Text>
                </Col>
                <Col colClassName="col-xs-12 col-sm-12 col-md-6">
                    <div className="flex-center-center">
                        <Terminal
                            className="m-b-20 w-400 m-r-20 m-l-20"
                            title="Build"
                            code={buildCode}
                            language="bash"
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}

const getStartedCode = `cd packages/website-next;
yarn dev`;

const buildCode = `cd packages/website-next;
yarn build`;
