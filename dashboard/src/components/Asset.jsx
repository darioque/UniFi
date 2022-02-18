import React from 'react'

function Asset(props) {
	return (
        <tr>
            <th scope="row">{props.id}</th>
            <td>{props.name}</td>
            <td>{props.ticker}</td>
            <td>{props.price}</td>
            <td>{props.supply}</td>
            <td>{props.mcap}</td>
        </tr>
    );

}

export default Asset