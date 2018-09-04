import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getPlanPrice} from '../utilities/planData';
import {setOrderValues} from '../actions/profile';

export class AccountTypeSelectionPage extends React.Component {
  constructor (props) {
    super(props);
    const accountType = props.accountType;

    this.state = {
      accountType,
      price: getPlanPrice(accountType),
      difference: 0
    }
  }

  onRadioChange = (e) => {
    const currentPrice = getPlanPrice(this.props.accountType);
    const newAccountType = e.target.value;
    const difference = getPlanPrice(newAccountType) - currentPrice;
    this.setState({
      accountType: newAccountType,
      difference
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.accountType);
    this.props.history.push('/checkout');
  };

  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Select Account Type</h1>
          </div>
        </div>
        <div className="note-container">
          *Note: Because this is a student project multiple account types are not implemented yet.
        </div>
        <div className="account-type-content-container">
          <div className="account-type-column">
            <h3>Free</h3>
            <div className="account-type-description">
              The basic account. 5GB free!
            </div>
          </div>
          <div className="account-type-column personal-account-type-column">
            <h3>Personal</h3>
            <div className="account-type-description">
              The Personal account. 10GB. $5/month. Perfect for individual use.
            </div>
          </div>
          <div className="account-type-column business-account-type-column">
            <h3>Business</h3>
            <div className="account-type-description">
              The Business account. 50GB for $50/month. Share files with your co-workers!
            </div>
          </div>
          <div className="account-type-column premium-account-type-column">
            <h3>Premium</h3>
            <div className="account-type-description">
              Best value! 100GB for $80/month. For those with large data needs.
            </div>
          </div>
        </div>

        <div className="account-type-form-content-container">
          <form onSubmit={this.onSubmit}>
            <div className="account-price-row">
              <div className="account-type-form-text">
                Please select the plan you would like. Price difference:
              </div>
              <div className="account-type-form-price">
                {this.state.difference !== 0 ? <span>${this.state.difference}.00</span> : ''}
              </div>
            </div>
            <fieldset className="form-container">
              <div>
                <input type="radio" name="account-type" value="0" id="plan0" onChange={this.onRadioChange} checked={this.state.accountType === "0"}/>
                <label htmlFor="plan0">Free plan</label>
              </div>
              <div>
                <input type="radio" name="account-type" value="1" id="plan1" onChange={this.onRadioChange} checked={this.state.accountType === "1"}/>
                <label htmlFor="plan1">Personal: 10GB $5/month</label>
              </div>
              <div>
                <input type="radio" name="account-type" value="2" id="plan2" onChange={this.onRadioChange} checked={this.state.accountType === "2"}/>
                <label htmlFor="plan2">Business: 50GB $50/month</label>
              </div>
              <div>
                <input type="radio" name="account-type" value="3" id="plan3" onChange={this.onRadioChange} checked={this.state.accountType === "3"}/>
                <label htmlFor="plan3">Premium: 100GB $80/month</label>
              </div>
            </fieldset>
            <button className="button" disabled={this.state.accountType === this.props.accountType}>Checkout</button>
          </form>
          <p>*Note: Changes made will take effect at the start of the next billing cycle</p>
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    accountType: state.accountType
  }
};

// The mapStateToProps function has the result of store.getState() automatically passed in as the first parameter.
// The mapDispatchToProps function has the store.dispatch function automatically passed in as the first parameter.
// The mapDispatchToProps function returns an object whose properties become available as props on our component.
// To use it, create an arrow function that accepts whatever external input you want to pass into the function (or
// it's nested functions). Have it call the dispatch function (and any action generators). Thus the prop becomes a
// function that, when invoked, calls store.dispatch with the appropriate action generator and passes into the action
// generator the value that you supplied.
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (accountType) => dispatch(setOrderValues(accountType))
  }
};

// ConnectedAccountTypeSelectionPage
export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeSelectionPage)
