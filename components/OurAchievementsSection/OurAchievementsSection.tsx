import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import AchievementsList from './AchievementsList'

const OurAchievementsSection: FC = () => {
	return (
		<div className='achievements-section' style={{ marginBottom: 60 }}>
			<Container fluid>
				<h2
					className='text-center mb-5 display-5 achievements-section__title'
					style={{ borderBottom: '1px solid gray', margin: 'auto', maxWidth: 355 }}
				>
					Наши достижеия</h2>
				<AchievementsList />
			</Container>
		</div>
	)
}

export default OurAchievementsSection