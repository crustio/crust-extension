import React, { Component } from 'react';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import FontRegular from '../../components/common/fonts/font-regular';
import FooterButton from '../../components/common/footer-button';
import './styles.css';
import Link from '../../components/common/link';
import { colortheme } from '../../../lib/constants/colors';
import * as NavConstants from '../../constants/navigation';

class About extends Component {
  onClick = () => {
    this.props.changePage(this.props.backupPage);
    this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
  };

  renderInfoLinks(color) {
    const { t } = this.props;
    return (
      <div className="info-container">
        <FontRegular className="about-link-title" text={t('Link')} style={{ color }} />
        {this.props.links.map(link => (
          <div key={link.url} className={link.value === 'tou' ? 'about-tou' : 'about-link'}>
            <Link
              href={link.url}
              style={{
                color: '#FF8D00',
              }}
            >
              {t(`${link.text}`)}
            </Link>
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { manifest, network, t } = this.props;
    return (
      <div style={{ height: 550, background: `${colortheme[network.value].background}` }}>
        <SubHeader
          icon={<ArrowBackIosOutlinedIcon style={{ color: '#858B9C', fontSize: '14px' }} />}
          title={t('About')}
          backBtnOnClick={this.onClick}
          isBackIcon
          colortheme={colortheme[network.value]}
        />
        <div className="about-container">
          <FontRegular
            className="about-title"
            text={manifest.name}
            style={{ color: colortheme[network.value].text.primary }}
          />
          <FontRegular
            className="about-version"
            text={`Version ${manifest.version}`}
            style={{ color: colortheme[network.value].text.quaternary }}
          />
          {this.renderInfoLinks(colortheme[network.value].text.primary)}
          <div className="about-button">
            <FooterButton
              style={{
                background: '#FF8D00',
                color: 'white',
                height: '38px',
                borderRadius: '12px',
                top: '547px',
              }}
              onClick={this.onClick}
              name={t('OK')}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(About);
