// Configuration
import { setConfig, getConfig } from './config';

// Components
import { Accordion, AccordionGroup } from './components/accordion/Accordion';
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
import { ReferenceOverlay } from './components/reference-overlay/ReferenceOverlay';
import { Responsive } from './components/responsive/Responsive';
import { SearchBar } from './components/search-bar/SearchBar';
import { Sidebar, SidebarBody } from './components/sidebar/Sidebar';
import { SidebarContext } from './components/sidebar/SidebarContext';
import { SidebarEntry } from './components/sidebar/SidebarEntry';
import { SidebarIcon } from './components/sidebar/SidebarIcon';
import { SidebarTrigger, SidebarCustomTrigger } from './components/sidebar/SidebarTrigger';
import { SidebarMenu } from './components/sidebar-menu/SidebarMenu';
import { Subtitle } from './components/text/Subtitle';
import { SyntaxHighlight } from './components/syntax-highlight/SyntaxHighlight';
import { Table } from './components/table/Table';
import { Tabs } from './components/tabs/Tabs';
import { Text } from './components/text/Text';
import { Tile } from './components/tile/Tile';
import { TileLink } from './components/tile-link/TileLink';
import { Title } from './components/text/Title';
import { TextContainer } from './components/text/TextContainer';
import { Tooltip } from './components/tooltip/Tooltip';

// hooks
import { useHover } from './hooks/useHover';
import { useLocationHash } from './hooks/useLocationHash';

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
    AccordionGroup,
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
    ReferenceOverlay,
    Responsive,
    Row,
    SearchBar,
    Sidebar,
    SidebarBody,
    SidebarContext,
    SidebarEntry,
    SidebarIcon,
    SidebarTrigger,
    SidebarCustomTrigger,
    SidebarMenu,
    Subtitle,
    SyntaxHighlight,
    Table,
    Tabs,
    Text,
    TextContainer,
    Tile,
    TileLink,
    Title,
    Tooltip,
    // hooks
    useHover,
    useLocationHash,
};

/**
 * The following exports are redundant with Forms,
 * but allows for auto discovery and import directly
 * with editor's autocomplete.
 */

export { Checkbox } from './components/forms/checkbox/Checkbox';
export { DatePicker } from './components/forms/date-picker/DatePicker';
export { Dropzone } from './components/forms/dropzone/Dropzone';
export { DropzoneFiles, DropzoneFile } from './components/forms/dropzone/DropzoneFiles';
export { Field, VField, HField } from './components/forms/field/Field';
export { Input } from './components/forms/input/Input';
export { Label } from './components/forms/label/Label';
export { ReactSelect } from './components/forms/react-select/ReactSelect';
export { ReactSelect as Select } from './components/forms/react-select/ReactSelect';
export { Textarea } from './components/forms/textarea/Textarea';
export { Toggle } from './components/forms/toggle/Toggle';
