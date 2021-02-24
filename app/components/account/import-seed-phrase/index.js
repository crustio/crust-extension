import React, { Component } from 'react';
import ContentHeader from '../../common/content-header';
import CrustMultilineInput from '../../common/crust-multiline-input';
import { withTranslation } from 'react-i18next';
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
      t,
    } = this.props;
    return (
      <div>
        <ContentHeader
          title={t("Import Seed Phrase")}
          description={t("Please input your seed phrase to import account.")}
        />
        <CrustMultilineInput
          className="import-seed-phrase-input"
          placeholder={t("Type or paste your seed phrase...")}
          error={isError}
          helperText={errorMessage}
          onChange={onChange(importSeedPhraseInputName)}
          value={seedWords}
          name={importSeedPhraseInputName}
          inputRef={seedRef}
          onBlur={handleSeedWordsOnBlur}
        />
      </div>
    );
  }
}

export default withTranslation()(ImportSeedPhrase);
