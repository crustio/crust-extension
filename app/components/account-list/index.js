/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemCard from '../common/list-item-card';
import './styles.css';

class AccountList extends Component {
  constructor(props) {
    super(props);
    this.accountsEndRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.accounts && prevProps.accounts.length !== this.props.accounts.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.accountsEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  render() {
    const {
      classes,
      accounts,
      onCopyAddress,
      currentAccount,
      handleChangeAccount,
      colortheme,
      theme,
      network,
      selectedAccounts,
      updateSelectedAccounts,
      ...otherProps
    } = this.props;
    return (
      <div {...otherProps}>
        <List
          classes={{
            root: classes.root,
          }}
        >
          {accounts.map((account, index) => (
            <ListItemCard
              key={index}
              theme={theme}
              listItem={account}
              handleListItemAvatarClick={updateSelectedAccounts}
              handleListItemClick={handleChangeAccount}
              primaryText={account.alias}
              address={account.address}
              onCopyAddress={onCopyAddress}
              isActive={currentAccount.address === account.address}
              className="account-card-container"
              style={{
                background: colortheme.card,
                border: currentAccount.address === account.address ? '1px solid #4F4D59' : 'none',
              }}
              colortheme={colortheme}
              network={network}
              customModal={false}
              showRadio
              isSelected={selectedAccounts.findIndex(e => e.address === account.address) !== -1}
            />
          ))}
        </List>
        <div ref={this.accountsEndRef} />
      </div>
    );
  }
}

const styles = () => ({
  root: {
    paddingTop: '0px !important',
  },
});

export default withStyles(styles)(AccountList);
