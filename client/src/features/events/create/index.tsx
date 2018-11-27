import * as React from 'react'
import { Container, ICONS, Tab, Tabs } from 'src/ui'
import EventInformation from './EventInformation'

export class EventCreate extends React.PureComponent {
  state = { step: 0 }

  setStep = (step: number) => () => {
    this.setState({ step })
  }

  isStepActive = (step: number) => {
    return this.state.step === step
  }

  render() {
    return (
      <Container>
        <Tabs isBoxed>
          <Tab icon={ICONS.faPencilAlt} isActive={this.isStepActive(0)} onClick={this.setStep(0)} text="Information" />
          <Tab icon={ICONS.faUserCog} isActive={this.isStepActive(1)} onClick={this.setStep(1)} text="Slots" />
          <Tab icon={ICONS.faSearch} isActive={this.isStepActive(2)} onClick={this.setStep(2)} text="Review" />
        </Tabs>

        <Container hidden={!this.isStepActive(0)}>
          <EventInformation />
        </Container>
      </Container>
    )
  }
}
