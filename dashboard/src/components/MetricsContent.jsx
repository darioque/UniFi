import React from 'react'
import MetricsCard from './MetricsCard'
const array = [
	{
		title: 'MOVIES IN DATA BASE',
		color: 'primary',
		number: '21',
		icon: 'fa-film'
	},
	{
		title: 'TOTAL AWARDS',
		color: 'success',
		number: '79',
		icon: 'fa-award'
	},
	{
		title: 'Actors Quantity',
		color: 'warning',
		number: '49',
		icon: 'fa-user'
	},
]
function MetricsContent() {
	return (
        <div className="row">
			{array.map(card => {
				return <MetricsCard key={card.title} title={card.title} number={card.number} color={card.color} icon={card.icon}></MetricsCard>
			})}
        </div>
    );
}

export default MetricsContent