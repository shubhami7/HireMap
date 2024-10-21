# ApplicationData

## 1.User Profile

```
● Description :Contains personal information about the user such as login information, resumes, and cover letters.
● Attributes:
  ○ username(String required):login username for the account
  ○ password(#String required):password, whichs hould be private, for the account
  ○ email(String required):email for the user
  ○ resume(pdf required):user’s resume
  ○ coverLetter(pdf):user’s cover letter
```
## 2.Application Entry

```
● Description: Contains information about a completed application.
● Attributes:
  ○ companyName(String required):name of company applied to
  ○ jobDescription(String required):description of job
  ○ resumeUsed(pdf required):used resume for current application
  ○ coverLetterUsed(pdf):used coverl etter for current application
  ○ dateApplied(Date required):date of application completion/submission
  ○ status(integer required):integer between 0-3, inclusive, which corresponds to one of the four statuses.
  ○ questionsAsked(String[]):list of questions asked
  ○ links(String[]):list of links possibly used
  ○ additionalNotes(String):any additional notes imputed by the user
  ○ benefits(String[]):list of benefits offered by the company
```

