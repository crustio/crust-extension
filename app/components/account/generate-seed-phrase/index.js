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
      classes, seedWords, t, colorTheme, onCopySeed, ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <ContentHeader
          title={t('Generate Seed Phrase')}
          description={t(
            "This seed phrase is used to generate your first account. Save this somewhere safe and don't share it.",
          )}
          colorTheme={colorTheme}
        />
        <SeedWordsBox
          className="seed-phrase-text-area"
          value={seedWords}
          colorTheme={colorTheme}
          style={{ background: colorTheme ? colorTheme.card : null }}
        />
        <ClickToCopy
          className={classes.seedPhraseCopy}
          text={t('Click to copy')}
          value={seedWords}
          colorTheme={colorTheme}
          onClick={onCopySeed}
        />
      </div>
    );
  }
}

export default withStyles(styles)(withTranslation()(GenerateSeedPhrase));
