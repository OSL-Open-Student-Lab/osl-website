import React, { FC } from 'react'
import { Container } from 'react-bootstrap'
import ProjectList from './ProjectList'

const ProjectSection: FC = () => {
	return (
		<div className='project-section' style={{ marginBottom: 120 }}>
			<Container fluid className='p-0'>
				<h2
					className='mb-2 display-5 project-section__title'>
					Проекты и гранты</h2>
				<p className='mb-5 pb-2 lead project-section__subtitle'
					style={{}}>
					Здесь размещены наши проекты и гранты в которых мы учавствовали</p>
				<ProjectList className='mb-5' />
			</Container>

		</div>
	)
}

export default ProjectSection