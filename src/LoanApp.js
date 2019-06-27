import React from 'react';
import LoanData from './LoanData';

class LoanApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            creditScore: 0,
            loanAmount: 0,
            approved: false,        // hard coded
            duration: 24,           // hard coded
            interestRate: 1.5,      // hard coded
            responseBody: null,     // deprecated
            applicant: null,        // for applicant object | response set
            loan: null,             // for loan object | response set
            recommendation: null,   // for recommendation object | response set
            showData: false
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
        
        var payload = {
            lookup: 'default-stateless-ksession',
            commands: [
              {
                insert: {
                  object: {
                    'com.redhat.demos.dm.loan.model.Applicant': {
                      creditScore: this.state.creditScore,
                      name: this.state.name
                    }
                  },
                  'out-identifier': 'applicant'
                }
              },
              {
                insert: {
                  object: {
                    'com.redhat.demos.dm.loan.model.Loan': {
                      //amount: 2500,
                      amount: this.state.loanAmount,
                      approved: false,
                      duration: 24,
                      interestRate: 1.5
                    }
                  },
                  'out-identifier': 'loan'
                }
              },
              {
                'fire-all-rules': {}
              },
              {
                'get-objects': {
                  'out-identifier': 'objects'
                }
              },
              {
                dispose: {}
              }
            ]
        }

        // api endpoint call
       fetch('http://localhost:8080/kie-server/services/rest/server/containers/instances/loan-application_1.1.0', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic cGFtQWRtaW46cmVkaGF0cGFtMSE=',
            },
            body: JSON.stringify(payload),
            //body: JSON.stringify('{"lookup": "default-stateless-ksession","commands": [{"insert": {"object": {"com.redhat.demos.dm.loan.model.Applicant": {"creditScore": 120,"name": "Howard Grant"}},"out-identifier": "applicant"}},{"insert": {"object": {"com.redhat.demos.dm.loan.model.Loan": {"amount": 2500,"approved": false,"duration": 24,"interestRate": 1.5}},"out-identifier": "loan"},{"fire-all-rules": {}},{"get-objects": {"out-identifier": "objects"}},{"dispose": {}}]}'),
        })
        //.then(response => response.json())
        .then( function(response){return response.json()})
        .then(data => this.setState(function(state,props){
            let recom = null; // for recommendation
            if(data.result["execution-results"].results[1].value.length == 3 ){
                recom = data.result["execution-results"].results[1].value[2]["com.redhat.demos.dm.loan.model.Recommendation"];
            }
            return{
                    applicant: data.result["execution-results"].results[1].value[0]["com.redhat.demos.dm.loan.model.Applicant"],
                    loan:  data.result["execution-results"].results[1].value[1]["com.redhat.demos.dm.loan.model.Loan"],
                    recommendation:  recom,
                    showData: true,
            }
        },console.log(data)));
        // .then(data => this.setState({ 
        //     applicant: data.result["execution-results"].results[1].value[0]["com.redhat.demos.dm.loan.model.Applicant"],
        //     loan:  data.result["execution-results"].results[1].value[1]["com.redhat.demos.dm.loan.model.Loan"],
        //     // TODO add code to handle recommendations | commented out to resolve 'cannot read undefined issue'
        //     //recommendation:  data.result["execution-results"].results[1].value[2]["com.redhat.demos.dm.loan.model.Recommendation"],
        //     showData:true,
        // },console.log(data)));
    }

    render() {
    const data = this.state;
    const showData = this.state.showData;

      return (
        <div className="App container">
            <div className="row">
                <div className="col-md-6">
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
                </div>
                <div className="col-md-6">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Loan Info:</h5>
                    </div>
                    {showData ? (
                        <LoanData data={data}/>
                    ): <span className="alert alert-light" role="alert"> Not available </span>}
                </div>
            </div>
        </div>
      );
    }
}

export default LoanApp;