import Image from 'next/image';

import { Row, Col, Title, Text, Link } from '@borrow-ui/ui';
import dashboardHomeSS from '../../public/dashboard-home.png';

export function DashboardExample() {
    return (
        <div>
            <Title tag="h2" className="m-t-0 m-r-10 color-primary">
                Dashboard Example
            </Title>

            <Row>
                <Col>
                    <div style={{ width: '90%', marginRight: 'auto', marginLeft: 'auto' }}>
                        <a
                            href="https://dashboard.borrow-ui.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image src={dashboardHomeSS} alt="Dashboard home screenshot" />
                        </a>
                    </div>
                </Col>
                <Col>
                    <Text>
                        A dashboard demostration is available at{' '}
                        <Link
                            tag="a"
                            href="https://dashboard.borrow-ui.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://dashboard.borrow-ui.dev
                        </Link>
                        .
                        <br />
                        You can find the code in the github repository. All the components are
                        commented.
                    </Text>
                    <Text>
                        The dashboard is based on CRA and uses the latest stable version of
                        borrow-ui.
                    </Text>
                    <Text>
                        As a small demo, it shows how to structure a dashboard with multiple
                        applications and shared components, load entities (such as books and
                        reviews) and how to use borrow-ui to create pages and forms.
                    </Text>
                </Col>
            </Row>
        </div>
    );
}
