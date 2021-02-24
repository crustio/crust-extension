import React, { Component } from 'react';
import Clear from '@material-ui/icons/Clear';
import SubHeader from '../../components/common/sub-header';
import './styles.css';
import ButtonMD from '../../components/common/buttons/button-md';
import { withTranslation } from 'react-i18next';
import * as NavConstants from '../../constants/navigation';
import { CHINESE, ENGLISH } from '../../constants/language';
import CrustRadioButtonGroup from '../../components/common/crust-radio-button-group';

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

  onLanguageChange = (e, i18n) => {
    console.log(e.target.value);
    if (e.target.value === CHINESE || e.target.value === ENGLISH) {
      this.props.updateAppLanguage(e.target.value, i18n);
    }
  }

  handleZhClick = async (i18n) => {
    this.props.updateAppLanguage(CHINESE, i18n);
  };

  handleEnClick = async (i18n) => {
    this.props.updateAppLanguage(ENGLISH, i18n);
  };

  render() {
    const { t, i18n, language } = this.props;
    const options = [{value: 'en-US', text: t('English')}, {value: 'zh-CN', text: t('Chinese')} ]
    return (
      <div className="language-setting-container">
        <SubHeader
          icon={<Clear style={{ color: '#858B9C', fontSize: '18px' }} />}
          title={t("Language Setting")}
          backBtnOnClick={this.onClick}
        />
        <div className="language-setting-option-container">
          <CrustRadioButtonGroup
            vertical={true}
            options={options}
            value={options.find(o => o.value === language)}
            onChange={e => this.onLanguageChange(e, i18n)}
          />
        </div>
      </div>
    );
  }
}
export default withTranslation()(LanguageSetting);
