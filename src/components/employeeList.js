import React, { useState, useEffect } from 'react'
import EmployeeItem from './employeeItem';

const EmployeeList = () => {
    const [list, setList] = useState([]);
    const [newEmployee, setNewEmployee] = useState({id:"",name:"",salary:"",age:""});
    const fetchData = async () => {
        try {
            const response = await fetch(`https://settyl-backend.herokuapp.com/employee/getemployee`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const employee = await response.json();
            setList(employee);
        } catch (error) {
            console.log(error);
        }
    }
    const onChange=(e)=>{
        setNewEmployee({...newEmployee,[e.target.name]:e.target.value})
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleClick = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`https://settyl-backend.herokuapp.com/employee/addemployee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: newEmployee.id,employee_name: newEmployee.name,employee_age: newEmployee.age,employee_salary: newEmployee.salary})
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='mx-4 my-4'>
                <table className="table table-responsive table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list.map((employee) => {
                                return <EmployeeItem key={employee.id} id={employee.id} name={employee.employee_name} salary={employee.employee_salary} age={employee.employee_age} />
                            }
                            )
                        }
                    </tbody>
                </table>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                    Add Employee
                </button>

                <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Employee</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="id" className="form-label">Id</label>
                                        <input type="text" className="form-control" id="id" name="id" aria-describedby="id" value={newEmployee.id} onChange={onChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={newEmployee.name} onChange={onChange} minLength={3} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input type="text" className="form-control" id="age" name="age" value={newEmployee.age} onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="salary" className="form-label">Salary</label>
                                        <input type="text" className="form-control" id="salary" name="salary" value={newEmployee.salary} onChange={onChange} />
                                    </div>
                                    <button disabled={newEmployee.name.length < 3  || newEmployee.age.length < 1 || newEmployee.salary.length < 1} type="submit" className="btn btn-primary" onClick={handleClick} data-dismiss="modal">Add Employee</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeList