
# Troubleshooting

What to do if things go wrong? Sometimes we encounter situations where
stuff does not work as expected or simply does not work.

In these cases it's easy to get lost fixating on the error message.

What strategies can we use to get past the block?

## What can go wrong?

### Category 1

  - Unexpected behaviour (libraries, frameworks, language, browser, operating system, hardware, uplink)
  - Error (does not work, won't compile)
  - Bug (works but wrong)
  - New features break old code (tests start failing)
  - Regressions (a long fixed bug comes to visit you again)
  - Scope / Contextual errors
  - Refactor => Breakage (even sometimes unrelated code)
  - Merge conflics / Messed up branches

### Category 2

  - Github down
  - Moving deadlines

### Category 3

  - Intimidation / Spiritual or Mental Blocks
  - Hangover regret
  - Sickness

## How to proceed?

  - DONT PANIC!
  - Take a step back
  - What was the last thing you did
  - What is the real problem
  - Just f**ing Google it (for a minute or 2)
  - Ask a peer
  - Every situation is different

### Example: Unexpected behaviour

Adding a new library to your project does not work,
throws errors.

  - Read the docs (again)
  - Google the error (but dont fixiate on that)
    - May distract you from the problem
    - Issue could be very simple, using it wrong
    - Assess the quality of the proposed solutions
  - Branch :)
  - Try dry! Create an example project without the
    complexity of the main project.
  - Isolate the problem
  - Debugger / Inspector / console.log

## Example: Messing up the GIT

  - Stick to the rules! (Write them down!)
  - Tiny commits are the easiest to merge!
  - It's just a folder!
  - Backup the current state!

### Taking back a commit

Let's say you accidentally pushed to the master branch.
Your local checkout state was on master.

Warn everybody not to commit!

  - clone master to a separate directory
  - **If you have uncommited changes:** git stash
  - git pull (Check if nobody pushed something else)
  - **Locally:** git reset --soft HEAD~1 (only you are sure to take back the last commit, else you need rebase or revert)
  - **Remotely (DANGEROUS):** git push -f origin master
  - git checkout -b new_branch_name
  - git add . ; git commit
  - *If you have stashed:* git stash pop

### Remove sensitive data

BACK UP THE REPO FIRST!

Sometime passwords are committed, or large files like videos sneak into the git.

USE BFG: https://rtyley.github.io/bfg-repo-cleaner

  - **Remove .env:**:
    git clone --mirror git://example.com/my-repo.git
    bfg --delete-files .env my-repo.git
    cd my-repo.git'; git push -f 

  - Remove passwords (hardcoded) from files
  - Remove large files in general

### Restart at a specific commit:

  - **git log** to get the commit HASH
  - **git checkout** HASH
  - **git checkout -b new-branch**
  - git commit ...

### Accidentally basing on the wrong branch

BACKUP!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111elf!!!11eleven111!

  - **git log** to get the last commit HASH that is not part of your features
  - **git checkout -b new-feature-branch**
  - **git rebase --interactive HASH** 
  - **drop** the commits drom the other (first) feature
