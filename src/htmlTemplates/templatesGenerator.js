export function getTemplate(event) {

 switch (event.type) {
  case'PullRequestEvent':
    return (
    `<div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <p class="heading">Jan 21, 2016</p>
        <div class="content">
              <span class="gh-username">
                <img src=${event.actor.avatar_url}/>
                <a href="${event.actor.url}">${event.actor.display_login}</a>
              </span>
              ${event.payload.action}
          <a href="${event.payload.pull_request.url}">
          pull request
          </a>
          <p class="repo-name">
            <a href="${event.repo.url}">${event.repo.name}</a>
          </p>
        </div>
      </div>
    </div>`
    );
  case 'PullRequestReviewCommentEvent': 
    return (
      `<div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <p class="heading">Jan 21, 2016</p>
          <div class="content">
                <span class="gh-username">
                  <img src=${event.actor.avatar_url}/>
                  <a href="${event.actor.url}">${event.actor.display_login}</a>
                </span>
                ${event.payload.action}

            <a href="${event.payload.comment.url}">
            comment
            </a> to  

            <a href="${event.payload.pull_request.url}">
            pull request
            </a>

            <p class="repo-name">
              <a href="${event.repo.url}">${event.repo.name}</a>
            </p>
          </div>
        </div>
      </div>`
      );
  default:
    return 'Ups.. Some error';
  }
}
