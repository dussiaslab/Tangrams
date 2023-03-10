import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GroupQuiz extends React.Component {
  state = {
    nParticipants: "",
    scoreOption: "",
    idle: "",
    largeError: "",
    mc_red: false,
    mc_yellow: false,
    mc_green: false,
    mc_blue: false,
    num_players: 0,
    teamColor: "",
    community: "",
  };

  componentDidMount() {
    const { game } = this.props;
    document.querySelector("main").scrollTo(0,0)
    this.state.num_players = game.treatment.playerCount + 2;
    this.state.teamColor = game.treatment.teamColor;
  }

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleRadioChange = (event) => {
    const el = event.currentTarget;
    console.log("el", el);
    console.log("ev", event);
    this.setState({ [el.name]: el.value });
  };

  handleEnabledChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: !this.state[el.name] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.scoreOption !== "all" ||
      this.state.largeError !== "0"
    ) {
      AlertToaster.show({
        message:
          "Lo sentimos, tienes uno o más errores. Por favor, asegúrate de responder correctamente a las preguntas o vuelve a las instrucciones.",
      });
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, onPrev, game, treatment } = this.props;
    return (
      <Centered>
        <div className="CUESTIONARIO">
          <h1 className={"bp3-heading"}> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
            <div className="bp3-form-group">
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Seleccione la afirmación verdadera sobre la puntuación:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.scoreOption}
                  name="scoreOption"
                  required
                >
                  <Radio
                    label="Sumaré puntos basándome sólo en lo que yo haga, sin importar lo que haga mi compañero."
                    value="single"
                  />
                  <Radio
                    label="Mi compañero y yo trabajamos en equipo y, por tanto, ambos obtendremos la misma puntuación."
                    value="all"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <label className="bp3-label" htmlFor="number-of-participants">
              Si NO eliges un tangram antes de que se acabe el tiempo
              tu puntuación será:
              </label>
              <div className="bp3-form-content">
                <input
                  id="nParticipants"
                  className="bp3-input"
                  type="number"
                  min="-10"
                  max="10"
                  step="1"
                  dir="auto"
                  name="largeError"
                  value={this.state.largeError}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>

            {/*<div className="bp3-form-group">*/}
            {/*  <label className="bp3-label" htmlFor="neighbor-of-room-101">*/}
            {/*    Which community have you been placed into?*/}
            {/*  </label>*/}
            {/*  <div className="bp3-form-content ">*/}
            {/*    <div className="bp3-control bp3-checkbox">*/}
            {/*      <Checkbox*/}
            {/*        name={"mc_2_101"}*/}
            {/*        label="Room 101"*/}
            {/*        onChange={this.handleEnabledChange}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="bp3-control bp3-checkbox bp3-inline">*/}
            {/*      <Checkbox*/}
            {/*        name={"mc_2_102"}*/}
            {/*        label="Room 102"*/}
            {/*        onChange={this.handleEnabledChange}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="bp3-control bp3-checkbox bp3-inline">*/}
            {/*      <Checkbox*/}
            {/*        name={"mc_2_103"}*/}
            {/*        label="Room 103"*/}
            {/*        onChange={this.handleEnabledChange}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="bp3-control bp3-checkbox">*/}
            {/*      <Checkbox*/}
            {/*        name={"mc_2_104"}*/}
            {/*        label="Room 104"*/}
            {/*        onChange={this.handleEnabledChange}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="bp3-control bp3-checkbox">*/}
            {/*      <Checkbox*/}
            {/*        name={"mc_2_105"}*/}
            {/*        label="Room 105"*/}
            {/*        onChange={this.handleEnabledChange}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <button
              type="button"
              className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              Volver a las instrucciones
            </button>
            <button type="submit" className="bp3-button bp3-intent-primary">
              Enviar
              <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
            </button>
          </form>
        </div>
      </Centered>
    );
  }
}
