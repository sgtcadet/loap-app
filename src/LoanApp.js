import React from 'react';

class LoanApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            creditScore: 0,
            loanAmount: 0,
            approved: false,    // hard coded
            duration: 24,       // hard coded
            interestRate: 1.5   // hard coded
        };
    
        //this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //this.setState({value: event.target.value});
        this.setState({
            [name]: value
        });
      }
    
    handleSubmit(event) {
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();

        // api endpoint call
        fetch('https://mywebsite.com/endpoint/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
            }),
        });
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>
                Name:
                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInputChange} />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Credit Score:
                    <input type="text" className="form-control" name="creditScore" value={this.state.creditScore} onChange={this.handleInputChange}/>
                </label>
            </div>
            <div className="form-group">
                <label>
                    Loan Amount:
                    <input type="text" className="form-control" name="loanAmount" value={this.state.loanAmount} onChange={this.handleInputChange}/>
                </label>
            </div>
            <div className="form-group">
                <input type="submit" className="btn btn-primary" value="Submit" />
            </div>
      </form>
      );
    }
}

export default LoanApp;