<h1 align="center">CMD</h1></br>
<p align="center">
   
  <a href="https://android-arsenal.com/api?level=21"><img alt="API" src="https://img.shields.io/badge/API-21%2B-brightgreen.svg?style=flat"/></a>
</p>

## Overview
This is The Web repository for CMD project.

## Contributing
- Fork the project.
- Clone your own forked repository, run `git clone "https://github.com/[your_github_username]/cmd_web_app.git"`

Add remote upstream using the command `git remote add upstream "https://github.com/thecmdteam/cmd_web_app.git"`

- run: `git fetch upstream` - You must fetch from develop before or after checkout<br/>
- run: `git merge upstream/develop` - Merge updates from upstream<br/>
- `git checkout -b feat/user-login` - You are in the feat/user-login branch now<br/>
To push to github;<br/>
- `git add .`<br/>
- `git commit -m "feat: implemented user login"`<br/>
- `git push origin feat/user-login` - note how it ends with a branch. <br/>

### Commit Message Format: `chore`, `feature`, `bug`
For a feature: `git commit -m "feat: implemented user log-in"`<br/>
For a bug: `git commit -m "bug: fixed inconsistency in log in screen"`<br/>
For a chore: `git commit -m "chore: updated read me to include API endpoints"`<br/>

- Create your PR to the `develop` branch of this repository.
### When making a PR, your PR is expected to have the following comments:<br/>
- What is the task completed ?<br/>
- What the PR actually does  ?<br/>
- How can this PR be manually tested ?<br/>
- Any background contexts ? (maybe something a tester might not notice and be useful for testing)
- Screenshots (of your implementation - a web page, a mobile app screen or an API payload