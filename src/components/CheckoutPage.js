import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getPlanPrice, getPlanDetails} from '../utilities/planData';
import {setAccountType} from "../actions/profile";
import firebase from '../firebase/firebase';

export class CheckoutPage extends React.Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.props.newAccountType);
    firebase.database().ref('users/' + this.props.user.uid + '/accountType').set(this.props.newAccountType)
    console.log("submitted");
    this.props.history.push('/order-confirmation-page');
  }

  render () {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Place Order</h1>
          </div>
        </div>
        <div className="order-placement-container">
          <div className="small-content-container">
            <h3 className="plan-info">Selected Plan: {getPlanDetails(this.props.newAccountType)}</h3>
            <h3 className="plan-info">Price: ${getPlanPrice(this.props.newAccountType)}.00</h3>
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

              <p className="fieldset-label">Credit Card:</p>
              <fieldset>
                <div className="form-container">
                  <label className="label-style">Card Number</label>
                  <input type="text" id="checkout-card-number-field" className="input-style" placeholder="Card Number"/>
                  <div className="state-zip-container">
                    <div className="state-container">
                      <label className="label-style">CVW</label>
                      <input type="text" id="checkout-cvw-field" className="input-style" maxLength="3"/>
                    </div>
                    <div className="zip-container">
                      <label className="label-style">Month</label>
                      <select id="checkout-month-field" className="select-style">
                        <option value=""></option>
                        <option value="1">01</option>
                        <option value="2">02</option>
                        <option value="3">03</option>
                        <option value="4">04</option>
                        <option value="5">05</option>
                        <option value="6">06</option>
                        <option value="7">07</option>
                        <option value="8">08</option>
                        <option value="9">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div className="zip-container">
                      <label className="label-style">Year</label>
                      <select id="checkout-year-field" className="select-style">
                        <option value=""></option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                        <option value="2031">2031</option>
                        <option value="2032">2032</option>
                        <option value="2033">2033</option>
                        <option value="2034">2034</option>
                        <option value="2035">2035</option>
                        <option value="2036">2036</option>
                        <option value="2037">2037</option>
                        <option value="2038">2038</option>
                        <option value="2039">2039</option>
                        <option value="2040">2040</option>
                      </select>
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

const mapStateToProps = (state) => {
  return {
    newAccountType: state.newAccountType,
    user: state.credential.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (newAccountType) => dispatch(setAccountType(newAccountType))
  }
};

// ConnectedCheckoutPage
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
