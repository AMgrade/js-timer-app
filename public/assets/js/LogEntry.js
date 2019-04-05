import { formatTime } from "./helpers/format.js";
import { createEl } from "./helpers/createElement.js";

export default class LogEntry {

  constructor() {
    this.clearValue();
    this.render();
  }

  isRunning() {
    return !!this.timeInterval;
  }

  start() {
    this.date = Date.now();
    this.userId = firebase.auth().currentUser.uid;

    this.timeInterval = setInterval(() => {
      this.timeTracked += 1000;
      this.$timer.innerText = formatTime(this.timeTracked);
    }, 1000)
  }

  stop() {
    // stop interval
    clearInterval(this.timeInterval);
    delete this.timeInterval;

    // set value
    this.description = this.$inputDesc.value;
    // TODO: set ID and project

    this.save();

    this.clearValue();

    // clear fields
    this.$inputDesc.value = '';
    this.$timer.innerText = formatTime(this.timeTracked);
    // TODO: clear projects
  }

  registerHandlers() {
    this.$btnHandler.addEventListener('click', () => {

      if (this.isRunning()) {
        this.stop();
        console.log(`Timer is stopped: ${this.isRunning()}`);
        console.log(`----------------`);
      }
      else {
        this.start();
        console.log(`Timer is started: ${this.isRunning()}`);
      }

      this.toggleBtn();
    });
  }

  render() {
    this.$container = document.querySelector('.timer-wrapper');
    this.$inputDesc = createEl('input', 'form-control timer-desc', '', {name: 'placeholder', value: 'Description'});
    this.$project = createEl('button', 'btn btn-outline-primary', 'Select Project');
    this.$timer = createEl('div', 'timer-value', formatTime(this.timeTracked));
    this.$btnHandler = createEl('button', 'btn btn-block m-0 timer-handler', '', {name: 'type', value: 'button'});

    let $inputDescWrapper = createEl('div', 'col', this.$inputDesc);
    let $project = createEl('div', 'col-auto', this.$project);
    let $timer = createEl('div', 'col-auto', this.$timer, {name: 'style', value: 'flex: 0 0 105px'});
    let $btnHandler = createEl('div', 'col-auto', this.$btnHandler, {name: 'style', value: 'flex: 0 0 150px'});

    this.$wrapper = createEl('div', 'row align-items-center', [$inputDescWrapper, $project, $timer, $btnHandler]);

    this.$container.appendChild(this.$wrapper);

    this.toggleBtn();

    this.registerHandlers();
  }

  save() {
    if (this.isRunning()) {
      return false;
    }

    firebase.database().ref('logEntry/' + this.userId).push({
      date: this.date,
      timeTracked: this.timeTracked,
      description: this.description
    });
    // TODO: save project
  }

  clearValue() {
    this.id = null;
    this.date = null;
    this.timeTracked = 0;
    this.description = '';
    this.project = '';
  }

  toggleBtn() {
    if (this.isRunning()) {
      this.$btnHandler.classList.add('btn-outline-danger');
      this.$btnHandler.classList.remove('success');
      this.$btnHandler.innerHTML = 'Stop Timer';
    } else {
      this.$btnHandler.classList.add('btn-outline-success');
      this.$btnHandler.classList.remove('btn-outline-danger');
      this.$btnHandler.innerHTML = 'Start Timer';
    }
  }

  remove() {
    if (this.isRunning()) {
      this.stop();
    }

    if (this.$container.hasChildNodes(this.$wrthiser)) {
      this.$container.removeChild(this.$wrapper);
    }
  }
}
