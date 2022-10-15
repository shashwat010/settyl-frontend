import React from 'react'

const EmployeeItem = (props) => {
    return (
        <>

            <tr>
                <th scope="row">{props.id}</th>
                <td>{props.name}</td>
                <td>{props.salary}</td>
                <td>{props.age}</td>
            </tr>
        </>
    )
}

export default EmployeeItem;