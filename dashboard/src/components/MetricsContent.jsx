import React, { Component } from 'react'
import MetricsCard from './MetricsCard'

const array = [
	{
		title: 'ASSETS IN DATA BASE',
		color: 'primary',
		icon: 'fa-solid fa-coins',
	},
	{
		title: 'TOTAL USERS',
		color: 'success',
		icon: 'fa-user',
	},
	{
		title: 'TOTAL TRANSACTIONS',
		color: 'warning',
		icon: 'fa-sync-alt',
	},
]

class MetricsContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	
	async getData() {
		const assetsResponse = await fetch('http://localhost:3001/api/markets/')
		const usersResponse = await fetch('http://localhost:3001/api/users/')
		const transactionsResponse = await fetch('http://localhost:3001/api/transactions')
		const assetsJson = await assetsResponse.json()
		const assets = assetsJson.meta.count;
		const usersJson = await usersResponse.json()
		const transactionsJson = await transactionsResponse.json();
		const users = usersJson.count;
		const transactions = transactionsJson.meta.count;
		this.setState({
			data: [assets, users, transactions]
		})
	}

	componentDidMount() {
		this.getData()
	}

	render() {
		return (
			<div className="row">
				{array.map((card, i) => {
					return <MetricsCard key={card.title} title={card.title} number={this.state.data[i]?this.state.data[i]:'0'} color={card.color} icon={card.icon}></MetricsCard>
				})}
			</div>
		);
	}
}

export default MetricsContent