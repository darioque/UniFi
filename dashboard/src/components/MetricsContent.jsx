import React, { Component } from 'react'
import MetricsCard from './MetricsCard'

const array = [
	{
		title: 'ASSETS IN DATA BASE',
		color: 'primary',
		number: '21',
		icon: 'fa-film'
	},
	{
		title: 'TOTAL USERS',
		color: 'success',
		number: '79',
		icon: 'fa-award'
	},
	{
		title: 'TOTAL TRANSACTIONS',
		color: 'warning',
		number: '49',
		icon: 'fa-user'
	},
]

class MetricsContent extends Component {
	render() {
		return (
			<div className="row">
				{array.map(card => {
					return <MetricsCard key={card.title} title={card.title} number={card.number} color={card.color} icon={card.icon}></MetricsCard>
				})}
			</div>
		);
	}
}

export default MetricsContent