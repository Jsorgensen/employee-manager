import React, {Component} from 'react'

class EmployeeEditor extends Component{
    constructor(){
        super()
        this.state = {
            employee: null,
            originalEmployee: null,
            notModified: true
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    handleUpdate(key, val){
        if(this.state.notModified)
            this.setState({notModified: false})

        var employeeCopy = Object.assign({}, this.state.originalEmployee);
        employeeCopy[key] = value;

        this.setState({
            employee: employeeCopy,
            notModified: false
        })
    }

    save(){
        this.state.originalEmployee.updateName(this.state.employee.name);
        this.state.originalEmployee.updatePhone(this.state.employee.phone);
        this.state.originalEmployee.updateTitle(this.state.employee.title);
        this.setState({notModified: true})
        this.props.refresh();
    }

    cancel(){
        var employeeCopy = Object.assign({}, this.state.originalEmployee);
        this.setState({employee: employeeCopy});
    }

    render(){
        return(
            <div className='infoCard'>
                {
                this.state.employee ?
                    <div>
                        <span id='employeeID'>ID: {this.originalEmployee.id}</span>
                        <p id='employeeTitle'>{this.state.originalEmployee.name}</p>
                        <br/>
                        <button className='confirmationButton' id='saveButton' onClick={()=>this.save()} disabled={this.state.notModified}>Save</button>
                        <button className='confirmationButton' id='cancelButton' onClick={()=>this.cancel()} disabled={this.state.notModified}>Cancel</button>
                        <br/>
                        <span className='placeholderText'>Name</span>
                        <input className='materialInput' value={this.state.employee.name} onChange={(e)=>this.handleUpdate('name', e.target.value)}></input>
                        <span className='placeholderText'>Phone Number</span>
                        <input className='materialInput' value={this.state.employee.phone} onChange={(e)=>this.handleUpdate('phone', e.target.value)}></input>
                        <span className='placeholderText'>Title</span>
                        <input className='materialInput' value={this.state.employee.title} onChange={(e)=>this.handleUpdate('title', e.target.value)}></input>
                    </div>
                :
                <p id='noEmployee'>No Employee Selected</p>
                }
            </div>
        )
    }
}

export default EmployeeEditor;