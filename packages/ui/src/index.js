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
import { Link } from './components/link/Link';
import { Loader } from './components/loader/Loader';
import { Lorem } from './components/lorem/Lorem';
import { Menu } from './components/menu/Menu';
import { MenuDivider } from './components/menu/MenuDivider';
import { MenuEntry } from './components/menu/MenuEntry';
import { Modal, ModalWindow } from './components/modal/Modal';
import { Monospace } from './components/text/Monospace';
import { Navbar } from './components/navbar/Navbar';
import { NavbarLink } from './components/navbar/NavbarLink';
import { NavbarMenu } from './components/navbar-menu/NavbarMenu';
import { NavbarMenuItem } from './components/navbar-menu/NavbarMenuItem';
import { NavbarMenuTitle } from './components/navbar-menu/NavbarMenuTitle';
import { Page } from './components/page/Page';
import { PageBody } from './components/page/PageBody';
import { PageHeader } from './components/page/PageHeader';
import { Panel } from './components/panel/Panel';
import { Popover } from './components/popover/Popover';
import { Responsive } from './components/responsive/Responsive';
import {
    Sidebar,
    SidebarContext,
    generateSidebarContextProvider,
} from './components/sidebar/Sidebar';
import { SidebarEntry } from './components/sidebar/SidebarEntry';
import { SidebarIcon } from './components/sidebar/SidebarIcon';
import { SidebarMenu } from './components/sidebar-menu/SidebarMenu';
import { Subtitle } from './components/text/Subtitle';
import { Table } from './components/table/Table';
import { Tabs } from './components/tabs/Tabs';
import { Text } from './components/text/Text';
import { Tile } from './components/tile/Tile';
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
    Link,
    Loader,
    Lorem,
    Menu,
    MenuDivider,
    MenuEntry,
    Modal,
    ModalWindow,
    Monospace,
    Navbar,
    NavbarLink,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuTitle,
    Page,
    PageBody,
    PageHeader,
    Panel,
    Popover,
    Responsive,
    Row,
    Sidebar,
    SidebarContext,
    generateSidebarContextProvider,
    SidebarEntry,
    SidebarIcon,
    SidebarMenu,
    Subtitle,
    Table,
    Tabs,
    Text,
    TextContainer,
    Tile,
    Title,
    // hooks
    useAnchor,
    useRefHash,
};
