import React from 'react';
import {Link} from 'react-router-dom';
import store from '../store/configureStore';
import Header from './Header';
import {getPlanPrice} from '../utilities/prices';

export default class ProfilePage extends React.Component {
  constructor (props) {
    super(props);
    const accountType = store.getState().accountType;

    this.state = {
      accountType,
      price: getPlanPrice(accountType),
      difference: 0
    }
  }

  onRadioChange = (e) => {
    const currentPrice = getPlanPrice(store.getState().accountType)
    const newAccountType = e.target.value;
    const difference = getPlanPrice(newAccountType) - currentPrice;
    this.setState({
      accountType: newAccountType,
      difference
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  }

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
            <button className="button">Checkout</button>
          </form>
          <p>*Note: Changes made will take effect at the start of the next billing cycle</p>
        </div>

      </div>
    )
  }
}
