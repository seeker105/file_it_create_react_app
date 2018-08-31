import React from 'react';
import {Link} from 'react-router-dom';
import store from '../store/configureStore';
import Header from './Header';
import {getPlanPrice, getPlanDetails} from '../utilities/planData';
import {history} from '../App';

export default class CheckoutPage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    history.push('/order-confirmation-page');
  }

  render () {
    return (
      <div>
        <Header />
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Place Order</h1>
          </div>
        </div>
        <div className="order-placement-container">
          <div className="small-content-container">
            <h3 className="plan-info">Selected Plan: {getPlanDetails(store.getState().newAccountType)}</h3>
            <h3 className="plan-info">Price: ${getPlanPrice(store.getState().newAccountType)}.00</h3>
            <form onSubmit={this.onSubmit}>
              <p className="fieldset-label">Name on Card:</p>
              <fieldset>
                <div className="form-container">
                  <label className="label-style">First Name</label>
                  <input type="text" id="checkout-first-name-field" className="input-style" placeholder="First Name"/>
                  <label className="label-style">Last Name</label>
                  <input type="text" id="checkout-last-name-field" className="input-style" placeholder="Last Name"/>
                </div>
              </fieldset>
              <p className="fieldset-label">Billing Address:</p>
              <fieldset>
                <div className="form-container">
                  <label className="label-style">Street</label>
                  <input type="text" id="checkout-street-field" className="input-style" placeholder="Street"/>
                  <label className="label-style">City</label>
                  <input type="text" id="checkout-city-field" className="input-style" placeholder="City"/>
                  <div className="state-zip-container">
                    <div className="state-container">
                      <label className="label-style">State</label>
                      <input type="text" id="checkout-state-field" className="input-style" placeholder="State" maxLength="2"/>
                    </div>
                    <div className="zip-container">
                      <label className="label-style">Zip</label>
                      <input type="text" id="checkout-zip-field" className="input-style" placeholder="Zip"/>
                    </div>
                  </div>

                </div>
              </fieldset>
              <button className="button">Place Order</button>
            </form>
          </div>
        </div>


      </div>
    )
  }
}
