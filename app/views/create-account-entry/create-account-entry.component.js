import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ModalWithThreeButton from '../../components/common/modal-with-three-button';
import ContentHeader from '../../components/common/content-header';
import LogoBig from '../../images/crust-logo-big.svg';
import {
  CREATE_ACCOUNT_PAGE,
  IMPORT_JSON_PAGE,
  IMPORT_PHRASE_PAGE,
  SIGN_UP_PAGE,
} from '../../constants/navigation';
import {
  GENERATE_BUTTON_TEXT,
  IMPORT_BUTTON_TEXT,
  BACK_BUTTON_TEXT,
  IMPORT_FROM_JSON_BUTTON_TEXT,
  IMPORT_FROM_PHRASE_BUTTON_TEXT,
} from '../../constants/account';
import { CRUST_NETWORK } from '../../../lib/constants/networks';
import './styles.css';
import { colortheme } from '../../../lib/constants/colors';

class CreateAccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImport: false,
    };
  }

  componentDidMount() {
    this.props.updateBackupPage(this.props.page);
  }

  handleClick = async btn => {
    if (btn === GENERATE_BUTTON_TEXT) {
      await this.props.addAccount();
      this.props.changePage(CREATE_ACCOUNT_PAGE);
    } else if (btn === IMPORT_BUTTON_TEXT) {
      this.setState({
        showImport: true,
      });
    } else if (btn === IMPORT_FROM_PHRASE_BUTTON_TEXT) {
      await this.props.resetSeedWordsBeforeImport();
      this.props.changePage(IMPORT_PHRASE_PAGE);
    } else if (btn === IMPORT_FROM_JSON_BUTTON_TEXT) {
      this.props.changePage(IMPORT_JSON_PAGE);
    } else {
      this.setState({
        showImport: false,
      });
    }
  };

  handleCancel = () => {
    this.props.changePage(SIGN_UP_PAGE);
  };

  render() {
    const { isLoading } = this.props;
    const { showImport } = this.state;
    return (
      <div>
        <div className="entry-container">
          <div className="entry-img-contianer">
            <img src={LogoBig} alt="logo2" />
          </div>
          <ContentHeader
            className="entry-title"
            title={this.props.t('Create A Password To Secure Your Account')}
            // eslint-disable-next-line
            description={this.props.t(
              "The password is used to protect your Enigma seed phrase(s) so that other Chrome extensions can't access them.",
            )}
          />
          <div className="entry-container-entries">
            <ModalWithThreeButton
              show={!showImport && !isLoading}
              colortheme={colortheme[CRUST_NETWORK.value]}
              handleCancel={this.handleCancel}
              handleTopClick={() => this.handleClick(GENERATE_BUTTON_TEXT)}
              handleBottomClick={() => this.handleClick(IMPORT_BUTTON_TEXT)}
              topButton={GENERATE_BUTTON_TEXT}
              bottomButton={IMPORT_BUTTON_TEXT}
              network={CRUST_NETWORK}
              oneAction={false}
            />
            <ModalWithThreeButton
              show={showImport && !isLoading}
              colortheme={colortheme[CRUST_NETWORK.value]}
              handleCancel={() => this.handleClick(BACK_BUTTON_TEXT)}
              handleTopClick={() => this.handleClick(IMPORT_FROM_JSON_BUTTON_TEXT)}
              handleBottomClick={() => this.handleClick(IMPORT_FROM_PHRASE_BUTTON_TEXT)}
              topButton={IMPORT_FROM_JSON_BUTTON_TEXT}
              bottomButton={IMPORT_FROM_PHRASE_BUTTON_TEXT}
              cancelButton="Go back"
              network={CRUST_NETWORK}
              oneAction={false}
              sameStyleButton
            />
            {/*
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
              ))} */}
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(CreateAccountEntry);
