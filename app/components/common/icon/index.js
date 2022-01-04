import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons/faArrowCircleDown';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons/faArrowCircleRight';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile';
import { faPlug } from '@fortawesome/free-solid-svg-icons/faPlug';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MoreVert from '@material-ui/icons/MoreVert';
import WifiOff from '@material-ui/icons/WifiOff';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import { HelpCircle, WifiOff as FiWifiOff } from 'react-feather';

const IconEdit = props => (
  <FontAwesomeIcon icon={faEdit} style={{ color: '#2f112b', fontSize: props.size }} {...props} />
);

const IconAngleRight = props => (
  <FontAwesomeIcon
    icon={faAngleRight}
    style={{ color: 'white', fontSize: props.size }}
    {...props}
  />
);

const IconTransferFromTo = props => (
  <div
    style={{
      marginTop: '6px',
      paddingLeft: '28px',
      display: 'flex',
      flexDirection: 'row',
      width: '50%',
    }}
    {...props}
  >
    <FontAwesomeIcon
      icon={faArrowCircleDown}
      style={{
        color: '#000000',
        opacity: 1,
        fontSize: 21.2,
      }}
    />
  </div>
);

const IconTransfer = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faArrowCircleRight}
      style={{ color: 'rgba(112, 112, 112, 1)', fontSize: '16px' }}
    />
  </div>
);

const IconSettings = props => <SettingsOutlinedIcon style={{ ...props.style }} {...props} />;

const IconVisibility = props => <VisibilityOutlinedIcon style={{ ...props.style }} {...props} />;

const IconVisibilityOff = props => (
  <VisibilityOffOutlinedIcon style={{ ...props.style }} {...props} />
);

const WalletDropDownIcon = props => (
  <div {...props}>
    <MoreVert
      style={{
        fontSize: '1.5em',
        color: '#111A34',
      }}
    />
  </div>
);

const MoreVertIcon = props => (
  <div {...props}>
    <MoreVert
      style={{
        fontSize: '1.5em',
        color: props.color ? props.color : 'rgba(255, 255, 255, 1)',
      }}
    />
  </div>
);

const IconCheckCircle = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faCheckCircle}
      style={{ width: 14, height: 14, color: 'rgba(255, 255, 255, 1)' }}
    />
  </div>
);

const NetworkDisconnectionIcon = props => (
  <div {...props}>
    <WifiOff
      style={{
        fontSize: '1.5em',
        color: '#111A34',
      }}
    />
  </div>
);

const NetworkOfflineIcon = props => <FiWifiOff size={60} color="#C5CAD5" {...props} />;

const SolidWallet = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faWallet}
      style={{
        width: 40,
        height: 35,
        color: '#FF8D00',
      }}
    />
  </div>
);

const File = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faFile}
      style={{
        width: 40,
        height: 35,
        color: 'rgba(208, 56, 107, 1)',
      }}
    />
  </div>
);

const SolidPlug = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faPlug}
      style={{ width: '26.67px', height: 20, color: 'rgba(77, 77, 77, 1)' }}
    />
  </div>
);

const CaretRight = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faCaretRight}
      style={{
        width: '8px',
        height: props.height ? props.height : '21px',
        color: 'rgba(38, 38, 38, 1)',
      }}
    />
  </div>
);

const CaretDown = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faCaretDown}
      style={{
        width: props.width ? props.width : '8px',
        height: props.height ? props.height : '21px',
        color: 'rgba(38, 38, 38, 1)',
      }}
    />
  </div>
);

const ExclamationTriangle = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faExclamationTriangle}
      style={{
        height: '21.33px',
        width: '24px',
        color: 'rgba(245, 245, 246, 1)',
      }}
    />
  </div>
);

const AddressBook = props => (
  <div {...props}>
    <FontAwesomeIcon
      icon={faAddressBook}
      style={{ width: '26.67px', height: 20, color: 'rgba(77, 77, 77, 1)' }}
    />
  </div>
);

export {
  IconEdit,
  IconTransferFromTo,
  IconTransfer,
  IconVisibility,
  WalletDropDownIcon,
  IconSettings,
  IconCheckCircle,
  NetworkDisconnectionIcon,
  NetworkOfflineIcon,
  SolidWallet,
  SolidPlug,
  CaretRight,
  CaretDown,
  ExclamationTriangle,
  MoreVertIcon,
  AddressBook,
  File,
  IconVisibilityOff,
  IconAngleRight,
  HelpCircle,
};
