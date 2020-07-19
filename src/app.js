import './assets/scss/app.scss';
import $ from 'cash-dom';
import { getTemplate } from './htmlTemplates/templatesGenerator';

const inputDOM = $('.username.input');
const loadButtonDOM = $('.load-username');
const userTimelineDOM = document.getElementById('user-timeline');


export class App {
  initializeApp() {
    loadButtonDOM.on('click', () => {

      if (this.validation(inputDOM.val())) {
        this.fetchData();
      } else {
        inputDOM.addClass('input--invalid');
      }

    })

    inputDOM.on('change', () => {
      if (inputDOM.hasClass('input--invalid')) {
        inputDOM.removeClass('input--invalid');
      }
    });
  }

  fetchData() {
    fetch('https://api.github.com/users/' + inputDOM.val())
      .then(response => response.json())
      .then(body => {
        this.profile = body;
        this.update_profile();
        this.fetchHistory();
      })
  }

  fetchHistory() {
    fetch(`https://api.github.com/users/${inputDOM.val()}/events/public`)
    .then(response => response.json())
    .then(body => {
      this.history = body;

      this.appendHistory();
    })
  }

  appendHistory() {
    let filteredBody = this.history.filter(el => {
      return el.type === 'PullRequestEvent' || el.type === 'PullRequestReviewCommentEvent';
    })

    let htmlHistory = ''

    for (let i = 0; i < filteredBody.length; i++) {
      htmlHistory += getTemplate(filteredBody[i]);
    }

    userTimelineDOM.innerHTML = htmlHistory;
  }

  validation(text) {
    const pattern = new RegExp(/^(\d|[a-z]|[\w_]|[\w-])+$/);
    return pattern.test(text);
  }

  update_profile() {
    $('#profile-name').text($('.username.input').val())
    $('#profile-image').attr('src', this.profile.avatar_url)
    $('#profile-url').attr('href', this.profile.html_url).text(this.profile.login)
    $('#profile-bio').text(this.profile.bio || '(no information)')
  }
}
