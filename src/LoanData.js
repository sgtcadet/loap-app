import React from 'react';

class LoanApp extends React.Component {
    constructor(props){
        super(props)
    }


    render(){
        return(
            <div className="modal-body">
                <div className="alert alert-dark" role="alert">
                    <p>Applicant Data: </p>
                    <p>Name: {this.props.data.applicant.name}</p> 
                    <p>Credit Score:{this.props.data.applicant.creditScore}</p>
                </div>
                <div className={"alert " + (this.props.data.loan.approved ? 'alert-success' : 'alert-danger')} role="alert">
                    <p>Loan Data: </p>
                    <p>Status: {this.props.data.loan.approved ? 'Approved' : 'Denied'}</p>
                    <p>Reason: {this.props.data.loan.reason}</p>
                    <p>Amount Requested: {this.props.data.loan.amount}</p>
                    { this.props.data.recommendation ? <p className="alert alert-warning" role="alert">Recommendation: {this.props.data.recommendation.text}</p>: <span></span>}
                </div>
            </div>
        );
    }

}

export default LoanApp;