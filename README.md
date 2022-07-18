# BlacklistBot

Source code to host your own ban pool bot.

[![wakatime](https://wakatime.com/badge/github/isaacKenyon/Blacklist.svg?style=for-the-badge)](https://wakatime.com/badge/github/isaacKenyon/Blacklist)
![GitHub repo size](https://img.shields.io/github/repo-size/isaacKenyon/Blacklist?style=for-the-badge)
[![node-current](https://img.shields.io/node/v/discord.js?style=for-the-badge)](https://nodejs.org/en/)
[![Discord](https://img.shields.io/discord/828026052806443028?color=7289DA&label=Support%20Server&style=for-the-badge)](https://discord.gg/3Fx3y8XV7Y)

## Setting up the bot
### 1: Prerequisites
- [Git](https://git-scm.com/)
- [Node.js v16.9.0+](https://nodejs.org/en/)
- [Discord.js v14](https://discord.js.org/)
- [Yarn](https://www.npmjs.com/package/yarn)
- [A MongoDB cluster](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup)
- [A Discord bot application](https://discord.com/developers/applications)
  - You must have the Presence & Server Members Intent enabled.

### 2: Clone this repository
```
git clone https://github.com/isaacKenyon/Blacklist
```

### 3: Set config variables
- Fill in the required variables in `config.json.example`
  -  `requiredPerms` must be a string chosen from here:  https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
- Rename `config.json.example` to `config.json`

### 4: Running the bot
- `yarn install`
- `yarn run start`

## How to use
Each participating server must run the slash command `/set`.

Each participating server must have a channel following the announcement channel set in the `config.json`.

You can ping the bot for further detail.

## Logic
### Blacklist Submission:
[![](https://mermaid.ink/img/pako:eNqNkLGOwjAMhl_F8gQSvECHk2jL3XK30LFlcBMfja5Jq8RBQpR3J4WyMVym2P6-xPqvqAbNmOHJ09jB96FxkM6urtif2cMO8p7UX2-ChCNstx-Q16sqttaIsAYZQJNQS4HXx0V9UMXqh0OgE0NgJzNHzg3RKbZzrbpUcr9-KsVDKeuXMsY2fdixXp4s5_m0bJRPsK8PrNicGezTeMcVE3z-hysn-HrL4QYte0tGp3iuc6dB6dL-DWbp6jiKp77Bxt0SGscUBO-1kcFj9kt94A1SlKG6OIWZ-MgvqDSU0rYLdbsD31d_pQ)](https://mermaid.live/edit#pako:eNqNkLGOwjAMhl_F8gQSvECHk2jL3XK30LFlcBMfja5Jq8RBQpR3J4WyMVym2P6-xPqvqAbNmOHJ09jB96FxkM6urtif2cMO8p7UX2-ChCNstx-Q16sqttaIsAYZQJNQS4HXx0V9UMXqh0OgE0NgJzNHzg3RKbZzrbpUcr9-KsVDKeuXMsY2fdixXp4s5_m0bJRPsK8PrNicGezTeMcVE3z-hysn-HrL4QYte0tGp3iuc6dB6dL-DWbp6jiKp77Bxt0SGscUBO-1kcFj9kt94A1SlKG6OIWZ-MgvqDSU0rYLdbsD31d_pQ)

### guildMemberAdd Event:
[![](https://mermaid.ink/img/pako:eNo9kMFqwzAMhl9F-NRC8wI5bLRpNgbrDhs7jKQHNVITU0cOtjMYoe8-pVmni4X0Sf9vTabxxCY3bcChg9f3WkBjW7WjdXTg_sRhSwT8zZLgbAPTEbLsAXbV6jNygKbj5sIE2KKVmIAw4Qkjr4_Lpt2NLqadw-bibExMj9elVWTZm9d2tq9KoeN_Eb44zuWyWj3PLuCFYIyqkbw6EH07hsaH4OPghay0UHQowk7Ju255031aHThGbBni7N-KrrhNL_wawGxMz6FHS3qEaZ6tjRI91ybXVHhMAV1tarkqOg76Py7JJh9MfkYXeWNwTP7jRxqTpzDyHdpb1Jv2f9T1F3pMdXY)](https://mermaid.live/edit#pako:eNo9kMFqwzAMhl9F-NRC8wI5bLRpNgbrDhs7jKQHNVITU0cOtjMYoe8-pVmni4X0Sf9vTabxxCY3bcChg9f3WkBjW7WjdXTg_sRhSwT8zZLgbAPTEbLsAXbV6jNygKbj5sIE2KKVmIAw4Qkjr4_Lpt2NLqadw-bibExMj9elVWTZm9d2tq9KoeN_Eb44zuWyWj3PLuCFYIyqkbw6EH07hsaH4OPghay0UHQowk7Ju255031aHThGbBni7N-KrrhNL_wawGxMz6FHS3qEaZ6tjRI91ybXVHhMAV1tarkqOg76Py7JJh9MfkYXeWNwTP7jRxqTpzDyHdpb1Jv2f9T1F3pMdXY)
> ``📝`` It's possible to rework this so that your bot will send messages into the channel submitted by each server, instead of the announcement channel. 
