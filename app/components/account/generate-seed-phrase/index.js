import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withTranslation } from 'react-i18next';
import ContentHeader from '../../common/content-header';
import ClickToCopy from '../../common/click-to-copy';
import SeedWordsBox from '../seed-words-box';
import './styles.css';
import { styles } from './styles';

class GenerateSeedPhrase extends Component {
  render() {
    const {
      classes, seedWords, t, colortheme, onCopySeed, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ContentHeader
          title={t('Generate Seed Phrase')}
          description={t(
            "This seed phrase is used to generate your first account. Save this somewhere safe and don't share it.",
          )}
          colortheme={colortheme}
        />
        <SeedWordsBox
          className="seed-phrase-text-area"
          value={seedWords}
          colortheme={colortheme}
          style={{ background: colortheme ? colortheme.card : null }}
        />
        <ClickToCopy
          className={classes.seedPhraseCopy}
          text={t('Click to copy')}
          value={seedWords}
          colortheme={colortheme}
          onClick={onCopySeed}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withTranslation()(GenerateSeedPhrase));
