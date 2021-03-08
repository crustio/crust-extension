import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ButtonCustom from '../../components/common/buttons/button-custom'
import FontRegular from '../../components/common/fonts/font-regular';
import LogoBig from '../../images/crust-logo-big.svg';
import {
  CREATE_ACCOUNT_PAGE, IMPORT_JSON_PAGE,
} from '../../constants/navigation';
import './styles.css';

class CreateAccountEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: ['Generate', 'From Phrase', 'From Json']
    };
  }

  handleClick = (btn) => {
    if (btn === 'Generate') {
      this.props.changePage(CREATE_ACCOUNT_PAGE);
    } else if (btn === 'From Phrase') {
      this.props.changePage(CREATE_ACCOUNT_PAGE);
    } else {
      this.props.changePage(IMPORT_JSON_PAGE);
    }
  };

  render() {
    const { t } = this.props;
    const { buttons } = this.state;
    return (
      <div>
        <div className="entry-container">
          <div className="entry-img-contianer">
            <img src={LogoBig} alt="logo2" />
          </div>
          <FontRegular className="entry-title" text="Chain to Decentralized Cloud" />
          <div className="entry-container-entries">
            {
              buttons.map(btn => (
                <ButtonCustom
                  onClick={() => this.handleClick(btn)}
                  width="104px"
                  border="1px solid #FF8D00"
                >
                  {t(btn)}
                </ButtonCustom>
                )
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(CreateAccountEntry);
