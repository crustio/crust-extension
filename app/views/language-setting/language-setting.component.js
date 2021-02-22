import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import './styles.css';
import ButtonMD from '../../components/common/buttons/button-md';
import { withTranslation } from 'react-i18next';
import * as NavConstants from '../../constants/navigation';
import { CHINESE, ENGLISH } from '../../constants/language';

class LanguageSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      isAddressError: false,
      addressErrorMessage: '',
      addressPropName: 'address',
      propName: 'tname',
      tname: '',
      tokenLabel: 'Token contract address',
      tokenError: false,
      tokenErrorMessage: '',
    };

    this.inputRef = React.createRef();
  }

  onClick = () => {
    this.props.changePage(this.props.backupPage);
    this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
  };

  handleZhClick = async (i18n) => {
    this.props.updateAppLanguage(CHINESE, i18n);
  };

  handleEnClick = async (i18n) => {
    this.props.updateAppLanguage(ENGLISH, i18n);
  };

  render() {
    const { t, i18n } = this.props;
    return (
      <div>
        <SubHeader
          icon={<Clear style={{ color: 'rgba(255, 255, 255, 1)' }} />}
          title="Language Setting"
          backBtnOnClick={this.onClick}
        />
        <div className="token-add-container">
          <ButtonMD color="dashboard" onClick={() => this.handleZhClick(i18n)}>
            {t("Chinese")}
          </ButtonMD>
          <ButtonMD color="dashboard" onClick={() => this.handleEnClick(i18n)}>
            {t("English")}
          </ButtonMD>
        </div>
      </div>
    );
  }
}
export default withTranslation()(LanguageSetting);
