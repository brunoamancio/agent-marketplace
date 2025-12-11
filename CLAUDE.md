# Global Claude Instructions

## CRITICAL: Git Operations - ABSOLUTE PROHIBITION

**NEVER, UNDER ANY CIRCUMSTANCES, use the following git commands without EXPLICIT user approval:**
- `git checkout` (on any file or branch)
- `git revert`
- `git reset`
- `git restore`
- `git stash`

**THIS IS NON-NEGOTIABLE. THERE ARE NO EXCEPTIONS.**

Even if:
- You think it will "fix" something
- You think you're being helpful
- The file has an error you want to undo
- You just made a mistake and want to restore the previous version
- ANY other reason

**YOU MUST ASK THE USER FIRST AND WAIT FOR EXPLICIT APPROVAL.**

### What to do instead:

1. **To fix an error:** Edit the file directly using the Edit tool
2. **To undo your own changes:** Tell the user what happened and ASK if they want you to restore from git
3. **To restore a file:** ASK THE USER FIRST, explain what will be lost

### Why this rule exists:

Using git to "fix" errors **DESTROYS ALL UNCOMMITTED WORK** in that file. This has caused **CATASTROPHIC DATA LOSS** multiple times, wiping out hours of work.

**VIOLATION OF THIS RULE IS UNACCEPTABLE.**
