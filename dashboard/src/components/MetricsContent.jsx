import React, { Component } from 'react'
import MetricsCard from './MetricsCard'

const array = [
	{
		title: 'ASSETS IN DATA BASE',
		color: 'primary',
		icon: 'fa-coin',
		number: 0,
	},
	{
		title: 'TOTAL USERS',
		color: 'success',
		icon: 'fa-user',
		number: 0,
	},
	{
		title: 'TOTAL TRANSACTIONS',
		color: 'warning',
		icon: 'fa-sync-alt',
		number: 0,
	},
]

class MetricsContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: array,
		}
	}


	async getData() {
		const assetsResponse = await fetch('http://localhost:3001/api/markets/')
		const usersResponse = await fetch('http://localhost:3001/api/users/')
		const transactionsResponse = await fetch('http://localhost:3001/api/transactions')
		const assets = await assetsResponse.json().meta.count
		const users = await usersResponse.json().meta.count
		const transactions = await transactionsResponse.json().meta.count;
		this.setState({
			assets: assets,
			users: users,
			transactions: transactions,
		})
	}

	componentDidMount() {
		this.getData()
	}

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