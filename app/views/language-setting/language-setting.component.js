import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import List from '@material-ui/core/List';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import './styles.css';
import * as NavConstants from '../../constants/navigation';
import { CHINESE, ENGLISH } from '../../constants/language';
import SimpleListItemCard from '../../components/common/simple-list-item-card';
import { colortheme } from '../../../lib/constants/colors';

class LanguageSetting extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  onClick = () => {
    this.props.changePage(this.props.backupPage);
    this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
  };

  onLanguageChange = (event, option) => {
    const { i18n } = this.props;
    if (option.value === CHINESE || option.value === ENGLISH) {
      this.props.updateAppLanguage(option.value, i18n);
    }
  };

  handleZhClick = async i18n => {
    this.props.updateAppLanguage(CHINESE, i18n);
  };

  handleEnClick = async i18n => {
    this.props.updateAppLanguage(ENGLISH, i18n);
  };

  render() {
    const { t, language, network } = this.props;
    const options = [
      { value: ENGLISH, text: t('English') },
      { value: CHINESE, text: t('Chinese') },
    ];
    return (
      <div
        className="language-setting-container"
        style={{ background: `${colortheme[network.value].background}` }}
      >
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('Language Setting')}
          backBtnOnClick={this.onClick}
          colortheme={colortheme[network.value]}
          isBackIcon
        />
        <div className="language-setting-option-container">
          <List classes={{}}>
            {options.map((option, index) => (
              <SimpleListItemCard
                key={index}
                listItem={option}
                handleListItemAvatarClick={this.onLanguageChange}
                handleListItemClick={this.onLanguageChange}
                primaryText={option.text}
                isActive={language === option.value}
                className="language-card-container"
                style={{ background: colortheme[network.value].card }}
                colortheme={colortheme[network.value]}
              />
            ))}
          </List>
          {/* <CrustRadioButtonGroup
            // eslint-disable-next-line
            vertical={true}
            options={options}
            value={options.find(o => o.value === language)}
            onChange={e => this.onLanguageChange(e, i18n)}
          /> */}
        </div>
      </div>
    );
  }
}
export default withTranslation()(LanguageSetting);
