import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ButtonCustom from '../../components/common/buttons/button-custom';
import FontRegular from '../../components/common/fonts/font-regular';
import LogoBig from '../../images/crust-logo-big.svg';
import { CREATE_ACCOUNT_PAGE, IMPORT_JSON_PAGE } from '../../constants/navigation';
import {
  GENERATE_BUTTON_TEXT,
  IMPORT_BUTTON_TEXT,
  FROM_PHRASE_BUTTON_TEXT,
  FROM_JSON_BUTTON_TEXT,
} from '../../constants/account';
import './styles.css';

class CreateAccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [GENERATE_BUTTON_TEXT, IMPORT_BUTTON_TEXT],
      buttonsImport: [FROM_PHRASE_BUTTON_TEXT, FROM_JSON_BUTTON_TEXT],
      showImport: false,
      isHover: false,
    };
  }

  componentDidMount() {
    this.props.updateBackupPage(this.props.page);
  }

  handleClick = async btn => {
    if (btn === 'Generate') {
      await this.props.addAccount();
      this.props.changePage(CREATE_ACCOUNT_PAGE);
    } else if (btn === 'Import') {
      this.setState({
        showImport: true,
      });
    } else if (btn === 'From Phrase') {
      await this.props.resetSeedWordsBeforeImport();
      this.props.changePage(CREATE_ACCOUNT_PAGE);
    } else if (btn === 'From Json') {
      this.props.changePage(IMPORT_JSON_PAGE);
    } else {
      this.setState({
        showImport: false,
        isHover: false,
      });
    }
  };

  handleHover = hover => {
    this.setState({
      isHover: hover,
    });
  };

  render() {
    const { t } = this.props;
    const {
      buttons, buttonsImport, showImport, isHover
    } = this.state;
    return (
      <div>
        <div className="entry-container">
          <div className="entry-img-contianer">
            <img src={LogoBig} alt="logo2" />
          </div>
          <FontRegular className="entry-title" text="Web 3.0 Storage for Metaverse" />
          <div className="entry-container-entries">
            {!showImport
              && buttons.map(btn => (
                <ButtonCustom
                  onClick={() => this.handleClick(btn)}
                  width="161px"
                  border="1px solid #FF8D00"
                >
                  {t(btn)}
                </ButtonCustom>
              ))}
            {showImport && (
              <div
                className="entry-square"
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                onClick={() => this.handleClick('back')}
              >
                <ArrowBackIosOutlinedIcon
                  style={{ color: isHover ? 'white' : '#FF8D00', fontSize: '14px' }}
                />
              </div>
            )}
            {showImport
              && buttonsImport.map(btn => (
                <ButtonCustom
                  onClick={() => this.handleClick(btn)}
                  width="137px"
                  border="1px solid #FF8D00"
                >
                  {t(btn)}
                </ButtonCustom>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(CreateAccountEntry);
