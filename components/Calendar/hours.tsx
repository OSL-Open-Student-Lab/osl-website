import React, { useState, useRef, useMemo, useEffect } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface HoursArray {
	value: string
}

interface HoursPageProps {
	occupiedHourses?: HoursArray[],
}

export function HoursPage({ occupiedHourses }: HoursPageProps): JSX.Element {
	const hoursMassive = [...Array(12).keys()];
	const chosenHourses = useRef([]);
	useEffect(() => {
		chosenHourses.current = [];
	}, [occupiedHourses])
	return (
		<div className='hours'>
			<Scrollbars style={{ height: '100%', width: '100%' }} className="hours__content-wrapper">
				<ButtonGroup
					className='hours__container d-grid'
				>
					{hoursMassive.map((index) => {
						const hourValue = 8 + index;
						const [hourState, setHourState] = useState(false);
						const hourHandler = () => {
							if (!chosenHourses.current.includes(hourValue)) {
								chosenHourses.current.push(hourValue);
							}
							else {
								chosenHourses.current = chosenHourses.current.filter(e => e !== hourValue) // delete element from sending massiv
							}
							setHourState(!hourState)
						}
						useEffect(() => {
							setHourState(false)
						}, [occupiedHourses])
						return (
							<div className='hour' key={index}>
								<div className="hour__content-wrapper"
								>
									<Hour
										isOccupied={occupiedHourses[index]} // свободно время или нет
										mainContent={hourValue}
										key={index}
										onClick={hourHandler}
										isChosen={hourState}
									/>
								</div>
							</div >
						)
					})}
				</ButtonGroup>
			</Scrollbars>
		</div >
	)
}
interface HourProps {
	isOccupied: boolean,
	mainContent: string,
	isChosen: boolean,
	onClick?: () => void
}

function Hour({ isOccupied, mainContent, isChosen, onClick }: HourProps): JSX.Element {
	return (
		<Button
			onClick={onClick}
			variant={isOccupied ? 'outline-danger' : isChosen ? 'success' : 'outline-primary'}
			id={`hour${mainContent}`}
			disabled={isOccupied}
			value={mainContent}
			active={isChosen}
		>
			{mainContent}
		</Button>
	)
}
