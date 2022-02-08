import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import './styles.css';
import * as NavConstants from '../../constants/navigation';
import { CHINESE, ENGLISH } from '../../constants/language';
import CrustRadioButtonGroup from '../../components/common/crust-radio-button-group';
import { colorTheme } from '../../../lib/constants/colors';

class LanguageSetting extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  onClick = () => {
    this.props.changePage(this.props.backupPage);
    this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
  };

  onLanguageChange = (e, i18n) => {
    if (e.target.value === CHINESE || e.target.value === ENGLISH) {
      this.props.updateAppLanguage(e.target.value, i18n);
    }
  };

  handleZhClick = async i18n => {
    this.props.updateAppLanguage(CHINESE, i18n);
  };

  handleEnClick = async i18n => {
    this.props.updateAppLanguage(ENGLISH, i18n);
  };

  render() {
    const {
      t, i18n, language, network
    } = this.props;
    const options = [
      { value: ENGLISH, text: t('English') },
      { value: CHINESE, text: t('Chinese') },
    ];
    return (
      <div className="language-setting-container">
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Language Setting')}
          backBtnOnClick={this.onClick}
          colorTheme={colorTheme[network.value]}
          isBackIcon
        />
        <div className="language-setting-option-container">
          <CrustRadioButtonGroup
            // eslint-disable-next-line
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
