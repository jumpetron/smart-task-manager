# Smart Task Manager
A simple and intuitive task management app built with Next.js and React, allowing users to add, edit, delete tasks, and generate subtasks powered by an Google's Gemini AI.

## Features
- Add new tasks with title, description, status, and due date.
- Edit existing tasks.
- Delete tasks.
- Generate and display subtasks for each task asynchronously.
- Visual status badges and due date indicators.
- Responsive UI with loading skeletons for async operations.

## Technologies Used
- Next.js (v15)
- TypeScript 
- Tailwind CSS 
- Shadcn UI 
- Sonner – Toast notifications.
- Google Gemini API

## Setup Instructions (Run Locally)

### 1. Clone the repo:
bash
git clone https://github.com/jumpetron/smart-task-manager.git
cd smart-task-manager

### 2. Install dependencies:

Make sure you have Node.js installed (preferably Node 18+).

```
npm install

# or

yarn install
```
### 3. Run the development server:

```
npm run dev

# or

yarn dev
```
### 4. Open your browser:
Navigate to http://localhost:3000 to see the app in action.

### Project Structure Highlights
- Task.tsx – Main component managing tasks, state, and UI interactions.
- AddNewTask and EditTask – Components handling modal forms for adding and editing tasks.
- API endpoint /api/gemini – Handles generating subtasks (not shown in snippet but assumed).
- UI Components – Custom reusable UI components like Button, Skeleton, etc.

### Challenges Faced

- Handling subtasks generation: Integrating API calls to dynamically fetch subtasks per task, while maintaining smooth UX with loading skeletons and error handling.
- TypeScript typing: Defining interfaces and input types correctly to keep strong typing across components and state.