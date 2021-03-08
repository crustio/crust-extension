import React, { Component } from 'react';
import { ChevronLeft } from '@material-ui/icons';
import { withTranslation } from 'react-i18next';
import SubHeader from '../../components/common/sub-header';
import FontRegular from '../../components/common/fonts/font-regular';
import FooterButton from '../../components/common/footer-button';
import './styles.css';
import Link from '../../components/common/link';
import * as NavConstants from '../../constants/navigation';

class About extends Component {
  onClick = () => {
    this.props.changePage(this.props.backupPage);
    this.props.updateBackupPage(NavConstants.DASHBOARD_PAGE);
  };

  renderInfoLinks() {
    const { t } = this.props;
    return (
      <div className="info-container">
        <FontRegular className="about-link-title" text={t('Link')} />
        {this.props.links.map(link => (
          <div key={link.url} className={link.value === 'tou' ? 'about-tou' : 'about-link'}>
            <Link
              href={link.url}
              style={{
                color: '#037DD6',
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
    const { manifest, t } = this.props;
    return (
      <div>
        <SubHeader
          icon={<ChevronLeft style={{ color: '#858B9C', fontSize: '18px' }} />}
          title={t('About')}
          backBtnOnClick={this.onClick}
        />
        <div className="about-container">
          <FontRegular className="about-title" text={t(`${manifest.name}`)} />
          <FontRegular className="about-version" text={t(`Version ${manifest.version}`)} />
          {this.renderInfoLinks()}
          <div className="about-button">
            <FooterButton
              style={{
                background: '#FF8D00',
                color: 'white',
                height: '38px',
                borderRadius: '4px',
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
