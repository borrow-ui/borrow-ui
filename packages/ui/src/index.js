// Configuration
import { setConfig, getConfig } from './config';

// Components
import { Button } from './components/button/Button';
import { Row, Col } from './components/grid/Grid';
import { Icon } from './components/icon/Icon';
import { IconControl } from './components/icon/IconControl';
import { Lorem } from './components/lorem/Lorem';
import { Navbar } from './components/navbar/Navbar';
import { Page } from './components/page/Page';
import { PageBody } from './components/page/PageBody';
import { PageHeader } from './components/page/PageHeader';
import { Sidebar, SidebarContext } from './components/sidebar/Sidebar';
import { SidebarEntry } from './components/sidebar/SidebarEntry';
import { SidebarIcon } from './components/sidebar/SidebarIcon';
import { Subtitle } from './components/text/Subtitle';
import { Text } from './components/text/Text';
import { TextContainer } from './components/text/TextContainer';

/*
EXPORTS

Exported components are divided in categories.
*/

export {
    // Config
    getConfig,
    setConfig,
    // Components
    Button,
    Col,
    Icon,
    IconControl,
    Lorem,
    Navbar,
    Page,
    PageBody,
    PageHeader,
    Row,
    Sidebar,
    SidebarContext,
    SidebarEntry,
    SidebarIcon,
    Subtitle,
    Text,
    TextContainer,
};
