import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import ContentHeader from '../../common/content-header';
import CrustMultilineInput from '../../common/crust-multiline-input';
import './styles.css';

class ImportSeedPhrase extends Component {
  constructor(props) {
    super(props);
    this.seedWordsInput = React.createRef();
  }

  componentDidMount() {
    this.props.handleSeedWordImportOnMount();
  }

  render() {
    const {
      onChange,
      seedWords,
      isError,
      errorMessage,
      importSeedPhraseInputName,
      seedRef,
      handleSeedWordsOnBlur,
      colortheme,
      t,
    } = this.props;
    return (
      <div>
        <ContentHeader
          title={t('Import Seed Phrase')}
          description={t(
            "This seed phrase is used to generate your first account. Make sure it's saved somewhere safe and don't share it.",
          )}
          colortheme={colortheme}
        />
        <CrustMultilineInput
          className="import-seed-phrase-input"
          placeholder={t('Type or paste your seed phrase...')}
          error={isError}
          helperText={errorMessage}
          onChange={onChange(importSeedPhraseInputName)}
          value={seedWords}
          name={importSeedPhraseInputName}
          inputRef={seedRef}
          onBlur={handleSeedWordsOnBlur}
          colortheme={colortheme}
        />
      </div>
    );
  }
}

export default withTranslation()(ImportSeedPhrase);
