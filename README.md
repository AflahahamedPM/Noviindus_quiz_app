
📌 Overview

This project implements a complete quiz/exam engine with strict time management, controlled navigation, per-question time analytics, auto-submission, and a user-friendly interface.
It integrates with a backend API that provides questions and evaluates answers, making the platform suitable for skill assessments, online tests, and learning platforms.


🚀 Core Features
1. Dynamic Question Loading

Questions and exam configuration are fetched through:

GET /question/list

Response includes:

Question text

Question number

Options

Correctness flags

Optional image

Total allotted exam time

2. Global Exam Timer

Converts total exam duration (in minutes) → milliseconds.

Displays timer in MM:SS format.

When timer reaches 0, quiz auto-submits.

Interval clears automatically to prevent memory leaks.

3. Per-Question Time Tracking

Every question tracks: timeSpent (in ms)

When timeSpent >= 1 minute (60,000 ms), user is restricted:

Cannot visit that question again.

Cannot navigate to it via Next, Previous, or direct click.

A warning message notifies the user.

4. Intelligent Navigation Control

Next and Previous navigation adapts based on: Time spent per question

Unanswered questions before the current one are flagged as: notAttended = true

5. Answer Selection Rules

Each question only allows one-time answer selection.

Prevents modifying answer after selection.

Alerts user if they attempt to change choice.

6. Mark for Review

Users can mark questions to revisit later.
Visually indicated using custom UI states.

7. Preview Before Submission

Modal preview before final submission.

Shows the unanswered, attended, and reviewed questions.

8. Auto Submission

Once the global timer reaches 0 => quiz auto submits 


🧩 State Management (useReducer)

Actions:

1) FETCH_SUCCESS

2) SELECT_OPTION

3) NEXT

4) PREV

5) SET_SELECTED_INDEX

6) MARK_REVIEW

7) TICK

Why useReducer?

Because the quiz state is:

 - Multi-layered

 - Highly interdependent

 - Requires predictable transitions

 - Cannot be handled easily with multiple useState

 .

🛠 Tech Stack
Frontend:

1) Next.js 14 (App Router)

2) React (useReducer, useCallback, useEffect)

3) Tailwind CSS

4) Material UI Dialog (for popups)


📁 Project Structure

```

novindus_quiz_app/
│
├── app/                                # Next.js App Router
│   ├── page.js                         # Root homepage
│   ├── layout.js                       # Root layout
│   ├── Provider.js                     
│   │
│   ├── home/
│   │   ├── page.js
│   │   └── layout.js
│   │
│   ├── questions/
│   │   ├── page.js
│   │   └── layout.js
│   │
│   └── globals.css
│
├── components/                         # All UI + Feature Components
│   ├── header/
│   │   └── index.jsx
│   │
│   ├── login/
│   │   ├── index.jsx
│   │   └── LoginInputField.jsx
│   │
│   ├── home/
│   │   └── index.jsx
│   │
│   ├── profile/
│   │   └── index.jsx
│   │
│   ├── questions/
│   │   ├── index.jsx
│   │   ├── QuestionsContainer.jsx
│   │   ├── SingleQuestionContainer.jsx
│   │   ├── ComprehensiveContainer.jsx
│   │   ├── SubmitModalContent.jsx
│   │   └── SuccessPage.jsx
│
│   ├── ReusableComponents/
│   │   └── Dialogue.jsx                
│   │
│   └── image.jsx                       
│
├── config/
│   └── api.js
│
├── providers/
│   ├── LoginProvider.js
│   └── QuestionProvider.js
│
├── hooks/
│   ├── useAlert.js
│   └── useLogout.js
│
├── services/
│   ├── useLoginServices.js
│   └── useQuestionServices.js
│
├── utils/
│   ├── instructions.js
│   ├── validation.js
│   └── apiRequest.js
│
├── public/
│   ├── favicon.ico
│   └── images/
│
├── .env.local
├── next.config.mjs
├── postcss.config.js
├── package.json
└── README.md

```



🧪 How to Run

npm install
npm run dev