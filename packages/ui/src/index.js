// Configuration
import { setConfig, getConfig } from './config';

// Components
import { Accordion } from './components/accordion/Accordion';
import { Badge } from './components/badge/Badge';
import { Block } from './components/block/Block';
import { Breadcrumbs } from './components/breadcrumbs/Breadcrumbs';
import { Button } from './components/button/Button';
import { Card } from './components/card/Card';
import { Forms } from './components/forms';
import { Row, Col } from './components/grid/Grid';
import { Icon } from './components/icon/Icon';
import { IconControl } from './components/icon/IconControl';
import { Loader } from './components/loader/Loader';
import { Lorem } from './components/lorem/Lorem';
import { Menu } from './components/menu/Menu';
import { MenuDivider } from './components/menu/MenuDivider';
import { MenuEntry } from './components/menu/MenuEntry';
import { Modal, ModalWindow } from './components/modal/Modal';
import { Monospace } from './components/text/Monospace';
import { Navbar } from './components/navbar/Navbar';
import { Page } from './components/page/Page';
import { PageBody } from './components/page/PageBody';
import { PageHeader } from './components/page/PageHeader';
import { Panel } from './components/panel/Panel';
import { Popover } from './components/popover/Popover';
import { Sidebar, SidebarContext } from './components/sidebar/Sidebar';
import { SidebarEntry } from './components/sidebar/SidebarEntry';
import { SidebarIcon } from './components/sidebar/SidebarIcon';
import { SidebarMenu } from './components/sidebar-menu/SidebarMenu';
import { Subtitle } from './components/text/Subtitle';
import { Table } from './components/table/Table';
import { Tabs } from './components/tabs/Tabs';
import { Text } from './components/text/Text';
import { Title } from './components/text/Title';
import { TextContainer } from './components/text/TextContainer';

// hooks
import { useAnchor, useRefHash } from './hooks/useAnchor';

/*
EXPORTS

Exported components are divided in categories.
*/

export {
    // Config
    getConfig,
    setConfig,
    // Components
    Accordion,
    Badge,
    Block,
    Breadcrumbs,
    Button,
    Card,
    Col,
    Forms,
    Icon,
    IconControl,
    Loader,
    Lorem,
    Menu,
    MenuDivider,
    MenuEntry,
    Modal,
    ModalWindow,
    Monospace,
    Navbar,
    Page,
    PageBody,
    PageHeader,
    Panel,
    Popover,
    Row,
    Sidebar,
    SidebarContext,
    SidebarEntry,
    SidebarIcon,
    SidebarMenu,
    Subtitle,
    Table,
    Tabs,
    Text,
    TextContainer,
    Title,
    // hooks
    useAnchor,
    useRefHash,
};
