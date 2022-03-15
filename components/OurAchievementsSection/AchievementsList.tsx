import Link from 'next/link'
import React, { FC } from 'react'
import { Container, Image, Col, Button } from 'react-bootstrap'
const pic = '/pic.png'

const AchievementsList: FC = () => {
	const ListArr = [
		{
			pic,
			header: 'First slide label',
			text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
		},
		{
			pic,
			header: 'Second slide label',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		},
		{
			pic,
			header: 'Third slide label',
			text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
		},
		{
			pic,
			header: 'Fourth slide label',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		}
	]
	return (
		<div className="achievements-list">
			<Container fluid>
				{ListArr.map((item, index) => (
					<Col
						className='d-flex flex-column'
						md={12}
						key={index}
						style={{
							alignItems: index % 2 === 0 ?
								'flex-start' : 'flex-end'
						}}>
						<Image
							src={item.pic}
							alt={item.pic}
							width={400}
							height={300}
						/>
						<h3 className=''>{item.header}</h3>
						<p
							className=''
							style={{
								textAlign:
									index % 2 === 0 ?
										'left'
										:
										'right',
								maxWidth: 900,
							}}
						>{item.text.repeat(5)}</p>
						<Link href={'#'}>
							<Button variant='danger'>
								перейти
							</Button>
						</Link>
					</Col>
				))}
			</Container>
		</div>
	)
}

export default AchievementsList