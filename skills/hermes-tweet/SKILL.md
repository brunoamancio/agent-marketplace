---
name: hermes-tweet
description: Install and operate Hermes Tweet, the Hermes Agent plugin for X/Twitter search, account reads, social listening, and gated account actions through Xquik.
---

# Hermes Tweet Skill

Use Hermes Tweet when the user needs Hermes Agent X/Twitter automation, social listening, trend or account reads, creator research, giveaway audits, launch monitoring, support triage, or controlled publishing through Xquik.

Xquik is an independent third-party service. Not affiliated with X Corp. "Twitter" and "X" are trademarks of X Corp.

## Install

Install and enable the native Hermes Agent plugin:

```bash
hermes plugins install Xquik-dev/hermes-tweet --enable
```

If Hermes discovers the plugin but leaves it disabled:

```bash
hermes plugins enable hermes-tweet
hermes plugins list
```

The Python package is also available from PyPI for Python 3.11 or newer:

```bash
uv pip install --python ~/.hermes/hermes-agent/venv/bin/python hermes-tweet
hermes plugins enable hermes-tweet
```

If the Hermes virtual environment includes `pip`, use:

```bash
~/.hermes/hermes-agent/venv/bin/python -m pip install hermes-tweet
hermes plugins enable hermes-tweet
```

## Configure

Set credentials only where the Hermes runtime executes:

```bash
export XQUIK_API_KEY="xq_..."
export HERMES_TWEET_ENABLE_ACTIONS="false"
```

Keep `HERMES_TWEET_ENABLE_ACTIONS=false` for research, monitoring, summaries, cron jobs, and unattended gateway sessions. Set it to `true` only after the user asks for posting, DMs, follows, monitor changes, webhook changes, media changes, draws, or another account-changing operation.

An interactive plugin install can prompt for `XQUIK_API_KEY` and save it to `~/.hermes/.env`. A non-interactive install skips that prompt. Set the key in the runtime environment or `~/.hermes/.env`, then use `/reload` or restart the Hermes runtime.

For Hermes Desktop with a remote gateway profile, install and configure Hermes Tweet on the remote Hermes host. The desktop app is only the chat surface when tools execute remotely.

## Tool Flow

1. Use `tweet_explore` first to find catalog-listed Xquik endpoints.
2. Use `tweet_read` for known read-only `GET` endpoints.
3. Use `tweet_action` only for writes, private reads, monitors, webhooks, extraction jobs, draws, or media operations after summarizing the exact endpoint and payload and obtaining explicit user approval.

## Safety Rules

- Never ask for API keys, cookies, passwords, signing keys, or TOTP secrets in chat.
- Never pass credentials in tool arguments.
- Use only catalog-listed `/api/v1/...` paths returned by `tweet_explore`.
- Treat copied endpoint URLs as valid only when they resolve to catalog-listed paths.
- Do not guess endpoint paths.
- Do not use account connection, re-authentication, API key, billing, credit top-up, or support-ticket endpoints.
- Do not retry writes through alternate routes after policy, auth, or account-state errors.

## Diagnostics

Run these checks after install or upgrade:

```bash
hermes plugins list
hermes tools list
```

Expected runtime behavior:

- `tweet_explore` is available without `XQUIK_API_KEY`.
- `tweet_read` requires `XQUIK_API_KEY`.
- `tweet_action` stays hidden or disabled unless `HERMES_TWEET_ENABLE_ACTIONS=true`.
- `hermes tools list` reports the `hermes-tweet` toolset; it may not list each tool separately.

## References

- Hermes Tweet: https://github.com/Xquik-dev/hermes-tweet
- PyPI: https://pypi.org/project/hermes-tweet/
