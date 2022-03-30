import { ToggleButton, Row, Col } from 'react-bootstrap'

interface SheduleProps {
  disabledHours?: Array<[number, number]>
  selectedHours?: Array<[number, number]>
  onSelectHours?: () => void
}

export function Shedule({
  disabledHours,
  selectedHours,
  onSelectHours
}: SheduleProps): JSX.Element {
  return (
    <Col className="d-inline-flex flex-wrap w-100 h-100 shedule">
      {Array(4)
        .fill(null)
        .map((_itemH, indexH) => (
          <>
            {Array(6)
              .fill(null)
              .map((_itemL, indexL) => {
                const hour = indexH * 6 + indexL + 1
                const isDisabled = disabledHours
                  ? disabledHours.reduce((disabled, hours) => {
                      if (!disabled) {
                        return hours[0] <= hour && hour < hours[1]
                      }
                      return disabled
                    }, false)
                  : false
                return (
                  <Col key={indexL}>
                    <ToggleButton
                      variant="danger"
                      type="checkbox"
                      className="shadow-0 w-100 border-0 m-3"
                      disabled={isDisabled}
                      checked={false}
                      value={hour}
                    >
                      {`${hour}${hour < 24 ? `-${hour + 1}` : ``}`}
                    </ToggleButton>
                  </Col>
                )
              })}
          </>
        ))}
    </Col>
  )
}
