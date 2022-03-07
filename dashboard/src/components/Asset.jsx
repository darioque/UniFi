import React from 'react'

function Asset(props) {
	return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.typeId}</td>
            <td>{props.type}</td>

        </tr>
    );

}

export default Asset